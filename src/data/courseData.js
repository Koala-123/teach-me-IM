/**
 * Comprehensive Course Curriculum and Question Bank for Intelligent Machines (FM214)
 * Faithfully constructed from:
 * - Lecture Quizzes.pdf (Quizzes 1 - 10)
 * - Tutorials (1).pdf (Tutorials 1 - 6)
 * - Gittaly.pdf (Pico, Ultrasonic, IR, Op-Amp questions)
 * - Labs.pdf (Labs 1 - 7)
 * - 3 OpAmpIntro.pdf (Sedra/Smith Chapter 2)
 * - Course Outline IM (1).pdf
 */

export const COURSE_INFO = {
  title: "Intelligent Machines",
  tagline: "Autonomous Systems, Sensing, Actuation & Robotics",
  topicPill: "Mechatronics & Robotics"
};

export const COURSE_MODULES = [
  {
    id: "unit-1-circuits",
    unitNumber: 1,
    title: "Circuit Foundations, Thevenin & Matrix Nodal Analysis",
    examMilestone: "Test 1",
    estHours: 6,
    badge: "Hardware Core",
    icon: "Cpu",
    coreInvariants: [
      "Kirchhoff's Current Law (KCL): The algebraic sum of currents entering any circuit node is strictly zero: \\sum I_{in} = 0.",
      "Thevenin Equivalence: Any linear one-port resistive network can be replaced by an ideal voltage source V_{th} = V_{open} in series with resistance R_{th} = V_{open} / I_{shunt}.",
      "Load Line Invariant: The terminal voltage of a non-ideal source decreases linearly with current: V_o = V_{th} - I_o R_{th}."
    ],
    commonPitfalls: [
      "Assuming high output impedance is desirable for a voltage source. A high R_O causes terminal voltage to collapse under load!",
      "Confusing nodal voltage (potential relative to common ground) with voltage drops across individual branch resistors.",
      "Thinking a pull-up resistor can revive a circuit where the output node is tied directly to ground (Lecture Quiz 6 nonsense trap)."
    ],
    story: {
      summary: "Understand circuits not as abstract textbook schematics, but as physical conservation laws. We master Ohm's law, build Thevenin equivalent models, formulate 6-node circuit equations for matrix solution, and analyze impedance matching.",
      sections: [
        {
          heading: "1. The Fundamental Hydraulics: Volts, Amps, and Ohms",
          text: "Think of an electrical circuit as a pressurized closed hydraulic loop. **Voltage** ($V$) in Volts is the water pressure difference produced by the pump (battery). **Current** ($I$) in Amperes is the volume flow rate of charges ($1\\text{ A} = 1\\text{ Coulomb/second}$). **Resistance** ($R$) in Ohms ($\\Omega$) is the constriction inside the pipe that dissipates energy as heat. Ohm's Law states the direct linear relation: $V = I \\cdot R$. Power dissipated is the rate of energy transformation: $P = V \\cdot I = I^2 R = \\frac{V^2}{R}$ Watts."
        },
        {
          heading: "2. Thevenin's Theorem & The Load Line",
          text: "Any complex circuit of batteries and resistors accessible via two terminals behaves externally as a single voltage source $V_{th}$ in series with an internal resistance $R_{th}$. As derived in Lecture Quiz 3 and Tutorial 1:\n\n1. **Open-Circuit Voltage** ($V_{open}$): When no load is connected ($I_o = 0$), no voltage drops across $R_{th}$. Hence, $V_{open} = V_{th}$.\n2. **Short-Circuit Current** ($I_{shunt}$): When terminals are shorted ($V_o = 0$), $I_{shunt} = \\frac{V_{th}}{R_{th}}$.\n3. **Thevenin Resistance**: $R_{th} = \\frac{V_{open}}{I_{shunt}}$.\n\nThe terminal characteristic is the straight load line: $V_o = V_{th} - I_o R_{th}$. When connected to a measurement device or load $R_i$, the terminal voltage is $V_i = V_{th} \\frac{R_i}{R_{th} + R_i}$."
        },
        {
          heading: "3. Systematic Nodal Analysis via Matrices (Quiz 5)",
          text: "For complex networks (such as the 6-node bridge circuit in Lecture Quiz 5), manual loop equations become error-prone. The robust engineering technique is **Nodal Analysis**:\n- Select a reference node as Ground ($V_0 = 0\\text{ V}$).\n- Label all $N$ unknown node voltages $V_1, V_2, \\dots, V_N$.\n- At each node $k$, write Kirchhoff's Current Law: $\\sum_{j} \\frac{V_k - V_j}{R_{kj}} = I_{k,ext}$.\n- This yields a system of linear equations $[G][V] = [I]$, where $G$ is the conductance matrix. Inverting or solving via Gaussian elimination yields all node potentials instantaneously."
        },
        {
          heading: "4. The Impedance Matching Principle",
          text: "Why do we desire **low output impedance** ($R_O \\approx 0$) for signal sources and power supplies, but **high input impedance** ($R_i \\gg R_O$) for measuring instruments like voltmeters and microcontrollers? Because $V_{measured} = V_{source} \\frac{R_i}{R_O + R_i}$. If $R_O$ is significant or $R_i$ is low, the meter severely 'loads' the circuit, causing the measured voltage to drop far below the true open-circuit voltage!"
        }
      ]
    },
    labSpec: {
      type: "circuit",
      title: "Interactive Circuit Sandbox: Nodal Solver & Thevenin Load Line",
      description: "Experiment with voltage sources, internal resistance, load lines, and Wheatstone bridge imbalances.",
      controls: [
        { id: "vSource", label: "Source Voltage (V_th)", min: 1, max: 24, step: 0.5, default: 5, unit: "V" },
        { id: "rSource", label: "Internal Output Resistance (R_O)", min: 0.5, max: 100, step: 0.5, default: 2, unit: "Ω" },
        { id: "rLoad", label: "Connected Load Resistance (R_L)", min: 1, max: 200, step: 1, default: 10, unit: "Ω" }
      ],
      quickQuest: {
        prompt: "From Lecture Quiz 2: A 5V source has a 2Ω series internal resistance. What is the short-circuit current Ishunt and the voltage when connected to a 10Ω load?",
        loadParams: { vSource: 5, rSource: 2, rLoad: 10 },
        expectedSummary: "I_sc = 5V / 2Ω = 2.5 A. Under 10Ω load: V_o = 5V * (10 / 12) = 4.17 V, Current I = 0.417 A."
      }
    },
    practiceQuestions: [
      {
        id: "q-1-1",
        type: "mcq",
        source: "Lecture Quiz 1 (12 August 2026)",
        title: "Current in Series Resistors",
        prompt: "A voltage source $V$ is connected across a series combination of two resistors $R_1$ and $R_2$. What is the current flowing through $R_1$ and $R_2$?",
        options: [
          "$I = \\frac{V}{R_1 + R_2}$, identical through both resistors.",
          "$I_1 = \\frac{V}{R_1}$ through $R_1$, and $I_2 = \\frac{V}{R_2}$ through $R_2$.",
          "$I = V \\cdot (R_1 + R_2)$, with higher current through the larger resistor.",
          "$I = \\frac{V}{R_1 \\parallel R_2}$, splitting equally between the two branches."
        ],
        correctIndex: 0,
        explanation: "By Kirchhoff's Current Law, in a single series loop there is only one conductive path for charge flow. Thus, the exact same current $I$ must pass sequentially through both resistors. The total equivalent resistance is $R_{eq} = R_1 + R_2$. By Ohm's law, $I = \\frac{V}{R_1 + R_2}$."
      },
      {
        id: "q-1-2",
        type: "nat",
        source: "Lecture Quiz 2 (17 August 2026)",
        title: "Short-Circuit Current from Load Model",
        prompt: "A power box has an open-circuit voltage $V_o = 5\\text{ V}$ and an internal series resistance $R = 2\\ \\Omega$. If the output terminals are shorted together ($V_o = 0\\text{ V}$), what is the short-circuit current $I_{shunt}$ in Amperes?",
        unit: "A",
        correctAnswer: 2.5,
        toleranceRange: [2.49, 2.51],
        explanation: "The load line equation is $V_o = V_{th} - I_o R_{th}$. Under short-circuit conditions, terminal voltage $V_o = 0\\text{ V}$. Setting $0 = 5 - 2 \\cdot I_{shunt} \\implies I_{shunt} = \\frac{5}{2} = 2.5\\text{ A}$."
      },
      {
        id: "q-1-3",
        type: "msq",
        source: "Tutorial 1 (e, f, g)",
        title: "High Input vs Low Output Impedance Objectives",
        prompt: "Why is it desirable in electronic measurement systems for a signal source to have LOW output impedance ($R_O$) and a measuring meter to have HIGH input impedance ($R_i$)? Select all true statements:",
        options: [
          "A low $R_O$ ensures negligible internal voltage drop even when current is drawn by the load.",
          "A high $R_i$ prevents the meter from drawing significant current ($I_{meter} \\approx 0$), avoiding loading the source.",
          "As $R_i \\to \\infty$, the terminal voltage $V_i = V_{ON} \\frac{R_i}{R_O + R_i}$ approaches the true open-circuit voltage $V_{ON}$.",
          "A high $R_O$ and low $R_i$ maximizes the voltage transferred to the voltmeter."
        ],
        correctIndices: [0, 1, 2],
        explanation: "The voltage across the load is given by the voltage divider $V_i = V_{ON} \\frac{R_i}{R_O + R_i} = \\frac{V_{ON}}{1 + R_O / R_i}$. For $V_i \\approx V_{ON}$, we require $\\frac{R_O}{R_i} \\to 0$, which mandates low output impedance ($R_O \\ll R_i$) and high input impedance ($R_i \\gg R_O$)."
      },
      {
        id: "q-1-4",
        type: "mcq",
        source: "Lecture Quiz 6 & Notes",
        title: "The Grounded Output Switch Fallacy",
        prompt: "In Lecture Quiz 6, a switch is wired such that the output pin is permanently tied to Ground ($0\\text{ V}$), regardless of switch position. A student proposes adding an external $10\\text{ k}\\Omega$ pull-up resistor to $5\\text{ V}$ to fix the logic high reading. Will this work?",
        options: [
          "No, because the output terminal remains shorted to ground; current will simply flow through the pull-up resistor to ground, leaving the output at 0V.",
          "Yes, because a 10kΩ pull-up resistor always forces a digital HIGH on any microcontroller pin.",
          "Yes, but only if the switch is opened so the pull-up can charge the internal capacitance.",
          "No, because pull-up resistors are only compatible with 3.3V systems, not 5V."
        ],
        correctIndex: 0,
        explanation: "As Professor Ruina noted: 'As written, this question is nonsense. The output is grounded no matter the position of the switch. A pullup resistor can’t fix this problem.' If an output node is physically hardwired to ground, adding a pull-up resistor creates a path from $V_{CC}$ to ground through the resistor, burning power while keeping $V_{node} = 0\\text{ V}$."
      },
      {
        id: "q-1-5",
        type: "nat",
        source: "Tutorial 2 & Wheatstone Bridge",
        title: "Wheatstone Bridge Differential Output",
        prompt: "A Wheatstone bridge is supplied by $V_B = 10\\text{ V}$. Leg 1 has $R_{1B} = 1000\\ \\Omega$ and $R_{1G} = 1000\\ \\Omega$. Leg 2 has $R_{2B} = 1000\\ \\Omega$ and $R_{2G} = 1200\\ \\Omega$. If the load resistor $R_L$ is removed, calculate the open-circuit differential voltage $V_0 = V_2 - V_1$ in Volts.",
        unit: "V",
        correctAnswer: 0.455,
        toleranceRange: [0.44, 0.47],
        explanation: "Leg 1 potential: $V_1 = V_B \\frac{R_{1G}}{R_{1B} + R_{1G}} = 10 \\cdot \\frac{1000}{2000} = 5.0\\text{ V}$. Leg 2 potential: $V_2 = V_B \\frac{R_{2G}}{R_{2B} + R_{2G}} = 10 \\cdot \\frac{1200}{1000 + 1200} = 10 \\cdot \\frac{1200}{2200} = 5.4545\\text{ V}$. The differential open-circuit voltage is $V_0 = V_2 - V_1 = 5.4545 - 5.0 = 0.4545\\text{ V}$."
      }
    ],
    vault: {
      formulas: [
        { name: "Ohm's Law", tex: "V = I \\cdot R \\iff I = \\frac{V}{R} \\iff R = \\frac{V}{I}" },
        { name: "Electrical Power", tex: "P = V \\cdot I = I^2 R = \\frac{V^2}{R} \\quad [\\text{Watts}]" },
        { name: "Thevenin Parameters", tex: "V_{th} = V_{open}, \\quad R_{th} = \\frac{V_{open}}{I_{shunt}}, \\quad V_o(I_o) = V_{th} - I_o R_{th}" },
        { name: "Loaded Voltage Divider", tex: "V_{load} = V_{th} \\left( \\frac{R_L}{R_{th} + R_L} \\right)" },
        { name: "Matrix Nodal Equation", tex: "[G]_{N \\times N} [V]_{N \\times 1} = [I]_{N \\times 1}, \\quad \\sum_{j} \\frac{V_k - V_j}{R_{kj}} = I_{k,ext}" }
      ],
      pitfalls: [
        {
          title: "The Voltmeter Loading Error",
          desc: "Using a standard $1\\text{ M}\\Omega$ multimeter to measure high-impedance divider nodes ($R > 500\\text{ k}\\Omega$) causes severe measurement sag. The meter resistance is in parallel with the lower resistor!"
        },
        {
          title: "Shorting Nodes on Breadboards",
          desc: "Breadboard rows 1–5 are tied internally. Placing both leads of a resistor in the same horizontal numbered row creates a direct short across the component."
        },
        {
          title: "The Quiz 6 Direct-Ground Trap",
          desc: "Never connect a logic output line directly to ground without a series switch. A pull-up cannot pull a dead short up to $V_{CC}$."
        }
      ]
    }
  },
  {
    id: "unit-2-pico",
    unitNumber: 2,
    title: "Microcontrollers & Embedded Hardware: Raspberry Pi Pico (RP2040)",
    examMilestone: "Test 1",
    estHours: 8,
    badge: "Silicon & I/O",
    icon: "CircuitBoard",
    coreInvariants: [
      "GPIO Voltage Limit: RP2040 GPIO pins operate strictly at 3.3V logic. Exceeding 3.6V triggers ESD latch-up and destroys the pin.",
      "Power Rail Segregation: Never power inductive loads (motors, solenoids) from the 3V3_OUT regulator pin. Inductive flyback and voltage sags trigger brown-out resets.",
      "ADC Mapping Law: 12-bit native ADC produces integer values 0-4095; MicroPython read_u16() scales this to 0-65535, corresponding linearly to 0V - 3.3V."
    ],
    commonPitfalls: [
      "Wiring an LED directly between a GPIO pin and GND without a current-limiting ballast resistor (fries the GPIO FET).",
      "Connecting a 5V sensor (like HC-SR04 Echo) directly to a Pico GPIO pin without a voltage divider.",
      "Wiring only two pins of a potentiometer instead of three, creating a variable resistor that cannot produce a true 0-3.3V ground-referenced signal."
    ],
    story: {
      summary: "Explore the brain of mechatronic machines: the Raspberry Pi Pico powered by the custom RP2040 dual-core ARM Cortex-M0+ silicon. We uncover the pin architecture, power management, ADC conversion, and safe interfacing.",
      sections: [
        {
          heading: "1. The Anatomy of the RP2040 Silicon",
          text: "Unlike a full computer (like a Raspberry Pi 4 running Linux OS with display output and multi-second boot sequences), the **Raspberry Pi Pico** is a bare-metal **microcontroller**. It executes firmware immediately upon power-up with microsecond deterministic timing. It features:\n- Dual-core ARM Cortex-M0+ running at 133 MHz.\n- 264 KB on-chip SRAM across 6 independent banks.\n- 2 MB external QSPI Flash memory for program storage.\n- 30 multi-function GPIO pins, of which 26 are broken out on header pins."
        },
        {
          heading: "2. The Critical Pin Families (Tutorial 3)",
          text: "Mastering the Pico pinout is essential for mechatronic design:\n- **GP0 to GP22, GP26-GP28**: 3.3V General-Purpose Input/Output pins.\n- **GP25**: Hardwired internally on the Pico board to the green user LED. Because it has an onboard trace to the LED, it serves as a visual heartbeat/debugging indicator and is not brought out to the edge headers!\n- **VBUS (Pin 40)**: 5V direct power from the micro-USB cable. Can source up to 500mA from the host computer.\n- **VSYS (Pin 39)**: Main system power input (1.8V to 5.5V) feeding the onboard RT6150 buck-boost Switch-Mode Power Supply (SMPS). Powering via batteries requires feeding VSYS (often through a Schottky diode).\n- **3V3_OUT (Pin 36)**: Regulated 3.3V output from the SMPS. Supplies the RP2040 and external low-power sensors (up to ~300mA total).\n- **3V3_EN (Pin 37)**: Active-high enable pin for the SMPS. Pulling it to GND shuts down the 3.3V regulator.\n- **ADC0 (GP26), ADC1 (GP27), ADC2 (GP28)**: 12-bit analog input channels (0 to 3.3V). ADC4 is connected internally to an on-chip silicon temperature sensor."
        },
        {
          heading: "3. Ballast Resistors & The Blinking LED (Gittaly Pico Q2)",
          text: "Why does an LED burn out if connected directly across a 3.3V GPIO pin and Ground? A diode is an exponential device: once forward bias exceeds $V_F \\approx 2.0\\text{ V}$, dynamic internal resistance drops to near zero. Without a resistor, the GPIO output transistor attempts to deliver infinite current, exceeding its 16mA maximum rating and burning the silicon!\n\nThe required series resistor is given by Ohm's Law:\n$$R = \\frac{V_{supply} - V_F}{I_F} = \\frac{3.3\\text{ V} - 2.0\\text{ V}}{0.020\\text{ A}} = 65\\ \\Omega$$\nWe select the standard resistor value $68\\ \\Omega$ or $100\\ \\Omega$."
        },
        {
          heading: "4. The 3-Terminal Potentiometer vs Variable Resistor (Gittaly Pico Q5)",
          text: "If you connect only two pins of a potentiometer (wiper and one end), you have a variable series resistor ($R_{var}$). But if the microcontroller ADC has infinite input impedance ($I_{ADC} = 0$), no current flows, so there is zero voltage drop across $R_{var}$—the ADC reads 3.3V everywhere!\n\nConnecting all three pins (Top to 3.3V, Bottom to GND, Wiper to ADC) forms a true **variable voltage divider**. Current continuously flows through the resistive track, establishing a linear potential gradient. At 30% rotation from GND, the wiper reads exactly $V = 0.30 \\times 3.3\\text{ V} = 0.99\\text{ V}$. In MicroPython `read_u16()`, this corresponds to raw integer $0.30 \\times 65535 \\approx 19660$."
        }
      ]
    },
    labSpec: {
      type: "pico",
      title: "Interactive Pico Pinout & ADC Potentiometer Sandbox",
      description: "Inspect Pico pins, rotate the analog potentiometer, check raw ADC quantization (12-bit vs 16-bit), and verify GPIO safety limits.",
      controls: [
        { id: "wiperPercent", label: "Potentiometer Wiper Position", min: 0, max: 100, step: 1, default: 30, unit: "%" },
        { id: "appliedVoltage", label: "Voltage Applied to GPIO Pin", min: 0, max: 5.5, step: 0.1, default: 3.3, unit: "V" },
        { id: "ledForwardV", label: "LED Forward Voltage (V_F)", min: 1.6, max: 3.2, step: 0.1, default: 2.0, unit: "V" }
      ],
      quickQuest: {
        prompt: "From Gittaly Pico Q5: Set the potentiometer wiper to exactly 30% from the GND end. What is the expected voltage and raw 16-bit MicroPython ADC reading?",
        loadParams: { wiperPercent: 30, appliedVoltage: 3.3, ledForwardV: 2.0 },
        expectedSummary: "At 30%: Voltage = 0.99 V. Raw 16-bit ADC = 19660 (or 12-bit hardware = 1228)."
      }
    },
    practiceQuestions: [
      {
        id: "q-2-1",
        type: "mcq",
        source: "Lecture Quiz 7 & Gittaly Quiz",
        title: "Purpose and Peculiarity of GP25",
        prompt: "What is the specific purpose of the GPIO pin labeled GP25 on the Raspberry Pi Pico, and how does it differ from other GPIO pins?",
        options: [
          "It is connected internally to the onboard green LED and is not exposed on the external header pins.",
          "It is the high-voltage motor driver output capable of supplying up to 2 Amps.",
          "It is the dedicated master clock pin for high-speed hardware SPI communication.",
          "It is the internal hardware reset pin connected directly to the RUN line."
        ],
        correctIndex: 0,
        explanation: "On the standard Raspberry Pi Pico, GP25 is wired directly to the onboard surface-mount green LED. Because it is routed internally on the PCB, it is not brought out to the physical pin headers (pins 1–40). It is universally used as a 'heartbeat' status indicator to confirm firmware execution without external breadboard wiring."
      },
      {
        id: "q-2-2",
        type: "nat",
        source: "Gittaly Pico Question 2",
        title: "Ballast Resistor Calculation for Pico LED",
        prompt: "A standard red LED has a forward voltage drop $V_F = 2.0\\text{ V}$ and requires a forward operating current $I_F = 20\\text{ mA}$ ($0.02\\text{ A}$). If powered from the Pico's $3.3\\text{ V}$ GPIO pin, calculate the exact series resistor value in Ohms ($\\Omega$).",
        unit: "Ω",
        correctAnswer: 65,
        toleranceRange: [64, 66],
        explanation: "By Kirchhoff's Voltage Law: $V_{GPIO} = V_R + V_F \\implies V_R = 3.3\\text{ V} - 2.0\\text{ V} = 1.3\\text{ V}$. By Ohm's Law: $R = \\frac{V_R}{I_F} = \\frac{1.3\\text{ V}}{0.020\\text{ A}} = 65\\ \\Omega$."
      },
      {
        id: "q-2-3",
        type: "nat",
        source: "Gittaly Pico Question 5c",
        title: "Potentiometer 16-Bit Raw ADC Reading",
        prompt: "A $10\\text{ k}\\Omega$ potentiometer is connected across GND and 3V3. The wiper is positioned exactly $30\\%$ of the way from the GND terminal. What raw 16-bit ADC value ($0 - 65535$, as returned by MicroPython `read_u16()`) will be read by the Pico?",
        unit: "raw units",
        correctAnswer: 19660,
        toleranceRange: [19600, 19700],
        explanation: "Wiper voltage is $V_{wiper} = 0.30 \\times 3.3\\text{ V} = 0.99\\text{ V}$. MicroPython scales the 12-bit ADC reading across the full 16-bit integer range ($0$ to $65535$): $\\text{Raw} = 0.30 \\times 65535 = 19660.5 \\approx 19660$."
      },
      {
        id: "q-2-4",
        type: "msq",
        source: "Gittaly Pico Question 4 & Tutorial 3",
        title: "Why Powering Motors from 3V3_OUT Fails Catastrophically",
        prompt: "Why is powering DC motors, servos, or high-current solenoids directly from the Pico's 3V3_OUT pin (Pin 36) dangerous and bad engineering practice? Select all valid electrical reasons:",
        options: [
          "The onboard RT6150 buck-boost regulator has a strict thermal current limit (~300mA for external loads) and will overheat or shut down.",
          "Motors draw large stall and startup currents (often > 1A), causing the 3.3V rail to sag below 1.8V and triggering Brown-Out Reset (BOR) on the RP2040.",
          "When motor coils are switched off, the collapsing magnetic field generates high-voltage inductive flyback spikes ($V = -L \\frac{di}{dt}$) that can destroy the regulator and silicon.",
          "The 3V3_OUT pin is AC-coupled and only outputs high-frequency RF signals."
        ],
        correctIndices: [0, 1, 2],
        explanation: "Motors must always be powered from a dedicated external power rail (e.g. 5V VBUS or separate battery pack) through a motor driver (H-bridge) with flyback diodes, sharing a common ground with the Pico."
      },
      {
        id: "q-2-5",
        type: "mcq",
        source: "Tutorial 3 & Slide Deck",
        title: "External Battery Feeding Pin on Pico",
        prompt: "To power a standalone mobile robot using a 3.7V Li-Po battery or 3x AA batteries ($4.5\\text{V}$), which pin on the Raspberry Pi Pico should the positive battery terminal be connected to?",
        options: [
          "VSYS (Pin 39), which feeds the onboard buck-boost regulator.",
          "VBUS (Pin 40), because it is directly tied to the USB 5V line.",
          "3V3_OUT (Pin 36), directly bypassing the regulator.",
          "3V3_EN (Pin 37), which forces the power chip into battery mode."
        ],
        correctIndex: 0,
        explanation: "VSYS (Pin 39) is the main system input designed to accept any supply between 1.8V and 5.5V. The onboard RT6150 buck-boost SMPS regulates VSYS to provide a clean 3.3V to the RP2040 chip."
      }
    ],
    vault: {
      formulas: [
        { name: "LED Series Resistor", tex: "R_{ballast} = \\frac{V_{GPIO} - V_F}{I_F} = \\frac{3.3 - V_F}{I_F}" },
        { name: "ADC Voltage Reconstruction", tex: "V_{in} = \\left( \\frac{\\text{Raw}_{12}}{4095} \\right) \\times 3.3\\text{ V} = \\left( \\frac{\\text{Raw}_{16}}{65535} \\right) \\times 3.3\\text{ V}" },
        { name: "Potentiometer Output", tex: "V_{wiper} = V_{supply} \\cdot \\left( \\frac{\\%_{\\text{wiper}}}{100} \\right)" },
        { name: "PWM Effective Voltage", tex: "V_{eff} = D \\cdot V_{supply} = \\left( \\frac{t_{on}}{t_{on} + t_{off}} \\right) \\cdot 3.3\\text{ V}" }
      ],
      pitfalls: [
        {
          title: "5V Sensor to 3.3V GPIO Burnout",
          desc: "The RP2040 is NOT 5V tolerant. Feeding 5V into any GPIO activates internal silicon ESD protection clamp diodes, which conduct destructive current into the 3.3V rail."
        },
        {
          title: "Missing Common Ground",
          desc: "When using an external battery pack or motor driver, failing to connect the battery GND to the Pico GND makes signal voltages floating and unpredictable."
        },
        {
          title: "Floating Inputs without Pull-up/Pull-down",
          desc: "A disconnected button input will pick up ambient electromagnetic interference and toggle randomly. Always enable internal software pull-up (`Pin.PULL_UP`) or pull-down."
        }
      ]
    }
  },
  {
    id: "unit-3-sensors",
    unitNumber: 3,
    title: "Distance & Proximity Sensing: Ultrasonic & Infrared (IR)",
    examMilestone: "Midterm",
    estHours: 8,
    badge: "Sensors Core",
    icon: "Radar",
    coreInvariants: [
      "Time-of-Flight (ToF) Sound Travel: Distance = (Echo Pulse Width × Speed of Sound) / 2. Division by 2 is mandatory for round-trip propagation.",
      "Ultrasonic Blind Zone Invariant: Echoes returning within ~150µs (< 2.5cm) overlap with piezoelectric transducer mechanical ring-down, yielding corrupt garbage readings.",
      "Optical Reflection Duality: Specular reflection on shiny surfaces obeys θ_r = θ_i (bouncing IR away from angled receiver), whereas matte surfaces exhibit Lambertian diffuse scattering."
    ],
    commonPitfalls: [
      "Connecting the HC-SR04 5V Echo output directly to the Pico GPIO without a 2-resistor voltage divider.",
      "Expecting an ultrasonic sensor to detect sound-absorbing acoustic foam or soft pillows (acoustically invisible due to lack of reflection).",
      "Confusing the LM393 IR sensitivity potentiometer with a range amplifier; it merely adjusts the comparator DC threshold voltage V_ref."
    ],
    story: {
      summary: "Explore how autonomous machines perceive spatial boundaries. We dissect the acoustic physics of the HC-SR04 ultrasonic transducer and the optical scattering of infrared proximity sensors, as explored in Labs 4-5 and Gittaly notes.",
      sections: [
        {
          heading: "1. The HC-SR04 Ultrasonic Sonar: Time of Flight",
          text: "How does a bat fly in pitch darkness or a car detect obstacles while reversing? By **echolocation**. The HC-SR04 module features two piezoelectric transducers: a transmitter (speaker) and a receiver (microphone).\n\n**The 4-Step Measurement Cycle**:\n1. The Pico sends a $10\\,\\mu\\text{s}$ digital `HIGH` pulse to the `TRIG` pin.\n2. The onboard sonic processor triggers the transmitter to fire an **8-pulse burst at 40 kHz**.\n3. The `ECHO` pin goes `HIGH` the instant transmission starts.\n4. When the reflected sonic wave hits the receiver diaphragm, the `ECHO` pin drops `LOW`. The duration of the `HIGH` pulse is the round-trip travel time $t_{echo}$."
        },
        {
          heading: "2. Why 8 Pulses at 40 kHz? (Gittaly Ultrasonic Q1)",
          text: "Why doesn't the sensor fire just a single sharp click? A single acoustic pulse has very little energy and is vulnerable to ambient noise spikes (like jangling keys or snapping fingers). Firing 8 consecutive cycles at 40 kHz allows mechanical resonance to build up in the piezoelectric crystal, producing a powerful, coherent acoustic wave with high signal-to-noise ratio that the bandpass receiver circuit can easily distinguish."
        },
        {
          heading: "3. The Blind Zone Limitation (Lecture Quiz 8)",
          text: "Why can't an ultrasonic sensor accurately measure an object placed $1\\text{ cm}$ away? When the transmitter fires, the piezo diaphragm vibrates vigorously and continues ringing down mechanically for approximately $100\\,\\mu\\text{s}$ to $150\\,\\mu\\text{s}$. If an obstacle is closer than $\\approx 2.5\\text{ cm}$, the acoustic reflection bounces back before the transmitter has stopped ringing! The receiver amplifier cannot distinguish the faint echo from its own mechanical reverberation, producing garbage readings."
        },
        {
          heading: "4. Protecting the Pico from the 5V Echo Pin (Tutorial 4 & Lab 4)",
          text: "The HC-SR04 requires 5V power from `VBUS` to generate sufficient acoustic power. Consequently, its `ECHO` pin outputs a $5\\text{ V}$ logic signal. Connecting this directly to a Pico GPIO pin will fry the internal silicon over time!\n\nTo safely step $5\\text{ V}$ down to $3.3\\text{ V}$, we insert a voltage divider between ECHO and GND:\n$$V_{out} = 5.0\\text{ V} \\times \\frac{R_2}{R_1 + R_2} \\approx 3.3\\text{ V} \\implies \\frac{R_2}{R_1 + R_2} = \\frac{2}{3}$$\nA standard pair is $R_1 = 1\\text{ k}\\Omega$ (top) and $R_2 = 2\\text{ k}\\Omega$ (bottom to GND), yielding $V_{out} = 5.0 \\times \\frac{2000}{3000} = 3.33\\text{ V}$."
        },
        {
          heading: "5. Infrared (IR) Proximity & Optical Physics (Gittaly IR Q1-Q5)",
          text: "Digital IR obstacle sensors combine an IR LED emitter (wavelength $\\sim 940\\text{ nm}$) and an IR phototransistor/photodiode connected to an LM393 comparator IC.\n- **The Sensitivity Potentiometer**: Turning the dial adjusts the comparator reference voltage $V_{ref}$. Clockwise increases sensitivity (detects fainter reflections at greater distance); counter-clockwise lowers sensitivity.\n- **Specular vs. Diffuse Reflection**: On a matte surface, light scatters in all directions (Lambertian diffusion), ensuring some photons return to the receiver. A shiny mirror causes specular reflection ($\\theta_r = \\theta_i$). If tilted even $10^\\circ$, all reflected light bounces away into the room, causing the sensor to report 'nothing detected'!\n- **Color Absorption**: Dark/black materials (especially carbon-black) absorb infrared wavelengths, reflecting minimal energy. White materials reflect heavily."
        }
      ]
    },
    labSpec: {
      type: "sensor",
      title: "Interactive Sonar & IR Optics Laboratory",
      description: "Adjust target distance, air temperature, surface angles, and material reflectance to observe ToF waveforms, Echo voltage dividers, and IR comparator triggers.",
      controls: [
        { id: "targetDistanceCm", label: "Target Distance", min: 1, max: 200, step: 1, default: 25, unit: "cm" },
        { id: "airTempC", label: "Ambient Air Temperature", min: -10, max: 45, step: 1, default: 20, unit: "°C" },
        { id: "surfaceType", label: "Surface Type (0: Matte, 1: Shiny Mirror)", min: 0, max: 1, step: 1, default: 0, unit: "" },
        { id: "surfaceAngleDeg", label: "Surface Tilt Angle", min: -45, max: 45, step: 5, default: 0, unit: "°" }
      ],
      quickQuest: {
        prompt: "From Lecture Quiz 8 & Lab 4: Move the object to distance d = 1.5 cm. Observe why the sensor fails and triggers the BLIND_ZONE condition.",
        loadParams: { targetDistanceCm: 1.5, airTempC: 20, surfaceType: 0, surfaceAngleDeg: 0 },
        expectedSummary: "Echo returns in < 90µs, inside the transducer ring-down period (< 2.5cm blind zone)."
      }
    },
    practiceQuestions: [
      {
        id: "q-3-1",
        type: "mcq",
        source: "Lecture Quiz 8 & Gittaly Ultrasonic Q1",
        title: "Reason for Ultrasonic 8-Pulse Burst",
        prompt: "Why does the HC-SR04 ultrasonic sensor transmit a burst of 8 square pulses at 40 kHz rather than a single brief pulse?",
        options: [
          "To allow mechanical acoustic resonance to build up in the piezoelectric crystal and discriminate against ambient acoustic noise.",
          "Because a single pulse travels at only one-eighth the speed of sound.",
          "To measure the Doppler shift of moving vehicles across 8 frequency bins.",
          "Because the Raspberry Pi Pico cannot register interrupts shorter than 8 cycles."
        ],
        correctIndex: 0,
        explanation: "A single acoustic cycle lacks sufficient energy and is vulnerable to ambient acoustic clicks. An 8-cycle burst at the transducer's 40 kHz natural resonant frequency drives the piezoelectric diaphragm into maximum oscillation, producing a strong, coherent wave packet that the receiver's tuned bandpass filter can reliably detect."
      },
      {
        id: "q-3-2",
        type: "nat",
        source: "Tutorial 4 & Lab 4",
        title: "Echo Pin Voltage Divider Calculation",
        prompt: "To step down the HC-SR04's 5.0V Echo output to a safe level for the Pico, a voltage divider is built using $R_1 = 1000\\ \\Omega$ and $R_2 = 2000\\ \\Omega$ (connected to GND). Calculate the output voltage $V_{out}$ fed to the Pico GPIO pin in Volts.",
        unit: "V",
        correctAnswer: 3.33,
        toleranceRange: [3.30, 3.35],
        explanation: "By the voltage divider formula: $V_{out} = V_{in} \\cdot \\frac{R_2}{R_1 + R_2} = 5.0\\text{ V} \\cdot \\frac{2000}{1000 + 2000} = 5.0 \\cdot \\frac{2}{3} = 3.333\\text{ V}$, which safely matches the 3.3V GPIO input rating."
      },
      {
        id: "q-3-3",
        type: "mcq",
        source: "Gittaly IR Question 3 & Lab 5",
        title: "The Angled Shiny Mirror Optical Illusion",
        prompt: "An autonomous robot equipped with an active IR proximity sensor approaches a mirror tilted at a $25^\\circ$ angle. Why might the sensor report 'no obstacle detected' even though the mirror is only 5 cm away?",
        options: [
          "The mirror exhibits specular reflection (angle of incidence = angle of reflection), deflecting the narrow IR beam away from the receiver.",
          "Mirrors absorb 100% of infrared radiation due to silver backing.",
          "The speed of light slows down inside the glass substrate, delaying the return signal beyond the timeout.",
          "The IR photodiode cannot detect light that has undergone a parity inversion."
        ],
        correctIndex: 0,
        explanation: "Unlike matte surfaces that produce diffuse Lambertian scattering (spreading reflected photons in all directions), polished reflective surfaces exhibit specular reflection: $\\theta_r = \\theta_i$. If the mirror is angled, the emitted IR photons bounce cleanly away into the room, starving the receiver photodiode of reflected photons."
      },
      {
        id: "q-3-4",
        type: "nat",
        source: "Gittaly IR Question 4",
        title: "Analog IR Sensor 10-Bit ADC Quantization",
        prompt: "An analog IR sensor outputs $0.5\\text{ V}$ when no reflection is present, and $4.0\\text{ V}$ under maximum reflection. If read by a microcontroller with a 10-bit ADC ($0 - 1023$) operating on a $5.0\\text{ V}$ reference, calculate the raw integer ADC value corresponding to the $4.0\\text{ V}$ maximum reflection signal.",
        unit: "raw units",
        correctAnswer: 818,
        toleranceRange: [816, 820],
        explanation: "The 10-bit ADC maps $0\\text{ V} \\to 0$ and $5.0\\text{ V} \\to 1023$. Thus: $\\text{ADC} = \\text{round}\\left( \\frac{V_{in}}{V_{ref}} \\times 1023 \\right) = \\text{round}\\left( \\frac{4.0}{5.0} \\times 1023 \\right) = \\text{round}(0.80 \\times 1023) = \\text{round}(818.4) = 818$."
      },
      {
        id: "q-3-5",
        type: "msq",
        source: "Lecture Quiz 8 & Gittaly Ultrasonic Q5",
        title: "Physical Constraints on Ultrasonic Distance Measurement",
        prompt: "Which of the following physical phenomena will cause an ultrasonic sensor to produce incorrect, false, or zero distance measurements? Select all that apply:",
        options: [
          "Target distance is less than 2.5 cm (blind zone / transducer ringing overlap).",
          "Target is made of open-cell acoustic foam or soft fabric that absorbs sound waves rather than reflecting them.",
          "Target surface is tilted at an acute angle > 45° relative to the incident beam, causing specular acoustic reflection away from the receiver.",
          "Two ultrasonic sensors facing each other and pinging simultaneously, causing acoustic crosstalk interference."
        ],
        correctIndices: [0, 1, 2, 3],
        explanation: "All four are authentic physical failure modes explored in Labs 4-5: blind zone ring-down, acoustic absorption, geometric acoustic deflection, and mutual sensor acoustic interference."
      }
    ],
    vault: {
      formulas: [
        { name: "Speed of Sound in Air", tex: "c \\approx 331.3 + 0.606 \\cdot T_{celsius} \\quad [\\text{m/s}]" },
        { name: "Time of Flight Distance", tex: "d = \\frac{t_{echo} \\cdot c}{2} = \\frac{t_{echo}[\\mu s] \\times 0.0343}{2} \\quad [\\text{cm}]" },
        { name: "Voltage Stepping Divider", tex: "V_{GPIO} = V_{echo} \\left( \\frac{R_2}{R_1 + R_2} \\right) \\le 3.3\\text{ V}" },
        { name: "Lambertian Diffuse Flux", tex: "I(\\theta) = I_0 \\cos(\\theta)" },
        { name: "10-Bit ADC Voltage Mapping", tex: "V = \\left( \\frac{\\text{ADC}}{1023} \\right) \\cdot V_{ref}" }
      ],
      pitfalls: [
        {
          title: "The 2.5 cm Sonar Blind Zone",
          desc: "Never mount an ultrasonic sensor recessed inside a robot chassis. If any chassis part is within 2.5 cm of the transducer, it will permanently read that internal reflection."
        },
        {
          title: "Ambient Sunlight IR Saturation",
          desc: "Unmodulated DC infrared sensors fail outdoors because direct sunlight contains massive amounts of 940nm IR, which completely saturates the phototransistor."
        },
        {
          title: "Forgetting the Factor of 2 in Distance",
          desc: "The sound pulse must travel to the obstacle AND bounce back. Forgetting to divide by 2 yields exactly double the true distance."
        }
      ]
    }
  },
  {
    id: "unit-4-opamp",
    unitNumber: 4,
    title: "Operational Amplifiers (Op-Amps) & Signal Conditioning",
    examMilestone: "Midterm",
    estHours: 7,
    badge: "Analog Core",
    icon: "Activity",
    coreInvariants: [
      "Virtual Short Circuit: V+ ≈ V- strictly when negative feedback is active and the op-amp output is not saturated.",
      "Zero Input Current: I+ = I- = 0 due to infinite input impedance of the ideal op-amp.",
      "Gain-Bandwidth Product (GBWP): The product of closed-loop gain and cutoff frequency is constant: A_CL × f_c = GBWP."
    ],
    commonPitfalls: [
      "Believing that V+ and V- are physically connected together (they are electrically isolated; tracking is enforced dynamically by feedback).",
      "Assuming an op-amp can output voltages higher than its power supply rails V_CC and V_EE.",
      "Expecting infinite bandwidth when increasing closed-loop gain (doubling the gain cuts bandwidth in half!)."
    ],
    story: {
      summary: "Master the operational amplifier—the universal analog building block. Based on Sedra & Smith Chapter 2, Gittaly Lecture 4, and Labs 6-7, we analyze the inverting and non-inverting topologies, finite open-loop gain effects, and HX711 instrumentation circuits.",
      sections: [
        {
          heading: "1. The Ideal Op-Amp Model & The 5 Golden Rules",
          text: "An **Operational Amplifier** is a differential-input, single-ended-output direct-coupled voltage amplifier. The ideal op-amp exhibits:\n1. **Infinite input impedance** ($R_{in} = \\infty \\implies I^+ = I^- = 0$).\n2. **Zero output impedance** ($R_{out} = 0$).\n3. **Infinite open-loop gain** ($A \\to \\infty$).\n4. **Infinite bandwidth** (amplifies DC up to infinite frequency).\n5. **Infinite common-mode rejection** ($CMRR = \\infty$)."
        },
        {
          heading: "2. The Virtual Short: Why V+ equals V- (Gittaly Op-Amp Q2-Q4)",
          text: "Why do we say $V^+ \\approx V^-$? The fundamental transfer equation is:\n$$V_{out} = A (V^+ - V^-) \\iff V^+ - V^- = \\frac{V_{out}}{A}$$\nBecause the internal open-loop gain $A$ is enormous (typically $10^5$ to $10^6$ V/V), for any normal output voltage ($V_{out} \\sim 5\\text{ V}$), the differential input voltage is $V^+ - V^- = \\frac{5}{10^5} = 50\\,\\mu\\text{V} \\approx 0$.\n\n**CRITICAL INSIGHT (Gittaly Q4)**: Are the two pins physically shorted? **NO!** A physical wire allows current to flow between pins. An op-amp's inputs draw zero current ($I_{in} = 0$). The tracking is an active feedback phenomenon: the op-amp monitors the error and drives $V_{out}$ to whatever value keeps $V^- = V^+$."
        },
        {
          heading: "3. Inverting vs Non-Inverting Topologies",
          text: "- **Inverting Amplifier**: Input is fed through $R_1$ to the inverting terminal, with feedback resistor $R_2$. The non-inverting terminal is grounded ($V^+ = 0$). Thus $V^- = 0$ is a **virtual ground**. Current $I = \\frac{V_{in} - 0}{R_1}$ cannot enter the op-amp, so it flows entirely through $R_2$ into the output. Thus:\n$$V_{out} = 0 - I R_2 = -\\frac{R_2}{R_1} V_{in}$$\n- **Non-Inverting Amplifier**: Input is applied directly to $V^+$. Feedback forms a voltage divider to $V^-$: $V^- = V_{out} \\frac{R_1}{R_1 + R_2} = V_{in} \\implies V_{out} = \\left( 1 + \\frac{R_2}{R_1} \\right) V_{in}$."
        },
        {
          heading: "4. The Gain-Bandwidth Tradeoff (Gittaly Op-Amp Q1)",
          text: "Real op-amps have an internal dominant pole. The product of closed-loop gain $A_{CL}$ and cutoff frequency $f_c$ is constant: **Gain-Bandwidth Product (GBWP)**. If an audio preamplifier with a $1\\text{ MHz}$ GBWP is designed with a gain of $20\\times$, its bandwidth is $f_c = \\frac{1\\text{ MHz}}{20} = 50\\text{ kHz}$. If you try to amplify a microphone signal by increasing gain to $100\\times$, bandwidth collapses to $10\\text{ kHz}$, cutting off high audio frequencies!"
        }
      ]
    },
    labSpec: {
      type: "opamp",
      title: "Interactive Operational Amplifier Sandbox",
      description: "Tweak input voltages, feedback resistors, supply rails, and open-loop gain A to observe virtual ground stability, saturation, and GBWP bandwidth.",
      controls: [
        { id: "vIn", label: "Input Signal Voltage (V_in)", min: -5, max: 5, step: 0.1, default: 0.5, unit: "V" },
        { id: "r1", label: "Input Resistor R1", min: 1, max: 100, step: 1, default: 10, unit: "kΩ" },
        { id: "r2", label: "Feedback Resistor R2", min: 1, max: 200, step: 2, default: 50, unit: "kΩ" },
        { id: "vCc", label: "Positive Rail V_CC", min: 3, max: 15, step: 1, default: 12, unit: "V" }
      ],
      quickQuest: {
        prompt: "From Sedra/Smith & Gittaly: Configure an inverting amplifier with R1=10kΩ, R2=50kΩ (Gain = -5). Increase Vin to 3.0V. Observe how the output saturates at -12V and the virtual ground at V- breaks!",
        loadParams: { vIn: 3.0, r1: 10, r2: 50, vCc: 12 },
        expectedSummary: "V_out saturates at -12V (cannot reach -15V). Negative feedback is lost, so V- rises to 0.5V (virtual ground fails)."
      }
    },
    practiceQuestions: [
      {
        id: "q-4-1",
        type: "mcq",
        source: "3 OpAmpIntro.pdf (Exercise 2.1)",
        title: "Minimum Pin Count for Single and Quad Op-Amps",
        prompt: "From Sedra & Smith Chapter 2: What is the minimum number of physical pins required on an integrated-circuit package for a single op-amp? And what is the minimum required for a quad op-amp package?",
        options: [
          "5 pins for single; 14 pins for quad op-amp.",
          "3 pins for single; 12 pins for quad op-amp.",
          "8 pins for single; 16 pins for quad op-amp.",
          "4 pins for single; 8 pins for quad op-amp."
        ],
        correctIndex: 0,
        explanation: "A single op-amp requires 2 input pins ($V^+, V^-$), 1 output pin ($V_{out}$), and 2 power supply pins ($V_{CC}, -V_{EE}$), giving $2 + 1 + 2 = 5$ pins. A quad package contains 4 op-amps ($4 \\times 3 = 12$ signal pins) which share common power supply pins ($V_{CC}$ and $-V_{EE}$), giving $12 + 2 = 14$ pins."
      },
      {
        id: "q-4-2",
        type: "mcq",
        source: "Gittaly Op-Amp Question 1",
        title: "Microphone Amplifier High-Pitch Gain Droop",
        prompt: "A student designs a non-inverting amplifier with gain = 20x to amplify a microphone. High-pitched sounds are amplified significantly less than low-pitched ones. What op-amp characteristic explains this, and what happens if they try to fix it by increasing gain further?",
        options: [
          "Finite Gain-Bandwidth Product (GBWP). Increasing gain reduces the cutoff frequency further, making high frequencies drop off even earlier.",
          "Slew rate saturation. Increasing gain increases the maximum slew rate.",
          "Input offset voltage. Increasing gain eliminates the offset.",
          "Common Mode Rejection Ratio. Increasing gain converts the microphone into an inverting amplifier."
        ],
        correctIndex: 0,
        explanation: "Op-amps have a constant Gain-Bandwidth Product: $A_{CL} \\times f_c = \\text{GBWP}$. If you increase the gain from 20x to 40x, the cutoff frequency is cut in half ($f_c = \\frac{\\text{GBWP}}{40}$), which exacerbates the high-frequency droop instead of fixing it."
      },
      {
        id: "q-4-3",
        type: "mcq",
        source: "Gittaly Op-Amp Question 4",
        title: "The Virtual Short vs Physical Short Fallacy",
        prompt: "A student claims: 'Since $V^+ = V^-$ in our op-amp circuit, the two input terminals must be physically connected inside the chip.' Is this statement correct?",
        options: [
          "No. The terminals are electrically isolated with infinite input impedance. The potential tracking is enforced dynamically by active negative feedback.",
          "Yes. An internal CMOS transmission gate shorts the pins together whenever power is applied.",
          "Yes, but only in the inverting configuration where terminal 2 is tied to ground.",
          "No, because $V^+$ is always at least 0.7V higher than $V^-$ due to the base-emitter diode."
        ],
        correctIndex: 0,
        explanation: "As explained in Gittaly Lecture 4 and Sedra/Smith: It is called a 'virtual short' precisely because no physical connection exists. An ideal op-amp draws zero current ($I^+ = I^- = 0$). The output voltage actively adjusts via negative feedback until the difference $V^+ - V^- = V_{out}/A \\to 0$."
      },
      {
        id: "q-4-4",
        type: "nat",
        source: "3 OpAmpIntro.pdf (Eq. 2.5)",
        title: "Closed-Loop Gain with Finite Open-Loop Gain",
        prompt: "An inverting amplifier has $R_1 = 1\\text{ k}\\Omega$ and $R_2 = 10\\text{ k}\\Omega$. If the op-amp open-loop gain is finite with $A = 100\\text{ V/V}$, calculate the magnitude of the actual closed-loop gain $|G|$ (expressed as a positive number rounded to 2 decimal places).",
        unit: "V/V",
        correctAnswer: 9.01,
        toleranceRange: [8.95, 9.05],
        explanation: "From Sedra & Smith Eq. 2.5: $G = \\frac{-R_2/R_1}{1 + (1 + R_2/R_1)/A}$. Here $R_2/R_1 = 10$, and $A = 100$. Thus $G = \\frac{-10}{1 + (1 + 10)/100} = \\frac{-10}{1 + 0.11} = \\frac{-10}{1.11} = -9.009\\text{ V/V}$. Magnitude $|G| \\approx 9.01$."
      },
      {
        id: "q-4-5",
        type: "msq",
        source: "Gittaly Op-Amp Question 3 & 5",
        title: "When Does the Virtual Short Condition Fail?",
        prompt: "Under which of the following operational conditions does the virtual short condition ($V^+ \\approx V^-$) FAIL to hold in an op-amp circuit? Select all that apply:",
        options: [
          "When the op-amp output saturates against the power supply rails ($V_{CC}$ or $V_{EE}$).",
          "When the op-amp is configured as an open-loop comparator with no negative feedback path.",
          "When positive feedback is applied instead of negative feedback (e.g. Schmitt trigger).",
          "When the input signal amplitude is well within the linear operating range under negative feedback."
        ],
        correctIndices: [0, 1, 2],
        explanation: "The virtual short relies entirely on negative feedback remaining in its active linear region. If the output hits the power rail, if the feedback loop is missing (comparator), or if positive feedback is applied, the loop cannot drive $V^+ - V^- \\to 0$, causing the virtual short to fail."
      }
    ],
    vault: {
      formulas: [
        { name: "Inverting Gain (Ideal)", tex: "G = -\\frac{R_2}{R_1}" },
        { name: "Inverting Gain (Finite A)", tex: "G = \\frac{-R_2/R_1}{1 + \\frac{1 + R_2/R_1}{A}}" },
        { name: "Non-Inverting Gain", tex: "G = 1 + \\frac{R_2}{R_1}" },
        { name: "Gain-Bandwidth Product", tex: "A_{CL} \\cdot f_c = \\text{GBWP} \\implies f_c = \\frac{\\text{GBWP}}{|A_{CL}|}" },
        { name: "Differential Output", tex: "V_{out} = A (V^+ - V^-)" }
      ],
      pitfalls: [
        {
          title: "Assuming Op-Amp Power Comes from Inputs",
          desc: "Current delivered to the load resistor comes from the power supply pins (V_CC/V_EE), NOT from the input signal source."
        },
        {
          title: "Ignoring Rail Saturation",
          desc: "An op-amp supplied with ±12V cannot output 15V. If the theoretical gain predicts 15V, the actual output clips flat at ~11.5V (or 12V rail-to-rail)."
        },
        {
          title: "Leaving Unused Op-Amps Floating",
          desc: "In quad packages, leaving unused op-amp inputs floating causes high-frequency oscillations and excessive thermal dissipation. Always wire unused units as followers tied to ground."
        }
      ]
    }
  },
  {
    id: "unit-5-motors",
    unitNumber: 5,
    title: "Actuators, Motors, Gears & Energy-Power Mechanics",
    examMilestone: "Test 2",
    estHours: 8,
    badge: "Mechanics Core",
    icon: "Cog",
    coreInvariants: [
      "Power Conservation Invariant: Mechanical power equals torque times angular velocity: P = τ × ω. With 100% efficiency, P_electrical = P_mechanical.",
      "Transmission Torque-Speed Tradeoff: A gearbox reduces speed by ratio N while amplifying torque by N: ω_out = ω_in / N, τ_out = τ_in × N.",
      "Tractive Power Force Relation: Mechanical tractive power equals force times linear velocity: P = F × v."
    ],
    commonPitfalls: [
      "Believing a gearbox creates 'free power'. A gearbox conserves power (minus frictional heat); as torque increases, rotational speed must decrease proportionally.",
      "Confusing a food Calorie (1 Cal = 1 kcal = 4184 Joules) with a physics gram-calorie (~4.184 Joules).",
      "Assuming an ideal motor can supply infinite torque in physical hardware without breaking gear teeth or stalling."
    ],
    story: {
      summary: "Understand the muscle of mechatronics: DC motors, transmissions, power budgeting, and thermodynamics. Based directly on Tutorial 5, Tutorial 6, and Lecture Quizzes 9 & 10.",
      sections: [
        {
          heading: "1. Ideal Motors and Conservation of Energy (Quiz 10)",
          text: "What does conservation of energy state about an electric motor? In an **ideal motor**, there are zero thermal, winding resistance, or frictional losses. Therefore:\n$$P_{electrical, in} = P_{mechanical, out} \\implies V \\cdot I = \\tau \\cdot \\omega$$\nWhere:\n- $V$ is terminal voltage (Volts), $I$ is current (Amperes).\n- $\\tau$ is shaft torque (Newton-meters, $\\text{N}\\cdot\\text{m}$).\n- $\\omega$ is angular velocity in radians per second ($\\text{rad/s}$, where $\\omega = \\text{RPM} \\times \\frac{2\\pi}{60}$).\n- Output torque is: $\\tau = \\frac{P}{\\omega}$."
        },
        {
          heading: "2. The Transmission Tradeoff: Infinite Torque? (Tutorial 6 Q1 & Q2)",
          text: "Suppose you feed an electric motor $10\\text{ Watts}$ of electrical power. You are free to attach any gearbox you wish.\n- **What is the most torque you can get?** Mathematically, $\\tau = \\frac{P}{\\omega}$. As the gear reduction ratio $N \\to \\infty$, the output speed $\\omega \\to 0$, so theoretical torque approaches **infinity**! In the physical world, torque is bounded by the shear yield strength of the gear teeth and output shaft.\n- **Torque at 10 RPM**: If the gearbox output spins at $10\\text{ RPM}$:\n$$\\omega = 10 \\times \\frac{2\\pi}{60} = \\frac{\\pi}{3} \\approx 1.0472\\text{ rad/s}$$\n$$\\tau = \\frac{P}{\\omega} = \\frac{10\\text{ W}}{1.0472\\text{ rad/s}} = 9.549\\text{ N}\\cdot\\text{m} \\approx 9.55\\text{ N}\\cdot\\text{m}$$"
        },
        {
          heading: "3. Vehicle Dynamics from Power Constraints (Tutorial 6 Q3)",
          text: "A toy car weighing $1\\text{ kgf}$ (mass $m = 1\\text{ kg}$) is traveling at $v = 1\\text{ m/s}$. Using this $10\\text{ W}$ motor to drive the car, what acceleration can you achieve?\nMechanical power is tractive force times velocity: $P = F \\cdot v \\implies F = \\frac{P}{v}$.\nAt $v = 1\\text{ m/s}$, the available driving force is:\n$$F = \\frac{10\\text{ W}}{1\\text{ m/s}} = 10\\text{ Newtons}$$\nBy Newton's second law ($F = m \\cdot a$):\n$$a = \\frac{F}{m} = \\frac{10\\text{ N}}{1\\text{ kg}} = 10\\text{ m/s}^2$$\n(Notice that as the car accelerates to higher speeds, the available acceleration drops inversely with $v$!)."
        },
        {
          heading: "4. Human Thermodynamics: Boiling Water & Burning Fat (Tutorial 5)",
          text: "Can a human pedaling an exercise bike boil off a pot of water?\n- A person working hard all day produces $\\sim 100\\text{ W}$ of mechanical/electrical power over an $8\\text{ hour}$ workday: $E = 100\\text{ W} \\times (8 \\times 3600\\text{ s}) = 2.88\\text{ MJ} \\approx 688\\text{ kcal}$.\n- To heat water from $25^\\circ\\text{C}$ to $100^\\circ\\text{C}$: $\\Delta Q_{heat} = 75\\text{ cal/g} \\approx 314\\text{ J/g}$.\n- Latent heat of vaporization: $L_v = 540\\text{ cal/g} \\approx 2260\\text{ J/g}$.\n- Total energy to boil off $1\\text{ g}$ of water = $615\\text{ cal/g} \\approx 2573\\text{ J/g}$.\n- Water boiled off: $m_{water} = \\frac{2.88 \\times 10^6\\text{ J}}{2573\\text{ J/g}} \\approx 1119\\text{ g} \\approx 1.1\\text{ kg}$ (about one 1-liter bottle of water!).\n- Human efficiency is $\\sim 25\\%$. Bread has $3\\text{ kcal/g}$. To provide $688 / 0.25 = 2752\\text{ kcal}$, you must eat $\\approx 1\\text{ kg}$ of bread! Fat has $9\\text{ kcal/g}$, so you burn $\\approx 300\\text{ g}$ of fat in 8 hours ($\\approx 40\\text{ g/hour}$)."
        }
      ]
    },
    labSpec: {
      type: "motor",
      title: "Interactive Motor, Gearbox & Power Dynamics Workbench",
      description: "Vary motor input power, gearbox gear ratio N, load torque, and vehicle speed to observe torque-speed curves, tractive acceleration, and battery life.",
      controls: [
        { id: "motorPowerWatts", label: "Motor Power (Watts)", min: 1, max: 100, step: 1, default: 10, unit: "W" },
        { id: "outputRpm", label: "Gearbox Output Speed", min: 1, max: 500, step: 1, default: 10, unit: "RPM" },
        { id: "vehicleSpeedMs", label: "Vehicle Velocity", min: 0.2, max: 10, step: 0.2, default: 1.0, unit: "m/s" },
        { id: "vehicleMassKg", label: "Vehicle Mass", min: 0.5, max: 10, step: 0.5, default: 1.0, unit: "kg" }
      ],
      quickQuest: {
        prompt: "From Tutorial 6: Set motor power to 10W and gearbox output speed to 10 RPM. Observe how output torque reaches exactly 9.55 N·m!",
        loadParams: { motorPowerWatts: 10, outputRpm: 10, vehicleSpeedMs: 1.0, vehicleMassKg: 1.0 },
        expectedSummary: "Omega = 1.047 rad/s. Torque = 10W / 1.047 rad/s = 9.55 N·m. Vehicle acceleration at 1 m/s = 10 m/s²."
      }
    },
    practiceQuestions: [
      {
        id: "q-5-1",
        type: "nat",
        source: "Tutorial 6 Question 2",
        title: "Output Torque from 10W Motor at 10 RPM",
        prompt: "An electric motor delivers $10\\text{ W}$ of mechanical power into an ideal gearbox. The output shaft spins at $10\\text{ RPM}$ (revolutions per minute). Calculate the torque available at the output shaft in Newton-meters ($\\text{N}\\cdot\\text{m}$).",
        unit: "N·m",
        correctAnswer: 9.55,
        toleranceRange: [9.45, 9.65],
        explanation: "First convert RPM to angular velocity: $\\omega = 10 \\times \\frac{2\\pi}{60} = \\frac{\\pi}{3} \\approx 1.0472\\text{ rad/s}$. Then torque $\\tau = \\frac{P}{\\omega} = \\frac{10\\text{ W}}{1.0472\\text{ rad/s}} = 9.549\\text{ N}\\cdot\\text{m} \\approx 9.55\\text{ N}\\cdot\\text{m}$."
      },
      {
        id: "q-5-2",
        type: "nat",
        source: "Tutorial 6 Question 3",
        title: "Vehicle Acceleration Under Power Constraint",
        prompt: "A toy robot car with mass $m = 1\\text{ kg}$ is moving at a velocity of $v = 1\\text{ m/s}$. The wheels are driven by an electric motor delivering $10\\text{ W}$ of tractive power. Assuming zero slip and negligible friction, calculate the instantaneous acceleration $a$ in $\\text{m/s}^2$.",
        unit: "m/s²",
        correctAnswer: 10,
        toleranceRange: [9.9, 10.1],
        explanation: "Power is force times velocity: $P = F \\cdot v \\implies F = \\frac{P}{v} = \\frac{10\\text{ W}}{1\\text{ m/s}} = 10\\text{ N}$. By Newton's second law: $a = \\frac{F}{m} = \\frac{10\\text{ N}}{1\\text{ kg}} = 10\\text{ m/s}^2$."
      },
      {
        id: "q-5-3",
        type: "mcq",
        source: "Tutorial 6 Question 1",
        title: "Maximum Possible Torque with Arbitrary Gearbox",
        prompt: "An electric motor is supplied with $10\\text{ W}$ of power. You are permitted to attach any gearbox you wish. What is the theoretical maximum torque you can obtain from this system?",
        options: [
          "Mathematically unbounded (infinite), as the output angular velocity approaches zero (limited in practice by material shear strength).",
          "Exactly 10 N·m, because power is 10 Watts.",
          "It is bounded strictly by the motor's stall current and cannot exceed 1.5 N·m regardless of gearbox ratio.",
          "Zero, because gearboxes always dissipate 100% of power as heat at low speeds."
        ],
        correctIndex: 0,
        explanation: "Since $P = \\tau \\cdot \\omega \\implies \\tau = \\frac{P}{\\omega}$. With an arbitrary gear reduction $N \\to \\infty$, the output speed $\\omega \\to 0$, so $\\tau \\to \\infty$. In physical reality, torque is limited by the shear yield strength of the gear teeth, bearings, and output shaft."
      },
      {
        id: "q-5-4",
        type: "nat",
        source: "Tutorial 5 Question 1 & 3",
        title: "Fat Burned in 8 Hours of Hard Exercise",
        prompt: "From Tutorial 5: A human exercises hard for 8 hours producing $100\\text{ W}$ of mechanical work. Accounting for human metabolic efficiency (~$25\\%$) and the energy density of fat (~$9\\text{ kcal/g}$), calculate the mass of body fat burned in grams.",
        unit: "g",
        correctAnswer: 300,
        toleranceRange: [280, 320],
        explanation: "Mechanical energy produced: $E_{work} = 100\\text{ W} \\times (8 \\times 3600\\text{ s}) = 2.88\\text{ MJ} = \\frac{2.88 \\times 10^6}{4184} \\approx 688\\text{ kcal}$. Food calories burned = $\\frac{688}{0.25} \\approx 2753\\text{ kcal}$. Fat burned = $\\frac{2753\\text{ kcal}}{9\\text{ kcal/g}} \\approx 306\\text{ g} \\approx 300\\text{ g}$."
      },
      {
        id: "q-5-5",
        type: "msq",
        source: "Lecture Quiz 9 & Motors Table",
        title: "Ideal vs Real Components in Mechatronics",
        prompt: "In the course comparison table (Lecture Quiz 9), which of the following correctly distinguish an 'Ideal' model from a 'Real' physical component?",
        options: [
          "Wire: Ideal wire has resistance R = 0 (V = 0 across it); Real wire has small series resistance R where V = IR.",
          "Battery: Ideal battery has terminal voltage V = V_b constant; Real battery has internal Thevenin resistance r_b causing voltage to sag under load (V = V_b - I r_b).",
          "DC Motor: Ideal motor converts 100% of electrical power to mechanical work (VI = τω); Real motor has armature resistance R_a, back-EMF, and internal friction.",
          "Ideal motors draw zero current when stalled under infinite load."
        ],
        correctIndices: [0, 1, 2],
        explanation: "Statements A, B, and C are directly from Lecture Quiz 9. Statement D is completely false: a stalled DC motor draws maximum current ($I_{stall} = V / R_a$) because back-EMF is zero!"
      }
    ],
    vault: {
      formulas: [
        { name: "Rotational Power", tex: "P = \\tau \\cdot \\omega \\quad [\\text{Watts} = \\text{N}\\cdot\\text{m} \\cdot \\text{rad/s}]" },
        { name: "Angular Velocity from RPM", tex: "\\omega = \\text{RPM} \\times \\frac{2\\pi}{60} = \\frac{\\pi \\cdot \\text{RPM}}{30} \\quad [\\text{rad/s}]" },
        { name: "Tractive Power & Acceleration", tex: "P = F \\cdot v = (m \\cdot a) \\cdot v \\implies a = \\frac{P}{m \\cdot v}" },
        { name: "DC Motor Equilibrium", tex: "V = I R_a + k_e \\omega, \\quad \\tau = k_t I - \\tau_{friction}" },
        { name: "Water Vaporization Energy", tex: "Q = m \\cdot (c_p \\Delta T + L_v) \\approx m \\cdot (75 + 540) \\cdot 4.184\\text{ J/g}" }
      ],
      pitfalls: [
        {
          title: "The Zero-Speed Power Fallacy",
          desc: "At stall speed (v = 0 or ω = 0), mechanical power output is ZERO, yet electrical power dissipation (I² Ra) is at its absolute maximum!"
        },
        {
          title: "Gearbox Back-Drivability",
          desc: "High reduction gearboxes (especially worm drives) cannot be back-driven by external forces. Trying to force robot wheels to turn by hand can strip the internal nylon gears."
        },
        {
          title: "Calorie vs calorie Confusion",
          desc: "1 nutritional food Calorie (capital C) equals 1000 thermodynamic physics calories (1 kcal = 4184 Joules)."
        }
      ]
    }
  },
  {
    id: "unit-6-loadcells",
    unitNumber: 6,
    title: "Load Cells, Strain Gauges, Encoders & Advanced Mechatronics",
    examMilestone: "Test 2",
    estHours: 7,
    badge: "Transducers",
    icon: "Scale",
    coreInvariants: [
      "Wheatstone Bridge Piezoresistive Law: Differential output voltage is directly proportional to strain: ΔV = V_excitation × (Gauge Factor × ε) / 4.",
      "Quadrature Phase Offset: Channel A and Channel B of an incremental encoder are shifted by exactly 90° (π/2 rad), enabling direction decoding via state transition order.",
      "HX711 24-Bit Quantization: Provides 16,777,216 counts, resolving microvolt-level bridge strain signals without external instrumentation amplifiers."
    ],
    commonPitfalls: [
      "Failing to tare (zero) the load cell before taking differential weight measurements.",
      "Missing edge transitions in quadrature encoders by polling pins in a slow software loop instead of using hardware interrupts.",
      "Applying shear or torsional force to a single-point bending beam load cell, which permanently bends the metal spring element."
    ],
    story: {
      summary: "Explore precision force and position measurement: strain gauge load cells with HX711 24-bit ADCs and optical/magnetic quadrature encoders, as executed in Labs 6-7.",
      sections: [
        {
          heading: "1. Piezoresistive Strain Gauges & The Wheatstone Bridge",
          text: "When a metal foil grid is stretched mechanically, its length increases and cross-sectional area decreases, increasing its electrical resistance: $\\frac{\\Delta R}{R} = GF \\cdot \\epsilon$, where $GF \\approx 2.0$ is the **Gauge Factor** and $\\epsilon = \\Delta L / L$ is microstrain.\n\nBecause resistance changes are minute (fractions of an Ohm), four strain gauges are arranged in a **full-bridge Wheatstone circuit**. When force is applied, tension gauges increase in resistance while compression gauges decrease, creating a differential signal:\n$$\\Delta V = V_{excitation} \\cdot \\frac{\\Delta R}{R}$$"
        },
        {
          heading: "2. The HX711 24-Bit ADC Interface (Labs 6 & 7)",
          text: "A load cell rated at $1\\text{ mV/V}$ excited by $5\\text{ V}$ produces a full-scale output of only $5\\text{ mV}$! A standard 12-bit microcontroller ADC cannot resolve this. The **HX711** integrates an ultra-low noise programmable gain amplifier ($128\\times$) and a 24-bit Sigma-Delta ADC ($2^{24} = 16,777,216$ counts), resolving fractions of a gram reliably.\n\nCalibration requires:\n1. **Tare**: Recording the raw baseline count with zero load.\n2. **Calibration Factor**: Placing a known precision weight ($W_{cal}$) and computing: $\\text{Scale} = \\frac{\\text{Raw} - \\text{Tare}}{W_{cal}}$."
        },
        {
          heading: "3. Quadrature Encoders for Angle & Speed Measurement",
          text: "To control mobile robot odometry and motor speed, we mount incremental encoders. Two optical interrupters or Hall-effect sensors read a rotating code wheel, producing two square waves, **Channel A** and **Channel B**, in **quadrature** ($90^\\circ$ phase offset):\n- If Channel A leads Channel B: Motor is spinning **Forward** (Clockwise).\n- If Channel B leads Channel A: Motor is spinning **Reverse** (Counter-Clockwise).\n- By counting all rising and falling edges of both channels (**4x decoding**), resolution is quadrupled!"
        }
      ]
    },
    labSpec: {
      type: "loadcell",
      title: "Interactive Load Cell & Quadrature Encoder Sandbox",
      description: "Apply known weights, calibrate the HX711 24-bit scale, inspect raw count linearity, and step through quadrature encoder state transitions.",
      controls: [
        { id: "appliedWeightGrams", label: "Applied Weight", min: 0, max: 5000, step: 10, default: 500, unit: "g" },
        { id: "tareOffset", label: "Tare Raw Offset", min: 0, max: 200000, step: 1000, default: 85000, unit: "counts" },
        { id: "calFactor", label: "Calibration Factor", min: 100, max: 1000, step: 10, default: 420, unit: "counts/g" }
      ],
      quickQuest: {
        prompt: "From Labs 6-7: Apply a 1000g weight with Tare=85000 and CalFactor=420. Verify that raw counts reach 505000 and calibrated weight reads exactly 1000.0 g.",
        loadParams: { appliedWeightGrams: 1000, tareOffset: 85000, calFactor: 420 },
        expectedSummary: "Raw counts = 85000 + (1000 * 420) = 505000 counts. Net weight = (505000 - 85000) / 420 = 1000.0 g."
      }
    },
    practiceQuestions: [
      {
        id: "q-6-1",
        type: "nat",
        source: "Labs 6 & 7 (Measurement)",
        title: "HX711 Calibration Factor & Net Weight",
        prompt: "A digital scale using an HX711 records a raw zero-load tare reading of $120,000$ counts. When a known $500\\text{ g}$ calibration weight is placed on the scale, the reading becomes $330,000$ counts. Later, an unknown object produces a reading of $540,000$ counts. What is the weight of the unknown object in grams?",
        unit: "g",
        correctAnswer: 1000,
        toleranceRange: [998, 1002],
        explanation: "Calibration factor: $k = \\frac{330000 - 120000}{500\\text{ g}} = \\frac{210000}{500} = 420\\text{ counts/g}$. For the unknown object: $\\text{Weight} = \\frac{540000 - 120000}{420} = \\frac{420000}{420} = 1000\\text{ g}$."
      },
      {
        id: "q-6-2",
        type: "mcq",
        source: "Course Outline & Encoder Principles",
        title: "Quadrature Encoder Direction Decoding",
        prompt: "Why are the two signal channels (A and B) of a rotary encoder placed in quadrature (90° electrical phase offset)?",
        options: [
          "To allow the microcontroller to determine the direction of rotation (clockwise vs counter-clockwise) by detecting which channel transitions first.",
          "To double the maximum operating voltage of the motor driver.",
          "To eliminate the need for common ground between encoder and microcontroller.",
          "Because single-channel encoders cannot measure speed above 10 RPM."
        ],
        correctIndex: 0,
        explanation: "By having Channel A and Channel B $90^\\circ$ out of phase, one channel leads the other depending on direction. For example, during clockwise rotation, Channel A goes high before Channel B; during counter-clockwise rotation, Channel B goes high first. This phase relationship allows direction and position to be unambiguously determined."
      },
      {
        id: "q-6-3",
        type: "msq",
        source: "Labs 6-7 & Strain Gauge Physics",
        title: "Advantages of Full-Bridge Strain Gauge Configuration",
        prompt: "Why is a 4-gauge Full-Bridge circuit preferred over a single strain gauge (Quarter-Bridge) for precision weighing scales? Select all valid engineering reasons:",
        options: [
          "It provides four times the output voltage sensitivity compared to a quarter bridge ($4\\times$ higher signal).",
          "It provides automatic thermal temperature compensation, because thermal expansion affects opposing arms equally and cancels out.",
          "It cancels unwanted bending moments or axial loads when measuring pure deflection.",
          "It allows the load cell to operate without any power supply excitation."
        ],
        correctIndices: [0, 1, 2],
        explanation: "A full Wheatstone bridge doubles the tension and compression arms, quadrupling differential sensitivity and canceling common-mode temperature drifts. It does require external voltage excitation ($V_E$)."
      }
    ],
    vault: {
      formulas: [
        { name: "Strain Gauge Resistance Change", tex: "\\frac{\\Delta R}{R} = GF \\cdot \\epsilon" },
        { name: "Full-Bridge Output Voltage", tex: "V_o = V_{excitation} \\cdot GF \\cdot \\epsilon" },
        { name: "Calibrated Weight", tex: "W = \\frac{\\text{Raw Counts} - \\text{Tare}}{\\text{Calibration Factor}}" },
        { name: "Quadrature Resolution", tex: "\\text{Counts Per Revolution (4x)} = 4 \\times \\text{PPR}" }
      ],
      pitfalls: [
        {
          title: "Creep and Hysteresis",
          desc: "Metal load cell beams exhibit slight elastic creep under sustained heavy loads. Calibrate using weights applied for a standard settling time."
        },
        {
          title: "Missing Interrupts Under Load",
          desc: "At high RPM, encoder pulse frequencies exceed 10 kHz. Reading encoder pins in a software loop causes missed ticks and severe odometry drift. Use hardware PIO or pin interrupts."
        }
      ]
    }
  },
  {
    id: "unit-7-vision",
    unitNumber: 7,
    title: "Robotic Vision: Pinhole Camera Models & Sensing",
    examMilestone: "Final Exam",
    estHours: 6,
    badge: "Robotics Core",
    icon: "Camera",
    coreInvariants: [
      "Perspective Projection: 3D coordinates (X, Y, Z) map to 2D image coordinates via division by depth Z: u = fx (X/Z) + cx, v = fy (Y/Z) + cy.",
      "Camera Calibration Matrix K: Encapsulates intrinsic geometry: focal lengths (fx, fy), principal point offset (cx, cy), and skew (s ≈ 0).",
      "Scale Ambiguity: A single monocular camera cannot determine metric depth Z without an external scale prior or stereo baseline."
    ],
    commonPitfalls: [
      "Assuming a larger object in pixel space is necessarily larger in 3D (it could simply be closer to the camera).",
      "Neglecting radial lens distortion at the edges of wide-angle camera images.",
      "Treating camera projection as an invertible linear matrix without knowing depth Z."
    ],
    story: {
      summary: "Understand the mathematical bridge between the 3D continuous world and 2D pixel grids. Based on Stanford CS231A camera models and Dudek & Jenkin, we unpack the pinhole model, intrinsic matrices, and perspective projection.",
      sections: [
        {
          heading: "1. The Pinhole Camera Geometry",
          text: "Consider a 3D point in front of a camera: $\\mathbf{P} = [X, Y, Z]^T$, where $Z > 0$ is optical depth. In an ideal pinhole camera, light rays pass through a single focal point (pinhole) and intersect the image plane at focal distance $f$.\n\nBy similar triangles:\n$$x_{sensor} = f \\frac{X}{Z}, \\quad y_{sensor} = f \\frac{Y}{Z}$$\nNotice the crucial operation: **perspective division by depth $Z$**. Objects further away appear proportionally smaller on the image plane."
        },
        {
          heading: "2. The Intrinsic Camera Matrix K",
          text: "To convert physical sensor coordinates (in millimeters) into discrete digital pixel coordinates $(u, v)$:\n- Pixel focal lengths: $f_x = f \\cdot k_u$ and $f_y = f \\cdot k_v$ (pixels/meter).\n- Principal point $(c_x, c_y)$: The pixel coordinates where the optical axis pierces the sensor (typically image center).\n\nIn homogeneous coordinates:\n$$\\lambda \\begin{bmatrix} u \\\\ v \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} f_x & 0 & c_x \\\\ 0 & f_y & c_y \\\\ 0 & 0 & 1 \\end{bmatrix} \\begin{bmatrix} X \\\\ Y \\\\ Z \\end{bmatrix} = \\mathbf{K} \\mathbf{P}_{cam}$$\nWhere $\\lambda = Z$ is depth scale factor."
        },
        {
          heading: "3. Monocular Depth Ambiguity",
          text: "Because perspective projection maps 3D lines through the pinhole onto a single 2D pixel, any point along the ray $\\alpha [X, Y, Z]^T$ produces the exact same pixel $(u, v)$! A toy car up close casts the exact same image silhouette as a real truck far away. Mobile robots resolve this using stereo vision, depth sensors (sonar/LiDAR), or Structure from Motion (SfM)."
        }
      ]
    },
    labSpec: {
      type: "vision",
      title: "Interactive Pinhole Camera & 3D Projection Simulator",
      description: "Move a 3D target along X, Y, Z axes, adjust camera focal length and principal offsets, and watch the 2D projected pixel location update in real time.",
      controls: [
        { id: "x3D", label: "3D Target X", min: -2, max: 2, step: 0.1, default: 0.5, unit: "m" },
        { id: "y3D", label: "3D Target Y", min: -2, max: 2, step: 0.1, default: 0.3, unit: "m" },
        { id: "z3D", label: "3D Target Depth Z", min: 0.5, max: 10, step: 0.2, default: 2.0, unit: "m" },
        { id: "fx", label: "Focal Length fx", min: 200, max: 1000, step: 20, default: 500, unit: "px" }
      ],
      quickQuest: {
        prompt: "From Stanford CS231A: Set X=0.5m, Y=0.3m, Z=2.0m with fx=fy=500 and cx=320, cy=240. Calculate the pixel coordinate (u, v).",
        loadParams: { x3D: 0.5, y3D: 0.3, z3D: 2.0, fx: 500 },
        expectedSummary: "u = 500 * (0.5 / 2.0) + 320 = 125 + 320 = 445 px. v = 500 * (0.3 / 2.0) + 240 = 75 + 240 = 315 px."
      }
    },
    practiceQuestions: [
      {
        id: "q-7-1",
        type: "nat",
        source: "Course Outline & Stanford CS231A Camera Model",
        title: "Pinhole Camera Pixel Projection Calculation",
        prompt: "A robot's camera has focal length $f_x = 600\\text{ px}$ and principal point offset $c_x = 320\\text{ px}$. A landmark is detected at 3D camera coordinates $X = 1.2\\text{ m}$ and depth $Z = 3.0\\text{ m}$. Calculate the horizontal pixel coordinate $u$ in the image.",
        unit: "px",
        correctAnswer: 560,
        toleranceRange: [558, 562],
        explanation: "By perspective projection: $u = f_x \\frac{X}{Z} + c_x = 600 \\cdot \\frac{1.2}{3.0} + 320 = 600 \\cdot 0.4 + 320 = 240 + 320 = 560\\text{ px}$."
      },
      {
        id: "q-7-2",
        type: "mcq",
        source: "Robotics Sensing Curriculum",
        title: "Monocular Vision Scale Ambiguity",
        prompt: "Why can a mobile robot not determine the absolute metric distance of an unknown object using only a single standard 2D camera image?",
        options: [
          "Because perspective projection divides by depth Z; multiplying 3D coordinates by any scalar factor k yields the exact same 2D pixel coordinates.",
          "Because CMOS sensors only capture light in the visible spectrum and cannot detect infrared.",
          "Because RGB Bayer filters remove high-frequency spatial depth components.",
          "Because camera focal length dynamically changes with distance."
        ],
        correctIndex: 0,
        explanation: "Perspective projection is a many-to-one mapping: every point along the line of sight $\\mathbf{P}' = k \\mathbf{P}$ maps to the exact same image coordinate $\\frac{kX}{kZ} = \\frac{X}{Z}$. Without a known object size or multi-camera baseline, depth is ambiguous."
      }
    ],
    vault: {
      formulas: [
        { name: "Perspective Projection", tex: "u = f_x \\frac{X}{Z} + c_x, \\quad v = f_y \\frac{Y}{Z} + c_y" },
        { name: "Camera Intrinsic Matrix", tex: "\\mathbf{K} = \\begin{bmatrix} f_x & 0 & c_x \\\\ 0 & f_y & c_y \\\\ 0 & 0 & 1 \\end{bmatrix}" },
        { name: "Full Projection Model", tex: "\\lambda \\begin{bmatrix} u \\\\ v \\\\ 1 \\end{bmatrix} = \\mathbf{K} [\\mathbf{R} \\mid \\mathbf{t}] \\begin{bmatrix} X_w \\\\ Y_w \\\\ Z_w \\\\ 1 \\end{bmatrix}" }
      ],
      pitfalls: [
        {
          title: "Division by Zero at Z = 0",
          desc: "Points lying on or behind the focal plane (Z <= 0) cannot be projected into pixel coordinates."
        },
        {
          title: "Focal Length Units",
          desc: "Never mix focal length in millimeters (f) with focal length in pixel units (fx). fx = f * ku accounts for pixel pitch."
        }
      ]
    }
  },
  {
    id: "unit-8-planning",
    unitNumber: 8,
    title: "Robot Motion: Planning, Mapping & Localization",
    examMilestone: "Final Exam & Project",
    estHours: 10,
    badge: "Algorithms Core",
    icon: "MapPin",
    coreInvariants: [
      "A* Optimality Condition: A* search is guaranteed to find the strictly optimal path if the heuristic h(n) is admissible (never overestimates true cost) and consistent.",
      "Bayesian Log-Odds Occupancy Update: Posterior log-odds of a grid cell is the simple linear sum of prior log-odds and inverse sensor model: l_t(m_i) = l_{t-1}(m_i) + inv_sensor(m_i, z_t) - l_0.",
      "Differential Drive Odometry: Robot pose (x, y, θ) updates from wheel displacements: Δs = (Δs_R + Δs_L) / 2 and Δθ = (Δs_R - Δs_L) / L."
    ],
    commonPitfalls: [
      "Using Dijkstra or A* directly on a physical robot point without inflating obstacles by the robot's physical collision radius (Configuration Space C-space).",
      "Relying solely on dead reckoning (wheel odometry) for long navigation runs; integration of wheel slip causes unbounded position drift.",
      "Using non-admissible heuristics in A*, which sacrifices path optimality."
    ],
    story: {
      summary: "Explore the algorithmic core of autonomous mobile robotics: Search-based path planning (A*, Dijkstra), Bayesian Occupancy Grid Mapping, and Dead Reckoning Odometry. From Choset et al. and Dudek & Jenkin.",
      sections: [
        {
          heading: "1. Search-Based Path Planning: A* & Dijkstra",
          text: "How does a robot navigate from start to goal without hitting obstacles? We discretize space into a graph or grid.\n- **Dijkstra's Algorithm**: Explores outward uniformly in order of actual path cost $g(n)$ from start. Guaranteed to find the shortest path, but wastes computation exploring away from the goal.\n- **A* Algorithm**: Guides search using a heuristic estimate $h(n)$ of remaining cost to goal:\n$$f(n) = g(n) + h(n)$$\nIf $h(n)$ is **admissible** (e.g. Euclidean or Manhattan distance, which never overestimates the true remaining distance), A* is mathematically guaranteed to find the optimal shortest path while examining far fewer nodes than Dijkstra."
        },
        {
          heading: "2. Probabilistic Occupancy Grid Mapping",
          text: "Real robot sensors (ultrasonic, LiDAR) are noisy. A single reading could be a false reflection or missed hit. Rather than maintaining binary 0/1 maps, we maintain a **Probabilistic Occupancy Grid**, where each cell $m_i$ stores the probability of being an obstacle: $p(m_i)$.\n\nTo avoid floating-point underflow and repeated multiplications, we use **Log-Odds**:\n$$l(m_i) = \\log \\left( \\frac{p(m_i)}{1 - p(m_i)} \\right)$$\nWhen a sensor ray detects a hit or free space, the log-odds update is a trivial addition:\n$$l_t(m_i) = l_{t-1}(m_i) + \\text{inv\\_sensor\\_model}(m_i, z_t) - l_0$$\nProbability is recovered via the sigmoid function: $p(m_i) = \\frac{1}{1 + e^{-l_t(m_i)}}$."
        },
        {
          heading: "3. Mobile Robot Odometry & Dead Reckoning",
          text: "A differential drive mobile robot has two independently driven wheels separated by track width $L$. Given wheel radius $R$ and incremental encoder tick counts:\n$$\\Delta s_L = \\frac{2\\pi R \\cdot \\text{ticks}_L}{\\text{TPR}}, \\quad \\Delta s_R = \\frac{2\\pi R \\cdot \\text{ticks}_R}{\\text{TPR}}$$\nRobot center displacement and heading change are:\n$$\\Delta s = \\frac{\\Delta s_R + \\Delta s_L}{2}, \\quad \\Delta \\theta = \\frac{\\Delta s_R - \\Delta s_L}{L}$$\nPose updates by integrating:\n$$x_{t} = x_{t-1} + \\Delta s \\cos\\left(\\theta + \\frac{\\Delta \\theta}{2}\\right), \\quad y_{t} = y_{t-1} + \\Delta s \\sin\\left(\\theta + \\frac{\\Delta \\theta}{2}\\right), \\quad \\theta_t = \\theta_{t-1} + \\Delta \\theta$$\nBecause wheel slip and floor irregularities accumulate monotonically, dead reckoning must be periodically corrected using external landmarks, GPS, or beacon-based Bayes filters."
        }
      ]
    },
    labSpec: {
      type: "robotics",
      title: "Interactive A* Grid Planner & Bayes Mapping Simulator",
      description: "Place obstacles on a 10x10 grid, trigger real-time A* path search, and observe Bayesian log-odds occupancy updates from simulated sensor scans.",
      controls: [
        { id: "gridSize", label: "Grid Dimension", min: 6, max: 12, step: 1, default: 10, unit: "x10" },
        { id: "sensorConfidence", label: "Sensor Hit Confidence", min: 0.6, max: 0.95, step: 0.05, default: 0.8, unit: "P" },
        { id: "wheelRadiusMm", label: "Wheel Radius R", min: 20, max: 50, step: 1, default: 32.5, unit: "mm" },
        { id: "trackWidthMm", label: "Track Width L", min: 100, max: 250, step: 5, default: 150, unit: "mm" }
      ],
      quickQuest: {
        prompt: "From Course Outline: Run A* search on the default 10x10 maze from (0,0) to (9,9). Verify that A* finds the optimal obstacle-free path.",
        loadParams: { gridSize: 10, sensorConfidence: 0.8, wheelRadiusMm: 32.5, trackWidthMm: 150 },
        expectedSummary: "A* computes shortest Manhattan path avoiding obstacles with minimal node expansions."
      }
    },
    practiceQuestions: [
      {
        id: "q-8-1",
        type: "mcq",
        source: "Course Outline & Robot Planning Principles",
        title: "A* Heuristic Admissibility Condition",
        prompt: "What condition must a heuristic function $h(n)$ satisfy to guarantee that the A* algorithm will always return the mathematically optimal (shortest) path?",
        options: [
          "It must be admissible: it must never overestimate the true remaining distance from node n to the goal.",
          "It must equal exactly zero for every node, effectively running Breadth-First Search.",
          "It must overestimate distance by at least 20% to prevent backtracking.",
          "It must be non-monotonic and depend on robot velocity."
        ],
        correctIndex: 0,
        explanation: "An admissible heuristic satisfies $0 \\le h(n) \\le h^*(n)$ for all nodes $n$, where $h^*(n)$ is the true shortest distance to the goal. If $h(n)$ never overestimates, A* is guaranteed to terminate with the optimal path."
      },
      {
        id: "q-8-2",
        type: "nat",
        source: "Robotic Odometry & Differential Drive Kinematics",
        title: "Differential Drive Turn Angle Calculation",
        prompt: "A differential drive mobile robot has track width $L = 0.20\\text{ m}$ (distance between left and right wheels). During a turn, the right wheel moves forward by $\\Delta s_R = 0.40\\text{ m}$ while the left wheel moves forward by $\\Delta s_L = 0.10\\text{ m}$. Calculate the change in robot heading $\\Delta \\theta$ in radians.",
        unit: "rad",
        correctAnswer: 1.5,
        toleranceRange: [1.48, 1.52],
        explanation: "By differential drive kinematics: $\\Delta \\theta = \\frac{\\Delta s_R - \\Delta s_L}{L} = \\frac{0.40\\text{ m} - 0.10\\text{ m}}{0.20\\text{ m}} = \\frac{0.30}{0.20} = 1.50\\text{ radians}$."
      },
      {
        id: "q-8-3",
        type: "msq",
        source: "Probabilistic Robotics & Bayes Mapping",
        title: "Properties of Log-Odds Representation in Occupancy Grids",
        prompt: "Why do mobile robotics mapping systems represent grid cell occupancy in Log-Odds ($l = \\log \\frac{p}{1-p}$) instead of raw probabilities? Select all valid mathematical and computational reasons:",
        options: [
          "Recursive Bayesian measurement updates reduce from multiplication and division of small floats to simple addition and subtraction: $l_t = l_{t-1} + \\text{update}$.",
          "It prevents numerical underflow when multiplying dozens of probabilities near 0 or 1.",
          "Log-odds spans the full range from $-\\infty$ (completely free) to $+\\infty$ (completely occupied), with $0$ representing unobserved 50% prior.",
          "Log-odds eliminates the need to consider sensor noise."
        ],
        correctIndices: [0, 1, 2],
        explanation: "Log-odds transforms Bayes' rule into additive updates, avoids float underflow, and maps $p=0.5 \\implies l=0$. It still relies directly on the probabilistic sensor noise model."
      }
    ],
    vault: {
      formulas: [
        { name: "A* Cost Evaluation", tex: "f(n) = g(n) + h(n), \\quad h(n) \\le h^*(n)" },
        { name: "Bayes Log-Odds Mapping", tex: "l_t(m_i) = l_{t-1}(m_i) + \\log \\left( \\frac{p(m_i \\mid z_t)}{1 - p(m_i \\mid z_t)} \\right) - l_0" },
        { name: "Probability from Log-Odds", tex: "p(m_i) = \\frac{1}{1 + e^{-l(m_i)}}" },
        { name: "Differential Drive Kinematics", tex: "\\Delta s = \\frac{\\Delta s_R + \\Delta s_L}{2}, \\quad \\Delta \\theta = \\frac{\\Delta s_R - \\Delta s_L}{L}" }
      ],
      pitfalls: [
        {
          title: "The Unexpanded C-Space Trap",
          desc: "Treating a physical 20cm-wide robot as a dimensionless mathematical point causes the robot to clip corners and crash into walls."
        },
        {
          title: "Odometry Integration Drift",
          desc: "Heading errors (Δθ) propagate into catastrophic position error: x = ∫ cos(θ) ds. A 2° orientation error causes meters of lateral drift over time."
        }
      ]
    }
  }
];

export const LAB_ACTIVITIES = [
  {
    labNumber: 1,
    title: "Basic Circuit Connections & Resistor Networks",
    source: "Labs.pdf - Lab 1",
    objectives: [
      "Breadboard familiarization and multimeter voltage/current measurements",
      "Series and parallel resistor combinations",
      "Theoretical vs practical equivalent resistance verification"
    ],
    equipment: ["Breadboard", "Digital Multimeter", "Carbon Film Resistors", "9V Battery / DC Power Supply"],
    keyTakeway: "Verify Ohm's law and observe that breadboard rows 1-5 share an internal contact clip."
  },
  {
    labNumber: 2,
    title: "Ohm's Law, LEDs & Potentiometer Brightness Control",
    source: "Labs.pdf - Lab 2",
    objectives: [
      "Understanding LED exponential forward bias and current-limiting resistor requirements",
      "Using a 10kΩ potentiometer as a variable voltage divider to control LED intensity",
      "Multi-LED state sequencer (traffic light controller)"
    ],
    equipment: ["Red/Yellow/Green LEDs", "Current-limiting resistors (100Ω, 220Ω, 330Ω)", "10kΩ Potentiometer", "Breadboard"],
    keyTakeway: "Never connect an LED directly to a power source without a series ballast resistor."
  },
  {
    labNumber: 3,
    title: "Raspberry Pi Pico Board Setup & Embedded GPIO Control",
    source: "Labs.pdf - Lab 3",
    objectives: [
      "Pico board support installation (MicroPython / Arduino C++)",
      "Pico pinout orientation: Safe GPIOs vs dedicated power/clock lines",
      "Blinking onboard GP25 LED and external LED circuits with jumper wires"
    ],
    equipment: ["Raspberry Pi Pico (RP2040)", "Micro-USB cable", "External LEDs", "Breadboard", "Solid core jumper wires"],
    keyTakeway: "Microcontrollers execute code directly in hardware; GP25 is wired internally to the board LED."
  },
  {
    labNumber: 4,
    title: "HC-SR04 Ultrasonic Sonar & Voltage Divider Protection",
    source: "Labs.pdf - Lab 4",
    objectives: [
      "Interfacing HC-SR04 trigger and echo pins with Raspberry Pi Pico",
      "Writing timing code to measure microsecond echo pulse width and compute distance",
      "Constructing a 1kΩ / 2kΩ voltage divider to safely step down the 5V Echo line to 3.3V",
      "Observing transducer ring-down blind zones (< 2.5cm) and dual-sensor crosstalk interference"
    ],
    equipment: ["HC-SR04 Ultrasonic Sensor", "Pico", "1kΩ & 2kΩ Resistors", "Target Obstacles"],
    keyTakeway: "The Pico GPIO is 3.3V maximum; 5V Echo must always be stepped down with a voltage divider."
  },
  {
    labNumber: 5,
    title: "Infrared (IR) Proximity Sensing & Optical Material Properties",
    source: "Labs.pdf - Lab 5",
    objectives: [
      "Wiring an LM393-based IR proximity sensor module to the Pico",
      "Testing detection distances across colored sheets (white vs red vs carbon-black)",
      "Observing specular reflection failure when tilting mirrors at angles > 10°",
      "Tuning the onboard comparator sensitivity potentiometer"
    ],
    equipment: ["IR Proximity Module", "Various colored paper targets", "Mirror", "Pico"],
    keyTakeway: "IR sensors rely on diffuse reflection; specular mirrors angle the beam away from the receiver."
  },
  {
    labNumber: 6,
    title: "Load Cell Force Measurement with HX711 24-Bit ADC",
    source: "Labs.pdf - Labs 6 & 7",
    objectives: [
      "Interfacing a 4-gauge Wheatstone bridge load cell with the HX711 amplifier",
      "Calibrating raw 24-bit counts against known weights (Tare & Scale calculation)",
      "Plotting applied weight vs raw reading to verify linear elastic deformation",
      "Evaluating measurement repeatability and sensitivity"
    ],
    equipment: ["Single-Point Bending Beam Load Cell", "HX711 ADC Module", "Pico", "Known Calibration Weights"],
    keyTakeway: "The 4-arm Wheatstone bridge outputs microvolt differential signals requiring 24-bit instrumentation."
  }
];
