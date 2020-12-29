const router = require('express').Router()
const models = require('../models')

router.get('/:topcategoryname', async (req, res) => {
  r = await models.maps.getMap(models.db, req.params.topcategoryname)
  return res.send(r)
})
router.get('/:topcategoryname/mapbound/:idsubcategory', async (req, res) => {
  r = await models.maps.getMapBound(models.db, req.params.idsubcategory)
  return res.send(r)
})
router.post('/:topcategoryname/mapbound/:idsubcategory', async (req, res) => {
  r = await models.maps.setMapBound(models.db, req.params.idsubcategory, req.body.polygon)
  return res.send(r)
})
module.exports = router
