const router = require('express').Router();
const models = require('../models')

router.get('/', async (req, res) => {
    r = await models.bolgeler.getBolgeler(models.db)
  return res.send(r);
});
 
module.exports = router;