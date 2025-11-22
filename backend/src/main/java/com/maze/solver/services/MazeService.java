package com.maze.solver.services;

import com.maze.solver.models.Maze;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Service class for maze generation and solving operations
 */
@Service
public class MazeService {

    /**
     * Generate a maze using Recursive Backtracking algorithm
     * @param size Grid size (rows x cols)
     * @return Generated maze
     */
    public Maze generateMaze(int size) {
        int rows = size;
        int cols = size;
        
        // Initialize maze with all walls (0 = wall, 1 = path)
        int gridRows = rows * 2 + 1;
        int gridCols = cols * 2 + 1;
        
        int[][] maze = new int[gridRows][gridCols];
        for (int i = 0; i < gridRows; i++) {
            Arrays.fill(maze[i], 0);
        }

        // Mark all cells as unvisited
        boolean[][] visited = new boolean[rows][cols];
        
        // Stack for recursive backtracking
        Stack<Maze.Cell> stack = new Stack<>();
        stack.push(new Maze.Cell(0, 0));
        visited[0][0] = true;

        Random random = new Random();

        while (!stack.isEmpty()) {
            Maze.Cell current = stack.peek();
            int gridRow = current.getRow() * 2 + 1;
            int gridCol = current.getCol() * 2 + 1;
            
            // Mark current cell as path
            maze[gridRow][gridCol] = 1;

            // Get unvisited neighbors
            List<Maze.Cell> neighbors = getUnvisitedNeighbors(
                current.getRow(), current.getCol(), rows, cols, visited
            );

            if (!neighbors.isEmpty()) {
                // Choose random unvisited neighbor
                Maze.Cell next = neighbors.get(random.nextInt(neighbors.size()));
                visited[next.getRow()][next.getCol()] = true;

                // Remove wall between current and next
                int nextGridRow = next.getRow() * 2 + 1;
                int nextGridCol = next.getCol() * 2 + 1;
                int wallRow = (gridRow + nextGridRow) / 2;
                int wallCol = (gridCol + nextGridCol) / 2;
                maze[wallRow][wallCol] = 1;

                stack.push(next);
            } else {
                // Backtrack
                stack.pop();
            }
        }

        // Set start and end positions
        Maze.Cell start = new Maze.Cell(1, 1);
        Maze.Cell end = new Maze.Cell(gridRows - 2, gridCols - 2);
        
        // Ensure entrance and exit are open
        maze[0][1] = 1; // Top entrance
        maze[gridRows - 1][gridCols - 2] = 1; // Bottom exit

        Maze result = new Maze(rows, cols, maze, start, end);
        return result;
    }

    /**
     * Solve maze using BFS (Breadth-First Search)
     * @param maze The maze to solve
     * @return List of cells representing the solution path
     */
    public List<Maze.Cell> solveMaze(Maze maze) {
        int[][] grid = maze.getGrid();
        int rows = grid.length;
        int cols = grid[0].length;
        
        Maze.Cell start = maze.getStart();
        Maze.Cell end = maze.getEnd();

        Queue<Maze.Cell> queue = new LinkedList<>();
        Set<String> visited = new HashSet<>();
        Map<String, Maze.Cell> parent = new HashMap<>();

        queue.offer(start);
        visited.add(start.getRow() + "," + start.getCol());

        int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

        while (!queue.isEmpty()) {
            Maze.Cell current = queue.poll();

            // Check if we reached the end
            if (current.getRow() == end.getRow() && current.getCol() == end.getCol()) {
                return reconstructPath(parent, start, end);
            }

            // Explore neighbors
            for (int[] dir : directions) {
                int newRow = current.getRow() + dir[0];
                int newCol = current.getCol() + dir[1];

                if (isValidCell(newRow, newCol, rows, cols) && 
                    grid[newRow][newCol] == 1) {
                    
                    String key = newRow + "," + newCol;
                    if (!visited.contains(key)) {
                        visited.add(key);
                        Maze.Cell neighbor = new Maze.Cell(newRow, newCol);
                        parent.put(key, current);
                        queue.offer(neighbor);
                    }
                }
            }
        }

        return new ArrayList<>(); // No path found
    }

    /**
     * Solve maze using BFS and return visited cells in order (for animation)
     * @param maze The maze to solve
     * @return Map containing solution path and visited cells in order
     */
    public Map<String, Object> solveMazeWithSteps(Maze maze) {
        int[][] grid = maze.getGrid();
        int rows = grid.length;
        int cols = grid[0].length;
        
        Maze.Cell start = maze.getStart();
        Maze.Cell end = maze.getEnd();

        Queue<Maze.Cell> queue = new LinkedList<>();
        Set<String> visited = new HashSet<>();
        Map<String, Maze.Cell> parent = new HashMap<>();
        List<Maze.Cell> visitedOrder = new ArrayList<>(); // Track order of visits

        queue.offer(start);
        String startKey = start.getRow() + "," + start.getCol();
        visited.add(startKey);
        visitedOrder.add(new Maze.Cell(start.getRow(), start.getCol()));

        int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

        while (!queue.isEmpty()) {
            Maze.Cell current = queue.poll();

            // Check if we reached the end
            if (current.getRow() == end.getRow() && current.getCol() == end.getCol()) {
                List<Maze.Cell> solution = reconstructPath(parent, start, end);
                
                Map<String, Object> result = new HashMap<>();
                result.put("solution", solution);
                result.put("visitedOrder", visitedOrder);
                result.put("pathLength", solution.size());
                result.put("found", true);
                return result;
            }

            // Explore neighbors
            for (int[] dir : directions) {
                int newRow = current.getRow() + dir[0];
                int newCol = current.getCol() + dir[1];

                if (isValidCell(newRow, newCol, rows, cols) && 
                    grid[newRow][newCol] == 1) {
                    
                    String key = newRow + "," + newCol;
                    if (!visited.contains(key)) {
                        visited.add(key);
                        Maze.Cell neighbor = new Maze.Cell(newRow, newCol);
                        parent.put(key, current);
                        queue.offer(neighbor);
                        visitedOrder.add(neighbor); // Add to visited order
                    }
                }
            }
        }

        // No path found
        Map<String, Object> result = new HashMap<>();
        result.put("solution", new ArrayList<Maze.Cell>());
        result.put("visitedOrder", visitedOrder);
        result.put("pathLength", 0);
        result.put("found", false);
        return result;
    }

    /**
     * Get unvisited neighbors of a cell
     */
    private List<Maze.Cell> getUnvisitedNeighbors(int row, int col, int rows, int cols, boolean[][] visited) {
        List<Maze.Cell> neighbors = new ArrayList<>();
        int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

        for (int[] dir : directions) {
            int newRow = row + dir[0];
            int newCol = col + dir[1];

            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && 
                !visited[newRow][newCol]) {
                neighbors.add(new Maze.Cell(newRow, newCol));
            }
        }

        return neighbors;
    }

    /**
     * Check if cell coordinates are valid
     */
    private boolean isValidCell(int row, int col, int rows, int cols) {
        return row >= 0 && row < rows && col >= 0 && col < cols;
    }

    /**
     * Reconstruct path from parent map
     */
    private List<Maze.Cell> reconstructPath(Map<String, Maze.Cell> parent, 
                                            Maze.Cell start, Maze.Cell end) {
        List<Maze.Cell> path = new ArrayList<>();
        Maze.Cell current = end;

        while (current != null) {
            path.add(0, current);
            
            if (current.getRow() == start.getRow() && current.getCol() == start.getCol()) {
                break;
            }

            String key = current.getRow() + "," + current.getCol();
            current = parent.get(key);
        }

        return path;
    }
}

