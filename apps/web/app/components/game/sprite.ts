import { C } from "./palette";

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
  const r = (x: number, y: number, w: number, h: number, c: string): void => {
    ctx.fillStyle = c;
    ctx.fillRect(ox + x, oy + y, w, h);
  };

  // Soft contact shadow.
  ctx.fillStyle = "rgba(0,0,0,0.18)";
  ctx.fillRect(ox + 3, oy + 15, 6, 1);

  // Legs / boots (two 2px bars); alternating lengths read as a walk cycle.
  const lh = frame === 1 ? 4 : frame === 2 ? 2 : 3;
  const rh = frame === 1 ? 2 : frame === 2 ? 4 : 3;
  r(3, 12, 2, lh, C.boot);
  r(7, 12, 2, rh, C.boot);
  r(3, 12 + lh - 1, 2, 1, C.bootDark);
  r(7, 12 + rh - 1, 2, 1, C.bootDark);

  // Green tunic body with belt and side arms.
  r(2, 7, 8, 5, C.tunic);
  r(2, 11, 8, 1, C.boot); // belt
  r(2, 10, 8, 1, C.tunicDark);
  r(1, 8, 1, 3, C.skin); // hands
  r(10, 8, 1, 3, C.skin);

  // Pointed green hat + brim.
  r(3, 0, 6, 1, C.tunicDark);
  r(2, 1, 8, 2, C.tunic);
  r(1, 2, 10, 1, C.tunic);
  r(4, 1, 2, 1, C.hatHi); // highlight

  // Head / face depends on facing.
  if (dir === 1) {
    // Facing away: back of the head (hat), no face.
    r(3, 3, 6, 4, C.tunic);
    r(3, 6, 6, 1, C.tunicDark);
  } else if (dir === 0) {
    // Facing the camera: skin face with two eyes.
    r(3, 3, 6, 4, C.skin);
    r(3, 6, 6, 1, C.skinDark);
    r(4, 4, 1, 1, C.eye);
    r(7, 4, 1, 1, C.eye);
  } else {
    // Side profile: one eye and a small nose on the facing side.
    r(3, 3, 6, 4, C.skin);
    r(3, 6, 6, 1, C.skinDark);
    const eyeX = dir === 2 ? 4 : 7;
    r(eyeX, 4, 1, 1, C.eye);
    const noseX = dir === 2 ? 2 : 9;
    r(noseX, 4, 1, 2, C.skinDark);
  }
}
