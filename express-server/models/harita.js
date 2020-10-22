module.exports = {
  getHarita: function (db, UstKategoriAdi) {
    return new Promise(function (resolve, reject) {
      // db.serialize(() => {
        console.log(UstKategoriAdi);
      db.get(`SELECT * FROM BolgeUstKategori WHERE UstKategoriAdi = "` + UstKategoriAdi + '"', (err, rows) => {
       
        if (err) {
          console.error(err.message)
          resolve(null)
        } else {
          resolve(rows.SvgPlane)
        }
      })
      // });
    })
  },
  getHaritaBound: function (db, UstKategoriAdi, AltKategoriAdi) {
    return new Promise(function (resolve, reject) {
      // db.serialize(() => {
        console.log(UstKategoriAdi , AltKategoriAdi );
      db.get(`SELECT BolgeAltKategori.Bounds AS [Bounds] FROM BolgeUstKategori LEFT JOIN BolgeAltKategori on BolgeUstKategori.UstKategoriId = BolgeAltKategori.UstKategoriId WHERE UstKategoriAdi = "` + UstKategoriAdi + '" AND AltKategoriAdi = "' + AltKategoriAdi + '"', (err, rows) => {
        
        if (err) {
          console.error(err.message)
          resolve(null)
        } else { 
          resolve(JSON.parse(rows.Bounds))
        }
      })
      // });
    })
  }
}
