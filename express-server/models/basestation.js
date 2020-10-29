module.exports = {
  getBaseStations: function (db, UstKategoriAdi) {
    return new Promise(function (resolve, reject) {
    // db.serialize(() => {
      db.all(`SELECT BaseStations.* FROM BaseStations LEFT JOIN BolgeUstKategori ON BaseStations.UstKategoriId = BolgeUstKategori.UstKategoriId WHERE BolgeUstKategori.UstKategoriAdi = "` + UstKategoriAdi + '"', (err, rows) => {
        if (err) {
          console.error(err.message)
        }
        resolve(rows)
      })
    // });
    })
  }
}
