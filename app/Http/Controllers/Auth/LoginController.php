<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Crypt;
use App\Http\Controllers\Controller;
use App\Mail\AccoutBlock;
use App\Mail\ResetPasswordMail;
use App\Models\ResetPassword;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Illuminate\Support\Str;

class LoginController extends Controller
{
    public function show()
    {
        return Inertia::render('frontend/Login');
    }
    public function authtication(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required',
            'password' => 'required|min:6',
        ]);

        // Check if the email
        $user = User::where('email', $request->email)
            ->first();

        if (!$user) {
            return back()->withErrors(['email' => 'User not found!']);
        }

        if ($user && ($user->status == 0 || $user->status == 'blocked')) {
            Mail::to($user->email)->send(new AccoutBlock($user));
            return redirect()->back()->withErrors([
                'email' => 'Your account is blocked. Please contact support and check your email for more details.',
            ]);
        }

        if (!Hash::check($request->password, $user->password)) {
            return back()->withErrors(['password' => 'Incorrect password!']);
        }

        Auth::login($user);
        $request->session()->regenerate();

        // Send user data to React dashboard via Inertia
        return redirect()->back()->with('flash', [
            'success' => 'Login successful!',
        ])->with('user', $user);
    }
    // Logout Use
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        // Send Login page
        return redirect()->back()->with('flash', [
            'success' => 'Logout successful!',
        ]);
    }
    // Forget Password 
    public function forgetshow()
    {
        return Inertia::render('frontend/Forgetpassword');
    }
    public function forgetpassword(Request $request)
    {
        // Rate limiting to prevent brute-force attacks
        $key = 'forgot-password-' . $request->ip();
        if (RateLimiter::tooManyAttempts($key, 5)) {
            return back()->withErrors(['email' => 'Too many requests. Please try again later.']);
        }
        RateLimiter::hit($key, 60); // 60 seconds cooldown

        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return back()->withErrors(['email' => 'If your email exists, you will receive a reset link.']);
        }

        // Delete previous token if exists
        ResetPassword::where('email', $request->email)->delete();

        // Generate encrypted token
        $token = Crypt::encryptString(Str::random(30));

        // Create new password reset entry with expiration time (e.g., 15 minutes)
        ResetPassword::create([
            'email' => $request->email,
            'token' => $token,
            'created_at' => now(),
        ]);

        // Send email
        $formdata = [
            'token' => $token,
            'user' => $user,
            'mailSubject' => 'You have requested to reset your password',
        ];
        Mail::to($request->email)->send(new ResetPasswordMail($formdata));

        return back()->with('flash', ['success' => 'If your email exists, please check your inbox to reset your password.']);
    }

    // Reset password form
    public function resetshow($token)
    {
        $tokenExists = ResetPassword::where('token', $token)->exists();

        if (!$tokenExists) {
            return Inertia::render('frontend/Forgetpassword', [
                'error' => 'Invalid or expired token. Please request a new password reset link.'
            ]);
        }
        return Inertia::render('frontend/ResetPassword', [
            'token' => $token,
        ]);
    }
    // Reset password
    public function resetpassword(Request $request)
    {
        $token = $request->token;

        // Check if the token exists
        $resetPasswordRecord = ResetPassword::where('token', $token)->first();
        if (!$resetPasswordRecord) {
            return Inertia::render('frontend/Forgetpassword', [
                'error' => 'Invalid or expired token. Please request a new password reset link.'
            ]);
        }

        // Get the user by email
        $user = User::where('email', $resetPasswordRecord->email)->first();
        if (!$user) {
            return Inertia::render('frontend/Register', [
                'error' => 'User not found!'
            ]);
        }

        // Validate the request
        $request->validate([
            'password' => 'required',
        ]);

        // Update the user password
        $user->password = Hash::make($request->password);
        $user->save();

        // Delete the password reset token after a successful reset
        $resetPasswordRecord->delete();

        return Inertia::render('frontend/Login', [
            'success' => 'Your password has been reset successfully. Please login with your new password.'
        ]);
    }
}
