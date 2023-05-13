module.exports = (app, authenticateJWT) => {
  app.get('/transport', authenticateJWT, (req, res) => {
    res.json({ success: true })
  })
}
