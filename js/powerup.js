function Powerup(game) {
    this.game = game;
}

Powerup.prototype.create = function(x, y) {
    
    //if it doesn't exist, create it
    if (!this.powerup) {
        this.powerup = this.game.add.sprite(x, y, 'sprites', 'powerup_1');
        this.powerup.animations.add('powerup', ['powerup_1', 'powerup_2'], 3, true);
        this.powerup.animations.play('powerup');
        this.powerup.anchor.setTo(0.5, 0.5);
        this.powerup.outOfBoundsKill = true;
        this.powerup.checkWorldBounds = true;
        this.game.physics.arcade.enable(this.powerup);
        this.powerup.body.velocity.y = 60;
    }
    else if (!this.powerup.alive){
        //if it does exist but isn't alive, reset its location
        this.powerup.reset(x, y, 0);
        this.powerup.body.velocity.y = 60;
    }
    
}

Powerup.prototype.activate = function(player, powerup) {
    gameHelper.setBulletType(1);
    gameHelper.addToScore(20);
    
    powerup.kill();
}

Powerup.prototype.getPowerup = function() {
    return this.powerup;   
}
