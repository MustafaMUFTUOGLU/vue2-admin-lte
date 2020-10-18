module.exports = {
  getHarita: function (db, UstKategoriId) {
    return new Promise(function (resolve, reject) {
      // db.serialize(() => {
      db.get(`SELECT * FROM BolgeUstKategori WHERE UstKategoriId = ` + UstKategoriId, (err, rows) => {
        if (err) {
          console.error(err.message)
          resolve(null)
        } else {
          resolve(rows.SvgPlane)
        }
      })
      // });
    })
  }
}
