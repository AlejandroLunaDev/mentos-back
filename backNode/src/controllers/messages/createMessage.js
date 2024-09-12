import { createMessage } from '../../dao/message.dao.js'; // Ajusta la ruta según tu estructura

const createMessageController = async (req, res) => {
  try {
    const messageData = req.body;
    const newMessage = await createMessage(messageData);
    return res.status(201).json(newMessage);
  } catch (error) {
    return res.status(500).json({ error: 'Error creating message: ' + error.message });
  }
};

export default createMessageController;
