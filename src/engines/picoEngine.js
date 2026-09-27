/**
 * Raspberry Pi Pico (RP2040) Computational Engine
 * Models ADC quantization, potentiometer divider, LED ballast resistors,
 * power budgeting (VBUS vs VSYS vs 3V3_OUT), and pin safety checks.
 */

export const PICO_SPECS = {
  vcc: 3.3, // Nominal I/O voltage
  adcResolutionBits: 12, // Hardware SAR ADC
  adcMaxRaw12: 4095,
  adcMaxRaw16: 65535, // MicroPython read_u16() scale
  maxGpioCurrentMa: 20, // Absolute maximum DC current per GPIO pin (recommended nominal is <= 12mA)
  max3v3SmpsCurrentMa: 300, // Safe limit for RT6150 regulator to external loads
  vbusNominal: 5.0, // USB supply
  vsysMin: 1.8,
  vsysMax: 5.5,
};

// Convert raw ADC value to voltage
export function rawAdcToVoltage(raw, bits = 16, vRef = 3.3) {
  const maxVal = bits === 12 ? 4095 : 65535;
  const clamped = Math.max(0, Math.min(maxVal, raw));
  return (clamped / maxVal) * vRef;
}

// Convert voltage to raw ADC value
export function voltageToRawAdc(voltage, bits = 16, vRef = 3.3) {
  const maxVal = bits === 12 ? 4095 : 65535;
  const clamped = Math.max(0, Math.min(vRef, voltage));
  return Math.round((clamped / vRef) * maxVal);
}

// Potentiometer 3-Terminal Wiper Simulator (Gittaly Pico Q5)
// Wiper percent from GND (0%) to 3V3 (100%)
export function simulatePotentiometer({ totalResistanceOhms = 10000, wiperPercent = 30, vSupply = 3.3 }) {
  const frac = Math.max(0, Math.min(100, wiperPercent)) / 100;
  const rBottom = totalResistanceOhms * frac;
  const rTop = totalResistanceOhms * (1 - frac);
  const wiperVoltage = vSupply * frac;
  const raw12Bit = voltageToRawAdc(wiperVoltage, 12, vSupply);
  const raw16Bit = voltageToRawAdc(wiperVoltage, 16, vSupply);

  return {
    wiperVoltage,
    rBottom,
    rTop,
    raw12Bit,
    raw16Bit,
    currentDrawnMa: (vSupply / totalResistanceOhms) * 1000
  };
}

// LED Current Limiting Resistor (Gittaly Pico Q2)
// Given Vsupply (e.g. 3.3V), Vf (~2.0V), desired If (~20mA = 0.02A)
export function calculateLedResistor({ vSupply = 3.3, vForward = 2.0, targetCurrentMa = 20 }) {
  const targetCurrentA = targetCurrentMa / 1000;
  const vDropResistor = vSupply - vForward;
  if (vDropResistor <= 0) {
    throw new Error("Supply voltage must be greater than LED forward voltage");
  }
  const exactResistance = Math.round((vDropResistor / targetCurrentA) * 100) / 100;
  // Standard E12 resistor values
  const e12 = [47, 56, 68, 82, 100, 120, 150, 180, 220, 270, 330, 390, 470, 560, 680, 820, 1000];
  const nearestHigher = e12.find(r => r >= exactResistance) || Math.ceil(exactResistance);
  const actualCurrentMa = (vDropResistor / nearestHigher) * 1000;
  const resistorPowerMw = actualCurrentMa * 0.001 * vDropResistor * 1000;

  return {
    exactResistance,
    recommendedResistorOhms: nearestHigher,
    actualCurrentMa,
    resistorPowerMw,
    vDropResistor,
    isGpioSafe: actualCurrentMa <= PICO_SPECS.maxGpioCurrentMa
  };
}

// GPIO Pin Overvoltage Safety Evaluation
export function evaluatePinSafety(appliedVoltage) {
  if (appliedVoltage <= 3.3) {
    return {
      status: "SAFE",
      message: "Voltage is within the nominal 3.3V RP2040 GPIO rating.",
      riskLevel: "none"
    };
  } else if (appliedVoltage <= 3.6) {
    return {
      status: "MARGINAL",
      message: "Exceeds 3.3V nominal; at upper boundary of absolute maximum ratings. Long-term reliability reduced.",
      riskLevel: "medium"
    };
  } else {
    return {
      status: "FATAL_RISK",
      message: "CRITICAL: 5V applied to RP2040 GPIO conducts through internal ESD clamp diodes into 3.3V rail. Will cause thermal latch-up and permanently fry the GPIO pin!",
      riskLevel: "critical",
      solution: "Must use a voltage divider (e.g., 1kΩ / 2kΩ) or bidirectional logic level shifter."
    };
  }
}
