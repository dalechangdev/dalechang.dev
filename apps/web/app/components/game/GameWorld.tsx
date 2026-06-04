"use client";

import { useEffect, useRef } from "react";
import styles from "./GameWorld.module.css";
import { buildMap } from "./map";
import { createGame, KEY_TO_DIR, type Dir } from "./engine";
import { TILE } from "./tiles";

// Internal (pre-scale) viewport, in tiles. The canvas renders at this small
// resolution and is then integer-scaled up with `image-rendering: pixelated`
// for crisp GameBoy pixels.
const VIEW_COLS = 16;
const VIEW_ROWS = 12;
const VIEW_W = VIEW_COLS * TILE; // 256
const VIEW_H = VIEW_ROWS * TILE; // 192

export default function GameWorld() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Imperative handle the touch D-pad uses to drive the game.
  const setDirRef = useRef<((dir: Dir, held: boolean) => void) | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = VIEW_W;
    canvas.height = VIEW_H;
    ctx.imageSmoothingEnabled = false;

    const game = createGame(buildMap());
    setDirRef.current = game.setDirHeld;

    // Scale the canvas up by the largest integer factor that fits the window.
    const fitToWindow = (): void => {
      const scale = Math.max(
        1,
        Math.floor(Math.min(window.innerWidth / VIEW_W, window.innerHeight / VIEW_H)),
      );
      canvas.style.width = `${VIEW_W * scale}px`;
      canvas.style.height = `${VIEW_H * scale}px`;
    };
    fitToWindow();
    window.addEventListener("resize", fitToWindow);

    const onKeyDown = (e: KeyboardEvent): void => {
      const dir = KEY_TO_DIR[e.code];
      if (dir === undefined) return;
      e.preventDefault(); // stop arrow keys from scrolling the page
      if (!e.repeat) game.setDirHeld(dir, true);
    };
    const onKeyUp = (e: KeyboardEvent): void => {
      const dir = KEY_TO_DIR[e.code];
      if (dir === undefined) return;
      game.setDirHeld(dir, false);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    let raf = 0;
    let last = performance.now();
    const loop = (now: number): void => {
      const dt = Math.min(now - last, 100); // clamp after tab-switch stalls
      last = now;
      game.update(dt);
      game.render(ctx, VIEW_W, VIEW_H, now);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", fitToWindow);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      setDirRef.current = null;
    };
  }, []);

  // Touch D-pad so the homepage is still playable without a keyboard.
  const dpadProps = (dir: Dir) => ({
    onPointerDown: (e: React.PointerEvent) => {
      e.preventDefault();
      setDirRef.current?.(dir, true);
    },
    onPointerUp: () => setDirRef.current?.(dir, false),
    onPointerLeave: () => setDirRef.current?.(dir, false),
    onPointerCancel: () => setDirRef.current?.(dir, false),
  });

  return (
    <div className={styles.root}>
      <p className={styles.hud}>Dale&apos;s Island</p>

      <canvas ref={canvasRef} className={styles.canvas} />

      <p className={styles.hint}>WASD / arrow keys to move</p>

      <div className={styles.dpad} aria-hidden="true">
        <button className={styles.up} {...dpadProps(1)}>
          ▲
        </button>
        <button className={styles.left} {...dpadProps(2)}>
          ◀
        </button>
        <button className={styles.right} {...dpadProps(3)}>
          ▶
        </button>
        <button className={styles.down} {...dpadProps(0)}>
          ▼
        </button>
      </div>
    </div>
  );
}
