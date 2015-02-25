 game.PlayerEntity = me.Entity.extend({
 	init: function(x, y, settings) {
    	this._super(me.Entity, 'init', [x, y, {
    		image: "player",
    	  	width: 64,
    	  	height: 64,
    	  	spritewidth: "64",
    	  	spriteheight: "64",
    	  	
    	  	getShape: function() {
    	  		return(new me.Rect(0, 0, 64, 64)).toPolygon();
    	  	}
		}]);
      this.type = "PlayerEntity";
      this.health = game.data.playerHealth;
    	this.body.setVelocity(game.data.playerMoveSpeed, 20);
    	this.facing = "right";
    	this.now = new Date().getTime();
      this.dead = false;
      this.attack = game.data.playerAttack;
    	this.lastHit = this.now;
    	this.lastAttack = new Date().getTime();

    	this.renderable.addAnimation("idle", [78]);
    	this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
        this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
    	this.renderable.setCurrentAnimation("idle");


        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
 	},

 	    update: function(delta){
 	    	this.now = new Date().getTime();

        if(this.health <= 0){
          this.dead = true;
        }
   		 	
        if(me.input.isKeyPressed ("right")){
 	         	// sets position of my x by adding the velocity defined above in setvelocity() and multiplying it by me.timer.tick
 	        	this.body.vel.x += this.body.accel.x * me.timer.tick;
 	        	this.facing = "right";
 	        	this.flipX(true);
 	        } else if(me.input.isKeyPressed("left")){
 	        	this.facing.left = "left";
 	        	this.body.vel.x -= this.body.accel.x * me.timer.tick;
 	        	this.flipX(false);
 	        }else{ 
              this.body.vel.x = 0;
 	      }
           
 	      if(me.input.isKeyPressed("jump")){
          if(!this.body.jumping  && !this.body.falling){
            this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
             this.body.jumping = true;

        }
        }  


 	        if(me.input.isKeyPressed("attack")){
 	      	  if(!this.renderable.isCurrentAnimation("attack")){
 	      		// sets the current animation to attack and once it is over, goes back to idle animation
 	      		this.renderable.setCurrentAnimation("attack", "idle");
 	      		// the line of code below makes it so that, this sequence, we begin from the first animation, not wherever we left off when we switched 
 	      		this.renderable.setAnimationFrame();
 	      }

 	    }

          else if(this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")){
             if(!this.renderable.isCurrentAnimation("walk")){
          	   this.renderable.setCurrentAnimation("walk");
       
            }
         
          }else if (!this.renderable.isCurrentAnimation("attack")){
             this.renderable.setCurrentAnimation("idle");

          }

 	       me.collision.check(this, true, this.collideHandler.bind(this), true);
 	       this.body.update(delta);
 	    
 	       this._super(me.Entity, "update", [delta]);
 	       return true;
 	    },

      loseHealth: function(damage){
        this.health = this.health - damage;
      },

 	    collideHandler: function(response){
 	    	if(response.b.type==='EnemyBaseEntity'){
 	    		var ydif = this.pos.y - response.b.pos.y;
 	    		var xdif = this.pos.x - response.b.pos.x;
   
 	    		if(ydif<-40 && xdif< 70 && xdif>-35){
 	    			this.body.falling = false;
 	    			this.body.vel.y = -1;
 	    	     }
 	    		else if(xdif>-35 && this.facing=== 'right' && (xdif<0) && ydif>-50){
 	    			this.body.vel.x = 0;
 	    			// this.pos.x = this.pos.x -1;
 	    		}else if(xdif<70 && this.facing==='left' && xdif>0) {
 	    			this.body.vel.x = 0;
 	    			// this.pos.x = this.pos.x +1;
 	    	   }

 	    	    if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer){
 	    			this.lastHit = this.now;
 	    			response.b.loseHealth(game.data.playerAttack);
 	    	}
 	    }else if(response.b.type==='EnemyCreep') {
          var xdif = this.pos.x - response.b.pos.x;
          var ydif = this.pos.y - response.b.pos.y;

          if (xdif>0) {
             // this.pos.x = this.pos.x + 1;
              if(this.facing==="left"){
                this.body.vel.x = 0;
              }
          }else{
            // this.pos.x = this.pos.x - 1;
             if(this.facing==="right"){
                this.body.vel.x = 0;
              }
          } 
          if(this.renderable.isCurrentAnimation('attack') && this.now-this.lastHit >= game.data.playerAttackTimer
              && (Math.abs(ydif) <=40) && 
              (((xdif>0) && this.facing==="left") || ((xdif<0) && this.facing==="right")))
          {
            this.lastHit = this.now;
            // if the creeps health is less then our attack excecute code in if statement
            if(response.b.health <= game.data.playerAttack) {
              // adds one gold for a creep kill
                game.data.gold += 1;
                console.log("Current gold: " + game.data.gold);
            }


            response.b.loseHealth(game.data.playerAttack);
          }
      }
 	 }
   
   });
	
// END OF UPDATE FUNCTION ABOVE!!!!!!

 //the reason why this is a class, it gets to have both letters be capital
 // the init: is our constructor function
 // for entities it wants 3 parameters
 // the difference between the spriteheight and width vs the regular height and width is that sprite width and sprite height are passing the main info.
 // the regular width and the height is telling the screen what ammount of space to preserve
// this is for the player to move right
//velocity represnts our current position
// me.timer.tick makes the movement look smooth
//adds to the position of my x by the velocity defined above
//delta is the change in time that has happened
//the speed is 80 miliseconds
// what the If (!this statment is saying is, that we dont want to start the walk animation, if we are already walking
//// if we dont add this line the animations wont be able to animate on the fly
// this.flipX fixes the characters turning



//This.broken is the variable we make to say that the tower is not destroyed
//this.health represents how much health you begin with
//this.type is for later collisions
//what the if statement does, is it looks at your health and determines if you are dead
// always call the super in update functions
//we then set the animations on the player and enemy base
// when we break the tower we want to set the animation to broken
//renderable is a class that they built in melon js, we use it to do most animations
//me.game.viewport allows us to follow the player
// This.facing keeps track of hich direction, your character is going
//me.collision is basically just checking for collisions
//what is going on is we are passing our parameter to our function collide.handler
//response.a represents our player
// response.b represents whatever we are colliding with
//vary dif represents the difference between my players y position and the bases y position
// what we want to happen is our Y variable to be dealt with first
// we have not used attack var yet
//this.health-- makes the health go down one
//the attack animation will detect collisions over and over
//this.now keeps track of the time in the game
//this.lastAttack is for a hit delay
//everytime you call for an update you want to change this.now
// our GameManager is not something that will appear on the screen
//It is not an entity it is just something we are using
//we want to make sure the game manager is continuosuly updating
//math.round checks to see if we have a multiple of 10
// this is mod %, it will check and see if we have a multiple of 10
// We want the creeps to drop to the ground and begin walking
// delta represents time as a parameter 
//We want the creeps to drop to the ground and begin walking
// delta represents time as a parameter
// this.attacking lets us know if the nemy is currently attacking
// this.pos.x keeps moving the creep
// we do not want our creep to hit multiple things 
//we put an if else statement so it can only be hitting one of those things
//To the right the x value will be bigger 
//The position change will only happen when the creep is attacking
//  what we want our if else statement in our player function to do is to hurt the creep only when we are attacking
// we are working on the ways we can attack the creeps
// | | this represents and
// If we make the number smaller in Playerattack timer, the player can attack faster and if we make the number bigger the player can attack slower
// now we can just adjust everything in the game.js file
// we are making an if else statement in the game manager to see if the player is dead 
// we are using the reset player function
// renderable fuctions draw instead of update
//renderer is the parameter of the draw function
//we put the coordinates of where we are in the draw function
//we need the event handler to be listening for someone to press the enter button
//without an event handler we cannot check any other way
//we also need to make sure we unbind the key also
// gold will be aquired each game and can be used to buy, power ups
// we have other variables to keep track of how the experience is spent
// we are using local variables to make sure we are keeping track of things such as the experience on the fly


//In video 29 we are basically editing our code and making it shorter
// When the code is trimmed down the way it was, we can manage all of the code more easily  
// we split most of our functions into seperate java script files 