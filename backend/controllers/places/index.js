module.exports = (app, authenticateJWT) => {
  app.get('/places', authenticateJWT, (req, res) => {
    res.json({ success: true })
  })
}
