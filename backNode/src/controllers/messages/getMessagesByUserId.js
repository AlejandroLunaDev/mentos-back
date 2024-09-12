import { getMessagesByUserId } from '../../dao/message.dao.js';

const getMessagesByUserIdController = async (req, res) => {
  try {
    const { userId } = req.params;
    const messages = await getMessagesByUserId(userId);
    if (!messages || messages.length === 0) {
      return res.status(404).json({ error: 'No messages found for this user' });
    }
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching messages by user ID: ' + error.message });
  }
};

export default getMessagesByUserIdController;
