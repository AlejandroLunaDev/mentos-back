import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ['constructivo', 'motivacion', 'comunicador', 'resolucion de dudas', 'didactico'],
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
});

const reviewSchema = new mongoose.Schema({
  mentee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', // Referencia al usuario mentee que hace la reseña
    required: true,
  },
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', // Referencia al usuario mentor que recibe la reseña
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  overallRating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  categories: [categorySchema], // Campo para las categorías con calificaciones
});

const ReviewModel = mongoose.model('reviews', reviewSchema);

export default ReviewModel;
