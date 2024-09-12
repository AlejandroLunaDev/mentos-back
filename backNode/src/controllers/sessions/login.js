import bcrypt from 'bcrypt';
import UserModel from '../../dao/models/users.model.js';
import generateJWT from '../../utils/generateJWT.js';
import config from '../../config/config.js';

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Debe completar todos los campos' });
    }

    // Buscar al usuario por el correo electrónico
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: `Error: el usuario con el correo electrónico ${email} no existe` });
    }

    // Comparar la contraseña proporcionada con la almacenada
    const isMatch = await bcrypt.compare(password.trim(), user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Limitar la información del usuario que se incluye en el token JWT
    const userLimited = {
      id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
      avatar: user.avatar || '', // Incluye el avatar si existe
    };

    // Generar el token JWT
    const token = generateJWT(userLimited);

    // Configurar la cookie con el token
    res.cookie(config.PASS_COOKIE, token, {
      maxAge: 1000 * 60 * 60, // 1 hora
      httpOnly: true,
      sameSite: 'Lax',
    });

    // Actualizar la fecha de la última conexión
    await UserModel.findByIdAndUpdate(user._id, { last_connection: new Date() });

    // Responder con la información del usuario
    res.status(200).json({
      user: {
        id: userLimited.id,
        first_name: userLimited.first_name,
        last_name: userLimited.last_name,
        role: userLimited.role,
        avatar: userLimited.avatar, // Incluir el avatar en la respuesta
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export default login;
