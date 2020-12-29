module.exports = {
  getPersonel: function (db) {
    return new Promise(function (resolve, reject) {
      try {
        var qry = `SELECT ps.idPerson, ps.PersonName, ps.PersonRegisterNo, pg.PersonGroupName, bc.MAC
          FROM ${process.env.DB_SCHEMA}.Person ps LEFT JOIN ${process.env.DB_SCHEMA}.Beacons bc 
          ON ps.idPerson = bc.idPerson
          LEFT JOIN ${process.env.DB_SCHEMA}.persongroup pg
          ON ps.idPersonGroup = pg.idPersonGroup`
        console.log(qry)
        db.query(qry, function (err, rows) {
          if (err) {
            reject(err)
          }
          var Person = []
          rows.forEach((row) => {
            Person.push({
              idPerson: row.idPerson,
              PersonName: row.PersonName,
              PersonRegisterNo: row.PersonRegisterNo,
              PersonGroupName: row.PersonGroupName,
              BeaconMAC: row.MAC
            })
          })
          resolve(Person)
        })
      } catch (error) {
        reject(error)
      }
    })
  }
}
