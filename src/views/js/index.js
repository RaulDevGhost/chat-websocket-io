const socket = io();

function checkSocketStatus() {
  console.log('The state of the socket is ' + socket.connected);
}

//just for checking THIS IS NOT IMPIRTANT just for learning
socket.on('connect', () => {
  //just for checking
  checkSocketStatus();
});
socket.on('disconnect', () => {
  //just for checking
  checkSocketStatus();
});

socket.io.on('reconnect_attempt', () => {
  console.log('I am trying to reconnect !!!');
});

socket.io.on('reconnect', () => {
  console.log('Hello I am back again !!!');
});

// END just for checking THIS IS NOT IMPIRTANT just for learning

// Selecciono mis 3 botones que me permitirán conectarme a las salas
const connectRoom1 = document.querySelector('#connectRoom1');
const connectRoom2 = document.querySelector('#connectRoom2');
const connectRoom3 = document.querySelector('#connectRoom3');

// Eventos para que al hacer click me conecte a las salas

connectRoom1.addEventListener('click', () => {
  socket.emit('connect to room', 'room1');
});

connectRoom2.addEventListener('click', () => {
  socket.emit('connect to room', 'room2');
});

connectRoom3.addEventListener('click', () => {
  socket.emit('connect to room', 'room3');
});

// Enviar mensaje

const sendMessage = document.querySelector('#sendMessage');

sendMessage.addEventListener('click', () => {
  const message = prompt('Escribe tu mensaje:');

  socket.emit('message', message);
});

// Recibir el evento del mensaje

socket.on('send message', (data) => {
  //just for checking
  checkSocketStatus();

  const { room } = data;
  const { message } = data;

  const li = document.createElement('li');
  li.textContent = message;

  document.querySelector(`#${room}`).append(li);
});
