import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // Usuarios involucrados en la conversación (mentores y mentees)
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'messages', // Referencia a los mensajes asociados a este chat
      },
    ],
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
  });
  
  const ChatModel = mongoose.model('chats', chatSchema);
  
  export default ChatModel;
  