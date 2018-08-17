const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());

app.post('/api', function (req, res) {
  console.log(req.url);
  res.json(req.body);
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

let numberOfUsers = 0;

io.on('connection', (socket)=>{
  console.log('user logged in');
  numberOfUsers++;
  console.log(`${numberOfUsers} current Users`);

  socket.join('room 237', () => {
    let rooms = Object.keys(socket.rooms);
    console.log(rooms); // [ <socket.id>, 'room 237' ]
  });

  socket.on('testEvent', (message) => {
    console.log(message);
    // socket.send(message);
    io.sockets.send(message);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    numberOfUsers--;
    console.log(`${numberOfUsers} current Users`);
  });
});

server.listen(port, ()=> {
  console.log(`Listening on port ${port}`)
});
