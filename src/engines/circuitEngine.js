/**
 * Circuit Computational Simulation Engine
 * Handles series/parallel networks, nodal matrix analysis,
 * Thevenin equivalent modeling, and load line calculations.
 */

// Basic Ohm's Law and Power
export function calculateOhmsLaw({ v, i, r }) {
  if (v !== undefined && i !== undefined) return { r: v / i, p: v * i };
  if (v !== undefined && r !== undefined) return { i: v / r, p: (v * v) / r };
  if (i !== undefined && r !== undefined) return { v: i * r, p: i * i * r };
  throw new Error("Provide at least two parameters among v, i, r");
}

// Resistor Combinations
export function seriesResistance(resistors) {
  return resistors.reduce((sum, r) => sum + Number(r), 0);
}

export function parallelResistance(resistors) {
  const nonzero = resistors.filter(r => Number(r) > 0);
  if (nonzero.length === 0) return 0;
  const reciprocalSum = nonzero.reduce((sum, r) => sum + (1 / Number(r)), 0);
  return 1 / reciprocalSum;
}

// Voltage Divider: Vout = Vin * (R2 / (R1 + R2))
export function voltageDivider(vIn, r1, r2) {
  const total = Number(r1) + Number(r2);
  if (total === 0) return 0;
  const vOut = (Number(vIn) * Number(r2)) / total;
  const current = Number(vIn) / total;
  return { vOut, current, vDropR1: Number(vIn) - vOut };
}

// Thevenin Equivalent & Load Line
// Vopen = Voc = Vth
// Ishort = Isc = Ishunt
// Rth = Voc / Isc
export function theveninModel({ voc, isc, rth }) {
  let vTh = voc;
  let iSc = isc;
  let rTh = rth;

  if (vTh !== undefined && iSc !== undefined && rTh === undefined) {
    rTh = iSc !== 0 ? vTh / iSc : Infinity;
  } else if (vTh !== undefined && rTh !== undefined && iSc === undefined) {
    iSc = rTh !== 0 ? vTh / rTh : Infinity;
  } else if (iSc !== undefined && rTh !== undefined && vTh === undefined) {
    vTh = iSc * rTh;
  }

  return {
    vTh,
    rTh,
    iSc,
    // Output voltage given a load resistance RL
    outputForLoad: (rL) => {
      const rlNum = Number(rL);
      if (rlNum === Infinity) return { vOut: vTh, iOut: 0, power: 0 };
      if (rlNum <= 0) return { vOut: 0, iOut: iSc, power: 0 };
      const current = vTh / (rTh + rlNum);
      const vOut = current * rlNum;
      const power = current * vOut;
      return { vOut, iOut: current, power };
    },
    // Output voltage given an external output current Io (Load line: Vo = Vth - Io * Rth)
    voltageAtCurrent: (iOut) => vTh - (iOut * rTh)
  };
}

// Wheatstone Bridge Model (Tutorial 2)
// VB across bridge. Two legs: (R1B, R1G) and (R2B, R2G).
// Node 1: between R1B and R1G -> V1 = VB * (R1G / (R1B + R1G))
// Node 2: between R2B and R2G -> V2 = VB * (R2G / (R2B + R2G))
// Output: Vo = V2 - V1
export function wheatstoneBridge({ vB, r1B, r1G, r2B, r2G, rL = Infinity }) {
  const v1 = (vB * r1G) / (r1B + r1G);
  const v2 = (vB * r2G) / (r2B + r2G);
  const vTh = v2 - v1;
  const rTh1 = (r1B * r1G) / (r1B + r1G);
  const rTh2 = (r2B * r2G) / (r2B + r2G);
  const rTh = rTh1 + rTh2;

  let vOutWithLoad = vTh;
  let iLoad = 0;
  if (rL !== Infinity && rL > 0) {
    iLoad = vTh / (rTh + rL);
    vOutWithLoad = iLoad * rL;
  }

  return {
    v1,
    v2,
    vTh,
    rTh,
    isBalanced: Math.abs(r1B * r2G - r2B * r1G) < 1e-9,
    vOutWithLoad,
    iLoad
  };
}

// Gaussian Elimination Nodal Solver (Lecture Quiz 5)
// Solves [A][V] = [B]
export function solveLinearSystem(A, B) {
  const n = B.length;
  // Deep clone matrix
  const M = A.map((row, i) => [...row, B[i]]);

  for (let i = 0; i < n; i++) {
    // Find pivot
    let maxRow = i;
    for (let k = i + 1; k < n; k++) {
      if (Math.abs(M[k][i]) > Math.abs(M[maxRow][i])) {
        maxRow = k;
      }
    }
    // Swap rows
    [M[i], M[maxRow]] = [M[maxRow], M[i]];

    if (Math.abs(M[i][i]) < 1e-12) {
      throw new Error("Singular matrix: circuit has non-unique or disconnected node potentials.");
    }

    // Eliminate below
    for (let k = i + 1; k < n; k++) {
      const factor = M[k][i] / M[i][i];
      for (let j = i; j <= n; j++) {
        M[k][j] -= factor * M[i][j];
      }
    }
  }

  // Back substitution
  const X = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let sum = M[i][n];
    for (let j = i + 1; j < n; j++) {
      sum -= M[i][j] * X[j];
    }
    X[i] = sum / M[i][i];
  }
  return X;
}
