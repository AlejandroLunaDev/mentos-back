import { getReviewsByMentor as getReviewsByMentorService } from '../../dao/reviews.dao.js';

const getReviewsByMentor = async (req, res) => {
  try {
    const reviews = await getReviewsByMentorService(req.params.mentorId);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener reseñas por mentor: ' + error.message });
  }
};

export default getReviewsByMentor;
