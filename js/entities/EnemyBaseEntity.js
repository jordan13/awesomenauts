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
    this.health = game.data.enemyBaseHealth;
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
      game.data.win  = true;
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
