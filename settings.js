function touchStarted(){
  state=1;
}
function touchEnded(){
  state=0;
  if(state==-2){
    if(mouseX<width/2){
      state =0;
      rrr = Math.floor(Math.random()*100);
    }
    else{
      state =-1;
      for(var e=0;e<mm[drawsN].length;e++){
        var dra = new Draw(e,mm[drawsN][e]);
        draws[e]= dra;
      }
    }
  }
  var t = frameCount;
  // addSnapshot(t);

  if (touches.length !== 0) {
    ts = [];
  } else {
    ts.push(t);
  }
  if (ts.length > 2) {
    ts.splice(0, 1);
  }
  if (ts[1] - ts[0] < 12) {
    doubleClick = true;

  } else {
    doubleClick = false;
  }
  if(doubleClick){
  }

}

function keyPressed(){

  if(keyCode == 189 || keyCode == 187){
  }

}


function addSnapshot( id )
{
  var dumps = [];
      // for(var mm =0; mm<draws.length; mm++){
      //   var dump = draws[mm].mp.map( function( element )
      //   {
      //       return { x : element.x , y : element.y }
      //   })
      //   dumps.push(dump);
      // }
      
      console.log(dumps);
      
      localStorage.setItem( "canvas-" + id , JSON.stringify(dumps) )
      
}     

function removeSnapshot(id) 
{
  localStorage.removeItem("canvas-" + id) ;
}  


function getSnapshot( id )
{
  var canvas = JSON.parse(localStorage.getItem( "canvas-" + id )) ;
  // var canvas = JSON.parse(myJSON);
  return canvas ;
}  

function resetAllSnapshots() 
{
  localStorage.clear() ;
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  background(50, 50, 200)
  link1.position(0.92 * windowWidth - 60, 0.9 * windowHeight+17);
  link.position(0.92 * windowWidth - 60, 0.9 * windowHeight);
}