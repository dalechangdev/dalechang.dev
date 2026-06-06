// Modern full-color pixel palette (SNES "A Link to the Past" flavored):
// blue water, vivid grass, stone paths, brown-trunked trees.
export const C = {
  // Water (blues)
  waterDeep: "#1e5a99",
  waterMid: "#2d7dc4",
  waterLight: "#4a9fd8",
  waterFoam: "#a6dcf0",

  // Grass (greens)
  grassDark: "#3e7d32",
  grassMid: "#5aa83f",
  grassLight: "#74c244",
  grassHi: "#9fd95a",

  // Sand / beach
  sandDark: "#c2a868",
  sandMid: "#ddc488",
  sandLight: "#ece3b0",

  // Stone path
  mortar: "#56524a",
  stoneDark: "#7c7868",
  stoneMid: "#9d9a8a",
  stoneLight: "#c0bca8",

  // Trees
  trunk: "#7a4e2b",
  trunkDark: "#553519",
  leafDark: "#2f5d34",
  leafMid: "#3e8948",
  leafHi: "#5aa83f",

  // Hero
  tunic: "#36a33a",
  tunicDark: "#1f7a26",
  skin: "#f2c79a",
  skinDark: "#d79a64",
  boot: "#7a4e2b",
  bootDark: "#4a2e1a",
  eye: "#22303a",
  hatHi: "#6ad06a",
} as const;

export type ColorName = keyof typeof C;
