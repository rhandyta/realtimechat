<?php

namespace App\Http\Controllers;

use App\Events\Message;
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
        $user = User::findOrFail($userTo);
        $conversations = Conversation::query()
            ->where('user_one', $userFrom)
            ->where('user_two', $userTo)
            ->orderBy('created_at', 'DESC')
            ->first();

        if ($conversations === NULL) {
            $conversations = Conversation::query()
                ->where('user_two', $userFrom)
                ->where('user_one', $userTo)
                ->orderBy('created_at', 'DESC')
                ->first();
        }
        $conversationReplies = ConversationReply::query()
            ->where('conversation_id', $conversations->id)
            ->get();

        return response()->json([
            'success' => true,
            'user' => $user,
            'conversation' => $conversations,
            'conversationReplies' => $conversationReplies
        ]);
    }

    public function sendMessage(Request $request)
    {
        $rules = $request->validate([
            'userTo' => 'required',
            'userFrom' => 'required',
            'message' => 'required',
        ]);
        $conversationId = $request->conversationId;
        if (!$rules) return response()->json(['success' => false, 'messages' => $rules]);
        if ($conversationId === Null) {
            $conversationCreated = Conversation::create([
                'user_one' => $request->userFrom,
                'user_two' => $request->userTo
            ]);
            $conversationId = $conversationCreated->id;
        }
        $conversationToReply = Conversation::find($conversationId);
        $message = [
            'user_id' => $request->userTo,
            'conversation_id' => $conversationId,
            'body' => $request->message
        ];
        $resultMessage = $conversationToReply->ConversationReplies()->create($message);
        Message::dispatch($resultMessage);
        return response()->json([
            'success' => true,
            'message' => "Message has been sent",
        ]);
    }
}
