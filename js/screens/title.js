game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); // TODO

		me.input.bindKey(me.input.KEY.ENTER, "start");

		me.game.world.addChild(new (me.Renderable.extend({
			init: function(){
				this._super(me.Renderable, 'init', [510, 30, me.game.viewport.width, me.game.viewport.height]);
				this.font = new me.Font("Tahoma", 46, "red");

			},

			draw:  function(renderer){
				this.font.draw(renderer.getContext(), "Awesomenauts, The Most Intense Game Ever !", 100, 150);
				this.font.draw(renderer.getContext(), "Press ENTER to play... If You Dare", 250, 530);
			}

		 })));
	
			this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge){
				if(action=== "start"){
					me.state.change(me.state.PLAY);
				}
			});
	},



	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		me.input.unbindKey(me.input.KEY.ENTER); // TODO
		me.event.unsubscribe(this.handler);
	}
});
// titlejs is where we will have all the code for the start screen
//we want our screen to start at the top left corner
//the -10 sets the screen way in the back
