<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AccountController extends Controller
{
    public function index()
    {
        $user = User::with('account')->find(Auth::id());

        return Inertia::render('backend/account/Account', [
            'auth' => [
                'user' => $user,
            ]
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string',
            'district' => 'required|string',
            'city' => 'required|string',
            'address' => 'nullable|string',
            'phone' => 'nullable|string',
        ]);

        $user = User::findOrFail($id);

        $user->update([
            'name' => $request->name,
            'phone' => $request->phone,
        ]);

        $user->account()->updateOrCreate(
            ['user_id' => $user->id],
            [
                'district' => $request->district,
                'city' => $request->city,
                'address' => $request->address,
            ]
        );

        $user->account()->updateOrCreate(
            ['user_id' => $user->id],
            [
                'district' => $user->account->district ?? '',
                'city' => $user->account->city ?? '',
                'address' => $user->account->address ?? '',
            ]
        );


        return back()->with('success', 'Account updated successfully');
    }
    public function uploadPhoto(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $user = auth()->user();
        $account = $user->account;

        if ($account && $account->image) {
            $oldPath = public_path($account->image);
            if (file_exists($oldPath)) {
                unlink($oldPath);
            }
        }

        $image = $request->file('image');
        $filename = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
        $destinationPath = public_path('uploads/profile');
        if (!file_exists($destinationPath)) {
            mkdir($destinationPath, 0755, true);
        }
        $image->move($destinationPath, $filename);

        if ($account) {
            $account->update([
                'image' => 'uploads/profile/' . $filename,
            ]);
        } else {
            $user->account()->create([
                'user_id' => $user->id,
                'image' => 'uploads/profile/' . $filename,
            ]);
        }

        return back()->with('success', 'Profile image updated!');
    }

    public function changepassword(Request $request)
    {
        $request->validate([
            'new_password' => 'required|min:6',
            'confirm_password' => 'required|same:new_password'
        ]);

        $user = Auth::user();

        $user->password = Hash::make($request->new_password);

        if ($user->save()) {
            return back()->with('success', 'Password changed successfully!');
        }

        return back()->with('error', 'Password update failed!');
    }
}
