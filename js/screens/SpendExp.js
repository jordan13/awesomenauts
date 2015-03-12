game.SpendExp = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10); // TODO

		me.game.world.addChild(new (me.Renderable.extend({
			init: function(){
				this._super(me.Renderable, 'init', [270, 240, 300, 50]);
				this.font = new me.Font("Tahoma", 46, "red");
				// me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);

			},

			draw:  function(renderer){
				this.font.draw(renderer.getContext(), "PRESS F1-F4 TO BUY, F5 TO SKIP", this.pos.x, this.pos.y);
				this.font.draw(renderer.getContext(), "CURRENT EXP: " + game.data.exp.toString(), this.pos.x + 100, this.pos.y + 50);
                this.font.draw(renderer.getContext(), "F1: INCREASE GOLDPRODUCTION " + game.data.exp.toString(), this.pos.x + 200, this.pos.y + 100);
				this.font.draw(renderer.getContext(), "F2: ADD STARTING GOLD " + game.data.exp.toString(), this.pos.x + 200, this.pos.y + 150);
				this.font.draw(renderer.getContext(), "F3: INCREASE ATTACK DAMAGE" + game.data.exp.toString(), this.pos.x + 200, this.pos.y + 200);
				this.font.draw(renderer.getContext(), "F4: INCREASE STARTNG HEALTH" + game.data.exp.toString(), this.pos.x + 200, this.pos.y + 250);


			}
		

		 })));
	
	},



	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		
	}
});
// All that MENU represents is the number 1

// PLAY represents 3

// READY represents 2

// GAMEOVER represents 4

// For the sepnd screen we are going to have 4 variables that we are working with it

//we need to make sure to change our game. function