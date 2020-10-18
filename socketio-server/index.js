const http = require('http').createServer()
const io = require('socket.io')(http)
const sqlite3 = require('sqlite3').verbose()

var bolgeler = []

console.log('SOCKET IO SERVER START')
http.listen(4001)

let db = new sqlite3.Database('./db.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message)
  }
  console.log('Connected to the chinook database.')
})

db.serialize(() => {
  // db.each(`SELECT * FROM BolgeUstKategori`, (err, row) => {
  //   if (err) {
  //     console.error(err.message);
  //   }
  //   var bolgeAdi = row.Adi.replace(/\s/g, '');

  //   //console.log(row);
  //   bolgeler.push({Bolge: row,
  //    Beacons: [
  //     {id : bolgeAdi+"1", x :10, y:20  },
  //     {id : bolgeAdi+"2", x :30, y:40  },
  //     {id : bolgeAdi+"3", x :50, y:60  },
  //     {id : bolgeAdi+"4", x :70, y:80  }]
  //   });

  //   //row.forEach(element => {
  //     console.log("/"+ bolgeAdi)

  // });
})

var tmpc = io.of('/Beacons')
// .on("connect", socket => {

tmpc.on('connection', conn => {
  console.log('connection: ')

  // socket.on('new_user', (name) => {
  //   users.push({
  //     id: socket.id,
  //     name
  //   });
  //   io.emit('users', users);
  //   io.emit('messages', messages);
  // });

  // socket.on('new_message', (message) => {
  //   messages.push("<b>" + message.name + ":</b> " + message.message);
  //   io.emit('messages', messages);
  // });

  conn.on('disconnect', () => {
    //  clearInterval(intervalObj);
    // const index = users.indexOf(socket.id);
    // users.splice(index, 1);
    // io.emit('users', users);
  })
})
// });

// });
const intervalObj = setInterval(() => {
  // console.log('interviewing the interval: ');
  bolgeler.forEach(element => {
    element.Beacons.forEach(beacon => {
      beacon.x = getRandomInt(10, 700)
      beacon.y = getRandomInt(10, 700)
    })
  })

  // tmpc.emit('beacons', bolgeler);
}, 1000)

db.close((err) => {
  if (err) {
    console.error(err.message)
  }
  console.log('Close the database connection.')
})

function getRandomInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) // The maximum is exclusive and the minimum is inclusive
}

