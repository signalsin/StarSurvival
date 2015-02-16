Shmuppet.Preloader = function (game) {

    this.game = game;
};

Shmuppet.Preloader.prototype = {
    
    preload: function() {
        
        //create loading progress bar etc
        this.preloadBar = this.add.sprite(90, 210, 'loadingBar');
        this.load.setPreloadSprite(this.preloadBar);
        this.loadingText = this.game.add.bitmapText(90, 190, 'font', 'LOADING...', 14);
        
        //preload the rest of the assets
        this.load.atlas('sprites', 'assets/sprites.png', 'assets/sprites.json');
        
        this.load.audio('playerDeath', ['assets/playerDeath.ogg','assets/playerDeath.aac']);
        this.load.audio('enemyDeath', ['assets/enemyDeath.ogg','assets/enemyDeath.aac']);
        this.load.audio('laser', ['assets/laser.ogg','assets/laser.aac']);
        this.load.audio('powerup', ['assets/powerup.ogg','assets/powerup.aac']);
        
    },
    
    create: function() {
        this.preloadBar.cropEnabled = false;
    },

    update: function() {
        this.ready = true;
        this.state.start('MainMenu');
    },
    
};