import UserModel from './models/users.model.js'; // Ajusta la ruta según la ubicación de tu archivo de modelo

// Obtener todos los usuarios
// Obtener todos los usuarios con información de mentores y reviews poblada
const getUsers = async () => {
  try {
    return await UserModel.find()
      .populate({
        path: 'reviews',
        populate: { path: 'mentor', select: 'first_name last_name' }, // Si deseas también poblar el mentor dentro de la review
      })
      .populate('mentors', 'first_name last_name email') // Para obtener mentores
      .exec();
  } catch (error) {
    throw new Error('Error getting users: ' + error.message);
  }
};



// Obtener un usuario por ID
const getUserById = async (userId) => {
  try {
    return await UserModel.findById(userId).exec();
  } catch (error) {
    throw new Error('Error getting user by ID: ' + error.message);
  }
};

// Obtener un usuario por email
const getUserByEmail = async (email) => {
  try {
    return await UserModel.findOne({ email }).exec();
  } catch (error) {
    throw new Error('Error getting user by email: ' + error.message);
  }
};

// Agregar un nuevo usuario
const addUser = async (userData) => {
  try {
    const user = new UserModel(userData);
    return await user.save();
  } catch (error) {
    throw new Error('Error adding user: ' + error.message);
  }
};

// Actualizar un usuario por ID
// Actualizar un usuario por ID
const updateUser = async (userId, updateData) => {
  try {
    const user = await UserModel.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    ).exec();
    return user;
  } catch (error) {
    throw new Error('Error updating user: ' + error.message);
  }
};


// Eliminar un usuario por ID
const deleteUser = async (userId) => {
  try {
    return await UserModel.findByIdAndDelete(userId).exec();
  } catch (error) {
    throw new Error('Error deleting user: ' + error.message);
  }
};

// Añadir like a un mentor
const addLikeToUser = async (userId, likerId) => {
  try {
    return await UserModel.findByIdAndUpdate(
      userId,
      { $addToSet: { likes: likerId } }, // Evita duplicar likes del mismo usuario
      { new: true, runValidators: true }
    ).exec();
  } catch (error) {
    throw new Error('Error adding like to user: ' + error.message);
  }
};

// Añadir una review a un usuario
const addReviewToUser = async (userId, reviewId) => {
  try {
    return await UserModel.findByIdAndUpdate(
      userId,
      { $push: { reviews: reviewId } }, // Añade una nueva review
      { new: true, runValidators: true }
    ).exec();
  } catch (error) {
    throw new Error('Error adding review to user: ' + error.message);
  }
};

// Añadir un chat a un usuario
const addChatToUser = async (userId, chatId) => {
  try {
    return await UserModel.findByIdAndUpdate(
      userId,
      { $push: { chats: chatId } }, // Añade un nuevo chat al array de chats
      { new: true, runValidators: true }
    ).exec();
  } catch (error) {
    throw new Error('Error adding chat to user: ' + error.message);
  }
};

// Actualizar el campo 'top' para destacar a un mentor
const updateTopStatus = async (userId, topStatus) => {
  try {
    return await UserModel.findByIdAndUpdate(
      userId,
      { top: topStatus },
      { new: true, runValidators: true }
    ).exec();
  } catch (error) {
    throw new Error('Error updating top status: ' + error.message);
  }
};

// Añadir experiencia a un usuario
const addExperienceToUser = async (userId, experience) => {
  try {
    return await UserModel.findByIdAndUpdate(
      userId,
      { $push: { experience } }, // Añade una nueva experiencia al array de experiencias
      { new: true, runValidators: true }
    ).exec();
  } catch (error) {
    throw new Error('Error adding experience to user: ' + error.message);
  }
};

// Añadir formación (educación) a un usuario
const addEducationToUser = async (userId, education) => {
  try {
    return await UserModel.findByIdAndUpdate(
      userId,
      { $push: { education } }, // Añade una nueva formación al array de educación
      { new: true, runValidators: true }
    ).exec();
  } catch (error) {
    throw new Error('Error adding education to user: ' + error.message);
  }
};

// Añadir habilidades a un usuario
const addSkillsToUser = async (userId, skills) => {
  try {
    return await UserModel.findByIdAndUpdate(
      userId,
      { $addToSet: { skills: { $each: skills } } }, // Añade nuevas habilidades sin duplicar
      { new: true, runValidators: true }
    ).exec();
  } catch (error) {
    throw new Error('Error adding skills to user: ' + error.message);
  }
};

// Eliminar like de un usuario
const removeLikeFromUser = async (userId, likerId) => {
  try {
    return await UserModel.findByIdAndUpdate(
      userId,
      { $pull: { likes: likerId } }, // Elimina el like del array
      { new: true, runValidators: true }
    ).exec();
  } catch (error) {
    throw new Error('Error removing like from user: ' + error.message);
  }
};


export {
  getUsers,
  getUserById,
  getUserByEmail,
  addUser,
  updateUser,
  deleteUser,
  addLikeToUser,
  addReviewToUser,
  addChatToUser,
  updateTopStatus,
  addExperienceToUser,
  addEducationToUser,
  addSkillsToUser,
  removeLikeFromUser
};
