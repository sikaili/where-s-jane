
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
    let nn = point.place;
    console.log(mm)
    cityA.indexOf(mm)===-1?cityA.push(mm):"";
    placeA.indexOf(nn)===-1?placeA.push(nn):"";
    console.log(placeA);
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
    point.x = map(point.x,minx,maxx,width*0.9-50,width*0.1+100);
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
    placeArray[i] = locs.filter(obj=>obj.place===placeA[i]);
  }
  let m = [...cityArray];
  m = m.sort((a,b)=>(b.length-a.length));
  // console.log(m==)

  let n = [...placeArray];
  n = n.sort((a,b)=>(b.length-a.length));

  background(150,150,180,100);


// info text Right
  if(locs){
    const top = 35;
    const left = width-30;
    push();
    strokeWeight(0);
    textSize(15);
    textAlign(RIGHT);
    console.log()
    if(locs.length<50){
      console.log(m);
      fill(0,0,150,80);
      text("Data of Jane Joe",left,top+random(1,2));
      text("From 03/07/18 to 23/07/18",left,top+35+random(1,2));
      text("We believe you live in:",left,top+70+random(1,2));
      fill(150,0,0,100);
      text(cityA[Math.floor(random(5,20))],left,top+105+random(1,2));
    }
    else{
      fill(0,0,150,80);
      text("Data of Jane Joe",left,top+random(1,2));
      text("From 03/07/18 to 23/07/18",left,top+35+random(1,2));
      text("We believe you live in:",left,top+70+random(1,2));
      fill(150,0,0,100);
      text(m[0][0].city+" "+m[0][0].place,left,top+105+random(1,2));
      text(m[1][0].place,left,top+140+random(1,2));

    }
// date time Left
    textAlign(LEFT);
    fill(150,0,0,random(0,1000));
    text(locs[locs.length-1].date+" "+locs[locs.length-1].time,15,height*0.85);
    text("Total facebook connections:"+locs[locs.length-1].n,15,height*0.85+35+random(0,2));

// provocative sentences
    if(mouseX>width*0.8){
      fill(150,0,0,random(0,1000));
      text("Each time you connect,\nFacebook knows where you are",15,height*0.85+70+random(0,2));
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
//  left place list
  if(n.length>10){
    for(let i =0;i<n.length;i++){
      if(!n[i][0]||i>5){
        continue
      }
      // console.log(n[i][0].city)
      if(locs[locs.length-1].place==n[i][0].place){
        fill(150,0,0);
        stroke(150,0,0);

      }
      else{
        fill(0,0,180,40);
        stroke(0,0,180,40);

      }
      text(n[i][0].place,15,height*0.85-35*4+i*20);
    }
}
  }
// LINES, CIRCLES
  beginShape();
  fill(0,0);
  strokeWeight(2-Math.random());
  stroke(255,80);
  for(let i = 0; i<locs.length;i++){
    vertex(locs[i].x,locs[i].y);
    curveTightness(random(1.5,2));
    // get number of this city
    let d = cityA.indexOf(locs[i].city);

    // draw parcours points
    push();
    noStroke();
    fill(0,0,100,50);
    ellipse(locs[i].x,locs[i].y,random(10,20)+locs[i].size);
    fill(255-cityArray[d].length*1,255-cityArray[d].length*5,0,20*cityArray[d].length);
    textSize(15+Math.random()/2);
    textAlign(CENTER);
    // Draw frequented cities
    if(cityArray[d].length>4){
      fill(100,0,0,10);
      if(cityArray[d].length>30){
        fill(100,0,0,2);
      }
      ellipse(cityArray[d][0].x,cityArray[d][0].y,constrain(cityArray[d].length*8,0,300)+random(-10,10)*cityArray[d].length/2);
      fill(255-cityArray[d].length*1,255-cityArray[d].length*5,0,20);
      textSize(constrain(cityArray[d].length*1.8,10,45));
      cityArray[d][0].y>height/2?text(locs[i].city+" ",cityArray[d][0].x,cityArray[d][0].y-cityArray[d].length):text(locs[i].city+" ",cityArray[d][0].x,cityArray[d][0].y+cityArray[d].length*4);
    }
    pop();
    ellipse(locs[i].x,locs[i].y,random(10,15));
  }
  // console.log(cityArray);
  push()
  fill(255,0,0,100);
  textAlign(CENTER);
  ellipse(locs[locs.length-1].x,locs[locs.length-1].y,50-random(25));
  fill(130,10,10,180);
  stroke(0,0);
  textSize(25);
  text(locs[locs.length-1].place,locs[locs.length-1].x,locs[locs.length-1].y+50);

  pop();
  endShape();
  let vmin;
  width>height?vmin=height:vmin=width;
  // bar de navigation
  if(height>width){
    push();
    stroke(0,0);
    fill(30,50,150,100);
    rect(width-15,mouseY,15,height-mouseY);
    pop();
  }
  else{
    push();
    stroke(0,0);
    fill(30,50,150,100);
    rect(0,height-15,mouseX,15);
    pop();
  }
}



function Choose(array){

  let n = Math.floor(map(mouseX,0,width,0,array.length))+1;
  if(height>width){
    n = Math.floor(map(height-mouseY,0,height,0,array.length))+1;
  }
  return array.slice(0,n);
}


document.touchmove = function(n) {
  n.preventDefault();
}