    game.GameTimerManager = Object.extend({
      init: function(x, y, settings){
        this.alwaysUpdate = true;
        this.now = new Date().getTime();
        this.lastCreep = new Date().getTime();
        this.paused = false;
        this.alwaysUpdate = true;
      },

      game.ExperienceManager = Object.extend({
          init: function(x, y, settings){
            this.alwaysUpdate = true;
            this.gameover = false;
          },

        update: function () {
          if(game.data.win === true && !this.gameover){
            this.gameOver(true);
            alert("YOU WIN!!!");
          }else if(game.data.win === false && !this.gameover) {
           this.gameOver(false);
           alert("HAHA YOU LOSE!!!");
          }

          console.log(game.data.exp);

          return true;

      },

      gameOver: function (win){ 
        if(win) {
          game.data.exp += 10; 
        }else{
          game.data.exp += 1;
        }
         console.log(game.data.exp);
         this.gameover = true;
         me.save.exp = game.data.exp;
         // for testing only
         me.save.exp2 = 4;

      $.ajax({
        type: "POST", 
        url: "php/controller/save-user.php",
        data: {
          exp: game.data.exp,
          exp1: game.data.exp1,
          exp2: game.data.exp2,
          exp3: game.data.exp3,
          exp4: game.data.exp4,
        },

        dataType: "text"
      })

      .success(function(response){
        if(response==="true"){
          me.state.change(me.state.MENU);
        }else{
          alert(response);
        }
      })
        .fail(function(response){
          alert("Fail");
      });
  }
    });




// The game manager removes the player if he's  dead and sets him back

// we have refactored the game manager as much as possible

// There are some other things that we can also refactor

// this.gameOver is a quick fix for all the madness that is going on 

//this.game over is the global variable we are using to call the game over screen

//We only get into each of those if statements if game over is false


// if it is true we can not add any more points


// we need to apply this.gameOver to something that will call the game over clean

//we reduced lines of code that were repetitive 

// A bollean means either true or false and it is a variable type

// we are automatically calling the game over function with 2 intenitions

//what we basically did was we set the values up for when a user purchases a power up and we set up the cost of the experience

// the user can now use the experience he/she has and buy powerups so far we only have 1 power up that is available to be purchased

//Basically what we did in video 46 was we set up the spendGold function

// we also added a picture of it in the title screen

// we linked everything together that had to do with the spendGold funciton


//When the user presses the buy button we want to pause the game

//we are setting up the function to where the buy key is pressed

// resume is what we use as the pause function in stopBuying

//the opacity is adjustable to the user can still get a glimpse of what is going on in the game at the current time

// The reson why we unbind the key is so people can not randomly make purchases

// this.updateWhenPaused will only work if it is after this.font

// we had to add a z value for our "B" button to wrk

// we had to add the z value for the text to show up

// we are adding new upgrades to be able o be purchased for upgrading your player

// We are setting up the names and buttons of these upgrades

// we also added the cost and the current level for each of these upgrades or powerups

// now we are going to set up our buttons to specific functions

// checkBuyKeys only checks the key presses

// we pass a prameter on checkCost so it is universal and it works on all skills 


// if we do not have enough we will return false

// your skill will have one added to it and multiply by 10
