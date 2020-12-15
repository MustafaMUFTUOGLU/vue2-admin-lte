module.exports = {
  getBaseStations: function (db, UstKategoriAdi) {
    console.log('--------', UstKategoriAdi)
    return new Promise(function (resolve, reject) {
      db
      .then(session => {
        session.sql(`SELECT basestation.BaseStationName, ST_X(BaseStationLocation) AS 'X', ST_Y(BaseStationLocation) AS 'Y'
        FROM ${process.env.DB_SCHEMA}.basestation LEFT JOIN ${process.env.DB_SCHEMA}.topcategory 
        ON basestation.idTopCategory = topcategory.idTopCategory
        WHERE topcategory.TopCategoryName = '` + UstKategoriAdi + `'`)
        .execute()
        .then(res => {
          var rows = res.fetchAll()
          // console.log(rows) // ['bar', 42]
          var Gateway = []
          rows.forEach((row) => {
            console.log(row)
            Gateway.push({
              BaseStationName: row[0],
              X: row[1],
              Y: row[2]
            })
          })
          resolve(Gateway)
        })
      })
    // db.serialize(() => {
      // db.all(`SELECT BaseStations.* FROM BaseStations LEFT JOIN BolgeUstKategori ON BaseStations.UstKategoriId = BolgeUstKategori.UstKategoriId WHERE BolgeUstKategori.UstKategoriAdi = "` + UstKategoriAdi + '"', (err, rows) => {
      //   if (err) {
      //     console.error(err.message)
      //   }
      //   resolve(rows)
      // })
    // });
    })
  }
}
