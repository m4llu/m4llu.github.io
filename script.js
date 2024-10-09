// Toggle the start menu display
function toggleStartMenu() {
    var startMenu = document.getElementById('start-menu');
    if (startMenu.style.display === 'block') {
        startMenu.style.display = 'none';
    } else {
        startMenu.style.display = 'block';
    }
}

// Open a window
function openWindow(id) {
    var windowElement = document.getElementById(id);
    windowElement.style.display = 'flex';
    windowElement.style.zIndex = getMaxZIndex() + 1;
    // Close the start menu if it's open
    document.getElementById('start-menu').style.display = 'none';
}

// Close a window
function closeWindow(id) {
    var windowElement = document.getElementById(id);
    windowElement.style.display = 'none';
}

// Get the highest z-index among windows
function getMaxZIndex() {
    var elements = document.getElementsByClassName('window');
    var max = 0;
    for (var i = 0; i < elements.length; i++) {
        var zIndex = parseInt(window.getComputedStyle(elements[i]).zIndex) || 0;
        if (zIndex > max) {
            max = zIndex;
        }
    }
    return max;
}

// Update the taskbar clock
function updateClock() {
    var now = new Date();
    var clock = document.getElementById('clock');
    var options = { hour: '2-digit', minute: '2-digit' };
    clock.textContent = now.toLocaleTimeString([], options);
}

// Update clock every minute
setInterval(updateClock, 60000);
updateClock();

// Close the start menu when clicking outside
document.addEventListener('click', function(event) {
    var isClickInside = document.getElementById('start-menu').contains(event.target) || document.getElementsByClassName('start-button')[0].contains(event.target);

    if (!isClickInside) {
        document.getElementById('start-menu').style.display = 'none';
    }
});
