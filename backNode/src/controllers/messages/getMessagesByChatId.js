import { getMessagesByChatId } from '../../dao/message.dao.js';

const getMessagesByChatIdController = async (req, res) => {
  try {
    const { chatId } = req.params;
    const messages = await getMessagesByChatId(chatId);
    if (!messages || messages.length === 0) {
      return res.status(404).json({ error: 'No messages found for this chat' });
    }
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching messages by chat ID: ' + error.message });
  }
};

export default getMessagesByChatIdController;
