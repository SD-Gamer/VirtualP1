var dogImg,dog,happyDog,database,foodS,foodStock;
var foodLeft = 20;

function preload(){
dogImg = loadImage("dogImg.png");
happyDog = loadImage("happydog.png");
}

function setup() {
	createCanvas(500, 500);
  dog = createSprite(250,300,100,100);
  dog.scale = 0.5;
  dog.addImage(dogImg);

  database = firebase.database();
  var foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
}

function draw() {  
   background(46,139,87);
   if(foodS !== undefined){
      textSize(20);
      fill(255);
      text("Note: Press Up Arrow to Feed Drago Milk",50,50);
      text("Food Remaining: " + foodLeft,50,100);
   }
   if(keyWentDown(UP_ARROW)){
      writeStock(foodS);
      dog.addImage(happyDog);
   }
   if(keyWentUp(UP_ARROW) && foodLeft !== 0){
      foodLeft = foodLeft - 1;
 }
   if(keyDown(DOWN_ARROW)){
      dog.addImage(dogImg)
   }
  
   drawSprites();
}
function readStock(data){
  foodS = data.val();
}
function writeStock(x){
  if(x <= 0){
     x = 0;
  }
  else{
    x = x - 1
  }
  database.ref('/').update({
    Food:x
  })
}