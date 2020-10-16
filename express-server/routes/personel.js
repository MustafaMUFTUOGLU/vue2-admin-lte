const router = require('express').Router();
const models = require('../models')

router.get('/', async (req, res) => {
    r = await models.personel.getPersonel(models.db)
  return res.send(r);
});
 
module.exports = router;