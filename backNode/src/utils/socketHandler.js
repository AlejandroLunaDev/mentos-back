export const chatSocketHandler = (io) => {
    io.on('connection', (socket) => {
      console.log(`User connected: ${socket.id}`);
  
      // Escuchar cuando se envíe un mensaje
      socket.on('sendMessage', (data) => {
        const { chatId, senderId, message } = data;
  
        // Lógica para guardar el mensaje en la base de datos si lo deseas
        // Emitir el mensaje a los demás participantes del chat
        io.to(chatId).emit('receiveMessage', {
          chatId,
          senderId,
          message,
        });
      });
  
      // Únete a una sala de chat específica
      socket.on('joinChat', (chatId) => {
        socket.join(chatId);
        console.log(`User ${socket.id} joined chat ${chatId}`);
      });
  
      // Salir de la sala de chat cuando el usuario se desconecte
      socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
      });
    });
  };
  