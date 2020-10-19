function setup() {
  // initialize canvas
  timer = 0; 

  w = 520;
  h = 520;
  createCanvas(w, h);

  // load data
  d = loadJSON('data.json', (d) => {
    // initialize diagram
    angle = TWO_PI / 8;
    buffer = 3;
    frameTime = 1000; //milliseconds
    maxSize = 500;
    this.diagram = new CircleDiagram(d, angle, buffer, maxSize);

    // display first frame
    this.diagram.displayFirstFrame();
  });
}

function draw() {
  // loop through all frames
  if (millis() >= this.frameTime + timer) {
    this.diagram.displayNextFrame();
    timer = millis();
  }
}

class CircleDiagramFrame {
  constructor(frameNum, frameValues, angle, buffer, maxSize) {

    this.frameNum = frameNum;

    this.maxRadius = maxSize / 2;
    this.maxArea = this.getArea(this.maxRadius);

    this.maxRadius = maxSize / 2;
    this.maxArea = this.getArea(this.maxRadius);

    this.modifier = this.maxArea / frameValues[0];


    this.r1 = this.maxRadius;
    this.a1 = this.maxArea;
    //console.log("v1 r1 a1 : " + frameValues[0], this.r1, this.a1);

    this.a2 = frameValues[1] * this.modifier
    this.r2 = this.getRadius(this.a2);
    //console.log("v2 r2 a2: " + frameValues[1], this.r2, this.a2);

    this.a3 = frameValues[2] * this.modifier;
    this.r3 = this.getRadius(this.a3);
    //console.log("v3 r3 a3: " + frameValues[2], this.r3, this.a3);

    this.a4 = frameValues[3] * this.modifier;
    this.r4 = this.getRadius(this.a4);
    //console.log("v4 r4 a4: " + frameValues[3], this.r4, this.a4);
  }

  display() {
    // display diagram
    background(236, 199, 98);
    strokeWeight(0);

    textSize(20);
    fill(94);
    text('Frame ' + (this.frameNum + 1), 5, 20);

    this.d1xy = w / 2;
    fill(239);
    circle(this.d1xy, this.d1xy, this.r1 * 2);

    this.d2x = this.d1xy + (this.r1 - this.r2 - buffer) * cos(angle);
    this.d2y = this.d1xy + (this.r1 - this.r2 - buffer) * sin(angle);
    fill(220);
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
    for (let i = 0; i < data.frames.length; i++) {
      this.frames.push(new CircleDiagramFrame(i, data.frames[i], angle, buffer, maxSize));
    }
  }

  displayFirstFrame() {
    this.frames[0].display();
  }

  displayNextFrame(data) {
    if (this.currentFrame < this.data.frames.length - 1) {
      this.currentFrame++;
      this.frames[this.currentFrame].display();
    }
  }
}