import { DMG } from "./palette";

// The hero is drawn procedurally (no image assets) inside a 12x16 box. Swapping
// in a real sprite sheet later only means rewriting this one function.
export const SPRITE_W = 12;
export const SPRITE_H = 16;

// dir: 0=down 1=up 2=left 3=right. frame: 0=stand, 1/2=walk steps.
export function drawPlayer(
  ctx: CanvasRenderingContext2D,
  ox: number,
  oy: number,
  dir: number,
  frame: number,
): void {
  const D = DMG.darkest;
  const M = DMG.dark;
  const L = DMG.light;
  const W = DMG.lightest;

  const r = (x: number, y: number, w: number, h: number, c: string): void => {
    ctx.fillStyle = c;
    ctx.fillRect(ox + x, oy + y, w, h);
  };

  // Soft contact shadow.
  r(3, 15, 6, 1, M);

  // Legs (two 2px bars); alternating lengths read as a walk cycle.
  const lh = frame === 1 ? 4 : frame === 2 ? 2 : 3;
  const rh = frame === 1 ? 2 : frame === 2 ? 4 : 3;
  r(3, 12, 2, lh, D);
  r(7, 12, 2, rh, D);

  // Tunic body with belt and side arms.
  r(2, 7, 8, 5, M);
  r(2, 11, 8, 1, D);
  r(1, 8, 1, 3, M);
  r(10, 8, 1, 3, M);

  // Hat (peaked) + brim.
  r(3, 0, 6, 1, D);
  r(2, 1, 8, 2, M);
  r(1, 2, 10, 1, M);

  // Head / face depends on facing.
  if (dir === 1) {
    // Facing away: back of the head, no face.
    r(3, 3, 6, 4, M);
  } else if (dir === 0) {
    // Facing the camera: light face with two eyes.
    r(3, 3, 6, 4, L);
    r(4, 4, 1, 1, D);
    r(7, 4, 1, 1, D);
  } else {
    // Side profile: one eye and a small nose on the facing side.
    r(3, 3, 6, 4, L);
    const eyeX = dir === 2 ? 4 : 7;
    r(eyeX, 4, 1, 1, D);
    const noseX = dir === 2 ? 2 : 9;
    r(noseX, 4, 1, 2, L);
  }

  // A pixel of highlight on the hat for a touch of shape.
  r(4, 1, 2, 1, W);
}
