import express from 'express';
import cors from 'cors';
import { connectDB } from './config/configMongo.js';
import { addLogger } from './utils/logger.js';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerOptions from './utils/swaggerOptions.js';

import userRoutes from './routes/users.routes.js';
import sessionRoutes from './routes/sessions.routes.js';
import reviewRoutes from './routes/reviews.routes.js';
import messagesRoutes from './routes/messages.routes.js';

import { initializeSocket } from './config/socketConfig.js'; // Importar Socket.IO config
import { chatSocketHandler } from './utils/socketHandler.js'; // Importar socketHandler

const app = express();
const port = 8080;

// Conectar a la base de datos
connectDB();

// Configurar Passport
initializePassport();
app.use(passport.initialize());

// Configurar CORS para habilitar localhost:5371
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsOptions));

// Middleware para manejar peticiones JSON
app.use(express.json());
app.use(addLogger);
app.use(morgan('dev'));

// Configurar Swagger
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas de la API
app.use('/api/users', userRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/messages', messagesRoutes);

// Inicia el servidor HTTP
const server = app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

// Inicializa Socket.IO y el handler de eventos
const io = initializeSocket(server);
chatSocketHandler(io);
