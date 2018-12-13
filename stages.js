let stageControl = () => {
  if (stage === -1 && state != -1) {
    stage = "indicate";
  }
  stage = (cityToggle() ? "city" : 0);
  switch (stage) {
    case -1:
      {
        push();
        fill(rectF);
        rect(0, 0, width, height);
        fill(rightTextRed);
        textAlign(CENTER);
        textSize(sizeT(1) * 1.5);
        text("We offer you a chance,\nto read a person,\nto see where he lives\nand where he works\n", width / 2, height / 2);
        if (state == 1) {
          stage = -1;
        }
        pop();
        break;
      }
    case "indicate":
      {
        push();
        fill(rectF);
        rect(0, 0, width, height);
        fill(rightTextRed);
        textAlign(CENTER);
        textSize(sizeT(1) * 1.5);
        text(width > height ? "Move to the leftside to begin" : "Swipe from bottom to begin", width / 2, height / 2);
        if ((mouseY > height - 50 && state == 1 && width < height) || (mouseX < 50 && width > height)) {
          stage = 0;
        }
        pop();
        break;
      }
    case "live":
      {
        push();
        fill(rectF);
        rect(0, 0, width, height);
        fill(rightTextRed);
        textAlign(CENTER);
        textSize(sizeT(1) * 1.5);
        text("We guess you live in :", width / 2, height / 2);
        textSize(sizeT(1) * 1.5);
        text(m[0][0].city, width / 2, height / 2 + sizeT(1) * 4);
        pop();
        break;
      }
    case "city":
      {
        push();
        fill(rectF);
        rect(0, 0, width, height);
        for (let i = 0; i < m.length; i++) {
          if (!m[i][0] || i > 15) {
            continue
          }
          if (locs[locs.length - 1].city == m[i][0].city) {
            fill(cityHighlight);
            stroke(cityHighlight);
          } else {
            fill([...city.slice(0, 3), 180]);
            // stroke(city);
          }
          textSize(sizeT(1) * 1.2);
          text(m[i][0].city + ": " + m[i].length + " fois", 200, 150 + i * sizeT(1) * 1.5);
        }
        pop();

        push();
        fill(rightTextRed);
        textSize(sizeT(1) * 1.3);
        textAlign(CENTER);
        text("Tablau Villes Visitées", width / 2, height * 0.82);
        pop();
        break;

      }
  }
}

function cityToggle() {
  return state == 1 && (mouseX < 150 && mouseY < 150) ? true : false;
}