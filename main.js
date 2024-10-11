window.onload = () => {
  initDraggableAndResizableWindows();  // Initialize draggable and resizable windows
  handleIconClicks();                  // Handle clicks on desktop icons
  updateClock();                        // Start the clock
  setInterval(updateClock, 60000);      // Update the clock every minute
  initContextMenu();                    // Initialize the right-click context menu
};
