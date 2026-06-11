let currentShell = null;
let account = null;
let player;
let input = { left: false, right: false, jump: false };

window.onload = () => {
  account = loadAccount();
  renderShellSelect();
};

function renderShellSelect() {
  const list = document.getElementById('shellList');
  list.innerHTML = '';

  const starters = getStarterShells();

  starters.forEach(shell => {
    const btn = document.createElement('div');
    btn.className = 'shellButton';
    btn.textContent = `${shell.name} — ${shell.role}`;
    btn.onclick = () => selectShell(shell.id);
    list.appendChild(btn);
  });
}

function selectShell(shellId) {
  currentShell = getShell(shellId);
  account.selectedShell = shellId;
  saveAccount(account);

  document.getElementById('shellSelect').style.display = 'none';
  startTestRoom();
}

function startTestRoom() {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  player = new Player(currentShell, 200, 200);

  window.onkeydown = (e) => {
    if (e.key === 'a') input.left = true;
    if (e.key === 'd') input.right = true;
    if (e.key === 'w') input.jump = true;
  };

  window.onkeyup = (e) => {
    if (e.key === 'a') input.left = false;
    if (e.key === 'd') input.right = false;
    if (e.key === 'w') input.jump = false;
  };

  function loop() {
    ctx.fillStyle = '#101018';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    player.update(input);
    player.draw(ctx);

    requestAnimationFrame(loop);
  }

  loop();
}

