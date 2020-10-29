const router = require('express').Router()
const models = require('../models')

router.get('/:ustkategoriadi', async (req, res) => {
  r = await models.harita.getHarita(models.db, req.params.ustkategoriadi)
  return res.send(r)
})
router.get('/:ustkategoriadi/:altkategoriadi', async (req, res) => {
  r = await models.harita.getHaritaBound(models.db, req.params.ustkategoriadi, req.params.altkategoriadi)
  return res.send(r)
})

module.exports = router
