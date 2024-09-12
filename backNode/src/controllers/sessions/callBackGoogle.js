import { updateUser } from '../../dao/users.dao.js';
import generateJWT from '../../utils/generateJWT.js';
import config from '../../config/config.js';

const callbackGoogle = async (req, res) => {
  try {
    const user = req.user; // El usuario ya está autenticado con Google
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

    // Generar token JWT
    const token = generateJWT(userLimited);

    if (process.env.NODE_ENV === 'development') {
      // En local, puedes enviar el token en una cookie
      const cookieOptions = {
        sameSite: 'Lax',
        secure: false,
        maxAge: 24 * 60 * 60 * 1000, // 1 día
      };
      res.cookie(config.PASS_COOKIE, token, cookieOptions);

      // Redirigir al frontend local en desarrollo
      return res.status(200).redirect('http://localhost:5173/');
    }

    // En producción, enviar el token en JSON
    if (process.env.NODE_ENV === 'production') {
      return res.status(200).json({
        message: 'Inicio de sesión exitoso',
        token,  // Enviar el token en el cuerpo de la respuesta
        redirectURL: user.role === 'admin' 
          ? 'https://mentos.com/admin' 
          : 'https://mentos.com/', // URL adecuada para producción
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error al iniciar sesión con Google');
  }
};

export default callbackGoogle;
