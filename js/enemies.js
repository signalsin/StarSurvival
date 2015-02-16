var basicEnemy;
var basicShooterEnemy;
var fastEnemy;
var fastShooterEnemy;
var bossEnemy;

var deathEmitter;
var bulletEmitter;

function Enemies(game){
    this.game = game;
}

Enemies.prototype.create = function() {
    
    basicEnemy = new EnemyBasic(this.game);
    basicEnemy.create();
    
    basicShooterEnemy = new EnemyBasicShooter(this.game);
    basicShooterEnemy.create();
    
    fastEnemy = new EnemyFast(this.game);
    fastEnemy.create();
    
    fastShooterEnemy = new EnemyFastShooter(this.game);
    fastShooterEnemy.create();
    
    bossEnemy = new EnemyBoss(this.game);
    bossEnemy.create();
    
    this.createEmitter();
    
    this.deathSound = this.game.add.audio('enemyDeath');
}

Enemies.prototype.update = function(score) {
    
    basicEnemy.update();
    
    if (score > 100) {
        fastEnemy.update();
    }
    
    if (score > 400) {
        basicShooterEnemy.update();
    }
    
    if (score > 750) {
        fastShooterEnemy.update();   
    }
    
    if (score > 1000) {
        bossEnemy.update();   
    }
}

Enemies.prototype.createEmitter = function() {
    //add particle effects for when enemies are destroyed
    deathEmitter = this.game.add.emitter(0, 0, 100);
    deathEmitter.makeParticles('sprites','explosion_particle');
    deathEmitter.gravity = 0;
    deathEmitter.setAlpha(0.3, 0.8);
    deathEmitter.setScale(0.5, 1);
    
    //when bullets are destroyed
    bulletEmitter = this.game.add.emitter(0, 0, 30);
    bulletEmitter.makeParticles('sprites','playerBulletParticle');
    bulletEmitter.gravity = 0;
    bulletEmitter.setAlpha(0.3, 1);
    bulletEmitter.setScale(0.5, 1);
}

Enemies.prototype.enemyHit = function(bullet, enemy) {
    if (enemy.health == 0) {
        enemies.enemyDeath(enemy.x, enemy.y);
        
        // add to score
        this.addToScore(enemy.reward);

        //spawn powerup
        gameHelper.spawnPowerup(enemy.x, enemy.y, enemy.dropRate);
        
        bullet.kill();
        enemy.kill();
    }
    else {
        
        bulletEmitter.x = bullet.x;
        bulletEmitter.y = bullet.y - bullet.height * 2;
        bulletEmitter.start(true, 300, null, 5);
        bullet.kill();
        enemy.health -= 1;   
    }
}

Enemies.prototype.bossHit = function(enemy, bullet){
    
    if (enemy.health == 0) {

        enemies.enemyDeath(enemy.x, enemy.y);
        
        // add to score
        this.addToScore(enemy.reward);

        //spawn powerup
        gameHelper.spawnPowerup(enemy.x, enemy.y, enemy.dropRate);
        
        //reset the timer
        bossEnemy.updateNextEnemyAt();

        bullet.kill();
        enemy.kill();
    }
    else {
        
        bulletEmitter.x = bullet.x;
        bulletEmitter.y = bullet.y - bullet.height * 2;
        bulletEmitter.start(true, 300, null, 5);
        bullet.kill();
        enemy.health -= 1;   
    }
    
}

Enemies.prototype.enemyDeath = function(x, y){
    // 'splosion!
    deathEmitter.x = x;
    deathEmitter.y = y;
    deathEmitter.start(true, 600, null, 15);
    this.deathSound.play();
}

Enemies.prototype.getEnemyPool = function(type) {
 
    switch(type) {
        case 'shooter':
            return basicShooterEnemy.getEnemyPool();
        case 'fast':
            return fastEnemy.getEnemyPool();
        case 'fastShooter':
            return fastShooterEnemy.getEnemyPool();
        case 'boss':
            return bossEnemy.getEnemy();
        default:
            return basicEnemy.getEnemyPool();
    } 
}

Enemies.prototype.getEnemyBullets = function(type) {
    switch(type) {
        case 'fastShooter':
            return fastShooterEnemy.getBulletPool();
        case 'boss':
            return bossEnemy.getBulletPool();
        default:
            return basicShooterEnemy.getBulletPool();
    }
}