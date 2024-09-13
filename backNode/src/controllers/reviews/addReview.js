import { addReview } from '../../dao/reviews.dao.js'; // Ajusta la ruta según tu estructura
import { getUserById, addReviewToUser } from '../../dao/users.dao.js'; // Ajusta la ruta según tu estructura

// Las categorías permitidas según el esquema
const allowedCategories = [
  'constructivo',
  'motivacion',
  'comunicador',
  'resolucion de dudas',
  'didactico'
];

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

    // Validar que las 4 categorías estén presentes y que cada una tenga su calificación
    const formattedCategories = [];
    for (const category of allowedCategories) {
      const categoryFromRequest = categories.find(cat => cat.name === category);
      
      if (!categoryFromRequest || !categoryFromRequest.rating || categoryFromRequest.rating < 1 || categoryFromRequest.rating > 5) {
        return res.status(400).json({ error: `La categoría ${category} debe tener una calificación válida entre 1 y 5` });
      }

      // Agregar la categoría al array de categorías formateadas
      formattedCategories.push({
        name: category,
        rating: categoryFromRequest.rating
      });
    }

    // Crear el objeto de reseña
    const reviewData = {
      mentee,
      mentor,
      overallRating,
      message,
      categories: formattedCategories, // Usar solo las 4 categorías permitidas
    };
    
    // Llamar a la función DAO para agregar la reseña
    const newReview = await addReview(reviewData);

    // Actualizar el array de reseñas de los usuarios
    await addReviewToUser(mentor, newReview._id);

    // Devolver la reseña agregada
    return res.status(201).json(newReview);
  } catch (error) {
    console.error('Error adding review:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export default addReviewController;
