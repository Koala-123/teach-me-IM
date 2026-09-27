/**
 * Operational Amplifier (Op-Amp) Computational Engine
 * Implements Sedra/Smith Chapter 2 closed-loop models,
 * finite open-loop gain (A) equations, saturation physics,
 * virtual-ground verification, and Gain-Bandwidth Product (GBWP).
 */

export function calculateInvertingOpAmp({
  vIn,
  r1,
  r2,
  openLoopGain = Infinity,
  vCc = 12.0, // Positive rail
  vEe = -12.0, // Negative rail
  gbwpHz = 1e6 // 1 MHz nominal GBWP
}) {
  const rRatio = Number(r2) / Number(r1);

  // Finite open loop gain equation: G = - (R2/R1) / (1 + (1 + R2/R1)/A)
  let gain = -rRatio;
  if (openLoopGain !== Infinity && openLoopGain > 0) {
    gain = -rRatio / (1 + (1 + rRatio) / openLoopGain);
  }

  // Linear output voltage
  const vOutLinear = Number(vIn) * gain;

  // Rail saturation check
  const isSaturatedHigh = vOutLinear >= vCc;
  const isSaturatedLow = vOutLinear <= vEe;
  const isSaturated = isSaturatedHigh || isSaturatedLow;
  const vOut = Math.max(vEe, Math.min(vCc, vOutLinear));

  // Virtual ground at inverting node: V1 = - Vout / A (since V2 = 0)
  let vInvertingTerminal = 0;
  if (isSaturated) {
    // Negative feedback is broken! Virtual ground fails!
    // KCL at node: (Vin - V1)/R1 = (V1 - Vout)/R2 => V1*(1/R1 + 1/R2) = Vin/R1 + Vout/R2
    vInvertingTerminal = (vIn / r1 + vOut / r2) / (1 / r1 + 1 / r2);
  } else if (openLoopGain !== Infinity) {
    vInvertingTerminal = -vOut / openLoopGain;
  }

  // Currents
  const i1 = (vIn - vInvertingTerminal) / r1; // Through R1
  const i2 = i1; // Must equal i1 since ideal opamp draws zero input current
  const inputImpedance = r1;

  // Bandwidth calculation (Gittaly Op-Amp Q1)
  const closedLoopGainMag = Math.abs(gain);
  const cutoffFreqHz = closedLoopGainMag > 0 ? gbwpHz / closedLoopGainMag : gbwpHz;

  return {
    gain,
    idealGain: -rRatio,
    vOut,
    vOutLinear,
    isSaturated,
    isSaturatedHigh,
    isSaturatedLow,
    vInvertingTerminal,
    vNonInvertingTerminal: 0,
    differentialInputV: 0 - vInvertingTerminal,
    isVirtualShortMaintained: Math.abs(vInvertingTerminal) < 0.05 && !isSaturated,
    currentI1Ma: i1 * 1000,
    cutoffFreqHz,
    inputImpedance
  };
}

export function calculateNonInvertingOpAmp({
  vIn,
  r1,
  r2,
  openLoopGain = Infinity,
  vCc = 12.0,
  vEe = -12.0,
  gbwpHz = 1e6
}) {
  const rRatio = Number(r2) / Number(r1);
  let gain = 1 + rRatio;
  if (openLoopGain !== Infinity && openLoopGain > 0) {
    gain = (1 + rRatio) / (1 + (1 + rRatio) / openLoopGain);
  }

  const vOutLinear = Number(vIn) * gain;
  const isSaturatedHigh = vOutLinear >= vCc;
  const isSaturatedLow = vOutLinear <= vEe;
  const isSaturated = isSaturatedHigh || isSaturatedLow;
  const vOut = Math.max(vEe, Math.min(vCc, vOutLinear));

  let vInvertingTerminal = vIn;
  if (isSaturated) {
    // Feedback divider: V1 = Vout * (R1 / (R1 + R2))
    vInvertingTerminal = (vOut * r1) / (r1 + r2);
  } else if (openLoopGain !== Infinity) {
    vInvertingTerminal = vIn - (vOut / openLoopGain);
  }

  const closedLoopGainMag = Math.abs(gain);
  const cutoffFreqHz = closedLoopGainMag > 0 ? gbwpHz / closedLoopGainMag : gbwpHz;

  return {
    gain,
    idealGain: 1 + rRatio,
    vOut,
    vOutLinear,
    isSaturated,
    vInvertingTerminal,
    vNonInvertingTerminal: vIn,
    differentialInputV: vIn - vInvertingTerminal,
    isVirtualShortMaintained: Math.abs(vIn - vInvertingTerminal) < 0.05 && !isSaturated,
    cutoffFreqHz,
    inputImpedance: Infinity
  };
}
