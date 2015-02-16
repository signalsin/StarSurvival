var lives;
var livesText;
var emitterDeath;
var deadUntil;
var ghostUntil;

function Player(game){
    this.game = game;
    this.sprite = null;
}

Player.prototype.create = function () {
    this.player = this.game.add.sprite(155, 450, 'sprites', 'playerGhost_1');
    this.game.physics.enable(this.player);
    this.player.body.collideWorldBounds = true;
    this.player.body.gravity.y = 0.1;
    this.player.anchor.setTo(0.5, 0.5);
    this.player.body.setSize(30,15);
    
    this.player.animations.add('player', ['playerGhost_1']);
    this.player.animations.add('ghostPlayer', ['playerGhost_1', 'playerGhost_2'], 8, true);
    lives = 3;
    
    this.bulletType = 0;
    this.maxVelocity = 200;
    this.acceleration = 10;
    
    this.bulletSound = this.game.add.audio('laser');
    
    this.createLivesCounter();
    this.createBullets();
    this.createEmitterDeath();

    this.game.input.addPointer();
}

Player.prototype.update = function() {
    
    if (ghostUntil && ghostUntil < this.game.time.now){
        this.player.play('player');
        ghostUntil = null;
        
    }
    else if (this.player.alive) {
        this.playerMovement();
        if (!ghostUntil){
            this.fireBullet();
        }
    }
    
}

Player.prototype.playerMovement = function(){
    
    if ((this.game.input.activePointer.isDown) &&
        (this.game.physics.arcade.distanceToPointer(this.player, this.game.input.activePointer) > 20)){
            this.game.physics.arcade.moveToPointer(this.player, this.maxVelocity);
    }
    else {
        if (this.player.body.velocity.y > 0) {
            this.player.body.velocity.y -= this.acceleration;
        }
        if (this.player.body.velocity.y < 0) {
            this.player.body.velocity.y += this.acceleration;
        }
        if (this.player.body.velocity.x > 0) {
            this.player.body.velocity.x -= this.acceleration;
        }
        else if (this.player.body.velocity.x < 0) {
            this.player.body.velocity.x += this.acceleration;
        }
    }
}

Player.prototype.createLivesCounter = function() {
    
    this.livesImage = this.game.add.sprite(280, 5, 'sprites', 'playerLife');   
    livesText = this.game.add.bitmapText(300, 5, 'font', lives.toString(), 14);
}

Player.prototype.createBullets = function () {
    
    this.bullets = this.game.add.group();
    this.bullets.enableBody = true;
    this.bullets.createMultiple(30, 'sprites', 'playerBullet');
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('checkWorldBounds', true);
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 2);
    this.bulletTime = 0;
}

Player.prototype.createEmitterDeath = function() {
    emitterDeath = this.game.add.emitter(0, 0, 40);
    emitterDeath.makeParticles('sprites', 'explosion_particle');
    emitterDeath.gravity = 0;
    emitterDeath.setAlpha(0.3, 0.8);
    emitterDeath.setScale(0.5, 1);
    
}

Player.prototype.fireBullet = function() {
    //  To avoid them being allowed to fire too fast we set a time limit
    if (this.game.time.now > this.bulletTime)
    {
        this.bulletSound.play();
        switch(this.bulletType){
            case 1:
                this.fireDefault(8);
                this.fireDefault(-8);
                break;
            case 2:
                this.fireDefault(0);
                this.fireSpread('left');
                this.fireSpread('right');
                break;
            default:
                this.fireDefault(0);
                break;
        }
    }
}

Player.prototype.fireDefault = function(xMod) {
    //  Grab the first bullet we can from the pool
    this.bullet = this.bullets.getFirstExists(false);

    if (this.bullet)
    {
        //  And fire it
        this.bullet.reset(this.player.x + xMod, this.player.y + 8);
        this.bullet.body.velocity.y = -400;
        this.bulletTime = this.game.time.now + 700;
    }
}

Player.prototype.fireSpread = function(type){
    //  Grab the first bullet we can from the pool
    this.bullet = this.bullets.getFirstExists(false);

    if (this.bullet){
        if (type == 'left'){
            this.bullet.reset(this.player.x - 8, this.player.y + 8); 
            this.game.physics.arcade.velocityFromAngle(-95, 400, this.bullet.body.velocity);
        }
        else if (type == 'right'){
            this.bullet.reset(this.player.x + 8, this.player.y + 8); 
            this.game.physics.arcade.velocityFromAngle(-85, 400, this.bullet.body.velocity);
        }
        
        this.bulletTime = this.game.time.now + 700;
    }
    
}

Player.prototype.playerHit = function(player, bullet) {
    
    // check first if ghostUntil is not not undefined or null 
    if (ghostUntil && ghostUntil > this.game.time.now) {
      return;
    }
    
    //determines between bullet and enemy ship
    if(bullet.rotation) {
        bullet.kill();   
    }
    if (lives > 0) {
        lives -= 1;
        livesText.text = lives.toString();
        
        emitterDeath.x = player.x;
        emitterDeath.y = player.y;
        emitterDeath.start(true, 200, null, 10);
        ghostUntil = this.game.time.now + 3000;
        player.play('ghostPlayer');
    }
    else if (lives == 0) {
        emitterDeath.x = player.x;
        emitterDeath.y = player.y;
        emitterDeath.start(true, 1000, null, 40);
        player.kill();
        gameHelper.setDeathTimer();
    }
}

Player.prototype.getPlayer = function() {
    return this.player;
}

Player.prototype.getBullets = function() {
    return this.bullets;   
}

Player.prototype.getGhost = function() { 
    if (ghostUntil){
        return true;
    }
    else {
        return false;
    }
}

Player.prototype.getAlive = function() {
    return this.player.alive;
}

Player.prototype.setBulletType = function(value) {
    
    if (this.bulletType < 2) {
        this.bulletType += value; 
    }
}