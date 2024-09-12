import { getReviewById as getReviewByIdService } from '../../dao/reviews.dao.js';

const getReviewById = async (req, res) => {
  try {
    const review = await getReviewByIdService(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Reseña no encontrada' });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener reseña por ID: ' + error.message });
  }
};

export default getReviewById;
