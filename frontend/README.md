# Frontend - Maze Solver

Frontend application for the Maze Solver web application.

## 📁 File Structure

```
frontend/
├── index.html              # Main HTML file
├── style.css               # Stylesheet
├── main.js                 # Application entry point
├── js/
│   ├── mazeGenerator.js    # Recursive Backtracking maze generation
│   ├── mazeSolver.js       # BFS pathfinding algorithm
│   ├── renderer.js         # Canvas rendering and animation
│   └── utils.js            # Utility functions
├── components/
│   ├── ui.js               # UI update functions
│   └── controls.js         # Control event handlers
└── assets/                 # Static assets
```

## 🚀 Running the Frontend

### Option 1: Direct File Opening
Simply open `index.html` in a modern web browser.

### Option 2: Local Server (Recommended)
```bash
# Python 3
python -m http.server 8000

# Node.js (http-server)
npx http-server

# PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000`

## 📦 Dependencies

No external dependencies required! The frontend uses only:
- Vanilla JavaScript (ES6+ modules)
- HTML5 Canvas API
- CSS3

## 🎨 Features

- **Modular Architecture**: Clean separation of concerns
- **Real-time Animation**: Smooth step-by-step visualization
- **Responsive Design**: Works on desktop and mobile devices
- **Interactive Controls**: Adjustable grid size and animation speed

## 🔧 Key Components

### MazeGenerator
- Implements Recursive Backtracking algorithm
- Generates perfect mazes (single unique path)

### MazeSolver
- Implements BFS (Breadth-First Search)
- Finds shortest path from start to end
- Supports animation callbacks

### MazeRenderer
- Handles all canvas drawing operations
- Manages color coding for different cell states
- Responsive canvas sizing

## 🎯 Usage

The application is fully self-contained and works without the backend. The backend API is optional and can be integrated for server-side maze generation/solving if needed.

