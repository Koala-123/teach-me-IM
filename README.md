# Intelligent Machines (FM214) — Interactive Learning Web Application

> Built for **Plaksha University, Monsoon Semester AY 2026-2027**  
> Based on the **Active Computational Learning System Blueprint** ([`INTERACTIVE_COURSE_APP_BLUEPRINT.md`](../INTERACTIVE_COURSE_APP_BLUEPRINT.md)).

---

## 🏛️ Pedagogical Architecture: The 4-Quadrant System

Every unit in the course is rendered across four specialized computational learning quadrants:

1. **📖 Quadrant 1: Story & Intuition**
   - Plain-English explanations from scratch with zero unexpanded acronyms.
   - Clear visual cards, real-world/CS analogies, and KaTeX mathematical notation.
   - Core Theoretical Invariants and common high-risk exam traps.

2. **🧪 Quadrant 2: Interactive Computational Lab**
   - Pure JavaScript algorithmic simulators with zero-passive sliders.
   - 3-Step Guide Banner (*Configure Inputs* $\to$ *Simulate & Mutate* $\to$ *Inspect Invariants*).
   - Pulsating **Live Invariant Status Badge** verifying conservation laws ($KCL$, Thevenin load lines, virtual ground stability, $P = \tau \omega$, ultrasonic ToF, A* optimality).
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

All 33 questions and interactive modules are sourced directly from the course files:

| Unit | Title | Exam Milestone | Course Sources |
| :--- | :--- | :--- | :--- |
| **Unit 1** | Circuit Foundations, Thevenin & Matrix Nodal Analysis | **Test 1** | Lecture Quizzes 1, 2, 3, 4, 5, 6; Tutorials 1 & 2; Labs 1 & 2 |
| **Unit 2** | Microcontrollers & Raspberry Pi Pico (RP2040) Architecture | **Test 1** | Lecture Quiz 7; Gittaly Pico Q1–Q5; Tutorial 3; Lab 3; Pico slides |
| **Unit 3** | Distance & Proximity Sensing: Ultrasonic (HC-SR04) & IR | **Midterm** | Lecture Quiz 8; Gittaly Ultrasonic Q1–Q5; Gittaly IR Q1–Q5; Tutorial 4; Labs 4 & 5 |
| **Unit 4** | Operational Amplifiers (Op-Amps) & Signal Conditioning | **Midterm** | `3 OpAmpIntro.pdf` (Sedra/Smith Ch. 2); Gittaly Op-Amp Q1–Q5; Labs 6 & 7 |
| **Unit 5** | Actuators, Motors, Gears & Energy-Power Mechanics | **Test 2** | Lecture Quizzes 9 & 10; Tutorials 5 & 6; Course Outline |
| **Unit 6** | Load Cells, Strain Gauges, Encoders & Mechatronics | **Test 2** | Labs 6 & 7; Tutorial 2; Course Outline |
| **Unit 7** | Robotic Vision: Pinhole Camera Models & Sensing | **Final Exam** | Stanford CS231A Camera Models; Course Outline; Dudek & Jenkin |
| **Unit 8** | Robot Motion: Planning, Mapping & Localization | **Final / Project** | Choset et al. "Principles of Robot Motion"; Occupancy Grid Bayes Filters; A* Planning |

---

## 🛠️ Tech Stack & Compliance

- **Framework**: React 18+ (SPA with clean component breakdown)
- **Tooling & Bundler**: Vite 6+
- **Styling**: Tailwind CSS (custom dark space arcade theme)
- **Math Engine**: KaTeX with custom `MathView` inline/block parser
- **Icons**: Lucide React
- **Confetti FX**: `canvas-confetti`
- **Accessibility**: WCAG 2.1 AA Compliant (`aria-live="polite"` / `"assertive"`, `role="radiogroup"`, `role="status"`, skip links, visible focus rings)
- **Verification Suite**: 24 headless algorithmic unit tests (`node test-engines.js`)

---

## 🚀 Quickstart & Verification

```bash
# Install dependencies
npm install

# Run headless algorithmic verification suite (24 unit tests & question bank validator)
npm test

# Run Vite local development server
npm run dev

# Build production bundle
npm run build
```
