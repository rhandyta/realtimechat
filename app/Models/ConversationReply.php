<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConversationReply extends Model
{
    use HasFactory;
    protected $table = 'conversation_replies';
    protected $fillable = ['user_id', 'conversation_id', 'body'];



    public function User()
    {
        return $this->belongsTo(User::class);
    }


    public function Conversation()
    {
        return $this->belongsTo(Conversation::class);
    }
}
