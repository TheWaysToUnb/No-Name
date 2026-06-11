// enemies.js
// Basic enemy framework: AI, health, collisions, damage, rendering.

const ACTIVE_ENEMIES = [];

class Enemy {
  constructor(x, y, type = 'grunt') {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;

    this.width = 32;
    this.height = 40;

    this.type = type;
    this.color = type === 'grunt' ? 'red' : 'purple';

    this.hp = 40;
    this.speed = 1.0;
    this.onGround = false;

    this.state = 'idle'; // idle, chase, patrol
    this.dir = 1; // for patrol
  }

  update(player) {
    // simple gravity
    this.vy += 0.4;
    if (this.vy > 10) this.vy = 10;

    // basic AI
    const dist = player.x - this.x;

    if (Math.abs(dist) < 250) {
      this.state = 'chase';
    } else {
      this.state = 'patrol';
    }

    if (this.state === 'chase') {
      this.vx = dist > 0 ? this.speed : -this.speed;
    }

    if (this.state === 'patrol') {
      this.vx = this.dir * this.speed * 0.6;
      if (Math.random() < 0.01) this.dir *= -1;
    }

    // apply movement
    this.x += this.vx;
    this.y += this.vy;

    // ground collision
    if (this.y > 400) {
      this.y = 400;
      this.vy = 0;
      this.onGround = true;
    }
  }

  takeDamage(amount) {
    this.hp -= amount;
    if (this.hp <= 0) {
      const index = ACTIVE_ENEMIES.indexOf(this);
      if (index !== -1) ACTIVE_ENEMIES.splice(index, 1);
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // health bar
    ctx.fillStyle = 'white';
    ctx.fillRect(this.x, this.y - 6, this.width, 4);

    ctx.fillStyle = 'lime';
    const hpWidth = (this.hp / 40) * this.width;
    ctx.fillRect(this.x, this.y - 6, hpWidth, 4);
  }
}

/* -------------------------
   ENEMY SPAWNER
--------------------------*/
function spawnEnemy(x, y, type = 'grunt') {
  ACTIVE_ENEMIES.push(new Enemy(x, y, type));
}
