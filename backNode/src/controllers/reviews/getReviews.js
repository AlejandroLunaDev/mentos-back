import { getReviews as getReviewsService } from '../../dao/reviews.dao.js';

const getReviews = async (req, res) => {
  try {
    const reviews = await getReviewsService();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener reseñas: ' + error.message });
  }
};

export default getReviews;
