module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(socket)
  })

  io.listen(process.env.SOCKET_PORT || 3001)
}
