module.exports =  { 
    getBolgeler: function (db) {
      return new Promise(function(resolve, reject) { 

        //db.serialize(() => {
          db.all(`SELECT * FROM BolgeUstKategori LEFT JOIN BolgeAltKategori ON BolgeUstKategori.UstKategoriId = BolgeAltKategori.UstKategoriId`, (err, rows) => {
            if (err) {
              console.error(err.message);
            }
            var bolgeler = [];
            rows.forEach((row) => {
              //console.log(row);

              var uk = bolgeler.find(o => o.UstKategoriId === row.UstKategoriId);
              if( uk === undefined) { 
                uk = {
                  UstKategoriId: row.UstKategoriId,
                  UstKategoriAdi: row.UstKategoriAdi,
                  //UstKategoriSvg: row.SvgPlane,
                  AltKategori: []
                }
                bolgeler.push(uk);
              } 
              uk.AltKategori.push({
                AltKategoriId: row.AltKategoriId,
                AltKategoriAdi: row.AltKategoriAdi
              })
            }); 
            resolve(bolgeler);
          }); 
        //}); 
      });
    }
}