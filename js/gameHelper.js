var player;
var enemies;
var powerup;


function GameHelper(game){
    this.game = game;
    
    player = new Player(game);
    enemies = new Enemies(game);
    powerup = new Powerup(game);
}


GameHelper.prototype.create = function () {
    //enable the Arcade Physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    //create the background
    this.bgTile = this.game.add.tileSprite(0, 0, 320, 480, 'sprites', 'bgTile');
    enemies.create();
    player.create();
    
    //create buttons for menu
    this.gameOverMenu = this.game.add.sprite(10, 165, 'sprites', 'gameOver');
    this.gameOverMenu.visible = false;

    this.btnTryAgain = this.game.add.button(180, 190, 'sprites', this.restart, this, 'btnTryAgain');
    this.btnTryAgain.visible = false;
    
    this.createScoreText();
    
    this.powerupSound = this.game.add.audio('powerup');
    this.playerDeathSound = this.game.add.audio('playerDeath');
}

GameHelper.prototype.update = function (){

    this.bgTile.tilePosition.y += 1;

    //if the death timer has expired, launch the game over menu
    if (this.deathTimer && (this.deathTimer < this.game.time.now)) {
        this.deathTimer = null;
        this.gameOver();
    }
    else { //otherwise update the game
        player.update();
        enemies.update(this.score);

        this.checkCollisions();
    }
}

GameHelper.prototype.checkCollisions = function(){
    //player bullets and enemies
    
    //if the player is hit, don't check collisions
    if (!player.getGhost()){
        //player bullets and enemies
        this.game.physics.arcade.overlap(player.getBullets(), enemies.getEnemyPool('basic'), enemies.enemyHit, null, this);
        this.game.physics.arcade.overlap(player.getBullets(), enemies.getEnemyPool('shooter'), enemies.enemyHit, null, this);
        this.game.physics.arcade.overlap(player.getBullets(), enemies.getEnemyPool('fast'), enemies.enemyHit, null, this);
        this.game.physics.arcade.overlap(player.getBullets(), enemies.getEnemyPool('fastShooter'), enemies.enemyHit, null, this);
        this.game.physics.arcade.overlap(player.getBullets(), enemies.getEnemyPool('boss'), enemies.bossHit, null, this);

        //player and enemies
        this.game.physics.arcade.overlap(player.getPlayer(), enemies.getEnemyPool('basic'), player.playerHit, null, this);
        this.game.physics.arcade.overlap(player.getPlayer(), enemies.getEnemyPool('shooter'), player.playerHit, null, this);
        this.game.physics.arcade.overlap(player.getPlayer(), enemies.getEnemyPool('fast'), player.playerHit, null, this);
        this.game.physics.arcade.overlap(player.getPlayer(), enemies.getEnemyPool('fastShooter'), player.playerHit, null, this);
        this.game.physics.arcade.overlap(player.getPlayer(), enemies.getEnemyPool('boss'), player.playerHit, null, this);

        //player and bullets
        this.game.physics.arcade.overlap(player.getPlayer(), enemies.getEnemyBullets('shooter'), player.playerHit, null, this);
        this.game.physics.arcade.overlap(player.getPlayer(), enemies.getEnemyBullets('fastShooter'), player.playerHit, null, this);
        this.game.physics.arcade.overlap(player.getPlayer(), enemies.getEnemyBullets('boss'), player.playerHit, null, this);
    }
    
    //can still get powerup even if ghost
    //player and powerup
    if (powerup.getPowerup()){
        this.game.physics.arcade.overlap(player.getPlayer(), powerup.getPowerup(), powerup.activate, null, this);
    }

}

GameHelper.prototype.createScoreText = function (){
    this.score = 0;
    this.scoreText = this.game.add.bitmapText(5, 5, 'font' , this.score.toString(), 14);
}

GameHelper.prototype.addToScore = function (reward){
    this.score += reward;
    this.scoreText.text = this.score;
}

GameHelper.prototype.spawnPowerup = function (x, y, dropRate){
    if (this.game.rnd.frac() < dropRate) {
        powerup.create(x, y);
    }
}

GameHelper.prototype.gameOver = function () {
    var highScore = JSON.parse(localStorage.getItem('highScore'));
    if (!highScore){
        highScore = 0;
    }

    this.gameOverMenu.visible = true;
    this.btnTryAgain.visible = true;
    this.finalScoreMessage = '';

    if (this.score > highScore){
        localStorage.setItem('highScore', JSON.stringify(this.score));
        this.finalScoreMessage = 'NEW RECORD!\n';
    }
    
    this.finalScoreText = this.game.add.bitmapText(35, 220, 'font', this.finalScoreMessage + 'SCORE: ' + this.score.toString() + '\nBEST: ' + highScore.toString(), 16);
    this.finalScoreText.tint = 0x111111;

}

GameHelper.prototype.restart = function() {
    //restart this state
    this.game.state.restart();   
}

GameHelper.prototype.getPlayer = function(){
    return player.getPlayer();
}

GameHelper.prototype.setDeathTimer = function(){
    this.playerDeathSound.play();
    this.deathTimer = this.game.time.now + 5000;   
}

GameHelper.prototype.setBulletType = function(value){
    this.powerupSound.play();
    player.setBulletType(value);
}