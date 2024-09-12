import { Server } from 'socket.io';

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173', // Permitir CORS para el front-end
      methods: ['GET', 'POST'],
    },
  });

  // Establecemos la lógica de conexión y eventos aquí
  io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });

    // Aquí se pueden añadir más listeners para eventos específicos de chat
  });

  return io;
};
