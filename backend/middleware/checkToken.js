const jwt = require('jsonwebtoken')

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (authHeader) {
    const token = authHeader.split(' ')[1]

    jwt.verify(token, 'shhhhh', (err, payload) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden' })
      }

      req.dst = payload.dst
      req.seat = payload.seat
      req.nickname = payload.nickname
      next()
    })
  } else {
    res.status(401).json({ message: 'Unauthorized' })
  }
}

module.exports = authenticateJWT
