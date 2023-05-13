const fs = require('fs')
const path = require('path')

module.exports = (app, authenticateJWT) => {
  app.get('/transport', authenticateJWT, (req, res) => {
    const { dst } = req

    const rawdata = fs.readFileSync(
      path.join(__dirname, `locations/${dst}.json`)
    )
    const locations = JSON.parse(rawdata)

    res.json(locations)
  })


  app.post('/transport', authenticateJWT, (req, res) => {
    const { dst, nickname } = req
    const { location, method } = req.body


  })

}
