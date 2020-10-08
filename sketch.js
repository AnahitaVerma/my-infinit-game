var hunter,hunterImg;
var sun,sunImg;
var backgroundImg,backgrd
var ground, groundImage;
var monkey
var rock,rockImg,obstaclegroup;
var invisibleground
var banana,bananaImg,foodgroup;
var arrow,arrowImg,arrowgroup , monkey_stoped
var gamestate = PLAY;
var PLAY = 1;
var cloudsGroup, cloudImage,cloud;
var jumpSound, collidedSound;
var END = 0;
var gameover,gameoverImg;
var restart,restartImg;
var score = 0;

function preload(){
hunterImg = loadImage("hunter-1.png")
backgroundImg = loadImage("backgroundImg.png")
monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
gameoverImg = loadImage("gameOver.png");
restartImg = loadImage("restart.png")
 groundImage = loadImage("ground.png");
  cloudImage = loadImage("cloud.png");
  sunImg = loadImage("sun.png")
  
  monkey_stoped=loadAnimation("sprite_0.png");
rockImg = loadImage("obstacle.png")
bananaImg = loadImage("banana.png")
arrowImg = loadImage("arrow.png")
  jumpSound = loadSound("jump.wav")
  collidedSound = loadSound("collided.wav")
}

function setup(){
  createCanvas(windowWidth,windowHeight)
  
   sun = createSprite(width-50,100,10,10);
  sun.addImage(sunImg);
  sun.scale = 0.1
  
    ground = createSprite(width/2,height,width,2);
  ground.addImage("ground",groundImage);
  ground.x = width/2
  ground.velocityX = -(10 + 3*score/2);
  
  monkey = createSprite(windowWidth/2,windowHeight/2,20,20)
  monkey.addAnimation("running",monkey_running) 
  monkey.addAnimation("stoped",monkey_stoped)
  monkey.scale = 0.1;
  
  restart = createSprite(width/2,height/2)
  restart.addImage(restartImg)
  restart.scale = 0.1
  restart.visible= false

   gameover = createSprite(width/2,height/2- 50);
  gameover.addImage(gameoverImg);
  gameover.scale = 0.5
  gameover.visible = false
  
  hunter = createSprite(50,height-130,20,50);
  hunter.addImage(hunterImg)
  hunter.scale = 0.6;
  
 

  invisibleground = createSprite(windowWidth-400,windowHeight-70,windowWidth,10)
  invisibleground.visible = false
  
  arrowgroup = new Group();
  obstaclegroup = new Group();
  foodgroup = new Group();
  cloudsGroup = new Group();
}

function draw(){
  
  background(backgroundImg)
  
  
  textSize (20)
  fill("cyan")
  text("Banana's Collected: "+ score, windowWidth-220,50);

  
  
   monkey.collide(invisibleground)
  
   if((touches.length>0|| keyDown("space")&&monkey.y >= height-150 )){
   monkey.velocityY = -10
     jumpSound.play( )
     touches = [];
  }
  monkey.velocityY = monkey.velocityY+0.7;
  
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
  if(gamestate === PLAY){
    
  
    
 ground.velocityX = -(11 + 3*score/100);


  gameover.visible = false
    
  restart.visible = false  
     
    
if (background.x < 0){
      background.x = background.width/2;
   }
    
  background.depth = monkey.depth;
    monkey.depth +=1 
    
   hunter.depth +=1 
  
  invisibleground.depth +=1
  }
  
  if(monkey.isTouching(foodgroup)){
     score = score+1
    
  }
       
   if(monkey.isTouching(arrowgroup)){
     collidedSound.play()
    gamestate=END;
     } 
        
   if(monkey.isTouching(obstaclegroup)){
     collidedSound.play()
    gamestate=END;
     } 
  
  if(monkey.isTouching(foodgroup)){
     foodgroup.destroyEach();
  }
  
  
   
 
  
 
  if(gamestate === END){
    
    monkey.velocityY = 0;
    ground.velocityX= 0
   
    
    score = 0
   
     cloudsGroup.destroyEach();
    
     gameover.visible = true;
    restart.visible = true
    
    foodgroup.setVelocityEach(0);
    
    foodgroup.destroyEach();
    obstaclegroup.destroyEach();
    arrowgroup.destroyEach();
    
     monkey.changeAnimation("stoped",monkey_stoped);
  }

  if(touches.length>0||mousePressedOver(restart)) {
      gamestate = PLAY;
    score = 0
    monkey.changeAnimation("running",monkey_running)
  touches = [] ;
  }

spawnClouds() ;
  foods();
  arrows();
  obstacle();
  drawSprites();
}

function reset(){
monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
}

function foods(){

  
  if(frameCount %150 === 0){

      banana = createSprite(windowWidth-40,windowHeight-200,20,20)
      banana.velocityX = (10 + score/2);
      banana.addImage(bananaImg)
    banana .scale = 0.05
    banana.velocityX =  -11 
    banana.visible = true
    
    //banana.y = Math.round(random(220,250))
    
    
    banana.lifetime = 100
    
    foodgroup.add(banana)
    
    banana.lifetime = 550;
  }
}

function obstacle(){
  
  if(frameCount %150 === 0){

     rock = createSprite(windowWidth-40,windowHeight-100,20,20)
     rock.velocityX = -(4 + 3* score/2  )
     rock.addImage(rockImg)
     rock.scale = 0.1
     rock.velocityX = -11
    
    obstaclegroup.add(rock)
    
    rock.lifetime = 550
    
    rock.setCollider('circle',0,0,45);
  }
}




function arrows(){
  if(frameCount %280 === 0){

  arrow = createSprite(50,height-130,20,50)
  arrow.velocityX = -(20 + score/2);
  arrow.addImage(arrowImg)
  arrow.scale = 0.2
  arrow.velocityX = 11
    
   // arrow.y = Math.round(random(300,350))
    
    arrowgroup.add(arrow)
    
    arrow.debug = 
    arrow.setCollider('circle',0,0,45);
    
    arrow.lifetime = 100   
  

  }
  
  
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
     cloud = createSprite(width+20,height-300,40,10);
    cloud.y = Math.round(random(100,220));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 900;
    
   
    
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}