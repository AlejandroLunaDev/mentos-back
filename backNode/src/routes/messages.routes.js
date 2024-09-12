import { Router } from 'express';
import {
  createMessageController,
  getMessageByIdController,
  getMessagesController,
  updateMessageController,
  deleteMessageController,
  getMessagesByChatIdController,
  getMessagesByUserIdController,
  getMessageThreadsController,
} from '../controllers/message.controller.js';

const router = Router();

// Crear un nuevo mensaje
router.post('/', createMessageController);

// Obtener todos los mensajes
router.get('/', getMessagesController);

// Obtener un mensaje por ID
router.get('/:messageId', getMessageByIdController);

// Actualizar un mensaje por ID
router.put('/:messageId', updateMessageController);

// Eliminar un mensaje por ID
router.delete('/:messageId', deleteMessageController);

// Obtener mensajes por chat ID
router.get('/chat/:chatId', getMessagesByChatIdController);

// Obtener mensajes por usuario ID
router.get('/user/:userId', getMessagesByUserIdController);

// Obtener hilos de mensajes (respuestas a un mensaje)
router.get('/threads/:messageId', getMessageThreadsController);

export default router;
