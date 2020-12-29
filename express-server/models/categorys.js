module.exports = {
  getAllCategorys: function (db) {
    return new Promise(function (resolve, reject) {
      try {
        var qry = `SELECT tc.idTopCategory, tc.TopCategoryName, sc.idSubCategory, sc.SubCategoryName FROM 
          ${process.env.DB_SCHEMA}.TopCategory tc LEFT JOIN ${process.env.DB_SCHEMA}.SubCategory sc ON
          tc.idTopCategory = sc.idTopCategory`
        console.log(qry)
        db.query(qry, function (err, rows) {
          if (err) {
            reject(err)
          }
          var TopCategory = []
          rows.forEach((row) => {
            var tc = TopCategory.find(o => o.idTopCategory === row.idTopCategory)
            if (tc === undefined) {
              tc = {
                idTopCategory: row.idTopCategory,
                TopCategoryName: row.TopCategoryName,
                SubCategory: []
              }
              TopCategory.push(tc)
            }
            tc.SubCategory.push({
              idSubCategory: row.idSubCategory,
              SubCategoryName: row.SubCategoryName
              // SubCategoryPolygon: row.SubCategoryPolygon
            })
          })
          resolve(TopCategory)
        })
      } catch (error) {
        reject(error)
      }
    })
  },
  getSubCategorys: function (db, idtopcategory) {
    return new Promise(function (resolve, reject) {
      try {
        if (idtopcategory === 'undefined') {
          reject()
          return
        }
        var qry = `SELECT sc.idSubCategory, sc.SubCategoryName FROM 
          ${process.env.DB_SCHEMA}.SubCategory sc
          WHERE sc.idTopCategory = ` + idtopcategory
        console.log(qry)
        db.query(qry, function (err, rows) {
          if (err) {
            reject(err)
          }
          var SubCategory = []
          rows.forEach((row) => {
            SubCategory.push({
              idSubCategory: row.idSubCategory,
              SubCategoryName: row.SubCategoryName
              // SubCategoryPolygon: row.SubCategoryPolygon
            })
          })
          resolve(SubCategory)
        })
      } catch (error) {
        reject(error)
      }
    })
  }
}
