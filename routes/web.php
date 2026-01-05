<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Admin\AccountController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\SubCategoryController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\Admin\CategoryController as AdminCategoryController;

Route::get('/', function () {
    return Inertia::render('frontend/Home');
})->name('home');
Route::get('/producthome', function () {
    return Inertia::render('frontend/ProductDetails');
})->name('home');
Route::get('/cart', function () {
    return Inertia::render('frontend/Cart');
})->name('home');
Route::get('/shop', function () {
    return Inertia::render('frontend/Shop');
})->name('home');

// Auth router 
Route::get('/register', [AuthController::class, 'show'])->name('register');
Route::post('/register', [AuthController::class, 'store']);
Route::get('/login', [AuthController::class, 'loginshow'])->name('login');
Route::post('/login', [AuthController::class, 'authtication']);
Route::get('/forgetpassword', [AuthController::class, 'forgetshow'])->name('forgetpassword');
Route::post('/forgetpassword', [AuthController::class, 'forgetpassword']);
Route::get('/resetpassword/{token}', [AuthController::class, 'resetshow'])->name('resetpassword');
Route::post('/resetpassword/{token}', [AuthController::class, 'resetpassword']);
Route::middleware(['auth'])->group(function () {
    // Your authenticated routes here
    Route::get('/dashboard', function () {
        return Inertia::render('backend/CreateUser');
    })->name('dashboard');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});
// Route::middleware(['auth', 'admin'])->group(function () {
    // User Routes
    Route::get('/user/delete/{id}', [AdminUserController::class, 'destroy'])->name('user.delete');

    // Product routes
    Route::get('/product/delete/{id}', [ProductController::class, 'destroy'])->name('post.delete');
// });
// Route::middleware(['auth', 'manager'])->group(function () {
    // User routes
    Route::get('/user', [AdminUserController::class, 'index'])->name('user');
    Route::get('/user/create', [AdminUserController::class, 'create'])->name('user.create');
    Route::post('/user/store', [AdminUserController::class, 'store'])->name('user.store');
    Route::get('/user/edit/{id}', [AdminUserController::class, 'edit'])->name('user.edit');
    Route::post('/user/update/{id}', [AdminUserController::class, 'update'])->name('user.update');

    // Category routes
    Route::get('/category', [AdminCategoryController::class, 'index'])->name('category');
    Route::get('/category/create', [AdminCategoryController::class, 'create'])->name('category.create');
    Route::post('/category/store', [AdminCategoryController::class, 'store'])->name('category.store');
    Route::get('/category/edit/{id}', [AdminCategoryController::class, 'edit'])->name('category.edit');
    Route::post('/category/update/{id}', [AdminCategoryController::class, 'update'])->name('category.update');
    Route::get('/category/delete/{id}', [AdminCategoryController::class, 'destroy'])->name('category.delete');

    // Sub category routes
    Route::get('/subcategory', [SubCategoryController::class, 'index'])->name('subcategory');
    Route::get('/subcategory/create', [SubCategoryController::class, 'create'])->name('subcategory.create');
    Route::post('/subcategory/store', [SubCategoryController::class, 'store'])->name('subcategory.store');
    Route::get('/subcategory/edit/{id}', [SubCategoryController::class, 'edit'])->name('subcategory.edit');
    Route::post('/subcategory/update/{id}', [SubCategoryController::class, 'update'])->name('subcategory.update');
    Route::get('/subcategory/delete/{id}', [SubCategoryController::class, 'destroy'])->name('subcategory.delete');

    // Product routes
    Route::get('/product', [ProductController::class, 'index'])->name('product.index');
    Route::get('/product/create', [ProductController::class, 'create'])->name('product.create');
    Route::post('/product/store', [ProductController::class, 'store'])->name('product.store');
    Route::get('/product/edit/{id}', [ProductController::class, 'edit'])->name('post.edit');
    Route::post('/product/update/{id}', [ProductController::class, 'update'])->name('post.update');

    // Account settings routes
    Route::get('/account', [AccountController::class, 'index'])->name('account.index');
    Route::post('/account/update/{id}', [AccountController::class, 'update'])->name('account.update');
    Route::post('/profile/uploadphoto', [AccountController::class, 'uploadPhoto'])->name('account.uploadphoto');
    Route::post('/account/changepassword', [AccountController::class, 'changepassword'])->name('account.changepassword');
// });
