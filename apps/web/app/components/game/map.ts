import { Tile } from "./tiles";

export interface GameMap {
  grid: number[][];
  cols: number;
  rows: number;
  spawnCol: number;
  spawnRow: number;
}

const COLS = 40;
const ROWS = 28;

// Deterministic 0..1 noise so the island's coastline is irregular but stable.
function noise(x: number, y: number): number {
  let h = (x * 49297 + y * 233280 + 12345) | 0;
  h = Math.imul(h ^ (h >>> 11), 60493);
  return ((h ^ (h >>> 15)) >>> 0) / 4294967296;
}

// Build a rounded island: open water on the outside, a one-tile sand
// coastline, grass interior, a stone-path cross through the middle, and a few
// scattered trees/bushes as obstacles.
export function buildMap(): GameMap {
  const grid: number[][] = [];
  const cx = COLS / 2;
  const cy = ROWS / 2;

  for (let row = 0; row < ROWS; row++) {
    const line: number[] = [];
    for (let col = 0; col < COLS; col++) {
      // Normalized elliptical distance from the island center, nudged by
      // noise so the shoreline isn't a perfect oval.
      const dx = (col - cx + 0.5) / (COLS / 2);
      const dy = (row - cy + 0.5) / (ROWS / 2);
      const d = Math.sqrt(dx * dx + dy * dy) + (noise(col, row) - 0.5) * 0.16;

      if (d > 0.92) line.push(Tile.WATER);
      else if (d > 0.78) line.push(Tile.SAND);
      else line.push(Tile.GRASS);
    }
    grid.push(line);
  }

  const spawnCol = Math.floor(cx);
  const spawnRow = Math.floor(cy);

  // Stone-path cross. Only lay path over grass so it never floats on water.
  for (let col = 0; col < COLS; col++) {
    if (grid[spawnRow]![col] === Tile.GRASS) grid[spawnRow]![col] = Tile.PATH;
  }
  for (let row = 0; row < ROWS; row++) {
    if (grid[row]![spawnCol] === Tile.GRASS) grid[row]![spawnCol] = Tile.PATH;
  }

  // Scatter trees and bushes on open grass, keeping a clear ring around the
  // spawn point so the player never starts boxed in.
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (grid[row]![col] !== Tile.GRASS) continue;
      if (Math.abs(col - spawnCol) <= 2 && Math.abs(row - spawnRow) <= 2)
        continue;
      const n = noise(col + 100, row + 100);
      if (n > 0.93) grid[row]![col] = Tile.TREE;
      else if (n > 0.88) grid[row]![col] = Tile.BUSH;
    }
  }

  return { grid, cols: COLS, rows: ROWS, spawnCol, spawnRow };
}
