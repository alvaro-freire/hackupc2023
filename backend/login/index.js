module.exports = (app) => {
  app.get('/login', (req, res) => {
    res.json({ success: true })
  })
}
