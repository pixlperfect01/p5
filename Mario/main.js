var level="";
var levelWidth = 64;
var levelHeight = 16;
var tileWidth;
var tileHeight;
var wC = 0;
var coins = 0;
var cameraPosX = 0.0;
var cameraPosY = 0.0;
var playerPosX = 0.0;
var playerPosY = 0.0;
var playerVelX = 0.0;
var playerVelY = 0.0;
var offsetX;
var offsetY;
var wM = true;
var dir = true;
var moving = false;
var UP_ARR = false;
var DOWN_ARR = false;
var LEFT_ARR = false;
var RIGHT_ARR = false;
var playerOnGround = false;
var Alive = true;
var MarioWalkRight1;
var MarioWalkRight2;
var    MarioWalkLeft1;
var    MarioWalkLeft2;
var    MarioStillRight;
var    MarioStillLeft;
var    MarioJumpRight;
var    MarioJumpLeft;
var    Brick;
var    BrokenBlock;
var    QuestionBlock;
var    Coin;
var    Test;
var    Ground;
var    EmptyBlock;
var    Goomba1;
var    Goomba2;
var Goombas=[];
function setup() {
  createCanvas(160*2, 120*2);
  level+="................................................................";
  level+="................................................................";
  level+="................................................................";
  level+=".......?........................................................";
  level+=".......o........................................................";
  level+=".......................GGGGGGGG.................................";
  level+="....?BB?BB?...........GGG......G.......G.G......................";
  level+="....................GGG....o...........G.G......................";
  level+="...................GGGG.........................................";
  level+="GGGGGGGGGG...GGGGGGGGGGGGGGGGGGGGGGG.GGGGGGGGGGGGGG.....GGGGGGGG";
  level+="..........GGG......................G.G...............GGG........";
  level+="........................GGGGGGGGGGGG.G............GGG...........";
  level+="........................G............G.........GGG..............";
  level+="........................G.GGGGGGGGGGGG......GGG.................";
  level+="........................G................GGG....................";
  level+="........................GGGGGGGGGGGGGGGGG.......................";
  level+="................................................................";
  Coin = loadImage("MarioCoin.png");
  Brick = loadImage("MarioBrickBlock.png");
  QuestionBlock = loadImage("MarioQuestionBlock.png");
  Ground = loadImage("MarioGround.png");
  MarioWalkRight1 = loadImage("MarioWalk1.png");
  MarioWalkRight2 = loadImage("MarioWalk2.png");
  MarioStillRight = loadImage("MarioStill.png");
  MarioJumpRight = loadImage("MarioJump.png");
  EmptyBlock = loadImage("MarioEmptyBlock.png");
  Goomba1 = loadImage("MarioGoomba.png");
  Goomba2 = loadImage("MarioGoombaR.png");
  var white = color(255, 255, 255);
  Coin.loadPixels();
  for (var x=0; x<Coin.width; x++) {
    for (var y=0; y<Coin.height; y++) {
      if (Coin.pixels[y*Coin.width+x]==white)
        Coin.pixels[y*Coin.width+x]=color(0, 255, 255, 0);
    }
  }
  Coin.updatePixels();
  MarioWalkRight1.loadPixels();
  for (var x=0; x<MarioWalkRight1.width; x++) {
    for (var y=0; y<MarioWalkRight1.height; y++) {
      if (MarioWalkRight1.pixels[y*MarioWalkRight1.width+x]==white)
        MarioWalkRight1.pixels[y*MarioWalkRight1.width+x]=color(0, 255, 255, 0);
    }
  }
  MarioWalkRight1.updatePixels();
  MarioWalkRight1.resize(16, 16);
  MarioWalkRight2.loadPixels();
  for (var x=0; x<MarioWalkRight2.width; x++) {
    for (var y=0; y<MarioWalkRight2.height; y++) {
      if (MarioWalkRight2.pixels[y*MarioWalkRight2.width+x]==white)
        MarioWalkRight2.pixels[y*MarioWalkRight2.width+x]=color(0, 255, 255, 0);
    }
  }
  MarioWalkRight2.updatePixels();
  MarioWalkRight2.resize(16, 16);
  MarioStillRight.loadPixels();
  for (var x=0; x<MarioStillRight.width; x++) {
    for (var y=0; y<MarioStillRight.height; y++) {
      if (MarioStillRight.pixels[y*MarioStillRight.width+x]==white)
        MarioStillRight.pixels[y*MarioStillRight.width+x]=color(0, 255, 255, 0);
    }
  }
  MarioStillRight.updatePixels();
  MarioStillRight.resize(16, 16);
  MarioJumpRight.loadPixels();
  for (var x=0; x<MarioJumpRight.width; x++) {
    for (var y=0; y<MarioJumpRight.height; y++) {
      if (MarioJumpRight.pixels[y*MarioJumpRight.width+x]==white)
        MarioJumpRight.pixels[y*MarioJumpRight.width+x]=color(0, 255, 255, 0);
    }
  }
  MarioJumpRight.updatePixels();
  MarioJumpRight.resize(16, 16);
  Goomba1.loadPixels();
  for (var x=0; x<Goomba1.width; x++) {
    for (var y=0; y<Goomba1.height; y++) {
      if (Goomba1.pixels[y*Goomba1.width+x]==white)
        Goomba1.pixels[y*Goomba1.width+x]=color(0, 255, 255, 0);
    }
  }
  Goomba1.updatePixels();
  Goomba1.resize(16, 16);
  Goomba2.loadPixels();
  for (var x=0; x<Goomba2.width; x++) {
    for (var y=0; y<Goomba2.height; y++) {
      if (Goomba2.pixels[y*Goomba2.width+x]==white)
        Goomba2.pixels[y*Goomba2.width+x]=color(0, 255, 255, 0);
    }
  }
  Goomba2.updatePixels();
  Goomba2.resize(16, 16);
  MarioWalkLeft1 = reverse(MarioWalkRight1.copy());
  MarioWalkLeft2 = reverse(MarioWalkRight2.copy());
  MarioStillLeft = reverse(MarioStillRight.copy());
  MarioJumpLeft = reverse(MarioJumpRight.copy());
  Goombas.add(new Goomba(1, 0, true));
  Goombas.add(new Goomba(7, 0, true));
}
void draw() {
  //frameRate(1);
  if (!Alive) {
    exit();
  }
  playerOnGround = false;
  moving = false;
  playerVelX = 0.0;
  //playerVelY = 0.0;
  if (LEFT_ARROW) {
    playerVelX = -.15;
    wC++;
    dir = false;
    moving = true;
  }  
  if (RIGHT_ARROW) {
    playerVelX = .15;
    wC++;
    dir = true;
    moving = true;
  }
  playerVelY += .02;
  float newPlayerPosX = playerPosX + playerVelX;
  float newPlayerPosY = playerPosY + playerVelY;

    if (GetTile(newPlayerPosX, newPlayerPosY)=='o') {
      SetTile(newPlayerPosX, newPlayerPosY, '.');
    }
    if (GetTile(newPlayerPosX+.999, newPlayerPosY-.1)=='o') {
      SetTile(newPlayerPosX+.999, newPlayerPosY-.1, '.');
    }
  if (playerVelX>.3)
    playerVelX=.3;
  if (playerVelX<-.3)
    playerVelX=-.3;
  if (playerVelY>.75)
    playerVelY=.75;
  if (playerVelY<-.75)
    playerVelY=-.75;

  if (playerVelY<0) {
    if (GetTile(newPlayerPosX, newPlayerPosY)=='?') {
      SetTile(newPlayerPosX, newPlayerPosY, 'b');
    }
    if (GetTile(newPlayerPosX+.999, newPlayerPosY-.1)=='?') {
      SetTile(newPlayerPosX+.999, newPlayerPosY-.1, 'b');
    }
  }
  if (playerVelY<0) {
    if (GetTile(newPlayerPosX, newPlayerPosY)=='B') {
      SetTile(newPlayerPosX, newPlayerPosY, 't');
    }
    if (GetTile(newPlayerPosX+.999, newPlayerPosY-.1)=='B') {
      SetTile(newPlayerPosX+.999, newPlayerPosY-.1, 't');
    }
  }
  //collision

  if (playerVelX<=0) {
    if (GetTile(newPlayerPosX, playerPosY)!='.'||GetTile(newPlayerPosX, playerPosY+.85)!='.') {
      newPlayerPosX = int(newPlayerPosX) + 1;
      playerVelX = 0;
    }
  } else {
    if (GetTile(newPlayerPosX+1, playerPosY)!='.'||GetTile(newPlayerPosX+1, playerPosY+.85)!='.') {
      newPlayerPosX = int(newPlayerPosX);
      playerVelX = 0;
    }
  }
  if (playerVelY<=0) {
    if (GetTile(newPlayerPosX, newPlayerPosY)!='.'||GetTile(newPlayerPosX+.85, newPlayerPosY)!='.') {
      newPlayerPosY = int(newPlayerPosY) + 1;
      playerVelY = 0;
    }
  } else {
    if (GetTile(newPlayerPosX, newPlayerPosY+1)!='.'||GetTile(newPlayerPosX+.85, newPlayerPosY+1)!='.') {
      newPlayerPosY = int(newPlayerPosY);
      playerVelY = 0;
      playerOnGround = true;
    }
  }
  playerPosX = newPlayerPosX;
  playerPosY = newPlayerPosY;

  cameraPosX = playerPosX;
  cameraPosY = playerPosY;
  background(0, 255, 255);
  noStroke();
  tileWidth = 16;
  tileHeight = 16;
  int visibleTilesX = width/tileWidth;
  int visibleTilesY = height/tileHeight;
  offsetX = cameraPosX - float(visibleTilesX) / 2.0;
  offsetY = cameraPosY - float(visibleTilesY) / 2.0;
  if (offsetX<0) offsetX = 0;
  if (offsetY<0) offsetY = 0;
  if (offsetX>levelWidth-visibleTilesX) offsetX = levelWidth-visibleTilesX;
  if (offsetY>levelHeight-visibleTilesY) offsetY = levelHeight-visibleTilesY;
  float tileOffsetX = (offsetX - int(offsetX)) * tileWidth;
  float tileOffsetY = (offsetY - int(offsetY)) * tileHeight;
  for (int x = -1; x < visibleTilesX+1; x++) {
    for (int y = -1; y < visibleTilesY+1; y++) {
      char tileID = GetTile(x + offsetX, y + offsetY);
      if (tileID=='t') {
        SetTile(x + offsetX, y + offsetY, '.');
        tileID='.';
      }
      switch(tileID) {
      case '.':
        fill(0, 255, 255);
        rect(x*tileWidth-tileOffsetX, y*tileHeight-tileOffsetY, tileWidth+tileOffsetX, tileHeight+tileOffsetY);
        break;
      case 'G':
        image(Ground, x*tileWidth-tileOffsetX, y*tileHeight-tileOffsetY, tileWidth, tileHeight);
        break;
      case 'o':
        image(Coin, x*tileWidth-tileOffsetX, y*tileHeight-tileOffsetY, 14, 16);
        break;
      case 'B':
        image(Brick, x*tileWidth-tileOffsetX, y*tileHeight-tileOffsetY, tileWidth, tileHeight);
        break;
      case 'b':
        image(EmptyBlock, x*tileWidth-tileOffsetX, y*tileHeight-tileOffsetY, tileWidth, tileHeight);
        break;
      case '?':
        fill(255, 255, 255);
        image(QuestionBlock, x*tileWidth-tileOffsetX, y*tileHeight-tileOffsetY, tileWidth, tileHeight);
        break;
      default:
        break;
      }
    }
  }
  for (int i=0; i<Goombas.size(); i++) {
    Goomba g = Goombas.get(i);
      //g.alive = false;
  }
  for (int i=Goombas.size()-1; i>=0; i--) {
    Goombas.get(i).move();
    Goombas.get(i).show();
    if (!Goombas.get(i).alive) {
      Goombas.remove(i);
    }
  }
  if (wC % 6 == 1) {
    wM=!wM;
  }
  if (!playerOnGround) {
    if (dir) {
      image(MarioJumpRight, (playerPosX - offsetX)*tileWidth, (playerPosY - offsetY)*tileHeight, tileWidth, tileHeight);
    } else {
      image(MarioJumpLeft, (playerPosX - offsetX)*tileWidth, (playerPosY - offsetY)*tileHeight, tileWidth, tileHeight);
    }
  } else if (moving) {
    if (dir) {
      if (wM) {
        image(MarioWalkRight1, (playerPosX - offsetX)*tileWidth, (playerPosY - offsetY)*tileHeight, tileWidth, tileHeight);
      } else {
        image(MarioWalkRight2, (playerPosX - offsetX)*tileWidth, (playerPosY - offsetY)*tileHeight, tileWidth, tileHeight);
      }
    } else {
      if (wM) {
        image(MarioWalkLeft1, (playerPosX - offsetX)*tileWidth, (playerPosY - offsetY)*tileHeight, tileWidth, tileHeight);
      } else {
        image(MarioWalkLeft2, (playerPosX - offsetX)*tileWidth, (playerPosY - offsetY)*tileHeight, tileWidth, tileHeight);
      }
    }
  } else {
    if (dir) {
      image(MarioStillRight, (playerPosX - offsetX)*tileWidth, (playerPosY - offsetY)*tileHeight, tileWidth, tileHeight);
    } else {
      image(MarioStillLeft, (playerPosX - offsetX)*tileWidth, (playerPosY - offsetY)*tileHeight, tileWidth, tileHeight);
    }
  }
}

char GetTile(float x, float y) {
  if (x >= 0 && x < levelWidth && y >= 0 && y < levelHeight) {
    return level.charAt(int(y) * levelWidth + int(x));
  } else {
    return ' ';
  }
}

void SetTile(float Tx, float Ty, char c) {
  String temp = "";
  int x = int(Tx);
  int y = int(Ty);
  if (x >= 0 && x < levelWidth && y >= 0 && y < levelHeight) {
    for (int i = 0; i<level.length(); i++) {
      if (i==y*levelWidth+x) {
        temp+=c;
      } else {
        temp+=level.charAt(i);
      }
    }
    level = temp;
  }
}
void keyPressed() {
  if (key == ' ') {
    if (playerVelY==0)
      playerVelY=-.4;
  }
  switch(keyCode) {
  case UP:
    UP_ARROW=true;
    break;
  case DOWN:
    DOWN_ARROW=true;
    break;
  case LEFT:
    LEFT_ARROW=true;
    break;
  case RIGHT:
    RIGHT_ARROW=true;
    break;
  }
}
void keyReleased() {
  switch(keyCode) {
  case UP:
    UP_ARROW=false;
    break;
  case DOWN:
    DOWN_ARROW=false;
    break;
  case LEFT:
    LEFT_ARROW=false;
    break;
  case RIGHT:
    RIGHT_ARROW=false;
    break;
  }
}
PImage reverse(PImage a) {
  PImage img = createImage(a.width, a.height, RGB);
  a.loadPixels();
  img.loadPixels();
  int A=a.width-1;
  for (int y=0; y<a.height; y++) {
    for (int x=0; x<a.width; x++) {
      img.pixels[y*a.width+x]=a.pixels[y*a.width+A];
      A--;
      if (A<0)
        A=a.width-1;
    }
  }
  a.updatePixels();
  img.updatePixels();
  return img;
}
