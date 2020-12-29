// const sqlite3 = require('sqlite3').verbose()
require('dotenv').config({path: '.server.env'})
const mysql = require('mysql')
var categorys = require('./categorys.js')
var personel = require('./personel.js')
var maps = require('./maps.js')
var basestation = require('./basestation.js')

var db = mysql.createConnection({
  host: process.env.DB_SERVER,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWD
})

db.connect(function (err) {
  if (err) throw err
  console.log('MYSQL Connected!')
})

module.exports = {
  db,
  categorys,
  personel,
  maps,
  basestation
}
