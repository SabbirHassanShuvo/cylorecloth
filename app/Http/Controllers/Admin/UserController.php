<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Mail\AccoutBlock;
use App\Mail\WelcomeAdminCreateUser;
use App\Models\Account;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::query();
        $search = trim(strtolower($request->search));

        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%$search%")
                    ->orWhere('email', 'like', "%$search%")
                    ->orWhere('phone', 'like', "%$search%")
                    ->orWhere('role', 'like', "%$search%");

                if ($search === 'active') {
                    $q->orWhere('status', 1);
                } elseif ($search === 'blocked') {
                    $q->orWhere('status', 0);
                }
            });
        }

        $users = $query->orderBy('id', 'DESC')->paginate(10);

        $previewUser = null;
        if ($request->has('preview_id')) {
            $previewUser = User::with('account')
                ->find($request->preview_id);
        }

        return Inertia::render('backend/user/User', [
            'users' => $users,
            'filters' => $request->only('search'),
            'previewUser' => $previewUser,
        ]);
    }


    public function create()
    {
        return Inertia::render('backend/user/CreateUser');
    }
    public function store(Request $request)
    {
        // Validation rules
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'phone' => 'nullable|string|min:11|max:11|unique:users,phone',
            'password' => 'required|min:6',
            'role' => 'required|in:admin,manager,customer',
        ]);

        // User Model
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->role = $request->role;
        $user->password = Hash::make($request->password);
        $user->save();

        // Send Welcome Email
        Mail::to($user->email)->send(new WelcomeAdminCreateUser($user));

        return redirect()->back()->with('flash', [
            'success' => 'Register successfully!',
        ]);
    }
    public function edit($id)
    {
        $user = User::find($id);
        return Inertia::render('backend/user/Edit', [
            'users' => $user
        ]);
    }

    public function update(Request $request, $id)
    {
        // Validate data with unique email & phone check
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $id, // Exclude current user
            'phone' => 'nullable|string|max:20|unique:users,phone,' . $id, // Exclude current user
            'role' => 'required|in:admin,manager,customer',
        ]);

        $user = User::find($id);
        $previousStatus = $user->status;

        $user->name = $request->name;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->status = $request->status;
        $user->role = $request->role;
        $user->save();

        // Send email if the account is blocked and the status is changed to 'blocked' or '0'
        if (($previousStatus != 'blocked' && $request->status == 'blocked') || $request->status == 0) {
            // Send Account Block email
            Mail::to($user->email)->send(new AccoutBlock($user));
        }

        return Inertia::render('backend/user/Edit', [
            'users' => $user,
            'error' => null, // Send no error if everything is fine
        ]);
    }

    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return redirect()->route('user')->with('error', 'User not found!');
        }

        $user->delete();

        return redirect()->route('user')->with('success', 'User deleted successfully!');
    }

    // user show data
    public function preview($id)
    {
        $user = User::with('account')->findOrFail($id);

        return Inertia::render('User/Show', [
            'user' => $user
        ]);
    }
}
