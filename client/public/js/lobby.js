define(function() {
    var Lobby = enchant.Class.create({
        initialize: function(game, socket) {
            var self = this;
            this.socket = socket;
            this.scene = new Scene();
            this.scene.backgroundColor = "#444444";
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

            this.startLabel = new Label('Start');
            this.startLabel.font = "64px Arial";
            this.startLabel.x = 100;
            this.startLabel.y = 100;
            this.startLabel.addEventListener('touchend', function(e) {
                self.socket.emit('lobby/start');
            });

            this.scene.addChild( this.startLabel );
        }
    });
    return {
        "Lobby": Lobby
    };
});