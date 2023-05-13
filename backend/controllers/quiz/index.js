const fs = require('fs')
const path = require('path')

const leaderboard = []

module.exports = (app, authenticateJWT) => {
  app.get('/quiz', authenticateJWT, (req, res) => {
    const { dst } = req

    const rawdata = fs.readFileSync(
      path.join(__dirname, `questions/${dst}.json`)
    )
    const questions = JSON.parse(rawdata)

    questions.forEach((q) => {
      delete q.correct
    })

    res.json(questions)
  })

  app.post('/quiz/:id', authenticateJWT, (req, res) => {
    const { dst, nickname } = req
    const { id } = req.params
    const { answer } = req.body

    const rawdata = fs.readFileSync(
      path.join(__dirname, `questions/${dst}.json`)
    )
    const questions = JSON.parse(rawdata)
    const question = questions.find((q) => {
      return q.id.toString() === id
    })
    const result = question.correct === answer.toString()

    const correct = questions.find((q) => {
      return q.id.toString() === id
    }).correct

    const user = leaderboard.find((u) => u.nickname === nickname)
    if (user) {
      user.points += result ? 5 : -2
      user.points = Math.max(0, user.points)
    } else {
      leaderboard.push({
        nickname,
        points: result ? 5 : 0
      })
    }

    // order leaderboard by points
    leaderboard.sort((a, b) => {
      return b.points - a.points
    })

    const position = leaderboard.findIndex((u) => u.nickname === nickname)

    res.json({
      result,
      correct,
      position: position + 1,
      points: leaderboard[position].points
    })
  })
}
