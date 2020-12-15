module.exports = {
  getBolgeler: function (db) {
    return new Promise(function (resolve, reject) {
      // db.serialize(() => {${process.env.DB_SCHEMA}
      db
      .then(session => {
        session.sql(`SELECT tc.idTopCategory, tc.TopCategoryName, sc.idTopCategory, sc.SubCategoryName, sc.SubCategoryPolygon FROM 
        ${process.env.DB_SCHEMA}.TopCategory tc LEFT JOIN ${process.env.DB_SCHEMA}.SubCategory sc ON
        tc.idTopCategory = sc.idTopCategory`)
        .execute()
        .then(res => {
          var rows = res.fetchAll()
          // console.log(rows) // ['bar', 42]
          var bolgeler = []
          rows.forEach((row) => {
            var uk = bolgeler.find(o => o.UstKategoriId === row[0])
            if (uk === undefined) {
              uk = {
                UstKategoriId: row[0],
                UstKategoriAdi: row[1],
                AltKategori: []
              }
              bolgeler.push(uk)
            }
            uk.AltKategori.push({
              AltKategoriId: row[2],
              AltKategoriAdi: row[3],
              SubCategoryPolygon: row[4]
            })
          })
          // console.log(bolgeler)
          resolve(bolgeler)
        })
        // return session // session.getSchema(process.env.DB_SCHEMA)
      })
    //   db.all(`SELECT * FROM BolgeUstKategori LEFT JOIN BolgeAltKategori ON BolgeUstKategori.UstKategoriId = BolgeAltKategori.UstKategoriId`, (err, rows) => {
    //     if (err) {
    //       console.error(err.message)
    //     }
    //     var bolgeler = []
    //     rows.forEach((row) => {
    //       // console.log(row);

    //       var uk = bolgeler.find(o => o.UstKategoriId === row.UstKategoriId)
    //       if (uk === undefined) {
    //         uk = {
    //           UstKategoriId: row.UstKategoriId,
    //           UstKategoriAdi: row.UstKategoriAdi,
    //           // UstKategoriSvg: row.SvgPlane,
    //           AltKategori: []
    //         }
    //         bolgeler.push(uk)
    //       }
    //       uk.AltKategori.push({
    //         AltKategoriId: row.AltKategoriId,
    //         AltKategoriAdi: row.AltKategoriAdi
    //       })
    //     })
    //     resolve(bolgeler)
    //   })
    //   // });
    })
  }
}
