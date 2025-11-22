package com.maze.solver.models;

import java.util.List;

/**
 * Model class representing a maze
 */
public class Maze {
    private int rows;
    private int cols;
    private int[][] grid;
    private Cell start;
    private Cell end;
    private List<Cell> solution;

    public Maze() {
    }

    public Maze(int rows, int cols, int[][] grid, Cell start, Cell end) {
        this.rows = rows;
        this.cols = cols;
        this.grid = grid;
        this.start = start;
        this.end = end;
    }

    // Getters and Setters
    public int getRows() {
        return rows;
    }

    public void setRows(int rows) {
        this.rows = rows;
    }

    public int getCols() {
        return cols;
    }

    public void setCols(int cols) {
        this.cols = cols;
    }

    public int[][] getGrid() {
        return grid;
    }

    public void setGrid(int[][] grid) {
        this.grid = grid;
    }

    public Cell getStart() {
        return start;
    }

    public void setStart(Cell start) {
        this.start = start;
    }

    public Cell getEnd() {
        return end;
    }

    public void setEnd(Cell end) {
        this.end = end;
    }

    public List<Cell> getSolution() {
        return solution;
    }

    public void setSolution(List<Cell> solution) {
        this.solution = solution;
    }

    /**
     * Inner class representing a cell in the maze
     */
    public static class Cell {
        private int row;
        private int col;

        public Cell() {
        }

        public Cell(int row, int col) {
            this.row = row;
            this.col = col;
        }

        public int getRow() {
            return row;
        }

        public void setRow(int row) {
            this.row = row;
        }

        public int getCol() {
            return col;
        }

        public void setCol(int col) {
            this.col = col;
        }

        @Override
        public boolean equals(Object obj) {
            if (this == obj) return true;
            if (obj == null || getClass() != obj.getClass()) return false;
            Cell cell = (Cell) obj;
            return row == cell.row && col == cell.col;
        }

        @Override
        public int hashCode() {
            return row * 31 + col;
        }
    }
}

