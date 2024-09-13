import { updateUser } from '../../dao/users.dao.js';
import generateJWT from '../../utils/generateJWT.js';
import config from '../../config/config.js';

const callbackGoogle = async (req, res) => {
  try {
    const user = req.user; // El usuario ya está autenticado con Google
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
      mentor: user.mentor,
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

    // Generar token JWT
    const token = generateJWT(userLimited);

    // Guardar token en localStorage usando el cliente
    // Aquí hacemos una redirección con un token en la URL
    const redirectUrl = `http://localhost:5173/?token=${token}`;

    // Redirigir al cliente con el token en la URL
    res.redirect(redirectUrl);
    
  } catch (error) {
    console.error('Error en el callback de Google:', error);
    return res.status(500).send('Error al iniciar sesión con Google');
  }
};

export default callbackGoogle;
