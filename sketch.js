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
    this.frameValues = frameValues;

    this.maxRadius = maxSize / 2;
    this.maxArea = this.getArea(this.maxRadius);

    this.maxRadius = maxSize / 2;
    this.maxArea = this.getArea(this.maxRadius);

    this.modifier = this.maxArea / frameValues[0];

    //initialize circles
    this.radiusList = []
    this.areaList = []
    for (let i = 0; i < frameValues.length; i++) {
      if (i == 0) {
        this.areaList[i] = this.maxArea;
        this.radiusList[i] = this.maxRadius;
      } else {
        this.areaList[i] = frameValues[i] * this.modifier;
        this.radiusList[i] = this.getRadius(this.areaList[i]);
      }
    }
  }

  display() {
    // display diagram
    background(236, 199, 98);
    strokeWeight(0);

    textSize(20);
    fill(94);
    text('Frame ' + (this.frameNum + 1), 5, 20);

    //display circles
    let dx = []
    let dy = []

    for (let i = 0; i < this.frameValues.length; i++) {
      fill(239 - (i*40));
      if (i == 0) {
        dx[i] = w / 2;
        dy[i] = w / 2;
      } else {
        dx[i] = dx[i - 1] + (this.radiusList[i - 1] - this.radiusList[i] - buffer) * cos(angle);
        dy[i] = dy[i - 1] + (this.radiusList[i - 1] - this.radiusList[i] - buffer) * sin(angle);
      }
      circle(dx[i], dy[i], this.radiusList[i] * 2); 
    }
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