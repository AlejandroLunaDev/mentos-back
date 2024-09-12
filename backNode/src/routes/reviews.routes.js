import express from 'express';
import {
  getReviews,
  getReviewById,
  getReviewsByMentor,
  getReviewsByMentee,
  addReview,
  updateReview,
  deleteReview
} from '../controllers/reviews.controller.js';

const router = express.Router();

// Ruta para obtener todas las reseñas
router.get('/', getReviews);

// Ruta para obtener una reseña por ID
router.get('/:id', getReviewById);

// Ruta para obtener reseñas por ID del mentor
router.get('/mentor/:mentorId', getReviewsByMentor);

// Ruta para obtener reseñas por ID del mentee
router.get('/mentee/:menteeId', getReviewsByMentee);

// Ruta para crear una nueva reseña
router.post('/', addReview);

// Ruta para actualizar una reseña por ID
router.put('/:id', updateReview);

// Ruta para eliminar una reseña por ID
router.delete('/:id', deleteReview);

export default router;
