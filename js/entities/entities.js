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
      this.health = 20;
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

      loseHealth: function(damage){
        this.health = this.health - damage;
        console.log(this.health);
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
 	    }else if(response.b.type==='EnemyCreep') {
          var xdif = this.pos.x - response.b.pos.x;
          var ydif = this.pos.y - response.b.pos.y;

          if (xdif>0) {
              this.pos.x = this.pos.x + 1;
              if(this.facing==="left"){
                this.body.vel.x = 0;
              }
          }else{
            this.pos.x = this.pos.x - 1;
             if(this.facing==="right"){
                this.body.vel.x = 0;
              }
          } 
          if(this.renderable.isCurrentAnimation('attack') && this.now-this.lastHit >= 1000
              && (Math.abs(ydif) <=40) && 
              (((xdif>0) && this.facing==="left") || ((xdif<0) && this.facing==="right")))
          {
            this.lastHit = this.now;
            response.b.loseHealth(1);
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
    this.type = "PlayerBase";


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

  loseHealth: function(damage){
    this.health = this.health - damage;
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

    // if(me.input.isKeyPressed("auto") && !this.body.jumping  && !this.body.falling){
            // this.body.jumping = true;
            // this.body.vel.y -= this.body.accel.y * me.timer.tick;

        // }
 
  	this._super(me.Entity, "update", [delta]);
  	return true;

  },

  onCollision: function(){
  	
  },

  loseHealth: function(){
  	this.health--;
  }

});

game.EnemyCreep = me.Entity.extend({
	init: function(x,y, settings){
		this._super(me.Entity, 'init', [x, y, {
          image: "creep1",
          width: 32,
          height: 64,
          spritewidth: "32",
          spriteheight: "64",
          getShape: function(){
          	return (new me.Rect(0, 0, 32, 64)).toPolygon();
          }
	  }]);
		this.health = 10;
		this.alwaysUpdate = true;
    this.now = new Date().getTime(); 
    this.attacking = false;
    this.lastAttacking = new Date().getTime();
    this.lastHit = new Date().getTime();
		this.body.setVelocity(3, 20);

		this.type = "EnemyCreep";

		this.renderable.addAnimation("walk", [3, 4, 5], 80);
		this.renderable.setCurrentAnimation("walk");
	},

   // test 
  // public class Enemy : MonoBehaviour {

 //public float speed = 4f;
 //public float jetPackSpeed = 0.3f;
 //public float jumpSpeed = 8f;
 //public float gravity = 10;
 
 //private Transform _Player; 
 //private CharacterController character;
 //private Transform tr;
 //private float vSpeed = 0f;
 //private bool jump = false;
 
 //void Start ()
 //{
     //_Player = GameObject.FindGameObjectWithTag("Player").transform;
     //character = GetComponent&lt;CharacterController&gt;();
     //tr = transform;
// }
 
 //void Update ()
 // {    // find the vector enemy -> player
    // Vector3 chaseDir = _Player.position - tr.position;
     // chaseDir.y = 0; // let only the horizontal direction
     // float distance = chaseDir.magnitude;  // get the distance
    // if (distance <= 2)
        // Debug.Log("Attacking Player");
     // else
    // {    // find the player direction
        // Quaternion rot = Quaternion.LookRotation(chaseDir);
         // rotate to his direction
        // tr.rotation = Quaternion.Slerp(tr.rotation, rot, Time.deltaTime * 4);
        // if (character.isGrounded){ // if is grounded...
            // vSpeed = 0;  // vertical speed  is zero
             // if (jump){    // if should jump...
               //  vSpeed = jumpSpeed; // aplly jump speed
                //  jump = false; // only jump once!
           //  }
        // } 
         // else // but if lost ground, check if it's an abyss
         // if (!Physics.Raycast(tr.position, -tr.up, 20f)){ // if no ground below
            // vSpeed = jetPackSpeed;  // use jetpack
        // }
         // vSpeed -= gravity * Time.deltaTime; // apply gravity
         // calculate horizontal velocity vector
        // chaseDir = chaseDir.normalized * speed;
         // chaseDir.y += vSpeed; // include vertical speed
         // and move the enemy
     //    //character.Move(chaseDir * Time.deltaTime);
    // }
// }
 
 // if collided with some wall or block, jump
// void OnControllerColliderHit(ControllerColliderHit hit){
     // only check lateral collisions
     //if (Mathf.Abs(hit.normal.y) < 0.5){
        // jump = true; // jump if collided laterally
    // }
 // },
 // end of test

  loseHealth: function(damage) {

    this.health = this.health - damage;

  },

	update: function(delta){
    if(this.health <= 0){
       console.log(this.health);
       if(this.health <= 0) {
          me.game.world.removeChild(this);
       }
    }
    this.now = new Date().getTime();
    this.body.vel.x -= this.body.accel.x * me.timer.tick;

    me.collision.check(this, true, this.collideHandler.bind(this), true);


    this.body.update(delta);
 
    this._super(me.Entity, "update", [delta]);

   // if (jump == true)
   //{
//
        //Playerypos -=  vel;
        //Playerxpos +=  vel;
    // }

   // public void jump() {
   // if(gameTime.getTimeMS() - jumpTime > jumpDelayInMilliseconds) {
      // jumpTime = gameTime.getTimeMS();
      // character.jump();
   // }
/// this is a test
  // if(Jump == true){

       //  if(JumpFall == false){
           // shiftY -= 1;
       //  }
        // if(shiftY == PUT_YOUR_JUMP_HEIGHT_HERE){
          //  JumpFall = true;
      //  }
       //  if(JumpFall == true){
            // shiftY += 1;
       //  }
      //  if(shiftY >=PUT_YOUR_STARTING_HEIGHT_HERE){
            // Jump = false;
            // JumpFall = false;
      //  }
   // }  
    ///// test is above
    
    return true;
	},

   loseHealth: function(damage){
    this.health = this.health - damage;
   },

  collideHandler: function(response) {
    if(response.b.type === 'PlayerBase') {
      this.attacking=true;
      this.lastAttacking=this.now;
      this.body.vel.x = 0;
      this.pos.x = this.pos.x + 1;
        if((this.now-this.lastHit >= 1000)){
          this.lastHit = this.now;
          response.b.loseHealth(1);
        }

    }else if (response.b.type=== 'PlayerEntity') {
        var xdif = this.pos.x = response.b.pos.x;

        this.attacking=true;
        this.lastAttacking=this.now;
        
        if(xdif>0){
          // keeps moving the creep to the right to maintain its position
          this.pos.x = this.pos.x + 1;
          this.body.vel.x = 0;
        }
        if((this.now-this.lastHit >= 1000) && xdif>0){
          this.lastHit = this.now;
          response.b.loseHealth(1);
        }

    }
  }

});

game.GameManager = Object.extend ({
	init: function(x, y, settings){
		this.now = new Date().getTime();
		this.lastCreep = new Date(). getTime();

		this.alwaysUpdate = true;
			
	},
    
    update: function(){ 
     	this.now = new Date().getTime();


     	if(Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >= 1000)){
     		this.lastCreep = this.now;
     		var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
     		me.game.world.addChild(creepe, 5);

     	}

     	return true;
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