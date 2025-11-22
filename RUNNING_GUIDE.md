# 🚀 Detailed Running Guide - Maze Solver Application

This guide provides step-by-step instructions to run both the frontend and backend components of the Maze Solver application.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Running the Frontend](#running-the-frontend)
3. [Running the Backend](#running-the-backend)
4. [Running Both Together](#running-both-together)
5. [Testing the Application](#testing-the-application)
6. [Troubleshooting](#troubleshooting)

---

## 🔧 Prerequisites

### For Frontend Only:
- **Modern Web Browser**: Chrome, Firefox, Safari, or Edge (latest version)
- **No additional software needed!** The frontend works standalone.

### For Backend:
- **Java Development Kit (JDK) 17 or higher**
  - Check if installed: `java -version`
  - Download: [Oracle JDK](https://www.oracle.com/java/technologies/downloads/) or [OpenJDK](https://adoptium.net/)
  
- **Apache Maven 3.6+**
  - Check if installed: `mvn -version`
  - Download: [Maven Download](https://maven.apache.org/download.cgi)
  - Installation guide: [Maven Installation](https://maven.apache.org/install.html)

---

## 🎨 Running the Frontend

The frontend can run in **three different ways**:

### Method 1: Direct File Opening (Simplest)

**Steps:**
1. Navigate to the frontend directory:
   ```bash
   cd /Users/xyz/Desktop/Desktop/maze-solver-webapp/frontend
   ```

2. Open `index.html` directly in your browser:
   - **macOS**: Right-click `index.html` → "Open With" → Choose your browser
   - **Windows**: Right-click `index.html` → "Open with" → Choose your browser
   - **Linux**: Double-click or use `xdg-open index.html`

**Note**: Some browsers may block ES6 modules when opening files directly. If you see errors, use Method 2 or 3.

---

### Method 2: Python HTTP Server (Recommended)

**Steps:**
1. Open Terminal/Command Prompt

2. Navigate to the frontend directory:
   ```bash
   cd /Users/xyz/Desktop/Desktop/maze-solver-webapp/frontend
   ```

3. Start a local server:

   **Python 3:**
   ```bash
   python3 -m http.server 8000
   ```
   
   **Python 2 (if Python 3 not available):**
   ```bash
   python -m SimpleHTTPServer 8000
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:8000
   ```

5. You should see the Maze Solver interface!

6. To stop the server: Press `Ctrl + C` in the terminal

---

### Method 3: Node.js HTTP Server

**Steps:**
1. Install Node.js if not already installed:
   - Download: [Node.js](https://nodejs.org/)
   - Verify: `node --version`

2. Install http-server globally (one-time setup):
   ```bash
   npm install -g http-server
   ```

3. Navigate to the frontend directory:
   ```bash
   cd /Users/xyz/Desktop/Desktop/maze-solver-webapp/frontend
   ```

4. Start the server:
   ```bash
   http-server -p 8000
   ```

5. Open your browser:
   ```
   http://localhost:8000
   ```

6. To stop: Press `Ctrl + C`

---

### Method 4: PHP Built-in Server

**Steps:**
1. Navigate to the frontend directory:
   ```bash
   cd /Users/xyz/Desktop/Desktop/maze-solver-webapp/frontend
   ```

2. Start PHP server:
   ```bash
   php -S localhost:8000
   ```

3. Open browser: `http://localhost:8000`

---

## ☕ Running the Backend

### Step 1: Verify Prerequisites

**Check Java:**
```bash
java -version
```
Expected output: `openjdk version "17"` or higher

**Check Maven:**
```bash
mvn -version
```
Expected output: `Apache Maven 3.6.x` or higher

---

### Step 2: Navigate to Backend Directory

```bash
cd /Users/xyz/Desktop/Desktop/maze-solver-webapp/backend
```

---

### Step 3: Build the Project (First Time)

**Clean and build:**
```bash
mvn clean install
```

This will:
- Download all dependencies (first time takes a few minutes)
- Compile Java source files
- Run tests (if any)
- Create a JAR file in `target/` directory

**Expected output:**
```
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
```

---

### Step 4: Run the Application

**Option A: Using Maven (Recommended for Development)**
```bash
mvn spring-boot:run
```

**Option B: Using the JAR file**
```bash
java -jar target/maze-solver-1.0.0.jar
```

---

### Step 5: Verify Backend is Running

You should see output like:
```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.1.5)

2024-01-XX INFO  ... Starting MazeSolverApplication
2024-01-XX INFO  ... Started MazeSolverApplication in X.XXX seconds
```

The server will be running on: **http://localhost:8080**

---

### Step 6: Test the API

Open a new terminal and test the health endpoint:

```bash
curl http://localhost:8080/api/maze/health
```

Expected response:
```json
{"status":"UP"}
```

Or test in browser: `http://localhost:8080/api/maze/health`

---

## 🔄 Running Both Together

### Scenario: Frontend + Backend Integration

1. **Start Backend First:**
   ```bash
   cd /Users/xyz/Desktop/Desktop/maze-solver-webapp/backend
   mvn spring-boot:run
   ```
   Keep this terminal open.

2. **Start Frontend (in a new terminal):**
   ```bash
   cd /Users/xyz/Desktop/Desktop/maze-solver-webapp/frontend
   python3 -m http.server 8000
   ```

3. **Access the application:**
   - Frontend: `http://localhost:8000`
   - Backend API: `http://localhost:8080/api/maze`

**Note**: Currently, the frontend works standalone and doesn't require the backend. The backend provides optional REST API endpoints if you want to integrate server-side maze generation/solving.

---

## 🧪 Testing the Application

### Frontend Testing:

1. **Open the application** in your browser (using any method above)

2. **Test Maze Generation:**
   - Click "Generate Maze" button
   - You should see a random maze appear on the canvas
   - Start (green) should be at top-left
   - End (red) should be at bottom-right

3. **Test Pathfinding:**
   - After generating a maze, click "Solve Maze"
   - Watch the BFS algorithm animate:
     - Yellow cells = visited nodes
     - Green path = final solution
   - Check the "Path Length" display

4. **Test Controls:**
   - Adjust "Grid Size" slider (10-50)
   - Generate a new maze with different size
   - Adjust "Animation Speed" slider
   - Solve again to see speed difference

5. **Test Clear:**
   - Click "Clear" button
   - Everything should reset

---

### Backend API Testing:

**1. Health Check:**
```bash
curl http://localhost:8080/api/maze/health
```

**2. Generate Maze:**
```bash
curl "http://localhost:8080/api/maze/generate?size=25" | python3 -m json.tool
```

**3. Solve Maze (POST request):**
```bash
curl -X POST http://localhost:8080/api/maze/solve \
  -H "Content-Type: application/json" \
  -d '{
    "rows": 25,
    "cols": 25,
    "grid": [[0,1,0,1,0],[1,1,1,1,1],[0,1,0,1,0]],
    "start": {"row": 1, "col": 1},
    "end": {"row": 3, "col": 3}
  }' | python3 -m json.tool
```

---

## 🐛 Troubleshooting

### Frontend Issues:

**Problem: "Cannot load module" or "CORS error"**
- **Solution**: Use a local server (Method 2, 3, or 4) instead of opening file directly

**Problem: Canvas not displaying**
- **Solution**: 
  - Check browser console for errors (F12)
  - Ensure JavaScript is enabled
  - Try a different browser

**Problem: Buttons not working**
- **Solution**: 
  - Open browser console (F12)
  - Check for JavaScript errors
  - Ensure all files are in correct locations

---

### Backend Issues:

**Problem: "java: command not found"**
- **Solution**: 
  - Install JDK 17+
  - Add Java to PATH environment variable
  - Verify: `java -version`

**Problem: "mvn: command not found"**
- **Solution**: 
  - Install Maven
  - Add Maven bin directory to PATH
  - Verify: `mvn -version`

**Problem: "Port 8080 already in use"**
- **Solution**: 
  - Find process using port: `lsof -i :8080` (macOS/Linux) or `netstat -ano | findstr :8080` (Windows)
  - Kill the process or change port in `application.properties`:
    ```properties
    server.port=8081
    ```

**Problem: "BUILD FAILURE" during `mvn clean install`**
- **Solution**: 
  - Check internet connection (Maven downloads dependencies)
  - Verify Java version: `java -version` (must be 17+)
  - Try: `mvn clean install -U` (force update)
  - Check error message for specific issues

**Problem: "ClassNotFoundException" or compilation errors**
- **Solution**: 
  - Ensure all Java files are in correct package structure
  - Run: `mvn clean compile`
  - Check for syntax errors in Java files

---

### General Issues:

**Problem: Changes not reflecting**
- **Solution**: 
  - Hard refresh browser: `Ctrl + Shift + R` (Windows/Linux) or `Cmd + Shift + R` (macOS)
  - Clear browser cache
  - Restart the server

**Problem: Slow performance**
- **Solution**: 
  - Reduce grid size (smaller mazes are faster)
  - Increase animation speed (less delay)
  - Close other applications

---

## 📝 Quick Reference Commands

### Frontend:
```bash
# Navigate to frontend
cd frontend

# Start Python server
python3 -m http.server 8000

# Or Node.js server
http-server -p 8000
```

### Backend:
```bash
# Navigate to backend
cd backend

# Build project
mvn clean install

# Run application
mvn spring-boot:run

# Or run JAR
java -jar target/maze-solver-1.0.0.jar
```

### Testing:
```bash
# Health check
curl http://localhost:8080/api/maze/health

# Generate maze
curl "http://localhost:8080/api/maze/generate?size=25"
```

---

## ✅ Success Checklist

- [ ] Frontend opens in browser without errors
- [ ] "Generate Maze" button creates a visible maze
- [ ] "Solve Maze" button animates pathfinding
- [ ] Controls (sliders, buttons) work correctly
- [ ] Backend starts without errors
- [ ] Backend health endpoint returns `{"status":"UP"}`
- [ ] No console errors in browser
- [ ] No errors in backend terminal

---

## 🎯 Next Steps

Once everything is running:
1. Experiment with different grid sizes
2. Try different animation speeds
3. Observe how BFS explores the maze
4. Integrate frontend with backend API (optional)
5. Customize colors and styling
6. Add more pathfinding algorithms (DFS, A*, etc.)

---

**Happy Maze Solving! 🧩**

