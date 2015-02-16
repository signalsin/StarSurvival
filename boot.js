var Shmuppet = {};

Shmuppet.Boot = function (game) {
    
    
};

Shmuppet.Boot.prototype = {
    
    preload: function() {
        //load the assets for the preloader
        this.load.image('loadingBar', 'assets/loadingBar.png');
        this.load.bitmapFont('font', 'assets/font.png', 'assets/font.json');
    },
    
    create: function() {
        
        this.setupScaling();
        
        this.input.maxPointers = 1;
        
    },
    
    update: function() {
        
         this.state.start('Preloader');
        
    },
    
    
    setupScaling: function () {
        
        if (this.game.device.desktop)
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.minWidth = 320;
            this.scale.minHeight = 480;
            this.scale.maxWidth = 768;
            this.scale.maxHeight = 1024;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.setScreenSize(true);
            this.scale.refresh();
        }
        else
        {
            this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.minWidth = 320;
            this.scale.minHeight = 480;
            this.scale.maxWidth = 768;
            this.scale.maxHeight = 1024;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.forceOrientation(false, true);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
            this.scale.setScreenSize(true);
            this.scale.refresh();
        }

        },

    enterIncorrectOrientation: function () {
        Shmuppet.orientated = false;
        this.game.paused = true;
        document.getElementById('orientation').style.display = 'block';
    },
    
    leaveIncorrectOrientation: function () {
        Shmuppet.orientated = true;
        this.game.paused = false;
        document.getElementById('orientation').style.display = 'none';
    }
      
};