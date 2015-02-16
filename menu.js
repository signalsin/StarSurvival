Shmuppet.MainMenu = function (game){

};

Shmuppet.MainMenu.prototype = {

    create: function () {
        
        //create the background
        this.bgTile = this.game.add.tileSprite(0, 0, 320, 480, 'sprites', 'bgTile');
        
        //create the title text
        this.titleText = this.game.add.bitmapText(35, 25, 'font' , 'STAR\nSURVIVAL', 42);
        this.titleText.align = 'center';
        
        
        //create the buttons
        this.menuButton = this.game.add.button(65, 160, 'sprites', this.startGame, this, 'menuButton', 'menuButton', 'menuButton');
        this.creditsButton = this.game.add.button(65, 300, 'sprites', this.showCredits, this, 'menuButton', 'menuButton', 'menuButton');
        this.backButton = this.game.add.button(65, 300, 'sprites', this.resetMenu, this, 'menuButton', 'menuButton',      'menuButton');
        this.backButton.visible = false;
        
        //create the button text
        this.startText = this.game.add.bitmapText(120, 190, 'font', 'START\nGAME', 22);
        this.startText.align = 'center';
        this.creditsButtonText = this.game.add.bitmapText(110, 340, 'font', 'CREDITS', 22);
        this.backButtonText = this.game.add.bitmapText(130, 340, 'font', 'BACK', 22);
        this.backButtonText.visible = false;
        
        //create the credits text
        this.creditsText = this.game.add.bitmapText(60, 150, 'font',
                                                    'DEVELOPER:\nMICHAEL HENDERSON\n(SIGNALSIN)\n\nARTWORK:\nKENNEY.NL', 16);
        this.creditsText.align = 'center';
        this.creditsText.visible = false;
        
        //add button press audio
        this.btnSound = this.game.add.audio('powerup');
                                                                        
    },

    update: function (){
        this.bgTile.tilePosition.y += 1;
    },
    
    startGame: function(){
        this.btnSound.play();
        
        this.state.start('Game');   
    },
    
    showCredits: function(){
        
        this.menuButton.visible = false;
        this.startText.visible = false;
        this.creditsButton.visible = false;
        this.creditsButton.visible = false;
        this.creditsButtonText.visible = false;
        
        this.backButton.visible = true;
        this.creditsText.visible = true;
        this.backButtonText.visible = true;
        
        this.btnSound.play();
    },
    
    resetMenu: function(){
        
        this.menuButton.visible = true;
        this.startText.visible = true;
        this.creditsButton.visible = true;
        this.creditsButton.visible = true;
        this.creditsButtonText.visible = true;
        
        this.backButton.visible = false;
        this.creditsText.visible = false;
        this.backButtonText.visible = false;
        
        this.btnSound.play();
        
    },

};