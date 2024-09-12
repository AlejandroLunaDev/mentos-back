import { getMessageThreads } from '../../dao/message.dao.js';

const getMessageThreadsController = async (req, res) => {
  try {
    const { messageId } = req.params;
    const threads = await getMessageThreads(messageId);
    if (!threads || threads.length === 0) {
      return res.status(404).json({ error: 'No threads found for this message' });
    }
    return res.status(200).json(threads);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching message threads: ' + error.message });
  }
};

export default getMessageThreadsController;
