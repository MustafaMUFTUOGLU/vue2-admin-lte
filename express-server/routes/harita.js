const router = require('express').Router()
const models = require('../models')

router.get('/:ustkategoriid', async (req, res) => {
  r = await models.harita.getHarita(models.db, req.params.ustkategoriid)
  return res.send(r)
})

module.exports = router
