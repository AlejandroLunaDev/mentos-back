import { addReview } from '../../dao/reviews.dao.js'; // Ajusta la ruta según tu estructura
import { getUserById, addReviewToUser } from '../../dao/users.dao.js'; // Ajusta la ruta según tu estructura

// Controlador para agregar una reseña
const addReviewController = async (req, res) => {
  try {
    const { mentee, mentor, overallRating, message, categories } = req.body;

    // Validar la presencia de los campos necesarios
    if (!mentee || !mentor || overallRating === undefined || !message || !Array.isArray(categories)) {
      return res.status(400).json({ error: 'Faltan datos requeridos o la estructura es incorrecta' });
    }

    // Validar que los usuarios existan
    const menteeUser = await getUserById(mentee);
    const mentorUser = await getUserById(mentor);

    if (!menteeUser || !mentorUser) {
      return res.status(404).json({ error: 'Usuario(s) no encontrado(s)' });
    }

    // Validar que la calificación esté en el rango permitido
    if (overallRating < 1 || overallRating > 5) {
      return res.status(400).json({ error: 'La calificación debe estar entre 1 y 5' });
    }

    // Validar que cada categoría tenga el nombre y calificación
    for (const category of categories) {
      if (!category.name || !category.rating) {
        return res.status(400).json({ error: 'Cada categoría debe tener un nombre y una calificación' });
      }
    }

    // Crear el objeto de reseña
    const reviewData = {
      mentee,
      mentor,
      overallRating,
      message,
      categories,
    };
    
    // Llamar a la función DAO para agregar la reseña
    const newReview = await addReview(reviewData);
    console.log('New Review:', newReview);

    // Actualizar el array de reseñas de los usuarios
  
    await addReviewToUser(mentor, newReview._id);
    console.log('New Review:', newReview._id);

    // Devolver la reseña agregada
    return res.status(201).json(newReview);
  } catch (error) {
    console.error('Error adding review:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export default addReviewController;
