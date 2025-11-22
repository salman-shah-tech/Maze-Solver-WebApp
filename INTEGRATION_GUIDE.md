# 🔄 Backend Integration Guide

This guide explains how the frontend is now integrated with the backend API.

## ✅ What Changed

### Before (Standalone Frontend):
- Frontend had its own JavaScript implementations of algorithms
- `mazeGenerator.js` and `mazeSolver.js` ran locally in the browser
- No backend required

### After (Backend-Driven):
- All algorithms run on the backend (Java/Spring Boot)
- Frontend makes API calls to backend
- Backend returns results, frontend visualizes them

---

## 📁 Modified Files

### Frontend:
1. **`js/apiService.js`** (NEW)
   - Handles all API communication
   - Methods: `generateMaze()`, `solveMaze()`, `solveMazeWithSteps()`, `checkHealth()`

2. **`main.js`** (MODIFIED)
   - Removed imports of `MazeGenerator` and `MazeSolver`
   - Now uses `apiService` for all operations
   - Added backend connection checking
   - Added error handling

3. **`components/ui.js`** (MODIFIED)
   - Added `updateBackendStatus()` function
   - Added `setBackendStatusChecking()` function

4. **`index.html`** (MODIFIED)
   - Added backend status indicator in info panel

5. **`style.css`** (MODIFIED)
   - Added styles for backend status indicator

### Backend:
1. **`MazeService.java`** (ALREADY HAD)
   - `solveMazeWithSteps()` method returns visited cells in order for animation

2. **`MazeController.java`** (ALREADY HAD)
   - `/solve-with-steps` endpoint for step-by-step solving

---

## 🔌 API Endpoints Used

### 1. Health Check
```
GET /api/maze/health
```
**Response:**
```json
{"status": "UP"}
```

### 2. Generate Maze
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

### 3. Solve Maze (with animation steps)
```
POST /api/maze/solve-with-steps
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
  "visitedOrder": [{"row": 1, "col": 1}, ...],
  "pathLength": 150,
  "found": true
}
```

---

## 🚀 How to Run

### Step 1: Start Backend
```bash
cd backend
mvn spring-boot:run
```
Backend runs on: `http://localhost:8080`

### Step 2: Start Frontend
```bash
cd frontend
python3 -m http.server 8000
```
Frontend runs on: `http://localhost:8000`

### Step 3: Open Browser
Navigate to: `http://localhost:8000`

---

## 🔍 How It Works

### Maze Generation Flow:
1. User clicks "Generate Maze"
2. Frontend calls `apiService.generateMaze(size)`
3. API request: `GET /api/maze/generate?size=25`
4. Backend generates maze using Recursive Backtracking
5. Backend returns maze data (grid, start, end)
6. Frontend renders maze on canvas

### Maze Solving Flow:
1. User clicks "Solve Maze"
2. Frontend calls `apiService.solveMazeWithSteps(mazeData)`
3. API request: `POST /api/maze/solve-with-steps` with maze data
4. Backend solves using BFS and returns:
   - Solution path
   - Visited cells in order (for animation)
5. Frontend animates visited cells step-by-step
6. Frontend displays final solution path

---

## ⚠️ Error Handling

The frontend handles:
- **Backend not running**: Shows "❌ Disconnected" status
- **Network errors**: Shows error message in status
- **API errors**: Catches and displays user-friendly messages
- **Connection recovery**: Automatically checks connection before operations

---

## 🎨 UI Features

### Backend Status Indicator:
- **✅ Connected**: Green badge when backend is available
- **❌ Disconnected**: Red badge when backend is unavailable
- **⏳ Checking...**: Yellow badge when checking connection

### Status Messages:
- Clear feedback for all operations
- Error messages with details
- Loading states during API calls

---

## 🔧 Configuration

### Backend URL:
Default: `http://localhost:8080`

To change, edit `js/apiService.js`:
```javascript
constructor(baseUrl = 'http://localhost:8080') {
    this.baseUrl = baseUrl;
    // ...
}
```

### CORS:
Backend already configured with `@CrossOrigin(origins = "*")` for development.

For production, update `MazeController.java`:
```java
@CrossOrigin(origins = "http://your-frontend-domain.com")
```

---

## 🧪 Testing

### Test Backend Health:
```bash
curl http://localhost:8080/api/maze/health
```

### Test Maze Generation:
```bash
curl "http://localhost:8080/api/maze/generate?size=25" | python3 -m json.tool
```

### Test Maze Solving:
```bash
curl -X POST http://localhost:8080/api/maze/solve-with-steps \
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

## 📝 Notes

1. **Frontend is now dependent on backend**: The app won't work without the backend running
2. **Animation**: Uses step-by-step visited cells from backend for accurate visualization
3. **Fallback**: If step-by-step endpoint fails, falls back to simple path animation
4. **Connection checking**: Automatically verifies backend connection before operations

---

## 🐛 Troubleshooting

### Frontend shows "Disconnected":
- Check if backend is running: `curl http://localhost:8080/api/maze/health`
- Check backend logs for errors
- Verify port 8080 is not blocked

### CORS Errors:
- Backend should have `@CrossOrigin(origins = "*")` annotation
- Check browser console for specific CORS error

### API Errors:
- Check browser console (F12) for detailed error messages
- Check backend logs for server-side errors
- Verify request/response format matches expected structure

---

**The integration is complete! All algorithms now run on the backend.** 🎉

