/** Shared 3D + HUD palette. HUD consumes CSS tokens; three.js reads these. */
export const palette = {
  void: "#0a0c09",
  voidSoft: "#121510",
  ink: "#141510",
  paper: "#f2efe6",
  paper2: "#e7e2d4",
  sage: "#8a987c",
  sageBright: "#b5c4a4",
  terra: "#d56b3e",
  terraHot: "#f08a58",
  cyan: "#4db7c3",
  gold: "#e0b36a",
  cream: "#efe8d8",
  muted: "#7a7568",
  pathDim: "#3d4338",
  pathLit: "#d56b3e",
  fog: "#0c0f0b",
} as const;

export const kindColor: Record<string, string> = {
  axiom: palette.cream,
  concept: palette.terra,
  theorem: palette.gold,
  bridge: palette.cyan,
  stride: palette.sage,
  practice: palette.sage,
};
