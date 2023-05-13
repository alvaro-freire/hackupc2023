const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
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

const chatSockets = require('./chatSockets')
const server = http.createServer(app)
const io = new Server(server)
chatSockets(io)

app.get('/', (req, res) => res.send('Welcome everyone!'))

loginContoller(app)
chatrouletteContoller(app, authenticateJWT)
quizContoller(app, authenticateJWT)
placesContoller(app, authenticateJWT)
transportContoller(app, authenticateJWT)

app.listen(process.env.APP_PORT || 3000, function () {
  console.log('Vueling backend listening on http://localhost:3000')
})
