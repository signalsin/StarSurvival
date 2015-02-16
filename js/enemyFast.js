function EnemyFast(game){
    this.game = game;
}

EnemyFast.prototype.create = function() {
    this.enemyPool = this.game.add.group();
    this.enemyPool.enableBody = true;
    this.enemyPool.createMultiple(3, 'sprites', 'enemyFast');
    this.enemyPool.setAll('outOfBoundsKill', true);
    this.enemyPool.setAll('checkWorldBounds', true);
    this.enemyPool.setAll('anchor.x', 0.5);
    this.enemyPool.setAll('anchor.y', 0.5);
    this.enemyPool.setAll('reward', 15, false, false, 0, true);
    this.enemyPool.setAll('dropRate', 0.09, false, false, 0, true);

    this.nextEnemyAt = 0;
    this.enemyDelay = 3000;
    this.initialHealth = 0;
}

EnemyFast.prototype.update = function() {
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
            enemy.body.velocity.x = this.game.rnd.integerInRange(-10, -60);
            enemy.nextShotAt = 0;
        }
    }
}

EnemyFast.prototype.getEnemyPool = function() {
    return this.enemyPool;   
}
