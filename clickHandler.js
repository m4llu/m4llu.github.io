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

      icon.addEventListener('dblclick', () => {
          clearTimeout(clickTimeout);
          openWindow(icon.dataset.window);
      });
  });
}

function deselectAllIcons() {
  document.querySelectorAll('.icon.selected').forEach(icon => icon.classList.remove('selected'));
}

function openWindow(id) {
  const windowElement = document.getElementById(id);
  if (windowElement) {
      windowElement.style.display = 'flex';
      bringWindowToFront(windowElement);  // from draggable.js
      closeStartMenu();                   // from menu.js
  }
}
