# 🧩 Maze Solver Web Application

An interactive web application that generates random mazes and solves them using pathfinding algorithms with real-time visualization.

## 📋 Project Overview

This project consists of:
1. **Maze Generation**: Creates perfect mazes using Recursive Backtracking (DFS-based algorithm)
2. **Pathfinding**: Solves mazes using BFS (Breadth-First Search) to find the shortest path
3. **Visualization**: Real-time animated visualization of maze generation and pathfinding process

## 🏗️ Project Structure

```
maze-solver-webapp/
│
├── frontend/          # Frontend application (HTML, CSS, JavaScript)
│   ├── index.html
│   ├── style.css
│   ├── main.js
│   ├── js/            # Core JavaScript modules
│   ├── components/    # UI components
│   └── assets/        # Static assets
│
├── backend/           # Spring Boot backend (Java)
│   ├── pom.xml
│   └── src/
│       └── main/
│           ├── java/
│           └── resources/
│
└── README.md
```

## ✨ Features

- **Random Maze Generation**: Generate perfect mazes of customizable size
- **BFS Pathfinding**: Find the shortest path from start to end
- **Real-time Animation**: Watch the algorithm explore the maze step-by-step
- **Interactive Controls**: Adjust grid size and animation speed
- **Visual Feedback**: Color-coded visualization showing:
  - Walls (black)
  - Paths (white)
  - Visited cells (yellow)
  - Solution path (green)
  - Start (green) and End (red)

## 🚀 Getting Started

### Prerequisites

- **Frontend**: Modern web browser (Chrome, Firefox, Safari, Edge)
- **Backend**: 
  - Java 17 or higher
  - Maven 3.6+

### Running the Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Open `index.html` in your web browser, or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   ```

3. Access the application at `http://localhost:8000`

### Running the Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Build the project:
   ```bash
   mvn clean install
   ```

3. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```

4. The API will be available at `http://localhost:8080/api/maze`

## 🎮 How to Use

1. **Generate Maze**: Click the "Generate Maze" button to create a new random maze
2. **Adjust Settings**: 
   - Use the grid size slider to change maze dimensions (10x10 to 50x50)
   - Adjust animation speed to control visualization speed
3. **Solve Maze**: Click "Solve Maze" to watch BFS find the path
4. **Clear**: Click "Clear" to reset and start over

## 🔧 Technologies Used

### Frontend
- **HTML5**: Structure
- **CSS3**: Styling with modern gradients and animations
- **JavaScript (ES6+)**: Core logic with modules
- **Canvas API**: Maze rendering and animation

### Backend
- **Java 17**: Programming language
- **Spring Boot 3.1.5**: Framework
- **Maven**: Build tool

## 📚 Algorithm Details

### Maze Generation (Recursive Backtracking)
- Starts with a grid of walls
- Randomly carves paths using depth-first approach
- Ensures only one unique path between any two points (perfect maze)

### Pathfinding (BFS)
- Explores all neighbors at current depth before moving to next level
- Guarantees finding the shortest path
- Uses queue-based traversal

## 🌐 API Endpoints

- `GET /api/maze/generate?size=25` - Generate a new maze
- `POST /api/maze/solve` - Solve a maze (requires maze in request body)
- `GET /api/maze/health` - Health check

## 📝 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Feel free to submit issues, fork the repository, and create pull requests for any improvements.

---

**Enjoy exploring mazes! 🎯**

