const SHELLS = {
  hydroflare: {
    id: 'hydroflare',
    name: 'Hydroflare',
    order: 1,
    role: 'aggressive_dps',
    theme: 'deep_sea_biotech',
    baseStats: { hp: 110, speed: 1.25, jump: 1.0, armor: 0.9 },
    abilities: {
      primary: { id: 'hydro_particles', name: 'Incendiary Water Stream', type: 'projectile' },
      ability1: { id: 'steam_burst', name: 'Steam Burst', type: 'cone_aoe' },
      ability2: { id: 'hydro_dash', name: 'Hydro Dash', type: 'dash' }
    }
  },

  bulwark_core: {
    id: 'bulwark_core',
    name: 'Bulwark Core',
    order: 2,
    role: 'tank',
    theme: 'clockwork_steampunk',
    baseStats: { hp: 160, speed: 0.9, jump: 0.9, armor: 1.3 },
    abilities: {
      primary: { id: 'gear_slam', name: 'Gear Slam', type: 'melee' },
      ability1: { id: 'gear_shield', name: 'Gear Shield', type: 'shield' },
      ability2: { id: 'overcrank', name: 'Overcrank', type: 'buff' }
    }
  },

  bio_synth_engineer: {
    id: 'bio_synth_engineer',
    name: 'Bio‑Synth Engineer',
    order: 3,
    role: 'support_control',
    theme: 'deep_sea_biotech',
    baseStats: { hp: 120, speed: 1.0, jump: 1.0, armor: 1.0 },
    abilities: {
      primary: { id: 'bio_bolt', name: 'Bio Bolt', type: 'projectile' },
      ability1: { id: 'coral_drone', name: 'Coral Drone', type: 'pet' },
      ability2: { id: 'reef_turret', name: 'Reef Turret', type: 'deployable' }
    }
  },

  nightglider: {
    id: 'nightglider',
    name: 'Nightglider',
    order: 4,
    role: 'assassin',
    theme: 'cosmic_horror',
    baseStats: { hp: 95, speed: 1.35, jump: 1.2, armor: 0.8 },
    abilities: {
      primary: { id: 'void_slash', name: 'Void Slash', type: 'melee' },
      ability1: { id: 'rift_step', name: 'Rift Step', type: 'blink' },
      ability2: { id: 'abyssal_dive', name: 'Abyssal Dive', type: 'slam_aoe' }
    }
  }
};

function getShell(id) {
  return SHELLS[id] || null;
}

function getStarterShells() {
  return Object.values(SHELLS).sort((a, b) => a.order - b.order);
}
