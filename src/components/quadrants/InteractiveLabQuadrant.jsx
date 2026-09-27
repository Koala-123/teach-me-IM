import React, { useState, useMemo } from 'react';
import { MathView } from '../../utils/mathView';
import { theveninModel, voltageDivider } from '../../engines/circuitEngine';
import { simulatePotentiometer, calculateLedResistor, evaluatePinSafety, rawAdcToVoltage } from '../../engines/picoEngine';
import { calculateUltrasonicDistance, distanceToEchoTime, calculateEchoDivider, simulateIrSensor } from '../../engines/sensorEngine';
import { calculateInvertingOpAmp, calculateNonInvertingOpAmp } from '../../engines/opampEngine';
import { idealMotorCalculation, calculateGearbox, calculateVehicleDynamics, calculateEnergyAndMetabolism } from '../../engines/motorEngine';
import { project3DTo2D, runAStarGridPlanning, updateLogOddsOccupancy } from '../../engines/roboticsEngine';
import { GraphPlot } from '../common/GraphPlot';
import { 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  Sliders, 
  Layers, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Info,
  TrendingUp,
  BarChart2,
  Activity
} from 'lucide-react';

export function InteractiveLabQuadrant({ module, onProceedToPractice }) {
  const labSpec = module.labSpec;

  // Initialize simulator state from controls default values
  const defaultParams = useMemo(() => {
    const params = {};
    labSpec.controls.forEach(c => {
      params[c.id] = c.default;
    });
    return params;
  }, [labSpec]);

  const [params, setParams] = useState(defaultParams);

  // Quick Quest loader
  const handleLoadQuickQuest = () => {
    if (labSpec.quickQuest && labSpec.quickQuest.loadParams) {
      setParams(prev => ({
        ...prev,
        ...labSpec.quickQuest.loadParams
      }));
    }
  };

  const handleReset = () => {
    setParams(defaultParams);
  };

  const handleParamChange = (id, val) => {
    setParams(prev => ({ ...prev, [id]: Number(val) }));
  };

  // Render specific simulation views based on module id
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in py-4">
      {/* 3-Step "How to Interact" Banner (Blueprint requirement) */}
      <div className="bg-space-900 border border-space-750 rounded-2xl p-4 sm:p-5 shadow-md">
        <div className="flex items-center space-x-2 text-cyan-400 font-bold text-sm mb-3">
          <Info className="w-4 h-4" />
          <span>Interactive Computational Sandbox Guide</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
          <div className="bg-space-850 p-3 rounded-xl border border-space-700/60">
            <span className="font-bold text-cyan-300 block mb-1">1. Configure Inputs</span>
            Adjust parameters, resistances, sensor geometry, or motor power via the live sliders.
          </div>
          <div className="bg-space-850 p-3 rounded-xl border border-space-700/60">
            <span className="font-bold text-emerald-300 block mb-1">2. Simulate & Mutate</span>
            Pure JavaScript physics engines recalculate states, nodal voltages, and waveforms deterministically.
          </div>
          <div className="bg-space-850 p-3 rounded-xl border border-space-700/60">
            <span className="font-bold text-amber-300 block mb-1">3. Inspect Invariants</span>
            Verify conservation laws (KCL, power, virtual grounds) via the pulsating invariant badge.
          </div>
        </div>
      </div>

      {/* Main Simulator Workspace Card */}
      <div className="bg-space-900 border border-space-800 rounded-2xl shadow-xl overflow-hidden">
        {/* Lab Header & Invariant Status Pill */}
        <div className="p-6 border-b border-space-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-space-850/50">
          <div>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-cyan-400" />
              {labSpec.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {labSpec.description}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleReset}
              className="text-xs flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-space-800 text-slate-300 hover:text-white hover:bg-space-700 border border-space-700 transition"
              title="Reset parameters to default"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Simulator Body: Left Controls, Right Output */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Column (5 cols) */}
          <div className="lg:col-span-5 space-y-5 bg-space-950/60 p-5 rounded-xl border border-space-800">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" /> Parameter Controls
            </h3>

            <div className="space-y-4">
              {labSpec.controls.map((ctrl) => (
                <div key={ctrl.id} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <label htmlFor={ctrl.id} className="font-medium text-slate-300">
                      {ctrl.label}
                    </label>
                    <span className="font-mono font-bold text-cyan-400 bg-space-800 px-2 py-0.5 rounded border border-space-700">
                      {params[ctrl.id]} {ctrl.unit}
                    </span>
                  </div>
                  <input
                    id={ctrl.id}
                    type="range"
                    min={ctrl.min}
                    max={ctrl.max}
                    step={ctrl.step}
                    value={params[ctrl.id] ?? ctrl.default}
                    onChange={(e) => handleParamChange(ctrl.id, e.target.value)}
                    className="w-full h-2 bg-space-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>{ctrl.min} {ctrl.unit}</span>
                    <span>{ctrl.max} {ctrl.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visualization Output Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            {module.id === 'unit-1-circuits' && (
              <CircuitSimulator params={params} />
            )}
            {module.id === 'unit-2-pico' && (
              <PicoSimulator params={params} />
            )}
            {module.id === 'unit-3-sensors' && (
              <SensorSimulator params={params} />
            )}
            {module.id === 'unit-4-opamp' && (
              <OpAmpSimulator params={params} />
            )}
            {module.id === 'unit-5-motors' && (
              <MotorSimulator params={params} />
            )}
            {module.id === 'unit-6-loadcells' && (
              <LoadCellSimulator params={params} />
            )}
            {module.id === 'unit-7-vision' && (
              <VisionSimulator params={params} />
            )}
            {module.id === 'unit-8-planning' && (
              <PlanningSimulator params={params} />
            )}
          </div>
        </div>

        {/* Quick Quest Challenge Banner (Blueprint requirement) */}
        {labSpec.quickQuest && (
          <div className="p-6 bg-gradient-to-r from-space-950 via-space-900 to-space-950 border-t border-space-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-space-850/80 border border-amber-900/40 p-4 sm:p-5 rounded-xl">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Interactive Quick Quest Challenge</span>
                </div>
                <div className="text-xs sm:text-sm text-slate-200">
                  <MathView text={labSpec.quickQuest.prompt} />
                </div>
                <p className="text-[11px] text-emerald-400/90 font-mono mt-1">
                  Expected: {labSpec.quickQuest.expectedSummary}
                </p>
              </div>

              <button
                onClick={handleLoadQuickQuest}
                className="whitespace-nowrap px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs shadow-md shadow-amber-500/20 transition transform hover:scale-105"
              >
                Load Parameters into Lab
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Action Button to Practice Arena */}
      <div className="flex justify-end pt-4">
        <button
          onClick={onProceedToPractice}
          className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-400 hover:from-amber-400 hover:to-orange-300 text-black font-bold px-6 py-3 rounded-xl shadow-lg shadow-amber-500/20 transition transform hover:-translate-y-0.5"
        >
          <span>Enter Practice Arena ({module.practiceQuestions.length} Questions)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ----------------- Individual Dedicated Simulators -----------------

function CircuitSimulator({ params }) {
  const [activeTab, setActiveTab] = useState('loadline'); // 'loadline' | 'power' | 'schematic'
  const model = theveninModel({ voc: params.vSource, rth: params.rSource });
  const loadResult = model.outputForLoad(params.rLoad);

  const vth = params.vSource;
  const rth = params.rSource;
  const rl = params.rLoad;
  const isc = model.iSc;
  const maxPowerTheoretical = (vth * vth) / (4 * rth);

  // 1. Tutorial 1 Load Line: Source line (Vo = Vth - I*Rth) and Load line (V = I*RL)
  const loadLineSeries = useMemo(() => {
    const maxI = Math.max(isc * 1.15, loadResult.iOut * 1.5, 0.5);
    const sourcePoints = [];
    const loadPoints = [];
    const steps = 30;

    for (let k = 0; k <= steps; k++) {
      const i = (k / steps) * maxI;
      const vo = Math.max(0, vth - i * rth);
      const vl = i * rl;
      sourcePoints.push({ x: i, y: vo });
      if (vl <= vth * 1.3) {
        loadPoints.push({ x: i, y: vl });
      }
    }

    return [
      { name: `Source Line: Vo = ${vth}V - I·${rth}Ω`, color: '#00f5ff', data: sourcePoints, strokeWidth: 2.5 },
      { name: `Load Line: VL = I·${rl}Ω`, color: '#10b981', data: loadPoints, strokeWidth: 2.5 }
    ];
  }, [vth, rth, rl, isc, loadResult.iOut]);

  // 2. Power vs Load Resistance curve (PL vs RL) peaking at RL = Rth
  const powerCurveSeries = useMemo(() => {
    const points = [];
    const maxRL = Math.max(rth * 4, 40, rl * 1.5);
    const steps = 50;

    for (let k = 1; k <= steps; k++) {
      const r = (k / steps) * maxRL;
      const res = model.outputForLoad(r);
      points.push({ x: r, y: res.power });
    }

    return [
      { name: 'Power in Load PL (W)', color: '#f59e0b', data: points, strokeWidth: 2.5, fillArea: true }
    ];
  }, [model, rth, rl]);

  return (
    <div className="space-y-4">
      {/* Live Invariant Pill */}
      <div className="flex items-center justify-between bg-cyan-950/40 border border-cyan-700/50 px-3 py-1.5 rounded-lg text-xs">
        <span className="flex items-center gap-1.5 text-cyan-300 font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-400 animate-pulse" />
          Load Line Invariant:
        </span>
        <span className="font-mono text-cyan-200">
          V_o = V_th - I_o · R_th = {loadResult.vOut.toFixed(2)} V
        </span>
      </div>

      {/* Visual Workspace with Graph & Schematic Switcher Tabs */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-1.5 bg-space-950/90 p-1.5 rounded-xl border border-space-800">
          <button
            onClick={() => setActiveTab('loadline')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              activeTab === 'loadline'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>V vs I Load Line (Tutorial 1)</span>
          </button>
          <button
            onClick={() => setActiveTab('power')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              activeTab === 'power'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>PL vs RL Power Curve</span>
          </button>
          <button
            onClick={() => setActiveTab('schematic')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              activeTab === 'schematic'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Circuit Schematic</span>
          </button>
        </div>

        {/* Tab 1: V vs I Load Line Graph */}
        {activeTab === 'loadline' && (
          <GraphPlot
            title="Thévenin Load Line & Operating Q-Point"
            subtitle="Source characteristic Vo = Vth - I·Rth intersecting load resistor characteristic VL = I·RL"
            equations={[
              "$$\\text{Source: } V_o(I) = V_{th} - I \\cdot R_{th} \\quad \\Big| \\quad \\text{Load: } V_L(I) = I \\cdot R_L$$",
              `$$\\text{Live Evaluation: } V_o = ${vth} - ${rth} I_o\\text{ [V]}, \\quad V_L = ${rl} I_L\\text{ [V]} \\implies Q = (${loadResult.iOut.toFixed(2)}\\text{ A}, ${loadResult.vOut.toFixed(2)}\\text{ V})$$`
            ]}
            xLabel="Load Current I"
            xUnit="A"
            yLabel="Terminal Voltage V"
            yUnit="V"
            series={loadLineSeries}
            operatingPoint={{
              x: loadResult.iOut,
              y: loadResult.vOut,
              color: '#38bdf8',
              label: `Q (${loadResult.iOut.toFixed(2)}A, ${loadResult.vOut.toFixed(2)}V)`
            }}
            referenceLines={[
              { type: 'y', value: vth, label: `Voc = ${vth}V`, color: '#00f5ff' },
              { type: 'x', value: isc, label: `Isc = ${isc.toFixed(2)}A`, color: '#f59e0b' }
            ]}
            height={230}
          />
        )}

        {/* Tab 2: PL vs RL Maximum Power Transfer Graph */}
        {activeTab === 'power' && (
          <GraphPlot
            title="Maximum Power Transfer Characteristic"
            subtitle="Delivered load power PL = I²·RL peaking strictly when RL = Rth (Tutorial 1 & 2)"
            equations={[
              "$$P_L(R_L) = I_L^2 R_L = \\left(\\frac{V_{th}}{R_{th} + R_L}\\right)^2 R_L \\implies P_{max} = \\frac{V_{th}^2}{4 R_{th}} \\quad (\\text{at } R_L = R_{th})$$",
              `$$\\text{Live Evaluation: } P_L(R_L) = \\left(\\frac{${vth}}{${rth} + R_L}\\right)^2 R_L\\text{ [W]} \\implies P_{max} = \\frac{${vth}^2}{4 \\times ${rth}} = ${maxPowerTheoretical.toFixed(2)}\\text{ W at } R_L = ${rth}\\,\\Omega$$`
            ]}
            xLabel="Load Resistance RL"
            xUnit="Ω"
            yLabel="Load Power PL"
            yUnit="W"
            series={powerCurveSeries}
            operatingPoint={{
              x: rl,
              y: loadResult.power,
              color: '#f59e0b',
              label: `${rl}Ω: ${loadResult.power.toFixed(2)}W`
            }}
            referenceLines={[
              { type: 'x', value: rth, label: `RL = Rth (${rth}Ω)`, color: '#f59e0b' },
              { type: 'y', value: maxPowerTheoretical, label: `Pmax = ${maxPowerTheoretical.toFixed(2)}W`, color: '#10b981' }
            ]}
            height={230}
          />
        )}

        {/* Tab 3: SVG Circuit Schematic */}
        {activeTab === 'schematic' && (
          <div className="bg-space-950 p-4 rounded-xl border border-space-800 flex items-center justify-center">
            <svg viewBox="0 0 400 180" className="w-full max-w-md h-auto">
              <rect x="50" y="30" width="300" height="120" fill="none" stroke="#334155" strokeWidth="3" rx="8" />
              <g transform="translate(50, 90)">
                <line x1="0" y1="-25" x2="0" y2="25" stroke="#00f5ff" strokeWidth="4" />
                <line x1="-12" y1="-12" x2="-12" y2="12" stroke="#64748b" strokeWidth="3" />
                <text x="-35" y="-5" fill="#00f5ff" fontSize="12" fontWeight="bold">Vth</text>
                <text x="-40" y="12" fill="#94a3b8" fontSize="10">{params.vSource}V</text>
              </g>
              <g transform="translate(140, 30)">
                <rect x="-25" y="-12" width="50" height="24" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" rx="4" />
                <text x="0" y="4" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">Ro = {params.rSource}Ω</text>
              </g>
              <g transform="translate(350, 90)">
                <rect x="-14" y="-30" width="28" height="60" fill="#1e293b" stroke="#10b981" strokeWidth="2" rx="4" />
                <text x="25" y="-5" fill="#34d399" fontSize="11" fontWeight="bold">RL = {params.rLoad}Ω</text>
                <text x="25" y="12" fill="#94a3b8" fontSize="10">{loadResult.vOut.toFixed(2)}V</text>
              </g>
              <g transform="translate(240, 22)">
                <path d="M -20 0 L 20 0 M 12 -5 L 20 0 L 12 5" fill="none" stroke="#00f5ff" strokeWidth="2" />
                <text x="0" y="-8" fill="#00f5ff" fontSize="10" fontWeight="mono" textAnchor="middle">I = {loadResult.iOut.toFixed(3)} A</text>
              </g>
            </svg>
          </div>
        )}
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
        <div className="bg-space-950 p-2.5 rounded-lg border border-space-800">
          <span className="text-slate-400 block text-[10px]">Short-Circuit I_sc</span>
          <span className="font-mono font-bold text-amber-400 text-sm">{model.iSc.toFixed(2)} A</span>
        </div>
        <div className="bg-space-950 p-2.5 rounded-lg border border-space-800">
          <span className="text-slate-400 block text-[10px]">Terminal Voltage V_o</span>
          <span className="font-mono font-bold text-emerald-400 text-sm">{loadResult.vOut.toFixed(2)} V</span>
        </div>
        <div className="bg-space-950 p-2.5 rounded-lg border border-space-800">
          <span className="text-slate-400 block text-[10px]">Power in Load P_L</span>
          <span className="font-mono font-bold text-cyan-400 text-sm">{loadResult.power.toFixed(2)} W</span>
        </div>
      </div>
    </div>
  );
}

function PicoSimulator({ params }) {
  const pot = simulatePotentiometer({ totalResistanceOhms: 10000, wiperPercent: params.wiperPercent });
  const safety = evaluatePinSafety(params.appliedVoltage);
  const led = calculateLedResistor({ vSupply: 3.3, vForward: params.ledForwardV, targetCurrentMa: 20 });

  return (
    <div className="space-y-4">
      {/* Live Invariant Pill */}
      <div className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs border ${
        safety.status === 'SAFE' 
          ? 'bg-emerald-950/40 border-emerald-700/50 text-emerald-300'
          : 'bg-rose-950/40 border-rose-700/50 text-rose-300'
      }`}>
        <span className="flex items-center gap-1.5 font-semibold">
          <ShieldCheck className="w-4 h-4 animate-pulse" />
          Pico GPIO Pin Rating:
        </span>
        <span className="font-mono font-bold">{params.appliedVoltage} V applied ({safety.status})</span>
      </div>

      {safety.status === 'FATAL_RISK' && (
        <div className="bg-rose-900/30 border border-rose-600/60 p-3 rounded-xl text-xs text-rose-200">
          <span className="font-bold">⚠️ OVERVOLTAGE WARNING: </span>
          {safety.message}
        </div>
      )}

      {/* Interactive Potentiometer & ADC Box */}
      <div className="bg-space-950 p-4 rounded-xl border border-space-800 grid grid-cols-2 gap-4">
        <div>
          <span className="text-xs font-bold text-slate-300 block mb-2">Potentiometer Wiper (ADC Channel)</span>
          <div className="space-y-1 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Position:</span>
              <span className="text-cyan-400">{params.wiperPercent}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Wiper Voltage:</span>
              <span className="text-emerald-400">{pot.wiperVoltage.toFixed(3)} V</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">12-bit SAR ADC:</span>
              <span className="text-amber-400">{pot.raw12Bit} / 4095</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">MicroPython 16-bit:</span>
              <span className="text-cyan-300">{pot.raw16Bit} / 65535</span>
            </div>
          </div>
        </div>

        <div>
          <span className="text-xs font-bold text-slate-300 block mb-2">LED Ballast Resistor (3.3V)</span>
          <div className="space-y-1 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">LED Drop (VF):</span>
              <span className="text-slate-200">{params.ledForwardV} V</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Exact Resistor:</span>
              <span className="text-amber-400">{led.exactResistance.toFixed(1)} Ω</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Standard E12:</span>
              <span className="text-emerald-400 font-bold">{led.recommendedResistorOhms} Ω</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Current Drawn:</span>
              <span className="text-cyan-300">{led.actualCurrentMa.toFixed(1)} mA</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SensorSimulator({ params }) {
  const [activeTab, setActiveTab] = useState('graph'); // 'graph' | 'sensors'
  const timeUs = distanceToEchoTime({ distanceCm: params.targetDistanceCm, tempCelsius: params.airTempC });
  const sonar = calculateUltrasonicDistance({ echoTimeUs: timeUs, tempCelsius: params.airTempC });
  const divider = calculateEchoDivider(1000, 2000, 5.0);
  const ir = simulateIrSensor({
    distanceMm: params.targetDistanceCm * 10,
    surfaceType: params.surfaceType === 1 ? 'shiny_mirror' : 'matte',
    surfaceAngleDeg: params.surfaceAngleDeg
  });

  const sonarCurve = useMemo(() => {
    const points = [];
    const c = sonar.speedOfSoundMs;
    for (let d = 0; d <= 400; d += 10) {
      const t = (2 * (d / 100) / c) * 1e6;
      points.push({ x: d, y: t });
    }
    return [
      { name: `ToF Curve (c = ${sonar.speedOfSoundMs.toFixed(1)} m/s)`, color: '#00f5ff', data: points, strokeWidth: 2.5, fillArea: true }
    ];
  }, [sonar.speedOfSoundMs]);

  return (
    <div className="space-y-4">
      {/* Live Invariant Pill */}
      <div className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs border ${
        sonar.isValid 
          ? 'bg-cyan-950/40 border-cyan-700/50 text-cyan-300'
          : 'bg-rose-950/40 border-rose-700/50 text-rose-300'
      }`}>
        <span className="flex items-center gap-1.5 font-semibold">
          <ShieldCheck className="w-4 h-4 animate-pulse" />
          Sonar Echo Timing Invariant:
        </span>
        <span className="font-mono">
          d = (t · c) / 2 = {sonar.distanceCm.toFixed(1)} cm
        </span>
      </div>

      {!sonar.isValid && (
        <div className="bg-rose-900/30 border border-rose-600/60 p-3 rounded-xl text-xs text-rose-200">
          <span className="font-bold">⚠️ ACOUSTIC ERROR: </span>
          {sonar.errorReason}
        </div>
      )}

      {/* Tabs */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-1.5 bg-space-950/90 p-1.5 rounded-xl border border-space-800">
          <button
            onClick={() => setActiveTab('graph')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              activeTab === 'graph'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Echo Time vs Distance (t vs d)</span>
          </button>
          <button
            onClick={() => setActiveTab('sensors')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              activeTab === 'sensors'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Sensor Hardware Comparison</span>
          </button>
        </div>

        {activeTab === 'graph' && (
          <GraphPlot
            title="Ultrasonic Acoustic Time-of-Flight Characteristic"
            subtitle={`Round-trip propagation t = 2d / c with 2cm transducer blind zone (${params.airTempC}°C)`}
            equations={[
              "$$t(d) = \\frac{2 \\cdot d}{c} \\quad \\text{where } c \\approx 331.3 + 0.606 \\cdot T_{celsius} \\; [\\text{m/s}]$$",
              `$$\\text{Live Evaluation: } t(d) = \\frac{2 \\cdot d}{${sonar.speedOfSoundMs.toFixed(1)}\\text{ m/s}} = ${(20000 / sonar.speedOfSoundMs).toFixed(2)} \\times d\\,(\\text{cm}) \\; [\\mu\\text{s}] \\quad (\\text{Blind Zone: } 0 < d \\le 2\\text{ cm})$$`
            ]}
            xLabel="Target Distance d"
            xUnit="cm"
            yLabel="Round-trip Echo Time t"
            yUnit="µs"
            series={sonarCurve}
            operatingPoint={{
              x: params.targetDistanceCm,
              y: timeUs,
              color: sonar.isValid ? '#00f5ff' : '#f43f5e',
              label: `${params.targetDistanceCm} cm: ${timeUs} µs`
            }}
            shadedRegions={[
              { xMin: 0, xMax: 2, color: '#ef4444', label: '2cm Blind Zone' }
            ]}
            referenceLines={[
              { type: 'x', value: 400, label: '400cm Max Range', color: '#64748b' }
            ]}
            height={220}
          />
        )}

        {/* Sensor Comparison Display */}
        {activeTab === 'sensors' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-space-950 p-4 rounded-xl border border-space-800 space-y-2">
              <span className="text-xs font-bold text-cyan-400 block">HC-SR04 Ultrasonic Sonar</span>
              <div className="space-y-1 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Speed of Sound c:</span>
                  <span className="text-slate-200">{sonar.speedOfSoundMs.toFixed(1)} m/s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Round-trip Echo:</span>
                  <span className="text-cyan-400">{timeUs} µs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Echo Pin Stepping:</span>
                  <span className="text-emerald-400">5V → {divider.vOut.toFixed(2)}V</span>
                </div>
              </div>
            </div>

            <div className="bg-space-950 p-4 rounded-xl border border-space-800 space-y-2">
              <span className="text-xs font-bold text-amber-400 block">Infrared (IR) Proximity Sensor</span>
              <div className="space-y-1 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Surface:</span>
                  <span className="text-slate-200">{params.surfaceType === 1 ? 'Shiny Mirror' : 'Matte'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tilt Angle:</span>
                  <span className="text-slate-200">{params.surfaceAngleDeg}°</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Obstacle Detection:</span>
                  <span className={`font-bold ${ir.isObstacleDetected ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {ir.isObstacleDetected ? 'DETECTED (OUT=LOW)' : 'NO REFLECTION (OUT=HIGH)'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function OpAmpSimulator({ params }) {
  const [activeTab, setActiveTab] = useState('transfer'); // 'transfer' | 'metrics'
  const inverting = calculateInvertingOpAmp({
    vIn: params.vIn,
    r1: params.r1,
    r2: params.r2,
    vCc: params.vCc,
    vEe: -params.vCc
  });

  const gain = -(params.r2 / params.r1);
  const vcc = params.vCc;

  const transferSeries = useMemo(() => {
    const points = [];
    const steps = 50;
    const vMax = Math.max(2.5, Math.abs(params.vIn) * 1.3);
    for (let k = 0; k <= steps; k++) {
      const vin = -vMax + (k / steps) * (2 * vMax);
      const voutLinear = vin * gain;
      const vout = Math.max(-vcc, Math.min(vcc, voutLinear));
      points.push({ x: vin, y: vout });
    }
    return [
      { name: `Transfer Characteristic (Gain = ${gain.toFixed(1)}x)`, color: '#00f5ff', data: points, strokeWidth: 2.5 }
    ];
  }, [params.r1, params.r2, gain, vcc, params.vIn]);

  return (
    <div className="space-y-4">
      {/* Live Invariant Pill */}
      <div className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs border ${
        inverting.isVirtualShortMaintained 
          ? 'bg-emerald-950/40 border-emerald-700/50 text-emerald-300'
          : 'bg-rose-950/40 border-rose-700/50 text-rose-300'
      }`}>
        <span className="flex items-center gap-1.5 font-semibold">
          <ShieldCheck className="w-4 h-4 animate-pulse" />
          Virtual Ground Invariant (V+ = V-):
        </span>
        <span className="font-mono">
          {inverting.isVirtualShortMaintained ? 'MAINTAINED (V- ≈ 0V)' : 'BROKEN (SATURATED)'}
        </span>
      </div>

      {/* Tabs */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-1.5 bg-space-950/90 p-1.5 rounded-xl border border-space-800">
          <button
            onClick={() => setActiveTab('transfer')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              activeTab === 'transfer'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Vout vs Vin Transfer Curve</span>
          </button>
          <button
            onClick={() => setActiveTab('metrics')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              activeTab === 'metrics'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Amplifier Specs & Bandwidth</span>
          </button>
        </div>

        {activeTab === 'transfer' && (
          <GraphPlot
            title="Inverting Op-Amp DC Transfer Characteristic"
            subtitle={`Linear slope Av = -R2/R1 = ${gain.toFixed(1)}x clamped at power rails ±${vcc}V (Sedra/Smith Ch 2)`}
            equations={[
              "$$V_{out}(V_{in}) = \\operatorname{clamp}\\left(-V_{sat},\\, +V_{sat},\\, -\\frac{R_2}{R_1} V_{in}\\right) \\quad \\text{where } A_v = -\\frac{R_2}{R_1}$$",
              `$$\\text{Live Evaluation: } V_{out} = \\operatorname{clamp}\\left(-${vcc}\\text{V},\\, +${vcc}\\text{V},\\, ${gain.toFixed(1)} \\cdot V_{in}\\right) \\quad (\\text{Linear Threshold: } |V_{in}| \\le ${(vcc / Math.abs(gain)).toFixed(2)}\\text{ V})$$`
            ]}
            xLabel="Input Voltage Vin"
            xUnit="V"
            yLabel="Output Voltage Vout"
            yUnit="V"
            series={transferSeries}
            operatingPoint={{
              x: params.vIn,
              y: inverting.vOut,
              color: inverting.isSaturated ? '#f43f5e' : '#38bdf8',
              label: `Vin=${params.vIn}V, Vout=${inverting.vOut.toFixed(2)}V`
            }}
            referenceLines={[
              { type: 'y', value: vcc, label: `+Vsat = +${vcc}V`, color: '#f43f5e' },
              { type: 'y', value: -vcc, label: `-Vsat = -${vcc}V`, color: '#f43f5e' }
            ]}
            height={220}
          />
        )}

        <div className="bg-space-950 p-4 rounded-xl border border-space-800 space-y-3">
          <div className="grid grid-cols-3 gap-3 text-center text-xs">
            <div className="bg-space-900 p-2.5 rounded-lg border border-space-800">
              <span className="text-slate-400 block text-[10px]">Closed-Loop Gain</span>
              <span className="font-mono font-bold text-cyan-400 text-sm">{inverting.idealGain}x</span>
            </div>
            <div className="bg-space-900 p-2.5 rounded-lg border border-space-800">
              <span className="text-slate-400 block text-[10px]">Actual V_out</span>
              <span className={`font-mono font-bold text-sm ${inverting.isSaturated ? 'text-rose-400' : 'text-emerald-400'}`}>
                {inverting.vOut.toFixed(2)} V
              </span>
            </div>
            <div className="bg-space-900 p-2.5 rounded-lg border border-space-800">
              <span className="text-slate-400 block text-[10px]">Cutoff Freq (1MHz GBWP)</span>
              <span className="font-mono font-bold text-amber-400 text-sm">{(inverting.cutoffFreqHz / 1000).toFixed(1)} kHz</span>
            </div>
          </div>

          {inverting.isSaturated && (
            <div className="bg-rose-900/30 border border-rose-600/60 p-2.5 rounded-lg text-xs text-rose-200">
              ⚠️ <strong>Rail Saturation:</strong> Theoretical output ({inverting.vOutLinear.toFixed(1)}V) exceeds ±{params.vCc}V rail limits. Virtual ground at inverting node collapses!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MotorSimulator({ params }) {
  const [activeTab, setActiveTab] = useState('pvsw'); // 'pvsw' | 'tauvsw' | 'ivsw' | 'vehicle' | 'gearbox'
  const motor = idealMotorCalculation({ powerWatts: params.motorPowerWatts, rpm: params.outputRpm });
  const car = calculateVehicleDynamics({ powerWatts: params.motorPowerWatts, massKg: params.vehicleMassKg, speedMs: params.vehicleSpeedMs });
  const meta = calculateEnergyAndMetabolism({ workHours: 8, humanPowerWatts: 100 });

  const vs = params.supplyVoltage || 12;
  const ra = params.armatureResistance || 2.0;
  const kt = 0.05;
  const ke = 0.05;

  const stallCurrentA = vs / ra;
  const stallTorqueNm = kt * stallCurrentA;
  const noLoadOmegaRadS = vs / ke;
  const pMaxWatts = (stallTorqueNm * noLoadOmegaRadS) / 4;
  const optimalOmega = noLoadOmegaRadS / 2;

  // Generate DC motor characteristic curves
  const { pSeries, tauSeries, iEtaSeries, vehicleSeries, gearboxSeries } = useMemo(() => {
    const pPts = [];
    const tauPts = [];
    const iPts = [];
    const etaPts = [];
    const steps = 40;

    for (let i = 0; i <= steps; i++) {
      const w = (i / steps) * noLoadOmegaRadS;
      const tau = Math.max(0, stallTorqueNm * (1 - w / noLoadOmegaRadS));
      const p = tau * w;
      const current = Math.max(0, (vs - ke * w) / ra);

      // Net torque accounting for small mechanical no-load loss (3% of stall torque)
      const tauLoss = 0.03 * stallTorqueNm;
      const netTau = Math.max(0, tau - tauLoss);
      const netP = netTau * w;
      const pElec = vs * current;
      const eta = pElec > 0 ? Math.min(95, (netP / pElec) * 100) : 0;

      pPts.push({ x: w, y: p });
      tauPts.push({ x: w, y: tau });
      iPts.push({ x: w, y: current });
      etaPts.push({ x: w, y: eta });
    }

    // Vehicle Tractive curves: F(v) = P / v, a(v) = P / (m * v)
    const fPts = [];
    const aPts = [];
    const pWatts = params.motorPowerWatts;
    const mKg = params.vehicleMassKg;
    for (let k = 1; k <= 35; k++) {
      const v = (k / 35) * 10;
      const f = pWatts / v;
      const a = f / mKg;
      fPts.push({ x: v, y: f });
      aPts.push({ x: v, y: a });
    }

    // Gearbox torque hyperbola: tau = P / omega across RPM
    const gearPts = [];
    for (let r = 2; r <= 80; r += 2) {
      const w = (r * 2 * Math.PI) / 60;
      const t = pWatts / w;
      gearPts.push({ x: r, y: t });
    }

    return {
      pSeries: [
        { name: 'Mechanical Power P(ω) [W]', color: '#00f5ff', data: pPts, strokeWidth: 2.5, fillArea: true }
      ],
      tauSeries: [
        { name: `Shaft Torque τ(ω) [N·m] (Stall = ${stallTorqueNm.toFixed(2)} N·m)`, color: '#f59e0b', data: tauPts, strokeWidth: 2.5 }
      ],
      iEtaSeries: [
        { name: 'Armature Current I(ω) [A]', color: '#f43f5e', data: iPts, strokeWidth: 2 },
        { name: 'Conversion Efficiency η(ω) [%]', color: '#10b981', data: etaPts, strokeWidth: 2.5, fillArea: true }
      ],
      vehicleSeries: [
        { name: 'Tractive Push Force F(v) [N]', color: '#10b981', data: fPts, strokeWidth: 2 },
        { name: 'Instantaneous Accel a(v) [m/s²]', color: '#00f5ff', data: aPts, strokeWidth: 2.5, fillArea: true }
      ],
      gearboxSeries: [
        { name: `Shaft Torque τ = ${pWatts}W / ω [N·m]`, color: '#f59e0b', data: gearPts, strokeWidth: 2.5, fillArea: true }
      ]
    };
  }, [vs, ra, stallTorqueNm, noLoadOmegaRadS, params.motorPowerWatts, params.vehicleMassKg]);

  return (
    <div className="space-y-4">
      {/* Live Invariant Pill */}
      <div className="flex items-center justify-between bg-cyan-950/40 border border-cyan-700/50 px-3 py-1.5 rounded-lg text-xs">
        <span className="flex items-center gap-1.5 text-cyan-300 font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-400 animate-pulse" />
          Power Conservation Invariant:
        </span>
        <span className="font-mono text-cyan-200">
          P = τ · ω = {params.motorPowerWatts} W
        </span>
      </div>

      {/* Visual Workspace: Graph Selector Tabs */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-1.5 bg-space-950/90 p-1.5 rounded-xl border border-space-800">
          <button
            onClick={() => setActiveTab('pvsw')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              activeTab === 'pvsw'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>P vs ω (Power Parabola)</span>
          </button>
          <button
            onClick={() => setActiveTab('tauvsw')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              activeTab === 'tauvsw'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>τ vs ω (Torque-Speed)</span>
          </button>
          <button
            onClick={() => setActiveTab('ivsw')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              activeTab === 'ivsw'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>I & η vs ω (Efficiency)</span>
          </button>
          <button
            onClick={() => setActiveTab('vehicle')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              activeTab === 'vehicle'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>F & a vs v (Vehicle)</span>
          </button>
          <button
            onClick={() => setActiveTab('gearbox')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              activeTab === 'gearbox'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>τ vs RPM (Gearbox)</span>
          </button>
        </div>

        {/* Tab 1: P vs omega Parabola */}
        {activeTab === 'pvsw' && (
          <GraphPlot
            title="DC Motor Mechanical Power Curve P(ω)"
            subtitle="Quadratic parabola P(ω) = τ_stall·(ω - ω²/ω_no_load) peaking strictly at ω = ω_no_load / 2"
            equations={[
              "$$P_{mech}(\\omega) = \\tau(\\omega) \\cdot \\omega = \\tau_{stall}\\left(\\omega - \\frac{\\omega^2}{\\omega_{no\\_load}}\\right) \\implies P_{max} = \\frac{\\tau_{stall} \\cdot \\omega_{no\\_load}}{4} = \\frac{V_s^2}{4 R_a}$$",
              `$$\\text{Live Evaluation: } P(\\omega) = ${stallTorqueNm.toFixed(2)}\\left(\\omega - \\frac{\\omega^2}{${noLoadOmegaRadS.toFixed(0)}}\\right) \\text{ [W]} \\implies P_{max} = ${pMaxWatts.toFixed(1)}\\text{ W at } \\omega^* = ${optimalOmega.toFixed(0)}\\text{ rad/s}$$`
            ]}
            xLabel="Shaft Angular Velocity ω"
            xUnit="rad/s"
            yLabel="Mechanical Power P"
            yUnit="W"
            series={pSeries}
            operatingPoint={{
              x: Math.min(noLoadOmegaRadS, motor.omegaRadS),
              y: Math.max(0, stallTorqueNm * (1 - Math.min(noLoadOmegaRadS, motor.omegaRadS) / noLoadOmegaRadS) * Math.min(noLoadOmegaRadS, motor.omegaRadS)),
              color: '#00f5ff',
              label: `ω = ${motor.omegaRadS.toFixed(1)} rad/s`
            }}
            referenceLines={[
              { type: 'x', value: optimalOmega, label: `ω* = ${optimalOmega.toFixed(0)} rad/s (Pmax)`, color: '#f59e0b' },
              { type: 'y', value: pMaxWatts, label: `Pmax = ${pMaxWatts.toFixed(1)}W`, color: '#10b981' }
            ]}
            height={230}
          />
        )}

        {/* Tab 2: tau vs omega Linear Characteristic */}
        {activeTab === 'tauvsw' && (
          <GraphPlot
            title="DC Motor Torque-Speed Characteristic τ(ω)"
            subtitle="Linear load line τ(ω) = τ_stall·(1 - ω/ω_no_load) with negative back-EMF slope -kt·ke/Ra"
            equations={[
              "$$\\tau(\\omega) = \\frac{k_t V_s}{R_a} - \\left(\\frac{k_t k_e}{R_a}\\right)\\omega = \\tau_{stall}\\left(1 - \\frac{\\omega}{\\omega_{no\\_load}}\\right)$$",
              `$$\\text{Live Evaluation: } \\tau(\\omega) = ${stallTorqueNm.toFixed(2)}\\left(1 - \\frac{\\omega}{${noLoadOmegaRadS.toFixed(0)}}\\right) \\text{ [N}\\cdot\\text{m]} \\quad \\left(\\text{Slope } m = -${(kt * ke / ra).toFixed(5)}\\text{ N}\\cdot\\text{m}/(\\text{rad/s})\\right)$$`
            ]}
            xLabel="Shaft Angular Velocity ω"
            xUnit="rad/s"
            yLabel="Shaft Torque τ"
            yUnit="N·m"
            series={tauSeries}
            operatingPoint={{
              x: Math.min(noLoadOmegaRadS, motor.omegaRadS),
              y: Math.max(0, stallTorqueNm * (1 - Math.min(noLoadOmegaRadS, motor.omegaRadS) / noLoadOmegaRadS)),
              color: '#f59e0b',
              label: `τ = ${Math.max(0, stallTorqueNm * (1 - Math.min(noLoadOmegaRadS, motor.omegaRadS) / noLoadOmegaRadS)).toFixed(2)} N·m`
            }}
            referenceLines={[
              { type: 'y', value: stallTorqueNm, label: `τ_stall = ${stallTorqueNm.toFixed(2)} N·m`, color: '#f43f5e' },
              { type: 'x', value: noLoadOmegaRadS, label: `ω_no_load = ${noLoadOmegaRadS.toFixed(0)} rad/s`, color: '#00f5ff' }
            ]}
            height={230}
          />
        )}

        {/* Tab 3: Current & Efficiency Curves */}
        {activeTab === 'ivsw' && (
          <GraphPlot
            title="Armature Current I(ω) & Electromechanical Efficiency η(ω)"
            subtitle="Efficiency peaks at high speed (~80% of ω_no_load); drops to 0% at stall and at no-load"
            equations={[
              "$$I(\\omega) = \\frac{V_s - k_e \\omega}{R_a} = I_{stall}\\left(1 - \\frac{\\omega}{\\omega_{no\\_load}}\\right), \\quad \\eta(\\omega) = \\frac{P_{mech}}{P_{elec}} = \\frac{\\tau \\cdot \\omega}{V_s \\cdot I}$$",
              `$$\\text{Live Evaluation: } I(\\omega) = ${stallCurrentA.toFixed(1)}\\left(1 - \\frac{\\omega}{${noLoadOmegaRadS.toFixed(0)}}\\right) \\text{ [A]}, \\quad P_{elec} = ${vs}\\text{V} \\cdot I(\\omega) \\text{ [W]}$$`
            ]}
            xLabel="Shaft Angular Velocity ω"
            xUnit="rad/s"
            yLabel="Current I (A) & Efficiency η (%)"
            series={iEtaSeries}
            operatingPoint={{
              x: Math.min(noLoadOmegaRadS, motor.omegaRadS),
              y: Math.min(95, Math.max(0, ((Math.max(0, stallTorqueNm * (1 - Math.min(noLoadOmegaRadS, motor.omegaRadS) / noLoadOmegaRadS) - 0.03 * stallTorqueNm) * Math.min(noLoadOmegaRadS, motor.omegaRadS)) / (vs * Math.max(0.01, (vs - ke * Math.min(noLoadOmegaRadS, motor.omegaRadS)) / ra))) * 100)),
              color: '#10b981',
              label: `Speed: ${motor.omegaRadS.toFixed(0)} rad/s`
            }}
            referenceLines={[
              { type: 'y', value: stallCurrentA, label: `I_stall = ${stallCurrentA.toFixed(1)}A`, color: '#f43f5e' }
            ]}
            height={230}
          />
        )}

        {/* Tab 4: Vehicle Dynamics Hyperbolas */}
        {activeTab === 'vehicle' && (
          <GraphPlot
            title="Vehicle Tractive Dynamics Under Power Constraint (Tutorial 6 Q3)"
            subtitle="Hyperbolic push force F(v) = P/v and acceleration a(v) = P/(m·v) decaying with velocity"
            equations={[
              "$$F(v) = \\frac{P}{v} \\; [\\text{N}], \\quad a(v) = \\frac{F(v)}{m} = \\frac{P}{m \\cdot v} \\; [\\text{m/s}^2]$$",
              `$$\\text{Live Evaluation: } F(v) = \\frac{${params.motorPowerWatts}}{v} \\text{ [N]}, \\quad a(v) = \\frac{${(params.motorPowerWatts / params.vehicleMassKg).toFixed(1)}}{v} \\text{ [m/s}^2] \\quad (m = ${params.vehicleMassKg}\\text{ kg})$$`
            ]}
            xLabel="Vehicle Linear Velocity v"
            xUnit="m/s"
            yLabel="Tractive Force F (N) & Accel a (m/s²)"
            series={vehicleSeries}
            operatingPoint={{
              x: params.vehicleSpeedMs,
              y: car.accelerationMs2,
              color: '#00f5ff',
              label: `${params.vehicleSpeedMs} m/s: ${car.accelerationMs2.toFixed(1)} m/s²`
            }}
            height={230}
          />
        )}

        {/* Tab 5: Transmission Gearbox Hyperbola */}
        {activeTab === 'gearbox' && (
          <GraphPlot
            title="Ideal Gearbox Output Torque vs Shaft Speed (Tutorial 6 Q1 & Q2)"
            subtitle="P = τ·ω = constant: Torque approaches infinity as output speed approaches zero"
            equations={[
              "$$\\tau = \\frac{P}{\\omega} = \\frac{60 \\cdot P}{2\\pi \\cdot \\text{RPM}} \\approx \\frac{9.5493 \\cdot P}{\\text{RPM}} \\; [\\text{N}\\cdot\\text{m}]$$",
              `$$\\text{Live Evaluation: } \\tau(\\text{RPM}) = \\frac{${(9.5493 * params.motorPowerWatts).toFixed(1)}}{\\text{RPM}} \\text{ [N}\\cdot\\text{m]} \\quad (\\text{At 10 RPM: } \\tau = ${(9.5493 * params.motorPowerWatts / 10).toFixed(2)}\\text{ N}\\cdot\\text{m})$$`
            ]}
            xLabel="Output Shaft Speed"
            xUnit="RPM"
            yLabel="Shaft Torque τ"
            yUnit="N·m"
            series={gearboxSeries}
            operatingPoint={{
              x: Math.min(80, Math.max(2, params.outputRpm)),
              y: motor.torqueNm,
              color: '#f59e0b',
              label: `${params.outputRpm} RPM: ${motor.torqueNm.toFixed(2)} N·m`
            }}
            referenceLines={[
              { type: 'y', value: 9.55, label: 'Tutorial 6 Benchmark (10 RPM): 9.55 N·m', color: '#10b981' }
            ]}
            height={230}
          />
        )}
      </div>

      {/* Metrics Cards */}
      <div className="bg-space-950 p-4 rounded-xl border border-space-800 space-y-3">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs">
          <div className="bg-space-900 p-2.5 rounded-lg border border-space-800">
            <span className="text-slate-400 block text-[10px]">Angular Velocity ω</span>
            <span className="font-mono font-bold text-slate-200 text-xs">{motor.omegaRadS.toFixed(2)} rad/s</span>
          </div>
          <div className="bg-space-900 p-2.5 rounded-lg border border-space-800">
            <span className="text-slate-400 block text-[10px]">Output Shaft Torque</span>
            <span className="font-mono font-bold text-amber-400 text-xs">{motor.torqueNm.toFixed(2)} N·m</span>
          </div>
          <div className="bg-space-900 p-2.5 rounded-lg border border-space-800">
            <span className="text-slate-400 block text-[10px]">Tractive Force</span>
            <span className="font-mono font-bold text-emerald-400 text-xs">{car.tractiveForceN.toFixed(1)} N</span>
          </div>
          <div className="bg-space-900 p-2.5 rounded-lg border border-space-800">
            <span className="text-slate-400 block text-[10px]">Vehicle Accel (a)</span>
            <span className="font-mono font-bold text-cyan-400 text-xs">{car.accelerationMs2.toFixed(1)} m/s²</span>
          </div>
        </div>

        {/* Tutorial 5 Thermodynamics Insight */}
        <div className="bg-space-900/80 p-3 rounded-lg border border-space-800 text-[11px] text-slate-300">
          <span className="text-cyan-400 font-bold block mb-1">💡 Tutorial 5 Thermodynamics Benchmark:</span>
          8 hours hard human pedaling (100W) = 2.88 MJ. Can boil off {meta.waterKgBoiled.toFixed(2)} kg of water into steam, burns ~{Math.round(meta.breadGramsRequired)} g of bread or ~{Math.round(meta.fatGramsBurnedTotal)} g of fat!
        </div>
      </div>
    </div>
  );
}

function LoadCellSimulator({ params }) {
  const [activeTab, setActiveTab] = useState('graph'); // 'graph' | 'readout'
  const rawCounts = params.tareOffset + (params.appliedWeightGrams * params.calFactor);
  const calibratedWeight = (rawCounts - params.tareOffset) / params.calFactor;

  const calSeries = useMemo(() => {
    const points = [];
    const maxW = Math.max(1000, params.appliedWeightGrams * 1.5);
    for (let w = 0; w <= maxW; w += 50) {
      points.push({ x: w, y: params.tareOffset + w * params.calFactor });
    }
    return [
      { name: `Calibration Line (Slope = ${params.calFactor} counts/g)`, color: '#10b981', data: points, strokeWidth: 2.5 }
    ];
  }, [params.tareOffset, params.calFactor, params.appliedWeightGrams]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-cyan-950/40 border border-cyan-700/50 px-3 py-1.5 rounded-lg text-xs">
        <span className="flex items-center gap-1.5 text-cyan-300 font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-400 animate-pulse" />
          HX711 24-Bit Linear Calibration:
        </span>
        <span className="font-mono text-cyan-200">
          W = (Raw - Tare) / Scale = {calibratedWeight.toFixed(1)} g
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-1.5 bg-space-950/90 p-1.5 rounded-xl border border-space-800">
          <button
            onClick={() => setActiveTab('graph')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              activeTab === 'graph'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>ADC Counts vs Applied Mass (Calibration Line)</span>
          </button>
          <button
            onClick={() => setActiveTab('readout')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              activeTab === 'readout'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Raw 24-bit Register Readout</span>
          </button>
        </div>

        {activeTab === 'graph' && (
          <GraphPlot
            title="HX711 24-Bit ADC Calibration Line"
            subtitle={`Raw Counts = Tare (${params.tareOffset.toLocaleString()}) + ${params.calFactor} · Weight (g)`}
            equations={[
              "$$\\text{Counts}(W) = \\text{Tare} + k \\cdot W \\iff W = \\frac{\\text{Counts} - \\text{Tare}}{k}$$",
              `$$\\text{Live Evaluation: } \\text{Counts}(W) = ${params.tareOffset.toLocaleString()} + ${params.calFactor} \\cdot W\\,(\\text{g}) \\quad (k = ${params.calFactor}\\text{ counts/g})$$`
            ]}
            xLabel="Applied Mass W"
            xUnit="g"
            yLabel="Raw ADC Counts"
            series={calSeries}
            operatingPoint={{
              x: params.appliedWeightGrams,
              y: rawCounts,
              color: '#10b981',
              label: `${params.appliedWeightGrams}g: ${Math.round(rawCounts).toLocaleString()}`
            }}
            referenceLines={[
              { type: 'y', value: params.tareOffset, label: `Tare = ${params.tareOffset.toLocaleString()}`, color: '#64748b' }
            ]}
            height={220}
          />
        )}

        <div className="bg-space-950 p-4 rounded-xl border border-space-800 grid grid-cols-2 gap-3 text-xs font-mono">
          <div className="bg-space-900 p-3 rounded-lg border border-space-800">
            <span className="text-slate-400 block text-[10px]">Raw 24-Bit ADC Counts:</span>
            <span className="text-amber-400 font-bold text-sm">{Math.round(rawCounts).toLocaleString()}</span>
          </div>
          <div className="bg-space-900 p-3 rounded-lg border border-space-800">
            <span className="text-slate-400 block text-[10px]">Calibrated Net Weight:</span>
            <span className="text-emerald-400 font-bold text-sm">{calibratedWeight.toFixed(1)} g</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function VisionSimulator({ params }) {
  const proj = project3DTo2D({
    x3D: params.x3D,
    y3D: params.y3D,
    z3D: params.z3D,
    fx: params.fx,
    fy: params.fx
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-cyan-950/40 border border-cyan-700/50 px-3 py-1.5 rounded-lg text-xs">
        <span className="flex items-center gap-1.5 text-cyan-300 font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-400 animate-pulse" />
          Perspective Projection Invariant:
        </span>
        <span className="font-mono text-cyan-200">
          u = fx·(X/Z) + cx = {proj.u} px
        </span>
      </div>

      <div className="bg-space-950 p-4 rounded-xl border border-space-800 flex flex-col items-center">
        {/* Simulated 640x480 Camera Sensor Screen */}
        <div className="relative w-64 h-48 bg-space-900 rounded-lg border-2 border-space-700 overflow-hidden shadow-inner flex items-center justify-center">
          {/* Principal Axis Crosshair */}
          <line className="stroke-space-700" x1="0" y1="50%" x2="100%" y2="50%" strokeWidth="1" strokeDasharray="4" />
          <line className="stroke-space-700" x1="50%" y1="0" x2="50%" y2="100%" strokeWidth="1" strokeDasharray="4" />
          
          {/* Target Projected Dot */}
          {proj.isVisible && (
            <div 
              className="absolute w-4 h-4 bg-cyan-400 rounded-full border-2 border-white shadow-lg shadow-cyan-400/80 -translate-x-1/2 -translate-y-1/2 transition-all duration-150"
              style={{
                left: `${proj.normalizedU * 100}%`,
                top: `${proj.normalizedV * 100}%`
              }}
            />
          )}

          <div className="absolute bottom-1 right-2 text-[9px] font-mono text-slate-500">
            640 x 480 Frame
          </div>
        </div>

        <div className="mt-3 text-xs font-mono text-slate-300 space-x-4">
          <span>Pixel U: <strong className="text-cyan-400">{proj.u}</strong></span>
          <span>Pixel V: <strong className="text-cyan-400">{proj.v}</strong></span>
          <span>Depth Z: <strong className="text-amber-400">{params.z3D}m</strong></span>
        </div>
      </div>
    </div>
  );
}

function PlanningSimulator({ params }) {
  const [obstacles, setObstacles] = useState([
    [1, 1], [1, 2], [1, 3], [1, 4],
    [3, 3], [3, 4], [3, 5], [3, 6],
    [5, 1], [5, 2], [5, 3]
  ]);

  const planningResult = useMemo(() => {
    return runAStarGridPlanning({
      gridWidth: params.gridSize || 10,
      gridHeight: params.gridSize || 10,
      start: [0, 0],
      goal: [(params.gridSize || 10) - 1, (params.gridSize || 10) - 1],
      obstacles
    });
  }, [params.gridSize, obstacles]);

  const pathSet = useMemo(() => {
    return new Set(planningResult.path.map(([x, y]) => `${x},${y}`));
  }, [planningResult]);

  const toggleObstacle = (x, y) => {
    if ((x === 0 && y === 0) || (x === (params.gridSize || 10) - 1 && y === (params.gridSize || 10) - 1)) return;
    const exists = obstacles.some(([ox, oy]) => ox === x && oy === y);
    if (exists) {
      setObstacles(obstacles.filter(([ox, oy]) => !(ox === x && oy === y)));
    } else {
      setObstacles([...obstacles, [x, y]]);
    }
  };

  const size = params.gridSize || 10;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-cyan-950/40 border border-cyan-700/50 px-3 py-1.5 rounded-lg text-xs">
        <span className="flex items-center gap-1.5 text-cyan-300 font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-400 animate-pulse" />
          A* Admissible Heuristic Invariant:
        </span>
        <span className="font-mono text-cyan-200">
          Path Length: {planningResult.pathLength} steps ({planningResult.success ? 'OPTIMAL' : 'BLOCKED'})
        </span>
      </div>

      <div className="bg-space-950 p-4 rounded-xl border border-space-800 flex flex-col items-center">
        <div 
          className="grid gap-1 bg-space-900 p-2 rounded-lg border border-space-700 select-none"
          style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: size }).map((_, y) => 
            Array.from({ length: size }).map((_, x) => {
              const isStart = x === 0 && y === 0;
              const isGoal = x === size - 1 && y === size - 1;
              const isObstacle = obstacles.some(([ox, oy]) => ox === x && oy === y);
              const isPath = pathSet.has(`${x},${y}`) && !isStart && !isGoal;

              let bg = "bg-space-800 hover:bg-space-700";
              if (isStart) bg = "bg-emerald-500 font-bold text-black";
              else if (isGoal) bg = "bg-amber-400 font-bold text-black";
              else if (isObstacle) bg = "bg-rose-900 border border-rose-600";
              else if (isPath) bg = "bg-cyan-500 shadow-sm shadow-cyan-400/50";

              return (
                <button
                  key={`${x}-${y}`}
                  onClick={() => toggleObstacle(x, y)}
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded flex items-center justify-center text-[10px] transition-colors ${bg}`}
                  title={`Cell (${x}, ${y}) - Click to toggle obstacle`}
                >
                  {isStart ? 'S' : isGoal ? 'G' : ''}
                </button>
              );
            })
          )}
        </div>
        <span className="text-[11px] text-slate-400 mt-2">Click any grid cell to toggle obstacle walls</span>
      </div>
    </div>
  );
}
