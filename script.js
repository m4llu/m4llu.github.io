// Toggle the start menu display
function toggleStartMenu() {
    const startMenu = document.getElementById('start-menu');

    // If the menu is open (either 'opening' or 'opened'), close it
    if (startMenu.classList.contains('opened') || startMenu.classList.contains('opening')) {
        closeStartMenu();
    } else {
        // Open the menu
        startMenu.classList.remove('closing');
        startMenu.classList.add('opening');
        startMenu.style.height = '600px';  // Ensure the menu stays open
        startMenu.style.opacity = '1';  // Make the menu fully visible
    }
}

// Add 'opened' class to sidebar on mouse enter
function openSidebar() {
    const sidebar = document.getElementById('sidebar-wrapper');
    sidebar.classList.add('opened');
}
// Close the sidebar on mouse leaved
function closeSidebar() {
    const sidebar = document.getElementById('sidebar-wrapper');
    sidebar.classList.remove('opened');
}

// Close the start menu
function closeStartMenu() {
    const startMenu = document.getElementById('start-menu');
    if (startMenu.classList.contains('opened') || startMenu.classList.contains('opening')) {
        startMenu.classList.remove('opening');
        startMenu.classList.add('closing');
        startMenu.style.height = '0';  // Animate closing
        startMenu.style.opacity = '0';  // Fade out
    }
}

// Close a specific window
function closeWindow(id) {
    const windowElement = document.getElementById(id);
    if (windowElement) {
        windowElement.style.display = 'none';  // Hide the window
    }
}

// Enable window dragging functionality
function makeWindowDraggable(windowElement) {
    const titleBar = windowElement.querySelector('.window-title-bar');
    let offsetX = 0, offsetY = 0, isDragging = false;

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
        }
    });

    document.addEventListener('mouseup', () => isDragging = false);
}

// Bring the window to the front by increasing its z-index
function bringWindowToFront(windowElement) {
    windowElement.style.zIndex = getMaxZIndex() + 1;
}

// Initialize draggable windows
function initDraggableWindows() {
    document.querySelectorAll('.window').forEach(makeWindowDraggable);
}

// Handle single-click and double-click events on icons
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

// Deselect all icons
function deselectAllIcons() {
    document.querySelectorAll('.icon.selected').forEach(icon => icon.classList.remove('selected'));
}

// Open a window
function openWindow(id) {
    const windowElement = document.getElementById(id);
    if (windowElement) {
        windowElement.style.display = 'flex';
        bringWindowToFront(windowElement);
        closeStartMenu(); // Close the start menu if open
    }
}

// Get the highest z-index among windows
function getMaxZIndex() {
    return Math.max(...Array.from(document.querySelectorAll('.window')).map(el => parseInt(window.getComputedStyle(el).zIndex) || 0));
}

// Update the taskbar clock
function updateClock() {
    const now = new Date();
    document.getElementById('clock').textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Set up initial functionality on page load
window.onload = () => {
    initDraggableWindows();
    handleIconClicks();
    updateClock();
    setInterval(updateClock, 60000); // Update clock every minute
};

// Close the start menu when clicking outside
document.addEventListener('click', (event) => {
    const startMenu = document.getElementById('start-menu');
    const startButton = document.querySelector('.start-button');

    // Close the start menu if clicking outside of it and the start button
    if (!startMenu.contains(event.target) && !startButton.contains(event.target)) {
        closeStartMenu();
    }
});

// Close a window when clicking the close button
document.addEventListener('click', (event) => {
    const closeButton = event.target.closest('.window-close-btn');
    if (closeButton) {
        const windowId = closeButton.dataset.windowId;
        closeWindow(windowId);  // Close the window associated with the button
    }
});
