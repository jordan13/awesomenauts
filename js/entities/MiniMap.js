game.MiniMap = me.Entity.extend({
	init: function(x, y, settings){
		this._super(me.Entity, "init", [x, y,{
			image: "minimap",
			width: 1053, 
			height: 98,
			spritewidth: "1053",
			spriteheight: "98",
			getShape: function(){
				return (new me.Rect(0, 0, 1053, 98)).toPolygon();
			}
		}]);

		this.floating = true;
	}
});

// we use x and y to build up our super

// this.floating = true allows the map to follow the screens coordinates