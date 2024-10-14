export const title = "Settings";

export const content = `
  <div>
    <h1>Settings</h1>
    <section style="opacity: 0.5;"> 
      <h2>Theme</h2>
      <select id="theme-select">
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
      </section>
      <section>
      <h2>Wallpaper</h2>
      <div class="wallpaper-selector">
        <div class="wallpaper-preview" onclick="setWallpaper('./assets/wallpapers/wallpaper.jpg')">
          <img src="./assets/wallpapers/wallpaper.jpg" alt="Wallpaper 1">
        </div>
        <div class="wallpaper-preview" onclick="setWallpaper('./assets/wallpapers/wallpaper1.png')">
          <img src="./assets/wallpapers/wallpaper1.png" alt="Wallpaper 2">
        </div>
      </div>
    </section>
  </div>
`;

const desktop = document.getElementById('desktop');
export function setWallpaper(wallpaper) {
  localStorage.setItem('wallpaper', wallpaper);
  desktop.style.backgroundImage = `url(${wallpaper})`;
}

export function getCurrentWallpaper() {
  return localStorage.getItem('wallpaper') || './assets/wallpapers/wallpaper.jpg';
}

window.setWallpaper = setWallpaper;

export function initializeSettings() {
  const currentWallpaper = getCurrentWallpaper();
  setWallpaper(currentWallpaper);

  const themeSelect = document.getElementById('theme-select');
  themeSelect.addEventListener('change', (event) => {
    const theme = event.target.value;
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  });
}
