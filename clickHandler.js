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
