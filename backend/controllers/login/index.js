const jwt = require('jsonwebtoken')

const users = []

module.exports = (app) => {
  app.post('/login', (req, res) => {
    let { nickname, seat } = req.body

    const dst = 'bcn'

    const user = users.find((u) => u.seat === seat)

    if (user) {
      if (nickname != user.nickname)
        return res.status(401).json({ message: 'Invalid access data' })
    } else {
      users.push({ nickname, seat, dst })
    }

    const token = jwt.sign({ dst, nickname, seat }, 'shhhhh')

    res.json({ token })
  })
}
