//----------------------global variables-------------------------//

//creating width,height and xPetcent,yPercent variable of screen
const width = window.innerWidth;
const height = window.innerHeight;
const xPercent = window.innerWidth / 100;
const yPercent = window.innerHeight / 100;
let spaceShip;
let castle;

//used as baseurl
let baseUrl = "./images/";
//gamesprite array
let gameSpriteArray = [];
//laserSprite array
let laserSpriteArray = [];
//meteoriteSprite array
let meteoriteSpriteArray = [];
//explosion array
let explosionSpriteArray = [];

//-----------------------useful functions----------------------//

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

//creating sprites
function createSprite(
  texture,
  xPosition,
  yPosition,
  width,
  height,
  show = false,
  arrayToStore = [],
  xAnchor,
  yAnchor
) {
  let sprite = PIXI.Sprite.from(texture);
  sprite.position.x = xPosition;
  sprite.position.y = yPosition;
  width != null ? (sprite.width = width) : "";
  height != null ? (sprite.height = height) : "";
  xAnchor != null ? (sprite.anchor.x = xAnchor) : "";
  yAnchor != null ? (sprite.anchor.y = yAnchor) : "";
  sprite.visible = show;
  app.stage.addChild(sprite);
  if (arrayToStore !== null) {
    arrayToStore.push(sprite);
  } else {
    return sprite;
  }
}

function setup(resources) {
  castle = createSprite(
    resources.resources.castle.texture,
    0 * xPercent,
    70 * yPercent,
    100 * xPercent,
    30 * yPercent,
    true,
    null
  );
  spaceShip = createSprite(
    resources.resources.spaceShip.texture,
    50 * xPercent,
    50 * yPercent,
    20*xPercent,
    30*yPercent,
    true,
    null,
    0.5,
    0.5
  );
}

//-----------------------------PIXI MAIN APPLICATION----------------------------//
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
  .load((resources) => {
    setup(resources);
  });

// //creating explosion texture
// const explosionTexture =createSprite(
//     resources.resources.explosion.texture,
//     50 * xPercent,
//     50 * yPercent,
//     null,
//     null,
//     true,
//     null,
//     explosionSpriteArray,
//     0.5,
//     0.5
//   );
// explosionTexture.anchor.set(0.5, 0.5);
// explosionTexture.scale.set(0.3, 0.3);

//----------------------------------------Event Listener--------------------------------//

//Event Listener to move spaceShip
document.addEventListener("keydown", function (e) {
  if (
    e.key === "ArrowLeft" &&
    spaceShip.position.x - spaceShip.width / 10 > 0
  ) {
    spaceShip.position.x -= 15;
  }
  if (
    e.key === "ArrowRight" &&
    spaceShip.position.x + spaceShip.width / 9 < width
  ) {
    spaceShip.position.x += 15;
  }
  if (e.key === "ArrowUp" && spaceShip.position.y - spaceShip.height / 2 > 0) {
    spaceShip.position.y -= 15;
  }
  if (
    e.key === "ArrowDown" &&
    spaceShip.position.y + spaceShip.width / 4 < height
  ) {
    spaceShip.position.y += 15;
  }
});

//Event Listener to fire spaceship
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    let laser = new Laser();
    laserSpriteArray.push(laser);
  }
});
//-------------------------------------lasers----------------------------------//

var loopForlaser = requestAnimationFrame(firingLaser);

class Laser {
  constructor() {
    this.obj = createSprite(
      loader.resources.laser.texture,
      spaceShip.position.x,
      spaceShip.position.y,
      15 * xPercent,
      20 * yPercent,
      true,
      null,
      0.5,
      1
    );
    this.markOfDelete = false;
  }

  animateLaser() {
    if (this.obj.position.y > 0) this.obj.position.y -= 10;
    else this.markOfDelete = true;
  }

}
// firing  laser on y axis
function firingLaser() {
  [...laserSpriteArray].forEach((obj) => {
    obj.animateLaser();
    obj.markOfDelete?(obj.obj.destroy()):"";
  });
  laserSpriteArray = laserSpriteArray.filter(obj =>
  !obj.markOfDelete)
  app.render(app.stage);
  requestAnimationFrame(firingLaser);
}

//---------------------------------meteorite section--------------------------------//

// var meteorite; //  declaring meteorite
// var random_x_position;
// // creating random meteorite on y axis
// function creating_meteorite() {
//   random_x_position = getRandomArbitrary(0, width);
//   createSprite(
//     loader.resources.meteorite.texture,
//     random_x_position,
//     -100,
//     15 * xPercent,
//     20 * yPercent,
//     true,
//     meteoriteSpriteArray,
//     0.5,
//     1
//   );
//   return meteorite;
// }

// // function to creating meteroite after 6 sec
// function creating_meteorite_after_6() {
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

//--------------------------------------------end text ------------------------------------------------//
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
