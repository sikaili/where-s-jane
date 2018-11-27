
document.addEventListener('touchmove', function(n) {
    n.preventDefault();
}, {passive: false });
let state = -1;
let doubleClick,ts=[];
let mic,osc,filt;
let locss = [];

function preload() {
  table = loadTable("assets/e3.csv","csv","header");
}
function setup() {
  for(let e = 0; e < 231; e++){
    let m = split(table.getString(e,1),",")
    console.log(m);
    let point = {
      x:split(table.getString(e,1),","),
      y:split(table.getString(e,2),","),
      n:split(table.getString(e,0),","),
      date:split(table.getString(e,4),","),
      note:split(table.getString(e,5),","),
      size:Math.random()*40
    }
    
    locss.push(point);
  }
	mic = new p5.AudioIn();
	mic.start();
  createCanvas(windowWidth, windowHeight);
  osc = new p5.Oscillator();
  osc.disconnect();
  osc.connect(filt);
  osc.setType('sawtooth');
  osc.start();
  osc.freq(0);
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
    point.x = map(point.x,minx,maxx,width*0.1,width*0.9);
    point.y = map(point.y,miny,maxy,height*0.2,height*0.9);
  })

}


function draw() {
  let locs = Choose(locss);
  if(locs){
    push();
    fill(0,200);
    strokeWeight(0);
    textSize(25);
    console.log(locs[locs.length-1].date);
    text(locs[locs.length-1].date,width/2,height*0.8);
    text(locs[locs.length-1].n+" connections",width/2,height*0.8+50);
    pop();
  }
  background(200,150);
  beginShape();
  fill(0,0);
  strokeWeight(2-Math.random());
  stroke(0,100);
  for(let i = 0; i<locs.length;i++){
    push();
    noStroke();
    textSize(15+Math.random()/2);
    fill(100,0,0,50);
    ellipse(locs[i].x,locs[i].y,random(40,43)+locs[i].size);
    text(locs[i].date,locs[i].x,locs[i].y);
    pop();
    ellipse(locs[i].x,locs[i].y,random(5,10));
    vertex(locs[i].x,locs[i].y);
  }
  endShape();
}



function Choose(array){
  let n = Math.floor(map(mouseX,0,width,0,array.length))+1;
  return array.slice(0,n);

}


document.touchmove = function(n) {
  n.preventDefault();
}