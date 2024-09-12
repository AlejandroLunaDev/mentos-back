import { updateUser } from '../../dao/users.dao.js'; // Ajusta la ruta según tu estructura
import generateJWT from '../../utils/generateJWT.js';
import config from '../../config/config.js';

const callbackGoogle = async (req, res) => {
  try {
    const user = req.user; // El usuario ya está autenticado con Google
    // Actualiza la fecha de la última conexión usando el DAO
    await updateUser(user._id, { last_connection: new Date() });

    // Construimos el objeto userLimited según el rol
    let userLimited = {
      id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
      avatar: user.avatar || user.thumbnail || '',
      age: user.age,
      top: user.top,
      likes: user.likes,
      mentors: user.mentors,
      reviews: user.reviews,
      messages: user.messages,
    };

    
    if (user.role === 'mentor') {
      userLimited = {
        ...userLimited,
        skills: user.skills,
        category: user.category,
        description: user.description,
        pricing: user.pricing,
        time_applied: user.time_applied,
        experience: user.experience,
        education: user.education,
      };
    }

    // Genera un token JWT para el usuario con los datos necesarios
    let cookieOptions = {
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      secure: process.env.NODE_ENV === 'production', 
      domain: process.env.NODE_ENV === 'production' ? 'localhost' : undefined,
      maxAge: 24 * 60 * 60 * 1000,
  };
    

    const token = generateJWT(userLimited);
    res.cookie(config.PASS_COOKIE, token, cookieOptions);

    // Redirige al usuario a la URL adecuada según el rol y el entorno
    const redirectURL =
      user.role === 'admin'
        ? process.env.NODE_ENV === 'production'
          ? 'https://mentos.com/admin'
          : 'http://localhost:5173/admin'
        : process.env.NODE_ENV === 'production'
        ? 'http://localhost:5173/'
        : 'http://localhost:5173/';

    res.status(200).redirect(redirectURL);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al iniciar sesión con Google');
  }
};

export default callbackGoogle;
