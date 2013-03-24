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
            this.setScoreBoard();
        },
        reload: function(data) {
            console.log('reload');
            var self = this;
            self.passesLabel.visible = false;
            self.playerSprite.visible = true;
            self.setFinishVisible(false);
            if( data.player == 100 ) {
                self.playerSprite.frame = 3;
            }else{
                self.playerSprite.frame = 0;
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
        },
        end: function(data) {
            var self = this;
            self.playerSprite.visible = false;
            self.setFinishVisible(true);
            self.whiteCountLabel.text = data.whiteCount;
            self.blackCountLabel.text = data.blackCount;
        },
        passes: function(data) {
            var self = this;
            self.passesLabel.visible = true;
        },
        setScoreBoard: function() {
            this.scoreSprite = new Sprite(150, 450);
            this.scoreSprite.x = 450;
            this.scoreSprite.backgroundColor = '#AAAAAA';
            this.playerSprite = new Sprite(48, 49);
            this.playerSprite.image = this.assets['/public/img/tile.png'];
            this.playerSprite.x = 500;
            this.playerSprite.y = 100;
            this.playerLabel = new Label("Player");
            this.playerLabel.font = "16px Arial";
            this.playerLabel.x = 500;
            this.playerLabel.y = 75;
            this.passesLabel = new Label("Passes");
            this.passesLabel.font = "32px Arial";
            this.passesLabel.color = "#FFFD11";
            this.passesLabel.x = 470;
            this.passesLabel.y = 160;
            this.passesLabel.visible = false;
            this.finishedLabel = new Label("Game <br/>Finished");
            this.finishedLabel.font = "22px Arial";
            this.finishedLabel.color = "#FFFD11";
            this.finishedLabel.x = 470;
            this.finishedLabel.y = 170;

            this.whiteCountLabel = new Label(20);
            this.whiteCountLabel.font = "22px Arial";
            this.whiteCountLabel.x = 530
            this.whiteCountLabel.y = 240
            this.whiteCountSprite = new Sprite(48, 49);
            this.whiteCountSprite.image = this.assets['/public/img/tile.png'];
            this.whiteCountSprite.x = 470;
            this.whiteCountSprite.y = 230;
            this.whiteCountSprite.frame = 0;
            this.blackCountLabel = new Label(10);
            this.blackCountLabel.font = "22px Arial";
            this.blackCountLabel.x = 530;
            this.blackCountLabel.y = 300;
            this.blackCountSprite = new Sprite(48, 49);
            this.blackCountSprite.image = this.assets['/public/img/tile.png'];
            this.blackCountSprite.x = 470;
            this.blackCountSprite.y = 290;
            this.blackCountSprite.frame = 3;
            this.scene.addChild(this.scoreSprite);
            this.scene.addChild(this.playerSprite);
            this.scene.addChild(this.playerLabel);
            this.scene.addChild(this.passesLabel);
            this.scene.addChild(this.whiteCountLabel);
            this.scene.addChild(this.blackCountLabel);
            this.scene.addChild(this.whiteCountSprite);
            this.scene.addChild(this.blackCountSprite);
            this.scene.addChild(this.finishedLabel);
        },
        setFinishVisible: function(bool) {
            this.blackCountLabel.visible = bool;
            this.whiteCountLabel.visible = bool;
            this.blackCountSprite.visible = bool;
            this.whiteCountSprite.visible = bool;
            this.finishedLabel.visible = bool;
        },
        getScene: function() {
            var scene = this.scene;
            scene.name = "board";
            return scene;
        },
        putPiece: function(color, y, x) {
            var piece = new Piece(this.assets['/public/img/tile.png'], color, x, y);
            this.board[y][x] = piece;
            this.scene.addChild(piece);
        },
        setBoard: function() {
            var self = this;
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
            this.boardSprite = new Sprite(450, 450);
            this.boardSprite.image = this.assets['/public/img/board.png'];
            this.scene.addChild(this.boardSprite);

            this.boardSprite.addEventListener('touchend', function(e) {
                var x = Math.floor(e.x / 56);
                var y = Math.floor(e.y / 56);
                if( self.board[y][x] == 1 ) {
                    self.putPiece(self.player, y, x);
                    self.socket.emit('game/put', {"y":y, "x":x});
                }
            });

        },
    });

    var Piece = enchant.Class.create(enchant.Sprite, {
        initialize: function(image, color, x, y) {
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
        turn: function() {
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