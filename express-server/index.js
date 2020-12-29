
var express = require('express')
routes = require('./routes')
cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/categorys', routes.categorys)
app.use('/personel', routes.personel)
app.use('/maps', routes.maps)
app.use('/basestation', routes.basestation)

app.listen(4005, () =>
  console.log(`Listening on port 4005!`)
)
