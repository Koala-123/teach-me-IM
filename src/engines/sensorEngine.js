/**
 * Sensor Computational Simulation Engine
 * Simulates HC-SR04 ultrasonic echo physics, ring-down blind zones,
 * voltage level translation, and IR photodiode/comparator optics.
 */

// Speed of sound with air temperature compensation in m/s
export function speedOfSound(tempCelsius = 20) {
  return 331.3 + (0.606 * Number(tempCelsius));
}

// Ultrasonic Distance from Echo Pulse Width
export function calculateUltrasonicDistance({ echoTimeUs, tempCelsius = 20 }) {
  const c = speedOfSound(tempCelsius); // in m/s
  // c in cm/us: c * 100 / 1e6 = c * 1e-4
  const cCmPerUs = (c * 100) / 1000000;
  
  // Total round-trip distance = echoTimeUs * cCmPerUs
  // One-way distance to target:
  const distanceCm = (echoTimeUs * cCmPerUs) / 2;

  // HC-SR04 Physical limits:
  // Minimum blind zone is ~2 cm to 3 cm due to transducer piezoelectric ring-down
  // Maximum effective range is ~400 cm
  const isTooClose = distanceCm < 2.5;
  const isOutOfRange = distanceCm > 400;
  const isValid = !isTooClose && !isOutOfRange;

  return {
    distanceCm,
    distanceM: distanceCm / 100,
    speedOfSoundMs: c,
    isValid,
    errorReason: isTooClose 
      ? "BLIND_ZONE: Distance < 2.5cm. Transducer ring-down time overlaps with returning echo, corrupting measurement."
      : isOutOfRange 
      ? "OUT_OF_RANGE: Distance > 400cm. Acoustic wave attenuated below detector sensitivity threshold." 
      : null
  };
}

// Given distance in cm, calculate expected echo time in microseconds
export function distanceToEchoTime({ distanceCm, tempCelsius = 20 }) {
  const c = speedOfSound(tempCelsius);
  const cCmPerUs = (c * 100) / 1000000;
  const echoTimeUs = (2 * distanceCm) / cCmPerUs;
  return Math.round(echoTimeUs);
}

// Ultrasonic Echo Pin Voltage Stepping Level Shifter
export function calculateEchoDivider(r1Top = 1000, r2Bottom = 2000, vEcho = 5.0) {
  const vOut = (vEcho * r2Bottom) / (r1Top + r2Bottom);
  const isSafeForPico = vOut <= 3.35;
  return {
    vOut,
    isSafeForPico,
    message: isSafeForPico
      ? `Safe: Stepped down from ${vEcho}V to ${vOut.toFixed(2)}V (<= 3.3V GPIO rating).`
      : `UNSAFE: ${vOut.toFixed(2)}V exceeds 3.3V GPIO max limit! Risk of permanent damage.`
  };
}

// IR Reflectance and Proximity Physics (Gittaly IR Q1 - Q5)
export function simulateIrSensor({
  distanceMm = 30, // Distance to target
  surfaceType = "matte", // 'matte', 'shiny_mirror'
  surfaceAngleDeg = 0, // Tilt angle of surface relative to normal
  surfaceColor = "white", // 'white', 'gray', 'black', 'red'
  potentiometerThresholdV = 2.0, // Sensitivity set by onboard dial (0 - 5V)
  vcc = 5.0,
  ambientLight = "normal" // 'dark', 'normal', 'direct_sunlight'
}) {
  // Color reflectance factors in IR spectrum (~940nm)
  const colorReflectance = {
    white: 0.90,
    gray: 0.50,
    red: 0.65,
    black: 0.08
  };
  const baseReflectance = colorReflectance[surfaceColor] || 0.50;

  // Angular reflection physics:
  // Matte surface: Lambertian diffuse scattering (cosine factor)
  // Mirror/Shiny: Specular reflection (narrow beam: if angle > 8°, bounces away completely!)
  let geometricReflectance = 1.0;
  const rad = (Math.abs(surfaceAngleDeg) * Math.PI) / 180;

  if (surfaceType === "shiny_mirror") {
    // Highly directional specular reflection
    if (Math.abs(surfaceAngleDeg) > 8) {
      geometricReflectance = 0.02; // Bounces away into room, sensor starved!
    } else {
      geometricReflectance = 0.98;
    }
  } else {
    // Lambertian diffuse reflection: cos(theta)
    geometricReflectance = Math.max(0.1, Math.cos(rad));
  }

  // Inverse square law decay with distance (effective sensor optical range ~10mm to 150mm)
  const normalizedDist = Math.max(5, distanceMm) / 30; // normalized to 30mm
  const distanceAttenuation = 1 / (normalizedDist * normalizedDist);

  // Ambient light offset (sunlight floods photodiode with unmodulated DC infrared)
  let ambientOffsetV = 0.2;
  if (ambientLight === "dark") ambientOffsetV = 0.05;
  if (ambientLight === "direct_sunlight") ambientOffsetV = 3.5; // Saturates sensor!

  // Photodiode output voltage
  const reflectedSignal = baseReflectance * geometricReflectance * distanceAttenuation * 3.5;
  const photodiodeV = Math.min(vcc, ambientOffsetV + reflectedSignal);

  // LM393 Comparator check:
  // Is photodiode voltage above threshold?
  const isObstacleDetected = photodiodeV >= potentiometerThresholdV;

  // Digital OUT pin is typically active LOW on common LM393 modules
  const digitalOutPin = isObstacleDetected ? 0 : 1;

  return {
    photodiodeVoltage: photodiodeV,
    potentiometerThresholdV,
    isObstacleDetected,
    digitalOutPin,
    baseReflectance,
    geometricReflectance,
    isSunlightSaturated: ambientLight === "direct_sunlight" && photodiodeV >= 4.5
  };
}

// Analog IR Sensor 10-bit ADC mapping (Gittaly IR Q4)
export function mapAnalogIrSensor(voltage, vRef = 5.0, adcBits = 10) {
  const maxAdc = Math.pow(2, adcBits) - 1; // 1023
  const adcValue = Math.round((Math.max(0, Math.min(vRef, voltage)) / vRef) * maxAdc);
  const reconstructedV = (adcValue / maxAdc) * vRef;
  return { adcValue, reconstructedV };
}
