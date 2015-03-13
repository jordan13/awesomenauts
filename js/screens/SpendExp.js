game.SpendExp = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10); // TODO

		me.input.bindKey(me.input.KEY.F1, "F1");
		me.input.bindKey(me.input.KEY.F2, "F2");
		me.input.bindKey(me.input.KEY.F3, "F3");
		me.input.bindKey(me.input.KEY.F4, "F4");
		me.input.bindKey(me.input.KEY.F5, "F5");

		me.game.world.addChild(new (me.Renderable.extend({
			init: function(){
				this._super(me.Renderable, 'init', [10, 10, 300, 50]);
				this.font = new me.Font("Tahoma", 30, "red");
				// me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);

			},

			draw:  function(renderer){
				this.font.draw(renderer.getContext(), "PRESS F1-F4 TO BUY, F5 TO SKIP", this.pos.x, this.pos.y);
				this.font.draw(renderer.getContext(), "CURRENT EXP: " + game.data.exp.toString(), this.pos.x + 100, this.pos.y + 50);
                this.font.draw(renderer.getContext(), "F1: INCREASE GOLD PRODUCTION! CURRENT LEVEL: " + game.data.exp1.toString() + "COST: " + ((game.data.exp1 + 1) * 10), this.pos.x, this.pos.y + 100);
				this.font.draw(renderer.getContext(), "F2: ADD STARTING GOLD ", this.pos.x, this.pos.y + 150);
				this.font.draw(renderer.getContext(), "F3: INCREASE ATTACK DAMAGE" , this.pos.x, this.pos.y + 200);
				this.font.draw(renderer.getContext(), "F4: INCREASE STARTNG HEALTH" , this.pos.x, this.pos.y + 250);


			}
		

		 })));

	         this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
	         	if(action === "F1"){

	         	}else if(action === "F2"){

	         	}else if(action === "F3"){

	         	}else if(action === "F4"){

	         	}else if(action === "F5"){
	         		me.state.change(me.state.PLAY);

	         	}
	         });
	
	},



	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		me.input.unbindKey(me.input.KEY. F1, "F1");
		me.input.unbindKey(me.input.KEY. F2, "F2");
		me.input.unbindKey(me.input.KEY. F3, "F3");
		me.input.unbindKey(me.input.KEY. F4, "F4");
		me.input.unbindKey(me.input.KEY. F5, "F5");
		me.event.unsubscribe(this.handler);
		
	}
});
// All that MENU represents is the number 1

// PLAY represents 3

// READY represents 2

// GAMEOVER represents 4

// For the sepnd screen we are going to have 4 variables that we are working with it

//we need to make sure to change our game. function

// we need to set up an experience screen wher people can see how much exp they have 

// we will also have options for the users to buy power ups to use in the game