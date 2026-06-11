const DEFAULT_ACCOUNT = {
  username: 'guest',
  selectedShell: null,
  level: 1,
  xp: 0,
  unlockedShells: ['hydroflare', 'bulwark_core', 'bio_synth_engineer', 'nightglider'],
  devFlags: {}
};

function loadAccount() {
  const raw = localStorage.getItem('account');
  return raw ? JSON.parse(raw) : DEFAULT_ACCOUNT;
}

function saveAccount(acc) {
  localStorage.setItem('account', JSON.stringify(acc));
}

function login(username, password) {
  if (username === 'dev' && password === 'devpass') {
    return {
      username: 'dev',
      selectedShell: 'hydroflare',
      level: 100,
      xp: 999999,
      unlockedShells: Object.keys(SHELLS),
      devFlags: { godMode: true, skipPortalLock: true }
    };
  }
  return DEFAULT_ACCOUNT;
}

