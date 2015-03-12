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
    this.health = game.data.playerBaseHealth;
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
      game.data.win = false;
  		this.renderable.setCurrentAnimation("broken");	
  	}
  	this.body.update(delta);
 
  	this._super(me.Entity, "update", [delta]);
  	return true;

  },

  loseHealth: function(damage){
    console.log(this.health);
    this.health = this.health - damage;
  },

  onCollision: function(){

  }


});

