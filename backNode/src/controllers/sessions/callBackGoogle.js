import { updateUser, getUserById } from '../../dao/users.dao.js'; // Asegúrate de tener un método para encontrar el usuario por ID
import generateJWT from '../../utils/generateJWT.js';
import config from '../../config/config.js';

const callbackGoogle = async (req, res) => {
  try {
    // El usuario autenticado con Google se obtiene de req.user
    const userId = req.user._id;

    // Buscar el usuario y hacer populate del campo mentors
    const user = await getUserById(userId).populate('mentors'); // Esto incluye la información completa de los mentores

    // Actualizar la última conexión del usuario
    await updateUser(user._id, { last_connection: new Date() });

    // Construimos el objeto userLimited
    const userLimited = {
      id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
      avatar: user.avatar || user.thumbnail || '',
      age: user.age,
      mentors: user.mentors, // Aquí ya estará populado
      reviews: user.reviews,
      chats: user.chats,
    };

    // Si el usuario es mentor, añadimos campos adicionales
    if (user.role === 'mentor') {
      Object.assign(userLimited, {
        skills: user.skills,
        category: user.category,
        description: user.description,
        pricing: user.pricing,
        time_applied: user.time_applied,
        experience: user.experience,
        education: user.education,
      });
    }

    // Generar token JWT con la información del usuario
    const token = generateJWT(userLimited);

    // Redirigir al cliente con el token en la URL
    const redirectUrl = `http://localhost:5173/?token=${token}`;
    res.redirect(redirectUrl);
    
  } catch (error) {
    console.error('Error en el callback de Google:', error);
    return res.status(500).send('Error al iniciar sesión con Google');
  }
};

export default callbackGoogle;
