import { DMG } from "./palette";
import { drawPlayer, SPRITE_W } from "./sprite";
import { isSolid, drawTile, Tile, TILE } from "./tiles";
import type { GameMap } from "./map";

// 0=down 1=up 2=left 3=right
export type Dir = 0 | 1 | 2 | 3;

const DELTAS: Record<Dir, [number, number]> = {
  0: [0, 1],
  1: [0, -1],
  2: [-1, 0],
  3: [1, 0],
};

// Maps KeyboardEvent.code -> direction. `code` is keyboard-layout independent
// (KeyW is the physical W key) and covers both WASD and the arrow keys.
export const KEY_TO_DIR: Record<string, Dir> = {
  ArrowUp: 1,
  KeyW: 1,
  ArrowDown: 0,
  KeyS: 0,
  ArrowLeft: 2,
  KeyA: 2,
  ArrowRight: 3,
  KeyD: 3,
};

// Milliseconds to traverse a single tile.
const STEP_MS = 150;

const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;
const clamp = (v: number, lo: number, hi: number): number =>
  Math.max(lo, Math.min(hi, v));

export interface Game {
  setDirHeld(dir: Dir, held: boolean): void;
  update(dtMs: number): void;
  render(ctx: CanvasRenderingContext2D, viewW: number, viewH: number, time: number): void;
}

export function createGame(map: GameMap): Game {
  const player = {
    col: map.spawnCol,
    row: map.spawnRow,
    x: map.spawnCol * TILE,
    y: map.spawnRow * TILE,
    dir: 0 as Dir,
    frame: 0,
    moving: false,
    t: 0,
    fromX: 0,
    fromY: 0,
    toX: 0,
    toY: 0,
    targetCol: 0,
    targetRow: 0,
  };

  // Directions currently held, in press order; the most recent wins so the
  // controls feel responsive when two keys overlap.
  const held: Dir[] = [];

  const walkable = (c: number, r: number): boolean =>
    r >= 0 &&
    r < map.rows &&
    c >= 0 &&
    c < map.cols &&
    !isSolid(map.grid[r]![c]!);

  const setDirHeld = (dir: Dir, isHeld: boolean): void => {
    const i = held.indexOf(dir);
    if (isHeld) {
      if (i < 0) held.push(dir);
    } else if (i >= 0) {
      held.splice(i, 1);
    }
  };

  const update = (dtMs: number): void => {
    if (!player.moving) {
      const dir = held.length ? held[held.length - 1]! : null;
      if (dir !== null) {
        player.dir = dir;
        const [dc, dr] = DELTAS[dir];
        const nc = player.col + dc;
        const nr = player.row + dr;
        if (walkable(nc, nr)) {
          player.moving = true;
          player.t = 0;
          player.fromX = player.x;
          player.fromY = player.y;
          player.toX = nc * TILE;
          player.toY = nr * TILE;
          player.targetCol = nc;
          player.targetRow = nr;
        } else {
          player.frame = 0; // bump: face the wall but don't move
        }
      } else {
        player.frame = 0;
      }
    }

    if (player.moving) {
      player.t += dtMs / STEP_MS;
      if (player.t >= 1) {
        player.moving = false;
        player.col = player.targetCol;
        player.row = player.targetRow;
        player.x = player.toX;
        player.y = player.toY;
        player.frame = 0;
      } else {
        player.x = lerp(player.fromX, player.toX, player.t);
        player.y = lerp(player.fromY, player.toY, player.t);
        // Two leg steps per tile traversed.
        player.frame = player.t < 0.5 ? 1 : 2;
      }
    }
  };

  const render = (
    ctx: CanvasRenderingContext2D,
    viewW: number,
    viewH: number,
    time: number,
  ): void => {
    const mapW = map.cols * TILE;
    const mapH = map.rows * TILE;

    // Camera centers on the player and is clamped to the map, so the water
    // border is always the thing that stops you.
    const camX = Math.round(
      clamp(player.x + TILE / 2 - viewW / 2, 0, Math.max(0, mapW - viewW)),
    );
    const camY = Math.round(
      clamp(player.y + TILE / 2 - viewH / 2, 0, Math.max(0, mapH - viewH)),
    );

    // Fill with deep water first (covers any area outside the map bounds).
    ctx.fillStyle = DMG.dark;
    ctx.fillRect(0, 0, viewW, viewH);

    const c0 = Math.floor(camX / TILE);
    const r0 = Math.floor(camY / TILE);
    const c1 = Math.ceil((camX + viewW) / TILE);
    const r1 = Math.ceil((camY + viewH) / TILE);

    for (let r = r0; r <= r1; r++) {
      for (let c = c0; c <= c1; c++) {
        const sx = c * TILE - camX;
        const sy = r * TILE - camY;
        const id =
          r >= 0 && r < map.rows && c >= 0 && c < map.cols
            ? map.grid[r]![c]!
            : Tile.WATER;
        drawTile(ctx, id, sx, sy, c, r, time);
      }
    }

    drawPlayer(
      ctx,
      Math.round(player.x - camX + (TILE - SPRITE_W) / 2),
      Math.round(player.y - camY),
      player.dir,
      player.frame,
    );
  };

  return { setDirHeld, update, render };
}
