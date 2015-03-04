game.GameTimerManager = Object.extend ({
	init: function(x, y, settings){
		this.now = new Date().getTime();
		this.lastCreep = new Date(). getTime();
    this.paused = false;
		this.alwaysUpdate = true;
			
	},
    
    update: function(){ 
     	this.now = new Date().getTime()
      this.goldTimerCheck(this);
      this.creepTimerCheck();

     	return true;
    },
      goldTimerCheck: function(){
        if(Math.round(this.now/1000)%20 ===0 && (this.now - this.lastCreep >= 1000)){
           game.data.gold += 1;
           console.log("Current gold: " + game.data.gold) ;
      }

      },

     creepTimerCheck: function(){
      if(Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >= 1000)){
        this.lastCreep = this.now;
        var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
        me.game.world.addChild(creepe, 5);
      
      }
     
     }
});

    game.HeroDeathManager = Object.extend({
      init: function(x, y, settings){
      this.alwaysUpdate = true;
      this.gameOver = false;

    },


  update: function(){
    if(game.data.player.dead) {
       me.game.world.removeChild(game.data.player);
       me.state.current().resetPlayer(10, 0);

      }

      return true;
  }

});

    game.ExperienceManager = Object.extend({
      init: function(x, y, settings){
        this.alwaysUpdate = true;
        this.gameOver = false;

      },

        update: function () {
          if(game.data.win === true && !this.gameOver){
            this.gameOver(true);
          }else if(game.data.win === false && !this.gameOver) {
           this.gameOver(false);
          }
         
          return true;

      },

      gameOver: function (win){
        if(win) {
          game.data.exp += 10; 
        }else{
          game.data.exp += 1;
        }
         this.gameOver = true;
         me.save.exp = game.data.exp;
      }


    });




// The game manager removes the player if he's  dead and sets him back

// we have refactored the game manager as much as possible

// There are some other things that we can also refactor

// this.gameOver is a quick fix for all the madness that is going on 

//this.game over is the global variable we are using to call the game over screen

//We only get into each of those if statements if game over is false


// if it is true we can not add any more points


// we need to apply this.gameOver to something that will call the game over clean

//we reduced lines of code that were repetitive 

// A bollean means either true or false and it is a variable type

// we are automatically calling the game over function with 2 intenitions

