const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const loginContoller = require('./login')
const chatrouletteContoller = require('./chatroulette')
const quizContoller = require('./quiz')
const placesContoller = require('./places')
const transportContoller = require('./transport')

const app = express()
app.use(bodyParser.json())
app.use(morgan('tiny'))

app.get('/', (req, res) => res.send('Welcome everyone!'))

loginContoller(app)
chatrouletteContoller(app)
quizContoller(app)
placesContoller(app)
transportContoller(app)

app.listen(3000, function () {
  console.log('Vueling backend listening on http://localhost:3000')
})
