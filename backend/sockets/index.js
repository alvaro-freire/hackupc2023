const waiting = []

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`client ${socket.id} connected`)

    // transport functions
    socket.on('join', (room) => {
      socket.join(room)
      socket.transportRoom = room
      socket.to(room).emit('joined', socket.nickname, socket.seat)
      console.log(`client ${socket.id} has joined ${room}`)
    })

    socket.on('leave', (room) => {
      socket.leave(room)
      socket.transportRoom = undefined
      socket.to(room).emit('left', socket.nickname, socket.seat)
      console.log(`client ${socket.id} has left ${room}`)
    })

    socket.on('message', (message) => {
      socket
        .to(socket.transportRoom)
        .emit('message', socket.nickname, socket.seat, message)
      console.log('message', socket.nickname, socket.seat, message)
    })

    socket.on('set-data', (nickname, seat) => {
      console.log(`client ${socket.id} set ${nickname} (${seat})`)
      socket.nickname = nickname
      socket.seat = seat
    })

    // roulette functions
    socket.on('roulette', () => {
      const pair = waiting.pop()
      if (!pair) {
        console.log(`client ${socket.id} waiting on the queue`)
        return waiting.push(socket)
      }
      socket.emit('roulette-paired', pair.id)
      socket.pair = pair
      pair.emit('roulette-paired', socket.id)
      pair.pair = socket
      console.log(`client ${socket.id} and ${pair.id} paired on chatroulette`)
    })

    socket.on('roulette-message', (message) => {
      console.log(`client ${socket.id} sent ${message}`)
      socket.to(socket.pair.id).emit('roulette-message', message)
    })

    socket.on('roulette-next', () => {
      socket.pair.emit('roulette-next')
    })

    socket.on('roulette-show', () => {
      socket
        .to(socket.pair.id)
        .emit('roulette-show', socket.nickname, socket.seat)
    })

    socket.on('roulette-hide', () => {
      socket.to(socket.pair.id).emit('roulette-hide')
    })

    socket.on('disconnecting', () => {
      if (socket.pair) {
        socket.pair.emit('roulette-next')
      }
      for (const room of socket.rooms) {
        if (room !== socket.id) {
          socket.to(room).emit('left', socket.nickname, socket.seat)
        }
      }
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
