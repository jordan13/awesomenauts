game.NewProfile = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('new-screen')), -10); // TODO
		document.getElementById("input").style.visibility = "visible";
		document.getElementById("register").style.visibility = "visible";


		me.input.unbindKey(me.input.KEY.B);
		me.input.unbindKey(me.input.KEY.Z);
		me.input.unbindKey(me.input.KEY.X);
		me.input.unbindKey(me.input.KEY.C);

		me.game.world.addChild(new (me.Renderable.extend({
			init: function(){
				this._super(me.Renderable, 'init', [10, 10, 300, 50]);
				this.font = new me.Font("Tahoma", 30, "black");
				// me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);

			},

			draw:  function(renderer){
				this.font.draw(renderer.getContext(), "CREATE A USERNAME AND PASSWORD", this.pos.x, this.pos.y);


			}
		

		 })));
	
	},



	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		document.getElementById("input").style.visibility = "hidden";
		document.getElementById("register").style.visibility = "hidden";
	}
});

// so far we have set up 2 new screens

// in newProfile.js you have to unbind all of the keys

// we no longer need any me.save.exp's

// we refactored our code from the gamemanager

// we split everything and set it up to have their own function

// the newProfile screen now pops up when you click start a new game

// the loadProfile screen now pops up when you click "CONTINUE"

//right now we are creating more buttons

// we made username and password bars

// we also created 3 buttons ( register, load, and main menu 

// we set the buttons to visibility on only for new profile and load profile
