//import Phaser from "phaser";
import BaseScene from "./BaseScene";
const PIPES_TO_RENDER = 4;

class PlayScene extends BaseScene {
    constructor(config) {
        super('PlayScene', config);
        //this.config = config;

        this.bird = null;
        this.pipes = null;

        this.pipeHorizontalDistance = 0;
this.pipeVerticalDistanceRange = [150, 250];
this.pipeHorizontalDistanceRange = [400,450];
this.flapVelocity = -300;

this.score = 0;
this.scoreText = '';
//this.VELOCITY = 400;
    }

    
    

create() {
      // this.createBG();
      super.create();
       this.createBird();

       this.createPipes();
     this.handleInputs();
     this.createColliders();
     this.createScore();
     this.createPause();
    
}

update() {
        this.checkGameStatus();
this.recyclePipes();
}

createBG() {

    this.add.image(0, 0, 'sky').setOrigin(0);
}

createBird() {
    this.bird = this.physics.add.sprite(this.config.startPosition.x, this.config.startPosition.y, 'bird').setOrigin(0);
    this.bird.body.gravity.y = 600;
    this.bird.setCollideWorldBounds(true);
}

createPipes() {
    this.pipes = this.physics.add.group();

    for (let i = 0; i < PIPES_TO_RENDER; i++)
    {
     
    const upperPipe = this.pipes.create(0,0, 'pipe')
    .setImmovable(true)
    .setOrigin(0,1);
  const lowerPipe = this.pipes.create(0,0, 'pipe')
  .setImmovable(true)
  .setOrigin(0,0);
  //bird.body.velocity.y = VELOCITY;
  this.placePipe(upperPipe, lowerPipe);
  
    }
  
    this.pipes.setVelocityX(-200);
    
}

createColliders() {
    this.physics.add.collider(this.bird, this.pipes, this.gameOver, null, this);
}
 
createScore() {
  this.score = 0;
  const bestScore = localStorage.getItem('bestScore');
  this.scoreText = this.add.text(16,16,`Score ${0}`, {fontSize: '32px', fill: '#000'});
  this.add.text(16,52, ` Best Score: ${bestScore || 0}`, {fontsize: '18px', fill: '#000'});
}

createPause() { 

const pauseButton = this.add.image(this.config.width - 10, this.config.height - 10, 'pause').setOrigin(1).setScale(2);
pauseButton.setInteractive();

pauseButton.on('pointerdown', ()=> {
  this.physics.pause();
  this.scene.pause();
  this.scene.launch('PauseScene');
})

}
handleInputs() {
    this.input.on('pointerdown', this.flap, this)
    this.input.keyboard.on('keydown-J', this.flap, this)
    this.input.keyboard.on('keydown-SPACE', this.flap, this)
}

checkGameStatus() {
    if (this.bird.getBounds().bottom >= this.config.height || this.bird.y <= 0)
{
  
  //this.bird.body.velocity.y = 0;
  this.gameOver();
  
}
}


placePipe(uPipe, lPipe)
{
  
  const rightMostX= this.getRightMostPipe();
  const pipeVerticalDistance = Phaser.Math.Between(...this.pipeVerticalDistanceRange);
const pipeVerticalPosition = Phaser.Math.Between(0 + 20, this.config.height - 20 - pipeVerticalDistance);
 const pipeHorizontalDistance = Phaser.Math.Between(...this.pipeHorizontalDistanceRange);

uPipe.x = rightMostX + pipeHorizontalDistance;
uPipe.y=pipeVerticalDistance;
  
lPipe.x = uPipe.x;
lPipe.y = uPipe.y + pipeVerticalDistance;



}

recyclePipes()
{
  const tempPipes = [];
this.pipes.getChildren().forEach(pipe =>
  {
    if(pipe.getBounds().right <= 0)
    {
      tempPipes.push(pipe);
      if(tempPipes.length === 2)
      {
        this.placePipe(...tempPipes);
        this.increaseScore();
        this.saveBestScore();
      }
      
      //recycle pipe
      //get here upper and lower out of bounds pipe
    }
    

  })
}

 getRightMostPipe()
{
let rightMostX = 0;

this.pipes.getChildren().forEach(function(pipe)
{
rightMostX = Math.max(pipe.x, rightMostX);
})

return rightMostX;
}

saveBestScore() {
  const bestScoreText = localStorage.getItem('bestScore');
  const bestScore = bestScoreText && parseInt(bestScoreText, 10);
  if (!bestScore || this.score > bestScore) {
    localStorage.setItem('bestScore', this.score);
  } 
}

 gameOver()
{
// this.bird.x = this.config.startPosition.x;
// this.bird.y = this.config.startPosition.y;
// this.bird.body.velocity.y = 0;
this.physics.pause();
this.bird.setTint(0xEE4824);
this.saveBestScore();
this.time.addEvent({
    delay: 1000,
    callback: () => {
this.scene.restart();
    },
    loop: false
})
}

 flap()
{
this.bird.body.velocity.y = this.flapVelocity;
}
increaseScore() {
  this.score++;
  this.scoreText.setText(`score: ${this.score}`);
}
}

export default PlayScene;