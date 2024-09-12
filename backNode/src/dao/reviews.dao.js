import ReviewModel from './models/reviews.model.js'; // Ajusta la ruta según tu estructura

// Obtener todas las reseñas
const getReviews = async () => {
  try {
    return await ReviewModel.find().populate('mentee').populate('mentor').exec();
  } catch (error) {
    throw new Error('Error getting reviews: ' + error.message);
  }
};

// Obtener una reseña por ID
const getReviewById = async (reviewId) => {
  try {
    return await ReviewModel.findById(reviewId).populate('mentee').populate('mentor').exec();
  } catch (error) {
    throw new Error('Error getting review by ID: ' + error.message);
  }
};

// Obtener reseñas por mentor
const getReviewsByMentor = async (mentorId) => {
  try {
    return await ReviewModel.find({ mentor: mentorId }).populate('mentee').exec();
  } catch (error) {
    throw new Error('Error getting reviews by mentor: ' + error.message);
  }
};

// Obtener reseñas por mentee
const getReviewsByMentee = async (menteeId) => {
  try {
    return await ReviewModel.find({ mentee: menteeId }).populate('mentor').exec();
  } catch (error) {
    throw new Error('Error getting reviews by mentee: ' + error.message);
  }
};

// Crear una nueva reseña
const addReview = async (reviewData) => {
  try {
    const review = new ReviewModel(reviewData);
    return await review.save();
  } catch (error) {
    throw new Error('Error adding review: ' + error.message);
  }
};

// Actualizar una reseña por ID
const updateReview = async (reviewId, updateData) => {
  try {
    return await ReviewModel.findByIdAndUpdate(reviewId, updateData, { new: true, runValidators: true }).populate('mentee').populate('mentor').exec();
  } catch (error) {
    throw new Error('Error updating review: ' + error.message);
  }
};

// Eliminar una reseña por ID
const deleteReview = async (reviewId) => {
  try {
    return await ReviewModel.findByIdAndDelete(reviewId).exec();
  } catch (error) {
    throw new Error('Error deleting review: ' + error.message);
  }
};

export {
  getReviews,
  getReviewById,
  getReviewsByMentor,
  getReviewsByMentee,
  addReview,
  updateReview,
  deleteReview
};
