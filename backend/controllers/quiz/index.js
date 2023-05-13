const fs = require('fs')
const path = require('path')
const { addToLeaderboard, getLeaderboard } = require('./leaderboard')

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

    addToLeaderboard(nickname, result ? 5 : -2)

    const leaderboard = getLeaderboard()

    const position = leaderboard.findIndex((u) => u.nickname === nickname)

    res.json({
      result,
      correct,
      position: position + 1,
      points: leaderboard[position].points
    })
  })

  app.get('/quiz/leaderboard', authenticateJWT, (req, res) => {
    const leaderboard = getLeaderboard()
    res.json(leaderboard)
  })
}
