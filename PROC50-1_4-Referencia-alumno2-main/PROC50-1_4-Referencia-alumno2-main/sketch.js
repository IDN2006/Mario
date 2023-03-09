var ground,groundImg;
var backgroundS, backgroundImg;
var mario, mario_running, mario_collided;
var score = 0;
var gameState = "play";
var obstaclesGroup; 
var gameover, gameoverImg;
var mario_collided; 
var restart,restartImg;



function preload(){
  
  mario_running =loadImage ("assets/marioWalk.gif")
 groundImg = loadImage ("assets/ground.jpg")
  backgroundImg = loadImage("assets/background.jpg")
  obstacle1 = loadImage("assets/bad.png")
  obstacle2 = loadImage ("assets/tubo.png")
  gameoverImg = loadImage ("assets/gameover.png")
  mario_collided = loadImage ("assets/marioCollide.webp")
  restartImg = loadImage ("assets/restart.png")


}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  mario = createSprite(50,height-20,20,50);
 mario.addAnimation("collided",mario_collided);
 mario.scale = 0.5;
 ground = createSprite(200,height-20,400,20);
 ground.addImage(groundImg);
 ground = createSprite(200,height-10,400,10);
 obstaclesGroup = new Group ();  
 gameover=createSprite(width/2, height/2);
 gameover.addImage(gameoverImg);
 gameover.scale = 0.5; 
 gameover.visible = false;
 restart=createSprite(width/2, height/2+40);
 restart.addImage(restartImg);
 restart.scale = 0.5;
 restart.visible = false;
 mario.debug = false;
 mario.setCollider("circle",0,0,40);
}
 
  



function draw() {
  background(0); 

  if (gameState == "play"){
    ground.velocityX= -4;
    spawnObstacles();
    if (Math.round(score)>0 && Math.round(score)%100==0){
      checkpointsound.play();
    } 
    if ((keyDown("space") || touches.lenght>0)&& mario.y>= height-60){
      mario.velocityY=-10;
      touches= [];
    }
    mario.velocityY= mario.velocityY+0.5;
    if (ground.x<0){
      ground.x=ground.width/2;
    }
    if (mario.isTouching(obstaclesGroup)){
gameState = "end"; 
diesound.play();
    }
    score = score + 0.1;
  }

  if (gameState == "end"){
    ground.velocityX= 0;
    obstaclesGroup.setVelocityXEach(0);
    mario.velocityY = 0;
    gameover.visible = true; 
    restart.visible = true;
    obstaclesGroup.setLifetimeEach(-1);
    mario.changeAnimation("collided",trex_collided);
  }
  text("Puntuacion : "+ Math.round(score), width-100, 50);


drawSprites();
mario.collide(ground);
if (mousePressedOver(restart) || touches.lenght>0){
  console.log("Reinicio");
  reset();
  touches=[];
}

}

function spawnObstacles(){
  if (frameCount% 60===0){
  var obstacle = createSprite (width,height-35,20,40);
  obstacle.velocityX = -6;
  var dado = Math.round(random(1,2));
  switch(dado){
    case 1 : obstacle.addImage(obstacle1);
    break;
    case 2 : obstacle.addImage(obstacle2);
    break;
  default:
  break;
  }
  obstacle.scale = 0.5;
  obstacle.lifetime = 200;
  obstaclesGroup.add(obstacle);
  }
  }