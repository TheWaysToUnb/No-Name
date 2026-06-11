// abilities.js
// Core ability engine for projectiles, dashes, deployables, drones, melee, and blinks.

const ACTIVE_PROJECTILES = [];
const ACTIVE_DEPLOYABLES = [];
const ACTIVE_DRONES = [];
const ABILITY_COOLDOWNS = {};

function canUseAbility(id) {
  const now = performance.now();
  return !ABILITY_COOLDOWNS[id] || now > ABILITY_COOLDOWNS[id];
}

function setCooldown(id, ms) {
  ABILITY_COOLDOWNS[id] = performance.now() + ms;
}

/* -------------------------
   PROJECTILE TEMPLATE
--------------------------*/
class Projectile {
  constructor(x, y, vx, vy, damage, color = 'cyan') {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.damage = damage;
    this.color = color;
    this.size = 6;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}

/* -------------------------
   DASH TEMPLATE
--------------------------*/
function performDash(player, power = 12) {
  player.vx = (player.facingRight ? 1 : -1) * power;
  player.vy = 0;
}

/* -------------------------
   BLINK TEMPLATE
--------------------------*/
function performBlink(player, distance = 120) {
  player.x += (player.facingRight ? 1 : -1) * distance;
}

/* -------------------------
   MELEE TEMPLATE
--------------------------*/
function performMelee(player) {
  // simple hitbox for now
  return {
    x: player.x + (player.facingRight ? 32 : -32),
    y: player.y + 10,
    w: 32,
    h: 32
  };
}

/* -------------------------
   DEPLOYABLE TEMPLATE
--------------------------*/
class Deployable {
  constructor(x, y, color = 'green') {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = 20;
  }

  update() {}

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}

/* -------------------------
   DRONE TEMPLATE
--------------------------*/
class Drone {
  constructor(player) {
    this.player = player;
    this.x = player.x;
    this.y = player.y - 40;
    this.color = 'yellow';
  }

  update() {
    // hover near player
    this.x += (this.player.x - this.x) * 0.1;
    this.y += (this.player.y - 60 - this.y) * 0.1;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, 16, 16);
  }
}

/* -------------------------
   ABILITY REGISTRY
--------------------------*/
const ABILITY_HANDLERS = {
  hydro_particles(player) {
    if (!canUseAbility('hydro_particles')) return;
    setCooldown('hydro_particles', 120);

    const speed = player.facingRight ? 6 : -6;
    ACTIVE_PROJECTILES.push(new Projectile(player.x, player.y + 20, speed, 0, 5, 'aqua'));

    // propulsion
    player.vx -= speed * 0.15;
  },

  steam_burst(player) {
    if (!canUseAbility('steam_burst')) return;
    setCooldown('steam_burst', 800);
    // AoE handled later
  },

  hydro_dash(player) {
    if (!canUseAbility('hydro_dash')) return;
    setCooldown('hydro_dash', 900);
    performDash(player, 14);
  },

  gear_shield(player) {
    if (!canUseAbility('gear_shield')) return;
    setCooldown('gear_shield', 1500);
    player.armorBoost = 1.5;
    setTimeout(() => player.armorBoost = 1.0, 1000);
  },

  overcrank(player) {
    if (!canUseAbility('overcrank')) return;
    setCooldown('overcrank', 3000);
    player.speedBoost = 1.4;
    setTimeout(() => player.speedBoost = 1.0, 1500);
  },

  bio_bolt(player) {
    if (!canUseAbility('bio_bolt')) return;
    setCooldown('bio_bolt', 200);
    const speed = player.facingRight ? 5 : -5;
    ACTIVE_PROJECTILES.push(new Projectile(player.x, player.y + 20, speed, 0, 4, 'lime'));
  },

  coral_drone(player) {
    if (!canUseAbility('coral_drone')) return;
    setCooldown('coral_drone', 5000);
    ACTIVE_DRONES.push(new Drone(player));
  },

  reef_turret(player) {
    if (!canUseAbility('reef_turret')) return;
    setCooldown('reef_turret', 6000);
    ACTIVE_DEPLOYABLES.push(new Deployable(player.x, player.y, 'teal'));
  },

  void_slash(player) {
    if (!canUseAbility('void_slash')) return;
    setCooldown('void_slash', 300);
    return performMelee(player);
  },

  rift_step(player) {
    if (!canUseAbility('rift_step')) return;
    setCooldown('rift_step', 1200);
    performBlink(player, 140);
  },

  abyssal_dive(player) {
    if (!canUseAbility('abyssal_dive')) return;
    setCooldown('abyssal_dive', 2000);
    player.vy = 12;
  }
};
