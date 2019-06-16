p5.disableFriendlyErrors = true;
document.addEventListener('touchmove', function (n) {
  n.preventDefault();
}, {
  passive: false
});
document.addEventListener('dblclick', () => {
  nuit = !nuit
}, {
  passive: false
});
var tapedTwice = false;

function Dclick(event) {
  if (!tapedTwice) {
    tapedTwice = true;
    setTimeout(function () {
      tapedTwice = false;
    }, 300);
    return false;
  }
  event.preventDefault();
}

let ee = 0;
let state = -1;
let doubleClick, ts = [];
let mic, osc, filt;
let locss = [];
let cityA = [],
  placeA = [];
let cityArray = [];
let placeArray = [];
let img, font;
let mouseP = [];
let nuit = true;
let predict = [];
let locs;
let [m, n] = [
  [],
  []
];
let stage = -1;
backgroundColor = [255, 255, 255, 60];
cityHabitText = [255, 255, 20, 50];
// text habit city
cityTextFill = [255, 255, 0, 100];
// circles habit city
cityHabitFill = [100, 0, 0, 10];
parcoursCirclesFill = [0, 0, 110, 50];
rightTextBlue = [0, 0, 150, 80];
rightTextRed = [150, 0, 0, 100];
cityHighlight = rightTextRed;
city = [0, 0, 180, 20];
parcoursStroke = [200, 200, 20, 80];
parcoursFill = [130, 10, 10, 180];
innerCercleS = [50, 0, 100, 80];
navBar = [30, 50, 150, 100];

function preload() {
  table = loadTable("assets/e5.csv", "csv", "header");
  // font = loadFont('assets/SpaceMono-Regular.ttf');
  // font = loadFont('assets/iosevka-regular.ttf')
  font = loadFont('assets/AndaleMono.ttf');
  sound = loadSound("assets/click.m4a");

}

function setup() {
  pixelDensity() > 2.0 ? pixelDensity(2.0) : "";
  masterVolume(0.2)
  textFont(font);
  // noCursor();
  sound.play();
  // get information from tables
  for (let e = 0; e < 210; e++) {
    let m = split(table.getString(e, 1), ",");
    let str = split(table.getString(e, 5), ",")[0];
    str = str.split(":")[0];
    let point = {
      n: split(table.getString(e, 0), ","),
      x: split(table.getString(e, 1), ","),
      y: split(table.getString(e, 2), ","),
      place: split(table.getString(e, 3), ",")[0],
      city: split(table.getString(e, 6), ",")[0],
      date: split(table.getString(e, 4), ","),
      time: split(table.getString(e, 5), ","),
      hour: str,
      size: Math.random() * 20
    }
    locss.push(point);
    let mm = point.city;
    let nn = point.place;
    // city & place names without duplites
    cityA.indexOf(mm) === -1 ? cityA.push(mm) : "";
    placeA.indexOf(nn) === -1 ? placeA.push(nn) : "";
  }
  createCanvas(windowWidth, windowHeight);

  // calculate data x-y range
  let [minx, maxx, miny, maxy] = [Infinity, -Infinity, Infinity, -Infinity];
  locss.forEach(point => {
    point.x > maxx ? maxx = point.x : ""
    point.y > maxy ? maxy = point.y : ""
    point.y < miny ? miny = point.y : ""
    point.x < minx ? minx = point.x : ""
  })
  // MAP TO SCREEN
  if (height > width) {
    locss.map(point => {
      point.x = map(point.x, minx, maxx, width * 0.9 - 50, width * 0.1 + 100);
      point.y = map(point.y, miny, maxy, height * 0.3, height * 0.91);
    })
  } else {
    locss.map(point => {
      point.x = map(point.x, minx, maxx, width * 0.9 - 100, width * 0.1 + 100);
      point.y = map(point.y, miny, maxy, height * 0.23 + 50, height * 0.9 - 50);
    })
  }

  locs = locss.slice(0, 1);

  for (let i = 0; i < cityA.length; i++) {
    cityArray[i] = locs.filter(obj => obj.city === cityA[i]);
  }
  for (let i = 0; i < placeA.length; i++) {
    placeArray[i] = locs.filter(obj => obj.place === placeA[i]);
  }
  // 3rd arrays with items sorted by frequency
  m = [...cityArray];
  m = m.sort((a, b) => (b.length - a.length));
  n = [...placeArray];
  n = n.sort((a, b) => (b.length - a.length));
  //fake predict
  // for(let i =0;i<locss.length;i++){
  //   let t = {
  //     x:locss[i].x+random(-1,1)*(locss.length-i),
  //     y:locss[i].x+random(-1,1)*(locss.length-i)
  //   }
  //   predict.push(t);
  // }
  // mouseY = height;
  // mouseX = 0;
}

function sizeT(n) {
  let tSmall = 15;
  let tMid = 30;
  let tInt = 40;
  let scl = 1.2;
  if (n === 0) {
    if (height > width) {
      return tSmall * scl;
    }
    return tSmall;
  }
  if (n === 1) {
    if (height > width) {
      return tMid * scl;
    }
    return tMid;
  }
  if (n === -1) {
    if (height > width) {
      return tInt * scl;
    }
    return tInt;
  }
  if (n === -2) {
    if (height > width) {
      return tInt / 1.5;
    }
    return tInt / 1.5;
  }
}

function draw() {
  // splice array, create cityArray&placeArray
  barLimit() ? stage = 0 : "";
  locs = (abs(mouseX - pmouseX) > 0 || abs(mouseY - pmouseY) > 0) && (stage === 0) && barLimit() ? Choose(locss) : locs;
  if ((abs(mouseX - pmouseX) > 0 || abs(mouseY - pmouseY) > 0) && (stage === 0) && barLimit()) {
    // 2nd arrays with frequency
    for (let i = 0; i < cityA.length; i++) {
      cityArray[i] = locs.filter(obj => obj.city === cityA[i]);
    }
    for (let i = 0; i < placeA.length; i++) {
      placeArray[i] = locs.filter(obj => obj.place === placeA[i]);
    }
    // 3rd arrays with items sorted by frequency
    m = [...cityArray];
    m = m.sort((a, b) => (b.length - a.length));
    n = [...placeArray];
    n = n.sort((a, b) => (b.length - a.length));
  }

  scolor(nuit);
  background(backgroundColor);
  // Texts
  // info text Right
  if (locs) {
    const top = sizeT(-1) * 1.5;
    const left = width - sizeT(-1) * 0.7;
    push();
    strokeWeight(0);
    textAlign(RIGHT);
    textSize(sizeT(1) * 1.5);
    fill(rightTextBlue);
    text("Where's Jane Joe", left, top);
    textSize(sizeT(0) * 1.5);
    fill(rightTextRed);
    // text("From 03/07/18 to 23/07/18", left, top + sizeT(-1));
    text("From 03/07/18 to 23/07/18", left, top + sizeT(-1));
    pop();

  }
  // Time & Left Citys
  let t = () => {
    push();
    textSize(sizeT(1));
    noStroke();
    fill(rightTextRed[0], rightTextRed[1], rightTextRed[2], (Math.sin(frameCount / 20) + 0.5) * 80);
    // textAlign(CENTER)
    if (width > height) {
      text(">>> Drag here to begin >>>", 60, height - 20);
    } else {
      translate(width, height);
      rotate(-PI / 2);
      text(">>> Drag here to begin", 60, -20);
    }
    pop();
  }
  stage != -1 ? texts() : t();
  // LINES, CIRCLES
  beginShape();
  fill(0, 0);
  strokeWeight(2.5 - Math.random() * 2);
  // color stroke
  // dynamic
  nuit ? stroke(parcoursStroke[0], parcoursStroke[1] + Math.random() * 200, parcoursStroke[2], parcoursStroke[3]) : stroke(parcoursStroke[0], parcoursStroke[1] - Math.random() * 200, parcoursStroke[2], parcoursStroke[3]);
  let x = 0;
  let y = 0;
  for (let i = 0; i < locs.length; i++) {
    vertex(locs[i].x, locs[i].y);
    // get No. of this city
    let d = cityA.indexOf(locs[i].city);
    // draw parcours points
    push();
    noStroke();
    // color blue parcours circles 
    nuit ? fill(parcoursCirclesFill[0], parcoursCirclesFill[1], parcoursCirclesFill[2] - Math.random() * 10, parcoursCirclesFill[3]) : fill(parcoursCirclesFill[0], parcoursCirclesFill[1], parcoursCirclesFill[2] + Math.random() * 10, parcoursCirclesFill[3]);
    ellipse(locs[i].x, locs[i].y, 10 + Math.random() * 10 + locs[i].size);
    textSize(sizeT(0) + Math.random() / 2);
    textAlign(CENTER);
    // Draw frequented cities
    if (cityArray[d].length > 4) {
      fill(cityHabitFill);
      let r = constrain(cityArray[d].length * 8, 0, 300) + random(-10, 10) * cityArray[d].length / 1.3;
      if (cityArray[d].length > 30) {
        fill(cityHabitFill[0], cityHabitFill[1], cityHabitFill[2], cityHabitFill[3] / 5);
        r = constrain(cityArray[d].length * 8, 0, 300) + random(-10, 10) * cityArray[d].length / 4;
      }
      ellipse(cityArray[d][0].x, cityArray[d][0].y, r);
      // invert
      nuit ? fill(cityHabitText[0] + cityArray[d].length * 1, cityHabitText[1] + cityArray[d].length * 5, cityHabitText[2], cityHabitText[3]) : fill(cityHabitText[0] + cityArray[d].length * 1, cityHabitText[1] + cityArray[d].length * 5, cityHabitText[2], cityHabitText[3]);
      textSize(locs.length > 1 ? constrain(cityArray[d].length * 1.8, 10, 45) : 0);
      cityArray[d][0].y > height / 2 ? text(locs[i].city + " ", cityArray[d][0].x, cityArray[d][0].y - cityArray[d].length) : text(locs[i].city + " ", cityArray[d][0].x, cityArray[d][0].y + cityArray[d].length * 4 + Math.random() * 2);
    }
    pop();
    push();
    nuit ? stroke(innerCercleS[0], innerCercleS[1] - Math.random() * 155, innerCercleS[2], innerCercleS[3]) : stroke(innerCercleS[0], innerCercleS[1] + Math.random() * 155, innerCercleS[2], innerCercleS[3]);
    ellipse(locs[i].x, locs[i].y, 10 + Math.random() * 5);
    pop();
  }
  endShape();
  push();
  // on Circle text
  fill(locs.length > 1 ? [...parcoursStroke].slice(0, 3).concat(195) : [0, 0]);
  textAlign(CENTER);
  ellipse(locs[locs.length - 1].x, locs[locs.length - 1].y, 70 - Math.random() * 25);
  fill(locs.length > 1 ? parcoursFill : (0, 0));
  noStroke();
  textSize(sizeT(0) * 1.2);
  text(locs[locs.length - 1].place, locs[locs.length - 1].x, locs[locs.length - 1].y + sizeT(-1) * 1.5);
  pop();
  // push();
  // fill(255,0,0);
  // ellipse(predict[locs.length-1].x,predict[locs.length-1].y,75-random(25));
  // pop();

  // bar de navigation
  bar(locs, locss);
  // mouseX>50?stage=1:stage=0;
  // console.log(stage);
  stageControl();


}

const Choose = (array) => {
  let e = Math.floor(constrain(map(mouseX, 0, width, 0, array.length), 0, array.length)) + 1;
  if (height > width) {
    e = Math.floor(constrain(map(height - mouseY, 0, height, 0, array.length), 0, array.length)) + 1;
  }
  if (ee != e) {
    sound.rate(1 + Math.random() / 100);
    sound.play();
    ee = e;
  }
  if (e < 2) {
    stage = -1;
  }
  return array.slice(0, e);
}

const bar = (a1, a2) => {
  let long = constrain(a1.length / a2.length, 0.02, 0.995);
  if (height > width) {
    push();
    stroke(0, 0);
    fill(navBar);
    rect(width - 15, height - long * height, 15, long * height);
    fill(rightTextRed[0], rightTextRed[1], rightTextRed[2], 150 - Math.random() * 50);
    rect(width - 25, (1 - long) * height - 10, 40, 10);
    pop();
  } else {
    push();
    stroke(0, 0);
    fill(navBar);
    rect(0, height - 20, long * width, 15);
    fill(rightTextRed[0], rightTextRed[1], rightTextRed[2], 150 - Math.random() * 50);
    rect(long * width, height - 25, 10, 40);
    pop();
  }
}
document.touchmove = function (n) {
  n.preventDefault();
}