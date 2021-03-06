game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); // TODO

		me.game.world.addChild(new (me.Renderable.extend({
			init: function(){
				this._super(me.Renderable, 'init', [270, 240, 300, 50]);
				this.font = new me.Font("Tahoma", 46, "red");
				me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);

			},

			draw:  function(renderer){
				this.font.draw(renderer.getContext(), "START A NEW GAME", this.pos.x, this.pos.y);
			},
			update: function(dt){
				return true;
			},

			newGame: function(){
				me.input.releasePointerEvent('pointerdown', this);
		        me.save.remove('exp');
		        me.save.remove('exp1');
		        me.save.remove('exp2');
		        me.save.remove('exp3');
		        me.save.remove('exp4');
		        me.save.add({exp: 0, exp1: 0, exp2: 0, exp3: 0, exp4: 0});
		        me.state.change(me.state.NEW);

			}

		 })));

		me.game.world.addChild(new (me.Renderable.extend({
			init: function(){
				this._super(me.Renderable, 'init', [400, 340, 250, 50]);
				this.font = new me.Font("Tahoma", 46, "red");
				me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
 
			},

			draw:  function(renderer){
				this.font.draw(renderer.getContext(), "CONTINUE", this.pos.x, this.pos.y);
			},
			update: function(dt){
				return true;
			},
               
			newGame: function(){
				game.data.exp = me.save.exp;
				game.data.exp1 = me.save.exp1;
				game.data.exp2 = me.save.exp2;
				game.data.exp3 = me.save.exp3;
				game.data.exp4 = me.save.exp4;
				me.input.releasePointerEvent ('pointerdown', this);
		        me.state.change(me.state.LOAD);

			}

		 })));
	
	},

	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		
	}
});
// titlejs is where we will have all the code for the start screen
//we want our screen to start at the top left corner
//the -10 sets the screen way in the back
//Pointer down is just waiting for the mouse to be clicked down

//True tells you to use the screen coordinates

//we use save.remove becuase we do not want any more save variables 

// video 40

// In continue we dont want to remove any experience we just want to change it state

