class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

 async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
     
      form = new Form()
      form.display();
    }
  }
  play(){
    form.hide();
    textSize(30);
    text("Game has started",120,100);
    Player.getplayerInfo();

    if(allplayers !== undefined){
      var displayposition = 130;
      for(var plr in allplayers){
        if(plr === "player"+player.index)
          fill("red");
        else
          fill("black");

        displayposition+= 20;
        textSize(15);
        text(allplayers[plr].name+": "+ allplayers[plr].distance,120,displayposition);

      }
    }
    if(keyDown(UP_ARROW)&& player.index !== null){
      player.distance+= 50;
      player.update();
    }
  }
}
