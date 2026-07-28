<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index()
    {
        $conversations = auth()->user()->conversations()->with(['participants', 'lastMessage'])->get();

        return view('student.messages', compact('conversations'));
    }

    public function show(Conversation $conversation)
    {
        $this->authorizeParticipant($conversation);

        $conversation->load('messages.sender', 'participants');
        $conversation->messages()->where('sender_id', '!=', auth()->id())->update(['is_read' => true]);

        return view('student.message', compact('conversation'));
    }

    public function send(Request $request, Conversation $conversation)
    {
        $this->authorizeParticipant($conversation);

        $data = $request->validate(['body' => ['required', 'string', 'max:2000']]);

        Message::create([
            'conversation_id' => $conversation->id,
            'sender_id' => auth()->id(),
            'body' => $data['body'],
        ]);

        return back();
    }

    protected function authorizeParticipant(Conversation $conversation): void
    {
        abort_unless($conversation->participants()->where('users.id', auth()->id())->exists(), 403);
    }
}
