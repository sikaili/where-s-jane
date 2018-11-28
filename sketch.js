
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

  // splice array, create cityArray&placeArray
  let locs = Choose(locss);
  for(let i =0;i<cityA.length;i++){
    cityArray[i] = locs.filter(obj=>obj.city===cityA[i]);
  }
  for(let i =0;i<placeA.length;i++){
    placeArray[placeA[i]] = locs.filter(obj=>obj.place===placeA[i]);
  }

  // console.log(JSON.stringfy(cityArray));

  let m = [];
  m = cityArray.sort((a,b)=>(b.length-a.length));

  background(150,150,180,100);


  // bar de navigation
  push();
  stroke(0,0);
  fill(50,50,100,100);
  rect(0,height-15,mouseX,15);
  pop();
  // general info text

  if(locs){
    push();
    fill(0,100);
    strokeWeight(0);
    textSize(20);
    // console.log(locs[locs.length-1].date);
    text("Data of Jean Joe",0.8*width,0.1*height);
    text(locs[locs.length-1].date+" "+locs[locs.length-1].time,width/8+50,height*0.8);
    text(locs[locs.length-1].n+" facebook connections",width/8+50,height*0.8+50+random(0,2));
    if(mouseX>width*0.8){
      fill(150,0,0,random(0,1000))
      text("Each time you connect,\nFacebook knows where you are",width/8+50,height*0.8+100+random(0,2));
    }
    pop();
    if(m.length>10){
      for(let i =0;i<m.length;i++){
        if(!m[i][0]||i>20){
          continue
        }

        // console.log(m[i][0].city)
        if(locs[locs.length-1].city==m[i][0].city){
          fill(255,0,0);
          // let bounds = font.textBounds("memememe",0,0,fontsize)；
          
          // rect(15,30+i*18,bounds.x,25);
        }
        else{
          fill(255);
        }
        text(m[i][0].city,15,30+i*20);
      }
    }
  }
  beginShape();
  fill(0,0);
  strokeWeight(2-Math.random());
  stroke(255,80);
  for(let i = 0; i<locs.length;i++){
    vertex(locs[i].x,locs[i].y);
    let d = cityA.indexOf(locs[i].city);
    // console.log(d);
    push();
    noStroke();
    fill(0,0,100,50);
    ellipse(locs[i].x,locs[i].y,random(5,15)+locs[i].size);
    fill(255-cityArray[d].length*1,255-cityArray[d].length*5,0,20*cityArray[d].length);
    textSize(15+Math.random()/2);
    textAlign(CENTER);
    if(cityArray[d].length>2){
      fill(0,0,100,3);
      ellipse(cityArray[d][0].x,cityArray[d][0].y,constrain(cityArray[d].length*8,0,300)+random(-10,10)*cityArray[d].length/2);
      fill(255-cityArray[d].length*1,255-cityArray[d].length*5,0,8);
      textSize(constrain(cityArray[d].length*1.5,15,45));
      text(locs[i].city+" ",cityArray[d][0].x,cityArray[d][0].y-cityArray[d].length);
    }
    // text(locs[i].place+" ",placeArray[locs[i].place][0].x-50,placeArray[locs[i].place][0].y-placeArray[locs[i].place].length*1);
    pop();
    ellipse(locs[i].x,locs[i].y,random(10,15));
    // curveTightness(3);
  }
  // console.log(cityArray);

  push()
  fill(255,0,0,100);
  ellipse(locs[locs.length-1].x,locs[locs.length-1].y,50-random(25));
  fill(0,0,0,150);
  stroke(0,0);
  textAlign(CENTER);
  textSize(25);
  text(locs[locs.length-1].place,locs[locs.length-1].x,locs[locs.length-1].y+30);
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