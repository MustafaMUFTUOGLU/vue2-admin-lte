const router = require('express').Router()
const models = require('../models')

router.get('/', async (req, res) => {
  r = await models.categorys.getAllCategorys(models.db)
  return res.send(r)
})

router.get('/:idtopcategory', async (req, res) => {
  r = await models.categorys.getSubCategorys(models.db, req.params.idtopcategory)
  return res.send(r)
})

module.exports = router
