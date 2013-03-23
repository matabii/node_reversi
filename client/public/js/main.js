requirejs.config({
    baseUrl: 'public/js/',
    shim: {
        "game" : {
            deps: ["thirdparty/enchant"]
        }
    }
});

requirejs([
    "game", "thirdparty/jquery", "thirdparty/underscore", "thirdparty/enchant", "thirdparty/socket.io"
], function(g) {
    enchant();
    var game = new Game(600, 450);
    var board;
    var socket;
    game.fps = 10;
    game.preload("/public/img/board.png");
    game.preload("/public/img/tile.png");
    game.onload = function () {
        socket = io.connect('/');
        board = new g.Board(game, socket);
        game.pushScene(board.getScene());
    }
    game.start();
    $('#reset').click(function() {
        socket.emit('reset');
    });
});