# 🧩 Maze Solver Web Application

An interactive web application that generates random mazes and solves them using pathfinding algorithms with real-time visualization. Built with **Spring Boot** backend and **vanilla JavaScript** frontend.

## 📋 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Deployment](#-deployment)
- [API Documentation](#-api-documentation)
- [Technologies](#-technologies)
- [How It Works](#-how-it-works)

## ✨ Features

- **Random Maze Generation**: Generate perfect mazes using Recursive Backtracking algorithm
- **BFS Pathfinding**: Find the shortest path from start to end using Breadth-First Search
- **Real-time Animation**: Watch the algorithm explore the maze step-by-step
- **Interactive Controls**: Adjust maze size (10x10 to 50x50) and animation speed
- **Visual Feedback**: Color-coded visualization:
  - 🟫 Walls (black)
  - ⬜ Paths (white)
  - 🟨 Visited cells (yellow)
  - 🟩 Solution path (green)
  - 🟢 Start (green) and 🔴 End (red)

## 🏗️ Architecture

```
┌─────────────────────────────────┐
│   Frontend (Vercel)              │
│   - HTML/CSS/JavaScript          │
│   - Canvas API for rendering     │
│   - Makes API calls to backend   │
└──────────────┬──────────────────┘
               │
               │ HTTP REST API
               │
┌──────────────▼──────────────────┐
│   Backend (Railway)              │
│   - Spring Boot (Java)           │
│   - Maze Generation Algorithm    │
│   - BFS Pathfinding Algorithm   │
└─────────────────────────────────┘
```

**Key Point**: All algorithms run on the backend. Frontend is a pure UI client.

## 📁 Project Structure

```
maze-solver-webapp/
│
├── frontend/                    # Frontend application
│   ├── index.html              # Main HTML file
│   ├── style.css               # Styling
│   ├── main.js                 # Application entry point
│   ├── vercel.json             # Vercel configuration
│   ├── js/
│   │   ├── apiService.js       # Backend API communication
│   │   ├── config.js           # Configuration (API URLs)
│   │   ├── renderer.js         # Canvas rendering & animation
│   │   └── utils.js             # Utility functions
│   └── components/
│       ├── controls.js         # UI control handlers
│       └── ui.js                # UI update functions
│
├── backend/                     # Spring Boot backend
│   ├── pom.xml                  # Maven configuration
│   ├── Procfile                 # Railway deployment config
│   ├── system.properties        # Java version config
│   └── src/main/
│       ├── java/com/maze/solver/
│       │   ├── MazeSolverApplication.java
│       │   ├── controllers/
│       │   │   └── MazeController.java
│       │   ├── services/
│       │   │   └── MazeService.java
│       │   └── models/
│       │       └── Maze.java
│       └── resources/
│           └── application.properties
│
└── README.md                    # This file
```

## 🚀 Getting Started

### Prerequisites

- **Java 17+** (for backend)
- **Maven 3.6+** (for backend)
- **Modern web browser** (for frontend)
- **Git** (for version control)

### Running Locally

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/maze-solver-webapp.git
cd maze-solver-webapp
```

#### 2. Start Backend

```bash
cd backend

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

Backend will start on: `http://localhost:8080`

**Test backend:**
```bash
curl http://localhost:8080/api/maze/health
# Expected: {"status":"UP"}
```

#### 3. Start Frontend

```bash
cd frontend

# Option 1: Python HTTP Server
python3 -m http.server 8000

# Option 2: Node.js http-server
npx http-server -p 8000

# Option 3: PHP
php -S localhost:8000
```

Frontend will be available at: `http://localhost:8000`

#### 4. Use the Application

1. Open `http://localhost:8000` in your browser
2. Check backend status (should show "✅ Connected")
3. Click "Generate Maze" to create a random maze
4. Click "Solve Maze" to watch BFS find the path
5. Adjust maze size and animation speed using sliders

## 🌐 Deployment

### Backend Deployment (Railway)

1. Go to [railway.app](https://railway.app) and sign in with GitHub
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your repository
4. In **Settings** → Set **Root Directory**: `backend`
5. Railway will auto-detect Java and start building
6. Wait for deployment (5-10 minutes)
7. Copy the generated URL (e.g., `https://xxx.railway.app`)

**Verify backend:**
```bash
curl https://your-backend-url.railway.app/api/maze/health
```

### Frontend Deployment (Vercel)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Configure:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Other
   - **Build Command**: (leave empty)
   - **Output Directory**: `.`
5. **Environment Variables**:
   - Add: `VITE_API_URL` = `https://your-backend-url.railway.app`
6. Click **"Deploy"**

**Note**: Update backend CORS in `MazeController.java` with your Vercel URL:
```java
@CrossOrigin(origins = {
    "http://localhost:8000",
    "https://your-frontend.vercel.app"
})
```

### Deployment Checklist

- [ ] Backend deployed on Railway
- [ ] Backend URL copied
- [ ] Backend CORS updated with frontend URL
- [ ] Frontend deployed on Vercel
- [ ] Environment variable `VITE_API_URL` set in Vercel
- [ ] Both services tested and working

## 📡 API Documentation

### Base URL
```
Production: https://your-backend-url.railway.app
Local: http://localhost:8080
```

### Endpoints

#### 1. Health Check
```http
GET /api/maze/health
```

**Response:**
```json
{
  "status": "UP"
}
```

#### 2. Generate Maze
```http
GET /api/maze/generate?size=25
```

**Parameters:**
- `size` (optional): Grid size (default: 25)

**Response:**
```json
{
  "rows": 25,
  "cols": 25,
  "grid": [[0,1,0,...], ...],
  "start": {"row": 1, "col": 1},
  "end": {"row": 49, "col": 49}
}
```

#### 3. Solve Maze
```http
POST /api/maze/solve-with-steps
Content-Type: application/json
```

**Request Body:**
```json
{
  "rows": 25,
  "cols": 25,
  "grid": [[0,1,0,...], ...],
  "start": {"row": 1, "col": 1},
  "end": {"row": 49, "col": 49}
}
```

**Response:**
```json
{
  "solution": [{"row": 1, "col": 1}, ...],
  "visitedOrder": [{"row": 1, "col": 1}, ...],
  "pathLength": 150,
  "found": true
}
```

## 🛠️ Technologies

### Frontend
- **HTML5**: Structure
- **CSS3**: Modern styling with gradients
- **JavaScript (ES6+)**: ES modules, async/await
- **Canvas API**: Real-time rendering and animation
- **Fetch API**: HTTP requests to backend

### Backend
- **Java 17**: Programming language
- **Spring Boot 3.1.5**: Web framework
- **Maven**: Build tool and dependency management
- **Spring Web**: REST API support

## 🔬 How It Works

### Maze Generation (Recursive Backtracking)

1. Start with a grid of walls
2. Mark starting cell as visited
3. While there are unvisited cells:
   - Get unvisited neighbors of current cell
   - Choose random unvisited neighbor
   - Remove wall between current and neighbor
   - Move to neighbor (push to stack)
   - If no unvisited neighbors, backtrack (pop from stack)
4. Result: Perfect maze (only one unique path between any two points)

### Pathfinding (BFS - Breadth-First Search)

1. Start from start cell, add to queue
2. While queue is not empty:
   - Dequeue current cell
   - If current is end cell, reconstruct path and return
   - For each valid neighbor:
     - If not visited, mark as visited
     - Add to queue
     - Store parent for path reconstruction
3. Reconstruct path from end to start using parent map
4. Result: Shortest path from start to end

### Visualization

- **Canvas Rendering**: Each cell drawn as a rectangle
- **Animation**: Step-by-step cell updates with delays
- **Color Coding**: Different colors for walls, paths, visited cells, solution
- **Real-time Updates**: Canvas redrawn on each state change

## 🐛 Troubleshooting

### Backend Issues

**Problem**: Port 8080 already in use
```bash
# Find process using port
lsof -i :8080
# Kill process or change port in application.properties
```

**Problem**: Build fails
- Check Java version: `java -version` (must be 17+)
- Check Maven: `mvn -version`
- Verify `pom.xml` is correct

### Frontend Issues

**Problem**: Backend shows "Disconnected"
- Check `VITE_API_URL` environment variable in Vercel
- Verify backend is running
- Check browser console for errors

**Problem**: CORS errors
- Update backend CORS with frontend URL
- Redeploy backend after CORS change

### Deployment Issues

**Problem**: 404 on Vercel
- Verify Root Directory is set to `frontend`
- Check `vercel.json` configuration
- Review deployment logs

**Problem**: Backend not accessible
- Check Railway deployment logs
- Verify Root Directory is `backend`
- Test health endpoint

## 📝 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Submit issues
- Fork the repository
- Create pull requests
- Suggest improvements

## 📧 Contact

For questions or issues, please open an issue on GitHub.

---

**Built with ❤️ using Spring Boot and Vanilla JavaScript**

**Enjoy exploring mazes! 🎯**
