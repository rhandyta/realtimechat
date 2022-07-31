<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConversationReply extends Model
{
    protected $table = 'conversation_replies';
    use HasFactory;

    public function User()
    {
        return $this->belongsTo(User::class);
    }


    public function Conversation()
    {
        return $this->belongsTo(Conversation::class);
    }
}
