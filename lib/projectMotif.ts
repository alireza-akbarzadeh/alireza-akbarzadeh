/**
 * A deterministic geometric motif per project.
 *
 * Every project needs a visual, and only one of them has a real screenshot. The
 * options were a placeholder, a stock image, or something generated from the
 * project itself — and only the third is honest. This derives a fixed motif
 * from the slug: distinct per project, identical on every render, and never
 * pretending to depict a product it hasn't seen.
 *
 * It intentionally echoes the hero's particle field — a displaced grid — so the
 * covers read as the same visual language rather than as clip art.
 */

/** FNV-1a. Small, fast, and stable across builds — Math.random() is not. */
const hash = (input: string): number => {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
};

/** Deterministic PRNG seeded from the hash, so the sequence is reproducible. */
const rng = (seed: number) => {
  let state = seed || 1;
  return () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return ((state >>> 0) % 100000) / 100000;
  };
};

export type MotifCell = {
  x: number;
  y: number;
  r: number;
  /** True for the few cells that take the accent colour. */
  accent: boolean;
};

export type Motif = {
  cells: MotifCell[];
  cols: number;
  rows: number;
};

/**
 * A grid of dots whose radii follow a wave whose phase and frequency come from
 * the slug. Roughly one cell in fourteen takes the accent, so the amber reads
 * as punctuation rather than as a second colour — the same rule the design
 * system applies everywhere else.
 */
export function projectMotif(slug: string, cols = 26, rows = 14): Motif {
  const seed = hash(slug);
  const random = rng(seed);

  const phaseX = random() * Math.PI * 2;
  const phaseY = random() * Math.PI * 2;
  const freqX = 0.35 + random() * 0.5;
  const freqY = 0.3 + random() * 0.45;
  const tilt = (random() - 0.5) * 0.6;

  const cells: MotifCell[] = [];

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const wave =
        Math.sin(x * freqX + phaseX + y * tilt) * 0.5 +
        Math.sin(y * freqY + phaseY) * 0.5;

      // wave is -1..1 → radius 0.35..2.6px. Nothing disappears entirely, so the
      // grid stays legible as a grid.
      const r = 0.35 + ((wave + 1) / 2) * 2.25;

      cells.push({
        x,
        y,
        r: Number(r.toFixed(2)),
        accent: wave > 0.82,
      });
    }
  }

  return { cells, cols, rows };
}
