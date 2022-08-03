<?php

use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('chat.{conversation_id}', function ($user, $conversation_id) {
    return (int) $user->id !== (int) $conversation_id;
});
Broadcast::routes(['middleware' => ['auth:sanctum', 'auth']]);
