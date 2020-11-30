
var g = 5;
var delay = 10;


class Particle {
  constructor(mass, x, y) {
    this.mass = mass;
    this.x = x;
    this.y = y;
    this.speed = [0,0];
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

  calcAccel(particleList) {
    var accel = [0,0];
    var i;
    for (i=0;i<particleList.length;i++) {
      if (particleList[i] != this) {
        var p = particleList[i];
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


function update(particleList) {
  var forces = [];

  // Calculate effect of each other particle
  for (i=0;i<particleList.length;i++) {
    forces.push(particleList[i].calcAccel(particleList));
  }

  // Alter particle's speed, and solve collisions
  for (i=0;i<particleList.length;i++) {
    var p = particleList[i];
    p.speed[0] += forces[i][0];
    p.speed[1] += forces[i][1];

    var alpha;
    if (p.speed[0] == 0) {
      if (p.speed[1] >= 0) {alpha = 0;}
      else {alpha = Math.PI;}
    }
    else {alpha = Math.atan(p.speed[1]/p.speed[0]);}
    if (p.speed[0]<0) {alpha += Math.PI}

    var absSpeed = p.absSpeed;
    for (j=0;j<particleList.length;j++) {
      if (particleList[j] != p) {
        var distances = p.getDist(particleList[j]);
        if (distances[0] < p.mass + particleList[j].mass) {
          var theta;
          if (particleList[j].x == 0) {
            if (particleList[j].y >= 0) {theta = 0;}
            else {theta = Math.PI;}
          }
          else {theta = Math.atan(distances[2] / distances[1]);}
          if (distances[1] < 0) theta += Math.PI

          var component = absSpeed * Math.cos(theta-alpha);
          p.speed[0] -= 2 * component * Math.cos(theta)
          p.speed[1] -= 2 * component * Math.sin(theta)
        }
      }
    }

    p.x += p.speed[0];
    p.y += p.speed[1];

    // Position of border when accounting for particle size
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


function genSVG(particleList) {
  document.getElementsByTagName("svg")[0].innerHTML = ''
  var n=0;
  for (n=0;n<particleList.length;n++) {
    var p = particleList[n]
    var circ = "<circle cx='" + (p.x + 250)
              + "' cy='" + (250 - p.y)
              + "' r='" + p.mass
              + "' fill='white'>"
    document.getElementsByTagName("svg")[0].innerHTML += circ;
  }
  return
}


function updatePositions(particleList) {
  update(particleList);
  genSVG(particleList);
  setTimeout(function() {
    updatePositions(particleList)
  }, delay)
}


function reset() {
  var id = window.setTimeout(function() {}, 0);
  console.log(id);
  while (id--) {
      window.clearTimeout(id); // will do nothing if no timeout with id is present
  }
}


function initParticles() {
  reset();
  particles = [];

  for (i=0;i<n;i++) {
    var check = false;

    // Check positions is valid (not overlapping wall or other particles)
    while (!check) {
      check = true;
      var mass = Math.floor(45 * Math.random()) + 5;
      var x = Math.floor(500 * Math.random()) - 250;
      var y = Math.floor(500 * Math.random()) - 250;
      p = new Particle(mass, x, y);

      if (p.x > (250 - p.mass)
          || p.x < -(250 - p.mass)
          || p.y > (250 - p.mass)
          || p.y < -(250 - p.mass)) {
            check = false;
          }

      particles.forEach(part => {
        if (p.getDist(part)[0] < p.mass + part.mass) {
          check = false;
        }}
      )
    }
    particles.push(p);
  }

  genSVG(particles)
  updatePositions(particles)
}


var slider = document.getElementById("barRange");
var output = document.getElementById("barOutput");
output.innerHTML = slider.value;
n = Number(slider.value)

slider.oninput = function() {
  output.innerHTML = this.value;
  n = Number(this.value)
}
