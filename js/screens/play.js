game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		game.data.score = 0;


		me.levelDirector.loadLevel("level01")
		// this tells it what to look at as far as maps
		// in melon js we use a naming convention which means the first letter is lower case and the first letter of the next word is upper case.

        var player = me.pool.pull("player", 0, 420, {});
        me.game.world.addChild(player, 5);

        

        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.UP, "jump", true);
        me.input.bindKey(me.input.KEY.DOWN, "attack")
        //this is where we will be adding our player
        //we will do that by adding our instances of the player
        // the z variable is the distance of the player to the front of the screen
        // if you have a low number, you can possibly becovered by the layers we are using in tiled
		


		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	}
});
