import { deleteReview as deleteReviewService } from '../../dao/reviews.dao.js';

const deleteReview = async (req, res) => {
  try {
    const deletedReview = await deleteReviewService(req.params.id);
    if (!deletedReview) {
      return res.status(404).json({ message: 'Reseña no encontrada' });
    }
    res.status(200).json({ message: 'Reseña eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la reseña: ' + error.message });
  }
};

export default deleteReview;
