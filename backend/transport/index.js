module.exports = (app) => {
  app.get('/transport', (req, res) => {
    res.json({ success: true })
  })
}
