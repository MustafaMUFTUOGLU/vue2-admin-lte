const sqlite3 = require('sqlite3').verbose();

var datam = [];

let db = new sqlite3.Database('./db.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the chinook database.');
});

db.serialize(() => {
  db.each(`SELECT * FROM Bolgeler`, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    console.log(row);
    datam.push({
      type: 'item',
      icon: 'fa fa-circle-o',
      name: row.BolgeAdi,
      router: {
        name: 'rooms/' + row.BolgeAdi.replace(/\s/g, '')
      }
    });
  });
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});

module.exports = function () {


  //var data = { products: [] }
  var data = { roomslist :[
    {
      type: 'item',
      isHeader: true,
      name: 'MAIN NAVIGATION'
    },
    {
      type: 'tree',
      icon: 'fa fa-dashboard',
      name: 'Katlar',
      items: datam
    }
  ]}
  // Create 1000 Product
  //data.products = generateFakeObject(FakeProdcut, 5) 
  return data 
}
 
