function initContextMenu() {
  const desktop = document.getElementById('desktop');
  const contextMenu = document.getElementById('context-menu');
  const newFileOption = document.getElementById('new-file');

  if (!desktop || !contextMenu || !newFileOption) {
      console.error("Desktop or context menu elements are missing!");
      return;
  }

  // Disable the default right-click context menu
  desktop.addEventListener('contextmenu', function (e) {
      e.preventDefault();  // Prevent the default context menu

      const x = e.clientX;
      const y = e.clientY;

      // Position the custom context menu where the right-click happened
      contextMenu.style.left = `${x}px`;
      contextMenu.style.top = `${y}px`;

      contextMenu.style.display = 'block';
  });

  document.addEventListener('click', function () {
      contextMenu.style.display = 'none';
  });

  newFileOption.addEventListener('click', function () {
      createNewFile();
      contextMenu.style.display = 'none';
  });

  function createNewFile() {
      let fileName = getUniqueFileName() + '.txt';
      
      const newFile = document.createElement('div');
      newFile.classList.add('icon');
      newFile.dataset.program = 'notepad';
      newFile.style.top = '100px';
      newFile.style.left = '100px'; 
      newFile.innerHTML = `
          <img src="./assets/icons/txt.png" alt="${fileName}">
          <span class="file-name">${fileName}</span>
      `;
      
      desktop.appendChild(newFile);
    console.log('file created', newFile);
    handleIconClicks();
      const fileNameElement = newFile.querySelector('.file-name');

      fileNameElement.addEventListener('dblclick', function () {
          const input = document.createElement('textarea');
          input.maxLength = 20;
          input.minLength = 1;
          input.wrap = 'hard';
          input.value = fileNameElement.textContent;
          fileNameElement.replaceWith(input);
          input.focus();

          input.addEventListener('blur', function () {
              const newFileName = input.value;
              fileNameElement.textContent = newFileName;
              input.replaceWith(fileNameElement);
          });

          input.addEventListener('keydown', function (e) {
              if (e.key === 'Enter') {
                  input.blur();
              }
          });
      });
  }

  function getUniqueFileName() {
      const existingFileNames = Array.from(desktop.querySelectorAll('.file-name')).map(el => el.textContent);
      let baseName = "New File";
      let index = 1;
      let uniqueName = baseName;

      // Check if the name already exists and increment the index until a unique name is found
      while (existingFileNames.includes(uniqueName)) {
          uniqueName = `${baseName} (${index})`;
          index++;
      }

      return uniqueName;
  }
}
