module.exports = (app) => {
  app.get('/chatroulette', (req, res) => {
    res.json({ success: true })
  })
}
