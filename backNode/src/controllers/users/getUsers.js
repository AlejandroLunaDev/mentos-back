import { getUsers } from '../../dao/users.dao.js';

const getUsersController = async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default getUsersController;
