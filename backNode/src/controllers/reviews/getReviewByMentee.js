import { getReviewsByMentee as getReviewsByMenteeService } from '../../dao/reviews.dao.js';

const getReviewsByMentee = async (req, res) => {
  try {
    const reviews = await getReviewsByMenteeService(req.params.menteeId);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener reseñas por mentee: ' + error.message });
  }
};

export default getReviewsByMentee;
