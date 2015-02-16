//var gameHelper;

Shmuppet.Game = function (game){

};

Shmuppet.Game.prototype = {

    create: function () {
        
        //start the gameHelper
        gameHelper = new GameHelper(this.game);
        gameHelper.create();

    },

    update: function (){
        gameHelper.update();
    },

};
