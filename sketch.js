var path,boy, leftBoundary,rightBoundary;
var pathImg,boyImg;
var i;
var score=0;

function preload(){
  pathImg = loadImage("path.png");
  boyImg = loadAnimation("Jake1.png","Jake2.png","jake3.png","jake4.PNG","jake5.png");
  bombImg = loadImage("bomb.png");
  coinImg = loadImage("coin.png");
  energyDrinkImg = loadImage("energyDrink.png");
  powerImg = loadImage("power.png");
  trainImg = loadImage("train.png");
}

function setup(){
  
  createCanvas(displayWidth,displayHeight);
  
// Moving background
path=createSprite(400,200);
path.addImage(pathImg);
path.velocityY = 4;
path.scale=2;

//creating boy running
boy = createSprite(180,340,30,30);
boy.addAnimation("JakeRunning",boyImg);
  
leftBoundary=createSprite(0,0,100,800);
leftBoundary.visible = false;
rightBoundary=createSprite(680,200,100,800);
rightBoundary.visible = false;
objectsGroup= new Group();
powerGroup= new Group();
}

function draw() {
  background(0);
  
  path.velocityY = 4;
  
  // boy moving on Xaxis with mouse
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);

  if(boy.isTouching(objectsGroup)){
    boy.destroy();
    text("GAME OVER",200,200);
  }
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
if(keyDown("UP_ARROW")){
  boy.y=boy.y-5
}

if(keyDown("DOWN_ARROW")){
  boy.y=boy.y+5
}
if(boy.isTouching(powerGroup)){
  score=score+2
}


boy.collide(leftBoundary); 
boy.collide(rightBoundary)
spawnObjects();
spawnpower();
  drawSprites();
  fill("white")
  textSize(20)
  text("Score: "+ score, 800,50);

  
}

function spawnObjects() {
  if(frameCount % 260 === 0) {
    var object = createSprite(Math.round(random(20,660)),20,10,40);
    //obstacle.debug = true;
    object.velocityY=2
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: object.addImage(trainImg);
              break;
      case 2: object.addImage(bombImg);
              break;
    default:break;
    }
    
    //assign scale and lifetime to the obstacle           
   object.scale=0.3
    object.lifetime = 300;
    //add each obstacle to the group
    objectsGroup.add(object);
  }
}

function spawnpower() {
  if(frameCount % 450 === 0) {
    var power = createSprite(Math.round(random(20,660)),20,10,40);
    
    power.velocityY=2
    
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: power.addImage(coinImg);
              break;
      case 2: power.addImage(energyDrinkImg);
              break;
      case 3: power.addImage(powerImg);
              break;         

    default:break;
    }
    
    //assign scale and lifetime to the obstacle           
    power.scale=0.3
    power.lifetime = 300;
    //add each obstacle to the group
    powerGroup.add(power);
  }
}
