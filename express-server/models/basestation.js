module.exports = {
  getBaseStations: function (db, topCategoryName) {
    console.log('--------', topCategoryName)
    return new Promise(function (resolve, reject) {
      try {
        var qry = `SELECT basestation.BaseStationName, ST_X(BaseStationLocation) AS 'X', ST_Y(BaseStationLocation) AS 'Y'
          FROM ${process.env.DB_SCHEMA}.basestation LEFT JOIN ${process.env.DB_SCHEMA}.topcategory 
          ON basestation.idTopCategory = topcategory.idTopCategory
          WHERE topcategory.TopCategoryName = '` + topCategoryName + `'`
        console.log(qry)
        db.query(qry, function (err, rows) {
          if (err) {
            reject(err)
          }
          var Gateway = []
          rows.forEach((row) => {
            console.log(row)
            Gateway.push({
              BaseStationName: row.BaseStationName,
              X: row.X,
              Y: row.Y
            })
          })
          resolve(Gateway)
        })
      } catch (error) {
        reject(error)
      }
    })
  }
}
