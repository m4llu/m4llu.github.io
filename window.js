function createWindow(programId, title, content) {
  let windowElement = document.getElementById(programId);

  if (!windowElement) {
    windowElement = document.createElement('div');
    windowElement.classList.add('window');
    windowElement.id = programId;

    windowElement.innerHTML = `
      <div class="window-title-bar">
        <span>${title}</span>
        <div class="window-controls">
          <button onclick="minimizeWindow('${programId}')">🗕</button>
          <button class="maximize-button" onclick="maximizeWindow('${programId}')">🗖</button>
          <button class="restore-button" style="display: none;" onclick="restoreWindow('${programId}')">🗗</button>
          <button class="button-close" onclick="closeWindow('${programId}')">✕</button>
        </div>
      </div>
      <div class="window-content">${content}</div>
    `;

    // Add the window to the desktop
    document.getElementById('desktop').appendChild(windowElement);
    makeWindowDraggableAndResizable(windowElement);  // Ensure draggable and resizable
  }

  // Show the window and bring it to the front
  windowElement.style.display = 'flex';
  bringWindowToFront(windowElement);
  toggleMaximizeRestoreButtons(programId);
}

async function openProgram(programId) {
  let existingWindow = document.getElementById(programId);

  if (!existingWindow) {
    let title, content;
    try {
      const module = await import(`./js/apps/${programId}.js`);
      title = module.title;
      content = module.content;
    } catch (error) {
      console.error(`Failed to load program ${programId}:`, error);
      return;
    }
    createWindow(programId, title, content);
  } else {
    existingWindow.style.display = 'flex';
    bringWindowToFront(existingWindow);
  }
}

function makeWindowDraggableAndResizable(windowElement) {
  const titleBar = windowElement.querySelector('.window-title-bar');
  
  const resizer = document.createElement('div');
  resizer.classList.add('resizer', 'bottom-right');
  windowElement.appendChild(resizer);
  
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
      windowElement.style.left = (e.clientX - offsetX) + 'px';
      windowElement.style.top = (e.clientY - offsetY) + 'px';
    } else if (isResizing) {
      const newWidth = e.clientX - windowElement.offsetLeft;
      const newHeight = e.clientY - windowElement.offsetTop;
      windowElement.style.width = newWidth + 'px';
      windowElement.style.height = newHeight + 'px';
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

function getMaxZIndex() {
  const elements = document.querySelectorAll('.window');
  let maxZ = 0;

  elements.forEach(element => {
    const zIndex = parseInt(window.getComputedStyle(element).zIndex, 10);
    if (zIndex > maxZ) {
      maxZ = zIndex;
    }
  });

  return maxZ;
}

function bringWindowToFront(windowElement) {
  windowElement.style.zIndex = getMaxZIndex() + 1;
}

function initDraggableAndResizableWindows() {
  document.querySelectorAll('.window').forEach(makeWindowDraggableAndResizable);
}

function closeWindow(id) {
  const windowElement = document.getElementById(id);
  if (windowElement) {
    windowElement.style.display = 'none';
  }
}

function openWindow(id) {
  const windowElement = document.getElementById(id);
  if (windowElement) {
      windowElement.style.display = 'flex';
      bringWindowToFront(windowElement);
      closeStartMenu();
      toggleMaximizeRestoreButtons(windowElement.id);
  }
}

function closeWindow(id) {
  const windowElement = document.getElementById(id);
  if (windowElement) {
    windowElement.style.display = 'none';
  }
}

function maximizeWindow(id) {
  const windowElement = document.getElementById(id);
  if (windowElement) {
    windowElement.dataset.originalStyle = windowElement.getAttribute('style') || '';
    windowElement.style.top = '0';
    windowElement.style.left = '0';
    windowElement.style.width = `${window.innerWidth}px`;
    windowElement.style.height = `${window.innerHeight}px`;
    bringWindowToFront(windowElement);
    toggleMaximizeRestoreButtons(id);
  }
}

function restoreWindow(id) {
  const windowElement = document.getElementById(id);
  if (windowElement && windowElement.dataset.originalStyle) {
    windowElement.setAttribute('style', windowElement.dataset.originalStyle);
    delete windowElement.dataset.originalStyle;
    bringWindowToFront(windowElement);
    toggleMaximizeRestoreButtons(id);
  }
}

function minimizeWindow(id) {
  const windowElement = document.getElementById(id);
  if (windowElement) {
    windowElement.style.display = 'none';
  }
}

function toggleMaximizeRestoreButtons(id) {
  const windowElement = document.getElementById(id);
  const maximizeButton = windowElement.querySelector('.maximize-button');
  const restoreButton = windowElement.querySelector('.restore-button');

  if (windowElement.style.width === `${window.innerWidth}px` && windowElement.style.height === `${window.innerHeight}px`) {
    maximizeButton.style.display = 'none';
    restoreButton.style.display = 'block';
  } else {
    maximizeButton.style.display = 'block';
    restoreButton.style.display = 'none';
  }
}

