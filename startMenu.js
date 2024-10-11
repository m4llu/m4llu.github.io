function toggleStartMenu() {
  const startMenu = document.getElementById('start-menu');

  if (startMenu.classList.contains('opened') || startMenu.classList.contains('opening')) {
      closeStartMenu();
  } else {
      startMenu.classList.remove('closing');
      startMenu.classList.add('opening');
      startMenu.style.height = '600px';
      startMenu.style.opacity = '1';
  }
}

function closeStartMenu() {
  const startMenu = document.getElementById('start-menu');
  if (startMenu.classList.contains('opened') || startMenu.classList.contains('opening')) {
      startMenu.classList.remove('opening');
      startMenu.classList.add('closing');
      startMenu.style.height = '0';
      startMenu.style.opacity = '0';
  }
}

document.addEventListener('mousemove', (event) => {
  if (event.clientX > 250) {
    closeSidebar();
  }
});

function openSidebar() {
  const sidebar = document.getElementById('sidebar-wrapper');
  sidebar.classList.add('opened');
  sidebar.classList.remove('closed');
}

function closeSidebar() {
  const sidebar = document.getElementById('sidebar-wrapper');
  sidebar.classList.remove('opened');
  sidebar.classList.add('closed');
}
