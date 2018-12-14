function texts() {
  // date time Left
  push();
  textAlign(LEFT);
  fill(rightTextRed[0], rightTextRed[1], rightTextRed[2], 255 - Math.random() * 100);
  textSize(sizeT(1) * 1.4)
  text(locs[locs.length - 1].date + "\n" + locs[locs.length - 1].time, 15, height * 0.89 - 20);
  textSize(sizeT(0));
  // text("Total facebook connections:" + locs[locs.length - 1].n, 15, height * 0.82 + sizeT(-1) * 2.3 + Math.random() * 2);

  // provocative sentences
  if (mouseX > width * 0.4) {
    fill(rightTextRed[0], rightTextRed[1], rightTextRed[2], Math.random() * 1000);
    // text("Each time you connect,\nFacebook knows where you are", 15, height * 0.82 + sizeT(-1) * 3 + Math.random() * 2);
  }
  pop();
  push();
  // Left City List
  if (m.length > 10) {
    for (let i = 0; i < m.length; i++) {
      if (!m[i][0] || i > 4) {
        continue
      }
      // console.log(m[i][0].city)
      if (locs[locs.length - 1].city == m[i][0].city) {
        fill(cityHighlight);
        stroke(cityHighlight);
      } else {
        fill(city);
        stroke(city);

      }
      textSize(sizeT(0) * 1.2);
      if (height > width) {
        // textSize(sizeT(0));
      }
      text(m[i][0].city + ": " + m[i].length + " ", 15, 60 + i * sizeT(-2));
    }
  }
  pop();
}