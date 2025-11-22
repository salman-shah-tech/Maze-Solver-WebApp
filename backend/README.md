# Backend - Maze Solver (Spring Boot)

Spring Boot REST API backend for the Maze Solver application.

## 📁 Project Structure

```
backend/
├── pom.xml                                    # Maven configuration
└── src/
    └── main/
        ├── java/
        │   └── com/maze/solver/
        │       ├── MazeSolverApplication.java # Main application class
        │       ├── controllers/
        │       │   └── MazeController.java    # REST endpoints
        │       ├── services/
        │       │   └── MazeService.java       # Business logic
        │       └── models/
        │           └── Maze.java              # Data models
        └── resources/
            └── application.properties         # Configuration
```

## 🚀 Running the Backend

### Prerequisites
- Java 17 or higher
- Maven 3.6+

### Build and Run

```bash
# Navigate to backend directory
cd backend

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

The server will start on `http://localhost:8080`

### Build JAR

```bash
mvn clean package
java -jar target/maze-solver-1.0.0.jar
```

## 🌐 API Endpoints

### Generate Maze
```
GET /api/maze/generate?size=25
```
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

### Solve Maze
```
POST /api/maze/solve
Content-Type: application/json

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
  "pathLength": 150,
  "found": true
}
```

### Health Check
```
GET /api/maze/health
```

**Response:**
```json
{
  "status": "UP"
}
```

## 🔧 Configuration

Edit `src/main/resources/application.properties` to configure:
- Server port (default: 8080)
- Logging levels
- CORS settings

## 📦 Dependencies

- **Spring Boot Web**: REST API framework
- **Spring Boot DevTools**: Development tools (optional)
- **Spring Boot Test**: Testing framework

## 🎯 Features

- RESTful API design
- CORS enabled for frontend integration
- Maze generation using Recursive Backtracking
- BFS pathfinding algorithm
- Error handling and validation

## 🔒 CORS Configuration

Currently configured to allow all origins (`*`). For production, update `MazeController.java` to specify exact origins:

```java
@CrossOrigin(origins = "http://localhost:8000")
```

