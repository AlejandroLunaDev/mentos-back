import { deleteMessage } from '../../dao/message.dao.js';

const deleteMessageController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMessage = await deleteMessage(id);
    if (!deletedMessage) {
      return res.status(404).json({ error: 'Message not found' });
    }
    return res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Error deleting message: ' + error.message });
  }
};

export default deleteMessageController;
