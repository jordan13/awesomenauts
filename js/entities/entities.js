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

    	this.renderable.setCurrentAnimation("idle");


        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
 	},

 	   update: function(delta){

   		 if(me.input.isKeyPressed ("right")){
   		 	this.renderable.flipX(true);
 	     // sets position of my x by adding the velocity defined above in setvelocity() and multiplying it by me.timer.tick
 	      this.body.vel.x += this.body.accel.x * me.timer.tick;
 	      this.renderable.setCurrentAnimation("walk");

 	   }
		else if(me.input.isKeyPressed ("left")){
			this.renderable.flipX(false);
 	     // sets position of my x by adding the velocity defined above in setvelocity() and multiplying it by me.timer.tick
 	      this.body.vel.x -= this.body.accel.x * me.timer.tick;
 	      this.flipX(true);
 	   
 	   	} 

 	   	 else{
          this.body.vel.x = 0;

       if(this.body.vel.x !== 0){
   	  	if(!this.renderable.isCurrentAnimation("walk")){
   		this.renderable.setCurrentAnimation("walk");
   	}

   	} 



   	 else{
      this.renderable.setCurrentAnimation("idle");    
   	}
 	   }
       	 if(me.input.isKeyPressed("jump")) {
          
          if(!this.body.jumping && !this.body.falling) {
              this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
              this.body.jumping = true;
           }
       }
 	   
 	   this.body.update(delta);
 	   this._super(me.Entity, "update", [delta]);
 	   return true;

   	}
   	


 });
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


