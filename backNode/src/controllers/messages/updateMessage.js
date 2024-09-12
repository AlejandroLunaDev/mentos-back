import { updateMessage } from '../../dao/message.dao.js';

const updateMessageController = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedMessage = await updateMessage(id, updateData);
    if (!updatedMessage) {
      return res.status(404).json({ error: 'Message not found' });
    }
    return res.status(200).json(updatedMessage);
  } catch (error) {
    return res.status(500).json({ error: 'Error updating message: ' + error.message });
  }
};

export default updateMessageController;
