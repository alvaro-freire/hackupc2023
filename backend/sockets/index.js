module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('client connected')
    socket.join('myroom')
    socket.on('message', (message) => {
      console.log(message)
    })
    socket.on('room', (msg) => {
      io.to('myroom').emit('msg', 'newmsg')
    })
  })

  io.listen(process.env.SOCKET_PORT || 4000)
  console.log(
    `Vueling sockets listening on http://localhost:${
      process.env.SOCKET_PORT || 4000
    }`
  )
}
