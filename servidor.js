const http = require('http');
const socketIO = require('socket.io');
const axios = require('axios');

// Crear servidor HTTP
const server = http.createServer();
const io = socketIO(server);

// Manejar la conexión del cliente
io.on('connection', (socket) => {
  console.log('Cliente conectado');

  // Escuchar evento 'consulta-api' desde el cliente
  socket.on('consulta-api', () => {
    // Realizar la consulta a la API de Chuck Norris Jokes utilizando axios
    axios.get('https://api.chucknorris.io/jokes/random')
      .then((response) => {
        const joke = response.data.value; // Obtener el chiste de la respuesta de la API

        // Enviar el chiste al cliente
        socket.emit('resultado-api', joke);
      })
      .catch((error) => {
        console.error('Error al consultar la API:', error.message);
        // Enviar un mensaje de error al cliente
        socket.emit('error-api', 'Error al consultar la API');
      });
  });

  // Manejar desconexiones del cliente
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

// Iniciar el servidor en el puerto 3000
server.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
