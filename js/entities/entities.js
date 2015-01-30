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

    	this.renderable.addAnimation("idle", [78]);
    	this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
        this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
    	this.renderable.setCurrentAnimation("idle");


        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
 	},

 	    update: function(delta){

   		 	if(me.input.isKeyPressed ("right")){
 	         	// sets position of my x by adding the velocity defined above in setvelocity() and multiplying it by me.timer.tick
 	        	this.body.vel.x += this.body.accel.x * me.timer.tick;
 	        	this.flipX(true);
 	        }else{ 
              this.body.vel.x = 0;
 	      }

 	        if(me.input.isKeyPressed("attack")){
 	      	  if(!this.renderable.isCurrentAnimation("attack")){
 	      	    console.log(!this.renderable.isCurrentAnimation("attack")){
 	      		// sets the current animation to attack and once it is over, goes back to idle animation
 	      		this.renderable.setCurrentAnimation("attack", "idle");
 	      		// the line of code below makes it so that, this sequence, we begin from the first animation, not wherever we left off when we switched 
 	      		this.renderable.setAnimationFrame();
 	      }

 	    }

          else if(this.body.vel.x !== 0){
             if(!this.renderable.isCurrentAnimation("walk")){
          	 this.renderable.setCurrentAnimation("walk");
       
            }
         
          }else{
             this.renderable.setCurrentAnimation("idle");

          }
 	        
 	      if(me.input.isKeyPressed("attack")){
 	      	if(!this.renderable.isCurrentAnimation("attack")){
 	      	    console.log(!this.renderable.isCurrentAnimation("attack")){
 	      		// sets the current animation to attack and once it is over, goes back to idle animation
 	      		this.renderable.setCurrentAnimation("attack", "idle");
 	      		// the line of code below makes it so that, this sequence, we begin from the first animation, not wherever we left off when we switched 
 	      		this.renderable.setAnimationFrame();
 	      }

 	    }

 	       this.body.update(delta);
 	    
 	       this._super(me.Entity, "update", [delta]);
 	       return true;
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
  		this.renderable.setCurrentAnimation("Broken");
  	}
  	this.body.update(delta);
 
  	this._super(me.Entity, "update", [delta]);
  	return true;

  },

  onCollision: function(){
  	
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