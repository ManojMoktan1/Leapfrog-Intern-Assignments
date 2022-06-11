const area = document.createElement("div");
const htmlBody = document.getElementsByTagName("body")[0];

let areaWidth = 1000;
let areaHeight = 500;

area.style.width = areaWidth + "px";
area.style.height = areaHeight + "px";
area.style.border = "2px solid black";
area.style.position = "relative";
area.style.overflow = "hidden";
htmlBody.appendChild(area);

function ballCollision(x1, y1, r1, x2, y2, r2) {
  let distanceSquare = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
  let radiusSquare = (r1 + r2) * (r1 + r2);
  return distanceSquare <= radiusSquare;
}

function alterDirection(ball1, ball2) {
  let vectorCollision = {
    x: ball2.x - ball1.x,
    y: ball2.y - ball1.y,
  };

  let distance = Math.sqrt(
    (ball2.x - ball1.x) * (ball2.x - ball1.x) +
      (ball2.y - ball1.y) * (ball2.y - ball1.y)
  );

  let collideDirection = {
    x: vectorCollision.x / distance,
    y: vectorCollision.y / distance,
  };

  let relativeVelocity = {
    x: ball1.vx - ball2.vx,
    y: ball1.vy - ball2.vy,
  };

  let speed =
    relativeVelocity.x * collideDirection.x +
    relativeVelocity.y * collideDirection.y;

  return { speed, collideDirection };
}

function ballCollisionStatus() {
  for (let i = 0; i < balls.length; i++) {
    balls[i].collisionStatus = false;
  }

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

        if (speed < 0) {
          break;
        }

        balls[i].vx -= speed * collideDirection.x;
        balls[i].vy -= speed * collideDirection.y;
        balls[j].vx += speed * collideDirection.x;
        balls[j].vy += speed * collideDirection.y;
      }
    }
  }
}

function wallCollisionStatus() {
  let ball;
  let ballRestitution = 1;
  for (let i = 0; i < balls.length; i++) {
    ball = balls[i];

    if (ball.x <= 0) {
      ball.vx = Math.abs(ball.vx * ballRestitution);
    } else if (ball.x + ball.r * 2 > areaWidth) {
      ball.vx = -Math.abs(ball.vx * ballRestitution);
    }

    if (ball.y < 0) {
      ball.vy = Math.abs(ball.vy * ballRestitution);
    } else if (ball.y + ball.width > areaHeight) {
      ball.vy = -Math.abs(ball.vy * ballRestitution);
    }
  }
}

class Ball {
  constructor(x, y, vx, vy, r = 10) {
    this.width = r * 2;
    this.height = r * 2;
    this.r = r;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.collisionStatus = false;

    this.ball = document.createElement("div");

    this.ball.style.backgroundColor = getRandomColor();

    area.appendChild(this.ball);
  }

  create() {
    this.ball.style.width = this.width + "px";
    this.ball.style.height = this.height + "px";
    this.ball.style.borderRadius = "50%";
    this.ball.style.position = "absolute";
    this.ball.style.top = this.y + "px";
    this.ball.style.left = this.x + "px";
  }

  positionUpdate(sec) {
    this.x += this.vx * sec;
    this.y += this.vy * sec;

    this.ball.style.top = this.y + "px";
    this.ball.style.left = this.x + "px";
  }
}

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

const balls = generateBalls(getRandomFromRange(50, 100));

balls.forEach((ball) => ball.create());

function start() {
  ballCollisionStatus();
  balls.forEach((ball) => wallCollisionStatus(ball));
  balls.forEach((ball) => ball.positionUpdate(0.05));
  window.requestAnimationFrame(() => start());
}

start();
