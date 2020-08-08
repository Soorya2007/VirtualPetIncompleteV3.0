//Create variables here
var dog ,happyD,happyDog,foodS,foodStock,database;
var sadDog,dog_Vaccination,FoodStock_,Inject,Lazyish,Living_Room,Running_R,Running_L,Vaccination;
var feedPet,addFood,fedTime,lastFed;
var foodObj;
var readState;
var bedimg,washimg,gardenimg;
var currentTime;
function preload()
{
  //load images here
  sadDog = loadImage("images/deadDog.png");
  dog_Vaccination = loadImage("images/dogVaccination.png");
  FoodStock_=loadImage("images/Food Stock.png");
  Inject = loadImage("images/Injection.png");
  Lazyish = loadImage("images/Lazy.png");
  Living_Room = loadImage("images/Living Room.png");
  Running_R = loadImage("images/running.png");
  Running_L = loadImage("images/runningLeft.png");
  Vaccination = loadImage("images/Vaccination.png");
  happyDog = loadImage("images/Dog.png");
  happyD = loadImage("images/Happy.png");
  bedimg = loadImage("images/Bed Room.png");
  washimg = loadImage("images/Wash Room.png");
  gardenimg = loadImage("images/Garden.png");
}

function setup() {
	createCanvas(500, 500);
  dog = createSprite(250,250,20,20);
  dog.addImage("dog",happyDog);

  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);  

  foodObj = new Food();

  feedPet = createButton("Feed The Dog");
  feedPet.position(700,95);
  feedPet.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  readState = database.ref('gamestate');
  readState.on("value",function(data){
       gameState = data.val();
  })
}


function draw() {  
  background(rgb(46, 139, 87));
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage("dogg",happyD);
  }
   currentTime = hour();
   if(currentTime ==(lastFed+1)){
      update("Playing");
      foodObj.garden();
   }else if(currentTime ==(lastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
 }else if (currentTime>(lastFed+2&&currentTime<=(lastFed+4))){
  update("Hungry");
  foodObj.display();
  }
  if(gameState!=="Hungry"){
    feed.hide();
    addFood.hide();
    dog.hide();
  }else{
    feed.show();
    addFood.show();
    dog.addImage(sadDog)
  }
  fedTime=database.ref('Feed Time');
  fedTime.on("value",function(data){
  lastFed = data.val();
  });
  textSize(25);
  fill(color(0,0,0));
  stroke(255,204,0);
  text(foodStock,250,20);
  text("NOTE : YOU CAN FEED YOUR DOG MILK BY PRESSING THE UP ARROW KEY",250,480);
  drawSprites();
  //add styles here

}
//function to read values from DB
function readStock(data){
    foodStock-data.val();
}
function writeStock(x){
  if(x<=0){
    x = 0;
  }else{
    x = x-1;
  }
  database.ref('/').update({
    foodS:x 
  })
}

function feedDog(){
  dog.addImage("dug",happyDog);

  foodObj.updateStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.red('/').update({
    Food:foodS
  })
}

function update(state){
   database.ref('/').update({
     gameState:state
   })
}