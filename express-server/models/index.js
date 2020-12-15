// const sqlite3 = require('sqlite3').verbose()
require('dotenv').config({path: '.server.env'})
const mysqlx = require('@mysql/xdevapi') 
var bolgeler = require('./bolgeler.js')
var personel = require('./personel.js')
var harita = require('./harita.js')
var basestation = require('./basestation.js')

// var db = {
//   session: {},
//   tableMaps: {}
// }

var db = mysqlx.getSession({ user: process.env.DB_USER, password: process.env.DB_PASSWD })
  // .then(session => {
  //   return session // session.getSchema(process.env.DB_SCHEMA)
  // })
// let db = new sqlite3.Database('./db.db', sqlite3.OPEN_READWRITE, (err) => {
//   if (err) {
//     console.error(err.message)
//   }
//   console.log('Connected to the chinook database.')
// })

// db.close((err) => {
//     if (err) {
//         console.error(err.message);
//     }
//     console.log('Close the database connection.');
// });

module.exports = {
  db,
  bolgeler,
  personel,
  harita,
  basestation
}
