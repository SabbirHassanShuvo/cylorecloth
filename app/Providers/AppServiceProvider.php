<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class AppServiceProvider extends ServiceProvider
{
    protected $with = ['account'];
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Inertia::share([
        //     'auth' => function () {
        //         $user = Auth::user();

        //         if ($user) {
        //             // Eager load the account relationship
        //             $user->load('account');

        //             // Ensure account exists, or create a default one
        //             if (!$user->account) {
        //                 $user->account = (object) [
        //                     'image' => null, // or a default image path
        //                 ];
        //             }
        //         }

        //         return [
        //             'user' => $user,
        //         ];
        //     },
        // ]);
        Inertia::share([
            'auth' => function () {
                $user = Auth::user();
                if ($user) {
                    $user->load('account');
                    if (!$user->account) {
                        $user->account = (object)[
                            'image' => null,
                        ];
                    }
                }
                return ['user' => $user];
            },
        ]);
    }
}
