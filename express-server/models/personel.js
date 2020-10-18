module.exports = {
  getPersonel: function (db) {
    return new Promise(function (resolve, reject) {
      db.all(`SELECT Personel.*, Tags.TagId, Tags.TagMac
        FROM Personel LEFT JOIN Tags ON Personel.PersonelId = Tags.PersonelId`, (err, rows) => {
        if (err) {
          console.error(err.message)
        }
        resolve(rows)
      })
    })
  }
}
