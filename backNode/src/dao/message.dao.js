import MessageModel from './models/message.model.js'; // Ajusta la ruta según tu estructura

// Obtener todos los mensajes
const getMessages = async () => {
  try {
    return await MessageModel.find().populate('chat').populate('sender').populate('parent').exec();
  } catch (error) {
    throw new Error('Error getting messages: ' + error.message);
  }
};

// Obtener un mensaje por ID
const getMessageById = async (messageId) => {
  try {
    return await MessageModel.findById(messageId).populate('chat').populate('sender').populate('parent').exec();
  } catch (error) {
    throw new Error('Error getting message by ID: ' + error.message);
  }
};

// Crear un nuevo mensaje
const createMessage = async (messageData) => {
  try {
    const message = new MessageModel(messageData);
    return await message.save();
  } catch (error) {
    throw new Error('Error creating message: ' + error.message);
  }
};

// Actualizar un mensaje por ID
const updateMessage = async (messageId, updateData) => {
  try {
    return await MessageModel.findByIdAndUpdate(messageId, updateData, { new: true, runValidators: true }).exec();
  } catch (error) {
    throw new Error('Error updating message: ' + error.message);
  }
};

// Eliminar un mensaje por ID
const deleteMessage = async (messageId) => {
  try {
    return await MessageModel.findByIdAndDelete(messageId).exec();
  } catch (error) {
    throw new Error('Error deleting message: ' + error.message);
  }
};

// Obtener mensajes por chat ID
const getMessagesByChatId = async (chatId) => {
  try {
    return await MessageModel.find({ chat: chatId }).populate('sender').populate('parent').exec();
  } catch (error) {
    throw new Error('Error getting messages by chat ID: ' + error.message);
  }
};

// Obtener mensajes por usuario ID
const getMessagesByUserId = async (userId) => {
  try {
    return await MessageModel.find({ sender: userId }).populate('chat').populate('parent').exec();
  } catch (error) {
    throw new Error('Error getting messages by user ID: ' + error.message);
  }
};

// Obtener hilos de mensajes por ID del mensaje
const getMessageThreads = async (messageId) => {
  try {
    return await MessageModel.find({ parent: messageId }).populate('sender').populate('parent').exec();
  } catch (error) {
    throw new Error('Error getting message threads: ' + error.message);
  }
};

export {
  getMessages,
  getMessageById,
  createMessage,
  updateMessage,
  deleteMessage,
  getMessagesByChatId,
  getMessagesByUserId,
  getMessageThreads
};
