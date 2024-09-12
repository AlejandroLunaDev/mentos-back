import { addLikeToUser } from '../../dao/users.dao.js'; // Ajusta la ruta según la ubicación de tu archivo de DAO

const addLikeToUserController = async (req, res) => {
  const { userId, likerId } = req.body;

  try {
    const updatedUser = await addLikeToUser(userId, likerId);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default addLikeToUserController;
