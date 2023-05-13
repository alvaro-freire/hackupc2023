module.exports = (app) => {
  app.get('/places', (req, res) => {
    res.json({ success: true })
  })
}
