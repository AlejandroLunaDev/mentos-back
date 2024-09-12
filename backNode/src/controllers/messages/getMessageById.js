import { getMessageById } from '../../dao/message.dao.js'; 

const getMessageByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await getMessageById(id);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    return res.status(200).json(message);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching message: ' + error.message });
  }
};

export default getMessageByIdController;
