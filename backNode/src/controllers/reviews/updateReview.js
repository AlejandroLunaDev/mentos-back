import { updateReview as updateReviewService } from '../../dao/reviews.dao.js';

const updateReview = async (req, res) => {
  try {
    const updatedReview = await updateReviewService(req.params.id, req.body);
    if (!updatedReview) {
      return res.status(404).json({ message: 'Reseña no encontrada' });
    }
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la reseña: ' + error.message });
  }
};

export default updateReview;
