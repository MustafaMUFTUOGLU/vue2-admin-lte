module.exports = {
  getPersonel: function (db) {
    return new Promise(function (resolve, reject) {
      db
      .then(session => {   
        session.sql(`SELECT ps.idPerson, ps.PersonName, ps.PersonRegisterNo, pg.PersonGroupName, bc.MAC
        FROM ${process.env.DB_SCHEMA}.Person ps LEFT JOIN ${process.env.DB_SCHEMA}.Beacons bc 
        ON ps.idPerson = bc.idPerson
        LEFT JOIN ${process.env.DB_SCHEMA}.persongroup pg
        ON ps.idPersonGroup = pg.idPersonGroup`)
        .execute()
        .then(res => {
          var rows = res.fetchAll()
          console.log(rows) // ['bar', 42]
          var Person = []
          rows.forEach((row) => {
            Person.push({
              idPerson: row[0],
              PersonName: row[1],
              PersonRegisterNo: row[2],
              PersonGroupName: row[3],
              BeaconMAC: row[4]
            })
          })
          resolve(Person)
        })
      })

      // db.all(`SELECT Personel.*, Tags.TagId, Tags.TagMac
      //   FROM Personel LEFT JOIN Tags ON Personel.PersonelId = Tags.PersonelId`, (err, rows) => {
      //   if (err) {
      //     console.error(err.message)
      //   }
      //   resolve(rows)
      // })
    })
  }
}
