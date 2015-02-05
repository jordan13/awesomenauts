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

    	this.body.setVelocity(5, 20);
    	this.facing = "right";
    	this.now = new Date().getTime();
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
           
 	      if(me.input.isKeyPressed("jump") && !this.body.jumping  && !this.body.falling){
 	      		this.body.jumping = true;
 	      		this.body.vel.y -= this.body.accel.y * me.timer.tick;

 	      }


 	        if(me.input.isKeyPressed("attack")){
 	      	  if(!this.renderable.isCurrentAnimation("attack")){
 	      	    console.log(!this.renderable.isCurrentAnimation("attack"));
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
 	    			this.pos.x = this.pos.x -1;
 	    		}else if(xdif<70 && this.facing==='left' && xdif>0) {
 	    			this.body.vel.x = 0;
 	    			this.pos.x = this.pos.x +1;
 	    	   }

 	    	    if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= 1000){
 	    			console.log("tower Hit");
 	    			this.lastHit = this.now;
 	    			response.b.loseHealth();
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
game.PlayerBaseEntity = me.Entity.extend ({
	init : function(x, y, settings){
		this._super(me.Entity, 'init', [x, y, {
			image: "tower",
			width: 100,
			height: 100,
			spritewidth: "100",
			spriteheight: "100",
			getShape: function (){
				return (new me.Rect(0, 0, 100, 80)).toPolygon();
			}

	}]);
    this.broken = false;
    this.health = 10;
    this.alwaysUpdate = true;
    this.body.onCollision = this.onCollision.bind(this);
    this.renderable.addAnimation("idle", [0]);
    this.renderable.addAnimation("broken", [1]);
    this.renderable.setCurrentAnimation("idle");
    this.type = "PlayerBaseEntity";


},

  update:function(delta){
  	if(this.health<=0) {
  		this.broken = true;
  		this.renderable.setCurrentAnimation("broken");	
  	}
  	this.body.update(delta);
 
  	this._super(me.Entity, "update", [delta]);
  	return true;

  },

  onCollision: function(){

  }


});

game.EnemyBaseEntity = me.Entity.extend ({
	init : function(x, y, settings){
		this._super(me.Entity, 'init', [x, y, {
			image: "tower",
			width: 100,
			height: 100,
			spritewidth: "100",
			spriteheight: "100",
			getShape: function (){
				return (new me.Rect(0, 0, 100, 80)).toPolygon();
			}

	}]);

    this.broken = false;
    this.health = 10;
    this.alwaysUpdate = true;
    this.body.onCollision = this.onCollision.bind(this);
    this.renderable.addAnimation("idle", [0]);
    this.renderable.addAnimation("broken", [1]);
    this.renderable.setCurrentAnimation("idle");
    this.type = "EnemyBaseEntity";

},

  update:function(delta){
  	if(this.health<=0) {
  		this.broken = true;	
  		this.renderable.setCurrentAnimation("broken");
  	}
  	this.body.update(delta);
 
  	this._super(me.Entity, "update", [delta]);
  	return true;

  },

  onCollision: function(){
  	
  },

  loseHealth: function(){
  	this.health--;
  }

});

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