require('dotenv').config({path: '.server.env'})
const mysqlx = require('@mysql/xdevapi') 

console.log(`DB_SCHEMA=${process.env.DB_SCHEMA}
DB_USER=${process.env.DB_USER}
DB_PASSWD=${process.env.DB_PASSWD}`)

mysqlx.getSession({ user: process.env.DB_USER, password: process.env.DB_PASSWD })
  .then(session => {
    return session.sql(`create database if not exists ${process.env.DB_SCHEMA}`)
      .execute()
      .then(() => {
        return session.sql(`CREATE TABLE IF NOT EXISTS ${process.env.DB_SCHEMA}.Person (
          idPerson INT NOT NULL AUTO_INCREMENT,
          PersonName VARCHAR(45) NOT NULL,
          PersonRegisterNo INT NOT NULL,
          idPersonGroup INT NOT NULL,
          PRIMARY KEY (idPerson))`)
            .execute()
      })
      .then(() => {
        return session.sql(`CREATE TABLE IF NOT EXISTS ${process.env.DB_SCHEMA}.PersonGroup (
          idPersonGroup INT NOT NULL AUTO_INCREMENT,
          PersonGroupName VARCHAR(45) NOT NULL,
          PRIMARY KEY (idPersonGroup))`)
            .execute()
      })
      .then(() => {
        return session.sql(`CREATE TABLE IF NOT EXISTS ${process.env.DB_SCHEMA}.Maps (
          idMaps INT NOT NULL AUTO_INCREMENT,
          SvgFileName VARCHAR(45) NOT NULL,
          SvgHeight INT NOT NULL,
          SvgWidth INT NOT NULL,
          PRIMARY KEY (idMaps))`)
            .execute()
      })
      .then(() => {
        return session.sql(`CREATE TABLE IF NOT EXISTS ${process.env.DB_SCHEMA}.TopCategory (
          idTopCategory INT NOT NULL AUTO_INCREMENT,
          TopCategoryName VARCHAR(45) NOT NULL,
          idMaps INT NOT NULL,
          PRIMARY KEY (idTopCategory))`)
            .execute()
      })
      .then(() => {
        return session.sql(`CREATE TABLE IF NOT EXISTS ${process.env.DB_SCHEMA}.SubCategory (
          idSubCategory INT NOT NULL AUTO_INCREMENT,
          SubCategoryName VARCHAR(45) NOT NULL,
          SubCategoryPolygon POLYGON NULL,
          idTopCategory INT NOT NULL,
          PRIMARY KEY (idSubCategory))`)
            .execute()
      })
      .then(() => {
        return session.sql(`CREATE TABLE IF NOT EXISTS ${process.env.DB_SCHEMA}.BaseStation (
          idBaseStation INT NOT NULL AUTO_INCREMENT,
          BaseStationName VARCHAR(45) NOT NULL,
          BaseStationLocation POINT NOT NULL,
          MAC VARCHAR(45) NOT NULL,
          IpAddress VARCHAR(45) NULL,
          HardwareVersion VARCHAR(45) NULL,
          SoftwareVersion VARCHAR(45) NULL,
          idSubCategory INT NOT NULL,
          PRIMARY KEY (idBaseStation))`)
            .execute()
      })
      .then(() => {
        return session.sql(`CREATE TABLE IF NOT EXISTS ${process.env.DB_SCHEMA}.Beacons (
          idBeacons INT NOT NULL AUTO_INCREMENT,
          MAC VARCHAR(45) NOT NULL,
          HardwareVersion VARCHAR(45) NULL,
          SoftwareVersion VARCHAR(45) NULL,
          LastLocationTime DATE NULL,
          LastLocation POINT NULL,
          idTopCategory INT NULL,
          PRIMARY KEY (idBeacons))`)
            .execute()
      })
      .then(() => {
        return session.sql(`CREATE TABLE IF NOT EXISTS ${process.env.DB_SCHEMA}.Beacons (
          idBeacons INT NOT NULL AUTO_INCREMENT,
          MAC VARCHAR(45) NOT NULL,
          idPerson INT NULL,
          PRIMARY KEY (idBeacons))`)
            .execute()
      })
      // .then(() => {
      //   session.getSchema(process.env.DB_SCHEMA).getCollections()
      //     .then(collections => {
      //       console.log(collections.map(c => c.getName()))
      //     })
      //   // .getCollectionAsTable('TopCategory')
      //   // return collection
      //   //   .select()
      //   //   .execute()
      //   //   .then(result => {
      //   //     console.log(result.fetchAll()) // []
      //   //   })
      // })
      // .then(() => {
      //   const table = session.getSchema(config.schema).getTable(config.table)

      //   return table.insert('name', 'age')
      //     .values('foo', 42)
      //     .execute()
      //     .then(() => {
      //       return table.select('name', 'age')
      //           .execute()
      //     })
      //     .then(res => {
      //       console.log(res.fetchOne()) // ['foo', 42]
      //     })
      //     .then(() => {
      //       return table.update()
      //           .where('age = :v')
      //           .bind('v', 42)
      //           .set('name', 'bar')
      //           .execute()
      //     })
      //     .then(() => {
      //       return table.select('name', 'age')
      //           .where('name = :v')
      //           .bind('v', 'bar')
      //           .execute()
      //     })
      //     .then(res => {
      //       console.log(res.fetchOne()) // ['bar', 42]
      //     })
      //     .then(() => {
      //       return table.delete()
      //           .where('true')
      //           .execute()
      //     })
      //     .then(() => {
      //       return table.select()
      //           .execute()
      //     })
      //     .then(res => {
      //       console.log(res.fetchAll()) // []
      //     })
      // })
      // .then(() => {
      //   return session.sql(`drop table if exists ${config.schema}.${config.table}`)
      //       .execute()
      // })
      // .then(() => {
      //   return session.sql(`drop database if exists ${config.schema}`)
      //       .execute()
      // })
      .then(() => {
        return session.close()
      })
  })
