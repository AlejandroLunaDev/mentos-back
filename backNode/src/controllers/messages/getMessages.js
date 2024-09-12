import { getMessages } from '../../dao/message.dao.js';

const getMessagesController = async (req, res) => {
  try {
    const messages = await getMessages();
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching messages: ' + error.message });
  }
};

export default getMessagesController;
