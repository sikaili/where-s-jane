
document.addEventListener('touchmove', function(n) {
    n.preventDefault();
}, {passive: false });
let state = -1;
let doubleClick,ts=[];
let mic,osc,filt;
let locss = [];
let cityA = [],placeA=[];
let cityArray=[];
let placeArray=[];
let img,font;
function preload() {
  table = loadTable("assets/e5.csv","csv","header");
  img = loadImage("assets/1.png");
  font = loadFont('assets/SpaceMono-Regular.ttf');
}
function setup() {
  textFont(font);
  noCursor();
  for(let e = 0; e < 210; e++){
    let m = split(table.getString(e,1),",");
    let str = split(table.getString(e,5),",")[0];
    str = str.split(":")[0];
    let point = {
      n:split(table.getString(e,0),","),
      x:split(table.getString(e,1),","),
      y:split(table.getString(e,2),","),
      place:split(table.getString(e,3),",")[0],
      city:split(table.getString(e,6),",")[0],
      date:split(table.getString(e,4),","),
      time:split(table.getString(e,5),","),
      hour:str,
      size:Math.random()*20
    }
    locss.push(point);
    let mm = point.city;
    console.log(mm)
    cityA.indexOf(mm)===-1?cityA.push(mm):"";
    placeA.indexOf(point.place)===-1?placeA.push(point.place):"";
  }
  console.log(cityA);

  createCanvas(windowWidth, windowHeight);
  // osc = new p5.Oscillator();
  // osc.disconnect();
  // osc.connect(filt);
  // osc.setType('sawtooth');
  // osc.start();
  // osc.freq(0);
  // noCursor();
  let minx = Infinity;
  let maxx = -Infinity;
  let miny = Infinity;
  let maxy = -Infinity;

  locss.forEach(point=>{
    point.x>maxx?maxx=point.x:""
    point.y>maxy?maxy=point.y:""
    point.y<miny?miny=point.y:""
    point.x<minx?minx=point.x:""
  })
// MAP TO SCREEN
  locss.map(point=>{
    point.x = map(point.x,minx,maxx,width*0.9,width*0.1+50);
    point.y = map(point.y,miny,maxy,height*0.23,height*0.9);
  })

}
function changeC(){
  let color = new color(random(255),random(255),random(255),50);
  return color;
}
function draw() {

  // splice array, create cityArray&placeArray
  let locs = Choose(locss);
  for(let i =0;i<cityA.length;i++){
    cityArray[i] = locs.filter(obj=>obj.city===cityA[i]);
  }
  for(let i =0;i<placeA.length;i++){
    placeArray[placeA[i]] = locs.filter(obj=>obj.place===placeA[i]);
  }
  let m = [...cityArray];
  m = m.sort((a,b)=>(b.length-a.length));
  // console.log(m==)
  background(150,150,180,100);
// bar de navigation
  push();
  stroke(0,0);
  fill(150,50,50,100);
  rect(0,height-15,mouseX,15);
  pop();
// general info text

  if(locs){

// info text Right
    push();
    fill(150,0,0,100);
    strokeWeight(0);
    textSize(15);
    textAlign(RIGHT);
    console.log()
    if(locs.length<100){
      console.log(m);
      text("Data of Jane Joe\n\nFrom 03/07/18 to 23/07/18\n\nWe believe you live in:\n\n"+cityA[Math.floor(random(5,20))],0.95*width,0.1*height+random(1,2));
    }
    else{
      text("Data of Jane Joe\n\nFrom 03/07/18 to 23/07/18\n\nWe believe you live in:\n\n"+m[0][0].city+" "+m[0][0].place+"\n\n"+m[1][0].place,0.95*width,0.1*height+random(1,2));

    }
// date time Left
    textAlign(LEFT);
    fill(150,0,0,random(0,1000));
    text(locs[locs.length-1].date+" "+locs[locs.length-1].time,width/20+5,height*0.85);
    text("Total facebook connections:"+locs[locs.length-1].n,width/20+5,height*0.85+35+random(0,2));

// provocative sentences
    if(mouseX>width*0.8){
      fill(150,0,0,random(0,1000));
      text("Each time you connect,\nFacebook knows where you are",width/20+5,height*0.85+70+random(0,2));
    }
    pop();
// Left City List
    if(m.length>10){
      for(let i =0;i<m.length;i++){
        if(!m[i][0]||i>20){
          continue
        }
        // console.log(m[i][0].city)
        if(locs[locs.length-1].city==m[i][0].city){
          fill(150,0,0);
          stroke(150,0,0);

        }
        else{
          fill(255,40);
          stroke(255,40);

        }
        text(m[i][0].city,15,30+i*20);
      }
    }
  }
// LINES, CIRCLES
  beginShape();
  fill(0,0);
  strokeWeight(2-Math.random());
  stroke(255,80);
  for(let i = 0; i<locs.length;i++){
    curveVertex(locs[i].x,locs[i].y);
    curveTightness(random(1.5,2));
    // get number of this city
    let d = cityA.indexOf(locs[i].city);

    // draw parcours points
    push();
    noStroke();
    fill(0,0,100,50);
    ellipse(locs[i].x,locs[i].y,random(5,15)+locs[i].size);
    fill(255-cityArray[d].length*1,255-cityArray[d].length*5,0,20*cityArray[d].length);
    textSize(15+Math.random()/2);
    textAlign(CENTER);
    // Draw frequented cities
    if(cityArray[d].length>4){
      fill(0,0,100,10);
      if(cityArray[d].length>30){
        fill(0,0,100,2);
      }
      ellipse(cityArray[d][0].x,cityArray[d][0].y,constrain(cityArray[d].length*8,0,300)+random(-10,10)*cityArray[d].length/2);
      fill(255-cityArray[d].length*1,255-cityArray[d].length*5,0,20);
      textSize(constrain(cityArray[d].length*1.8,10,45));
      cityArray[d][0].y>height/2?text(locs[i].city+" ",cityArray[d][0].x,cityArray[d][0].y-cityArray[d].length):text(locs[i].city+" ",cityArray[d][0].x,cityArray[d][0].y+cityArray[d].length*4);
    }
    pop();
    ellipse(locs[i].x,locs[i].y,random(10,15));
  }
  console.log(cityArray);
  push()
  fill(255,0,0,100);
  textAlign(CENTER);
  ellipse(locs[locs.length-1].x,locs[locs.length-1].y,50-random(25));
  fill(150,0,0,150);
  stroke(0,0);
  textSize(25);
  text(locs[locs.length-1].place,locs[locs.length-1].x,locs[locs.length-1].y+50);

  pop();
  endShape();
  let vmin;
  width>height?vmin=height:vmin=width;
}



function Choose(array){
  let n = Math.floor(map(mouseX,0,width,0,array.length))+1;
  return array.slice(0,n);
}


document.touchmove = function(n) {
  n.preventDefault();
}