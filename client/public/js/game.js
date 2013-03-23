define(function() {
    var BLACK = 100;
    var WHITE = 200;
    var Board = enchant.Class.create({
        initialize: function(game, socket) {
            var self = this;
            this.socket = socket;
            this.scene = new Scene();
            this.assets = game.assets;
            this.setBoard();
            boardSprite = new Sprite(450, 450);
            boardSprite.image = this.assets['/public/img/board.png'];
            this.scene.addChild(boardSprite);
            this.setScoreBoard();
            boardSprite.addEventListener('touchend', function(e) {
                var x = Math.floor(e.x / 56);
                var y = Math.floor(e.y / 56);
                if( self.board[y][x] == 1 ) {
                    self.putPiece(self.turn, y, x);
                    self.socket.emit('put', {"y":y, "x":x});
                }
            });
            socket.on('reload', function(data) {
                console.log(data);
                playerSprite.visible = true;
                if( data.player == 100 ) {
                    playerSprite.frame = 3;
                }else{
                    playerSprite.frame = 0;
                }

                for( var y=0; y<8; y++ ){
                    for( var x=0; x<8; x++ ){
                        if( data.board[y][x] == BLACK || data.board[y][x] == WHITE ){
                            if ( self.board[y][x] instanceof Piece ) {
                                if( self.board[y][x].color != data.board[y][x] ){
                                    self.board[y][x].turn();
                                }
                            } else {
                                self.putPiece( data.board[y][x], y , x );
                            }
                        } else {
                            if ( self.board[y][x] instanceof Piece ) {
                                self.scene.removeChild(self.board[y][x]);
                            }
                            self.board[y][x] = data.board[y][x];
                        }
                    }
                }

                self.player = data.player;
            });
            socket.on('gameend', function(data) {
                playerSprite.visible = false;
            });
            socket.on('pass', function(data) {
                console.log(data);
            });

        },
        setScoreBoard: function() {
            scoreSprite = new Sprite(150, 450);
            scoreSprite.x = 450;
            scoreSprite.backgroundColor = '#AAAAAA';
            playerSprite = new Sprite(48, 49);
            playerSprite.image = this.assets['/public/img/tile.png'];
            playerSprite.x = 500;
            playerSprite.y = 100;
            this.scene.addChild(scoreSprite);
            this.scene.addChild(playerSprite);
        },
        getScene: function() {
            return this.scene;
        },
        putPiece: function(color, y, x) {
            var piece = new Piece(this.assets['/public/img/tile.png'], color, x, y);
            this.board[y][x] = piece;
            this.scene.addChild(piece);
        },
        setBoard: function() {
            this.turn = BLACK;
            this.board = [
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0]
            ];
        },
    });

    var Piece = enchant.Class.create(enchant.Sprite, {
        initialize:function(image, color, x, y) {
            enchant.Sprite.call(this, 48, 49);
            this.image = image;
            if( color == WHITE ) {
                this.frame = 0;
                this.color = WHITE;
            }else{
                this.frame = 3;
                this.color = BLACK;
            }
            this.y = y * 56 + 4;
            this.x = x * 56 + 5;
        },
        turn:function() {
            console.log(this.color);
            if( this.color == WHITE ) {
                this.color = BLACK;
                this.frame = [0,1,2,3,null];
            } else {
                this.color = WHITE;
                this.frame = [3,2,1,0,null];
            }
        }
    });

    return {
        "Board": Board,
        "Piece": Piece
    };
});