<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\ConversationReply;
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
        $userTo = $request->userTo;
        $userFrom = $request->userFrom;
        // $conversations = ConversationReply::query()
        //     ->with(['conversation', 'user'])
        //     ->where('user_id', $userId)
        //     ->get();
        $conversations = Conversation::query()
            ->with(['conversationreplies', 'user'])
            ->where('user_one', $userFrom)
            ->where('user_two', $userTo)
            ->orderBy('created_at', 'DESC')
            ->first();
        if ($conversations === NULL) {
            $conversations = Conversation::query()
                ->with(['conversationreplies', 'user'])
                ->where('user_two', $userFrom)
                ->where('user_one', $userTo)
                ->orderBy('created_at', 'DESC')
                ->first();
        }


        return response()->json([
            'success' => true,
            'conversation' => $conversations
        ]);
    }

    public function sendMessage(Request $request)
    {
        $request->validate([
            'message' => 'required'
        ]);
    }
}
