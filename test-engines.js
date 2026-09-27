/**
 * Headless Algorithmic Verification Suite & Question Bank Schema Test
 * Run with: node test-engines.js
 */

import assert from 'assert';
import katex from 'katex';
import { calculateOhmsLaw, seriesResistance, parallelResistance, voltageDivider, theveninModel, wheatstoneBridge, solveLinearSystem } from './src/engines/circuitEngine.js';
import { rawAdcToVoltage, voltageToRawAdc, simulatePotentiometer, calculateLedResistor, evaluatePinSafety } from './src/engines/picoEngine.js';
import { speedOfSound, calculateUltrasonicDistance, distanceToEchoTime, calculateEchoDivider, simulateIrSensor, mapAnalogIrSensor } from './src/engines/sensorEngine.js';
import { calculateInvertingOpAmp, calculateNonInvertingOpAmp } from './src/engines/opampEngine.js';
import { idealMotorCalculation, calculateGearbox, calculateVehicleDynamics, simulateRealDcMotor, calculateEnergyAndMetabolism, calculateBatteryRuntime } from './src/engines/motorEngine.js';
import { project3DTo2D, runAStarGridPlanning, updateLogOddsOccupancy, calculateOdometry } from './src/engines/roboticsEngine.js';
import { COURSE_MODULES } from './src/data/courseData.js';

console.log("🚀 Starting Antigravity Headless Algorithmic Verification Suite...\n");

let passed = 0;
let failed = 0;

function runTest(name, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(`     ${err.message}`);
    failed++;
  }
}

// 1. Circuit Engine Tests
console.log("⚡ [1/7] Testing Circuit Simulation Engine...");

runTest("Ohm's Law V = I * R and Power", () => {
  const res = calculateOhmsLaw({ v: 5, r: 2 });
  assert.strictEqual(res.i, 2.5);
  assert.strictEqual(res.p, 12.5);
});

runTest("Series and Parallel Resistor Calculations", () => {
  assert.strictEqual(seriesResistance([100, 200, 300]), 600);
  assert.strictEqual(Math.round(parallelResistance([100, 100])), 50);
});

runTest("Voltage Divider Stepping 5V to 3.33V", () => {
  const div = voltageDivider(5.0, 1000, 2000);
  assert(Math.abs(div.vOut - 3.333) < 0.01, `Expected ~3.33V, got ${div.vOut}`);
});

runTest("Thevenin Load Line & Short-Circuit Current (Lecture Quiz 2 & 3)", () => {
  const model = theveninModel({ voc: 5.0, rth: 2.0 });
  assert.strictEqual(model.iSc, 2.5);
  // At Io = 1A, Vo = 5 - 2*1 = 3V
  assert.strictEqual(model.voltageAtCurrent(1.0), 3.0);
  // Under 8Ω load: Vo = 5 * (8/10) = 4.0V
  const loadRes = model.outputForLoad(8.0);
  assert.strictEqual(loadRes.vOut, 4.0);
  assert.strictEqual(loadRes.iOut, 0.5);
});

runTest("Wheatstone Bridge Differential Output (Tutorial 2)", () => {
  const bridge = wheatstoneBridge({ vB: 10, r1B: 1000, r1G: 1000, r2B: 1000, r2G: 1200 });
  // V1 = 10 * (1000/2000) = 5.0V
  // V2 = 10 * (1200/2200) = 5.4545V
  // V0 = 5.4545 - 5.0 = 0.4545V
  assert(Math.abs(bridge.vTh - 0.4545) < 0.01, `Expected 0.4545V, got ${bridge.vTh}`);
});

runTest("Gaussian Elimination Linear System Solver (Lecture Quiz 5)", () => {
  // 3x3 system:
  // 2x + y - z = 8
  // -3x - y + 2z = -11
  // -2x + y + 2z = -3
  // Solution: x = 2, y = 3, z = -1
  const A = [
    [2, 1, -1],
    [-3, -1, 2],
    [-2, 1, 2]
  ];
  const B = [8, -11, -3];
  const X = solveLinearSystem(A, B);
  assert(Math.abs(X[0] - 2) < 1e-6);
  assert(Math.abs(X[1] - 3) < 1e-6);
  assert(Math.abs(X[2] - (-1)) < 1e-6);
});

// 2. Pico RP2040 Engine Tests
console.log("\n📟 [2/7] Testing Raspberry Pi Pico RP2040 Engine...");

runTest("12-bit and 16-bit ADC Quantization", () => {
  assert.strictEqual(rawAdcToVoltage(0, 12, 3.3), 0);
  assert.strictEqual(rawAdcToVoltage(4095, 12, 3.3), 3.3);
  assert.strictEqual(voltageToRawAdc(3.3, 16, 3.3), 65535);
});

runTest("Potentiometer Wiper at 30% (Gittaly Pico Q5)", () => {
  const pot = simulatePotentiometer({ totalResistanceOhms: 10000, wiperPercent: 30, vSupply: 3.3 });
  assert(Math.abs(pot.wiperVoltage - 0.99) < 1e-3, `Expected 0.99V, got ${pot.wiperVoltage}`);
  assert(Math.abs(pot.raw16Bit - 19660) < 5, `Expected ~19660, got ${pot.raw16Bit}`);
});

runTest("LED Current Limiting Ballast Resistor (Gittaly Pico Q2)", () => {
  const led = calculateLedResistor({ vSupply: 3.3, vForward: 2.0, targetCurrentMa: 20 });
  assert.strictEqual(led.exactResistance, 65);
  assert.strictEqual(led.recommendedResistorOhms, 68);
  assert(led.isGpioSafe);
});

runTest("GPIO 5V Overvoltage Safety Latch-up Detection", () => {
  const safe = evaluatePinSafety(3.3);
  assert.strictEqual(safe.status, "SAFE");
  const dangerous = evaluatePinSafety(5.0);
  assert.strictEqual(dangerous.status, "FATAL_RISK");
});

// 3. Sensor Engine Tests
console.log("\n📡 [3/7] Testing Ultrasonic & IR Sensor Simulation Engine...");

runTest("Speed of sound at 20°C", () => {
  const c = speedOfSound(20);
  assert(Math.abs(c - 343.42) < 0.1, `Expected ~343.42 m/s, got ${c}`);
});

runTest("Ultrasonic ToF Normal Distance and Blind Zone Cutoff (Quiz 8 & Lab 4)", () => {
  // 25 cm target
  const timeUs = distanceToEchoTime({ distanceCm: 25, tempCelsius: 20 });
  const calc = calculateUltrasonicDistance({ echoTimeUs: timeUs, tempCelsius: 20 });
  assert(Math.abs(calc.distanceCm - 25) < 0.5, `Expected 25cm, got ${calc.distanceCm}`);
  assert(calc.isValid);

  // 1.5 cm target (inside 2.5cm blind zone ring-down)
  const blindCalc = calculateUltrasonicDistance({ echoTimeUs: 80, tempCelsius: 20 });
  assert(!blindCalc.isValid, "Target under 2.5cm should be invalid");
  assert(blindCalc.errorReason.includes("BLIND_ZONE"));
});

runTest("IR Sensor Optics: Specular Mirror vs Matte Scattering (Gittaly IR Q3)", () => {
  const matte = simulateIrSensor({ distanceMm: 30, surfaceType: "matte", surfaceAngleDeg: 25 });
  assert(matte.isObstacleDetected, "Matte at 25 deg should scatter photons and be detected");

  const mirror = simulateIrSensor({ distanceMm: 30, surfaceType: "shiny_mirror", surfaceAngleDeg: 25 });
  assert(!mirror.isObstacleDetected, "Shiny mirror at 25 deg should deflect beam and NOT be detected");
});

runTest("Analog IR 10-bit ADC Mapping (Gittaly IR Q4)", () => {
  const mapped = mapAnalogIrSensor(4.0, 5.0, 10);
  assert.strictEqual(mapped.adcValue, 818);
});

// 4. Op-Amp Engine Tests
console.log("\n🔬 [4/7] Testing Operational Amplifier Engine...");

runTest("Ideal Inverting Amplifier Gain G = -R2/R1", () => {
  const op = calculateInvertingOpAmp({ vIn: 1.0, r1: 10, r2: 50, vCc: 12, vEe: -12 });
  assert.strictEqual(op.idealGain, -5);
  assert.strictEqual(op.vOut, -5);
  assert(op.isVirtualShortMaintained);
});

runTest("Inverting Amplifier with Finite Gain A = 100 (Sedra/Smith Eq. 2.5)", () => {
  const op = calculateInvertingOpAmp({ vIn: 1.0, r1: 1, r2: 10, openLoopGain: 100 });
  // G = -10 / (1 + 11/100) = -10 / 1.11 = -9.009
  assert(Math.abs(op.gain - (-9.009)) < 0.01, `Expected ~ -9.009, got ${op.gain}`);
});

runTest("Op-Amp Rail Saturation and Virtual Ground Failure", () => {
  // Input 3.0V with Gain = -5 yields -15V linear, but rail is -12V
  const op = calculateInvertingOpAmp({ vIn: 3.0, r1: 10, r2: 50, vCc: 12, vEe: -12 });
  assert.strictEqual(op.vOut, -12);
  assert(op.isSaturated);
  assert(!op.isVirtualShortMaintained, "Virtual short must fail when saturated!");
});

// 5. Motor, Mechanics & Power Tests
console.log("\n⚙️ [5/7] Testing Actuators, Motors & Mechanics Engine...");

runTest("10W Motor at 10 RPM Torque Calculation (Tutorial 6 Q2)", () => {
  const motor = idealMotorCalculation({ powerWatts: 10, rpm: 10 });
  assert(Math.abs(motor.torqueNm - 9.549) < 0.01, `Expected ~9.55 N·m, got ${motor.torqueNm}`);
});

runTest("Vehicle Dynamics from Power Limit (Tutorial 6 Q3)", () => {
  const car = calculateVehicleDynamics({ powerWatts: 10, massKg: 1, speedMs: 1 });
  assert.strictEqual(car.tractiveForceN, 10);
  assert.strictEqual(car.accelerationMs2, 10);
});

runTest("Human Metabolism & Water Boiling (Tutorial 5)", () => {
  const meta = calculateEnergyAndMetabolism({ workHours: 8, humanPowerWatts: 100, initialTempC: 25 });
  // Electrical work = 2.88 MJ
  assert.strictEqual(meta.electricalEnergyJoules, 2880000);
  // Water boiled ~ 1.12 kg
  assert(Math.abs(meta.waterKgBoiled - 1.12) < 0.05, `Expected ~1.12 kg water, got ${meta.waterKgBoiled}`);
  // Fat burned ~ 300 g
  assert(Math.abs(meta.fatGramsBurnedTotal - 306) < 10, `Expected ~306 g fat, got ${meta.fatGramsBurnedTotal}`);
});

runTest("Pico Battery Endurance on 3x AA Batteries (Tutorial 5 Q5)", () => {
  const bat = calculateBatteryRuntime({ batteryCount: 3, cellVoltage: 1.5, capacityMah: 2500, devicePowerWatts: 1.0 });
  assert.strictEqual(bat.totalVoltage, 4.5);
  assert.strictEqual(bat.totalEnergyWh, 11.25);
  assert.strictEqual(bat.runtimeHours, 11.25);
});

// 6. Robotics Engine Tests
console.log("\n🤖 [6/7] Testing Robotics Planning, Vision & Odometry Engine...");

runTest("Pinhole Camera 3D to 2D Projection (Stanford CS231A)", () => {
  const proj = project3DTo2D({ x3D: 1.2, y3D: 0.6, z3D: 3.0, fx: 600, fy: 600, cx: 320, cy: 240 });
  assert.strictEqual(proj.u, 560); // 600 * (1.2/3.0) + 320 = 240 + 320 = 560
  assert.strictEqual(proj.v, 360); // 600 * (0.6/3.0) + 240 = 120 + 240 = 360
  assert(proj.isVisible);
});

runTest("A* Grid Path Planner", () => {
  const obstacles = [[1, 0], [1, 1], [1, 2]]; // Wall
  const result = runAStarGridPlanning({ gridWidth: 5, gridHeight: 5, start: [0, 0], goal: [2, 0], obstacles });
  assert(result.success, "A* should find path around wall");
  assert(result.pathLength > 2, "Path must route around obstacle");
  assert.deepStrictEqual(result.path[0], [0, 0]);
  assert.deepStrictEqual(result.path[result.path.length - 1], [2, 0]);
});

runTest("Differential Drive Turn Angle Odometry", () => {
  // Right = 0.40m, Left = 0.10m, Track width = 0.20m => deltaTheta = (0.4 - 0.1)/0.2 = 1.5 rad
  const odom = calculateOdometry({ leftTicks: 100, rightTicks: 400, ticksPerRev: 1000, wheelRadiusM: 0.159155, trackWidthM: 0.20 });
  // dRight = 2*pi*R*400/1000 ~ 0.40m, dLeft ~ 0.10m
  assert(Math.abs(odom.deltaThetaRad - 1.50) < 0.05, `Expected 1.5 rad, got ${odom.deltaThetaRad}`);
});

// 7. Course Question Bank Schema Validation
console.log("\n📚 [7/7] Validating Course Modules & Question Bank Schema...");

let totalQuestions = 0;
for (const mod of COURSE_MODULES) {
  assert(mod.title, `Module ${mod.id} missing title`);
  assert(Array.isArray(mod.coreInvariants) && mod.coreInvariants.length > 0, `Module ${mod.id} missing coreInvariants`);
  assert(Array.isArray(mod.commonPitfalls) && mod.commonPitfalls.length > 0, `Module ${mod.id} missing commonPitfalls`);
  assert(mod.story && mod.story.sections.length > 0, `Module ${mod.id} missing story sections`);
  assert(mod.labSpec && mod.labSpec.controls.length > 0, `Module ${mod.id} missing labSpec controls`);

  for (const q of mod.practiceQuestions) {
    totalQuestions++;
    assert(q.id, `Question missing id in ${mod.id}`);
    assert(q.title, `Question ${q.id} missing title`);
    assert(q.prompt, `Question ${q.id} missing prompt`);
    assert(q.source, `Question ${q.id} missing course source citation`);
    assert(q.explanation, `Question ${q.id} missing explanation`);

    if (q.type === 'mcq') {
      assert(Array.isArray(q.options) && q.options.length >= 2, `Q${q.id} MCQ must have at least 2 options`);
      assert(typeof q.correctIndex === 'number', `Q${q.id} correctIndex must be number`);
      assert(q.correctIndex >= 0 && q.correctIndex < q.options.length, `Q${q.id} correctIndex out of bounds`);
    } else if (q.type === 'msq') {
      assert(Array.isArray(q.options) && q.options.length >= 2, `Q${q.id} MSQ must have at least 2 options`);
      assert(Array.isArray(q.correctIndices) && q.correctIndices.length > 0, `Q${q.id} missing correctIndices`);
      for (const idx of q.correctIndices) {
        assert(idx >= 0 && idx < q.options.length, `Q${q.id} correctIndices entry ${idx} out of bounds`);
      }
    } else if (q.type === 'nat') {
      assert(typeof q.correctAnswer === 'number', `Q${q.id} NAT correctAnswer must be a number`);
      assert(Array.isArray(q.toleranceRange) && q.toleranceRange.length === 2, `Q${q.id} missing toleranceRange`);
      assert(q.toleranceRange[0] <= q.correctAnswer && q.correctAnswer <= q.toleranceRange[1], `Q${q.id} correctAnswer must fall within toleranceRange`);
    } else {
      throw new Error(`Unrecognized question type: ${q.type} in ${q.id}`);
    }
  }
}

// 8. KaTeX Syntax Verification across all curriculum text
runTest("KaTeX Mathematical Syntax Validation Across All Curriculum", () => {
  let mathCount = 0;
  function verifyMath(text, context) {
    if (!text || typeof text !== 'string') return;
    const regex = /\$\$([\s\S]*?)\$\$|\$([^\$\n]+?)\$/g;
    let m;
    while ((m = regex.exec(text)) !== null) {
      mathCount++;
      const isBlock = m[1] !== undefined;
      const latex = (isBlock ? m[1] : m[2]).trim();
      try {
        katex.renderToString(latex, { displayMode: isBlock, throwOnError: true });
      } catch (err) {
        throw new Error(`In [${context}]: KaTeX failed on "${latex}" -> ${err.message}`);
      }
    }
  }

  for (const mod of COURSE_MODULES) {
    mod.coreInvariants.forEach((inv, i) => verifyMath(inv, `${mod.id} coreInvariant[${i}]`));
    mod.commonPitfalls.forEach((pit, i) => verifyMath(pit, `${mod.id} pitfall[${i}]`));
    verifyMath(mod.story.summary, `${mod.id} summary`);
    mod.story.sections.forEach((sec, i) => {
      verifyMath(sec.heading, `${mod.id} section[${i}] heading`);
      verifyMath(sec.text, `${mod.id} section[${i}] text`);
    });
    mod.practiceQuestions.forEach((q) => {
      verifyMath(q.title, `${q.id} title`);
      verifyMath(q.prompt, `${q.id} prompt`);
      if (q.options) q.options.forEach((opt, oi) => verifyMath(opt, `${q.id} option[${oi}]`));
      verifyMath(q.explanation, `${q.id} explanation`);
    });
    mod.vault.formulas.forEach((f) => {
      verifyMath(`$$${f.tex}$$`, `${mod.id} formula ${f.name}`);
    });
    mod.vault.pitfalls.forEach((p, i) => {
      verifyMath(p.desc, `${mod.id} vault pitfall[${i}]`);
    });
  }
  assert(mathCount > 50, `Expected at least 50 math expressions, found ${mathCount}`);
});

console.log(`  ✅ Successfully verified ${COURSE_MODULES.length} course modules and ${totalQuestions} authentic course questions across MCQs, MSQs, and NATs!`);

console.log("\n========================================================");
console.log(`📊 Test Summary: ${passed} Passed, ${failed} Failed`);
console.log("========================================================\n");

if (failed > 0) {
  process.exit(1);
}
