const rooms = []

module.exports = (app, authenticateJWT) => {
  app.get('/chatroulette', authenticateJWT, (req, res) => {
    while (true) {
      const other = waiting.pop()
      if (other) {
        return res.json({ room: other })
      }
    }
    res.json({ success: true })
  })
}
