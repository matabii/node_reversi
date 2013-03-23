var express = require('express');
var app = express()
    , server = require('http').createServer(app)
    , io = require('socket.io').listen(server);

server.listen(3000);
app.configure(function() {
    app.use('/public', express.static(__dirname + '/client/public'));
});
app.get('/', function(req, res) {
    res.sendfile(__dirname + '/client/public/index.html');
});

var Game = require('./server/game');
game = new Game();
game.reset();

io.sockets.on('connection', function(socket) {
    reload();
    socket.on('put', function(data) {
        game.put( data.y, data.x );
        reload();
    });
    socket.on('reset', function(data) {
        game.reset();
        reload();
    });
});

function reload() {
    if( game.canPutFlag ) {
        io.sockets.emit('reload', game);
    } else {
        io.sockets.emit('reload', game);
        game.changePlayer();
        if( game.canPutFlag ) {
            console.log('pass');
            setTimeout(function(){
                io.sockets.emit('pass');
                reload();
            }, 1000);
        } else {
            io.sockets.emit('reload', game);
            io.sockets.emit('gameend');
        }
    }
}