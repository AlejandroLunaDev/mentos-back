import * as userDao from '../../dao/users.dao.js'; // Ajusta la ruta según la ubicación de tu archivo DAO

// Controlador para agregar un mentor a un usuario
const addMentorToUserController = async (req, res) => {
  const { userId, mentorId } = req.params;

  try {
    // Verificamos si ambos usuarios existen
    const user = await userDao.getUserById(userId);
    const mentor = await userDao.getUserById(mentorId);

    if (!user || !mentor) {
      return res.status(404).json({ message: 'Usuario o mentor no encontrado' });
    }

    // Verificamos que el mentor tenga el rol adecuado
    if (mentor.role !== 'mentor') {
      return res.status(400).json({ message: 'El usuario seleccionado no es un mentor' });
    }

    // Agregar el mentor al usuario
    const updatedUser = await userDao.addMentorToUser(userId, mentorId);

    return res.status(200).json({
      message: 'Mentor agregado exitosamente',
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al agregar el mentor al usuario',
      error: error.message,
    });
  }
};

export default addMentorToUserController;
