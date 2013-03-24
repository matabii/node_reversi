requirejs.config({
    baseUrl: 'public/js/',
    shim: {
        "game" : {
            deps: ["thirdparty/enchant"]
        },
        "lobby" : {
            deps: ["thirdparty/enchant"]
        },
    }
});

requirejs([
    "game", "lobby", "thirdparty/jquery", "thirdparty/underscore", "thirdparty/enchant", "thirdparty/socket.io"
], function(g,l) {
    enchant();
    var game = new Game(600, 450);
    var board;
    var socket;
    var connected = false;
    game.fps = 10;
    game.preload("/public/img/board.png");
    game.preload("/public/img/tile.png");
    game.onload = function () {
        socket = io.connect('/');
        socket.on('connect', function() {
            console.log('connect');
            connected = true;
        });
        socket.on('disconnect', function() {
            console.log('disconnect');
            connected = false;
        });
        socket.on('reload', function(data) {
            if( data.stage == "lobby" ) {
                if( game.currentScene.name != "lobby" ) {
                    game.popScene();
                    game.pushScene( lobbyScene );
                }
            }else if( data.stage == "game" ) {
                if( game.currentScene.name != "board" ) {
                    game.popScene();
                    game.pushScene( board.getScene() );
                }
                board.reload(data);
            }
        });
        socket.on('game/end', function(data) {
            board.end(data);
        });

        lobby = new l.Lobby(game, socket);
        board = new g.Board(game, socket);
        var boardScene = board.getScene();
        var lobbyScene = lobby.getScene();
    }
    game.start();
    $('#reset').click(function() {
        if( !connected ) {
            socket.connect();
        }
        socket.emit('reset');
    });
    $('#reload').click(function() {
        if( !connected ) {
            socket.connect();
        }
        socket.emit('reload');
    });

});