const jwt = require('jsonwebtoken')

const users = []

module.exports = (app) => {
  app.post('/login', (req, res) => {
    let { dst, nickname, seat } = req.body

    const user = users.find((u) => u.seat === seat)

    if (user) {
      dst = user.dst
      nickname = user.nickname
    } else {
      if (dst && nickname) {
        users.push({ dst, nickname, seat })
      } else {
        return res.status(404).json({ message: 'User do not exist, create it' })
      }
    }

    const token = jwt.sign({ dst, nickname, seat }, 'shhhhh')

    res.json({ token })
  })
}