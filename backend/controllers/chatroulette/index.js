module.exports = (app, authenticateJWT) => {
  app.get('/chatroulette', authenticateJWT, (req, res) => {
    res.json({ success: true })
  })
}
