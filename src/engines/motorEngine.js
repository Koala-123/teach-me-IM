/**
 * Motor, Mechanics & Power Computational Engine
 * Implements Tutorial 5 & 6 and Lecture Quizzes 9 & 10:
 * - Ideal vs Real DC motors (I-V-Torque-Speed equations)
 * - Gearbox transmissions and power limits
 * - Vehicle acceleration from power constraints
 * - Human thermodynamics, water boiling, and battery endurance
 */

// Ideal Motor Mechanics (Quiz 10, Tutorial 6)
export function idealMotorCalculation({ powerWatts = 10, rpm = 10 }) {
  const omegaRadS = (rpm * 2 * Math.PI) / 60;
  const torqueNm = omegaRadS > 0 ? powerWatts / omegaRadS : Infinity;
  return {
    powerWatts,
    rpm,
    omegaRadS,
    torqueNm,
    conservationRule: "Electrical Input Power = Mechanical Output Power (Pin = Pout = tau * omega)"
  };
}

// Gearbox Speed-Torque Transformation (Tutorial 6 Q1 & Q2)
export function calculateGearbox({
  motorPowerWatts = 10,
  motorRpm = 3000,
  gearRatio = 300, // Speed reduction N:1
  efficiency = 1.0 // Ideal = 1.0
}) {
  const motorOmega = (motorRpm * 2 * Math.PI) / 60;
  const motorTorque = motorOmega > 0 ? motorPowerWatts / motorOmega : 0;

  const outputRpm = motorRpm / gearRatio;
  const outputOmega = (outputRpm * 2 * Math.PI) / 60;
  const outputTorque = motorTorque * gearRatio * efficiency;
  const outputPower = outputTorque * outputOmega;

  return {
    motorRpm,
    motorOmega,
    motorTorqueNm: motorTorque,
    outputRpm,
    outputOmega,
    outputTorqueNm: outputTorque,
    outputPowerWatts: outputPower,
    // Note on infinite torque limit:
    theoreticalMaxTorqueNotice: "With arbitrary gear reduction (N -> infinity, omega -> 0), torque approaches infinity theoretically, but is physically bounded by tooth shear stress and shaft yield strength."
  };
}

// Vehicle Power & Acceleration (Tutorial 6 Q3)
export function calculateVehicleDynamics({
  powerWatts = 10,
  massKg = 1,
  speedMs = 1
}) {
  // P = F * v => F = P / v
  const tractiveForceN = speedMs > 0 ? powerWatts / speedMs : 0;
  // F = m * a => a = F / m
  const accelerationMs2 = tractiveForceN / massKg;

  return {
    powerWatts,
    massKg,
    speedMs,
    tractiveForceN,
    accelerationMs2
  };
}

// Real DC Motor Characteristics (Quiz 9)
export function simulateRealDcMotor({
  vSupply = 12.0,
  raArmature = 2.0, // Ohms
  ktTorqueConstant = 0.05, // Nm / A
  keBackEmfConstant = 0.05, // V / (rad/s)
  loadTorqueNm = 0.1
}) {
  const stallCurrentA = vSupply / raArmature;
  const stallTorqueNm = ktTorqueConstant * stallCurrentA;
  const noLoadOmegaRadS = vSupply / keBackEmfConstant;
  const noLoadRpm = (noLoadOmegaRadS * 60) / (2 * Math.PI);

  // Equilibrium with load: tau = kt * I => I = tau / kt
  // V = I * Ra + ke * omega => omega = (V - I * Ra) / ke
  const currentAtLoadA = Math.min(stallCurrentA, Math.max(0, loadTorqueNm / ktTorqueConstant));
  const backEmfV = Math.max(0, vSupply - (currentAtLoadA * raArmature));
  const omegaAtLoadRadS = backEmfV / keBackEmfConstant;
  const rpmAtLoad = (omegaAtLoadRadS * 60) / (2 * Math.PI);

  const electricalPowerIn = vSupply * currentAtLoadA;
  const mechanicalPowerOut = loadTorqueNm * omegaAtLoadRadS;
  const efficiency = electricalPowerIn > 0 ? (mechanicalPowerOut / electricalPowerIn) * 100 : 0;

  return {
    vSupply,
    stallCurrentA,
    stallTorqueNm,
    noLoadRpm,
    currentAtLoadA,
    omegaAtLoadRadS,
    rpmAtLoad,
    electricalPowerIn,
    mechanicalPowerOut,
    efficiencyPercent: Math.max(0, Math.min(100, efficiency))
  };
}

// Energy, Power and Thermodynamics Simulator (Tutorial 5)
export function calculateEnergyAndMetabolism({
  workHours = 8,
  humanPowerWatts = 100,
  initialTempC = 25,
  humanEfficiency = 0.25 // 25% metabolic conversion
}) {
  const workSeconds = workHours * 3600;
  const electricalEnergyJoules = humanPowerWatts * workSeconds; // J
  const electricalEnergyKcal = electricalEnergyJoules / 4184; // 1 Cal = 1 kcal = 4184 J

  // Water heating and vaporization:
  // c_p = 1 cal/(g*degC) = 4.184 J/(g*degC)
  // deltaT = 100 - initialTempC
  const deltaT = Math.max(0, 100 - initialTempC);
  const heatToBoilJPerGram = deltaT * 4.184;
  const latentHeatVaporizationJPerGram = 540 * 4.184; // 2259.36 J/g
  const totalHeatJPerGramWater = heatToBoilJPerGram + latentHeatVaporizationJPerGram;

  // Mass of water boiled off into steam
  const waterGramsBoiled = electricalEnergyJoules / totalHeatJPerGramWater;
  const waterKgBoiled = waterGramsBoiled / 1000;

  // Food metabolism:
  const metabolicFoodEnergyKcal = electricalEnergyKcal / humanEfficiency;
  // Bread has ~3 Cal/g (3 kcal/g)
  const breadGramsRequired = metabolicFoodEnergyKcal / 3;
  // Fat has ~9 Cal/g (9 kcal/g)
  const fatGramsBurnedTotal = metabolicFoodEnergyKcal / 9;
  const fatGramsBurnedPerHour = fatGramsBurnedTotal / workHours;

  return {
    electricalEnergyJoules,
    electricalEnergyKcal,
    waterGramsBoiled,
    waterKgBoiled,
    metabolicFoodEnergyKcal,
    breadGramsRequired,
    fatGramsBurnedTotal,
    fatGramsBurnedPerHour
  };
}

// Battery Endurance Calculation (Tutorial 5 Q5)
export function calculateBatteryRuntime({
  batteryCount = 3,
  cellVoltage = 1.5, // AA alkaline
  capacityMah = 2500,
  devicePowerWatts = 0.5 // Average Pico draw
}) {
  const totalVoltage = batteryCount * cellVoltage; // 4.5V
  const totalEnergyWh = totalVoltage * (capacityMah / 1000); // Wh
  const totalEnergyJoules = totalEnergyWh * 3600;
  const runtimeHours = totalEnergyWh / devicePowerWatts;

  return {
    totalVoltage,
    totalEnergyWh,
    totalEnergyJoules,
    devicePowerWatts,
    runtimeHours,
    runtimeDays: runtimeHours / 24
  };
}
