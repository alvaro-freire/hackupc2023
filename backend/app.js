const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const http = require('http')
const { Server } = require('socket.io')
const loginContoller = require('./controllers/login')
const chatrouletteContoller = require('./controllers/chatroulette')
const quizContoller = require('./controllers/quiz')
const placesContoller = require('./controllers/places')
const transportContoller = require('./controllers/transport')
const authenticateJWT = require('./middleware/checkToken')

const app = express()
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(cors())

const chatSockets = require('./sockets')
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: '*' } })
chatSockets(io)

app.get('/', (req, res) => res.send('Welcome everyone!'))

loginContoller(app)
chatrouletteContoller(app, authenticateJWT, io)
quizContoller(app, authenticateJWT)
placesContoller(app, authenticateJWT)
transportContoller(app, authenticateJWT)

app.listen(process.env.APP_PORT || 8080, function () {
  console.log(
    `Vueling backend listening on http://localhost:${
      process.env.APP_PORT || 8080
    }`
  )
})
