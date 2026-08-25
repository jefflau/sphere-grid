export type DomainId = "method" | "ml" | "physics";

export type NodeKind = "axiom" | "concept" | "theorem" | "bridge" | "stride";

export type Vec3 = [number, number, number];

export type GridNode = {
  id: string;
  label: string;
  /** Second line for long names */
  label2?: string;
  kind: NodeKind;
  /** Polar ring, 0 = origin */
  ring: number;
  /** Degrees, 0 = +X (right), 90 = +Z (down on a top-down view) */
  angle: number;
  dr?: number;
  dAngle?: number;
  ox?: number;
  oz?: number;
  prereqs: string[];
  summary: string;
  insight?: string;
  /** Jump to another domain */
  bridgeTo?: { domain: DomainId; nodeId: string };
};

export type GridEdge = {
  from: string;
  to: string;
};

export type GridGraph = {
  id: DomainId;
  name: string;
  kicker: string;
  blurb: string;
  nodes: GridNode[];
  edges: GridEdge[];
};

export type PlacedNode = GridNode & {
  position: Vec3;
  radius: number;
};

export type NodeStatus = "lit" | "open" | "locked" | "hole";
