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
    reload(true);

    socket.on('lobby/start', function() {
        game.stage = "game";
        console.log(game.stage);
        reload();
    });
    socket.on('game/put', function(data) {
        game.put( data.y, data.x );
        reload();
    });
    socket.on('reset', function(data) {
        game.reset();
        reload();
    });
    socket.on('reload', function(data) {
        console.log('reload');
        reload(true);
    });

    function reload(isOnlySelf) {
        var s = io.sockets;
        if( isOnlySelf ){
            s = socket;
        }
        if( game.stage == "lobby" ){
            s.emit('reload', game);
        } else if (game.stage == "game" ){
            if( game.finished ) {
                s.emit('reload', game);
                s.emit('game/end', game.getFinishStatus());
                return;
            }
            if( game.canPutFlag ) {
                s.emit('reload', game);
            } else {
                s.emit('reload', game);
                game.changePlayer();
                if( game.canPutFlag ) {
                    s.emit('game/passes');
                    setTimeout(function(){
                        reload();
                    }, 1500);
                } else {
                    game.finished = true;
                    reload();
                }
            }
        }
    }
});

