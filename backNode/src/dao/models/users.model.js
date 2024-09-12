import mongoose from 'mongoose';

const collection = 'users';

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: false,
  },
  age: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'mentee', 'mentor'],
    default: 'mentee',
  },
  avatar: {
    type: String,
    default: '',
  },
  last_connection: {
    type: Date,
    default: Date.now,
  },
  mentors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: collection, // Referencia a la misma colección
    },
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'reviews', // Vinculación con la colección de reviews
    },
  ],
  top: {
    type: Boolean,
    default: false, // Campo booleano para destacar a los mentores
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: collection, // Referencia a los usuarios que han dado like
    },
  ],
  chats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'chats', // Referencia a los chats en los que participa el usuario
    },
  ],
  // Campos adicionales para los mentores
  skills: {
    type: [String], // Array de habilidades del mentor
  },
  category: {
    type: [String], // Array de categorías de la mentoría
  },
  description: {
    type: String, // Descripción sobre el mentor
  },
  pricing: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'pricings', // Relación con la colección de precios (3 precios fijos)
    },
  ],
  time_applied: {
    type: Number, // Tiempo aplicado a mentorías (en horas o formato necesario)
  },
  experience: [
    {
      title: { type: String, required: true }, // Título del puesto o experiencia
      place: { type: String, required: true }, // Lugar donde se realizó
      start_date: { type: Date, required: true }, // Fecha de inicio
      end_date: { type: Date, required: true }, // Fecha de finalización
    },
  ],
  education: [
    {
      title: { type: String, required: true }, // Título académico o curso
      place: { type: String, required: true }, // Institución educativa
      start_date: { type: Date, required: true }, // Fecha de inicio
      end_date: { type: Date, required: true }, // Fecha de finalización
    },
  ],
});

const UserModel = mongoose.model(collection, userSchema);

export default UserModel;
