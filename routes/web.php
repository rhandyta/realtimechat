<?php

use App\Http\Controllers\ConversationController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::group([
    'middleware' => ['auth', 'verified']
], function () {
    Route::get('chat', [ConversationController::class, 'index'])->name('chat.index');
    Route::get('chat/{id}', [ConversationController::class, 'conversation'])->name('chat.conversation');
    Route::post('chat/sentMessage', [ConversationController::class, 'sendMessage'])->name('chat.sentMessage');
    Route::get('chat/name/{name}', [ConversationController::class, 'search'])->name('search');
});

require __DIR__ . '/auth.php';
