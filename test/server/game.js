var assert = require("assert")
var B = 100;
var W = 200;

var Game = require('../../server/game');
game = new Game();

describe('Game.js', function(){
    describe('scan', function(){
        it('flip count', function(){
            game.player = B;
            game.board = [
                [0,0,0,0,0,0,W,0],
                [0,0,0,0,0,0,W,W],
                [0,0,0,0,0,0,W,W],
                [0,0,0,B,W,0,0,0],
                [0,0,0,W,B,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,W,0,0,0,0,0,0],
                [B,0,0,0,W,W,W,B],
            ];
            assert.equal(game.scan(0, 7, 1, 0), 0);
            assert.equal(game.scan(0, 7, 1, 1), 0);
            assert.equal(game.scan(0, 7, 1, -1), 0);
            assert.equal(game.scan(0, 7, 0, 1), 0);
            assert.equal(game.scan(0, 7, 0, -1), 0);
            assert.equal(game.scan(0, 7, -1, 0), 0);
            assert.equal(game.scan(0, 7, -1, 1), 0);
            assert.equal(game.scan(0, 7, -1, -1), 0);

            assert.equal(game.scan(5, 2, 1, 0), 0);
            assert.equal(game.scan(5, 2, 1, 1), 0);
            assert.equal(game.scan(5, 2, 1, -1), 1);
            assert.equal(game.scan(5, 2, 0, 1), 0);
            assert.equal(game.scan(5, 2, 0, -1), 0);
            assert.equal(game.scan(5, 2, -1, 0), 0);
            assert.equal(game.scan(5, 2, -1, 1), 0);
            assert.equal(game.scan(5, 2, -1, -1), 0);

            assert.equal(game.scan(7, 3, 1, 0), 0);
            assert.equal(game.scan(7, 3, 1, 1), 0);
            assert.equal(game.scan(7, 3, 1, -1), 0);
            assert.equal(game.scan(7, 3, 0, 1), 3);
            assert.equal(game.scan(7, 3, 0, -1), 0);
            assert.equal(game.scan(7, 3, -1, 0), 0);
            assert.equal(game.scan(7, 3, -1, 1), 0);
            assert.equal(game.scan(7, 3, -1, -1), 0);
            
        })
    });
    describe('scan', function(){
        it('put black 1', function(){
            game.player = B;
            game.board = [
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,1,0,0,0],
                [0,0,0,B,W,1,0,0],
                [0,0,1,W,B,0,0,0],
                [0,0,0,1,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
            ];
            assert.ok(game.put(4, 2));
            assert.equal(B, game.board[4][3]);
            assert.equal(B, game.board[4][2]);
        });
        it('put black 2', function(){
            game.player = B;
            game.board = [
                [0,0,0,0,1,0,0,0],
                [0,0,0,0,W,0,0,0],
                [0,0,0,0,W,0,0,0],
                [0,0,0,B,W,1,0,0],
                [0,0,1,W,B,0,0,0],
                [0,0,0,1,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
            ];
            assert.ok(game.put(0, 4));
            assert.equal(B, game.board[0][4]);
            assert.equal(B, game.board[1][4]);
            assert.equal(B, game.board[2][4]);
            assert.equal(B, game.board[3][4]);
            assert.equal(B, game.board[4][4]);
            assert.equal(game.player, W);
        })
    });

    describe('isPut', function(){
        it('put black 1', function(){
            game.player = B;
            game.board = [
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,B,W,0,0,0],
                [0,0,0,W,B,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
            ];
            assert.ok(!game.isPut(2, 0));
            assert.ok(!game.isPut(2, 1));
            assert.ok(!game.isPut(2, 2));
            assert.ok(!game.isPut(2, 3));
            assert.ok(!game.isPut(1, 4));
            assert.ok(!game.isPut(0, 4));
            assert.ok(!game.isPut(0, 5));
            assert.ok(!game.isPut(1, 5));
            assert.ok(!game.isPut(2, 5));
            assert.ok(game.isPut(3, 5));
            assert.ok(!game.isPut(4, 5));
            assert.ok(!game.isPut(5, 5));
            assert.ok(!game.isPut(6, 5));
            assert.ok(!game.isPut(7, 5));
            assert.ok(!game.isPut(0, 6));
            assert.ok(!game.isPut(1, 6));
            assert.ok(!game.isPut(2, 6));
            assert.ok(!game.isPut(3, 6));
            assert.ok(!game.isPut(4, 6));
            assert.ok(!game.isPut(5, 6));
            assert.ok(!game.isPut(6, 6));
            assert.ok(!game.isPut(7, 6));
            assert.ok(!game.isPut(0, 7));
            assert.ok(!game.isPut(1, 7));
            assert.ok(!game.isPut(2, 7));
            assert.ok(!game.isPut(3, 7));
            assert.ok(!game.isPut(4, 7));
            assert.ok(!game.isPut(5, 7));
            assert.ok(!game.isPut(6, 7));
            assert.ok(!game.isPut(7, 7));

            assert.ok(game.isPut(2, 4));
            assert.ok(game.isPut(3, 5));
            assert.ok(game.isPut(4, 2));
            assert.ok(game.isPut(5, 3));
        });
    });

    describe('isPut', function(){
        it('put black 2', function(){
            game.player = B;
            game.board = [
                [B,W,0,0,0,0,0,0],
                [W,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,B,W,0,0,0],
                [0,0,0,W,B,0,0,0],
                [0,0,0,0,0,0,0,B],
                [0,W,0,0,0,0,0,W],
                [B,0,0,0,0,0,0,0],
            ];
            assert.ok(!game.isPut(0, 0));
            assert.ok(!game.isPut(0, 1));
            assert.ok(game.isPut(0, 2));
            assert.ok(!game.isPut(0, 3));
            assert.ok(!game.isPut(0, 4));
            assert.ok(!game.isPut(0, 5));
            assert.ok(!game.isPut(0, 6));
            assert.ok(!game.isPut(0, 7));
            assert.ok(!game.isPut(1, 0));
            assert.ok(!game.isPut(1, 1));
            assert.ok(!game.isPut(1, 2));
            assert.ok(!game.isPut(1, 3));
            assert.ok(!game.isPut(1, 4));
            assert.ok(!game.isPut(1, 5));
            assert.ok(!game.isPut(1, 6));
            assert.ok(!game.isPut(1, 7));
            assert.ok(game.isPut(2, 0));
            assert.ok(!game.isPut(2, 1));
            assert.ok(!game.isPut(2, 2));
            assert.ok(!game.isPut(2, 3));
            assert.ok(game.isPut(2, 4));
            assert.ok(!game.isPut(2, 5));
            assert.ok(!game.isPut(2, 6));
            assert.ok(!game.isPut(2, 7));
            assert.ok(!game.isPut(3, 0));
            assert.ok(!game.isPut(3, 1));
            assert.ok(!game.isPut(3, 2));
            assert.ok(!game.isPut(3, 3));
            assert.ok(!game.isPut(3, 4));
            assert.ok(game.isPut(3, 5));
            assert.ok(!game.isPut(3, 6));
            assert.ok(!game.isPut(3, 7));
            assert.ok(!game.isPut(7, 0));
            assert.ok(!game.isPut(7, 1));
            assert.ok(!game.isPut(7, 2));
            assert.ok(!game.isPut(7, 3));
            assert.ok(!game.isPut(7, 4));
            assert.ok(!game.isPut(7, 5));
            assert.ok(!game.isPut(7, 6));
            assert.ok(game.isPut(7, 7));
        });
    });

    describe('isPut', function(){
        it('put black 3', function(){
            game.player = B;
            game.board = [
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,B,W,0],
                [0,0,W,W,W,W,0,0],
                [0,0,B,W,W,B,B,0],
                [0,0,0,W,W,W,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
            ];
            assert.ok(!game.isPut(0, 6));
        })
    });

    describe('isPut', function(){
        it('put black 4', function(){
            game.player = B;
            game.board = [
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,W,0,0,0],
                [0,0,0,B,W,W,0,B],
                [0,0,0,B,W,B,0,B],
                [0,0,0,W,W,W,W,B],
                [0,0,0,W,W,W,W,B],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
            ];
            assert.ok(!game.isPut(2, 3));
        })
    });

    describe('isPut', function(){
        it('put black 5', function(){
            game.player = B;
            game.board = [
                [0,0,0,0,0,B,0,W],
                [0,0,0,0,0,B,W,0],
                [0,0,0,0,B,B,B,0],
                [0,0,0,B,B,B,W,0],
                [0,0,0,W,W,W,W,W],
                [0,0,0,0,0,B,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
            ];
            assert.ok(!game.isPut(0, 4));
        })
    });


    describe('isPut', function(){
        it('put white 1', function(){
            game.player = W;
            game.board = [
                [B,W,0,0,0,0,0,0],
                [W,B,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,B,W,0,0,0],
                [0,0,0,W,B,0,0,0],
                [0,0,0,0,0,0,0,B],
                [0,W,0,0,0,0,0,W],
                [B,0,0,0,0,0,0,0],
            ];
            assert.ok(!game.isPut(0, 0));
            assert.ok(!game.isPut(0, 1));
            assert.ok(!game.isPut(0, 2));
            assert.ok(!game.isPut(0, 3));
            assert.ok(!game.isPut(0, 4));
            assert.ok(!game.isPut(0, 5));
            assert.ok(!game.isPut(0, 6));
            assert.ok(!game.isPut(0, 7));

            assert.ok(!game.isPut(1, 0));
            assert.ok(!game.isPut(1, 1));
            assert.ok(game.isPut(1, 2));
            assert.ok(!game.isPut(1, 3));
            assert.ok(!game.isPut(1, 4));
            assert.ok(!game.isPut(1, 5));
            assert.ok(!game.isPut(1, 6));
            assert.ok(!game.isPut(1, 7));

            assert.ok(!game.isPut(2, 0));
            assert.ok(game.isPut(2, 1));
            assert.ok(!game.isPut(2, 2));
            assert.ok(game.isPut(2, 3));
            assert.ok(!game.isPut(2, 4));
            assert.ok(!game.isPut(2, 5));
            assert.ok(!game.isPut(2, 6));
            assert.ok(!game.isPut(2, 7));

        });
    });
})

