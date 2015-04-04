game.resources = [

	/* Graphics. 
	 * @example
	 */
	 {name: "background-tiles", type:"image", src: "data/img/background-tiles.png"},
	 {name: "wall", type:"image", src: "data/img/wall.jpg"},
     {name: "meta-tiles", type:"image", src: "data/img/meta-tiles.png"},
     {name: "player", type:"image", src: "data/img/orcSpear.png"},
     {name: "tower", type:"image", src: "data/img/tower_round.svg.png"},
     {name: "creep1", type:"image", src: "data/img/brainmonster.png"},
     {name: "title-screen", type:"image", src: "data/img/title.png"},
     {name: "exp-screen", type:"image", src: "data/img/loadpic.png"},
     {name: "gold-screen", type:"image", src: "data/img/spend.png"},
     {name: "load-screen", type:"image", src: "data/img/loadpic.png"},
     {name: "new-screen", type:"image", src: "data/img/newpic.png"},
     {name: "spear", type:"image", src: "data/img/spear.png"},
      // this line above, is where we are loading the image or "player" that we are using

	/* Atlases 
	 * @example
	 * {name: "example_tps", type: "tps", src: "data/img/example_tps.json"},
	 */
		
	/* Maps. 
	 * @example
	 * {name: "example01", type: "tmx", src: "data/map/example01.json"},
 	 */
 	  {name: "level01", type: "tmx", src: "data/map/test.tmx"},
     // we use this one because it is under the tmx and that is what we used

	/* Background music. 

	 * @example
	 * {name: "example_bgm", type: "audio", src: "data/bgm/"},
	 */	
	 


	/* Sound effects. 
	 * @example
	 * {name: "example_sfx", type: "audio", src: "data/sfx/"}
	 */
];
