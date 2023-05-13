const rooms = []

module.exports = (app, authenticateJWT, io) => {
  app.get('/chatroulette', authenticateJWT, (req, res) => {
    res.status(200).json({ show: io.engine.clientsCount > 2 })
  })
}
