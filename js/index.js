//global variables

//creating width,height and xPetcent,yPercent variable of screen
const width = window.innerWidth;
const height = window.innerHeight;
const xPercent = window.innerWidth/100;
const yPercent = window.innerHeight/100;

//used as baseurl
let baseUrl = "./images/";
//gamesprite array
let gameSpriteArray = [];
//laserSprite array
let laserSpriteArray = [];
//explosion array
let explosionSpriteArray = [];
//used to console anything
let cL = (e) => {
  console.log(e);
};
let cE = (e) => {
  console.error(e);
};

// geeting a random number between min and max
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

//PIXI MAIN APPLICATION
const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  antialias: true,
  autoDensity: true,
  resizeTo: window,
});

// setting RESOLUTION to DPR
PIXI.settings.RESOLUTION = window.devicePixelRatio;
// Disable interpolation when scaling, will make texture be pixelated
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

//setting style to pixi application
app.renderer.backgroundColor = "0x000000";
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
document.body.appendChild(app.view);

// const loader = PIXI.Loader.shared;  //PixiJS exposes a premade instance for you to use.
//or
const loader = new PIXI.Loader(baseUrl); // you can also create your own if you want
loader
  .add("castle", "castle.png")
  .add("laser", "laser.png")
  .add("explosion", "explosion.png")
  .add("spaceShip", "spaceShip.png")
  .add("meteorite", "meteorite.png")
  .load((resources)=>{setup(resources)});

function setup(resources) {
  let container = new PIXI.Container();
  createSprite(resources.resources.castle.texture,0*xPercent,70*yPercent,100*xPercent,30*yPercent,true,gameSpriteArray,container);
  createSprite(resources.resources.spaceShip.texture,50*xPercent,50*yPercent,null,null,true,gameSpriteArray,container,0.5,0.5);
  //createSprite(resources.resources.explosion.texture,50*xPercent,50*yPercent,15*xPercent,20*yPercent,null,[0.5],false,gameSpriteArry,container);
  //createSprite(resources.resources.meteorite.texture,50*xPercent,50*yPercent,15*xPercent,20*yPercent,null,[0.5],false,gameSpriteArry,container);
  app.stage.addChild(container)
 
}

function createSprite(
  texture,
  xPosition,
  yPosition,
  width,
  height,
  show = false,
  array,
  container,
  xAnchor,
  yAnchor
) {
  let sprite = PIXI.Sprite.from(texture);
  sprite.position.x = xPosition;
  sprite.position.y = yPosition;
  width!=null?sprite.width = width:"";
  height!=null?sprite.height = height:"";
  xAnchor!=null?
    sprite.anchor.x = xAnchor:"";
  yAnchor!=null?
    sprite.anchor.y = yAnchor:"";
  sprite.visible = show;
  array.push(sprite);
  container.addChild(sprite);
}

// adding ending text
const style = new PIXI.TextStyle({
  dropShadow: true,
  dropShadowAngle: 0.5,
  dropShadowColor: "#cfcfcf",
  dropShadowDistance: 8,
  fill: ["red", "black"],
  fillGradientStops: [0.2, 1],
  fontFamily: "Arial Black",
  fontSize: 34,
  fontVariant: "small-caps",
  fontWeight: "bold",
  letterSpacing: 1,
  strokeThickness: 1,
});

const endText = new PIXI.Text("!!  Game Over  !!", style);
endText.anchor.set(0.5, 0.5);
endText.position.set(width / 2, height / 2);

// //creating laser texture
// //const laserTexture = PIXI.Texture.from( baseUrl +"laser.png");
// laserTexture.anchor.set(0.5, 1);
// laserTexture.scale.set(0.1, 0.05);
// laser = new PIXI.Sprite.from(laserTexture);
// app.stage.addChild(laser);

// //creating explosion texture
// //const explosionTexture = PIXI.Texture.from(baseUrl + "explosion.png");
// explosionTexture.anchor.set(0.5, 0.5);
// explosionTexture.scale.set(0.3, 0.3);


// // Event Listener to move spaceShip
 document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft" && ((gameSpriteArray[1].position.x + (gameSpriteArray[1].width)) > 0)) {
    gameSpriteArray[1].position.x -= 15;
  }
  if (e.key === "ArrowRight") {
    gameSpriteArray[1].position.x += 15;
  }
  if (e.key === "ArrowUp") {
    gameSpriteArray[1].position.y -= 15;
  }
  if (e.key === "ArrowDown") {
    gameSpriteArray[1].position.y += 15;
  }
});

// function to add laser
function creatingLaser() {
    createSprite(resources.resources.laser.texture,50*xPercent,50*yPercent,15*xPercent,20*yPercent,null,[0.5],true,gameSpriteArry,container);
  laser.position.set(spaceShip.position.x, spaceShip.position.y);

  app.stage.addChild(laser);
}

// // firing  laser on y axis
// function firingLaser() {
//   if (laser.position.y > 0) {
//     laser.position.y -= 2;
//     if (detectCollision(meteorite, laser)) {
//       console.log("it detects");
//       explosion.position.set(laser.position.x, 0);
//       app.stage.addChild(explosion);
//       app.stage.removeChild(laser);
//       app.stage.removeChild(meteorite);
//       app.stage.addChild(endText);
//       laser.destroy();
//       meteorite.destroy();
//       cancelAnimationFrame(loopForlaser);
//       return;
//     }
//   }

//   app.render(app.stage);
//   requestAnimationFrame(firingLaser);
// }
// var laser;
// // function to add and fire laser
// document.addEventListener("keydown", (e) => {
//   if (e.code === "Space") {
//     creatingLaser();
//     var loopForlaser = requestAnimationFrame(firingLaser);
//   }
// });

// var meteorite; //  declaring meteorite
// var random_x_position;
// // creating random meteorite on y axis
// function creating_meteorite() {
//   random_x_position = getRandomArbitrary(0, width);
//   // meteorite = PIXI.Sprite.from(baseUrl + "meteorite.png");
//   meteorite.anchor.set(0.5);
//   meteorite.width = meteorite.height = 100;
//   meteorite.position.x = random_x_position;
//   meteorite.position.y = 0;
//   return meteorite;
// }

// // function to creating meteroite after 6 sec
// function creating_meteorite_after_6() {
//   meteorite = creating_meteorite();
//   app.stage.addChild(meteorite);

//   var loopForMeteorite = window.requestAnimationFrame(moving_meteorite);

//   // moving meteorite on y axis
//   function moving_meteorite() {
//     if (meteorite.position.y < height) {
//       meteorite.position.y += 2;
//     } else if (meteorite.position.y == height) {
//       explosion.position.set(meteorite.position.x, height);
//       app.stage.addChild(explosion);
//       app.stage.removeChild(meteorite);
//       app.stage.addChild(endText);
//       meteorite.destroy();
//       clearInterval(timeout);
//       window.cancelAnimationFrame(loopForMeteorite);
//       return;
//     }
//     app.render(app.stage);
//     requestAnimationFrame(moving_meteorite);
//   }
// }

// var timeout = setInterval(creating_meteorite_after_6, 6000);

// // function to provide swing on x - axis to spaceShip

// // let elapsed = 0.0;
// // app.ticker.add((delta) => {
// //     elapsed += delta;
// //     spaceShip.x = app.screen.width / 2 + Math.sin(elapsed / 49.0) * 100.0;
// // });

// // function to provide an angle to follow mouse pointer

// // app.ticker.add((delta) => {
// //     const cursorPosition = app.renderer.plugins.interaction.mouse.global;
// //     let angle =
// //         Math.atan2(
// //             cursorPosition.y - spaceShip.position.y,
// //             cursorPosition.x - spaceShip.position.x
// //         ) +
// //         Math.PI / 2;
// //     spaceShip.rotation = angle;
// // });

// // const rect1 = new Graphics();
// // rect1.drawRect(100, 100, 50, 50)
// //     .beginFill(0xffffff);
// // app.stage.addChild(rect1);
// // const rectangle = PIXI.Sprite.from(PIXI.Texture.WHITE);
// // rectangle.width = 300;
// // rectangle.height = 200;
// // rectangle.tint = 0xffffff;
// // app.stage.addChild(rectangle);
// // const rectangle1 = PIXI.Sprite.from(PIXI.Texture.WHITE);
// // rectangle1.width = 300;
// // rectangle1.height = 200;
// // rectangle1.position.x = width - rectangle1.width;
// // rectangle1.tint = 0xffffff;
// // app.stage.addChild(rectangle1);
// // let ticker = PIXI.Ticker.shared;
// // Set this to prevent starting this ticker when listeners are added.
// // By default this is true only for the PIXI.Ticker.shared instance.
// // ticker.autoStart = false;
// // FYI, call this to ensure the ticker is stopped. It should be stopped
// // if you have not attempted to render anything yet.

// // Call this when you are ready for a running shared ticker.
// // ticker.start();

// // app.ticker.add((delta) => {
// //     rectangle1.x -= 3;
// //     rectangle.x += 3;
// //     if (detectCollision(rectangle, rectangle1)) {
// //         ticker.stop();
// //     }
// // });
