module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`client ${socket.id} connected`)

    socket.on('join', (room) => {
      socket.join(room)
      socket.transportRoom = room
      console.log(`client ${socket.id} has joined ${room}`)
    })

    socket.on('leave', (room) => {
      socket.leave(room)
      socket.transportRoom = undefined
      console.log(`client ${socket.id} has left ${room}`)
    })

    socket.on('message', (message) => {
      socket
        .to(socket.transportRoom)
        .emit('message', socket.nickname, socket.seat, message)
    })

    socket.on('set-data', (nickname, seat) => {
      console.log(`client ${socket.id} set ${nickname} (${seat})`)
      socket.nickname = nickname
      socket.seat = seat
    })

    socket.on('disconnect', () => {
      console.log(`client ${socket.id} disconnected`)
    })
  })

  io.listen(process.env.SOCKET_PORT || 4000)
  console.log(
    `Vueling sockets listening on http://localhost:${
      process.env.SOCKET_PORT || 4000
    }`
  )
}
