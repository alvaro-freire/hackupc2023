const fs = require('fs')
const path = require('path')

const leaderboard = []

module.exports = (app) => {
  app.get('/quiz', (req, res) => {
    const { pos, dst } = req.query

    const rawdata = fs.readFileSync(
      path.join(__dirname, `questions/${dst}.json`)
    )
    const questions = JSON.parse(rawdata)

    res.json(questions[pos])
  })

  app.post('/quiz/:id', (req, res) => {
    const { dst } = req.query
    const { id } = req.params
    const { answer, nickname } = req.body

    const rawdata = fs.readFileSync(
      path.join(__dirname, `questions/${dst}.json`)
    )
    const questions = JSON.parse(rawdata)
    const question = questions.find((q) => {
      return q.id.toString() === id
    })
    const result = question.correct === answer

    let correct
    if (!result) {
      correct = questions.find((q) => {
        return q.id.toString() === id
      }).correct
    }

    res.json({
      result,
      correct,
      position: 1,
      points: 70
    })
  })
}
