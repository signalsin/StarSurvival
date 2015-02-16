function EnemyFastShooter(game){
    this.game = game;
}

EnemyFastShooter.prototype.create = function() {
    this.enemyPool = this.game.add.group();
    this.enemyPool.enableBody = true;
    this.enemyPool.createMultiple(2, 'sprites', 'enemyFastShooter');
    this.enemyPool.setAll('outOfBoundsKill', true);
    this.enemyPool.setAll('checkWorldBounds', true);
    this.enemyPool.setAll('anchor.x', 0.5);
    this.enemyPool.setAll('anchor.y', 0.5);
    this.enemyPool.setAll('reward', 30, false, false, 0, true);
    this.enemyPool.setAll('dropRate', 0.2, false, false, 0, true);
    
    this.bulletPool = this.game.add.group();
    this.bulletPool.enableBody = true;
    this.bulletPool.createMultiple(5, 'sprites', 'enemyBullet');
    this.bulletPool.setAll('anchor.x', 0.5);
    this.bulletPool.setAll('anchor.y', 0.5);
    this.bulletPool.setAll('outOfBoundsKill', true);
    this.bulletPool.setAll('checkWorldBounds', true);
    
    this.nextEnemyAt = 0;
    this.enemyDelay = 4500;
    this.shotDelay = 1500;
    this.initialHealth = 1;
}

EnemyFastShooter.prototype.update = function() {
    if (this.nextEnemyAt < this.game.time.now && this.enemyPool.countDead() > 0) {
        this.nextEnemyAt = this.game.time.now + this.enemyDelay;
        var enemy = this.enemyPool.getFirstExists(false);
        
        //determine if moving left or right
        enemy.direction = this.game.rnd.integerInRange(0,1);
        
        if (enemy.direction == 0){
            //moving from left to right
            enemy.reset(0, 0, this.initialHealth);
            enemy.body.velocity.y = this.game.rnd.integerInRange(80, 130);
            enemy.body.velocity.x = this.game.rnd.integerInRange(10,60);
            enemy.nextShotAt = 0;
        }
        else {
            enemy.reset(300, 0, this.initialHealth);
            enemy.body.velocity.y = this.game.rnd.integerInRange(80, 130);
            enemy.body.velocity.x = this.game.rnd.integerInRange(-60, -10);
            enemy.nextShotAt = 0;
        }
    }
    this.fireBullet();
}

EnemyFastShooter.prototype.fireBullet = function() {
    this.enemyPool.forEachAlive(function (enemy) {
        if (enemy.y < gameHelper.getPlayer().y) {
            if (this.game.time.now > enemy.nextShotAt && this.bulletPool.countDead() > 0) {  
                var bullet = this.bulletPool.getFirstExists(false);
                bullet.reset(enemy.x, enemy.y);
                bullet.rotation = this.game.physics.arcade.moveToObject(bullet, gameHelper.getPlayer(), 150);
                enemy.nextShotAt = this.game.time.now + this.shotDelay;
            }
        }
    }, this);
}

EnemyFastShooter.prototype.getEnemyPool = function() {
    return this.enemyPool;   
}

EnemyFastShooter.prototype.getBulletPool = function() {
    return this.bulletPool;
}