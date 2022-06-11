const area = document.createElement("div");
const htmlBody = document.getElementsByTagName("body")[0];

let areaWidth = 1000;
let areaHeight = 500;

// Container Styles
area.style.width = areaWidth + "px";
area.style.height = areaHeight + "px";
area.style.border = "2px solid black";
area.style.position = "relative";
area.style.overflow = "hidden";
htmlBody.appendChild(area);

/*
 * Checks wheter there is collision between two objects
 * Circl1
 * x1 = Number, x2 = Number, r1 = Number
 * Circle2
 * x2 = Number, y2 = Number, r2 = Number
 * returns
 * speed = Number, collideDirection = Object
 */
function ballCollision(x1, y1, r1, x2, y2, r2) {
  let distanceSquare = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
  let radiusSquare = (r1 + r2) * (r1 + r2);
  return distanceSquare <= radiusSquare;
}

/*
 * Calculates the Direction of collision and it's spped
 */
function alterDirection(ball1, ball2) {
  // Calculates the collision vector
  let vectorCollision = {
    x: ball2.x - ball1.x,
    y: ball2.y - ball1.y,
  };

  // Calculates the  Distance
  let distance = Math.sqrt(
    (ball2.x - ball1.x) * (ball2.x - ball1.x) +
      (ball2.y - ball1.y) * (ball2.y - ball1.y)
  );

  // Calculate the direction of Collision
  let collideDirection = {
    x: vectorCollision.x / distance,
    y: vectorCollision.y / distance,
  };

  // Calculates the relativeVelocity
  let relativeVelocity = {
    x: ball1.vx - ball2.vx,
    y: ball1.vy - ball2.vy,
  };

  // Calculates the speed
  let speed =
    relativeVelocity.x * collideDirection.x +
    relativeVelocity.y * collideDirection.y;

  return { speed, collideDirection };
}

function ballCollisionStatus() {
  // Resets Collision status
  for (let i = 0; i < balls.length; i++) {
    balls[i].collisionStatus = false;
  }

  // Checks wheter any two balls are collided
  for (let i = 0; i < balls.length - 1; i++) {
    for (let j = i + 1; j < balls.length; j++) {
      if (
        ballCollision(
          balls[i].x + balls[i].r,
          balls[i].y + balls[i].r,
          balls[i].r,
          balls[j].x + balls[j].r,
          balls[j].y + balls[j].r,
          balls[j].r
        )
      ) {
        balls[i].collisionStatus = true;
        balls[j].collisionStatus = true;

        const { speed, collideDirection } = alterDirection(balls[i], balls[j]);

        // If the speed is -ve the objects will automatically move away from
        // each other so no need to change speed
        if (speed < 0) {
          break;
        }

        // Sets the resultant velocity of the objects after collision
        balls[i].vx -= speed * collideDirection.x;
        balls[i].vy -= speed * collideDirection.y;
        balls[j].vx += speed * collideDirection.x;
        balls[j].vy += speed * collideDirection.y;
      }
    }
  }
}

/*
 * Checks wheter the objects are collided with the boundary box
 * If collided then the ball is bounced back away from the wall
 */
function wallCollisionStatus() {
  let ball;
  let ballRestitution = 1; //Speed with which the ball is bounced back(Ball is bounced back in same speed here)
  for (let i = 0; i < balls.length; i++) {
    ball = balls[i];

    // Checks if the ball is collided in left or right boundary
    if (ball.x <= 0) {
      ball.vx = Math.abs(ball.vx * ballRestitution);
    } else if (ball.x + ball.r * 2 > areaWidth) {
      ball.vx = -Math.abs(ball.vx * ballRestitution);
    }

    // Checks if the ball is collided in top or bottom boundary
    if (ball.y < 0) {
      ball.vy = Math.abs(ball.vy * ballRestitution);
    } else if (ball.y + ball.width > areaHeight) {
      ball.vy = -Math.abs(ball.vy * ballRestitution);
    }
  }
}

class Ball {
  constructor(x, y, vx, vy, r = 10) {
    //r=15
    this.width = r * 2; //width of the circle
    this.height = r * 2; // height of the circle
    this.r = r; // radius
    this.x = x; // x-axis position
    this.y = y; // y-axis position
    this.vx = vx; // horizontal velocity
    this.vy = vy; //vertical velocity
    this.collisionStatus = false;

    // Creates a div element
    this.ball = document.createElement("div");

    // Sets the random background color for circle
    this.ball.style.backgroundColor = getRandomColor();

    // Adds the circle inside the box
    area.appendChild(this.ball);
  }

  // Draws the circle inside the box
  create() {
    this.ball.style.width = this.width + "px";
    this.ball.style.height = this.height + "px";
    this.ball.style.borderRadius = "50%";
    this.ball.style.position = "absolute";
    this.ball.style.top = this.y + "px";
    this.ball.style.left = this.x + "px";
  }

  // Updates the position of the circle
  positionUpdate(sec) {
    this.x += this.vx * sec;
    this.y += this.vy * sec;

    this.ball.style.top = this.y + "px";
    this.ball.style.left = this.x + "px";
  }
}

/*
 * Generates specified number of balls with random balls
 * num = Number
 */
function generateBalls(num) {
  let ballsArray = [];
  for (let i = 0; i < num; i++) {
    ballsArray.push(
      new Ball(
        getRandomFromRange(0, areaWidth),
        getRandomFromRange(0, areaHeight),
        getRandomFromRange(-60, 40),
        getRandomFromRange(-60, 40),
        getRandomFromRange(10, 25)
      )
    );
  }

  return ballsArray;
}

// Generates random balls
const balls = generateBalls(getRandomFromRange(50, 100));

// Draws the balls inside the box
balls.forEach((ball) => ball.create());

/*
 * Checks for collision between balls
 * Checks for collision of balls with boundary
 * Updates the velocity and position of the balls
 * Loops again
 */
function start() {
  ballCollisionStatus();
  balls.forEach((ball) => wallCollisionStatus(ball));
  balls.forEach((ball) => ball.positionUpdate(0.05));
  //balls.forEach((ball) => ball.draw());
  window.requestAnimationFrame(() => start());
}

start();
