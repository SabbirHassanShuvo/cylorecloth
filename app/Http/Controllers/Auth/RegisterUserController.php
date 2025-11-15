<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\WelcomeMail;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class RegisterUserController extends Controller
{
    public function show()
    {
        return Inertia::render('frontend/Register');
    }
    public function store(Request $request)
    {
        // Validation rules
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'phone' => 'nullable|string|min:11|max:11|unique:users,phone',
            'password' => 'required|min:6',
        ]);

        // User Model
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->password = Hash::make($request->password);
        $user->role = 'customer'; // Default role set
        $user->save();

        // Send Welcome Email
        Mail::to($user->email)->send(new WelcomeMail($user));

        return redirect()->back()->with('flash', [
            'success' => 'Register successfully!',
        ]);
    }
}
