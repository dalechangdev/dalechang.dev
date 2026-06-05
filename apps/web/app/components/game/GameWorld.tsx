"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./GameWorld.module.css";
import { buildMap } from "./map";
import { createGame, type Dir, type MenuState } from "./engine";
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
  // The engine pushes menu changes here so we can render the menu as crisp DOM.
  const [menu, setMenu] = useState<MenuState>({
    open: false,
    index: 0,
    options: [],
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = VIEW_W;
    canvas.height = VIEW_H;
    ctx.imageSmoothingEnabled = false;

    const game = createGame(buildMap(), setMenu);
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
      // The engine decides whether the key drives the player or the menu.
      if (game.keyDown(e.code, e.repeat)) e.preventDefault();
    };
    const onKeyUp = (e: KeyboardEvent): void => {
      game.keyUp(e.code);
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

      {menu.open && (
        <div className={styles.menu} role="menu">
          {menu.options.map((opt, i) => (
            <div
              key={opt.id}
              className={`${styles.menuItem} ${i === menu.index ? styles.menuItemActive : ""}`}
              role="menuitem"
              aria-current={i === menu.index}
            >
              <span className={styles.menuPointer}>{i === menu.index ? "▶" : ""}</span>
              {opt.label}
            </div>
          ))}
        </div>
      )}

      <p className={styles.hint}>WASD / arrows to move · Enter for menu</p>

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
