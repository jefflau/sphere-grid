let ctx: AudioContext | null = null;

function ac(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  return ctx;
}

export function unlockAudio() {
  const c = ac();
  if (c && c.state === "suspended") void c.resume();
}

function tone(
  freq: number,
  dur: number,
  type: OscillatorType,
  gain: number,
  at = 0,
) {
  const c = ac();
  if (!c) return;
  const t0 = c.currentTime + at;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(gain, t0 + 0.018);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g);
  g.connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.02);
}

export function playHover() {
  tone(640, 0.06, "sine", 0.03);
}

export function playSelect() {
  tone(392, 0.12, "sine", 0.05);
  tone(588, 0.14, "triangle", 0.03, 0.03);
}

export function playLearn() {
  tone(261.63, 0.28, "sine", 0.07);
  tone(329.63, 0.32, "sine", 0.05, 0.05);
  tone(392, 0.38, "triangle", 0.04, 0.1);
}

export function playLocked() {
  tone(180, 0.1, "square", 0.02);
}
