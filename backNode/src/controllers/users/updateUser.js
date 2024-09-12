import { updateUser } from '../../dao/users.dao.js';

const updateUserController = async (req, res) => {
  const { id } = req.params;
  const { like, updateData } = req.body; // Supongamos que 'like' es opcional y 'updateData' contiene datos para actualizar

  try {
    let updatedUser;

    if (like) {
      // Si se está agregando un like, usa $addToSet para evitar duplicados
      const likeUpdate = {
        $addToSet: { likes: like }
      };
      updatedUser = await updateUser(id, likeUpdate);
    } else {
      // Para otras actualizaciones, pasa updateData directamente
      updatedUser = await updateUser(id, updateData);
    }

    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default updateUserController;
