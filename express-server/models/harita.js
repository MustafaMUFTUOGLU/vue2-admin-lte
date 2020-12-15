module.exports = {
  getHarita: function (db, UstKategoriAdi) {
    return new Promise(function (resolve, reject) {
      // db.serialize(() => {
      console.log(UstKategoriAdi)
      db
      .then(session => {
        session.sql(`SELECT mp.SvgFileName, mp.SvgHeight, mp.SvgWidth FROM 
        ${process.env.DB_SCHEMA}.TopCategory tc
        LEFT JOIN ${process.env.DB_SCHEMA}.maps mp ON tc.idMaps = mp.idMaps
        WHERE tc.TopCategoryName = ?`)
        .bind(UstKategoriAdi)
        .execute()
        .then(res => {
          var row = res.fetchOne()
          console.log(row) // ['bar', 42]
          resolve({
            svg: row[0],
            height: row[1],
            width: row[2]
          })
        })
      })
      // db.get(`SELECT * FROM BolgeUstKategori WHERE UstKategoriAdi = "` + UstKategoriAdi + '"', (err, rows) => {
      //   if (err) {
      //     console.error(err.message)
      //     resolve(null)
      //   } else {
      //     resolve({
      //       svg: rows.SvgPlane,
      //       width: rows.SvgWidth,
      //       height: rows.SvgHeight
      //     })
      //   }
      // })
      // });
    })
  },
  getHaritaBound: function (db, UstKategoriAdi, AltKategoriAdi) {
    return new Promise(function (resolve, reject) {
      // db.serialize(() => {
      console.log(UstKategoriAdi, AltKategoriAdi)
      // db.get(`SELECT BolgeAltKategori.Bounds AS [Bounds] FROM BolgeUstKategori LEFT JOIN BolgeAltKategori on BolgeUstKategori.UstKategoriId = BolgeAltKategori.UstKategoriId WHERE UstKategoriAdi = "` + UstKategoriAdi + '" AND AltKategoriAdi = "' + AltKategoriAdi + '"', (err, rows) => {
      //   if (err) {
      //     console.error(err.message)
      //     resolve(null)
      //   } else {
      //     resolve(JSON.parse(rows.Bounds))
      //   }
      // })
      resolve(null)
      // });
    })
  }
}
