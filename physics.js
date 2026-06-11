const GRAVITY = 0.45;
const FRICTION = 0.82;
const MAX_FALL_SPEED = 12;

class Player {
  constructor(shellData, x, y) {
    this.shell = shellData;
    this.x = x;
    this.y = y;

    this.vx = 0;
    this.vy = 0;

    this.width = 32;
    this.height = 48;

    this.onGround = false;
  }

  update(input) {
    if (input.left) this.vx -= 0.5 * this.shell.baseStats.speed;
    if (input.right) this.vx += 0.5 * this.shell.baseStats.speed;

    if (input.jump && this.onGround) {
      this.vy = -10 * this.shell.baseStats.jump;
      this.onGround = false;
    }

    this.vy += GRAVITY;
    if (this.vy > MAX_FALL_SPEED) this.vy = MAX_FALL_SPEED;

    this.vx *= FRICTION;

    this.x += this.vx;
    this.y += this.vy;

    if (this.y > 400) {
      this.y = 400;
      this.vy = 0;
      this.onGround = true;
    }
  }

  draw(ctx) {
    ctx.fillStyle = 'cyan';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

