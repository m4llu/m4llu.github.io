function makeWindowDraggableAndResizable(windowElement) {
  const titleBar = windowElement.querySelector('.window-title-bar');
  
  // Dynamically create the resizer div and add it to the windowElement
  const resizer = document.createElement('div');
  resizer.classList.add('resizer', 'bottom-right');
  windowElement.appendChild(resizer); // Append resizer to the window
  
  let offsetX = 0, offsetY = 0, isDragging = false, isResizing = false;

  // Dragging functionality
  titleBar.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - windowElement.offsetLeft;
    offsetY = e.clientY - windowElement.offsetTop;
    bringWindowToFront(windowElement);
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      windowElement.style.left = `${e.clientX - offsetX}px`;
      windowElement.style.top = `${e.clientY - offsetY}px`;
    } else if (isResizing) {
      const newWidth = e.clientX - windowElement.offsetLeft;
      const newHeight = e.clientY - windowElement.offsetTop;
      windowElement.style.width = `${newWidth}px`;
      windowElement.style.height = `${newHeight}px`;
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    isResizing = false;
  });

  // Resizing functionality
  resizer.addEventListener('mousedown', (e) => {
    isResizing = true;
    e.stopPropagation(); // Prevent drag event when resizing
  });
}

function bringWindowToFront(windowElement) {
  windowElement.style.zIndex = getMaxZIndex() + 1;
}

function getMaxZIndex() {
  return Math.max(...Array.from(document.querySelectorAll('.window')).map(el => parseInt(window.getComputedStyle(el).zIndex) || 0));
}

function initDraggableAndResizableWindows() {
  document.querySelectorAll('.window').forEach(makeWindowDraggableAndResizable);
}

function closeWindow(id) {
  const windowElement = document.getElementById(id);
  if (windowElement) {
    windowElement.style.display = 'none'; // Hide the window
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initDraggableAndResizableWindows();
});
