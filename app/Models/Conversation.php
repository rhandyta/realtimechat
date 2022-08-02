<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    protected $table = 'conversations';
    protected $fillable = ['user_one', 'user_two'];
    use HasFactory;

    public function User()
    {
        return $this->belongsTo(User::class, 'user_two', 'id');
    }

    public function ConversationReplies()
    {
        return $this->hasMany(ConversationReply::class, 'conversation_id', 'id');
    }
}
