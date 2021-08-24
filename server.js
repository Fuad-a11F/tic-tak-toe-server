let express = require('express')
const Game = require('./Game')
let app = express()
let http = require('http').createServer(app)
let io = require('socket.io')(http,{
    cors: {
      origin: '*',
    }
  })

let mainArray = {}

app.get('/', (req, res) => {
    res.send('hello')
})

io.on('connection', (socket) => {
    socket.join('test')
    mainArray['test'] = new Game()

    socket.on('save_player', data => {
        mainArray['test'].setPlayer(data.name)
    })

    socket.on('get_player', () => {
        io.in('test').emit('get_player', mainArray['test'].getPlayer())
    })

    socket.on('send_message', data => {
        io.in('test').emit('send_message', data)
    })

    socket.on('set_position', (data) => {
        mainArray['test'].set(data.index)
        if (mainArray['test'].checkWin()) {
            mainArray['test'].clear()
            io.in('test').emit('get_score', mainArray['test'].getScore())
        }
        if (mainArray['test'].isFinish()) {
            mainArray['test'].clear()
            io.in('test').emit('get_score', mainArray['test'].getScore())
        }
        io.in('test').emit('set_position', mainArray['test'].get())
    })
})

let PORT = process.env.PORT || 8000

http.listen(PORT, () => {
    console.log(`Started on port: ${PORT}`);
})