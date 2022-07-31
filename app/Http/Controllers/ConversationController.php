<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ConversationController extends Controller
{
    public function index(Request $request)
    {
        $users = User::where('id', '!=', Auth::user()->id)->get();

        return Inertia::render('Chat', [
            'users' => $users
        ]);
    }

    public function conversation(Request $request)
    {
        $userId = $request->id;
        $auth = Auth::user();
        $conversations = Conversation::query()
            ->with(['conversationreplies', 'user'])
            ->where('user_one', $auth->id)
            ->where('user_two', $userId)
            ->get();
        return response()->json([
            'success' => true,
            'conversation' => $conversations
        ]);
    }
}
