var Game = function() {

    var B = 100; // Black disks
    var W = 200; // White disks

    this.reset = function() {
        this.player = B; // player is Black or White.
        /**
           0 : empty
           1 : can be put by now player.
           B : on black discs.
           W : on white discs.
         **/
        this.board = [
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,1,0,0,0],
            [0,0,0,B,W,1,0,0],
            [0,0,1,W,B,0,0,0],
            [0,0,0,1,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
        ];
        this.canPutFlag = true;
    }

    /**
       put player disk position y and x grid.
       and turned over
     **/
    this.put = function(y, x) {
        if( this.board[y][x] !== 1) { // is can put ?
            return false;
        }
        this.board[y][x] = this.player;
        for( var xx = -1; xx < 2; xx++ ) {
            for( var yy = -1; yy < 2; yy++ ) {
                if( xx==0 && yy==0 ) {
                    continue; // not direction.
                }
                var flipCount = this.scan(y, x, yy, xx); // count of turned disks by direction.
                for( var i = 1; i <= flipCount; i++ ) {
                    var turnedPositionY = y + i * yy;
                    var turnedPositionX = x + i * xx;
                    if( turnedPositionY < 0 || turnedPositionX < 0 ) {
                        continue;
                    }
                    this.board[y+i*yy][x+i*xx] = this.player; // flip disks.
                }
            }
        }
        // change player
        this.changePlayer();
    }

    this.changePlayer = function() {
        if( this.player == B ) {
            this.player = W;
        }else{
            this.player = B;
        }
        var canPutFlag = false;
        for( var i = 0; i < 8; i++ ) {
            for( var j = 0; j < 8; j++ ) {
                if( this.board[i][j] != B && this.board[i][j] != W ) {
                    if( this.canPut(i, j) ) {
                        canPutFlag = true;
                        this.board[i][j] = 1;
                    } else {
                        this.board[i][j] = 0;
                    }
                }
            }
        }
        this.canPutFlag = canPutFlag;
    }

    /**
       return player can put position.
     **/
    this.canPut = function(y, x) {
        if( this.board[y][x] == B || this.board[y][x] == W ) {
            return false;
        }
        for( var xx = -1; xx < 2; xx++ ) {
            // 全8方向を調べる
            for( var yy = -1; yy < 2; yy++ ) {
                if( xx==0 && yy==0 ){
                    // 方向無し
                    continue;
                }
                if( this.scan(y, x, yy, xx) ) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
       y, x is position and dy, dx is direction.
       return count by turn disks.
       (dy, dx) are
      | -1, -1 | -1, 0 | -1, +1 |
      |  0, -1 |  0, 0 |  0, +1 |
      | +1, -1 | +1, 0 | +1, +1 |
     **/
    this.scan = function(y, x, dy, dx) {
        if( x+dx < 0 || x+dx > 7 ||  y+dy < 0 ||  y+dy > 7 ) {
            return 0; // corners of end.
        }
        if(this.board[y+dy][x+dx] == 0 || this.board[y+dy][x+dx] == 1 || this.board[y+dy][x+dx] == this.player) {
            // right next is empty or me.
            return 0;
        }
        var count = 2; // 2 squares ahead.
        while(true) {
            if( x+dx*count < 0 || x+dx*count >= 8 ||  y+dy*count < 0 ||  y+dy*count >= 8 ) {
                // out of range.
                return 0;
            }
            if( this.board[y + dy * count][x + dx * count] === 0 || this.board[y + dy * count][x + dx * count] === 0 ) {
                // empty
                return 0;
            }
            if( this.board[y + dy * count][x + dx * count] == this.player ) {
                // same color disk found.
                return count - 1;
            }
            // increment count.
            count++;
        }
    }
};

module.exports = Game;