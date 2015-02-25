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
		this.health = game.data.enemyCreepHealth;
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
       me.game.world.removeChild(this);
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
  

   if(!this.body.jumping  && !this.body.jumping){
          this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
                        this.body.jumping = true;
        }



      this.lastAttacking=this.now;
      this.body.vel.x = 0;
      this.pos.x = this.pos.x + 1;
        
      if((this.now-this.lastHit >= 1000)){
          this.lastHit = this.now;
          response.b.loseHealth(game.data.enemyCreepAttack);
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
          response.b.loseHealth(game.data.enemyCreepAttack);
        }

    }
  }

});
