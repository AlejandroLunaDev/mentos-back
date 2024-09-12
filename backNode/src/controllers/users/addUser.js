import { addUser } from '../../dao/users.dao.js';

const addUserController = async (req, res) => {
  const userData = req.body;
  try {
    const user = await addUser(userData);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default addUserController;
