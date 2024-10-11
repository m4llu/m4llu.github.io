class FileManager {
  constructor() {
    this.files = [];
  }

  createFile(name, content = '') {
    const file = {
      id: this.generateId(),
      name,
      content,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.files.push(file);
    return file;
  }

  readFile(fileName) {
    const file = this.files.find(file => file.name === fileName);
    if (!file) {
      throw new Error('File not found');
    }
    return file;
  }

  updateFile(id, newContent) {
    const file = this.files.find(file => file.id === id);
    if (!file) {
      throw new Error('File not found');
    }
    file.content = newContent;
    file.updatedAt = new Date();
    return file;
  }

  deleteFile(id) {
    const fileIndex = this.files.findIndex(file => file.id === id);
    if (fileIndex === -1) {
      throw new Error('File not found');
    }
    this.files.splice(fileIndex, 1);
  }

  listFiles() {
    return this.files;
  }

  generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }
}

// Example usage:
const fileManager = new FileManager();
const newFile = fileManager.createFile('example.txt', 'Hello, world!');
console.log(fileManager.readFile(newFile.id));
fileManager.updateFile(newFile.id, 'Updated content');
console.log(fileManager.readFile(newFile.id));
fileManager.deleteFile(newFile.id);
console.log(fileManager.listFiles());