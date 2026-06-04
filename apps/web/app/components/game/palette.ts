// Classic GameBoy (DMG) 4-shade green palette, darkest -> lightest.
// These are the canonical "Dot Matrix Game" LCD colors.
export const DMG = {
  darkest: "#0f380f",
  dark: "#306230",
  light: "#8bac0f",
  lightest: "#9bbc0f",
} as const;

export type DmgShade = keyof typeof DMG;
