
var g = 5;
var delay = 10;


class Planet {
  constructor(mass, x, y) {
    this.mass = mass;
    this.x = x;
    this.y = y;
    this.speed = [0,0];
    this.newSpeed = [0,0]
    if (mass > 250) {
      console.log("TOO BIG");
    } else if (mass > 150) {
      console.log("uhohhh pretty biggg");
    }
  }

  get pos() {
    return [this.x, this.y];
  }

  get absSpeed() {
    return Math.sqrt(this.speed[0]**2 + this.speed[1]**2);
  }

  calcAccel(planetList) {
    var accel = [0,0];
    var i;
    for (i=0;i<planetList.length;i++) {
      if (planetList[i] != this) {
        var p = planetList[i];
        var distances = this.getDist(p)

        if (distances[0] == 0) continue

        var fullAccel = g * p.mass / distances[0]**3;
        accel[0] += fullAccel * distances[1];
        accel[1] += fullAccel * distances[2];
      }
    }
    return accel;
  }

  getDist(other) {
    var xDisp = other.x - this.x;
    var yDisp = other.y - this.y;
    return [Math.sqrt(xDisp**2 + yDisp**2), xDisp, yDisp];
  }
}


function update(planetList) {
  var forces = [];

  // Calculate effect of each other planet
  for (i=0;i<planetList.length;i++) {
    forces.push(planetList[i].calcAccel(planetList));
  }

  // Alter planet's speed, and solve collisions
  for (i=0;i<planetList.length;i++) {
    var p = planetList[i];
    p.speed[0] += forces[i][0];
    p.speed[1] += forces[i][1];
    p.newSpeed = p.speed;

    for (j=0;j<planetList.length;j++) {
      if (planetList[j] != p) {
        var dist = p.getDist(planetList[j]);
        if (dist[0] < p.mass + planetList[j].mass) {
          // setTimeout(function(){reset()},5)
          var n = [dist[1]/dist[0], dist[2]/dist[0]];
          var r = [0,0];
          var dp = p.speed[0]*n[0] + p.speed[1]*n[1];
          p.speed[0] -= 2 * dp * n[0];
          p.speed[1] -= 2 * dp * n[1];
          // p1 = p;
          // p2 = planetList[j];
          // m1 = p1.mass;
          // m2 = p2.mass;
          // u1x = p1.speed[0];
          // u1y = p1.speed[1];
          // u2x = p2.speed[0];
          // u2y = p2.speed[1];
          // dist1 = p1.getDist(p2);
          // n1 = [dist1[1]/dist1[0], dist1[2]/dist1[0]];
          // dp1 = p1.speed[0]*n1[0] + p1.speed[1]*n1[1];
          // vec1 = [p1.speed[0] - 2 * dp1 * n1[0], p1.speed[1] - 2 * dp1 * n1[1]];
          // // dist2 = p2.getDist(p1);
          // // n2 = [dist2[1]/dist2[0], dist2[2]/dist2[0]];
          // // dp2 = p2.speed[0]*n2[0] + p2.speed[1]*n2[1];
          // // vec2 = [p2.speed[0] - 2 * dp2 * n2[0], p2.speed[1] - 2 * dp2 * n2[1]];
          // r1 = vec1[1]/vec1[0];
          // // r2 = vec2[1]/vec2[0];
          // r2 = r1
          // // console.log("YO", vec1, vec2, r1,r2);
          // u12 = u1x**2 + u1y**2;
          // u22 = u2x**2 + u2y**2;
          // a = (m1*m2 + r2**2*m1*m2 + m1**2 + r2**2*m1**2);
          // b = (1+r2**2)*(m1**2*u1x + m1*m2*u2x)*(-2);
          // c = (1+r2**2)*(m1*u1x + m2*u2x)**2 - m1*m2*u12 - m2**2*u22;
          // console.log(a,b,c, b**2 - 4*a*c);
          // if (vec1[0] < 0) {p.newSpeed[0] = (-b - Math.sqrt(b**2 - 4*a*c)) / (2*a)}
          // else {p.newSpeed[0] = (-b + Math.sqrt(b**2 - 4*a*c)) / (2*a)};
          // p.newSpeed[1] = p.newSpeed[0] * r1;
          // console.log(p.newSpeed[0], p.newSpeed[1]);
        }
      }
    }
  // }
  //
  // for (i=0;i<planetList.length;i++) {
  //   var p = planetList[i];
  //   p.speed = p.newSpeed;
    p.x += p.speed[0];
    p.y += p.speed[1];

    // Position of border when accounting for planet size
    b = 250 - p.mass

    if (p.x < -b || p.x > b) {
      p.speed[0] *= -1;
    }
    if (p.y < -b || p.y > b) {
      p.speed[1] *= -1;
    }

    // If outside side walls
    if (p.x < -b) {
      p.x %= b;
      p.x = -(b - p.x);
    }
    if (p.x > b) {
      p.x %= b;
      p.x = b - p.x;
    }

    // If outside top/bottom walls
    if (p.y < -b) {
      p.y %= b;
      p.y = -(b - p.y);
    }
    if (p.y > b) {
      p.y %= b;
      p.y = b - p.y;
    }
  }
}


function genSVG(planetList) {
  document.getElementsByTagName("svg")[0].innerHTML = ''
  var n=0;
  for (n=0;n<planetList.length;n++) {
    var p = planetList[n]
    var circ = "<circle cx='" + (p.x + 250)
              + "' cy='" + (250 - p.y)
              + "' r='" + p.mass
              + "' fill='white'>"
    document.getElementsByTagName("svg")[0].innerHTML += circ;
  }
  return
}


function updatePositions(planetList) {
  update(planetList);
  genSVG(planetList);
  setTimeout(function() {
    updatePositions(planetList)
  }, delay)
}


function initPlanets() {
  reset();
  planets = [];

  for (i=0;i<n;i++) {
    var check = false;

    // Check positions is valid (not overlapping wall or other planets)
    while (!check) {
      check = true;
      var mass = Math.floor(45 * Math.random()) + 5;
      var x = Math.floor(500 * Math.random()) - 250;
      var y = Math.floor(500 * Math.random()) - 250;
      p = new Planet(mass, x, y);

      if (p.x > (250 - p.mass)
          || p.x < -(250 - p.mass)
          || p.y > (250 - p.mass)
          || p.y < -(250 - p.mass)) {
            check = false;
          }

      planets.forEach(part => {
        if (p.getDist(part)[0] < p.mass + part.mass) {
          check = false;
        }}
      )
    }
    planets.push(p);
  }

  genSVG(planets)
  updatePositions(planets)
}


function reset() {
  var id = window.setTimeout(function() {}, 0);
  console.log(id);
  while (id--) {
      window.clearTimeout(id); // will do nothing if no timeout with id is present
  }
}


var slider = document.getElementById("barRange");
var output = document.getElementById("barOutput");
output.innerHTML = slider.value;
n = Number(slider.value)

slider.oninput = function() {
  output.innerHTML = this.value;
  n = Number(this.value)
}
