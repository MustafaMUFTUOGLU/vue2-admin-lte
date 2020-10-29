
var express = require('express')
routes = require('./routes')
cors = require('cors')

const app = express()

app.use(cors())
app.use('/bolgeler', routes.bolgeler)
app.use('/personel', routes.personel)
app.use('/harita', routes.harita)
app.use('/basestation', routes.basestation)

app.listen(4005, () =>
  console.log(`Example app listening on port 4005!`)
)
