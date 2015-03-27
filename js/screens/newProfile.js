game.NewProfile = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('new-screen')), -10); // TODO

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

	}
});