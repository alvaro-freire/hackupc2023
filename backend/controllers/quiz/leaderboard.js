const leaderboard = []

function addToLeaderboard(nickname, points) {
  const user = leaderboard.find((u) => u.nickname === nickname)
  if (user) {
    user.points += points
    user.points = Math.max(0, user.points)
  } else {
    points = Math.max(0, points)
    leaderboard.push({
      nickname,
      points
    })
  }

  leaderboard.sort((a, b) => b.points - a.points)
}

function getLeaderboard() {
  return leaderboard
}

module.exports = {
  addToLeaderboard,
  getLeaderboard
}
