
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
let img;
function preload() {
  table = loadTable("assets/e5.csv","csv","header");
  img = loadImage("assets/1.png");
}
function setup() {
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
  // for(let i =0;i<cityA.length;i++){
  //   cityArray[cityA[i]] = locss.filter(obj=>obj.city===cityA[i]);
  // } 

	// mic = new p5.AudioIn();
	// mic.start();
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
  console.log(minx);
  console.log(miny);
  console.log(maxx);
  console.log(maxy);




  locss.map(point=>{
    point.x = map(point.x,minx,maxx,width*0.9,width*0.1);
    point.y = map(point.y,miny,maxy,height*0.23,height*0.9);
  })

}
function changeC(){
  let color = new color(random(255),random(255),random(255),50);
  return color;
}
function draw() {
  // image(img, 0, 0, width, height)
  let locs = Choose(locss);
  for(let i =0;i<cityA.length;i++){
    cityArray[cityA[i]] = locs.filter(obj=>obj.city===cityA[i]);
  }
  // console.log(placeArray);
  for(let i =0;i<placeA.length;i++){
    placeArray[placeA[i]] = locs.filter(obj=>obj.place===placeA[i]);
  }
  background(150,100);
  // background(locs[locs.length-1].hour*10,150);
  push();
  stroke(0,0);
  fill(50,50,100,100);
  rect(0,height-15,mouseX,15);
  pop();
  if(locs){
    push();
    fill(0,100);
    strokeWeight(0);
    textSize(20);
    // console.log(locs[locs.length-1].date);
    text("Name:\nJane Doe\n\nWe guess you :\nLive in :  ",0.8*width,0.1*height);
    text(locs[locs.length-1].date+" "+locs[locs.length-1].time,width/8+50,height*0.8);
    text(locs[locs.length-1].n+" facebook connections",width/8+50,height*0.8+50+random(0,2));
    if(mouseX>width*0.8){
      fill(150,0,0,random(0,1000))
      text("Each time you connect,\nFacebook knows where you are",width/8+50,height*0.8+100+random(0,2));
    }
    pop();
  }
  beginShape();
  fill(0,0);
  strokeWeight(2-Math.random());
  stroke(0,80);
  for(let i = 0; i<locs.length;i++){
    vertex(locs[i].x,locs[i].y);
    push();
    noStroke();
    fill(0,0,100,3);
    ellipse(cityArray[locs[i].city][0].x,cityArray[locs[i].city][0].y,cityArray[locs[i].city].length*5);
    fill(0,0,100,50);

    ellipse(locs[i].x,locs[i].y,random(5,15)+locs[i].size);
    fill(255-cityArray[locs[i].city].length*1,255-cityArray[locs[i].city].length*5,0,20*cityArray[locs[i].city].length);
    textSize(cityArray[locs[i].city].length+15+Math.random()/2);
    text(locs[i].city+" ",cityArray[locs[i].city][0].x-50,cityArray[locs[i].city][0].y-cityArray[locs[i].city].length*1);
    // text(locs[i].place+" ",placeArray[locs[i].place][0].x-50,placeArray[locs[i].place][0].y-placeArray[locs[i].place].length*1);

    pop();
    ellipse(locs[i].x,locs[i].y,random(10,15));
    // curveTightness(3);
  }
  // console.log(cityArray);

  push()
  fill(255,0,0,100);
  ellipse(locs[locs.length-1].x,locs[locs.length-1].y,50-random(25));
  // textSize(30);
  fill(0,0,0,150);
  stroke(0,0);
  text(locs[locs.length-1].place,locs[locs.length-1].x-30,locs[locs.length-1].y-30);
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