function handleIconClicks() {
  let clickTimeout;

  document.querySelectorAll('.icon').forEach((icon) => {
    icon.addEventListener('click', () => {
      clearTimeout(clickTimeout);

      clickTimeout = setTimeout(() => {
        deselectAllIcons();
        icon.classList.add('selected');
      }, 100);
    });

    icon.addEventListener('click', () => {
      clearTimeout(clickTimeout);

      clickTimeout = setTimeout(() => {
        deselectAllIcons();
        icon.classList.add('selected');
      }, 100);
    });

    icon.addEventListener('dblclick', () => {
      const program = icon.dataset.program;
      openProgram(program); // Pass the program ID directly
    });
  });
}

function deselectAllIcons() {
  document.querySelectorAll('.icon.selected').forEach(icon => icon.classList.remove('selected'));
}

document.querySelector('.taskbar').addEventListener('click', (event) => {
  event.stopPropagation();
});

document.querySelectorAll('.taskbar-icon').forEach((icon) => {
  icon.addEventListener('click', (event) => {
      event.stopPropagation(); 
      openWindow(icon.dataset.window);
  });
});

document.querySelector('.desktop').addEventListener('click', (event) => {
  if (event.clientY > window.innerHeight - 50) {
    deselectAllIcons();
    toggleStartMenu();  }
  else {
    closeStartMenu();
  }
});

