import UserModel from '../../dao/models/users.model.js';
import bcrypt from 'bcrypt';

const saltRounds = 10;

const register = async (req, res) => {
  const { first_name, last_name, age, email, password, role, skills, category, description, pricing, time_applied, experience, education } = req.body;

  // Validar campos requeridos
  if (!first_name || !age || !email || !password) {
    return res.status(400).json({ message: 'Faltan campos requeridos' });
  }

  try {
    // Verificar si el correo ya está registrado
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Crear un nuevo usuario con los campos requeridos y campos por defecto
    const newUser = new UserModel({
      first_name,
      last_name,
      age,
      email,
      password: hashedPassword,
      role: role || 'mentee',  // Si no se proporciona un rol, el valor predeterminado es 'mentee'
      likes: [],       // Inicializar como un array vacío
      reviews: [],     // Inicializar como un array vacío
      chats: [],       // Inicializar como un array vacío
      top: false,      // Inicializar el campo booleano en false
    });

    // Si el rol es mentor, incluir los campos adicionales
    if (role === 'mentor') {
      newUser.skills = skills || [];
      newUser.category = category || [];
      newUser.description = description || '';
      newUser.pricing = pricing || [];
      newUser.time_applied = time_applied || 0;
      newUser.experience = experience || [];
      newUser.education = education || [];
    }

    // Guardar el usuario en la base de datos
    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
};

export default register;
