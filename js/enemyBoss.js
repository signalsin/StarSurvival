function EnemyBoss(game){
    this.game = game;
}

EnemyBoss.prototype.create = function() {
    
    this.enemy = this.game.add.sprite(-100, -100, 'sprites', 'enemyBoss');
    this.game.physics.enable(this.enemy);
    this.enemy.outOfBoundsKill = true;
    this.enemy.checkWorldBounds = true;
    this.enemy.anchor.x = 0.5;
    this.enemy.anchor.y = 0.5;
    this.enemy.reward = 100;
    this.enemy.dropRate = 0.3;
    
    this.bulletPool = this.game.add.group();
    this.bulletPool.enableBody = true;
    this.bulletPool.createMultiple(10, 'sprites', 'enemyBullet');
    this.bulletPool.setAll('anchor.x', 0.5);
    this.bulletPool.setAll('anchor.y', 0.5);
    this.bulletPool.setAll('outOfBoundsKill', true);
    this.bulletPool.setAll('checkWorldBounds', true);
    
    this.nextEnemyAt = 0;
    this.enemyDelay = 20000;
    this.shotDelay = 1500;
    this.initialHealth = 20;
    this.enemy.health = this.initialHealth;
    
}

EnemyBoss.prototype.update = function() {
   
   //spawn new boss
   if (this.nextEnemyAt < this.game.time.now && !this.enemy.alive) {
       this.enemy.reset(this.game.rnd.integerInRange(20, 300), 0, this.initialHealth);
       this.enemy.body.velocity.y = this.game.rnd.integerInRange(50, 80);
       this.enemy.nextShotAt = 0;
       this.enemy.speed = this.game.rnd.integerInRange(50, 80);
       this.enemy.body.velocity.x = this.game.rnd.integerInRange(50, 80);
   }
   else {
       //move existing boss
       if (this.enemy.alive && this.enemy.y > 100){
           this.enemy.y = 100;
       }

       if (this.enemy.x > 290) {
            this.enemy.body.velocity.x = -this.game.rnd.integerInRange(50, 80);
       }
       else if (this.enemy.x < 50) {
            this.enemy.body.velocity.x = this.game.rnd.integerInRange(50, 80);   
       }
   }
    this.fireBullet();
}

EnemyBoss.prototype.fireBullet = function() {
    
    if (this.enemy.alive) {
    
        if (this.game.time.now > this.enemy.nextShotAt && this.bulletPool.countDead() > 0) {  
            var bullet = this.bulletPool.getFirstExists(false);
            bullet.reset(this.enemy.x + 10, this.enemy.y + 20);
            bullet.rotation = this.game.physics.arcade.moveToObject(bullet, gameHelper.getPlayer(), 150);
            
            var bullet = this.bulletPool.getFirstExists(false);
            bullet.reset(this.enemy.x - 10, this.enemy.y + 20);
            bullet.rotation = this.game.physics.arcade.moveToObject(bullet, gameHelper.getPlayer(), 150);
            
            this.enemy.nextShotAt = this.game.time.now + this.shotDelay;
        }
    } 
}

EnemyBoss.prototype.getEnemy = function() {
    return this.enemy;   
}

EnemyBoss.prototype.getBulletPool = function() {
    return this.bulletPool;
}

EnemyBoss.prototype.updateNextEnemyAt = function(){
    this.nextEnemyAt = this.game.time.now + this.enemyDelay;   
}