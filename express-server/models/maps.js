module.exports = {
  getMap: function (db, idTopCategory) {
    return new Promise(function (resolve, reject) {
      try {
        if (idTopCategory === 'undefined') {
          reject()
          return
        }
        var qry = `SELECT mp.SvgFileName, mp.SvgHeight, mp.SvgWidth FROM 
          ${process.env.DB_SCHEMA}.TopCategory tc
          LEFT JOIN ${process.env.DB_SCHEMA}.maps mp ON tc.idMaps = mp.idMaps
          WHERE tc.idTopCategory = ` + idTopCategory
        console.log(qry)
        db.query(qry, function (err, row) {
          if (err) {
            console.log(err)
            reject(err)
          }
          resolve({
            svg: row[0].SvgFileName,
            height: row[0].SvgHeight,
            width: row[0].SvgWidth
          })
        })
      } catch (error) {
        reject(error)
      }
    })
  },
  setMapBound: function (db, idSubCategory, polygon) {
    return new Promise(function (resolve, reject) {
      console.log(idSubCategory, polygon)
      var qry = `UPDATE myschema.subcategory
        SET subcategory.SubCategoryPolygon = ST_PolygonFromText('` + polygon + `')
        WHERE idSubCategory = ` + idSubCategory
      console.log(qry)
      db.query(qry, function (err, result) {
        if (err) {
          reject()
          return
        }
        console.log(result)
        resolve()
      })
    })
  },
  getMapBound: function (db, idSubCategory) {
    return new Promise(function (resolve, reject) {
      try {
        // db.serialize(() => {
        console.log(idSubCategory)
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
      } catch (error) {
        reject(error)
      }
    })
  }
}
