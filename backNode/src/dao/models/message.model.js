import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'chats', // El chat al que pertenece el mensaje
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users', // El usuario que envió el mensaje
      required: true,
    },
    content: {
      type: String,
      required: true, // El contenido del mensaje
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'messages', // Referencia a otro mensaje si es una respuesta o hilo
      default: null,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  });
  
  const MessageModel = mongoose.model('messages', messageSchema);
  
  export default MessageModel;
  