# Recreation prompt

Paste the block below into an app builder (Grok Build, Cursor agent, etc.) that can ship a browser 3D app. No prior conversation is required. Do not summarize — build the whole product.

---

~~~~
Build a production-quality web app called Sphere Grid: a reusable 3D learning skill tree.

It is a game that is not a game. Treat it like a AAA product screen from a 2001 JRPG, rebuilt as a 2026 learning tool. Full-bleed WebGL. Editorial HUD. No purple neon. No emoji. No template dashboard.

## References (must fuse both)

1. Final Fantasy X Sphere Grid: a dark carved-stone circular board seen from a high three-quarter angle. Concentric calendar rings, gold inlay, rune tablets, node sockets, colored crystal spheres sitting in metal collars, dashed paths between them, a slow rotating ceremonial halo. Tidus-era square-enix: heavy, sacred, slightly worn.

2. An editorial learning-map UI (cream paper, sage, terracotta, ink): title of the domain in lowercase, kicker "SHARED BY EVERY GRID", a LIT counter `00/26 LIT · 3 OPEN`, domain tabs, four status cards (Open now / Foundation gaps / The holes / Hard theorems), a "How to read the map" chip, and this copy:

   "Radius is distance from a first principle; angle is which principle you descend from. A node opens once everything inward of it on its ray is derived."

The 3D world is FFX. The HUD is cream paper chips floating over the void. Do not put the disc in a small card on a cream page. The disc IS the room.

## Stack

- TanStack Start + React 19 + TypeScript + Tailwind v4
- three + @react-three/fiber + @react-three/drei + @react-three/postprocessing
- zustand persist for progress
- lucide-react for zoom icons
- Fonts: Outfit (UI), Cormorant Garamond italic (insights), IBM Plex Mono (counters)
- No auth, no database. localStorage is enough.
- site.json og type x:game, title "Sphere Grid"

## Polar grammar (non-negotiable)

- ring 0 = origin axiom at the center
- larger ring = farther from first principles
- angle (degrees) = which principle / sector you descended from
- Bowl the disc slightly: y = -r² * 0.0082 so it reads as a shallow dish
- RING_RADII ≈ [0, 2.55, 4.95, 7.5, 10.1, 11.45], DISC_RADIUS ≈ 12.15
- After placing named nodes, densify like FFX: satellite "stride" gems around named nodes + corridor gems along long edges. Strides are not countable, have no labels.

## Node kinds and materials

- axiom — large cream/gold sphere, origin
- concept — terracotta sphere in a thin torus collar
- theorem — gold octahedron ("hard theorems")
- bridge — cyan icosahedron; jumping it switches domain and selects the paired node
- stride — small sage filler, no label

Statuses:
- lit — derived, gold/sage glow
- open — prereqs all lit (named prereqs only; ignore strides), pulsing, terracotta ring
- hole — adjacent to something lit but not yet open ("true but underived")
- locked — dark bronze, still readable against the stone
- gaps — lit nodes whose inward named prereqs are not all lit (learned out of order)

Opening rule: a node is open iff every named prereq is lit. Axioms with empty prereqs are open from the start. Learning an open node lights it, auto-lights its satellite strides, plays a particle burst + short tone. Do not light locked nodes.

## Three domains (data-driven; isolate graphs from the renderer)

Reuse this exact data shape:

    type GridNode = {
      id: string
      label: string
      label2?: string
      kind: "axiom" | "concept" | "theorem" | "bridge" | "stride"
      ring: number
      angle: number
      prereqs: string[]
      summary: string
      insight?: string
      bridgeTo?: { domain: DomainId; nodeId: string }
    }

### method (26 named)
Axiom: Method @ r0
Ring 1: Conservation 300°, Symmetry 330°, Causality 30°, Invariance 150°, Measurement 90°, Composition 210°
Ring 2: The derivative 268°, Stationarity 198°, Limits 240°, Linearization 310°, Information 120°, Maximum entropy 48°
Ring 3: Symmetry constrains form (theorem) 102°, Least action 292°, Duality 168°, Proof 228°, Variation 18°, Recursion 255°
Ring 4: Physics (bridge → physics:action) 62°, Machine learning (bridge → ml:loss) 6°, Optimization 205°, Geometry of state 278°, Induction 138°, Error 338°, Noether (theorem) 318°

Prereqs (named):
- conservation ← the-derivative
- symmetry ← stationarity
- causality ← the-derivative
- invariance ← stationarity
- measurement ← the-derivative
- composition ← stationarity
- limits ← the-derivative
- linearization ← the-derivative, limits
- information ← measurement
- max-entropy ← information
- symmetry-form ← symmetry, invariance
- least-action ← stationarity, conservation
- duality ← invariance, information
- proof ← composition, limits
- variation ← stationarity, the-derivative
- recursion ← composition
- physics ← least-action, symmetry-form
- machine-learning ← the-derivative, max-entropy, linearization
- optimization ← stationarity, linearization
- geometry-state ← invariance, the-derivative
- induction ← proof, recursion
- error ← measurement, limits
- noether ← symmetry, conservation, least-action

Each node needs a 1–2 sentence summary plus an italic insight. Voice: severe, precise, slightly literary. Not tutorial-blog. Example for Method: "The origin. Not a fact — a way of descending from a first principle until the form is forced." Insight: "Everything on this grid is a consequence. Radius is how far you have walked from an axiom; angle is which axiom you walked from."

### machine learning
Axiom: Learning @ r0
Ring 1: Loss 0°, Representation 60°, Data 120°, Capacity 180°, Gradient 240°, Generalization 300°
Ring 2: SGD 250°, Backprop 20°, Regularization 175°, Bias–variance 130°, Features 70°, Overfitting 305°
Ring 3: Kernels 55°, Trees 100°, Boosting 145°, Neural nets 8°, Equivariance 330°, Attention 350°, Bayes 210°, Adaptive steps 235°
Ring 4: PAC learning (theorem) 280°, Transformers 348°, Information bottleneck (theorem) 190°, Method (bridge → method:the-derivative) 40°, Physics (bridge → physics:maxent-p) 85°

Prereqs: data←loss; capacity←representation; gradient←loss; generalization←data; sgd←gradient; backprop←gradient,representation; regularization←capacity,generalization; bias-variance←capacity,generalization; features←representation; overfitting←generalization,capacity; kernels←features,loss; trees←features,data; boosting←trees,loss; nets←backprop,capacity; conv/equivariance←nets,representation; attention←nets; bayes←loss,generalization; pac←generalization,capacity,overfitting; adam←sgd; transformers←attention,nets; information-bottleneck←bayes,representation,generalization; method-bridge←gradient,loss; physics-bridge←loss,representation

Frame ML as method applied to unknown functions: a model is a parameterized map, a loss is an action, fitting is stationarity.

### physics
Axiom: Nature @ r0
Ring 1: The action 270°, Spacetime 330°, State 30°, Force 90°, Energy 150°, Entropy 210°
Ring 2: Lagrangian 280°, Hamiltonian 200°, Noether (theorem) 320°, Fields 20°, Waves 70°, Thermo 160°
Ring 3: Relativity 340°, Gauge 10°, Quantum 50°, Statistical mechanics 175°, Maximum entropy 140°
Ring 4: Gravity (theorem) 300°, QFT (theorem) 28°, Physical information 210°, Method (bridge → method:least-action) 250°, Machine learning (bridge → ml:loss) 110°

Prereqs: state←action; force←action; energy←action; entropy←state; lagrangian←action; hamiltonian←energy,lagrangian; noether-p←action,space-time; fields←space-time,action; waves←fields,force; thermo←entropy,energy; relativity←space-time,noether-p; gauge←fields,noether-p; quantum←hamiltonian,waves; statmech←thermo,hamiltonian; maxent-p←entropy,thermo; gravity←relativity,action; qft←quantum,fields,gauge; information-p←entropy,quantum; method-bridge-p←action,noether-p; ml-bridge-p←maxent-p,fields

Frame physics as a stationary action with a named symmetry group.

Connect named nodes with explicit edges (origin to first ring, then along the prereq graph). Densify afterwards.

## 3D scene (AAA, not a demo)

Full viewport canvas, camera home ≈ [0, 17.8, 13.2], fov 40, orbit with damping, polar limits so you cannot go under the disc. ACES filmic, exposure ~1.22.

Disc:
- Generate 1024 canvas textures: albedo, emissive, roughness, bump
- Dark olive stone, mineral grain, concentric dashed ceremonial rings, gold inlay on RING_RADII, radial ticks, hashed rune tablets, empty node sockets
- CircleGeometry bowed into a dish + a real stone cylinder lip + gold ring on the rim
- meshStandardMaterial with those maps, bumpScale ~0.55, emissiveIntensity ~1.45
- Slow rotating torus halos just outside the disc (gold, sage, faint terracotta, different speeds)
- Contact shadow, ground plane, fog (#0c0f0b), stars, sparse gold sparkles
- Bloom + vignette + film grain (CSS overlay is fine)
- Decorative meshes (disc, lip, ground, halos) must raycast={() => {}} so they do not steal clicks

Gems:
- meshPhysicalMaterial, clearcoat 1 on named nodes, emissive matching status color
- Invisible (opacity 0, NOT visibile=false) hit spheres ≥ 0.95 so picking works
- Open nodes bob + pulse; selection is a dashed rotating halo, not a white pillar
- Learn burst: ~70 gold points exploding and fading

Labels:
- drei Text + Billboard in WORLD SPACE. Never drei Html. Html labels will float over the HUD — that is a ship-blocker.
- Named nodes only. Strides unlabeled.
- Outline, cream/terracotta/gold by status, fontSize ~0.3–0.42 world units
- raycast noop on text so labels do not steal clicks

Palette (3D + HUD):
void #0a0c09, paper #f2efe6, ink #141510, sage #8a987c, terra #d56b3e, gold #e0b36a, cyan #4db7c3, fog #0c0f0b

## HUD (DOM, z-index 30+, pointer-events-none on the wrap, auto on chips)

Full-bleed dark stage. Cream paper chips, hairline borders, concentric radii, no glassmorphism soup.

- Top-left: domain name lowercase (method / machine learning / physics) + kicker
- Top-right: mono counter `00/26` and `Lit · N open` (named nodes only)
- Under title: three tabs Method / Machine learning / Physics
- Bottom: four tappable status cards + a round asterisk FAB that derives the current open node
- Bottom-right: zoom in / out / fit
- Bottom-left: collapsible "How to read" with the polar copy. Hide it when a node sheet is open so they do not overlap.
- Node inspector sheet (when a named node is selected): kind, status, title, summary, italic insight, prereq chips, Derive / Already derived / Inward nodes still dark, and Cross to {domain} on bridges. z-40. Must sit above the WebGL labels.

Keyboard: Esc deselect, Enter/Space derive, 1/2/3 switch domain.

## Quality / bugs you must not ship

- Labels must never paint over the inspector, tabs, or zoom stack
- Canvas must fill the viewport (not a 0-height flex child). Fade it in when WebGL is ready, with a timeout fallback so it cannot stay opacity 0
- visible=false meshes do not raycast — use transparent opacity 0 hit meshes
- Fog must not swallow the disc (near ~36, far ~88)
- First paint: 1024 textures not 2048; lazy-heavy drei is fine
- Mobile 390px: no horizontal overflow, 44px targets, HUD chips still readable
- Respect prefers-reduced-motion

## Reuse

Graphs are data. The renderer knows nothing about Method vs Physics except colors/kinds. A later app should be able to swap in another GridGraph (biology, law, guitar) and keep the disc, HUD, and opening rules.

Loop, screenshot, fix lighting/texture/HUD overlap, then stop only when it looks like a product, not a CodePen.
~~~~
