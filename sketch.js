function getRadius(area) {
  return sqrt(area / PI)
}

function getArea(r) {
  return PI * (pow(r, 2));
}

function setup() {
  // initialize canvas
  w = 520;
  h = 520;
  createCanvas(w, h);

  // load data
  d = loadJSON('data.json', () => {

    cases = d.days[0].cases;
    potentialEntries = cases * d.potentialModifier;
    otkGen = d.days[0].otkGen;
    otkEnter = d.days[0].otkEnter;

    // initialize diagram
    angle = TWO_PI / 8;
    buffer = 3;
    maxSize = 500;
    maxRadius = maxSize / 2;
    maxArea = getArea(maxRadius);

    modifier = maxArea / cases;
    r1 = maxRadius;
    a1 = maxArea;
    console.log("cases r1 a1 : " + cases, r1, a1);

    a2 = potentialEntries * modifier
    r2 = getRadius(a2);
    console.log("potentialEntries r2 a2: " + potentialEntries, r2, a2);

    a3 = otkGen * modifier;
    r3 = getRadius(a3);
    console.log("otkGen r3 a3: " + otkGen, r3, a3);

    a4 = otkEnter * modifier;
    r4 = getRadius(a4);
    console.log("otkEnter r4 a4: " + otkEnter, r4, a4);

    // display diagram
    background(236, 199, 98);
    strokeWeight(0);

    d1xy = w / 2;
    fill(239);
    circle(d1xy, d1xy, r1 * 2);

    d2x = d1xy + (r1 - r2 - buffer) * cos(angle);
    d2y = d1xy + (r1 - r2 - buffer) * sin(angle);
    fill(239);
    stroke(128);
    strokeWeight(1.5);
    circle(d2x, d2y, r2 * 2);

    d3x = d2x + (r2 - r3 - buffer) * cos(angle);
    d3y = d2y + (r2 - r3 - buffer) * sin(angle);
    strokeWeight(0);
    fill(186);
    circle(d3x, d3y, r3 * 2);

    d4x = d3x + (r3 - r4 - buffer) * cos(angle);
    d4y = d3y + (r3 - r4 - buffer) * sin(angle);
    fill(94);
    circle(d4x, d4y, r4 * 2);

    });

}

function draw() {}
