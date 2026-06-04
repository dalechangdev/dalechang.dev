import { DMG } from "./palette";

// Pixel size of one tile, in the canvas's internal (pre-scale) resolution.
export const TILE = 16;

// Tile ids used throughout the map grid.
export const Tile = {
  WATER: 0,
  SAND: 1,
  GRASS: 2,
  PATH: 3,
  TREE: 4,
  BUSH: 5,
} as const;

export type TileId = (typeof Tile)[keyof typeof Tile];

// Tiles the player cannot step onto. Water keeps them on the island;
// trees and bushes are in-world obstacles.
const SOLID: ReadonlySet<number> = new Set([Tile.WATER, Tile.TREE, Tile.BUSH]);

export function isSolid(id: number): boolean {
  return SOLID.has(id);
}

// Deterministic 0..1 hash from tile coordinates so per-tile detail (grass
// flecks, cobble, etc.) stays stable between frames instead of flickering.
function hash(x: number, y: number): number {
  let h = (x * 374761393 + y * 668265263) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

function px(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string,
): void {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawGrass(
  ctx: CanvasRenderingContext2D,
  sx: number,
  sy: number,
  col: number,
  row: number,
): void {
  // Base "cut grass" mow pattern: a subtle two-tone checker of the two
  // lightest greens.
  px(ctx, sx, sy, TILE, TILE, DMG.light);
  px(ctx, sx, sy, TILE / 2, TILE / 2, DMG.lightest);
  px(ctx, sx + TILE / 2, sy + TILE / 2, TILE / 2, TILE / 2, DMG.lightest);

  // A couple of deterministic blade flecks for texture.
  if (hash(col, row) > 0.55) {
    px(ctx, sx + 3, sy + 10, 1, 2, DMG.dark);
    px(ctx, sx + 4, sy + 11, 1, 1, DMG.dark);
  }
  if (hash(col + 7, row + 3) > 0.6) {
    px(ctx, sx + 11, sy + 4, 1, 2, DMG.dark);
  }
}

function drawSand(
  ctx: CanvasRenderingContext2D,
  sx: number,
  sy: number,
  col: number,
  row: number,
): void {
  px(ctx, sx, sy, TILE, TILE, DMG.lightest);
  // Sparse darker speckle for a beach-y grain.
  if (hash(col + 1, row) > 0.5) px(ctx, sx + 4, sy + 6, 1, 1, DMG.light);
  if (hash(col, row + 5) > 0.5) px(ctx, sx + 10, sy + 11, 1, 1, DMG.light);
  if (hash(col + 3, row + 2) > 0.7) px(ctx, sx + 7, sy + 3, 1, 1, DMG.light);
}

function drawPath(ctx: CanvasRenderingContext2D, sx: number, sy: number): void {
  // Dark mortar background with four light cobbles.
  px(ctx, sx, sy, TILE, TILE, DMG.dark);
  const blocks: [number, number][] = [
    [1, 1],
    [9, 1],
    [1, 9],
    [9, 9],
  ];
  for (const [bx, by] of blocks) {
    px(ctx, sx + bx, sy + by, 6, 6, DMG.light);
    px(ctx, sx + bx, sy + by, 6, 1, DMG.lightest); // top highlight
  }
}

function drawWater(
  ctx: CanvasRenderingContext2D,
  sx: number,
  sy: number,
  col: number,
  row: number,
  time: number,
): void {
  px(ctx, sx, sy, TILE, TILE, DMG.dark);
  px(ctx, sx, sy, TILE, TILE / 2, DMG.darkest); // depth band on top half

  // Two animated ripple dashes that drift sideways over time.
  const shift = Math.floor(time / 320);
  const a = ((col * 5 + shift) % TILE) | 0;
  const b = ((col * 5 + shift + 8) % TILE) | 0;
  px(ctx, sx + a, sy + 4, 3, 1, DMG.light);
  if (hash(col, row) > 0.4) px(ctx, sx + b, sy + 11, 3, 1, DMG.light);
}

function drawTree(
  ctx: CanvasRenderingContext2D,
  sx: number,
  sy: number,
  col: number,
  row: number,
): void {
  drawGrass(ctx, sx, sy, col, row);
  // Trunk.
  px(ctx, sx + 7, sy + 11, 2, 4, DMG.dark);
  px(ctx, sx + 7, sy + 11, 2, 4, DMG.darkest);
  // Canopy: a dark blob with a darkest outline and a light highlight.
  px(ctx, sx + 3, sy + 1, 10, 11, DMG.darkest);
  px(ctx, sx + 4, sy + 2, 8, 9, DMG.dark);
  px(ctx, sx + 5, sy + 3, 3, 2, DMG.light); // highlight
  px(ctx, sx + 9, sy + 6, 2, 2, DMG.light);
}

function drawBush(
  ctx: CanvasRenderingContext2D,
  sx: number,
  sy: number,
  col: number,
  row: number,
): void {
  drawGrass(ctx, sx, sy, col, row);
  px(ctx, sx + 2, sy + 5, 12, 8, DMG.darkest);
  px(ctx, sx + 3, sy + 6, 10, 6, DMG.dark);
  px(ctx, sx + 4, sy + 7, 2, 1, DMG.light);
  px(ctx, sx + 9, sy + 8, 2, 1, DMG.light);
}

// Paint a single tile at screen position (sx, sy). `col`/`row` are the tile's
// map coordinates (used for deterministic detail); `time` drives water ripples.
export function drawTile(
  ctx: CanvasRenderingContext2D,
  id: number,
  sx: number,
  sy: number,
  col: number,
  row: number,
  time: number,
): void {
  switch (id) {
    case Tile.WATER:
      drawWater(ctx, sx, sy, col, row, time);
      break;
    case Tile.SAND:
      drawSand(ctx, sx, sy, col, row);
      break;
    case Tile.PATH:
      drawPath(ctx, sx, sy);
      break;
    case Tile.TREE:
      drawTree(ctx, sx, sy, col, row);
      break;
    case Tile.BUSH:
      drawBush(ctx, sx, sy, col, row);
      break;
    case Tile.GRASS:
    default:
      drawGrass(ctx, sx, sy, col, row);
      break;
  }
}
