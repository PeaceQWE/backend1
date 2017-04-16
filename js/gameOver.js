
var gameOverState = {
  create : function() {
    map = Nakama.game.add.sprite(0,0,'background');
    Nakama.keyboard = Nakama.game.input.keyboard;
    playKey = Nakama.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    var playButtonNewGame = this.game.add.button(1200,900,"replayButton",this.playTheGameAtNew,this);
    	  playButtonNewGame.anchor.setTo(0.5,0.5);
        playButtonNewGame.scale = new Phaser.Point(0.3,0.3)
    var leaderBoardButton = this.game.add.button(800,900,"boardButton",this.saveScore,this);
        leaderBoardButton.anchor.setTo(0.5,0.5);
        leaderBoardButton.scale = new Phaser.Point(0.3,0.3);
    var winLabel = this.game.add.sprite(1023,400,"gameOver");
        winLabel.anchor.setTo(0.5,0.5);
        winLabel.scale = new Phaser.Point(2.2,2.2);
    var textNewGame= this.game.add.text(1080, 1000, "NEW GAME", {font: '45px Arial', fill: "#00000"});
    var textLeaderBoard2= this.game.add.text(650, 1000, "SAVE SCORE", {font: '45px Arial', fill: "#00000"});
    var textTroll= this.game.add.text(530, 700, "PRESS SPACEBAR TO CHECKPOINT", {font: '60px Arial', fill: "#00000"});
    this.game.add.image(0,1200, "Foundation", "Foundation2.png");
    this.game.add.image(970,1200, "Foundation", "Foundation2.png");
    this.game.add.image(1800,1200, "Foundation", "Foundation2.png");
    this.scoreDisplay = this.game.add.text(1700,100, "Score : " +(totalscore+score), {font: '50px Arial', fill: "#000000"});
    setTimeout(function() {
      loaded = true;
    }, 500);

  },
  update: function() {
    if(playKey.isDown) {
      this.playTheGameAtCheckPoint()
      console.log("Ádasd");
    }
  },
  playTheGameAtNew: function(){
    if (loaded) {
      music.destroy();
      again = false;
      score = 0;
      totalscore = 0;
      Nakama.game.state.start("play",true,false,again);
      loaded = false;
    }
	},
  playTheGameAtCheckPoint: function() {
    if (loaded) {
      music.destroy();
      again = true;
      score = 0
      Nakama.game.state.start("play",true,false,{again, score});
      loaded = false;
    }
  },
  leaderBoard : function() {
    this.game.state.start("leaderBoard");
  },
  saveScore : function() {
    totalscore += score;
    score = 0;
    var playerName = prompt("Please enter your name", "");
    keysSorted = Object.keys(leaderPlayer).sort(function(a,b){return leaderPlayer[b]-leaderPlayer[a]});
    if( playerName == null){
      playerName = "unknown";
      leaderPlayer[ playerName ] = totalscore;
      totalscore = 0;
    }
    else {
      leaderPlayer[ playerName ] = totalscore;
      totalscore = 0;

    }
    this.game.state.start("leaderBoard",true,false, keysSorted);
  }
}
