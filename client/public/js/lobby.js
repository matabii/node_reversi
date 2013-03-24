define(function() {
    var Lobby = enchant.Class.create({
        initialize: function(game, socket) {
            var self = this;
            this.socket = socket;
            this.scene = new Scene();
            this.scene.backgroundColor = "#22AA22";
            this.assets = game.assets;
            this.setLobby();
        },
        getScene: function() {
            var scene = this.scene;
            scene.name = "lobby";
            return scene;
        },
        setLobby: function() {
            var self = this;

            this.startLabel = new Label('Start!!');
            this.startLabel.font = "72px Arial";
            this.startLabel.x = 380;
            this.startLabel.y = 350;
            this.startLabel.addEventListener('touchend', function(e) {
                self.socket.emit('lobby/start');
            });
            this.descLabel = new Label('Choice Player. Click black or white disks.');
            this.descLabel.x = 10;
            this.descLabel.y = 10;
            this.descLabel.width = 500;
            this.descLabel.font = "18px Arial";
            this.scene.addChild(this.descLabel);

            this.blackSprite = new Sprite(48, 49);
            this.blackSprite.image = this.assets['/public/img/tile.png'];
            this.blackSprite.x = 100;
            this.blackSprite.y = 130;
            this.blackSprite.frame = 3;
            this.blackLabel = new Label("Click!");
            this.blackLabel.font = "18px Arial";
            this.blackLabel.x = 70;
            this.blackLabel.y = 180;
            this.blackLabel.width = 200;

            this.whiteSprite = new Sprite(48, 49);
            this.whiteSprite.image = this.assets['/public/img/tile.png'];
            this.whiteSprite.x = 330;
            this.whiteSprite.y = 130;
            this.whiteSprite.frame = 0;
            this.whiteLabel = new Label("Click!");
            this.whiteLabel.font = "18px Arial";
            this.whiteLabel.x = 300;
            this.whiteLabel.y = 180;

            this.blackSprite.addEventListener('touchend', function(e) {
                self.socket.emit('lobby/sit');
            });

            this.scene.addChild( this.startLabel );
            this.scene.addChild( this.whiteSprite );
            this.scene.addChild( this.whiteLabel );
            this.scene.addChild( this.blackSprite );
            this.scene.addChild( this.blackLabel );
        }
    });
    return {
        "Lobby": Lobby
    };
});