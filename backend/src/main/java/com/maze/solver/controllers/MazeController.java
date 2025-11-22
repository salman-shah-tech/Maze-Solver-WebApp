package com.maze.solver.controllers;

import com.maze.solver.models.Maze;
import com.maze.solver.services.MazeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * REST Controller for maze operations
 */
@RestController
@RequestMapping("/api/maze")
@CrossOrigin(origins = "*")
public class MazeController {

    @Autowired
    private MazeService mazeService;

    /**
     * Generate a new maze
     * @param size Grid size (default: 25)
     * @return Generated maze
     */
    @GetMapping("/generate")
    public ResponseEntity<Maze> generateMaze(
            @RequestParam(defaultValue = "25") int size) {
        try {
            Maze maze = mazeService.generateMaze(size);
            return ResponseEntity.ok(maze);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Solve a maze with step-by-step visited cells (for animation)
     * @param maze The maze to solve
     * @return Solution path and visited cells in order
     */
    @PostMapping("/solve")
    public ResponseEntity<Map<String, Object>> solveMaze(@RequestBody Maze maze) {
        try {
            // Use solveMazeWithSteps to get visited order for animation
            Map<String, Object> result = mazeService.solveMazeWithSteps(maze);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Solve a maze with step-by-step visited cells (for animation)
     * @param maze The maze to solve
     * @return Solution path and visited cells in order
     */
    @PostMapping("/solve-with-steps")
    public ResponseEntity<Map<String, Object>> solveMazeWithSteps(@RequestBody Maze maze) {
        try {
            Map<String, Object> result = mazeService.solveMazeWithSteps(maze);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Health check endpoint
     * @return Status message
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "UP");
        return ResponseEntity.ok(response);
    }
}

