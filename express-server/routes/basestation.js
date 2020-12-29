const router = require('express').Router()
const models = require('../models')

router.get('/:topcategoryname', async (req, res) => {
  r = await models.basestation.getBaseStations(models.db, req.params.topcategoryname)
  return res.send(r)
})

module.exports = router
