let timer = 0;

function setup() {
  // initialize canvas
  w = 520;
  h = 520;
  createCanvas(w, h);

  // load data
  d = loadJSON('data.json', (d) => {
    // initialize diagram
    angle = TWO_PI / 8;
    buffer = 3;
    frameTime = 1500; //milliseconds
    maxSize = 500;
    this.diagram = new CircleDiagram(d, angle, buffer, maxSize);
    this.diagram.displayFirstFrame();
  });
}

function draw() {
  if (millis() >= this.frameTime + timer) {
    this.diagram.displayNextFrame();
    timer = millis();
  }
}

class CircleDiagramFrame {
  constructor(dayNum, day, potentialModifier, angle, buffer, maxSize) {

    this.dayNum = dayNum;

    this.cases = day.cases;
    this.potentialEntries = this.cases * potentialModifier;
    this.otkGen = day.otkGen;
    this.otkEnter = day.otkEnter;

    this.maxRadius = maxSize / 2;
    this.maxArea = this.getArea(this.maxRadius);

    this.maxRadius = maxSize / 2;
    this.maxArea = this.getArea(this.maxRadius);

    this.modifier = this.maxArea / this.cases;
    this.r1 = this.maxRadius;
    this.a1 = this.maxArea;
    console.log("cases r1 a1 : " + this.cases, this.r1, this.a1);

    this.a2 = this.potentialEntries * this.modifier
    this.r2 = this.getRadius(this.a2);
    console.log("potentialEntries r2 a2: " + this.potentialEntries, this.r2, this.a2);

    this.a3 = this.otkGen * this.modifier;
    this.r3 = this.getRadius(this.a3);
    console.log("otkGen r3 a3: " + this.otkGen, this.r3, this.a3);

    this.a4 = this.otkEnter * this.modifier;
    this.r4 = this.getRadius(this.a4);
    console.log("otkEnter r4 a4: " + this.otkEnter, this.r4, this.a4);
  }

  display() {
    // display diagram
    background(236, 199, 98);
    strokeWeight(0);

    textSize(20);
    fill(94);
    text('Day ' + this.dayNum, 5, 20);

    this.d1xy = w / 2;
    fill(239);
    circle(this.d1xy, this.d1xy, this.r1 * 2);

    this.d2x = this.d1xy + (this.r1 - this.r2 - buffer) * cos(angle);
    this.d2y = this.d1xy + (this.r1 - this.r2 - buffer) * sin(angle);
    fill(239);
    stroke(128);
    strokeWeight(1.5);
    circle(this.d2x, this.d2y, this.r2 * 2);

    this.d3x = this.d2x + (this.r2 - this.r3 - buffer) * cos(angle);
    this.d3y = this.d2y + (this.r2 - this.r3 - buffer) * sin(angle);
    strokeWeight(0);
    fill(186);
    circle(this.d3x, this.d3y, this.r3 * 2);

    this.d4x = this.d3x + (this.r3 - this.r4 - buffer) * cos(angle);
    this.d4y = this.d3y + (this.r3 - this.r4 - buffer) * sin(angle);
    fill(94);
    circle(this.d4x, this.d4y, this.r4 * 2);
  }

  getRadius(area) {
    return sqrt(area / PI)
  }

  getArea(r) {
    return PI * (pow(r, 2));
  }
}

class CircleDiagram {
  constructor(data, angle, buffer, maxSize, frameTime) {
    this.currentFrame = 0;
    this.data = data;

    //loop through frames and construct them
    this.frames = [];
    for (let i = 0; i < data.days.length; i++) {
      this.frames.push(new CircleDiagramFrame(i, data.days[i], data.potentialModifier, angle, buffer, maxSize));
    }
  }

  displayFirstFrame() {
    this.frames[0].display();
  }

  displayNextFrame(data) {
    if (this.currentFrame < this.data.days.length - 1) {
      this.currentFrame++;
      this.frames[this.currentFrame].display();
    }
  }
}