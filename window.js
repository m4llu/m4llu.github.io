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

function openWindow(id) {
  const windowElement = document.getElementById(id);
  if (windowElement) {
      windowElement.style.display = 'flex';
      bringWindowToFront(windowElement);  // from draggable.js
      closeStartMenu();                   // from menu.js
      toggleMaximizeRestoreButtons(windowElement.id);
  }
}

function maximizeWindow(id) {
  const windowElement = document.getElementById(id);
  if (windowElement) {
    windowElement.dataset.originalStyle = windowElement.getAttribute('style') || '';
    windowElement.style.top = '0';
    windowElement.style.left = '0';
    windowElement.style.width = `${window.innerWidth}px`;  // Set window width to viewport width in pixels
    windowElement.style.height = `${window.innerHeight}px`;  // Set window height to viewport height in pixels
    bringWindowToFront(windowElement);
    toggleMaximizeRestoreButtons(windowElement.id);
  }
}

function toggleMaximizeRestoreButtons(id) {
  const window = document.getElementById(id);
  const maximizeButton = window.querySelector('.maximize-button');
  const restoreButton = window.querySelector('.restore-button');
  
  if (maximizeButton && restoreButton) {
    if (window.innerWidth === '100vw' && window.innerHeight === '100vh') {
      maximizeButton.style.display = 'none'; // Hide maximize button
      restoreButton.style.display = 'block'; // Show restore button
    } else {
      maximizeButton.style.display = 'block'; // Show maximize button
      restoreButton.style.display = 'none'; // Hide restore button
    }
  }
}


function restoreWindow(id) {
  const windowElement = document.getElementById(id);
  if (windowElement && windowElement.dataset.originalStyle) {
    windowElement.setAttribute('style', windowElement.dataset.originalStyle);
    delete windowElement.dataset.originalStyle;
    bringWindowToFront(windowElement);
    toggleMaximizeRestoreButtons(windowElement.id);
  }
}

function minimizeWindow(id) {
  const windowElement = document.getElementById(id);
  if (windowElement) {
    windowElement.style.display = 'none'; // Hide the window
  }
}
