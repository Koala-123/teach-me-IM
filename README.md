# [Intelligent Machines — Interactive Learning Web Application](https://teach-me-im.vercel.app)

> 🚀 **Live Deployment:** [https://teach-me-im.vercel.app](https://teach-me-im.vercel.app)  
> An interactive computational platform featuring first-principles derivations, algorithmic simulators, question banks, and complete lab guides for mechatronics and intelligent robotics.

---

## 🏛️ Pedagogical Architecture: The 4-Quadrant System

Every unit in the course is rendered across four specialized computational learning quadrants:

1. **📖 Quadrant 1: Story & Intuition**
   - Plain-English explanations from scratch with zero unexpanded acronyms.
   - Clear visual cards, real-world analogies, and rigorous KaTeX mathematical notation.
   - Core Theoretical Invariants and common high-risk exam traps.

2. **🧪 Quadrant 2: Interactive Computational Lab**
   - Pure JavaScript algorithmic simulators with zero-passive sliders.
   - 3-Step Guide Banner (*Configure Inputs* $\to$ *Simulate & Mutate* $\to$ *Inspect Invariants*).
   - Pulsating **Live Invariant Status Badge** verifying physical conservation laws (KCL, Thevenin load lines, virtual ground stability, $P = \tau \omega$, ultrasonic ToF, A* optimality).
   - Integrated **Quick Quest Challenge** with `"Load Parameters into Lab"` button.

3. **🎯 Quadrant 3: Practice Arena ($n - 1$ Attempt Engine)**
   - Single-choice MCQs with the authentic **$n - 1$ attempts system**: wrong answers disable just that option and show attempts remaining, without spoiling the answer.
   - Multi-Select Questions (MSQs) with partial evaluation checkboxes (Correct, Missed, Incorrect).
   - Numerical Answer Type (NAT) with floating-point tolerance ranges.
   - Instant step-by-step LaTeX mathematical derivations upon completion.
   - Celebratory confetti effects on mastery.

4. **⚡ Quadrant 4: High-Yield Vault**
   - Canonical Formula & Identity Bank in KaTeX.
   - Exam Pitfall & Counterexample Vault.
   - Quick reference cheatsheet.

---

## 📚 Curriculum & Course Question Bank Mapping

All 52 authentic practice questions and interactive modules are sourced directly from core course literature and lecture archives:

| Unit | Title | Exam Milestone | Course Topics & Sources |
| :--- | :--- | :--- | :--- |
| **Unit 1** | Circuit Foundations, Thevenin & Matrix Nodal Analysis | **Test 1** | Microscopic charge drift, voltage divider loading, Thevenin & Norton, maximum power transfer, Wheatstone bridges, 6-node conductance matrix KCL, and ideal vs real components. |
| **Unit 2** | Microcontrollers & Raspberry Pi Pico (RP2040) Architecture | **Test 1** | Dual-core Cortex-M0+ silicon & SRAM banks, pinout taxonomy (VBUS/VSYS/3V3/GP25), GPIO 3.3V CMOS thresholds, LED ballast sizing, 12-bit SAR ADC & potentiometer physics, 16-channel PWM, and UART/SPI/I2C buses. |
| **Unit 3** | Distance & Proximity Sensing: Ultrasonic (HC-SR04) & IR | **Midterm** | Acoustic ToF & speed of sound $c(T)$, 8-pulse 40kHz resonance rationale, 2.5cm piezo ring-down blind zone, 5V-to-3.3V Echo divider stepping, active IR phototransistors & LM393 comparator, and sensor fusion trade-offs. |
| **Unit 4** | Operational Amplifiers (Op-Amps) & Signal Conditioning | **Midterm** | Sedra & Smith Chapter 2: 5 Golden Rules, virtual short circuit dynamic feedback, inverting/non-inverting derivations, unity-gain buffers, finite gain Eq. 2.5, GBWP, and slew rate distortion. |
| **Unit 5** | Actuators, Motors, Gears & Energy-Power Mechanics | **Test 2** | Electromechanical conversion ($V = I R_a + E_b, \tau = k_t I$), torque-speed curve & $P_{max}$, transmissions & infinite torque paradox, tractive vehicle dynamics ($a = P / (m \cdot v)$), human metabolic work (boiling water & fat calories), and reflected load inertia ($J_{ref} = J_{load} / N^2$). |
| **Unit 6** | Load Cells, Strain Gauges, Encoders & Mechatronics | **Test 2** | Piezoresistive strain gauge physics ($GF \cdot \epsilon$), quarter/half/full-bridge comparisons, single-point parallelogram bending beams, HX711 24-bit delta-sigma ADC calibration pipeline, quadrature encoder 1x/2x/4x edge decoding, and GPIO interrupts vs polling at high RPM. |
| **Unit 7** | Robotic Vision: Pinhole Camera Models & Sensing | **Final Exam** | Pinhole ray geometry & perspective division by $Z$, digital sensor pixels ($f_x = f \cdot k_u$), camera intrinsic matrix $\mathbf{K}$ (5 DOFs), radial/tangential lens distortion polynomials, monocular scale ambiguity, stereo vision disparity ($Z = \frac{f \cdot B}{d}$), and active depth sensors (ToF, Structured Light, LiDAR). |
| **Unit 8** | Robot Motion: Planning, Mapping & Localization | **Final / Project** | Configuration Space ($C$-space) & Minkowski obstacle inflation, Dijkstra vs $A^*$ search (admissibility & consistency proofs), Bug 1/2 reactive boundary tracing & RRT/PRM, probabilistic occupancy grid mapping & Bayesian log-odds updates, differential drive odometry kinematics, and landmark Bayes filter localization loops. |

---

## 🔬 13-Week Laboratory Syllabus Integration

The app includes structured guides, objectives, and key takeaways for all 13 course labs:
1. **Lab 1:** Basic Circuit Connections & Resistor Networks
2. **Lab 2:** Microcontroller Architecture & Embedded Programming (Pico RP2040)
3. **Lab 3:** Analog-to-Digital Conversion & Potentiometer LED Control
4. **Lab 4:** HC-SR04 Ultrasonic Sonar & Voltage Divider Protection
5. **Lab 5:** Infrared (IR) Proximity Sensing & Optical Material Physics
6. **Lab 6:** Pulse Width Modulation (PWM) & RC Servo Position Control
7. **Lab 7:** DC Motor Control Using an H-Bridge Motor Driver
8. **Lab 8:** Load Cell Force Measurement & HX711 24-Bit ADC Calibration
9. **Lab 9:** Closed-Loop Motor Speed Control with Quadrature Encoders
10. **Lab 10:** Robot Vision: Camera Calibration & Image Sensing
11. **Lab 11:** Path Planning: Bug Algorithms, Dijkstra & A*
12. **Lab 12:** Probabilistic Occupancy Grid Mapping
13. **Lab 13:** Robot Localization & Final Autonomous Competition

---

## 🛠️ Tech Stack & Compliance

- **Framework**: React 18+ (SPA with clean component breakdown)
- **Tooling & Bundler**: Vite 6+
- **Deployment**: Vercel Serverless Edge ([https://teach-me-im.vercel.app](https://teach-me-im.vercel.app))
- **Styling**: Tailwind CSS (custom dark space arcade theme)
- **Math Engine**: KaTeX with custom `MathView` inline/block parser and marked Markdown rendering
- **Icons**: Lucide React
- **Confetti FX**: `canvas-confetti`
- **Accessibility**: WCAG 2.1 AA Compliant (`aria-live="polite"` / `"assertive"`, `role="radiogroup"`, `role="status"`, skip links, visible focus rings)
- **Verification Suite**: 25 headless algorithmic unit tests (`node test-engines.js`)

---

## 🚀 Quickstart & Verification

```bash
# Install dependencies
npm install

# Run headless algorithmic verification suite (25 unit tests & 52-question validator)
npm test

# Run Vite local development server
npm run dev

# Build production bundle
npm run build
```
