game.GameTimerManager = Object.extend ({
	init: function(x, y, settings){
		this.now = new Date().getTime();
		this.lastCreep = new Date(). getTime();
    this.paused = false;
		this.alwaysUpdate = true;
			
	},
    
    update: function(){ 
     	this.now = new Date().getTime()
      this.goldTimerCheck();
      this.creepTimerCheck();

     	return true;
    },
      goldTimerCheck: function(){
        if(Math.round(this.now/1000)%20 === 0 && (this.now - this.lastCreep >= 1000)){
           game.data.gold += (game.data.exp1+1);
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
        this.gameover = false;

      },

        update: function () {
          if(game.data.win === true && !this.gameover){
            this.gameOver(true);
          }else if(game.data.win === false && !this.gameover) {
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
         this.gameover = true;
         me.save.exp = game.data.exp;
      }


    });

      game.SpendGold = Object.extend({
        init: function(x, y, settings){
          this.now = new Date().getTime();
          this.lastBuy = new Date(). getTime();
          this.paused = false;
          this.alwaysUpdate = true;
          this.updateWhenPaused = true;
          this.buying = false;
    },

      update: function(){
           this.now = new Date().getTime();

          if(me.input.isKeyPressed("buy") && this.now-this.lastBuy >= 1000) {
            this.lastBuy = this.now;
            if(!this.buying){ 
                this.startBuying();
         }else{
              this.stopBuying();
         }
         
       }



        return true;
      },

      startBuying: function(){
        this.buying = true;
        me.state.pause(me.state.PLAY);
        game.data.pausePos = me.game.viewport.localToWorld(0, 0);
        game.data.buyscreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage('gold-screen'));
        game.data.buyscreen.updateWhenPaused = true;
        game.data.buyscreen.setOpacity(0.8);
        me.game.world.addChild(game.data.buyscreen, 34);
        game.data.player.body.setVelocity(0, 0);
        me.state.pause(me.state.PLAY);
        me.input.bindKey(me.input.KEY.F1, "F1", true);
        me.input.bindKey(me.input.KEY.F2, "F2", true);
        me.input.bindKey(me.input.KEY.F3, "F3", true);
        me.input.bindKey(me.input.KEY.F4, "F4", true);
        me.input.bindKey(me.input.KEY.F5, "F5", true);
        me.input.bindKey(me.input.KEY.F6, "F6", true);
        this.setBuyText();


      },

      setBuyText: function(){
      
       game.data.buytext = new (me.Renderable.extend({
          init: function(){
             this._super(me.Renderable, 'init', [game.data.pausePos.x, game.data.pausePos.y, 5, 5]);
             this.font = new me.Font("Tahoma", 30, "red");
             this.updateWhenPaused = true;
             this.alwaysUpdate = true;
              // me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);

      },

      draw:  function(renderer){
        this.font.draw(renderer.getContext(), "PRESS F1-F6 TO BUY, B TO EXIT. Current Gold: " + game.data.gold, this.pos.x, this.pos.y);
        this.font.draw(renderer.getContext(), "Skill 1: Increase Damage. Current Level:  " + game.data.skill1 + " Cost: " + ((game.data.skill1+1)*10), this.pos.x, this.pos.y + 40);
        this.font.draw(renderer.getContext(), "Skill 2: Run Faster! Current Level:  " + game.data.skill2 + " Cost: " + ((game.data.skill2+1)*10), this.pos.x, this.pos.y + 80);
        this.font.draw(renderer.getContext(), "Skill 3: Increase Health. Current Level: " + game.data.skill3 + " Cost: " + ((game.data.skill3+1)*10), this.pos.x, this.pos.y + 120);
        this.font.draw(renderer.getContext(), "Q Ability: Speed Burst. Current Level: " + game.data.ability1 + " Cost: " + ((game.data.ability1+1)*10), this.pos.x, this.pos.y + 160);
        this.font.draw(renderer.getContext(), "W Ability: Eat Your Creep For Health: " + game.data.ability2 + " Cost: " + ((game.data.ability2+1)*10), this.pos.x, this.pos.y + 200);
        this.font.draw(renderer.getContext(), "E Ability: Throw Your Spear: " + game.data.ability3 + " Cost: " + ((game.data.ability3+1)*10), this.pos.x, this.pos.y + 240);
        
        }
    

        }));
      me.game.world.addChild(game.data.buytext, 35);
   },

      stopBuying: function(){
        this.buying = false;
        me.state.resume(me.state.PLAY);
        game.data.player.body.setVelocity(game.data.playerMoveSpeed, 20);
        me.game.world.removeChild(game.data.buyscreen);
        me.input.unbindKey(me.input.KEY.F1, "F1", true);
        me.input.unbindKey(me.input.KEY.F2, "F2", true);
        me.input.unbindKey(me.input.KEY.F3, "F3", true);
        me.input.unbindKey(me.input.KEY.F4, "F4", true);
        me.input.unbindKey(me.input.KEY.F5, "F5", true);
        me.input.unbindKey(me.input.KEY.F6, "F6", true);
        me.game.world.removeChild(game.data.buytext);


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

//what we basically did was we set the values up for when a user purchases a power up and we set up the cost of the experience

// the user can now use the experience he/she has and buy powerups so far we only have 1 power up that is available to be purchased

//Basically what we did in video 46 was we set up the spendGold function

// we also added a picture of it in the title screen

// we linked everything together that had to do with the spendGold funciton


//When the user presses the buy button we want to pause the game

//we are setting up the function to where the buy key is pressed

// resume is what we use as the pause function in stopBuying

//the opacity is adjustable to the user can still get a glimpse of what is going on in the game at the current time

// The reson why we unbind the key is so people can not randomly make purchases

// this.updateWhenPaused will only work if it is after this.font

// we had to add a z value for our "B" button to wrk

// we had to add the z value for the text to show up

