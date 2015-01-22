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

    	this.body.setVelocity(5, 0);

 
 	},

 	update: function(delta){

   		if(me.input.isKeyPressed ("right")){
 	     // sets position of my x by adding the velocity defined above in setvelocity() and multiplying it by me.timer.tick
 	      this.body.vel.x += this.body.accel.x * me.timer.tick;
 	   }else{
          this.body.vel.x = 0;


 	   }

 	   this.body.update(delta);
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
