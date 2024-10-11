window.onload = () => {
  initDraggableAndResizableWindows();
  handleIconClicks();   
  updateClock();
  setInterval(updateClock, 60000); 
};
