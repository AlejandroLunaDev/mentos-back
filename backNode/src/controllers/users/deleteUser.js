import { deleteUser } from '../../dao/users.dao.js';

const deleteUserController = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteUser(id);
    if (result) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default deleteUserController;
