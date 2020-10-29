const router = require('express').Router()
const models = require('../models')

router.get('/:ustkategoriadi', async (req, res) => {
  r = await models.basestation.getBaseStations(models.db, req.params.ustkategoriadi)
  return res.send(r)
})

module.exports = router
