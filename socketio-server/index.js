const http = require('http').createServer();
const io = require('socket.io')(http);

console.log("SOCKET IO SERVER START");
http.listen(4001);

let users = [];
let messages = [];
let beacons = [
  {id : 1, x :10, y:20  },
  {id : 2, x :30, y:40  },
  {id : 3, x :50, y:60  },
  {id : 4, x :70, y:80  },
]

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

io.of("/lobby").on("connect", socket => {
  io.on('connection', socket => {

    socket.on('new_user', (name) => {
      users.push({
        id: socket.id,
        name
      });
      io.emit('users', users);
      io.emit('messages', messages);
    });

    socket.on('new_message', (message) => {
      messages.push("<b>" + message.name + ":</b> " + message.message);
      io.emit('messages', messages);
    });

    socket.on('disconnect', () => {
      const index = users.indexOf(socket.id);
      users.splice(index, 1);
      io.emit('users', users);
    });
  });
});

const intervalObj = setInterval(() => {
  //console.log('interviewing the interval');
  beacons.forEach(element => {
    element.x = getRandomInt(10,700);
    element.y = getRandomInt(10,700);
  });
  
  io.of("/lobby").emit('beacons', beacons);
}, 1000);