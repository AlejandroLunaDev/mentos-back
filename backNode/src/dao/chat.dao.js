import ChatModel from './models/chat.model.js'; // Ajusta la ruta según tu estructura

// Obtener todos los chats
const getChats = async () => {
  try {
    return await ChatModel.find().exec();
  } catch (error) {
    throw new Error('Error getting chats: ' + error.message);
  }
};

// Obtener un chat por ID
const getChatById = async (chatId) => {
  try {
    return await ChatModel.findById(chatId).populate('participants').populate('messages').exec();
  } catch (error) {
    throw new Error('Error getting chat by ID: ' + error.message);
  }
};

// Crear un nuevo chat
const createChat = async (participants) => {
  try {
    const chat = new ChatModel({ participants });
    return await chat.save();
  } catch (error) {
    throw new Error('Error creating chat: ' + error.message);
  }
};

// Actualizar un chat por ID
const updateChat = async (chatId, updateData) => {
  try {
    return await ChatModel.findByIdAndUpdate(chatId, updateData, { new: true, runValidators: true }).exec();
  } catch (error) {
    throw new Error('Error updating chat: ' + error.message);
  }
};

// Eliminar un chat por ID
const deleteChat = async (chatId) => {
  try {
    return await ChatModel.findByIdAndDelete(chatId).exec();
  } catch (error) {
    throw new Error('Error deleting chat: ' + error.message);
  }
};

// Agregar un mensaje a un chat
const addMessageToChat = async (chatId, messageId) => {
  try {
    return await ChatModel.findByIdAndUpdate(
      chatId,
      { $push: { messages: messageId } },
      { new: true, runValidators: true }
    ).exec();
  } catch (error) {
    throw new Error('Error adding message to chat: ' + error.message);
  }
};

// Agregar participantes a un chat
const addParticipantsToChat = async (chatId, participantIds) => {
  try {
    return await ChatModel.findByIdAndUpdate(
      chatId,
      { $addToSet: { participants: { $each: participantIds } } },
      { new: true, runValidators: true }
    ).exec();
  } catch (error) {
    throw new Error('Error adding participants to chat: ' + error.message);
  }
};

// Eliminar un participante de un chat
const removeParticipantFromChat = async (chatId, participantId) => {
  try {
    return await ChatModel.findByIdAndUpdate(
      chatId,
      { $pull: { participants: participantId } },
      { new: true, runValidators: true }
    ).exec();
  } catch (error) {
    throw new Error('Error removing participant from chat: ' + error.message);
  }
};

export {
  getChats,
  getChatById,
  createChat,
  updateChat,
  deleteChat,
  addMessageToChat,
  addParticipantsToChat,
  removeParticipantFromChat
};
