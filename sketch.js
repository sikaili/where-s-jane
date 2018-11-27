
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
      n:split(table.getString(e,0),","),
      x:split(table.getString(e,1),","),
      y:split(table.getString(e,2),","),
      place:split(table.getString(e,3),","),
      date:split(table.getString(e,4),","),
      time:split(table.getString(e,5),","),

      size:Math.random()*40
    }
    
    locss.push(point);
  }
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
    point.x = map(point.x,minx,maxx,width*0.1,width*0.9);
    point.y = map(point.y,miny,maxy,height*0.2,height*0.9);
  })

}
function changeC(){
  let color = new color(random(255),random(255),random(255),50);
  return color;
}
function draw() {
  let locs = Choose(locss);
  if(locs){
    push();
    fill(0,200);
    strokeWeight(0);
    textSize(30);
    // console.log(locs[locs.length-1].date);
    text(locs[locs.length-1].date,width/2,height*0.8);
    text(locs[locs.length-1].n+" facebook connections",width/2,height*0.8+50+random(0,2));
    if(mouseX>width*0.8){
      fill(150,0,0,random(0,1000))
      text("Each time you connect,\nFacebook knows where you are",width/2,height*0.8+100+random(0,2));

    }
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
    fill(0,0,100,50);
    ellipse(locs[i].x,locs[i].y,random(5,15)+locs[i].size);
    fill(255,255,0,80);
    text(locs[i].time,locs[i].x,locs[i].y);
    pop();
    ellipse(locs[i].x,locs[i].y,random(10,15));
    vertex(locs[i].x,locs[i].y);
    // curveTightness(3);
  }
  push()
  fill(255,0,0,100);
  ellipse(locs[locs.length-1].x,locs[locs.length-1].y,50-random(25));
  textSize(30);
  fill(0,0,0,150);
  stroke(0,0);
  text(locs[locs.length-1].place,locs[locs.length-1].x+30,locs[locs.length-1].y-60);
  pop();
  endShape();
}



function Choose(array){
  let n = Math.floor(map(mouseX,0,width,0,array.length))+1;
  return array.slice(0,n);

}


document.touchmove = function(n) {
  n.preventDefault();
}