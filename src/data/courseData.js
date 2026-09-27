/**
 * Comprehensive Course Curriculum and Question Bank for Intelligent Machines
 * Faithfully constructed from:
 * - Lecture Quizzes (Quizzes 1 - 10)
 * - Tutorials (Tutorials 1 - 6)
 * - Gittaly Notes & Exercises (Pico, Ultrasonic, IR, Op-Amp questions)
 * - Laboratory Practicals (Labs 1 - 7)
 * - Sedra/Smith Chapter 2 (Operational Amplifiers)
 * - Course Outline
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
    estHours: 7,
    badge: "Hardware Core",
    icon: "Cpu",
    coreInvariants: [
      "Kirchhoff's Current Law (KCL): The algebraic sum of currents entering any circuit node is strictly zero: $\\sum I_{in} = 0$. Charge cannot accumulate at an infinitesimal point.",
      "Thevenin Equivalence: Any linear one-port resistive network can be replaced by an ideal voltage source $V_{th} = V_{open}$ in series with resistance $R_{th} = \\frac{V_{open}}{I_{shunt}}$.",
      "Maximum Power Transfer: A resistive source delivers its absolute maximum electrical power to a load strictly when load resistance equals Thevenin resistance: $R_L = R_{th} \\implies P_{max} = \\frac{V_{th}^2}{4 R_{th}}$."
    ],
    commonPitfalls: [
      "Assuming high output impedance is desirable for a voltage source. A high $R_O$ causes terminal voltage to collapse under current load!",
      "Confusing nodal voltage (potential relative to common circuit ground) with voltage drops across individual branch resistors.",
      "Thinking a pull-up resistor can revive a circuit where the output node is tied directly to ground (Lecture Quiz 6 direct-ground trap).",
      "Inserting both leads of a resistor into the same breadboard row (rows 1–5 share an internal metal spring clip, shorting the component)."
    ],
    story: {
      summary: "Understand circuits not as abstract textbook schematics, but as physical conservation laws. Based on Lecture Quizzes 1–6, 9, Tutorials 1–2, and Lab 1, we master Ohm's law, build Thevenin equivalent models, formulate 6-node circuit equations for computer matrix solution, and analyze ideal vs real physical components.",
      sections: [
        {
          heading: "1. Microscopic Foundations of Charge, Current, Voltage & Power",
          text: "Think of an electrical circuit as a pressurized closed hydraulic loop where energy is transported by charge carriers ($1\\text{ Coulomb} \\approx 6.242 \\times 10^{18}\\text{ electrons}$):\n\n- **Voltage ($V$)**: The electric potential difference (pressure) produced by chemical or electromagnetic work, measured in Volts ($1\\text{ V} = 1\\text{ Joule/Coulomb}$).\n- **Current ($I$)**: The net rate of charge flow through a conductor cross-section ($1\\text{ A} = 1\\text{ Coulomb/second}$).\n- **Resistance ($R$)**: The lattice scattering that impedes electron drift velocity, dissipating kinetic energy as thermal phonon vibrations (heat), measured in Ohms ($\\Omega$).\n\n**Ohm's Law & Joule's Thermal Dissipation:**\n$$V = I \\cdot R \\iff I = \\frac{V}{R} \\iff R = \\frac{V}{I}$$\n$$P = V \\cdot I = I^2 R = \\frac{V^2}{R} \\quad [\\text{Watts = Joules/second}]$$\n\n**Through-Hole Resistors & Breadboard Architecture:**\nStandard carbon film resistors indicate their nominal resistance and manufacturing tolerance using a 4-band color code: **Band 1** (first digit), **Band 2** (second digit), **Band 3** (multiplier $10^n$), and **Band 4** (tolerance: Gold $\\pm 5\\%$, Silver $\\pm 10\\%$). On a solderless breadboard, numbered terminal rows (pins a–e and f–j) share an internal spring clip. Inserting both leads of a resistor into the same row forms a dead short circuit across the resistor!"
        },
        {
          heading: "2. Voltage Dividers, Sensor Potentiometers & The Loading Effect",
          text: "The fundamental building block for analog signal conditioning is the **voltage divider**. Two series resistors $R_1$ and $R_2$ excited by supply voltage $V_{in}$ establish an intermediate node potential:\n$$V_{out} = V_{in} \\cdot \\frac{R_2}{R_1 + R_2}$$\n\n**The Loading Problem (Tutorial 1):**\nWhat happens when we attach a real voltmeter or microcontroller ADC with finite input resistance $R_L$ across $R_2$? The load $R_L$ sits in parallel with $R_2$, reducing the effective bottom resistance to $R_{eq} = R_2 \\parallel R_L = \\frac{R_2 R_L}{R_2 + R_L}$:\n$$V_{loaded} = V_{in} \\cdot \\frac{R_2 \\parallel R_L}{R_1 + (R_2 \\parallel R_L)} < V_{out}$$\n\nAs derived in Tutorial 1, to prevent the measuring instrument from distorting the signal, the meter must exhibit **high input impedance** ($R_L \\gg R_2$), ensuring $R_2 \\parallel R_L \\approx R_2$ and drawing negligible current ($I_{meter} \\approx 0$)."
        },
        {
          heading: "3. Thévenin's Theorem, Load Lines & Maximum Power Transfer",
          text: "Any linear one-port network composed of voltage sources, current sources, and resistors can be replaced at its two output terminals by an equivalent **ideal voltage source $V_{th}$ in series with a resistance $R_{th}$** (Tutorial 1 & Lecture Quiz 3):\n\n1. **Open-Circuit Voltage ($V_{open}$)**: When no load is connected ($I_o = 0$), zero current flows through $R_{th}$, so $V_{terminal} = V_{th} = V_{open}$.\n2. **Short-Circuit Current ($I_{shunt}$)**: When output terminals are shorted together ($V_{terminal} = 0$), all voltage drops across $R_{th}$: $I_{shunt} = \\frac{V_{th}}{R_{th}}$.\n3. **Thévenin Resistance**: $$R_{th} = \\frac{V_{open}}{I_{shunt}}$$\n\n**Tutorial 1 Graphical Analysis: The V-I Load Line & Q-Point Determination:**\nIn Tutorial 1, students plot two distinct lines on the same current-voltage ($I$-$V$) Cartesian coordinate plane:\n- **Source Line ($V_o$ vs $I_o$)**: The terminal characteristic of the Thévenin source is $V_o = V_{th} - I_o R_{th}$.\n  - Vertical axis intercept ($I_o = 0$): $V_o = V_{open} = V_{th}$\n  - Horizontal axis intercept ($V_o = 0$): $I_o = I_{shunt} = I_{sc} = \\frac{V_{th}}{R_{th}}$\n  - Negative slope: $\\frac{dV_o}{dI_o} = -R_{th}$\n- **Load Line ($V_L$ vs $I_L$)**: The characteristic of a connected resistive load resistor $R_L$ is $V_L = I_L R_L$, passing through origin $(0, 0)$ with positive slope $+R_L$.\n- **The Quiescent Operating Point (Q-Point)**: Because the load is wired directly across the source terminals, conservation of charge and energy requires $I_o = I_L = I_Q$ and $V_o = V_L = V_Q$. The intersection of these two lines is the simultaneous physical solution:\n$$I_Q = \\frac{V_{th}}{R_{th} + R_L}, \\quad V_Q = V_{th} \\left(\\frac{R_L}{R_{th} + R_L}\\right)$$\n*Nonlinear Loads (Diodes & LEDs):* When the load is nonlinear (such as a diode with exponential Shockley equation $I = I_S (e^{V/V_T} - 1)$), algebraic equations cannot be solved in closed elementary form. Superimposing the diode curve onto the Thévenin load line immediately yields the exact operating point at the intersection!\n\n**Maximum Power Transfer Theorem:**\nHow much power is transferred to a variable load resistor $R_L$? Power is $P_L = I^2 R_L = \\left(\\frac{V_{th}}{R_{th} + R_L}\\right)^2 R_L$. Differentiating $P_L$ with respect to $R_L$ and setting $\\frac{dP_L}{dR_L} = 0$ yields:\n$$R_L = R_{th} \\implies P_{max} = \\frac{V_{th}^2}{4 R_{th}}$$\nAt maximum power transfer, exactly half the total power is dissipated internally inside the source ($50\\%$ efficiency)."
        },
        {
          heading: "4. The Wheatstone Bridge Differential Topology (Tutorial 2)",
          text: "When measuring minute changes in resistance (e.g. foil strain gauges, thermistors, optical interrupters), single-ended voltage dividers suffer from poor resolution and thermal drift. The **Wheatstone Bridge** (Tutorial 2) solves this by using four resistors arranged in two parallel voltage dividers excited by $V_B$:\n\n- **Leg 1 Potential**: $V_1 = V_B \\frac{R_{1G}}{R_{1B} + R_{1G}}$\n- **Leg 2 Potential**: $V_2 = V_B \\frac{R_{2G}}{R_{2B} + R_{2G}}$\n- **Differential Output**: $V_0 = V_2 - V_1 = V_B \\left( \\frac{R_{2G}}{R_{2B} + R_{2G}} - \\frac{R_{1G}}{R_{1B} + R_{1G}} \\right)$\n\n**The Balance Condition:**\nThe bridge output is zero ($V_0 = 0$) if and only if the ratio of arm resistances matches: $\\frac{R_{1B}}{R_{1G}} = \\frac{R_{2B}}{R_{2G}}$.\n\nThe Thévenin resistance looking into the detector terminals (with $V_B$ replaced by a short circuit) is:\n$$R_{th} = (R_{1B} \\parallel R_{1G}) + (R_{2B} \\parallel R_{2G})$$"
        },
        {
          heading: "5. Matrix Formulation of Multi-Node Circuits (Lecture Quiz 5)",
          text: "When circuits grow beyond simple series-parallel combinations (such as the 6-node bridge circuit in Lecture Quiz 5), manual loop equations become unmanageable. The standard computational technique used in SPICE simulators is **Nodal Analysis**:\n\n1. Select one common node as **Ground reference** ($V_0 = 0\\text{ V}$).\n2. Assign unknown scalar potentials $V_1, V_2, \\dots, V_N$ to all remaining independent nodes.\n3. Write Kirchhoff's Current Law at each node $k$: the sum of all branch currents flowing outward through conductances $G_{kj} = 1 / R_{kj}$ equals the sum of external currents entering the node:\n$$\\sum_{j \\ne k} \\frac{V_k - V_j}{R_{kj}} = I_{k,ext}$$\n\nIn matrix form, this produces the symmetric linear system:\n$$\\mathbf{G} \\mathbf{V} = \\mathbf{I}$$\nWhere $\\mathbf{G} \\in \\mathbb{R}^{N \\times N}$ is the Conductance Matrix. The diagonal element $G_{kk}$ is the sum of all conductances tied directly to node $k$, while off-diagonal elements $G_{kj} = -1/R_{kj}$. Solving $\\mathbf{V} = \\mathbf{G}^{-1} \\mathbf{I}$ via Gaussian elimination evaluates every node voltage across the machine in microseconds."
        },
        {
          heading: "6. Ideal vs Real Components in Mechatronics (Lecture Quiz 9)",
          text: "In theoretical physics, components are dimensionless abstractions. In mechatronic hardware, every component exhibits parasitic physical limitations (compiled directly from Lecture Quiz 9):\n\n| Component | Ideal Model | Real Hardware Model & Constraints |\n| :--- | :--- | :--- |\n| **Connecting Wire** | Resistance $R = 0$, $V = 0$ across wire | Finite trace resistance $R = \\rho L / A$, parasitic inductance ($V = L \\frac{di}{dt}$ noise) |\n| **Battery** | Constant terminal voltage $V = V_b$ | Internal Thevenin resistance $r_b$, causing terminal sag: $V = V_b - I r_b$ |\n| **Semiconductor Diode** | Zero forward drop, infinite reverse resistance | Exponential Shockley I-V curve, $V_F \\approx 0.7\\text{ V}$ drop, reverse leakage current |\n| **DC Motor** | $100\\%$ power conversion: $V \\cdot I = \\tau \\cdot \\omega$ | Armature resistance $R_a$, copper $I^2 R_a$ heat, brush friction, back-EMF limit |\n| **Switch / Pushbutton** | Instantaneous binary transition | Mechanical contact bounce (5–20 ms oscillatory ringing requiring software debounce) |"
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
        explanation: "**Step 1: Series Conservation of Charge**\nBy Kirchhoff's Current Law, in a single series loop there is only one continuous conductive path for charge flow. Thus, the exact same current $I$ must pass sequentially through both resistors.\n\n**Step 2: Equivalent Resistance & Current**\nThe total equivalent resistance is:\n$$R_{eq} = R_1 + R_2$$\n\nApplying Ohm's law across the series combination:\n$$I = \\frac{V}{R_1 + R_2}$$"
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
        explanation: "**Step 1: Thevenin Terminal Relationship**\nThe terminal load line equation is:\n$$V_o = V_{th} - I_o R_{th}$$\n\n**Step 2: Short-Circuit Condition**\nUnder short-circuit conditions, the output terminals are connected together directly, forcing terminal voltage $V_o = 0\\text{ V}$.\n\n**Step 3: Calculating $I_{shunt}$**\n$$0 = 5\\text{ V} - (2\\ \\Omega) \\cdot I_{shunt}$$\n$$I_{shunt} = \\frac{5}{2} = 2.5\\text{ A}$$"
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
        explanation: "**Step 1: Voltage Divider Derivation**\nThe voltage delivered across the load or measurement meter is:\n$$V_i = V_{ON} \\frac{R_i}{R_O + R_i} = \\frac{V_{ON}}{1 + R_O / R_i}$$\n\n**Step 2: Minimizing Measurement Loading**\nTo measure the true open-circuit voltage ($V_i \\approx V_{ON}$):\n- We require the loading ratio $\\frac{R_O}{R_i} \\to 0$.\n- Hence, the source must have **low output impedance** ($R_O \\ll R_i$).\n- The meter must have **high input impedance** ($R_i \\gg R_O$) to draw negligible current ($I_{meter} \\approx 0$).\n\nStatement 4 is incorrect because high $R_O$ and low $R_i$ would maximize voltage drop inside the source, collapsing the measured signal."
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
        explanation: "**Step 1: Physical Node Analysis**\nAs Professor Ruina noted: *'As written, this question is nonsense. The output is grounded no matter the position of the switch. A pullup resistor can’t fix this problem.'*\n\n**Step 2: Effect of Pull-Up on a Hard Ground**\nIf an output node is physically hardwired to ground, adding a pull-up resistor to $5\\text{ V}$ simply creates a current path from $V_{CC}$ through the $10\\text{ k}\\Omega$ resistor directly into ground.\n\nThis dissipates $P = \\frac{V^2}{R} = \\frac{25}{10000} = 2.5\\text{ mW}$ of power while the output terminal potential remains strictly pinned at $0\\text{ V}$."
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
        explanation: "**Step 1: Leg 1 Node Potential**\nLeg 1 acts as a voltage divider from $V_B = 10\\text{ V}$:\n$$V_1 = V_B \\frac{R_{1G}}{R_{1B} + R_{1G}} = 10 \\cdot \\frac{1000}{1000 + 1000} = 5.0\\text{ V}$$\n\n**Step 2: Leg 2 Node Potential**\nLeg 2 acts as a parallel divider from $V_B = 10\\text{ V}$:\n$$V_2 = V_B \\frac{R_{2G}}{R_{2B} + R_{2G}} = 10 \\cdot \\frac{1200}{1000 + 1200} = 10 \\cdot \\frac{12}{22} \\approx 5.4545\\text{ V}$$\n\n**Step 3: Differential Bridge Output**\nThe open-circuit differential voltage is:\n$$V_0 = V_2 - V_1 = 5.4545\\text{ V} - 5.0\\text{ V} \\approx 0.455\\text{ V}$$"
      },
      {
        id: "q-1-6",
        type: "nat",
        source: "Tutorial 1 & Circuit Theory",
        title: "Maximum Power Delivered by Thevenin Source",
        prompt: "A DC sensor conditioning circuit has an open-circuit voltage $V_{th} = 12.0\\text{ V}$ and an internal Thevenin resistance $R_{th} = 4.0\\ \\Omega$. Calculate the maximum power $P_{max}$ in Watts that this circuit can deliver to an optimal load resistor $R_L$.",
        unit: "W",
        correctAnswer: 9.0,
        toleranceRange: [8.9, 9.1],
        explanation: "**Step 1: Maximum Power Condition**\nBy the Maximum Power Transfer Theorem, maximum power is delivered to the load when the load resistance matches the source Thevenin resistance:\n$$R_L = R_{th} = 4.0\\ \\Omega$$\n\n**Step 2: Load Voltage and Current**\nUnder matched conditions, the load voltage is half the open-circuit voltage:\n$$V_L = \\frac{V_{th}}{2} = \\frac{12.0\\text{ V}}{2} = 6.0\\text{ V}$$\n$$I_L = \\frac{V_{th}}{R_{th} + R_L} = \\frac{12.0\\text{ V}}{8.0\\ \\Omega} = 1.5\\text{ A}$$\n\n**Step 3: Calculate Power Delivered**\n$$P_{max} = V_L \\cdot I_L = 6.0\\text{ V} \\times 1.5\\text{ A} = 9.0\\text{ W}$$\nOr directly via the canonical identity:\n$$P_{max} = \\frac{V_{th}^2}{4 R_{th}} = \\frac{144}{4 \\times 4} = \\frac{144}{16} = 9.0\\text{ W}$$"
      },
      {
        id: "q-1-7",
        type: "mcq",
        source: "Lab 1 (Resistor Networks)",
        title: "4-Band Resistor Color Code Identification",
        prompt: "A carbon film resistor used in Lab 1 has four colored bands in sequence: **Brown, Black, Red, Gold**. What is its nominal resistance and valid manufacturer tolerance range?",
        options: [
          "Nominal $1.0\\text{ k}\\Omega$ ($1000\\ \\Omega$) with $\\pm 5\\%$ tolerance ($950\\ \\Omega$ to $1050\\ \\Omega$).",
          "Nominal $100\\ \\Omega$ with $\\pm 10\\%$ tolerance ($90\\ \\Omega$ to $110\\ \\Omega$).",
          "Nominal $10\\text{ k}\\Omega$ with $\\pm 5\\%$ tolerance ($9.5\\text{ k}\\Omega$ to $10.5\\text{ k}\\Omega$).",
          "Nominal $1.0\\text{ k}\\Omega$ with $\\pm 20\\%$ tolerance ($800\\ \\Omega$ to $1200\\ \\Omega$)."
        ],
        correctIndex: 0,
        explanation: "**Step 1: Decode Significant Digits**\n- Band 1 (Brown) = Digit $1$\n- Band 2 (Black) = Digit $0$\n- Significant figures = $10$\n\n**Step 2: Decode Multiplier**\n- Band 3 (Red) = Multiplier $10^2 = 100$\n$$\\text{Nominal Resistance} = 10 \\times 100 = 1000\\ \\Omega = 1.0\\text{ k}\\Omega$$\n\n**Step 3: Decode Tolerance Band**\n- Band 4 (Gold) = Tolerance $\\pm 5\\%$\n$$\\Delta R = 1000 \\times 0.05 = 50\\ \\Omega$$\n$$\\text{Valid Range} = [950\\ \\Omega, 1050\\ \\Omega]$$"
      },
      {
        id: "q-1-8",
        type: "mcq",
        source: "Tutorial 1 (Load Line Intersection)",
        title: "Thevenin Load Line & Q-Point Graphical Intersection",
        prompt: "A circuit's Thevenin source line is plotted as $V_o = 10 - 2 I_o$ on a $V$-$I$ coordinate graph. A load resistor $R_L = 3\\ \\Omega$ is connected across the terminals, represented by the load line $V_L = 3 I_L$. What is the Quiescent Operating Point (Q-point) $(I_Q, V_Q)$ at the graphical intersection?",
        options: [
          "$(2.0\\text{ A}, 6.0\\text{ V})$, where both source and load lines intersect.",
          "$(5.0\\text{ A}, 10.0\\text{ V})$, the open-circuit and short-circuit intercepts.",
          "$(3.33\\text{ A}, 3.33\\text{ V})$, assuming equal splitting between source and load.",
          "$(1.5\\text{ A}, 4.5\\text{ V})$, the point of maximum power transfer."
        ],
        correctIndex: 0,
        explanation: "**Step 1: Set Source and Load Voltages Equal**\nAt the graphical intersection (Q-point), terminal voltage and current are identical:\n$$V_o = V_L \\implies 10 - 2 I_Q = 3 I_Q$$\n$$5 I_Q = 10 \\implies I_Q = 2.0\\text{ A}$$\n\n**Step 2: Evaluate Terminal Voltage**\n$$V_Q = 3 I_Q = 3 \\times 2.0 = 6.0\\text{ V}$$\nCheck with source line: $V_Q = 10 - 2(2.0) = 6.0\\text{ V}$.\nThus, the intersection Q-point is $(2.0\\text{ A}, 6.0\\text{ V})$."
      },
      {
        id: "q-1-9",
        type: "nat",
        source: "Tutorial 1 (Load Power from Q-Point)",
        title: "Power Dissipated at Load Line Operating Point",
        prompt: "For the circuit operating at the Q-point $(I_Q = 2.0\\text{ A}, V_Q = 6.0\\text{ V})$ found from the load line intersection, calculate the total power $P_L$ delivered to the load resistor in Watts.",
        unit: "W",
        correctAnswer: 12.0,
        toleranceRange: [11.9, 12.1],
        explanation: "**Step 1: Power from Q-Point Coordinates**\nAt the operating point, power delivered to the load is:\n$$P_L = V_Q \\cdot I_Q = 6.0\\text{ V} \\times 2.0\\text{ A} = 12.0\\text{ Watts}$$\nAlternatively, using $P_L = I_Q^2 R_L = (2.0)^2 \\times 3 = 4 \\times 3 = 12.0\\text{ W}$."
      }
    ],
    vault: {
      formulas: [
        { name: "Ohm's Law", tex: "V = I \\cdot R \\iff I = \\frac{V}{R} \\iff R = \\frac{V}{I}" },
        { name: "Electrical Power", tex: "P = V \\cdot I = I^2 R = \\frac{V^2}{R} \\quad [\\text{Watts}]" },
        { name: "Thevenin Parameters", tex: "V_{th} = V_{open}, \\quad R_{th} = \\frac{V_{open}}{I_{shunt}}, \\quad V_o(I_o) = V_{th} - I_o R_{th}" },
        { name: "Graphical Q-Point Intersection", tex: "I_Q = \\frac{V_{th}}{R_{th} + R_L}, \\quad V_Q = I_Q \\cdot R_L" },
        { name: "Maximum Power Transfer", tex: "P_{max} = \\frac{V_{th}^2}{4 R_{th}} \\quad (\\text{when } R_L = R_{th})" },
        { name: "Wheatstone Bridge Offset", tex: "V_0 = V_B \\left( \\frac{R_4}{R_3 + R_4} - \\frac{R_2}{R_1 + R_2} \\right)" },
        { name: "Matrix Nodal Equation", tex: "\\mathbf{G} \\mathbf{V} = \\mathbf{I}, \\quad \\sum_{j \\ne k} \\frac{V_k - V_j}{R_{kj}} = I_{k,ext}" }
      ],
      pitfalls: [
        {
          title: "The Voltmeter Loading Error",
          desc: "Using a standard $1\\text{ M}\\Omega$ multimeter to measure high-impedance divider nodes ($R > 500\\text{ k}\\Omega$) causes severe measurement sag. The meter resistance is in parallel with the lower resistor!"
        },
        {
          title: "Shorting Nodes on Breadboards",
          desc: "Breadboard rows 1–5 share an internal metal spring clip. Placing both leads of a resistor in the same horizontal numbered row creates a direct short across the component."
        },
        {
          title: "The Quiz 6 Direct-Ground Trap",
          desc: "Never connect a logic output line directly to ground without a series switch. A pull-up cannot pull a dead short up to $V_{CC}$."
        },
        {
          title: "Multimeter Current Mode Fuse Blow",
          desc: "In ammeter mode, a multimeter has near zero resistance ($R \\approx 0.05\\ \\Omega$). Connecting it in parallel across a battery creates a dead short that instantly blows the internal ceramic fuse."
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
      "GPIO Voltage Limit: RP2040 GPIO pins operate strictly at $3.3\\text{ V}$ CMOS logic. Exceeding $3.6\\text{ V}$ triggers internal silicon ESD clamp latch-up and permanently destroys the pad.",
      "Power Rail Segregation: Never power inductive loads (motors, solenoids, relays) from the 3V3_OUT regulator pin. Inductive back-EMF spikes and current sags trigger brown-out resets (BOR).",
      "ADC Mapping Law: 12-bit native SAR ADC produces integer values $0 - 4095$ ($V_{LSB} \\approx 0.806\\text{ mV}$); MicroPython `read_u16()` scales this to $0 - 65535$, corresponding linearly to $0\\text{ V} - 3.3\\text{ V}$."
    ],
    commonPitfalls: [
      "Wiring an LED directly between a GPIO pin and GND without a current-limiting ballast resistor (destroys the GPIO FET within milliseconds).",
      "Connecting a 5V sensor (like HC-SR04 Echo) directly to a Pico GPIO pin without a voltage divider.",
      "Wiring only two pins of a potentiometer instead of three, creating a variable rheostat that cannot produce a true 0-3.3V ground-referenced signal.",
      "Leaving unused communication or button input pins floating without enabling internal pull-up (`Pin.PULL_UP`) or pull-down resistors."
    ],
    story: {
      summary: "Explore the brain of mechatronic machines: the Raspberry Pi Pico powered by the custom RP2040 dual-core ARM Cortex-M0+ silicon. Based on Gittaly Lecture 1, Tutorial 3, Tutorial 5, and Labs 2-3, we uncover the pin architecture, power rails, ADC quantization, PWM timing, and serial bus protocols.",
      sections: [
        {
          heading: "1. Silicon Microarchitecture: Dual-Core ARM Cortex-M0+ & SRAM Banks",
          text: "Unlike a general-purpose single-board computer (like a Raspberry Pi 4 running Linux OS with gigabytes of RAM, multi-second boot sequences, and non-deterministic task preemption), the **Raspberry Pi Pico** is a bare-metal **microcontroller**. It executes firmware immediately upon power-up with microsecond deterministic timing.\n\n**RP2040 Silicon Specifications:**\n- **Processor**: Dual-core ARM Cortex-M0+ running at nominal clock frequency of $133\\text{ MHz}$.\n- **Memory**: $264\\text{ KB}$ on-chip SRAM organized into 6 independent banks. This multi-bank architecture allows both CPU cores and DMA controllers to access memory concurrently without bus contention.\n- **Storage**: External $2\\text{ MB}$ QSPI Flash memory connected over a high-speed bus with on-the-fly Execute-In-Place (XIP) caching.\n- **Bootloader**: Hardcoded ROM containing a UF2 USB mass-storage bootloader activated by holding the `BOOTSEL` button during power-on.\n- **Peripherals**: 2x UART, 2x SPI, 2x $I^2C$, 16x PWM channels, and two programmable I/O (PIO) blocks with 8 state machines for custom hardware protocols."
        },
        {
          heading: "2. Complete Pinout Taxonomy & Safe Power Routing (Tutorial 3)",
          text: "The Pico features a 40-pin Dual In-Line (DIP) package with castellated edges. Understanding pin segregation is vital for hardware safety:\n\n- **General Purpose I/O (Pins 1–22, 26–28)**: 26 multi-function GPIO pins running at strictly $3.3\\text{ V}$ CMOS logic levels.\n- **Ground Infrastructure (Pins 3, 8, 13, 18, 23, 28, 33, 38)**: 8 dedicated GND pins strategically distributed across the package to provide low-impedance return paths and prevent high-frequency capacitive crosstalk.\n- **VBUS (Pin 40)**: Direct $5.0\\text{ V}$ power from the micro-USB port. It can source up to $500\\text{ mA}$ from the host PC to power external 5V sensors (like HC-SR04). **Warning:** Never connect VBUS directly to a GPIO pin!\n- **VSYS (Pin 39)**: Main system power input accepting $1.8\\text{ V}$ to $5.5\\text{ V}$. It feeds the onboard RT6150 buck-boost Switch-Mode Power Supply (SMPS). Powering a mobile robot via external batteries (e.g. 3x AA cells $= 4.5\\text{ V}$ or 1S LiPo $= 3.7\\text{ V}$) is done through VSYS.\n- **3V3_OUT (Pin 36)**: Regulated $3.3\\text{ V}$ output from the onboard SMPS. It powers the RP2040 chip and low-power external sensors, with a strict combined external current budget of $\\sim 300\\text{ mA}$.\n- **3V3_EN (Pin 37)**: Active-high enable pin for the SMPS. Pulling it to GND shuts down the 3.3V power rail.\n- **ADC_VREF (Pin 35)**: Low-noise analog voltage reference for the ADC, decoupled on-board by a 100nF capacitor.\n- **GP25 (The Onboard Heartbeat)**: Hardwired internally on the PCB to the green user LED. Because its trace is routed internally, GP25 is not exposed on the edge headers (pins 1–40). It provides an instant visual indicator of running firmware."
        },
        {
          heading: "3. GPIO Electrical Physics & Diode Ballast Sizing (Gittaly Pico Q2)",
          text: "A microcontroller GPIO pin is driven by complementary P-channel and N-channel MOSFETs. The RP2040 GPIO specifications are:\n- Nominal logic HIGH: $3.3\\text{ V}$ ($V_{OH} \\ge 2.7\\text{ V}$).\n- Nominal logic LOW: $0.0\\text{ V}$ ($V_{OL} \\le 0.4\\text{ V}$).\n- Maximum continuous current per pin: $12\\text{ mA}$ (absolute maximum rating $16\\text{ mA}$; total chip current limit $\\approx 50\\text{ mA}$).\n\n**The LED Burnout Disaster (Gittaly Q2):**\nA light-emitting diode is an exponential semiconductor junction described by the Shockley diode equation: $I = I_s \\left( e^{V / V_T} - 1 \\right)$. Once forward voltage exceeds threshold ($V_F \\approx 2.0\\text{ V}$ for red LEDs), dynamic resistance drops to near zero.\n\nWiring an LED directly across a GPIO pin without a resistor forces the output FET to source massive current, dropping the internal rail voltage and burning out the microscopic silicon bond wire!\n\n**Ohm's Law Series Ballast Sizing:**\n$$V_{GPIO} = V_R + V_F \\implies V_R = 3.3\\text{ V} - 2.0\\text{ V} = 1.3\\text{ V}$$\n$$R = \\frac{V_R}{I_F} = \\frac{1.3\\text{ V}}{0.020\\text{ A}} = 65\\ \\Omega$$\nWe select the standard standard $68\\ \\Omega$ or $100\\ \\Omega$ carbon film resistor."
        },
        {
          heading: "4. SAR ADC Architecture & 3-Terminal Potentiometer Mechanics (Gittaly Pico Q5)",
          text: "The RP2040 includes a 12-bit Successive Approximation Register (SAR) Analog-to-Digital Converter operating at up to $500\\text{ kS/s}$:\n- **Resolution**: 12 bits $= 2^{12} = 4096$ discrete quantization levels ($0$ to $4095$).\n- **LSB Voltage Step**: $V_{LSB} = \\frac{V_{ref}}{4095} = \\frac{3.3\\text{ V}}{4095} \\approx 0.806\\text{ mV}$.\n- **Channels**: GP26 (ADC0), GP27 (ADC1), GP28 (ADC2), plus internal ADC3 on GP29 (reading VSYS through a 3:1 voltage divider) and internal ADC4 (reading the on-chip silicon bandgap temperature sensor: $T = 27 - \\frac{V_{ADC} - 0.706}{0.001721}$).- **MicroPython 16-Bit Abstraction**: MicroPython scales the 12-bit raw integer to a uniform 16-bit unsigned range ($0$ to $65535$) via `read_u16()`.\n\n**Why Potentiometers Require 3 Terminals (Gittaly Q5):**\nIf you wire only two pins of a potentiometer (the wiper and one end), you create a variable series resistor ($R_{var}$). However, because an ideal ADC has near-infinite input impedance ($R_{in} > 10\\text{ M}\\Omega$), input current $I_{ADC} \\approx 0$. By Ohm's law, $\\Delta V = I_{ADC} \\cdot R_{var} = 0$, so the ADC reads $3.3\\text{ V}$ regardless of knob position!\n\nWiring all three pins (top to 3.3V, bottom to GND, wiper to ADC) forms a true **variable voltage divider**. Current flows continuously through the outer track, establishing a linear voltage gradient. At 30% rotation from GND:\n$$V_{wiper} = 0.30 \\times 3.3\\text{ V} = 0.99\\text{ V}$$\n$$\\text{MicroPython Count} = 0.30 \\times 65535 = 19660.5 \\approx 19660$$"
        },
        {
          heading: "5. Hardware PWM & Digital-to-Analog Emulation",
          text: "The RP2040 does not feature a native analog digital-to-analog converter (DAC). Instead, it synthesizes analog voltages using **Pulse Width Modulation (PWM)** across 16 channels:\n\n- A high-speed hardware counter cycles from $0$ to a configured `WRAP` integer at carrier frequency $f_{PWM}$.\n- If counter $< \\text{LEVEL}$, the pin outputs logic HIGH ($3.3\\text{ V}$); otherwise it outputs LOW ($0\\text{ V}$).\n- **Duty Cycle ($D$)**: The fraction of time the signal is HIGH: $D = \\frac{t_{on}}{t_{on} + t_{off}} = \\frac{\\text{LEVEL}}{\\text{WRAP}}$.\n- **Average DC Voltage**: $$V_{avg} = D \\cdot V_{supply} = D \\cdot 3.3\\text{ V}$$\n\nPassing this square wave through a passive low-pass RC filter ($f_c = \\frac{1}{2\\pi R C} \\ll f_{PWM}$) strips the high-frequency switching harmonics, reconstructing a smooth DC voltage.\n\n**RC Servo Motor Control Standard:**\nStandard hobby servomotors operate on a $50\\text{ Hz}$ PWM carrier ($T = 20\\text{ ms}$). The angular position is encoded strictly by the duration of the HIGH pulse:\n- $1.0\\text{ ms}$ pulse $= 0^\\circ$ rotation (extreme left)\n- $1.5\\text{ ms}$ pulse $= 90^\\circ$ rotation (neutral center)\n- $2.0\\text{ ms}$ pulse $= 180^\\circ$ rotation (extreme right)"
        },
        {
          heading: "6. Serial Communication Hardware Protocols: UART, SPI & I2C (Tutorial 3)",
          text: "Mechatronic robots require microcontrollers to communicate with external peripherals (sensors, IMUs, motor controllers, displays). The RP2040 provides dedicated hardware controllers:\n\n- **UART (Universal Asynchronous Receiver-Transmitter)**: Asynchronous point-to-point bus using two lines: **TX** (Transmit) and **RX** (Receive). Both devices must agree in advance on baud rate (e.g. 115200 bps), 8 data bits, no parity, 1 stop bit (8-N-1). Highly resilient, but limited to 2 devices.\n- **SPI (Serial Peripheral Interface)**: Synchronous, full-duplex master-slave bus using 4 lines: **MOSI** (Master Out Slave In), **MISO** (Master In Slave Out), **SCK** (Serial Clock, up to 50 MHz), and **CS/SS** (Chip Select, active-low). Exceptional transfer speed, but each additional slave requires an extra dedicated CS GPIO pin.\n- **$I^2C$ (Inter-Integrated Circuit)**: Synchronous, half-duplex multi-master multi-slave bus using strictly 2 lines: **SDA** (Serial Data) and **SCL** (Serial Clock). Every device on the bus has a unique 7-bit hardware address (supporting up to 127 devices on the exact same two pins).\n\n**The Open-Drain Invariant:** Both SDA and SCL use open-drain outputs that can only pull the lines down to GND; external pull-up resistors ($4.7\\text{ k}\\Omega$ to $3.3\\text{ V}$) pull the bus HIGH when released. This prevents destructive bus contention when multiple devices talk."
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
        explanation: "**Step 1: Architecture of GP25**\nOn the standard Raspberry Pi Pico, GP25 is wired directly to the onboard surface-mount green LED.\n\n**Step 2: Header Isolation & Purpose**\nBecause it is routed internally on the PCB, GP25 is not brought out to the physical pin headers (pins 1–40). It serves universally as a 'heartbeat' status indicator to confirm firmware execution without external breadboard wiring."
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
        explanation: "**Step 1: Kirchhoff's Voltage Law**\nAround the GPIO output loop, the supply voltage drops across the series ballast resistor and the LED forward junction:\n$$V_{GPIO} = V_R + V_F \\implies V_R = 3.3\\text{ V} - 2.0\\text{ V} = 1.3\\text{ V}$$\n\n**Step 2: Resistor Calculation via Ohm's Law**\nTo guarantee forward operating current $I_F = 20\\text{ mA} = 0.020\\text{ A}$:\n$$R = \\frac{V_R}{I_F} = \\frac{1.3\\text{ V}}{0.020\\text{ A}} = 65\\ \\Omega$$"
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
        explanation: "**Step 1: Wiper Potential Calculation**\nWith all three terminals connected across GND and $3.3\\text{ V}$, the potential is strictly linear with wiper fraction:\n$$V_{wiper} = 0.30 \\times 3.3\\text{ V} = 0.99\\text{ V}$$\n\n**Step 2: MicroPython 16-Bit Quantization**\nMicroPython maps the input range $0 - 3.3\\text{ V}$ to the full 16-bit integer scale ($0$ to $65535$):\n$$\\text{Raw} = 0.30 \\times 65535 = 19660.5 \\approx 19660$$\n(In underlying hardware, the 12-bit ADC reads $0.30 \\times 4095 \\approx 1228$)."
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
        explanation: "**Step 1: Regulator Thermal Overload**\nThe onboard RT6150 buck-boost regulator has a strict thermal limit (~300mA for external loads) and will shut down if overloaded.\n\n**Step 2: Voltage Sags & Inductive Spikes**\nMotors draw massive stall currents (> 1A), pulling the 3.3V rail down and triggering Brown-Out Reset (BOR) on the microcontroller. Furthermore, motor coils generate inductive flyback spikes ($V = -L \\frac{di}{dt}$) that destroy silicon gates.\n\n**Step 3: Best Practice**\nMotors must always be powered from a dedicated external power rail (e.g. 5V VBUS or separate battery pack) through an H-bridge driver with flyback protection, sharing common ground with the Pico."
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
        explanation: "**Step 1: System Power Input Architecture**\nVSYS (Pin 39) is the main system input designed to accept any supply between $1.8\\text{ V}$ and $5.5\\text{ V}$.\n\n**Step 2: Role of Buck-Boost Regulator**\nThe onboard RT6150 buck-boost SMPS regulates VSYS to provide a clean $3.3\\text{ V}$ to the RP2040 chip, even as battery voltage sags from $4.5\\text{ V}$ down to $2.0\\text{ V}$."
      },
      {
        id: "q-2-6",
        type: "nat",
        source: "Tutorial 5 Question 5",
        title: "Pico Battery Operating Runtime",
        prompt: "The Raspberry Pi Pico consumes an average of $0.15\\text{ W}$ when running an autonomous robot loop. It is powered via the VSYS pin by three standard AA alkaline batteries in series ($V_{pack} = 4.5\\text{ V}$, total capacity $2500\\text{ mAh}$). Assuming the onboard buck-boost power supply operates at $90\\%$ conversion efficiency, calculate the total operating runtime in hours (rounded to nearest integer).",
        unit: "hours",
        correctAnswer: 68,
        toleranceRange: [65, 71],
        explanation: "**Step 1: Total Battery Stored Energy**\nThe battery pack delivers $4.5\\text{ V}$ with a capacity of $2500\\text{ mAh} = 2.5\\text{ Ah}$:\n$$E_{stored} = V_{pack} \\times Q = 4.5\\text{ V} \\times 2.5\\text{ Ah} = 11.25\\text{ Watt-hours}$$\n\n**Step 2: Account for Regulator Efficiency (90%)**\n$$E_{usable} = 11.25\\text{ Wh} \\times 0.90 = 10.125\\text{ Watt-hours}$$\n\n**Step 3: Calculate Operating Runtime**\nDividing usable energy by the average power consumption:\n$$t = \\frac{E_{usable}}{P} = \\frac{10.125\\text{ Wh}}{0.15\\text{ W}} = 67.5\\text{ hours} \\approx 68\\text{ hours}$$"
      },
      {
        id: "q-2-7",
        type: "mcq",
        source: "Course Outline & Tutorial 3",
        title: "I2C Bus Open-Drain Pull-Up Requirement",
        prompt: "Why do the SDA (data) and SCL (clock) lines of an $I^2C$ sensor interface strictly require pull-up resistors to $3.3\\text{ V}$?",
        options: [
          "All I2C pins are open-drain (can only pull LOW to ground); pull-up resistors are required to restore lines to HIGH when released, preventing short-circuit bus contention.",
          "To increase the clock frequency from 100 kHz up to 50 MHz.",
          "To provide negative bias voltage required by silicon Schottky diodes.",
          "Because the RP2040 does not have internal power rails for communication pins."
        ],
        correctIndex: 0,
        explanation: "**Step 1: Open-Drain Architecture**\nIn the $I^2C$ specification, every transceiver pin uses an open-drain (open-collector) N-channel FET. A device can actively pull the signal line to GND, but cannot drive it HIGH.\n\n**Step 2: Role of External Pull-Up Resistors**\nA passive pull-up resistor (typically $4.7\\text{ k}\\Omega$) pulls the shared line up to $3.3\\text{ V}$ whenever all connected devices release the bus. This 'wired-AND' configuration prevents destructive power-to-ground short circuits if multiple devices attempt to transmit simultaneously."
      }
    ],
    vault: {
      formulas: [
        { name: "LED Ballast Resistor", tex: "R_{ballast} = \\frac{V_{GPIO} - V_F}{I_F} = \\frac{3.3 - V_F}{I_F}" },
        { name: "ADC Voltage Reconstruction", tex: "V_{in} = \\left( \\frac{\\text{Raw}_{12}}{4095} \\right) \\times 3.3\\text{ V} = \\left( \\frac{\\text{Raw}_{16}}{65535} \\right) \\times 3.3\\text{ V}" },
        { name: "Potentiometer Wiper Potential", tex: "V_{wiper} = V_{supply} \\cdot \\left( \\frac{\\%_{\\text{wiper}}}{100} \\right)" },
        { name: "PWM Effective Voltage", tex: "V_{eff} = D \\cdot V_{supply} = \\left( \\frac{t_{on}}{t_{on} + t_{off}} \\right) \\cdot 3.3\\text{ V}" },
        { name: "Battery Energy Budget", tex: "E[\\text{Wh}] = V_{pack} \\times Q[\\text{Ah}], \\quad t[\\text{hours}] = \\frac{E[\\text{Wh}] \\cdot \\eta}{P_{load}[\\text{W}]}" }
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
        },
        {
          title: "The 300mA 3V3 Regulator Current Ceiling",
          desc: "Attempting to power servos, solenoids, or Wi-Fi modules from 3V3_OUT exceeds the thermal limit of the onboard buck-boost regulator, causing voltage sags and microcontroller reboot loops."
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
      "Time-of-Flight (ToF) Acoustic Law: Distance is strictly proportional to round-trip propagation: $d = \\frac{t_{echo} \\cdot c}{2}$. Division by 2 is mandatory because the acoustic wave traverses the spatial distance twice.",
      "Ultrasonic Blind Zone Invariant: Echoes returning within $\\sim 150\\,\\mu\\text{s}$ ($< 2.5\\text{ cm}$) overlap with piezoelectric transducer mechanical ring-down, yielding corrupt garbage readings.",
      "Optical Reflection Duality: Specular reflection on smooth mirrors obeys $\\theta_r = \\theta_i$ (deflecting IR away from an angled receiver), whereas matte surfaces exhibit Lambertian diffuse scattering."
    ],
    commonPitfalls: [
      "Connecting the HC-SR04 5V Echo output directly to the Pico GPIO without a 2-resistor voltage divider (causes permanent gate oxide breakdown).",
      "Expecting an ultrasonic sensor to detect sound-absorbing acoustic foam or soft pillows (acoustically invisible due to near-zero reflection).",
      "Confusing the LM393 IR sensitivity potentiometer with a range amplifier; it merely adjusts the comparator DC threshold voltage $V_{ref}$.",
      "Assuming outdoor sunlight will not affect infrared sensors (unmodulated DC phototransistors saturate completely under solar 940nm flux)."
    ],
    story: {
      summary: "Explore how autonomous machines perceive spatial boundaries. Based on Lecture Quizzes 8, Gittaly Notes (Ultrasound & IR), Tutorial 4, and Labs 4-5, we dissect acoustic time-of-flight physics, transducer resonance, optical scattering, comparator circuits, and sensor fusion.",
      sections: [
        {
          heading: "1. The HC-SR04 Ultrasonic Sonar: Time of Flight & Speed of Sound",
          text: "How does a bat navigate in pitch darkness or an autonomous robot detect obstacles? By **echolocation**. The HC-SR04 module features two matched piezoelectric ceramic transducers: a transmitter (speaker) and a receiver (microphone).\n\n**The 4-Step Measurement Cycle:**\n1. The microcontroller asserts a $10\\,\\mu\\text{s}$ digital `HIGH` trigger pulse to the `TRIG` pin.\n2. The onboard sonic processor drives the transmitter with an **8-pulse burst at 40 kHz**.\n3. The `ECHO` output pin immediately goes `HIGH` the moment the acoustic pulse packet departs.\n4. The acoustic wave travels through air at speed $c$, hits the obstacle, reflects back, and vibrates the receiver diaphragm. Upon detection, the internal circuitry drops the `ECHO` pin `LOW`. The duration of the `HIGH` pulse represents the round-trip travel time $t_{echo}$.\n\n**The Round-Trip Distance Formula:**\n$$d = \\frac{t_{echo} \\cdot c}{2}$$\nBecause sound must travel to the obstacle *and* bounce back, failing to divide by $2$ doubles the estimated distance!\n\n**Temperature Dependence of Sound Speed:**\nThe speed of sound in dry air varies with ambient temperature $T$ (in $^\\circ\\text{C}$):\n$$c(T) = 331.3 \\sqrt{1 + \\frac{T}{273.15}} \\approx 331.3 + 0.606 \\cdot T \\quad [\\text{m/s}]$$\nAt room temperature ($20^\\circ\\text{C}$), $c \\approx 343.4\\text{ m/s} \\approx 0.0343\\text{ cm/}\\mu\\text{s}$."
        },
        {
          heading: "2. Why 8 Pulses at 40 kHz? (Gittaly Ultrasonic Q1)",
          text: "Why doesn't the sensor fire just a single sharp click? A single acoustic impulse carries negligible kinetic energy and is easily obscured by ambient acoustic noise (like jangling keys, footsteps, or motor gear whine).\n\n**The Resonance Mechanism:**\nFiring 8 consecutive square waves at the natural mechanical resonant frequency of the piezoelectric crystal ($40\\text{ kHz}$) allows the acoustic amplitude to build up constructively via resonance. This creates a dense, coherent wave packet with an exceptionally high signal-to-noise ratio that the receiver's tuned LC bandpass filter can reliably distinguish."
        },
        {
          heading: "3. Transducer Mechanical Ring-Down & The 2.5 cm Blind Zone (Quiz 8 & Lab 4)",
          text: "Why can't an ultrasonic sensor accurately measure an object placed $1\\text{ cm}$ away? When the transmitter fires, the piezo diaphragm vibrates vigorously and continues ringing down mechanically for approximately $100\\,\\mu\\text{s}$ to $150\\,\\mu\\text{s}$ after electrical drive stops.\n\nIf an obstacle is closer than $\\approx 2.5\\text{ cm}$:\n$$t_{round\\_trip} = \\frac{2 \\times 0.025\\text{ m}}{343\\text{ m/s}} \\approx 146\\,\\mu\\text{s}$$\nThe acoustic reflection bounces back while the transmitter is still ringing! The receiver amplifier cannot isolate the faint incoming echo from the lingering mechanical ringing, producing random, garbage distance readings."
        },
        {
          heading: "4. Protecting the Pico: 5V Echo Voltage Divider (Tutorial 4 & Lab 4)",
          text: "The HC-SR04 requires 5V power from `VBUS` to drive the piezo transducers with adequate acoustic power. Consequently, its `ECHO` output pin drives a $5.0\\text{ V}$ logic signal. Connecting this directly to an RP2040 GPIO pin will trigger the internal ESD protection clamp diodes and destroy the silicon pad over time!\n\n**Voltage Divider Stepping:**\nWe insert two series resistors between ECHO and GND, tapping the junction into the Pico GPIO:\n$$V_{GPIO} = V_{echo} \\cdot \\frac{R_2}{R_1 + R_2} = 5.0\\text{ V} \\cdot \\frac{R_2}{R_1 + R_2} \\le 3.3\\text{ V}$$\n\nChoosing standard values $R_1 = 1\\text{ k}\\Omega$ (top) and $R_2 = 2\\text{ k}\\Omega$ (bottom to GND):\n$$V_{GPIO} = 5.0\\text{ V} \\times \\frac{2000}{1000 + 2000} = 5.0 \\times \\frac{2}{3} = 3.33\\text{ V}$$\nThis steps down the 5V pulse safely within the Pico's $3.3\\text{ V}$ logic tolerance."
        },
        {
          heading: "5. Active Optical Sensing: Emitters, Detectors & The LM393 Comparator",
          text: "Digital IR obstacle sensors combine an Infrared LED emitter (wavelength $\\lambda \\sim 940\\text{ nm}$) and an IR phototransistor/photodiode connected to an LM393 voltage comparator:\n\n- **Phototransistor Detection**: When reflected 940nm photons strike the reverse-biased phototransistor base, electron-hole pairs are generated, increasing collector current $I_C$ proportionally to reflected optical flux.\n- **The Sensitivity Potentiometer**: Turning the onboard trim potentiometer adjusts the comparator DC reference voltage $V_{ref}$. Clockwise increases sensitivity (detecting fainter reflections at greater distances); counter-clockwise raises the threshold.\n- **Specular vs Diffuse Reflection (Lab 5 & Gittaly Q3)**: On a matte surface, light undergoes **Lambertian diffuse scattering** in all directions, ensuring photons return to the receiver. On a polished mirror, reflection is **specular** ($\\theta_r = \\theta_i$). If tilted even $10^\\circ$, the entire beam deflects away into the room, causing the sensor to falsely report 'no obstacle'!\n- **Spectral Absorption (Gittaly Q5)**: Carbon black pigments absorb infrared radiation almost completely. White paper reflects strongly, giving double the effective detection range."
        },
        {
          heading: "6. Sensor Fusion & Environmental Trade-Offs: Sonar vs IR vs LiDAR",
          text: "Every mechatronic perception modality exhibits physical blind spots that require sensor fusion:\n\n| Sensor Modality | Physics / Medium | Strengths | Vulnerabilities & Traps |\n| :--- | :--- | :--- | :--- |\n| **Ultrasonic (HC-SR04)** | Acoustic waves ($40\\text{ kHz}$) | Unaffected by optical color/transparency; detects clear glass & acrylic; works in pitch darkness | $2.5\\text{ cm}$ blind zone; sound absorbed by cloth/foam; specular acoustic bounce off angled walls; slow ($c = 343\\text{ m/s}$) |\n| **Active IR (LM393)** | Near-infrared light ($940\\text{ nm}$) | Extremely fast ($c = 3 \\times 10^8\\text{ m/s}$); compact footprint; low cost; sub-millimeter proximity triggers | Outdoor sunlight saturation; black absorbing surfaces; angled mirror deflection; non-linear distance curve |\n| **Time-of-Flight / LiDAR** | Laser pulses ($905\\text{ nm}$) | Millimeter precision; long range ($> 10\\text{ m}$); narrow angular beam collimation | High cost; optical scattering in smoke/dust; specular reflection on mirrors |"
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
        explanation: "**Step 1: Energy & Signal-to-Noise Ratio**\nA single acoustic pulse has very little energy and is vulnerable to ambient noise spikes (like jangling keys or snapping fingers).\n\n**Step 2: Transducer Mechanical Resonance**\nAn 8-cycle burst at the transducer's $40\\text{ kHz}$ natural resonant frequency drives the piezoelectric crystal into maximum mechanical oscillation. This produces a strong, coherent wave packet that the receiver's tuned bandpass filter can reliably distinguish."
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
        explanation: "**Step 1: Voltage Divider Formula**\nConnecting $R_1$ from Echo to the junction and $R_2$ from junction to GND:\n$$V_{out} = V_{in} \\cdot \\frac{R_2}{R_1 + R_2}$$\n\n**Step 2: Numerical Substitution**\nWith $V_{in} = 5.0\\text{ V}$, $R_1 = 1000\\ \\Omega$, and $R_2 = 2000\\ \\Omega$:\n$$V_{out} = 5.0\\text{ V} \\cdot \\frac{2000}{1000 + 2000} = 5.0 \\cdot \\frac{2}{3} \\approx 3.333\\text{ V}$$\nThis safely steps down the $5\\text{ V}$ pulse to the Pico's $3.3\\text{ V}$ maximum rating."
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
        explanation: "**Step 1: Specular Law of Reflection**\nUnlike matte surfaces that produce diffuse Lambertian scattering, polished reflective surfaces obey the law of specular reflection:\n$$\\theta_r = \\theta_i$$\n\n**Step 2: Ray Deflection Away from Sensor**\nWhen the mirror is tilted by $25^\\circ$, the emitted IR beam bounces away at $50^\\circ$ relative to the incident ray. Because virtually zero photons return to the collocated phototransistor, the sensor registers no obstacle."
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
        explanation: "**Step 1: Quantization Transfer Function**\nA 10-bit analog-to-digital converter has $2^{10} = 1024$ quantization levels (integers $0$ to $1023$):\n$$\\text{ADC} = \\text{round}\\left( \\frac{V_{in}}{V_{ref}} \\times 1023 \\right)$$\n\n**Step 2: Calculate Counts at $4.0\\text{ V}$**\nWith $V_{in} = 4.0\\text{ V}$ and $V_{ref} = 5.0\\text{ V}$:\n$$\\text{ADC} = \\text{round}\\left( \\frac{4.0}{5.0} \\times 1023 \\right) = \\text{round}(0.80 \\times 1023) = \\text{round}(818.4) = 818$$"
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
        explanation: "**Step 1: Physical Failure Modes**\nAll four choices represent verified physical limitations explored in Labs 4–5:\n\n1. **Transducer Ring-Down ($< 2.5\\text{ cm}$)**: The echo returns while the piezo crystal is still mechanically oscillating from transmission.\n2. **Acoustic Absorption**: Soft fabrics and open-cell foam attenuate sound without returning an echo.\n3. **Specular Deflection**: Angled hard surfaces bounce sound away from the microphone.\n4. **Acoustic Crosstalk**: Facing sonars pick up each other's pulses."
      },
      {
        id: "q-3-6",
        type: "nat",
        source: "Lab 4 & Sensor Physics",
        title: "Ultrasonic Echo Pulse Width for 1.5m Obstacle",
        prompt: "An HC-SR04 ultrasonic sensor measures an obstacle located at distance $d = 1.50\\text{ m}$. If the ambient temperature is $20^\\circ\\text{C}$ (where speed of sound $c = 343\\text{ m/s}$), calculate the duration of the HIGH pulse on the Echo pin in microseconds ($\\mu\\text{s}$, rounded to the nearest integer).",
        unit: "μs",
        correctAnswer: 8746,
        toleranceRange: [8700, 8800],
        explanation: "**Step 1: Determine Total Round-Trip Distance**\nThe sound pulse must travel to the obstacle and reflect back to the receiver:\n$$d_{total} = 2 \\times 1.50\\text{ m} = 3.00\\text{ m}$$\n\n**Step 2: Calculate Travel Duration**\nUsing the acoustic wave velocity $c = 343\\text{ m/s}$:\n$$t_{echo} = \\frac{d_{total}}{c} = \\frac{3.00\\text{ m}}{343\\text{ m/s}} \\approx 0.00874635\\text{ seconds}$$\n\n**Step 3: Convert to Microseconds**\n$$t_{echo} = 0.00874635 \\times 10^6 \\approx 8746\\,\\mu\\text{s}$$"
      },
      {
        id: "q-3-7",
        type: "nat",
        source: "Sensor Physics Curriculum",
        title: "Speed of Sound in High Summer Temperature",
        prompt: "On a hot summer afternoon, ambient room temperature inside a robotics lab reaches $T = 35.0^\\circ\\text{C}$. Calculate the speed of sound in air using the standard linear approximation formula $c(T) = 331.3 + 0.606 T$ in meters per second ($\\text{m/s}$, rounded to 1 decimal place).",
        unit: "m/s",
        correctAnswer: 352.5,
        toleranceRange: [351.5, 353.5],
        explanation: "**Step 1: Linear Acoustic Approximation**\nThe temperature-dependent speed of sound is:\n$$c(T) = 331.3 + 0.606 \\cdot T$$\n\n**Step 2: Numerical Substitution**\nFor $T = 35.0^\\circ\\text{C}$:\n$$c(35.0) = 331.3 + (0.606 \\times 35.0) = 331.3 + 21.21 = 352.51\\text{ m/s} \\approx 352.5\\text{ m/s}$$\nNotice that failing to compensate for temperature in high heat causes systematic distance measurement errors of over $2.6\\%$!"
      }
    ],
    vault: {
      formulas: [
        { name: "Speed of Sound in Air", tex: "c \\approx 331.3 + 0.606 \\cdot T_{celsius} \\quad [\\text{m/s}]" },
        { name: "Time of Flight Distance", tex: "d = \\frac{t_{echo} \\cdot c}{2} = \\frac{t_{echo}[\\mu s] \\times 0.0343}{2} \\quad [\\text{cm}]" },
        { name: "Echo Pulse Duration", tex: "t_{echo} = \\frac{2 \\cdot d}{c} \\quad [\\text{seconds}]" },
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
        },
        {
          title: "Acoustic Soft Foam Stealth",
          desc: "Open-cell acoustic foam, plush toys, and heavy carpets absorb sound waves without returning echoes, making them invisible to ultrasonic sonars."
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
      "Virtual Short Circuit: $V^+ \\approx V^-$ strictly when active negative feedback is established and the op-amp output is not saturated against power rails.",
      "Zero Input Terminal Current: $I^+ = I^- = 0$ due to the near-infinite input impedance of the differential stage ($R_{in} \\to \\infty$).",
      "Gain-Bandwidth Product (GBWP): For internally compensated op-amps, the product of closed-loop gain magnitude and -3dB bandwidth is constant: $|A_{CL}| \\cdot f_c = \\text{GBWP}$."
    ],
    commonPitfalls: [
      "Believing that $V^+$ and $V^-$ are physically shorted inside the chip (they are electrically isolated; tracking is enforced dynamically by feedback loop driving $V_{out}$).",
      "Assuming an op-amp can output voltages higher than its power supply rails $V_{CC}$ and $-V_{EE}$ (clipping occurs at rail saturation).",
      "Expecting infinite bandwidth when increasing closed-loop gain (doubling the gain cuts bandwidth strictly in half).",
      "Leaving unused op-amp inputs in a quad package floating (leads to high-frequency oscillation, capacitive noise injection, and severe overheating)."
    ],
    story: {
      summary: "Master the operational amplifier—the universal analog building block for robotics and instrumentation. Based on Sedra & Smith Chapter 2, Gittaly Lecture 4, and Labs 6-7, we analyze the 5 golden rules, inverting and non-inverting topologies, finite open-loop gain effects, buffer impedance matching, and real-world slew rate distortion.",
      sections: [
        {
          heading: "1. The Ideal Operational Amplifier & The 5 Golden Rules",
          text: "An **Operational Amplifier** is a differential-input, single-ended-output direct-coupled voltage amplifier. As defined in Sedra & Smith Chapter 2, it is treated as an ideal functional building block governed by **5 Golden Rules**:\n\n1. **Infinite Input Impedance ($R_{in} = \\infty$)**: Zero signal current enters either input pin: $I^+ = I^- = 0$.\n2. **Zero Output Impedance ($R_{out} = 0$)**: The output terminal behaves as an ideal Thevenin voltage source, supplying whatever load current is demanded without voltage sag.\n3. **Infinite Differential Open-Loop Gain ($A \\to \\infty$)**: The output voltage is $V_{out} = A (V^+ - V^-)$.\n4. **Infinite Bandwidth**: The amplifier amplifies DC signals ($0\\text{ Hz}$) up to infinite frequency with uniform gain.\n5. **Infinite Common-Mode Rejection Ratio ($CMRR \\to \\infty$)**: Any voltage applied identically to both inputs produces zero output voltage ($A_{cm} = 0$).\n\n**Power Supply Pin Architecture (Sedra/Smith Exercise 2.1):**\nOp-amps require DC power to operate. A single op-amp requires a minimum of **5 physical pins**: 2 differential inputs ($V^+, V^-$), 1 output ($V_{out}$), and 2 DC supply rails ($V_{CC}, -V_{EE}$). The reference ground is completely external—no pin on the IC package connects directly to ground! A quad op-amp IC shares the two power rails, requiring $4 \\times 3 + 2 = 14\\text{ pins}$."
        },
        {
          heading: "2. The Virtual Short Circuit & Negative Feedback Mechanics (Gittaly Q2-Q5)",
          text: "Why do we say $V^+ \\approx V^-$? The fundamental open-loop relation is:\n$$V_{out} = A (V^+ - V^-) \\iff V^+ - V^- = \\frac{V_{out}}{A}$$\nBecause internal open-loop gain $A$ is enormous (typically $10^5$ to $10^6\\text{ V/V}$), for any normal output voltage ($V_{out} \\sim 5\\text{ V}$), the differential error voltage between terminals is:\n$$V^+ - V^- = \\frac{5\\text{ V}}{10^5} = 50\\,\\mu\\text{V} \\approx 0$$\n\n**CRITICAL INSIGHT (Gittaly Q4):** Are the two pins physically shorted? **ABSOLUTELY NOT!** A physical wire allows current to flow directly between conductors. An op-amp's inputs draw zero current ($I_{in} = 0$). The tracking is an active feedback phenomenon: the op-amp monitors the error and drives $V_{out}$ to whatever voltage forces $V^- = V^+$.\n\n**Where Does Feedback Current Go? (Gittaly Q5):**\nCurrent flowing through the feedback resistor does *not* disappear into the input pin. It flows out of (or into) the op-amp's low-impedance output terminal, supplied directly by the internal output stage transistors connected to the power supply rails ($V_{CC}/-V_{EE}$)!"
        },
        {
          heading: "3. Inverting & Non-Inverting Topologies with Derivations",
          text: "By applying negative feedback using external precision resistors, we establish stable, predictable closed-loop amplification:\n\n- **Inverting Configuration**: Input signal $V_{in}$ is applied through resistor $R_1$ to the inverting input ($V^-$), with feedback resistor $R_2$ tied to $V_{out}$. The non-inverting terminal is tied to Ground ($V^+ = 0$). By virtual short tracking, $V^- = 0$ is a **virtual ground**.\n\nApplying Kirchhoff's Current Law at node $V^-$:\n$$I_1 = \\frac{V_{in} - 0}{R_1}, \\quad I_2 = \\frac{0 - V_{out}}{R_2}$$\nBecause $I_{in} = 0$, $I_1 = I_2$, yielding the closed-loop gain:\n$$\\frac{V_{in}}{R_1} = -\\frac{V_{out}}{R_2} \\implies G = \\frac{V_{out}}{V_{in}} = -\\frac{R_2}{R_1}$$\n*Note:* The input impedance of the inverting amplifier is limited to $R_{in, closed} = R_1$, which may load high-impedance signal sources.\n\n- **Non-Inverting Configuration**: Input signal $V_{in}$ is connected directly to $V^+$. Resistors $R_1$ and $R_2$ form a voltage divider from $V_{out}$ back to $V^-$:\n$$V^- = V_{out} \\cdot \\frac{R_1}{R_1 + R_2}$$\nBecause $V^- = V^+ = V_{in}$:\n$$V_{in} = V_{out} \\cdot \\frac{R_1}{R_1 + R_2} \\implies G = \\frac{V_{out}}{V_{in}} = 1 + \\frac{R_2}{R_1}$$\n*Advantage:* Input impedance is near-infinite ($R_{in} \\to \\infty$), presenting zero load to preceding sensors!"
        },
        {
          heading: "4. Voltage Followers (Buffers), Summing & Difference Amplifiers",
          text: "Specialized op-amp configurations provide critical signal conditioning functions in robotics:\n\n- **Unity-Gain Voltage Follower (Buffer)**: Setting $R_1 = \\infty$ (open circuit) and $R_2 = 0$ (direct feedback wire) in the non-inverting topology yields gain $G = 1$. The buffer has infinite input impedance and zero output impedance. It acts as an **impedance transformer**, isolating sensitive high-impedance voltage dividers (like potentiometers or thermistors) from the low-impedance sampling capacitance of microcontroller ADCs without voltage droop.\n- **Summing Amplifier**: Connecting multiple input resistors $R_a, R_b, \\dots$ to the virtual ground node $V^-$ sums signals linearly without inter-channel crosstalk:\n$$V_{out} = -R_f \\left( \\frac{V_a}{R_a} + \\frac{V_b}{R_b} + \\dots \\right)$$\n- **Differential Instrumentation Subtractor**: By matching resistor pairs, the difference amplifier subtracts common-mode noise:\n$$V_{out} = \\frac{R_2}{R_1} (V_2 - V_1)$$"
        },
        {
          heading: "5. Analysis with Finite Open-Loop Gain (Sedra & Smith Eq. 2.5)",
          text: "What happens when the op-amp's internal gain $A$ is finite? Sedra & Smith derive the rigorous closed-loop gain for an inverting amplifier without assuming $A = \\infty$.\n\nIf output voltage is $V_{out}$, the voltage between the input pins is $V^+ - V^- = V_{out} / A$. Because $V^+ = 0$, the inverting terminal potential is $V^- = -V_{out} / A$. The current through $R_1$ is:\n$$I_1 = \\frac{V_{in} - (-V_{out}/A)}{R_1} = \\frac{V_{in} + V_{out}/A}{R_1}$$\nBecause zero current enters the op-amp, this exact current flows through $R_2$:\n$$V_{out} = V^- - I_1 R_2 = -\\frac{V_{out}}{A} - \\left( \\frac{V_{in} + V_{out}/A}{R_1} \\right) R_2$$\n\nRearranging terms yields **Sedra & Smith Equation 2.5**:\n$$G = \\frac{V_{out}}{V_{in}} = \\frac{-R_2 / R_1}{1 + \\frac{1 + R_2 / R_1}{A}}$$\nAs $A \\to \\infty$, the denominator approaches $1$, recovering the ideal gain $-R_2 / R_1$. Notice that if $R_2/R_1 = 10$ and $A = 100$, the actual gain is $G = \\frac{-10}{1 + 11/100} = -9.01$, demonstrating a $\\sim 10\\%$ gain error due to finite open-loop gain!"
        },
        {
          heading: "6. Real-World Limitations: Gain-Bandwidth, Slew Rate & Rail Saturation",
          text: "Real integrated circuits depart from ideal models across three fundamental physical constraints:\n\n1. **Gain-Bandwidth Product (GBWP) Tradeoff (Gittaly Q1)**: Internally compensated op-amps have an open-loop gain that rolls off at $-20\\text{ dB/decade}$. The product of closed-loop gain $|A_{CL}|$ and cutoff frequency $f_c$ is invariant: $|A_{CL}| \\cdot f_c = \\text{GBWP}$. If an op-amp with $1\\text{ MHz}$ GBWP is set to gain $20\\times$, its bandwidth is $f_c = 50\\text{ kHz}$. Doubling gain to $40\\times$ halves bandwidth to $25\\text{ kHz}$!\n2. **Slew Rate Limiting ($SR$)**: Slew rate is the maximum rate of change of output voltage that the internal compensation capacitor charging current can sustain: $SR = \\max \\left| \\frac{dV_{out}}{dt} \\right|$ (typically $0.5\\text{ V}/\\mu\\text{s}$ to $10\\text{ V}/\\mu\\text{s}$). If a sinusoidal signal demands a slope steeper than $SR$, the output distorts into a triangle wave.\n3. **Power Supply Rail Saturation**: The output voltage swing is bounded by the physical supply rails: $-V_{EE} < V_{out} < V_{CC}$. When an op-amp is driven into saturation, negative feedback is lost and the virtual short condition $V^+ \\approx V^-$ completely collapses."
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
        explanation: "**Step 1: Single Op-Amp Package Pins**\nA single op-amp requires:\n- 2 differential input pins ($V^+, V^-$)\n- 1 output pin ($V_{out}$)\n- 2 DC power supply rails ($V_{CC}, -V_{EE}$)\n$$\\text{Total for single} = 2 + 1 + 2 = 5\\text{ pins}$$\n\n**Step 2: Quad Op-Amp Package Pins**\nA quad package contains 4 separate op-amps:\n- $4 \\times 3 = 12$ signal pins (2 inputs + 1 output each)\n- Shared DC power rails ($V_{CC}$ and $-V_{EE}$)\n$$\\text{Total for quad} = 12 + 2 = 14\\text{ pins}$$"
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
        explanation: "**Step 1: Gain-Bandwidth Tradeoff**\nInternally compensated op-amps have an open-loop gain that rolls off at $-20\\text{ dB/decade}$. The product of closed-loop gain and corner frequency is invariant:\n$$A_{CL} \\times f_c = \\text{GBWP}$$\n\n**Step 2: Effect of Increasing Gain**\nIf you double the gain from $20\\times$ to $40\\times$, the bandwidth is cut in half:\n$$f_c = \\frac{\\text{GBWP}}{40}$$\nThis lowers the cutoff frequency, making treble sounds attenuate even more severely instead of improving audio clarity."
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
        explanation: "**Step 1: The 'Virtual' Distinction**\nAs explained in Gittaly Lecture 4 and Sedra/Smith: It is called a 'virtual short' precisely because no physical connection exists between the inputs.\n\n**Step 2: Active Dynamic Feedback**\nAn ideal op-amp draws zero input current ($I^+ = I^- = 0$). The output voltage actively tracks via negative feedback, driving $V_{out}$ so that:\n$$V^+ - V^- = \\frac{V_{out}}{A} \\to 0$$"
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
        explanation: "**Step 1: Finite Open-Loop Gain Equation**\nFrom Sedra & Smith Eq. 2.5:\n$$G = \\frac{-R_2/R_1}{1 + \\frac{1 + R_2/R_1}{A}}$$\n\n**Step 2: Numerical Evaluation**\nWith nominal gain ratio $\\frac{R_2}{R_1} = \\frac{10\\text{ k}\\Omega}{1\\text{ k}\\Omega} = 10$ and open-loop gain $A = 100\\text{ V/V}$:\n$$G = \\frac{-10}{1 + \\frac{1 + 10}{100}} = \\frac{-10}{1 + 0.11} = \\frac{-10}{1.11} \\approx -9.009\\text{ V/V}$$\n\n**Step 3: Magnitude**\n$$|G| \\approx 9.01$$"
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
        explanation: "**Step 1: Necessary Condition for Virtual Short**\nThe virtual short ($V^+ \\approx V^-$) relies strictly on three operational conditions:\n\n1. Active negative feedback connection exists.\n2. The output voltage has not saturated against the power supply rails ($V_{EE} < V_{out} < V_{CC}$).\n3. Open-loop gain $A$ is very large.\n\n**Step 2: Failure Modes**\nIf the output saturates, if feedback is open-loop (comparator mode), or if positive feedback is applied, the amplifier loses the ability to null the differential error voltage, so $V^+ \\approx V^-$ completely fails."
      },
      {
        id: "q-4-6",
        type: "mcq",
        source: "Op-Amp Circuit Applications",
        title: "Unity-Gain Buffer Impedance Isolation",
        prompt: "Why is an op-amp configured as a unity-gain follower ($V_{out} = V_{in}$) commonly placed between a high-resistance potentiometer and a microcontroller ADC input?",
        options: [
          "It provides near-infinite input impedance (drawing zero current from the divider) while providing near-zero output impedance to charge the ADC sampling capacitor without voltage sag.",
          "It doubles the signal voltage range from 3.3V to 6.6V.",
          "It converts the analog signal into a 16-bit PWM waveform.",
          "It inverts the signal phase by 180 degrees to cancel electromagnetic noise."
        ],
        correctIndex: 0,
        explanation: "**Step 1: Buffer Impedance Characteristics**\nA voltage follower provides gain $G = 1$, but dramatically transforms impedance:\n- **Input Impedance**: $R_{in} \\to \\infty$ ($> 10^{12}\\ \\Omega$ for FET op-amps). It draws virtually zero current from the potentiometer, preventing measurement loading.\n- **Output Impedance**: $R_{out} \\approx 0$. It can supply substantial current to rapidly charge the microcontroller's internal ADC sample-and-hold capacitor without voltage drop."
      },
      {
        id: "q-4-7",
        type: "nat",
        source: "Op-Amp Dynamics & Sedra/Smith",
        title: "Full-Power Bandwidth from Slew Rate",
        prompt: "An operational amplifier has a slew rate specification $SR = 0.50\\text{ V}/\\mu\\text{s}$ ($500{,}000\\text{ V/s}$). If required to amplify a sinusoidal signal with peak output amplitude $V_p = 5.0\\text{ V}$ without slew-induced triangle wave distortion, calculate the maximum allowable signal frequency $f_{max} = \\frac{SR}{2\\pi V_p}$ in kilohertz ($\\text{kHz}$, rounded to 1 decimal place).",
        unit: "kHz",
        correctAnswer: 15.9,
        toleranceRange: [15.6, 16.2],
        explanation: "**Step 1: Rate of Change of Sinusoid**\nFor an output voltage $v_o(t) = V_p \\sin(2\\pi f t)$, the maximum slope occurs at the zero-crossings:\n$$\\left. \\frac{dv_o}{dt} \\right|_{max} = 2\\pi f V_p$$\n\n**Step 2: Slew Rate Limit Condition**\nTo avoid distortion, this slope must not exceed the slew rate $SR$:\n$$2\\pi f V_p \\le SR \\implies f_{max} = \\frac{SR}{2\\pi V_p}$$\n\n**Step 3: Numerical Substitution**\nWith $SR = 500{,}000\\text{ V/s}$ and $V_p = 5.0\\text{ V}$:\n$$f_{max} = \\frac{500{,}000}{2\\pi \\times 5.0} = \\frac{500{,}000}{31.4159} \\approx 15915\\text{ Hz} \\approx 15.9\\text{ kHz}$$"
      },
      {
        id: "q-4-8",
        type: "nat",
        source: "Sedra/Smith Ch 2 & DC Transfer Characteristic",
        title: "Input Saturation Limit from DC Transfer Curve",
        prompt: "An inverting amplifier has input resistor $R_1 = 2\\text{ k}\\Omega$ and feedback resistor $R_2 = 20\\text{ k}\\Omega$, powered from dual supply rails $\\pm 10.0\\text{ V}$. From its DC transfer characteristic $V_{out}$ vs $V_{in}$, calculate the maximum positive input voltage $V_{in,max}$ in Volts before the output clips at the negative saturation rail $-10.0\\text{ V}$.",
        unit: "V",
        correctAnswer: 1.0,
        toleranceRange: [0.98, 1.02],
        explanation: "**Step 1: Inverting Linear Gain**\n$$A_v = -\\frac{R_2}{R_1} = -\\frac{20\\text{ k}\\Omega}{2\\text{ k}\\Omega} = -10\\text{ V/V}$$\n\n**Step 2: Negative Rail Saturation Threshold**\nThe output clips when linear output hits the negative supply rail:\n$$V_{out} = -10.0\\text{ V} \\implies A_v \\cdot V_{in} = -10.0\\text{ V}$$\n$$-10 \\cdot V_{in} = -10.0\\text{ V} \\implies V_{in} = +1.0\\text{ V}$$\nAny input $V_{in} > +1.0\\text{ V}$ causes the transfer curve to flatten horizontally at $-10.0\\text{ V}$."
      }
    ],
    vault: {
      formulas: [
        { name: "Inverting Gain (Ideal)", tex: "G = -\\frac{R_2}{R_1}" },
        { name: "Inverting Gain (Finite A)", tex: "G = \\frac{-R_2/R_1}{1 + \\frac{1 + R_2/R_1}{A}}" },
        { name: "Non-Inverting Gain", tex: "G = 1 + \\frac{R_2}{R_1}" },
        { name: "DC Transfer Characteristic", tex: "V_{out}(V_{in}) = \\operatorname{clamp}\\left(-V_{sat}, +V_{sat}, -\\frac{R_2}{R_1} V_{in}\\right)" },
        { name: "Gain-Bandwidth Product", tex: "A_{CL} \\cdot f_c = \\text{GBWP} \\implies f_c = \\frac{\\text{GBWP}}{|A_{CL}|}" },
        { name: "Full-Power Bandwidth (Slew Rate)", tex: "f_{max} = \\frac{SR}{2\\pi V_p} \\quad [\\text{Hz}]" },
        { name: "Summing Amplifier", tex: "V_{out} = -R_f \\sum_{k} \\frac{V_k}{R_k}" }
      ],
      pitfalls: [
        {
          title: "Assuming Op-Amp Power Comes from Inputs",
          desc: "Current delivered to the load resistor comes from the power supply pins ($V_{CC}/-V_{EE}$), NOT from the input signal source."
        },
        {
          title: "Ignoring Rail Saturation",
          desc: "An op-amp supplied with $\\pm 12\\text{ V}$ cannot output $15\\text{ V}$. If the theoretical gain predicts $15\\text{ V}$, the actual output clips flat at $\\sim 11.5\\text{ V}$ (or $12\\text{ V}$ rail-to-rail)."
        },
        {
          title: "Leaving Unused Op-Amps Floating",
          desc: "In quad packages, leaving unused op-amp inputs floating causes high-frequency oscillations and excessive thermal dissipation. Always wire unused units as followers tied to ground."
        },
        {
          title: "Slew Rate Distortion Trap",
          desc: "Even if an op-amp has adequate small-signal bandwidth, large-amplitude high-frequency signals will distort into triangle waves if the required slope exceeds the slew rate ($SR$)."
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
      "Power Conservation Invariant: Mechanical power equals torque times angular velocity: $P = \\tau \\cdot \\omega$. With 100% efficiency, $P_{electrical} = P_{mechanical}$.",
      "Transmission Torque-Speed Tradeoff: A gearbox reduces speed by ratio $N$ while amplifying torque by $N$: $\\omega_{out} = \\frac{\\omega_{in}}{N}$, $\\tau_{out} = \\tau_{in} \\cdot N$.",
      "Tractive Power Force Relation: Mechanical tractive power equals force times linear velocity: $P = F \\cdot v$."
    ],
    commonPitfalls: [
      "Believing a gearbox creates 'free power'. A gearbox conserves power (minus frictional heat); as torque increases, rotational speed must decrease proportionally.",
      "Confusing a food Calorie (1 Cal = 1 kcal = 4184 Joules) with a physics gram-calorie (~4.184 Joules).",
      "Assuming an ideal motor can supply infinite torque in physical hardware without breaking gear teeth or stalling."
    ],
    story: {
      summary: "Understand the muscle of mechatronics: DC motors, transmissions, power budgeting, and thermodynamics. Based directly on Tutorial 5, Tutorial 6, and Lecture Quizzes 9 & 10, we examine electromechanical energy conversion, torque-speed curves, gear ratio limits, tractive vehicle dynamics, human metabolic work, and reflected rotational inertia.",
      sections: [
        {
          heading: "1. Electromechanical Energy Conversion & DC Motor Architecture",
          text: "An electric motor converts electrical energy into mechanical work through magnetic field interactions governed by the **Lorentz force law** ($F = I \\cdot L \\times B$). An armature winding carrying current $I$ inside a permanent magnetic field $B$ experiences an electromagnetic torque:\n$$\\tau = k_t \\cdot I$$\nWhere $k_t$ is the **motor torque constant** (in $\\text{N}\\cdot\\text{m}/\\text{A}$).\n\nAs the rotor spins with angular velocity $\\omega$, the conductors cut magnetic flux lines, inducing a opposing voltage called **Back-Electromotive Force** (Back-EMF):\n$$E_b = k_e \\cdot \\omega$$\nWhere $k_e$ is the **back-EMF constant** (in $\\text{V}/(\\text{rad/s})$).\n\n**The Coherence of Units:**\nIn coherent SI units, the torque constant and back-EMF constant are numerically identical: $k_t = k_e$.\n\nApplying Kirchhoff's Voltage Law to the DC motor armature circuit:\n$$V = I R_a + L_a \\frac{dI}{dt} + E_b = I R_a + k_e \\omega$$\nIn steady-state operation ($dI/dt = 0$):\n$$V = I R_a + k_e \\omega$$\nMultiplying both sides by current $I$ yields the instantaneous power balance:\n$$V \\cdot I = I^2 R_a + E_b \\cdot I = I^2 R_a + (k_e \\omega) I = I^2 R_a + \\tau \\omega$$\nThis proves that the electrical power delivered ($V I$) splits cleanly into **thermal Joule heating** ($I^2 R_a$) and **useful mechanical work** ($P_{mech} = \\tau \\omega$)."
        },
        {
          heading: "2. Torque-Speed Characteristic, Stall Current & Maximum Power Point",
          text: "By rearranging the armature voltage equation for current $I = \\frac{V - k_e \\omega}{R_a}$ and substituting into $\\tau = k_t I$, we derive the fundamental linear **Torque-Speed Characteristic** of a permanent-magnet DC motor:\n$$\\tau(\\omega) = \\frac{k_t V}{R_a} - \\frac{k_t k_e}{R_a} \\omega = \\tau_{stall} \\left(1 - \\frac{\\omega}{\\omega_{no\\_load}}\\right)$$\n\n**Key Operational Boundary Conditions:**\n1. **Stall Condition ($\\omega = 0$):**\nWhen the shaft is held motionless under excessive load, back-EMF is zero ($E_b = 0$). The motor draws its absolute maximum current, the **stall current**:\n$$I_{stall} = \\frac{V}{R_a}, \\quad \\tau_{stall} = k_t I_{stall} = \\frac{k_t V}{R_a}$$\nAt stall, mechanical power is zero ($P_{mech} = \\tau \\cdot 0 = 0$). *100% of electrical power is dissipated as $I^2 R_a$ heat in the copper windings*, which quickly melts the insulation if not limited!\n\n2. **No-Load Condition ($\\tau = 0$):**\nWith no external mechanical resistance, the rotor accelerates until back-EMF nearly equals supply voltage:\n$$\\omega_{no\\_load} = \\frac{V}{k_e} = \\frac{V}{k_t}$$\n\n3. **Maximum Mechanical Power Point:**\nMechanical power is a quadratic function of shaft speed:\n$$P_{mech}(\\omega) = \\tau \\cdot \\omega = \\tau_{stall} \\left( \\omega - \\frac{\\omega^2}{\\omega_{no\\_load}} \\right)$$\nDifferentiating with respect to $\\omega$ and setting $\\frac{dP}{d\\omega} = 0$ yields the operating point for peak mechanical output:\n$$\\omega^* = \\frac{\\omega_{no\\_load}}{2}, \\quad \\tau^* = \\frac{\\tau_{stall}}{2}$$\n$$P_{max} = \\tau^* \\cdot \\omega^* = \\frac{\\tau_{stall} \\cdot \\omega_{no\\_load}}{4}$$\nAt this maximum power operating point, the electromechanical conversion efficiency is approximately $50\\%$, with the other $50\\%$ dissipated as heat."
        },
        {
          heading: "3. The Transmission Tradeoff & The Infinite Torque Paradox (Tutorial 6 Q1 & Q2)",
          text: "Suppose you feed an electric motor $10\\text{ Watts}$ of mechanical power. You are free to couple any gearbox you wish.\n\n**The Infinite Torque Question (Tutorial 6 Q1):**\nWhat is the absolute maximum torque you can extract? In an ideal lossless gearbox, mechanical power is strictly conserved:\n$$P = \\tau \\cdot \\omega \\implies \\tau = \\frac{P}{\\omega}$$\nAs the transmission reduction ratio $N \\to \\infty$, the output angular velocity $\\omega \\to 0$. As a result, the theoretical mathematical torque approaches **infinity** ($\\tau \\to \\infty$)!\n\n*Why cannot we lift a locomotive with a 10W motor?* In physical engineering, real transmissions are strictly bounded by:\n- **Shear Yield Strength ($\\tau_{yield}$):** Excessive torque shears the gear teeth or twists the output drive shaft.\n- **Frictional Efficiency ($\\eta$):** Worm drives and multi-stage planetary gearboxes experience sliding friction; as gear ratios escalate, efficiency drops to $30\\%-50\\%$, dissipating energy as heat.\n\n**Torque at 10 RPM (Tutorial 6 Q2):**\nIf the gearbox output spins at $10\\text{ RPM}$:\n$$\\omega = 10\\text{ RPM} \\times \\frac{2\\pi\\text{ rad}}{60\\text{ s}} = \\frac{\\pi}{3} \\approx 1.0472\\text{ rad/s}$$\n$$\\tau = \\frac{P}{\\omega} = \\frac{10\\text{ W}}{1.0472\\text{ rad/s}} = 9.549\\text{ N}\\cdot\\text{m} \\approx 9.55\\text{ N}\\cdot\\text{m}$$\nA $10\\text{ W}$ motor slowed to $10\\text{ RPM}$ produces almost $10\\text{ N}\\cdot\\text{m}$ of torque—enough to twist an unreinforced aluminum shaft!"
        },
        {
          heading: "4. Vehicle Dynamics Under Power Constraints (Tutorial 6 Q3)",
          text: "Consider a toy robot car with mass $m = 1\\text{ kg}$ traveling at linear speed $v = 1\\text{ m/s}$. The drive wheels are powered by a $10\\text{ W}$ motor. What instantaneous acceleration can you achieve?\n\n**Tractive Power & Force Relationship:**\nMechanical tractive power delivered to the wheels equals tractive push force multiplied by linear velocity:\n$$P = F \\cdot v \\implies F = \\frac{P}{v}$$\n\nAt $v = 1\\text{ m/s}$, the available tractive force is:\n$$F = \\frac{10\\text{ W}}{1\\text{ m/s}} = 10\\text{ Newtons}$$\n\nApplying Newton's Second Law ($F = m \\cdot a$):\n$$a = \\frac{F}{m} = \\frac{10\\text{ N}}{1\\text{ kg}} = 10\\text{ m/s}^2$$\n\n**The Speed-Acceleration Inversion Trap:**\nNotice that because available force is $F = P / v$, acceleration decays inversely with speed:\n$$a(v) = \\frac{P}{m \\cdot v}$$\n- At $v = 0.5\\text{ m/s}$, acceleration is $20\\text{ m/s}^2$ (limited only by tire traction and motor stall torque).\n- At $v = 5.0\\text{ m/s}$, acceleration drops to $\\frac{10}{1 \\times 5} = 2\\text{ m/s}^2$.\n- As speed increases, tractive force diminishes until it matches aerodynamic drag and rolling friction ($F = F_{drag}$), establishing terminal velocity."
        },
        {
          heading: "5. Thermodynamic Energy Accounting: Human Work, Food Calories & Boiling Water (Tutorial 5)",
          text: "Can a human pedaling a stationary generator boil off a pot of water? Tutorial 5 explores the rigorous thermodynamic accounting between work, calories, and human metabolic efficiency.\n\n**Calorie vs calorie (The Vital Distinction):**\n- $1\\text{ physics calorie (cal)}$: Heat required to raise $1\\text{ g}$ of water by $1^\\circ\\text{C}$ ($1\\text{ cal} \\approx 4.184\\text{ J}$).\n- $1\\text{ nutritional Calorie (kcal)}$: $1\\text{ Cal} = 1000\\text{ cal} = 4184\\text{ Joules}$.\n\n**Human Mechanical Energy Production:**\nA fit human working hard all day produces approximately $100\\text{ W}$ of sustained mechanical power over an $8\\text{ hour}$ workday:\n$$E_{work} = 100\\text{ W} \\times (8 \\times 3600\\text{ s}) = 2.88\\text{ MJ} = \\frac{2.88 \\times 10^6\\text{ J}}{4184\\text{ J/kcal}} \\approx 688\\text{ kcal}$$\n\n**Thermodynamic Energy to Vaporize Water:**\n- Sensible heat to raise water from room temperature ($25^\\circ\\text{C}$) to boiling ($100^\\circ\\text{C}$):\n$$\\Delta Q_{heat} = m \\cdot c_p \\cdot \\Delta T = m \\times 1\\text{ cal/(g}\\cdot^\\circ\\text{C)} \\times (100 - 25) = 75\\text{ cal/g} \\approx 314\\text{ J/g}$$\n- Latent heat of vaporization at $100^\\circ\\text{C}$:\n$$L_v \\approx 540\\text{ cal/g} \\approx 2260\\text{ J/g}$$\n- Total heat to convert $1\\text{ g}$ of liquid water at $25^\\circ\\text{C}$ into steam at $100^\\circ\\text{C}$:\n$$Q_{total} = 75 + 540 = 615\\text{ cal/g} \\approx 2573\\text{ J/g}$$\n\n**Mass of Water Boiled Off:**\n$$m_{water} = \\frac{2.88 \\times 10^6\\text{ J}}{2573\\text{ J/g}} \\approx 1119\\text{ g} \\approx 1.1\\text{ kg} \\quad (\\sim 1.1\\text{ Liters})$$\n*An entire day of exhausting human labor produces just enough energy to boil off one standard bottle of water!*\n\n**Metabolic Intake & Fat Burned:**\nHuman muscular efficiency when converting food energy to mechanical work is only $\\eta \\approx 25\\%$ (the remaining $75\\%$ is dissipated as body heat):\n$$E_{metabolic} = \\frac{688\\text{ kcal}}{0.25} = 2752\\text{ kcal}$$\n- **Bread Equivalent:** Bread has an energy density of $\\approx 3\\text{ kcal/g}$. To fuel this work, you must consume $\\frac{2752\\text{ kcal}}{3\\text{ kcal/g}} \\approx 917\\text{ g} \\approx 1\\text{ kg}$ of bread!\n- **Fat Burned:** Adipose fat has an energy density of $\\approx 9\\text{ kcal/g}$. If you pedal without eating, you burn:\n$$\\text{Fat Burned} = \\frac{2752\\text{ kcal}}{9\\text{ kcal/g}} \\approx 306\\text{ g} \\approx 300\\text{ g} \\quad (\\approx 38-40\\text{ g/hour})$$"
        },
        {
          heading: "6. Reflected Inertia in Transmissions & Battery Discharge Dynamics",
          text: "When an electric motor accelerates a high-inertia robot joint through a transmission, what inertia does the motor rotor actually feel? This concept of **Reflected Inertia** governs the acceleration and bandwidth of robotic actuators.\n\n**Derivation of Reflected Inertia:**\nConsider an arm link with rotational inertia $J_{load}$ coupled to a motor through a gearbox of reduction ratio $N = \\frac{\\omega_{motor}}{\\omega_{load}}$.\nThe total kinetic energy in the rotating system is:\n$$E_k = \\frac{1}{2} J_{motor} \\omega_{motor}^2 + \\frac{1}{2} J_{load} \\omega_{load}^2$$\nSubstituting $\\omega_{load} = \\frac{\\omega_{motor}}{N}$:\n$$E_k = \\frac{1}{2} \\left( J_{motor} + \\frac{J_{load}}{N^2} \\right) \\omega_{motor}^2$$\nTherefore, the effective inertia reflected to the motor shaft is:\n$$J_{ref} = \\frac{J_{load}}{N^2}$$\n*A 10:1 reduction ratio ($N = 10$) reduces the apparent load inertia felt by the motor by a factor of $100$ ($N^2$)!* This dramatic attenuation allows miniature, low-torque DC motors to accelerate heavy robotic limbs smoothly.\n\n**Real Battery Discharge Characteristics (Tutorial 5 Q5):**\nUnlike ideal voltage sources, electrochemical cells exhibit finite internal Thevenin impedance $r_b$ and rate-dependent capacity (Peukert's law). The terminal load voltage is:\n$$V_L = V_{open\\_circuit} - I \\cdot r_b$$\nWhen high motor stall currents are drawn, internal impedance causes severe voltage sag, frequently browning out the microcontroller. A pack of 3 standard alkaline AA batteries ($3 \\times 1.5\\text{ V} = 4.5\\text{ V}$) delivers $\\approx 2500\\text{ mAh}$ at modest discharge rates, providing up to $11.25\\text{ Wh}$ of energy—powering a $150\\text{ mW}$ Raspberry Pi Pico for over $68\\text{ hours}$ of continuous operation."
        },
        {
          heading: "7. DC Motor Graphical Analysis: Torque-Speed, Power Parabola, Current & Efficiency Curves",
          text: "Mastering mechatronic actuators requires interpreting the five canonical curves plotted on Cartesian speed axes $\\omega$ and velocity axes $v$:\n\n**1. The Linear Torque-Speed Characteristic ($\\tau$ vs $\\omega$):**\nRearranging the armature loop equation $V_s = I R_a + k_e \\omega$ for current and substituting into torque $\\tau = k_t I$ produces the downward-sloping linear load line:\n$$\\tau(\\omega) = \\frac{k_t V_s}{R_a} - \\left(\\frac{k_t k_e}{R_a}\\right)\\omega = \\tau_{stall} \\left(1 - \\frac{\\omega}{\\omega_{no\\_load}}\\right)$$\n- **Negative Slope ($-\\frac{k_t k_e}{R_a}$)**: Represents back-EMF velocity damping. Steeper slope means stiffer speed regulation against external load variations.\n- **Stall Torque ($\\tau_{stall} = \\frac{k_t V_s}{R_a}$)**: Maximum torque produced at zero rotational velocity ($\\omega = 0$).\n- **No-Load Speed ($\\omega_{no\\_load} = \\frac{V_s}{k_e}$)**: Maximum shaft speed reached when external resisting torque is zero.\n- **Load Matching Intersection**: When driving an external physical load, the steady-state cruising point is found graphically by plotting the load characteristic on the same axes. For a constant coulomb friction load (horizontal line $\\tau_{load} = C$) or a fan aerodynamic propeller load (quadratic parabola $\\tau_{load} = c_d \\omega^2$), the intersection with the motor load line determines the exact steady-state operating point $\\omega_{cruise}$.\n\n**2. The Mechanical Power Parabola ($P$ vs $\\omega$):**\nMechanical output power is the product of shaft torque and angular velocity:\n$$P_{mech}(\\omega) = \\tau(\\omega) \\cdot \\omega = \\tau_{stall} \\left(\\omega - \\frac{\\omega^2}{\\omega_{no\\_load}}\\right)$$\nThis forms an inverted parabola passing through $(0, 0)$ and $(\\omega_{no\\_load}, 0)$:\n- Differentiating $\\frac{dP}{d\\omega} = \\tau_{stall} \\left(1 - \\frac{2\\omega}{\\omega_{no\\_load}}\\right) = 0$ identifies the peak output operating point:\n$$\\omega^* = \\frac{\\omega_{no\\_load}}{2}, \\quad \\tau^* = \\frac{\\tau_{stall}}{2}$$\n$$P_{max} = \\tau^* \\cdot \\omega^* = \\frac{\\tau_{stall} \\cdot \\omega_{no\\_load}}{4} = \\frac{V_s^2}{4 R_a}$$\n- **Two Operational Regimes**:\n  - *Regime I ($0 \\le \\omega < \\omega^*/2$)*: Dangerous high-torque/low-speed region. Armature current is high ($I > 0.75 I_{stall}$), electromechanical efficiency is low ($< 25\\%$), and $I^2 R_a$ thermal dissipation is maximized. Continuous operation here burns the rotor insulation!\n  - *Regime II ($\\omega^* < \\omega \\le 0.9 \\omega_{no\\_load}$)*: Safe continuous operating region. High back-EMF limits current draw, minimizing thermal stress.\n\n**3. The Armature Current Line ($I$ vs $\\omega$):**\nBecause electrical current is directly proportional to torque ($I = \\tau / k_t$):\n$$I(\\omega) = \\frac{V_s - k_e \\omega}{R_a} = I_{stall} \\left(1 - \\frac{\\omega}{\\omega_{no\\_load}}\\right)$$\nThe current curve is a straight line sloping downward from $I_{stall} = \\frac{V_s}{R_a}$ down to no-load current $I_{no\\_load} \\approx 0$.\n\n**4. The Conversion Efficiency Curve ($\\eta$ vs $\\omega$):**\nElectromechanical conversion efficiency is the ratio of net mechanical power to electrical input power:\n$$\\eta(\\omega) = \\frac{P_{mech}(\\omega)}{P_{elec}(\\omega)} = \\frac{\\tau(\\omega) \\cdot \\omega}{V_s \\cdot I(\\omega)}$$\n- At stall ($\\omega = 0$), $\\eta = 0\\%$ because zero mechanical work is delivered despite massive electrical power intake ($V_s I_{stall}$).\n- At the maximum power operating point ($\\omega = \\omega_{no\\_load} / 2$), theoretical efficiency is exactly $50\\%$.\n- **Peak Efficiency Operating Point**: Peak efficiency (typically $75\\%-85\\%$) does NOT occur at $P_{max}$; it occurs at high speed (roughly $80\\%-85\\%$ of $\\omega_{no\\_load}$), where torque is moderate but $I^2 R_a$ Joule heating is negligible.\n- At no-load ($\\omega = \\omega_{no\\_load}$), efficiency drops back to $0\\%$ because net shaft output torque is zero.\n\n**5. Vehicle Tractive Force & Acceleration Curves ($F$ vs $v$ and $a$ vs $v$):**\nAt the vehicle drive wheels, constant power delivery translates to tractive force and acceleration:\n$$F(v) = \\frac{P}{v}, \\quad a(v) = \\frac{P}{m \\cdot v}$$\nPlotting $F$ vs $v$ yields a rectangular hyperbola. While mathematical force approaches infinity as $v \\to 0$, real physical robots are capped at low speeds by tire traction ($F_{traction} = \\mu m g$) and motor stall torque ($F_{stall} = \\frac{\\tau_{stall} N}{r_{wheel}}$), preventing infinite wheel slip."
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
        { id: "supplyVoltage", label: "Motor Supply Voltage", min: 3, max: 36, step: 1, default: 12, unit: "V" },
        { id: "armatureResistance", label: "Armature Resistance Ra", min: 0.5, max: 10, step: 0.5, default: 2.0, unit: "Ω" },
        { id: "vehicleSpeedMs", label: "Vehicle Velocity", min: 0.2, max: 10, step: 0.2, default: 1.0, unit: "m/s" },
        { id: "vehicleMassKg", label: "Vehicle Mass", min: 0.5, max: 10, step: 0.5, default: 1.0, unit: "kg" }
      ],
      quickQuest: {
        prompt: "From Tutorial 6: Set motor power to 10W and gearbox output speed to 10 RPM. Observe how output torque reaches exactly 9.55 N·m!",
        loadParams: { motorPowerWatts: 10, outputRpm: 10, supplyVoltage: 12, armatureResistance: 2.0, vehicleSpeedMs: 1.0, vehicleMassKg: 1.0 },
        expectedSummary: "Omega = 1.047 rad/s. Torque = 10W / 1.047 rad/s = 9.55 N·m. Vehicle acceleration at 1 m/s = 10 m/s²."
      }
    },
    practiceQuestions: [
      {
        id: "q-5-1",
        type: "nat",
        source: "Tutorial 6 Question 2",
        title: "Output Torque from 10W Motor at 10 RPM",
        prompt: "An electric motor delivers $10\\text{ W}$ of mechanical power into an ideal gearbox. The output shaft spins at $10\\text{ RPM}$ (revolutions per minute). Calculate the torque available at the output shaft in Newton-meters ($\\text{N}\\cdot\\text{m}$, rounded to 2 decimal places).",
        unit: "N·m",
        correctAnswer: 9.55,
        toleranceRange: [9.45, 9.65],
        explanation: "**Step 1: Convert Rotational Speed to Angular Velocity**\n$$\\omega = 10\\text{ RPM} \\times \\frac{2\\pi}{60} = \\frac{\\pi}{3} \\approx 1.0472\\text{ rad/s}$$\n\n**Step 2: Relate Power, Torque, and Speed**\nMechanical power is the product of torque and angular velocity:\n$$P = \\tau \\cdot \\omega \\implies \\tau = \\frac{P}{\\omega}$$\n\n**Step 3: Calculate Available Shaft Torque**\n$$\\tau = \\frac{10\\text{ W}}{1.0472\\text{ rad/s}} = 9.549\\text{ N}\\cdot\\text{m} \\approx 9.55\\text{ N}\\cdot\\text{m}$$"
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
        explanation: "**Step 1: Determine Tractive Force from Power**\nTractive power is the product of force and linear velocity:\n$$P = F \\cdot v \\implies F = \\frac{P}{v}$$\n$$F = \\frac{10\\text{ W}}{1\\text{ m/s}} = 10\\text{ N}$$\n\n**Step 2: Compute Acceleration via Newton's Second Law**\n$$a = \\frac{F}{m} = \\frac{10\\text{ N}}{1\\text{ kg}} = 10\\text{ m/s}^2$$"
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
        explanation: "**Step 1: Power Conservation Relationship**\nBecause power is conserved through an ideal transmission:\n$$P = \\tau \\cdot \\omega \\implies \\tau = \\frac{P}{\\omega}$$\n\n**Step 2: Asymptotic Gearbox Behavior**\nWith an arbitrarily large gear reduction ratio $N \\to \\infty$, the output angular velocity $\\omega \\to 0$. Consequently, the theoretical mathematical torque approaches infinity ($\\tau \\to \\infty$).\n\nIn physical hardware, practical torque is strictly limited by the shear yield strength of the gear teeth, keyways, and output shaft."
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
        explanation: "**Step 1: Calculate Total Mechanical Work**\n$$E_{work} = 100\\text{ W} \\times (8 \\times 3600\\text{ s}) = 2.88\\text{ MJ}$$\n$$E_{work} = \\frac{2.88 \\times 10^6\\text{ J}}{4184\\text{ J/kcal}} \\approx 688\\text{ kcal}$$\n\n**Step 2: Account for Human Metabolic Efficiency (~25%)**\nBecause human muscle converts food calories at roughly $25\\%$ efficiency:\n$$E_{metabolic} = \\frac{688\\text{ kcal}}{0.25} \\approx 2753\\text{ kcal}$$\n\n**Step 3: Calculate Mass of Body Fat Burned**\nBody fat has an energy density of approximately $9\\text{ kcal/g}$:\n$$\\text{Mass of Fat} = \\frac{2753\\text{ kcal}}{9\\text{ kcal/g}} \\approx 306\\text{ g} \\approx 300\\text{ g}$$"
      },
      {
        id: "q-5-5",
        type: "msq",
        source: "Lecture Quiz 9 & Motors Table",
        title: "Ideal vs Real Components in Mechatronics",
        prompt: "In the course comparison table (Lecture Quiz 9), which of the following correctly distinguish an 'Ideal' model from a 'Real' physical component?",
        options: [
          "Wire: Ideal wire has resistance $R = 0$ ($V = 0$ across it); Real wire has small series resistance $R$ where $V = I R$.",
          "Battery: Ideal battery has terminal voltage $V = V_b$ constant; Real battery has internal Thevenin resistance $r_b$ causing voltage to sag under load ($V = V_b - I r_b$).",
          "DC Motor: Ideal motor converts 100% of electrical power to mechanical work ($V I = \\tau \\omega$); Real motor has armature resistance $R_a$, back-EMF, and internal friction.",
          "Ideal motors draw zero current when stalled under infinite load."
        ],
        correctIndices: [0, 1, 2],
        explanation: "**Step 1: Analyzing Ideal vs Real Models**\nStatements A, B, and C are authentic comparisons from Lecture Quiz 9:\n\n- Ideal wires have zero resistance ($R=0$); real wires have finite copper trace resistance.\n- Ideal batteries maintain fixed terminal voltage; real batteries exhibit internal Thevenin impedance ($r_b$) causing terminal voltage sag under current draw.\n- Ideal motors convert $100\\%$ of electrical energy to mechanical work ($V I = \\tau \\omega$); real motors experience copper $I^2 R_a$ heating, brush friction, and core eddy losses.\n\n**Step 2: Stall Condition Analysis**\nStatement D is completely false: when stalled ($\\omega = 0$), back-EMF is zero, so the motor draws its absolute maximum current: $I_{stall} = \\frac{V}{R_a}$."
      },
      {
        id: "q-5-6",
        type: "nat",
        source: "DC Motor Dynamics & Power Mechanics",
        title: "DC Motor Maximum Mechanical Power Point",
        prompt: "A direct current (DC) motor has a stall torque $\\tau_{stall} = 2.0\\text{ N}\\cdot\\text{m}$ and a no-load angular velocity $\\omega_{no\\_load} = 300\\text{ rad/s}$. Assuming an ideal linear torque-speed characteristic, calculate the maximum mechanical power $P_{max}$ that the motor can output in Watts.",
        unit: "W",
        correctAnswer: 150,
        toleranceRange: [148, 152],
        explanation: "**Step 1: Linear Torque-Speed Relationship**\nThe torque-speed curve is modeled as:\n$$\\tau(\\omega) = \\tau_{stall} \\left( 1 - \\frac{\\omega}{\\omega_{no\\_load}} \\right)$$\n\n**Step 2: Formulate Mechanical Power Curve**\n$$P_{mech}(\\omega) = \\tau \\cdot \\omega = \\tau_{stall} \\left( \\omega - \\frac{\\omega^2}{\\omega_{no\\_load}} \\right)$$\n\n**Step 3: Find Maximum Power Point**\nDifferentiating and setting equal to zero yields the peak at half the no-load speed:\n$$\\omega^* = \\frac{\\omega_{no\\_load}}{2} = \\frac{300}{2} = 150\\text{ rad/s}$$\n$$\\tau^* = \\frac{\\tau_{stall}}{2} = \\frac{2.0}{2} = 1.0\\text{ N}\\cdot\\text{m}$$\n$$P_{max} = \\tau^* \\cdot \\omega^* = \\frac{\\tau_{stall} \\cdot \\omega_{no\\_load}}{4} = \\frac{2.0 \\times 300}{4} = 150\\text{ Watts}$$"
      },
      {
        id: "q-5-7",
        type: "mcq",
        source: "Mechatronics Transmission Dynamics",
        title: "Reflected Rotational Inertia in Gear Trains",
        prompt: "A robot arm link has rotational inertia $J_{load} = 0.50\\text{ kg}\\cdot\\text{m}^2$. It is coupled to a motor through a precision planetary gearbox with a speed reduction ratio $N = 10$ (where $\\omega_{motor} = 10 \\cdot \\omega_{load}$). What is the effective rotational inertia reflected back to the motor shaft?",
        options: [
          "$0.0050\\text{ kg}\\cdot\\text{m}^2$ (scaled down by $1/N^2 = 1/100$).",
          "$0.050\\text{ kg}\\cdot\\text{m}^2$ (scaled down by $1/N = 1/10$).",
          "$5.0\\text{ kg}\\cdot\\text{m}^2$ (scaled up by $N = 10$).",
          "$50.0\\text{ kg}\\cdot\\text{m}^2$ (scaled up by $N^2 = 100$)."
        ],
        correctIndex: 0,
        explanation: "**Step 1: Kinetic Energy Equivalence**\nThe rotational kinetic energy of the load is:\n$$E_{k, load} = \\frac{1}{2} J_{load} \\omega_{load}^2$$\n\n**Step 2: Relate Load Speed to Motor Speed**\nSince $\\omega_{load} = \\frac{\\omega_{motor}}{N}$:\n$$E_{k, load} = \\frac{1}{2} J_{load} \\left( \\frac{\\omega_{motor}}{N} \\right)^2 = \\frac{1}{2} \\left( \\frac{J_{load}}{N^2} \\right) \\omega_{motor}^2$$\n\n**Step 3: Calculate Reflected Inertia**\nThe apparent inertia reflected to the motor rotor is:\n$$J_{ref} = \\frac{J_{load}}{N^2} = \\frac{0.50\\text{ kg}\\cdot\\text{m}^2}{10^2} = \\frac{0.50}{100} = 0.0050\\text{ kg}\\cdot\\text{m}^2$$\nGear reduction dramatically reduces the inertia the motor rotor must accelerate!"
      },
      {
        id: "q-5-8",
        type: "nat",
        source: "DC Motor P-ω Graphical Analysis",
        title: "Maximum Power Point on Motor P-ω Parabola",
        prompt: "A DC motor's mechanical power is plotted against angular velocity $\\omega$. The curve forms an inverted parabola $P(\\omega) = \\tau_{stall}(\\omega - \\frac{\\omega^2}{\\omega_{no\\_load}})$. If $\\tau_{stall} = 4.0\\text{ N}\\cdot\\text{m}$ and $\\omega_{no\\_load} = 200\\text{ rad/s}$, calculate the shaft speed $\\omega^*$ in $\\text{rad/s}$ at which peak power $P_{max}$ occurs.",
        unit: "rad/s",
        correctAnswer: 100,
        toleranceRange: [98, 102],
        explanation: "**Step 1: Parabola Vertex Condition**\nThe peak of the quadratic power parabola occurs at exactly half of the no-load speed:\n$$\\omega^* = \\frac{\\omega_{no\\_load}}{2} = \\frac{200\\text{ rad/s}}{2} = 100\\text{ rad/s}$$\n\n**Step 2: Peak Power Verification**\n$$\\tau^* = \\frac{\\tau_{stall}}{2} = \\frac{4.0}{2} = 2.0\\text{ N}\\cdot\\text{m}$$\n$$P_{max} = \\tau^* \\cdot \\omega^* = 2.0 \\times 100 = 200\\text{ Watts}$$"
      },
      {
        id: "q-5-9",
        type: "mcq",
        source: "DC Motor Efficiency vs Power Curves",
        title: "Peak Efficiency Speed vs Peak Power Speed",
        prompt: "On the characteristic curves of a permanent-magnet DC motor, where does the operating point of maximum electromechanical conversion efficiency ($\\eta_{max}$) occur relative to the maximum power operating point ($\\omega^* = \\omega_{no\\_load}/2$)?",
        options: [
          "At a higher shaft speed (typically around $75\\%-85\\%$ of $\\omega_{no\\_load}$), where current and $I^2 R_a$ thermal losses are much lower.",
          "At the exact same speed $\\omega^* = \\omega_{no\\_load}/2$, because power and efficiency peak together.",
          "At zero speed (stall condition), because torque is maximized.",
          "At no-load speed $\\omega_{no\\_load}$, because back-EMF cancels all voltage."
        ],
        correctIndex: 0,
        explanation: "**Step 1: Efficiency vs Speed Formulation**\n$$\\eta(\\omega) = \\frac{\\tau(\\omega) \\cdot \\omega}{V_s \\cdot I(\\omega)}$$\nAt maximum power speed ($\\omega^* = \\omega_{no\\_load}/2$), efficiency is only $50\\%$ because substantial armature current ($I = I_{stall}/2$) causes significant $I^2 R_a$ Joule heating.\n\n**Step 2: Location of Peak Efficiency**\nAs speed increases above $\\omega^*$, current falls linearly, causing thermal copper losses ($I^2 R_a$) to drop quadratically. Consequently, peak efficiency (often $75\\%-85\\%$) occurs at higher speeds near $80\\%-85\\%$ of no-load speed, before falling to $0\\%$ at no-load."
      },
      {
        id: "q-5-10",
        type: "nat",
        source: "Tutorial 6 (Load Matching on τ-ω Plane)",
        title: "Steady-State Speed from Motor & Load Torque Intersection",
        prompt: "A DC motor has a linear torque-speed characteristic $\\tau(\\omega) = 12 - 0.04\\omega$ (where torque is in $\\text{N}\\cdot\\text{m}$ and $\\omega$ in $\\text{rad/s}$). It drives a conveyor belt exerting a constant resisting load torque $\\tau_{load} = 4.0\\text{ N}\\cdot\\text{m}$. Find the steady-state rotational speed $\\omega_{cruise}$ in $\\text{rad/s}$ at the graphical intersection.",
        unit: "rad/s",
        correctAnswer: 200,
        toleranceRange: [198, 202],
        explanation: "**Step 1: Set Motor Torque Equal to Load Torque**\nIn steady-state operation with zero angular acceleration ($J \\frac{d\\omega}{dt} = \\tau_{motor} - \\tau_{load} = 0$):\n$$\\tau(\\omega) = \\tau_{load}$$\n$$12 - 0.04\\omega = 4.0$$\n\n**Step 2: Solve for Cruising Speed**\n$$0.04\\omega = 12 - 4.0 = 8.0$$\n$$\\omega = \\frac{8.0}{0.04} = 200\\text{ rad/s}$$"
      }
    ],
    vault: {
      formulas: [
        { name: "Rotational Power", tex: "P = \\tau \\cdot \\omega \\quad [\\text{Watts} = \\text{N}\\cdot\\text{m} \\cdot \\text{rad/s}]" },
        { name: "Motor Torque-Speed Characteristic", tex: "\\tau(\\omega) = \\tau_{stall} \\left(1 - \\frac{\\omega}{\\omega_{no\\_load}}\\right) = \\frac{k_t V_s}{R_a} - \\frac{k_t k_e}{R_a} \\omega" },
        { name: "Mechanical Power Parabola", tex: "P(\\omega) = \\tau_{stall} \\left(\\omega - \\frac{\\omega^2}{\\omega_{no\\_load}}\\right) \\implies P_{max} = \\frac{\\tau_{stall} \\cdot \\omega_{no\\_load}}{4}" },
        { name: "Current-Speed Characteristic", tex: "I(\\omega) = \\frac{V_s - k_e \\omega}{R_a} = I_{stall}\\left(1 - \\frac{\\omega}{\\omega_{no\\_load}}\\right)" },
        { name: "Electromechanical Efficiency", tex: "\\eta(\\omega) = \\frac{P_{mech}}{P_{elec}} = \\frac{\\tau \\cdot \\omega}{V_s \\cdot I}" },
        { name: "Angular Velocity from RPM", tex: "\\omega = \\text{RPM} \\times \\frac{2\\pi}{60} = \\frac{\\pi \\cdot \\text{RPM}}{30} \\quad [\\text{rad/s}]" },
        { name: "Tractive Power & Acceleration", tex: "P = F \\cdot v = (m \\cdot a) \\cdot v \\implies a = \\frac{P}{m \\cdot v}" },
        { name: "DC Motor Voltage Equilibrium", tex: "V = I R_a + k_e \\omega, \\quad \\tau = k_t I - \\tau_{friction}" },
        { name: "Reflected Rotational Inertia", tex: "J_{ref} = \\frac{J_{load}}{N^2}" },
        { name: "Water Vaporization Energy", tex: "Q = m \\cdot (c_p \\Delta T + L_v) \\approx m \\cdot (75 + 540) \\cdot 4.184\\text{ J/g}" }
      ],
      pitfalls: [
        {
          title: "The Zero-Speed Power Fallacy",
          desc: "At stall speed ($v = 0$ or $\\omega = 0$), mechanical power output is ZERO, yet electrical power dissipation ($I^2 R_a$) is at its absolute maximum!"
        },
        {
          title: "Gearbox Back-Drivability",
          desc: "High reduction gearboxes (especially worm drives) cannot be back-driven by external forces. Trying to force robot wheels to turn by hand can strip internal gears."
        },
        {
          title: "Calorie vs calorie Confusion",
          desc: "1 nutritional food Calorie (capital C) equals 1000 thermodynamic physics calories (1 kcal = 4184 Joules)."
        },
        {
          title: "Stall Current Thermal Runaway",
          desc: "Leaving a DC motor stalled at full voltage for more than a few seconds burns the copper windings because cooling fans stop spinning while current is maximized."
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
      "Wheatstone Bridge Piezoresistive Law: Differential output voltage is directly proportional to strain: $\\Delta V = V_{excitation} \\cdot \\frac{GF \\cdot \\epsilon}{4}$.",
      "Quadrature Phase Offset: Channel A and Channel B of an incremental encoder are shifted by exactly $90^\\circ$ ($\\pi/2\\text{ rad}$), enabling direction decoding via state transition order.",
      "HX711 24-Bit Quantization: Provides $2^{24} = 16{,}777{,}216$ counts, resolving microvolt-level bridge strain signals without external instrumentation amplifiers."
    ],
    commonPitfalls: [
      "Failing to tare (zero) the load cell before taking differential weight measurements.",
      "Missing edge transitions in quadrature encoders by polling pins in a slow software loop instead of using hardware interrupts.",
      "Applying shear or torsional force to a single-point bending beam load cell, which permanently bends the metal spring element."
    ],
    story: {
      summary: "Explore precision force, weight, position, and speed instrumentation in mechatronics. Based directly on Labs 6, 7, and 8, we master piezoresistive strain gauges, full-bridge Wheatstone topologies, HX711 24-bit delta-sigma ADCs, two-point digital calibration, and optical quadrature encoder state machine decoding.",
      sections: [
        {
          heading: "1. Piezoresistive Physics & Strain Gauge Transduction",
          text: "A **strain gauge** converts mechanical deformation into a measurable change in electrical resistance. It consists of an etched constantan metal foil grid bonded to a thin polyimide flexible backing.\n\nFrom solid-state physics, the electrical resistance of a conductor is:\n$$R = \\rho \\frac{L}{A}$$\nWhere $\\rho$ is resistivity, $L$ is conductor length, and $A$ is cross-sectional area. When a mechanical load stresses the material, it undergoes tensile strain $\\epsilon = \\frac{\\Delta L}{L}$. As the wire stretches, its length increases while its cross-sectional area shrinks due to **Poisson's contraction** ($\\nu \\approx 0.3$).\n\nDifferentiating the resistance formula yields the fractional change in resistance:\n$$\\frac{\\Delta R}{R} = (1 + 2\\nu) \\cdot \\epsilon + \\frac{\\Delta \\rho}{\\rho} = GF \\cdot \\epsilon$$\nWhere $GF$ is the **Gauge Factor** (the dimensionless strain sensitivity metric):\n- For standard metallic foil (Constantan / Karma): $GF \\approx 2.0$.\n- For semiconductor silicon gauges: $GF \\approx 100 - 150$.\n\n**The Microvolt Challenge:**\nTypical elastic deformations in structural aluminum are tiny—on the order of $1000\\,\\mu\\epsilon$ ($0.1\\%$ elongation). For a standard $350\\ \\Omega$ strain gauge:\n$$\\Delta R = 350\\ \\Omega \\times 2.0 \\times (1000 \\times 10^{-6}) = 0.70\\ \\Omega$$\nMeasuring a $0.70\\ \\Omega$ change on a $350\\ \\Omega$ base resistance requires specialized bridge circuits."
        },
        {
          heading: "2. Wheatstone Bridge Topologies: Quarter, Half & Full-Bridge Comparison",
          text: "Why can't we simply connect a strain gauge to an ohmmeter? The copper lead wire resistance ($R_{wire}$) drifts with temperature, creating resistance changes that dwarf the minute mechanical $\\Delta R$! We solve this by placing strain gauges inside a **Wheatstone Bridge**.\n\n**Comparison of Bridge Configurations:**\n\n1. **Quarter-Bridge (1 Active Gauge, 3 Fixed Resistors):**\n$$\\frac{V_o}{V_{excitation}} \\approx \\frac{1}{4} GF \\cdot \\epsilon$$\n*Disadvantage:* Highly susceptible to thermal drift, as temperature changes in the single active gauge are indistinguishable from mechanical strain.\n\n2. **Half-Bridge (2 Active Gauges: 1 Tension $+\\epsilon$, 1 Compression $-\\epsilon$):**\n$$\\frac{V_o}{V_{excitation}} = \\frac{1}{2} GF \\cdot \\epsilon$$\n*Advantages:* Doubles sensitivity ($2\\times$) and achieves automatic thermal compensation: ambient temperature changes cause both gauges to expand equally, canceling out common-mode resistance drift.\n\n3. **Full-Bridge (4 Active Gauges: 2 Tension $+\\epsilon$, 2 Compression $-\\epsilon$):**\n$$\\frac{V_o}{V_{excitation}} = GF \\cdot \\epsilon$$\n*Advantages:*\n- **$4\\times$ Sensitivity:** Four times the signal output of a quarter-bridge.\n- **Complete Temperature Rejection:** Thermal drifts in all four arms cancel perfectly.\n- **Bending & Axial Decoupling:** Bending strains add constructively while unwanted axial tension or torsion loads cancel out symmetrically."
        },
        {
          heading: "3. Single-Point Bending Beam Load Cells & Elastic Spring Elements",
          text: "A commercial **Load Cell** packages a precision metal spring element (machined from aircraft aluminum alloy or stainless steel) with four matched foil strain gauges bonded in a full-bridge circuit.\n\n**The Parallelogram (Binocular) Flexure Geometry:**\nIn a single-point bending beam load cell, the spring body features a specialized binocular cutout resembling a parallel linkage. When a vertical weight $W$ is applied at the cantilever tip:\n- The parallel cutout forces the thin flexure regions into **double reverse-curvature bending** (S-shape).\n- Two gauges on the top flexures experience pure tensile strain ($+\\epsilon$).\n- Two gauges on the bottom flexures experience pure compressive strain ($-\\epsilon$).\n\n**Off-Center Load Invariance:**\nBecause the parallelogram structure decouples the vertical downward force from the moment arm, placing a mass on the front edge, rear edge, or center of the weighing platform produces the identical vertical shearing force and strain distribution across the flexures. This ensures uniform weight measurement independent of load placement."
        },
        {
          heading: "4. The HX711 24-Bit Sigma-Delta ADC & Two-Point Calibration Pipeline",
          text: "A load cell rated at sensitivity $S = 2.0\\text{ mV/V}$ excited by $V_{excitation} = 5.0\\text{ V}$ produces a full-scale differential output of only:\n$$\\Delta V_{FS} = 2.0\\text{ mV/V} \\times 5.0\\text{ V} = 10.0\\text{ mV}$$\nA $12\\text{ -bit}$ microcontroller ADC with a $3.3\\text{ V}$ range has a step size of $3.3 / 4096 \\approx 0.8\\text{ mV}$—meaning a $5\\text{ kg}$ scale would have an unacceptably coarse resolution of $400\\text{ g}$!\n\n**The HX711 Instrumentation Architecture:**\nThe **HX711** IC combines:\n1. An ultra-low-noise **Programmable Gain Amplifier (PGA)** with selectable gain of $128\\times$ or $64\\times$.\n2. A high-resolution **24-bit Sigma-Delta ($\\Sigma\\Delta$) ADC** yielding $2^{24} = 16{,}777{,}216$ quantization counts.\nWith $128\\times$ gain on a $5\\text{ V}$ supply, the full-scale differential input range is $\\pm 20\\text{ mV}$, resolving signal changes down to less than $2.4\\text{ nV}$ per count!\n\n**Two-Point Software Calibration Pipeline (Labs 6-8):**\n1. **Tare Calibration (Zero Baseline):** Record the raw unladen count value:\n$$\\text{Tare} = \\text{Raw}_{empty}$$\n2. **Sensitivity Scale Calibration:** Place a known precision calibration mass $W_{cal}$ (e.g. $500.0\\text{ g}$) and record $\\text{Raw}_{cal}$:\n$$k = \\frac{\\text{Raw}_{cal} - \\text{Tare}}{W_{cal}} \\quad [\\text{counts/gram}]$$\n3. **Live Measurement Evaluation:** For any subsequent unknown reading:\n$$W_{net} = \\frac{\\text{Raw}_{measured} - \\text{Tare}}{k} \\quad [\\text{grams}]$$"
        },
        {
          heading: "5. Quadrature Rotary Encoders: 1x, 2x, and 4x Edge Decoding State Machines",
          text: "To measure motor angular displacement and velocity in closed-loop robotics, we mount **Incremental Quadrature Encoders**. The encoder disc features alternating transparent and opaque radial slits read by two optical photo-interrupters.\n\n**The Quadrature $90^\\circ$ Phase Shift:**\nThe two output channels, **Channel A** and **Channel B**, generate square waves offset by exactly $90^\\circ$ of electrical phase ($\\pi/2\\text{ radians}$):\n- **Clockwise (Forward) Rotation:** Channel A leads Channel B (Phase sequence: $00 \\to 10 \\to 11 \\to 01 \\to 00$).\n- **Counter-Clockwise (Reverse) Rotation:** Channel B leads Channel A (Phase sequence: $00 \\to 01 \\to 11 \\to 10 \\to 00$).\n\n**Edge Decoding Multipliers:**\nDepending on which edges the microcontroller tracks, resolution is dramatically amplified:\n- **1x Decoding:** Counts only rising edges of Channel A (Resolution $= 1 \\times \\text{PPR}$). Direction determined by checking B's state at A's rising edge.\n- **2x Decoding:** Counts both rising and falling edges of Channel A (Resolution $= 2 \\times \\text{PPR}$).\n- **4x Decoding:** Counts every state transition (both rising and falling edges of BOTH Channel A and Channel B). A $500\\text{ PPR}$ encoder yields $4 \\times 500 = 2000\\text{ counts per revolution}$! This provides an angular resolution of $\\frac{360^\\circ}{2000} = 0.18^\\circ$ per tick."
        },
        {
          heading: "6. Real-Time Embedded Mechatronics: Hardware Interrupts vs Polling at High RPM",
          text: "How fast do encoder signals switch in real robots? Let us calculate the pulse switching frequency:\n$$f_{pulse} = \\frac{\\text{RPM} \\times \\text{PPR}}{60} \\quad [\\text{Hz}]$$\n\n**The High-Speed Polling Trap:**\nConsider a mobile robot motor spinning at $1200\\text{ RPM}$ with a $500\\text{ PPR}$ encoder:\n$$f_{pulse} = \\frac{1200 \\times 500}{60} = 10{,}000\\text{ Hz} = 10\\text{ kHz}$$\nWith $4\\times$ decoding, edge transitions occur at $40\\text{ kHz}$—one edge every **$25\\,\\mu\\text{s}$**!\n\nIf firmware attempts to poll the GPIO pins inside a standard MicroPython or Arduino `loop()` containing `delay()`, math routines, or sensor reads, the CPU will fail the Nyquist sampling condition, missing hundreds of ticks. This leads to massive positional errors and unstable PID speed control.\n\n**Robust Engineering Implementations:**\n1. **Hardware Interrupt Service Routines (ISRs):** Configure GPIO edge-triggered interrupts (`attachInterrupt()` in C++ or `pin.irq()` in MicroPython) that execute in $< 1\\,\\mu\\text{s}$.\n2. **Hardware Quadrature Decoder Counters (QEI):** Many microcontrollers include dedicated hardware counter timers that decode A/B quadrature in silicon without CPU intervention.\n3. **Raspberry Pi Pico PIO (Programmable I/O):** Run an autonomous 4-instruction PIO assembly state machine on RP2040 dedicated I/O coprocessors, decoding up to $30\\text{ MHz}$ pulse streams with zero ARM CPU load!"
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
        prompt: "A digital scale using an HX711 records a raw zero-load tare reading of $120{,}000$ counts. When a known $500\\text{ g}$ calibration weight is placed on the scale, the reading becomes $330{,}000$ counts. Later, an unknown object produces a reading of $540{,}000$ counts. What is the weight of the unknown object in grams?",
        unit: "g",
        correctAnswer: 1000,
        toleranceRange: [998, 1002],
        explanation: "**Step 1: Determine Calibration Sensitivity ($k$)**\nSubtract the tare baseline reading from the calibration reading:\n$$\\Delta \\text{Counts}_{cal} = 330{,}000 - 120{,}000 = 210{,}000\\text{ counts}$$\n$$k = \\frac{\\Delta \\text{Counts}_{cal}}{W_{cal}} = \\frac{210{,}000\\text{ counts}}{500\\text{ g}} = 420\\text{ counts/g}$$\n\n**Step 2: Compute Net Weight of Unknown Object**\nSubtract the tare offset from the unknown reading and divide by sensitivity $k$:\n$$\\Delta \\text{Counts}_{target} = 540{,}000 - 120{,}000 = 420{,}000\\text{ counts}$$\n$$\\text{Weight} = \\frac{420{,}000\\text{ counts}}{420\\text{ counts/g}} = 1000\\text{ g}$$"
      },
      {
        id: "q-6-2",
        type: "mcq",
        source: "Course Outline & Encoder Principles",
        title: "Quadrature Encoder Direction Decoding",
        prompt: "Why are the two signal channels (A and B) of a rotary encoder placed in quadrature ($90^\\circ$ electrical phase offset)?",
        options: [
          "To allow the microcontroller to determine the direction of rotation (clockwise vs counter-clockwise) by detecting which channel transitions first.",
          "To double the maximum operating voltage of the motor driver.",
          "To eliminate the need for common ground between encoder and microcontroller.",
          "Because single-channel encoders cannot measure speed above 10 RPM."
        ],
        correctIndex: 0,
        explanation: "**Step 1: Quadrature Phase Offset Mechanism**\nChannels A and B produce square waves shifted by $90^\\circ$ electrical phase ($\\pi/2\\text{ rad}$).\n\n**Step 2: Direction Decoding Logic**\n- **Clockwise (Forward)**: Channel A transitions before Channel B (A leads B).\n- **Counter-Clockwise (Reverse)**: Channel B transitions before Channel A (B leads A).\n\n**Step 3: Edge Decoding Multiplier**\nDetecting all rising and falling edges on both channels ($4\\times$ decoding) quadruples angular resolution ($4 \\times \\text{PPR}$)."
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
        explanation: "**Step 1: Sensitivity Quadrupling**\nIn a full-bridge circuit with two strain gauges in tension and two in compression, the differential output voltage is four times that of a quarter bridge:\n$$\\Delta V = V_{excitation} \\cdot (GF \\cdot \\epsilon)$$\n\n**Step 2: Temperature & Axial Load Compensation**\nBecause all four strain gauges experience identical ambient thermal expansion, the bridge resistance drifts symmetrically, canceling temperature errors and unwanted axial bending moments.\n\n**Step 3: Excitation Requirement**\nA Wheatstone bridge is a passive resistive network and strictly requires external DC excitation voltage ($V_{excitation}$)."
      },
      {
        id: "q-6-4",
        type: "nat",
        source: "Mechatronics Encoders & Signal Acquisition",
        title: "Quadrature Encoder Pulse Frequency Calculation",
        prompt: "A mobile robot motor spins at a speed of $1200\\text{ RPM}$. It is fitted with an incremental encoder with a resolution of $500\\text{ PPR}$ (pulses per revolution per channel). Calculate the pulse frequency on Channel A in Hertz ($\\text{Hz}$).",
        unit: "Hz",
        correctAnswer: 10000,
        toleranceRange: [9900, 10100],
        explanation: "**Step 1: Pulse Frequency Formula**\nThe frequency of the square wave on an encoder channel is the number of revolutions per second multiplied by the pulses per revolution:\n$$f = \\frac{\\text{RPM} \\times \\text{PPR}}{60}$$\n\n**Step 2: Numerical Substitution**\nWith $\\text{RPM} = 1200$ and $\\text{PPR} = 500$:\n$$f = \\frac{1200 \\times 500}{60} = 20 \\times 500 = 10{,}000\\text{ Hz} = 10\\text{ kHz}$$\nEach cycle lasts $100\\,\\mu\\text{s}$, requiring interrupt service routines or hardware timers capable of processing rapid pulse trains without missing edges."
      },
      {
        id: "q-6-5",
        type: "nat",
        source: "Load Cell Instrumentation & HX711 Specifications",
        title: "Full-Scale Differential Output of Load Cell",
        prompt: "A precision single-point bending beam load cell is rated at sensitivity $S = 2.0\\text{ mV/V}$. If the Wheatstone bridge is powered by an excitation voltage $V_{excitation} = 5.0\\text{ V}$, calculate the maximum differential full-scale output voltage $\\Delta V_{FS}$ across the signal terminals in millivolts ($\\text{mV}$).",
        unit: "mV",
        correctAnswer: 10,
        toleranceRange: [9.9, 10.1],
        explanation: "**Step 1: Load Cell Rated Sensitivity Definition**\nRated sensitivity $S$ is expressed in millivolts of output per Volt of excitation at maximum rated capacity:\n$$\\Delta V_{FS} = S \\cdot V_{excitation}$$\n\n**Step 2: Numerical Substitution**\nWith $S = 2.0\\text{ mV/V}$ and $V_{excitation} = 5.0\\text{ V}$:\n$$\\Delta V_{FS} = 2.0\\text{ mV/V} \\times 5.0\\text{ V} = 10.0\\text{ mV}$$\nThis tiny $10\\text{ mV}$ full-scale span illustrates why high-gain instrumentation amplifiers like the HX711 ($128\\times$ gain) are essential."
      },
      {
        id: "q-6-6",
        type: "mcq",
        source: "Rotary Encoder Decoding Principles",
        title: "Quadrature 4x Edge Decoding Resolution",
        prompt: "An incremental quadrature encoder produces 360 cycles (pulses) per revolution per channel on Channel A and Channel B. When connected to a microcontroller decoding all rising and falling edges of both channels (4x quadrature decoding), how many discrete counts will be registered per full $360^\\circ$ mechanical revolution?",
        options: [
          "1440 counts ($4 \\times 360$).",
          "720 counts ($2 \\times 360$).",
          "360 counts ($1 \\times 360$).",
          "90 counts ($360 / 4$)."
        ],
        correctIndex: 0,
        explanation: "**Step 1: Quadrature State Transitions**\nIn each electrical cycle of a quadrature encoder, there are four distinct state transitions:\n1. Channel A rising edge\n2. Channel B rising edge\n3. Channel A falling edge\n4. Channel B falling edge\n\n**Step 2: Total Counts Calculation**\nDecoding all 4 transitions per cycle yields:\n$$\\text{Total Counts} = 4 \\times \\text{PPR} = 4 \\times 360 = 1440\\text{ counts/revolution}$$\nThis improves angular measurement resolution to $\\frac{360^\\circ}{1440} = 0.25^\\circ$ per count!"
      }
    ],
    vault: {
      formulas: [
        { name: "Strain Gauge Resistance Change", tex: "\\frac{\\Delta R}{R} = GF \\cdot \\epsilon" },
        { name: "Full-Bridge Output Voltage", tex: "V_o = V_{excitation} \\cdot GF \\cdot \\epsilon" },
        { name: "HX711 Full-Scale Voltage", tex: "\\Delta V_{FS} = S \\cdot V_{excitation} \\quad [\\text{mV}]" },
        { name: "Calibrated Net Weight", tex: "W = \\frac{\\text{Raw Counts} - \\text{Tare}}{\\text{Calibration Factor}}" },
        { name: "Encoder Pulse Frequency", tex: "f = \\frac{\\text{RPM} \\times \\text{PPR}}{60} \\quad [\\text{Hz}]" },
        { name: "Quadrature 4x Resolution", tex: "\\text{Counts Per Revolution (4x)} = 4 \\times \\text{PPR}" }
      ],
      pitfalls: [
        {
          title: "Creep and Hysteresis",
          desc: "Metal load cell beams exhibit slight elastic creep under sustained heavy loads. Calibrate using weights applied for a standard settling time."
        },
        {
          title: "Missing Interrupts Under High RPM",
          desc: "At high RPM, encoder pulse frequencies exceed 10 kHz. Reading encoder pins in a slow software polling loop misses edge ticks, causing severe odometry drift. Use hardware interrupts or PIO."
        },
        {
          title: "Side-Loading & Torsional Damage",
          desc: "Single-point load cells are calibrated for pure vertical force. Subjecting them to lateral shear or twisting moments can permanently warp the internal aluminum flexures."
        },
        {
          title: "HX711 Digital Ground Noise",
          desc: "Because the HX711 resolves nanovolts, poor PCB ground routing or unshielded signal wires will inject 50Hz/60Hz AC mains hum directly into the low-order ADC bits."
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
      "Perspective Projection: 3D coordinates $(X, Y, Z)$ map to 2D image coordinates via division by depth $Z$: $u = f_x \\frac{X}{Z} + c_x, \\quad v = f_y \\frac{Y}{Z} + c_y$.",
      "Camera Calibration Matrix $\\mathbf{K}$: Encapsulates intrinsic geometry: focal lengths $(f_x, f_y)$, principal point offset $(c_x, c_y)$, and skew ($s \\approx 0$).",
      "Scale Ambiguity: A single monocular camera cannot determine metric depth $Z$ without an external scale prior or stereo baseline."
    ],
    commonPitfalls: [
      "Assuming a larger object in pixel space is necessarily larger in 3D (it could simply be closer to the camera).",
      "Neglecting radial lens distortion at the edges of wide-angle camera images.",
      "Treating camera projection as an invertible linear matrix without knowing depth $Z$."
    ],
    story: {
      summary: "Understand the mathematical bridge between the 3D continuous world and 2D discrete pixel arrays. Based directly on Stanford CS231A camera models and Dudek & Jenkin, we unpack pinhole ray geometry, pixel coordinate conversions, intrinsic calibration matrices, lens distortion models, monocular scale ambiguity, and binocular stereo disparity.",
      sections: [
        {
          heading: "1. The Pinhole Camera Geometry & Perspective Division by Depth Z",
          text: "The **Pinhole Camera** is the foundational geometric model of computer and robot vision. Light reflected from a continuous 3D world point $\\mathbf{P} = [X, Y, Z]^T$ (expressed in the camera coordinate frame where the $Z$-axis points along the optical axis into the scene) passes through an infinitesimally small aperture (the pinhole at origin $(0,0,0)$) and impinges onto an image plane located at focal distance $f$.\n\nBy similar triangles:\n$$x_{sensor} = f \\frac{X}{Z}, \\quad y_{sensor} = f \\frac{Y}{Z}$$\n\n**The Non-Linear Perspective Division:**\nNotice the defining mathematical operation of 3D vision: **perspective division by depth $Z$**.\n- Objects twice as far away ($2Z$) project to exactly half their image size.\n- Lines parallel in 3D Euclidean space converge toward a **vanishing point** on the image horizon.\n- Because division by $Z$ destroys metric scale, perspective projection is non-linear in Euclidean Cartesian coordinates."
        },
        {
          heading: "2. Sensor Discretization, Pixel Pitch & Focal Lengths in Pixels",
          text: "Physical image sensors (CMOS/CCD) do not measure in millimeters—they consist of a rectangular 2D array of discrete photodiodes outputting integer pixel coordinates $(u, v)$.\n\n**Converting Millimeters to Pixels:**\nLet $s_x$ and $s_y$ be the physical dimensions of an individual pixel element (the **pixel pitch**, typically $1.4\\,\\mu\\text{m} - 3.75\\,\\mu\\text{m}$). The pixel densities (pixels per unit length) are:\n$$k_u = \\frac{1}{s_x}, \\quad k_v = \\frac{1}{s_y}$$\nMultiplying physical focal length $f$ (in mm) by pixel density yields **focal lengths in pixel units**:\n$$f_x = f \\cdot k_u, \\quad f_y = f \\cdot k_v$$\n\n**Principal Point Offset ($c_x, c_y$):**\nDigital image coordinate conventions place the origin $(0, 0)$ at the **top-left corner** of the pixel array, whereas the optical axis intersects near the physical center of the sensor chip. We define $(c_x, c_y)$ as the **principal point coordinates** in pixels (for a $640 \\times 480$ sensor, typically $c_x \\approx 320, c_y \\approx 240$).\n\nThe complete pixel projection mapping is:\n$$u = f_x \\frac{X}{Z} + c_x, \\quad v = f_y \\frac{Y}{Z} + c_y$$"
        },
        {
          heading: "3. The Camera Calibration Matrix K & Homogeneous Coordinates",
          text: "To represent the non-linear perspective division as a linear matrix multiplication, we transition to **Homogeneous Coordinates**:\n$$\\mathbf{P}_{cam} = \\begin{bmatrix} X \\\\ Y \\\\ Z \\\\ 1 \\end{bmatrix}, \\quad \\mathbf{p}_{pixel} = \\begin{bmatrix} u \\\\ v \\\\ 1 \\end{bmatrix}$$\n\n**The Intrinsic Calibration Matrix K:**\n$$\\lambda \\begin{bmatrix} u \\\\ v \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} f_x & s & c_x \\\\ 0 & f_y & c_y \\\\ 0 & 0 & 1 \\end{bmatrix} \\begin{bmatrix} X \\\\ Y \\\\ Z \\end{bmatrix} = \\mathbf{K} \\mathbf{P}_{cam}$$\nWhere $\\lambda = Z$ is the projective scale factor. The $3 \\times 3$ upper-triangular matrix $\\mathbf{K}$ has **5 degrees of freedom**:\n1. $f_x$: Horizontal focal length in pixels.\n2. $f_y$: Vertical focal length in pixels.\n3. $c_x$: Horizontal principal point offset.\n4. $c_y$: Vertical principal point offset.\n5. $s$: Skew parameter ($s = f_x \\cot \\theta$, which is zero for modern rectangular orthogonal pixel sensors).\n\n**World to Pixel Transformation (Extrinsics):**\nWhen points are specified in an arbitrary global world frame $\\mathbf{P}_w$, we multiply by the **Extrinsic Matrix** $[\\mathbf{R} \\mid \\mathbf{t}]$ (a $3 \\times 3$ rotation matrix and $3 \\times 1$ translation vector representing the robot camera pose):\n$$\\lambda \\begin{bmatrix} u \\\\ v \\\\ 1 \\end{bmatrix} = \\mathbf{K} \\begin{bmatrix} \\mathbf{R} & \\mathbf{t} \\end{bmatrix} \\begin{bmatrix} X_w \\\\ Y_w \\\\ Z_w \\\\ 1 \\end{bmatrix}$$"
        },
        {
          heading: "4. Optical Lens Distortions: Radial & Tangential Polynomial Models",
          text: "Ideal pinholes admit so few photons that exposures require seconds of integration time. Real robotics cameras place compound glass lenses over the sensor to focus large amounts of light, introducing optical geometric distortions.\n\n**Radial Distortion (Barrel vs Pincushion):**\nCaused by variations in refractive power across the curved spherical lens profile:\n- **Barrel Distortion ($k_1 < 0$):** Image magnification decreases with distance from optical axis. Common in wide-angle and fisheye lenses; straight lines bend outward like the sides of a barrel.\n- **Pincushion Distortion ($k_1 > 0$):** Magnification increases with radial distance; corners pull outward.\n\nThe Brown-Conrady polynomial model corrects normalized sensor coordinates $(x = X/Z, y = Y/Z)$:\n$$r^2 = x^2 + y^2$$\n$$x_{corrected} = x (1 + k_1 r^2 + k_2 r^4 + k_3 r^6)$$\n$$y_{corrected} = y (1 + k_1 r^2 + k_2 r^4 + k_3 r^6)$$\n\n**Tangential Distortion ($p_1, p_2$):**\nOccurs when the lens assembly is not perfectly parallel to the silicon CMOS die.\n\n**Zhang's Checkerboard Calibration (OpenCV):**\nBy photographing a planar checkerboard with known square dimensions from 15-20 different angles, an optimization algorithm computes $\\mathbf{K}$ and the 5 distortion parameters $(k_1, k_2, p_1, p_2, k_3)$, enabling real-time image undistortion (`cv2.undistort()`)."
        },
        {
          heading: "5. The Monocular Scale Ambiguity & Stereo Vision Disparity",
          text: "Why can't an autonomous vehicle determine an obstacle's distance from a single camera frame? **Monocular Scale Ambiguity** is an inescapable property of perspective division:\n$$\\frac{\\alpha X}{\\alpha Z} = \\frac{X}{Z}, \\quad \\frac{\\alpha Y}{\\alpha Z} = \\frac{Y}{Z}$$\nEvery point along the 3D ray through the optical center projects to the exact same pixel $(u, v)$. A small toy car 1 meter away produces the identical pixel bounding box as a full-sized SUV 10 meters away!\n\n**Binocular Stereo Vision Triangulation:**\nWe resolve depth ambiguity by mounting two cameras side-by-side separated by a rigid horizontal baseline distance $B$.\n- Let both cameras have identical focal length $f$ and parallel optical axes.\n- A 3D point $\\mathbf{P}$ appears at horizontal pixel $u_L$ in the left camera and $u_R$ in the right camera.\n- The difference in position is the **Disparity** ($d$):\n$$d = u_L - u_R$$\n\nBy similar triangles, metric depth $Z$ is inversely proportional to disparity:\n$$Z = \\frac{f \\cdot B}{d}$$\n**Engineering Tradeoffs in Stereo:**\n- **Long Baseline ($B \\uparrow$):** Increases depth precision at long ranges, but enlarges the near-field blind zone where left and right fields of view fail to overlap.\n- **Inverse Disparity Resolution:** Depth resolution degrades quadratically with distance ($\\Delta Z \\approx \\frac{Z^2}{f B} \\Delta d$). Stereo cameras are highly accurate up close ($< 5\\text{ m}$) but become coarse at long ranges."
        },
        {
          heading: "6. Active Depth Sensing: Time-of-Flight (ToF) Cameras, Structured Light & LiDAR",
          text: "Passive stereo vision requires distinctive visual features (texture, edges) to match pixels between left and right images. It fails completely on textureless white walls, in pitch darkness, or across reflective glass. Modern robots combine passive vision with **Active Depth Sensing**:\n\n**1. Structured Light (e.g. Intel RealSense SR300, Apple TrueDepth):**\nAn infrared laser projector casts a known pseudo-random speckle pattern onto the scene. An off-axis IR CMOS camera reads the pattern; spatial distortions in the speckle grid are triangulated to produce dense metric depth maps.\n\n**2. Time-of-Flight (ToF) Cameras:**\nAn array of VCSEL infrared LEDs emits amplitude-modulated continuous light ($20-100\\text{ MHz}$). Special pixel sensors measure the phase shift $\\Delta \\phi$ of the reflected wavefront simultaneously across all pixels:\n$$d = \\frac{c \\cdot \\Delta \\phi}{4\\pi f_{mod}}$$\nProviding $60\\text{ FPS}$ full-field metric depth independent of scene visual texture.\n\n**3. Light Detection and Ranging (LiDAR):**\nFires nanosecond laser pulses ($905\\text{ nm}$ or $1550\\text{ nm}$) and measures round-trip time directly using avalanche photodiodes ($d = \\frac{c \\cdot \\Delta t}{2}$). Spinning prisms or solid-state MEMS mirrors steer the beam, producing millions of millimeter-accurate 3D point cloud coordinates per second over ranges up to $200\\text{ m}$."
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
        explanation: "**Step 1: Perspective Projection Model**\nThe horizontal pixel coordinate is given by the pinhole projection formula:\n$$u = f_x \\frac{X}{Z} + c_x$$\n\n**Step 2: Depth Normalization**\nNormalize the horizontal camera coordinate by depth $Z$:\n$$\\frac{X}{Z} = \\frac{1.2\\text{ m}}{3.0\\text{ m}} = 0.40$$\n\n**Step 3: Compute Pixel Coordinate**\n$$u = (600\\text{ px} \\times 0.40) + 320\\text{ px} = 240 + 320 = 560\\text{ px}$$"
      },
      {
        id: "q-7-2",
        type: "mcq",
        source: "Robotics Sensing Curriculum",
        title: "Monocular Vision Scale Ambiguity",
        prompt: "Why can a mobile robot not determine the absolute metric distance of an unknown object using only a single standard 2D camera image?",
        options: [
          "Because perspective projection divides by depth $Z$; multiplying 3D coordinates by any scalar factor $k$ yields the exact same 2D pixel coordinates.",
          "Because CMOS sensors only capture light in the visible spectrum and cannot detect infrared.",
          "Because RGB Bayer filters remove high-frequency spatial depth components.",
          "Because camera focal length dynamically changes with distance."
        ],
        correctIndex: 0,
        explanation: "**Step 1: The Perspective Division Property**\nPerspective projection maps 3D world coordinates onto the sensor plane by dividing by depth $Z$:\n$$u = f_x \\frac{X}{Z} + c_x, \\quad v = f_y \\frac{Y}{Z} + c_y$$\n\n**Step 2: Scale Invariance of Sight Rays**\nEvery 3D point $\\mathbf{P}' = k \\cdot [X, Y, Z]^T$ along the sight line through the pinhole produces the identical projection:\n$$\\frac{kX}{kZ} = \\frac{X}{Z}$$\n\n**Step 3: Overcoming Monocular Ambiguity**\nWithout an external scale metric, known object dimensions, or a multi-camera stereo baseline, absolute physical distance is mathematically ambiguous from a single image."
      },
      {
        id: "q-7-3",
        type: "nat",
        source: "Stereo Vision & Epipolar Geometry",
        title: "Stereo Vision Disparity to Depth Calculation",
        prompt: "A binocular stereo camera rig has baseline distance $B = 0.12\\text{ m}$ ($12\\text{ cm}$) between left and right lenses, with identical focal length $f = 800\\text{ px}$. An obstacle is observed with horizontal disparity $d = u_L - u_R = 48\\text{ px}$. Calculate the metric distance $Z$ to the obstacle in meters ($\\text{m}$, rounded to 1 decimal place).",
        unit: "m",
        correctAnswer: 2.0,
        toleranceRange: [1.95, 2.05],
        explanation: "**Step 1: Stereo Triangulation Formula**\nFor two rectified parallel cameras, depth $Z$ is inversely proportional to disparity $d$:\n$$Z = \\frac{f \\cdot B}{d}$$\n\n**Step 2: Numerical Substitution**\nGiven $f = 800\\text{ px}$, $B = 0.12\\text{ m}$, and $d = 48\\text{ px}$:\n$$Z = \\frac{800\\text{ px} \\times 0.12\\text{ m}}{48\\text{ px}} = \\frac{96}{48} = 2.0\\text{ m}$$\nDisparity shrinks as objects move farther away, making stereo vision most precise at short ranges."
      },
      {
        id: "q-7-4",
        type: "nat",
        source: "Pinhole Camera Models & Stanford CS231A",
        title: "Vertical Pixel Coordinate Projection",
        prompt: "A robot's onboard camera has vertical focal length $f_y = 600\\text{ px}$ and vertical principal point offset $c_y = 240\\text{ px}$. A traffic cone is located at vertical camera coordinate $Y = 0.80\\text{ m}$ and depth $Z = 4.0\\text{ m}$. Calculate the vertical pixel coordinate $v$ on the sensor array in pixels.",
        unit: "px",
        correctAnswer: 360,
        toleranceRange: [358, 362],
        explanation: "**Step 1: Vertical Perspective Projection Equation**\n$$v = f_y \\frac{Y}{Z} + c_y$$\n\n**Step 2: Numerical Substitution**\nWith $f_y = 600\\text{ px}$, $Y = 0.80\\text{ m}$, $Z = 4.0\\text{ m}$, and $c_y = 240\\text{ px}$:\n$$\\frac{Y}{Z} = \\frac{0.80}{4.0} = 0.20$$\n$$v = (600\\text{ px} \\times 0.20) + 240\\text{ px} = 120 + 240 = 360\\text{ px}$$"
      },
      {
        id: "q-7-5",
        type: "mcq",
        source: "Camera Calibration & Projective Geometry",
        title: "Intrinsic Camera Matrix Degrees of Freedom",
        prompt: "How many independent internal physical parameters (degrees of freedom) define the standard pinhole camera intrinsic calibration matrix $\\mathbf{K}$?",
        options: [
          "5 parameters: focal lengths ($f_x, f_y$), principal point center ($c_x, c_y$), and skew ($s$).",
          "3 parameters: 3D position coordinates ($X, Y, Z$).",
          "6 parameters: 3 rotations and 3 translations in world space.",
          "9 parameters: all entries of the $3 \\times 3$ matrix independently."
        ],
        correctIndex: 0,
        explanation: "**Step 1: Structure of Intrinsic Matrix K**\nThe intrinsic matrix is an upper triangular $3 \\times 3$ matrix:\n$$\\mathbf{K} = \\begin{bmatrix} f_x & s & c_x \\\\ 0 & f_y & c_y \\\\ 0 & 0 & 1 \\end{bmatrix}$$\n\n**Step 2: Counting Free Parameters**\nThe matrix contains exactly 5 independent intrinsic parameters:\n1. $f_x$ (horizontal focal length)\n2. $f_y$ (vertical focal length)\n3. $c_x$ (horizontal optical center)\n4. $c_y$ (vertical optical center)\n5. $s$ (axis skew angle)\nThe 6 parameters describing orientation and position ($[\\mathbf{R} \\mid \\mathbf{t}]$) are extrinsic, not intrinsic."
      }
    ],
    vault: {
      formulas: [
        { name: "Perspective Projection", tex: "u = f_x \\frac{X}{Z} + c_x, \\quad v = f_y \\frac{Y}{Z} + c_y" },
        { name: "Camera Intrinsic Matrix", tex: "\\mathbf{K} = \\begin{bmatrix} f_x & s & c_x \\\\ 0 & f_y & c_y \\\\ 0 & 0 & 1 \\end{bmatrix}" },
        { name: "Stereo Depth from Disparity", tex: "Z = \\frac{f \\cdot B}{d} \\quad [\\text{meters}]" },
        { name: "Full Projection Model", tex: "\\lambda \\begin{bmatrix} u \\\\ v \\\\ 1 \\end{bmatrix} = \\mathbf{K} [\\mathbf{R} \\mid \\mathbf{t}] \\begin{bmatrix} X_w \\\\ Y_w \\\\ Z_w \\\\ 1 \\end{bmatrix}" },
        { name: "Brown-Conrady Radial Distortion", tex: "x_{dist} = x(1 + k_1 r^2 + k_2 r^4), \\quad r^2 = x^2 + y^2" },
        { name: "ToF Laser Ranging", tex: "d = \\frac{c \\cdot \\Delta t}{2} \\quad [\\text{meters}]" }
      ],
      pitfalls: [
        {
          title: "Division by Zero at Z = 0",
          desc: "Points lying on or behind the focal plane ($Z \\le 0$) cannot be projected into pixel coordinates."
        },
        {
          title: "Focal Length Units: Millimeters vs Pixels",
          desc: "Never mix focal length in millimeters ($f$) with focal length in pixel units ($f_x$). The conversion $f_x = f / s_x$ accounts for individual pixel pitch."
        },
        {
          title: "The Textureless Stereo Blindness",
          desc: "Passive stereo algorithms (SGBM / Block Matching) fail on uniform blank walls because pixel patches have zero photometric gradient to match."
        },
        {
          title: "Rolling Shutter Distortion",
          desc: "Low-cost CMOS cameras expose pixel rows sequentially. Rapid robot yaw motion skews vertical poles into tilted diagonals."
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
      "A* Optimality Condition: A* search is guaranteed to find the strictly optimal path if the heuristic $h(n)$ is admissible ($0 \\le h(n) \\le h^*(n)$) and consistent.",
      "Bayesian Log-Odds Occupancy Update: Posterior log-odds of a grid cell is the simple linear sum of prior log-odds and inverse sensor model: $l_t(m_i) = l_{t-1}(m_i) + \\text{inv\\_sensor}(m_i, z_t) - l_0$.",
      "Differential Drive Odometry: Robot pose $(x, y, \\theta)$ updates from wheel displacements: $\\Delta s = \\frac{\\Delta s_R + \\Delta s_L}{2}$ and $\\Delta \\theta = \\frac{\\Delta s_R - \\Delta s_L}{L}$."
    ],
    commonPitfalls: [
      "Using Dijkstra or A* directly on a physical robot point without inflating obstacles by the robot's physical collision radius (Configuration Space C-space).",
      "Relying solely on dead reckoning (wheel odometry) for long navigation runs; integration of wheel slip causes unbounded position drift.",
      "Using non-admissible heuristics in A*, which sacrifices path optimality."
    ],
    story: {
      summary: "Explore the algorithmic brain of autonomous mobile robots: Configuration Space (C-Space), deterministic graph search (A*, Dijkstra), sampling-based planning (RRT/PRM), reactive Bug navigation, Bayesian Occupancy Grid Mapping, and Dead Reckoning Odometry with Kalman localization. Based on Choset et al., Dudek & Jenkin, and Labs 9-13.",
      sections: [
        {
          heading: "1. Configuration Space (C-Space) & Minkowski Obstacle Inflation",
          text: "In the physical world, a robot is not a mathematical point—it has a 2D or 3D rigid geometric body with length, width, and collision boundaries. Attempting to plan a path directly in the physical **Workspace** ($\\mathcal{W}$) requires testing complex geometric intersection polygons at every microstep along the trajectory.\n\n**The Concept of Configuration Space ($\\mathcal{C}$):**\nA **configuration** $\\mathbf{q}$ is a complete specification of the location and orientation of every point on the robot. The set of all possible configurations is the **Configuration Space** ($\\mathcal{C}$).\n- For a mobile robot that translates and rotates on a 2D floor: $\\mathcal{C} = SE(2) = \\mathbb{R}^2 \\times SO(2)$, with parameters $(x, y, \\theta)$.\n- For a circular robot with rotational symmetry: $\\mathcal{C} = \\mathbb{R}^2$.\n\n**Minkowski Sum Obstacle Dilation:**\nIn $\\mathcal{C}$-space, the physical robot is shrunk into a single dimensionless mathematical point $\\mathbf{q} = (x, y)$! To preserve collision safety, every physical obstacle in the workspace is **dilated (inflated)** by the robot's collision geometry using the **Minkowski Sum** ($\\oplus$):\n$$\\mathcal{C}_{obs} = \\mathcal{W}_{obs} \\oplus \\mathcal{B}_R(0) = \\{ w + b \\mid w \\in \\mathcal{W}_{obs}, \\; b \\in \\mathcal{B}_R(0) \\}$$\nWhere $\\mathcal{B}_R(0)$ is a disk of radius $R$ centered at the origin. Free space is $\\mathcal{C}_{free} = \\mathcal{C} \\setminus \\mathcal{C}_{obs}$. Any continuous trajectory of the point robot inside $\\mathcal{C}_{free}$ guarantees that the physical robot will never strike an obstacle."
        },
        {
          heading: "2. Deterministic Search: Dijkstra's Algorithm vs A* Path Planning",
          text: "When space is discretized into a 2D grid graph (4-connected or 8-connected), how do we compute the optimal obstacle-free path from start configuration $\\mathbf{q}_{start}$ to goal $\\mathbf{q}_{goal}$?\n\n**Dijkstra's Algorithm (Uniform-Cost Search):**\nMaintains a priority queue of frontier nodes ordered strictly by the exact accumulated path cost from the start node: $g(n)$. At each step, it expands the lowest-$g(n)$ node. While mathematically guaranteed to find the shortest path, Dijkstra expands outward in uniform circular wavefronts in all directions—wasting enormous computation exploring nodes away from the goal.\n\n**The A* Search Algorithm:**\nGuides the search toward the goal by augmenting the known cost $g(n)$ with a **heuristic estimate** $h(n)$ of the remaining cost to the goal:\n$$f(n) = g(n) + h(n)$$\nWhere:\n- $g(n)$: Exact path cost accumulated from start to current node $n$.\n- $h(n)$: Estimated cost from current node $n$ to the goal.\n- $f(n)$: Total estimated cost of the cheapest path constrained through $n$.\n\n**Admissibility & Consistency (The Optimality Guarantee):**\n1. **Admissibility ($0 \\le h(n) \\le h^*(n)$):** The heuristic must NEVER overestimate the true minimal cost to reach the goal. If $h(n)$ is admissible, $A^*$ is mathematically proven to return the optimal shortest path.\n2. **Consistency (Monotonicity):** For any node $n$ and neighbor $n'$, $h(n) \\le c(n, n') + h(n')$. Consistency guarantees that the first time any node is popped from the open set, its path cost $g(n)$ is strictly optimal, eliminating the need to re-open closed nodes.\n\n**Standard Admissible Heuristics:**\n- **4-Connected Grid (Cardinal movements only):** Manhattan Distance: $h(n) = |x_n - x_{goal}| + |y_n - y_{goal}|$.\n- **8-Connected Grid (With diagonals):** Octile / Chebyshev Distance.\n- **Continuous Space:** Euclidean Distance: $h(n) = \\sqrt{(x_n - x_{goal})^2 + (y_n - y_{goal})^2}$."
        },
        {
          heading: "3. Reactive Bug Planners & Sampling-Based Motion Planning (RRT & PRM)",
          text: "What if the robot has no global map and must navigate an unknown environment using only local tactile bump or sonar proximity sensors? Or what if the robot is a 6-DOF manipulator arm where grid search suffers from the exponential **curse of dimensionality** ($O(k^d)$)?\n\n**Reactive Bug Algorithms (Bug 1 vs Bug 2):**\n- **Bug 1 (Exhaustive Local Search):** The robot drives directly toward the goal along the straight line connecting start and goal (the *m-line*). When it hits an obstacle, it circumnavigates the entire perimeter of the obstacle, records the point closest to the goal, circumnavigates back to that point, and departs along the new m-line. Bug 1 is reliable and complete, but inefficient.\n- **Bug 2 (Greedy Line Crossing):** The robot follows the obstacle boundary until it crosses the original *m-line* at a point closer to the goal than the hit point. It immediately departs the boundary and resumes straight-line driving toward the goal.\n\n**Sampling-Based Planners for High Dimensions:**\n1. **Rapidly-exploring Random Trees (RRT):** Rapidly explores high-dimensional continuous configuration spaces by randomly sampling points $\\mathbf{q}_{rand}$, finding the nearest tree node $\\mathbf{q}_{near}$, and extending a short step $\\Delta q$ toward the sample to create $\\mathbf{q}_{new}$. RRT is probabilistically complete—as iterations $N \\to \\infty$, the probability of finding a path approaches $1$.\n2. **Probabilistic Roadmaps (PRM):** Pre-computes a multi-query roadmap graph by sampling random configurations in $\\mathcal{C}_{free}$ and connecting $k$-nearest neighbors with straight-line local planners."
        },
        {
          heading: "4. Probabilistic Occupancy Grid Mapping & Recursive Bayesian Log-Odds",
          text: "Real ultrasonic transducers, IR sensors, and LiDAR scanners are corrupted by physical noise, specular reflections, and beam divergence. A single sensor hit cannot prove a wall is present, nor can a single missed hit prove space is empty. We maintain a **Probabilistic Occupancy Grid Map** where the floor is partitioned into an array of discrete spatial cells $m_i$, each holding a probability of occupancy $p(m_i) \\in [0, 1]$.\n\n**The Log-Odds Transformation:**\nMultiplying floating-point probabilities between $0$ and $1$ causes rapid computer arithmetic underflow. We map probabilities to **Log-Odds** ($l$):\n$$l(m_i) = \\log \\left( \\frac{p(m_i)}{1 - p(m_i)} \\right)$$\n- Completely unknown / uniform prior ($p = 0.5$): $l = \\log(1) = 0$.\n- High confidence occupied ($p = 0.99$): $l = \\log(99) \\approx +4.60$.\n- High confidence free space ($p = 0.01$): $l = \\log(1/99) \\approx -4.60$.\n\n**Recursive Bayesian Map Update Rule:**\nApplying Bayes' Rule under the assumption of static independent grid cells simplifies Bayesian probability updates into simple **addition and subtraction**:\n$$l_t(m_i) = l_{t-1}(m_i) + \\text{inv\\_sensor\\_model}(m_i, z_t) - l_0$$\nWhere:\n- $l_{t-1}(m_i)$: Prior log-odds of cell $m_i$.\n- $\\text{inv\\_sensor\\_model}$: Returns $l_{occ} > 0$ for cells inside the sensor detection endpoint, and $l_{free} < 0$ for cells along the ray traversed by the beam.\n- $l_0$: Static prior log-odds ($0$ for $p_0 = 0.5$).\n\n**Recovering Posterior Probability:**\n$$p(m_i) = \\frac{1}{1 + e^{-l_t(m_i)}}$$"
        },
        {
          heading: "5. Differential Drive Kinematics & Dead Reckoning Odometry",
          text: "Most ground educational mobile robots utilize a **differential drive** platform consisting of two independently driven coaxial wheels of radius $R$, separated by track width $L$.\n\n**Forward Kinematics from Encoder Ticks:**\nLet $\\Delta s_R$ and $\\Delta s_L$ be the linear distances rolled by the right and left wheels over time step $\\Delta t$:\n$$\\Delta s_R = R \\cdot \\Delta \\phi_R = \\frac{2\\pi R \\cdot \\Delta \\text{ticks}_R}{\\text{TPR}}, \\quad \\Delta s_L = R \\cdot \\Delta \\phi_L = \\frac{2\\pi R \\cdot \\Delta \\text{ticks}_L}{\\text{TPR}}$$\n\n**Robot Center Displacement & Rotation:**\n1. **Forward linear distance of the axle midpoint:**\n$$\\Delta s = \\frac{\\Delta s_R + \\Delta s_L}{2}$$\n2. **Angular rotation of robot heading ($\\Delta \\theta$):**\n$$\\Delta \\theta = \\frac{\\Delta s_R - \\Delta s_L}{L}$$\n\n**Kinematic Maneuver Modes:**\n- **Straight Line ($\\Delta s_R = \\Delta s_L$):** $\\Delta \\theta = 0$, infinite radius of curvature.\n- **Zero-Radius Pivot Turn ($\\Delta s_R = -\\Delta s_L$):** $\\Delta s = 0$, pure rotation in place around axle center.\n- **Single Wheel Pivot ($\\Delta s_L = 0$):** $\\Delta \\theta = \\Delta s_R / L$, turns around the left wheel contact patch.\n\n**2nd-Order Arc Integration (Runge-Kutta 2):**\nIntegrating pose $[x, y, \\theta]^T$ using average heading over interval $\\Delta t$:\n$$\\theta_t = \\theta_{t-1} + \\Delta \\theta$$\n$$x_t = x_{t-1} + \\Delta s \\cos\\left(\\theta_{t-1} + \\frac{\\Delta \\theta}{2}\\right)$$\n$$y_t = y_{t-1} + \\Delta s \\sin\\left(\\theta_{t-1} + \\frac{\\Delta \\theta}{2}\\right)$$"
        },
        {
          heading: "6. Sensor Drift, Landmark Triangulation & The Bayes / Kalman Filter Localization Loop",
          text: "Why can't an autonomous robot navigate across a campus solely using wheel odometry? **Odometry Drift is Unbounded and Monotonic**.\n\n**The Compounding Error Cascade:**\nWheel slippage on dust, carpet compressibility, and tiny wheel diameter manufacturing tolerances cause continuous errors in $\\Delta \\theta$. Because future $(x, y)$ positions depend on the trigonometric integration of heading:\n$$x_t = \\int v(t) \\cos(\\theta(t)) dt$$\nA heading error of just $2^\\circ$ causes the robot to miss a door by several meters after traveling $30\\text{ meters}$!\n\n**Correcting Drift via Landmark Observation:**\nTo stay localized, the robot must periodically observe known global landmarks (AprilTag fiducials, retroreflective beacons, wall geometries) and fuse them via the **Bayes Filter Loop**:\n\n1. **Prediction Step (Action / Kinematic Update):**\nPropagates the robot's state probability distribution forward using odometry:\n$$\\overline{bel}(x_t) = \\int p(x_t \\mid u_t, x_{t-1}) \\cdot bel(x_{t-1}) \\, dx_{t-1}$$\n*Effect:* Uncertainty grows (covariance matrix expands).\n\n2. **Correction Step (Measurement / Sensor Update):**\nWhen the camera or LiDAR spots a known landmark at expected range and bearing:\n$$bel(x_t) = \\eta \\cdot p(z_t \\mid x_t) \\cdot \\overline{bel}(x_t)$$\n*Effect:* Multiplies the prior by the measurement likelihood, dramatically shrinking uncertainty and pulling the estimated pose back to ground truth.\n\nIn linear Gaussian systems, this cycle is implemented as the **Kalman Filter (KF)**; in non-linear robotics, it is implemented as the **Extended Kalman Filter (EKF)** or **Monte Carlo Localization (MCL / Particle Filter)**."
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
        explanation: "**Step 1: Definition of Admissibility**\nA heuristic $h(n)$ is admissible if it never overestimates the true minimal cost to reach the goal:\n$$0 \\le h(n) \\le h^*(n) \\quad \\forall n$$\n\n**Step 2: Proof Intuition for Optimality**\nBecause total estimated cost is $f(n) = g(n) + h(n)$, an admissible heuristic guarantees that the goal node cannot be dequeued with a suboptimal path, because any node along the true shortest path will always have a lower or equal $f$-score.\n\n**Step 3: Common Admissible Heuristics**\n- 4-Connected Grid: Manhattan Distance ($|\\Delta x| + |\\Delta y|$).\n- Continuous Metric Space: Euclidean Distance ($\\sqrt{\\Delta x^2 + \\Delta y^2}$)."
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
        explanation: "**Step 1: Differential Drive Kinematics**\nThe heading rotation angle $\\Delta \\theta$ is derived from the difference in wheel arc displacements divided by track width $L$:\n$$\\Delta \\theta = \\frac{\\Delta s_R - \\Delta s_L}{L}$$\n\n**Step 2: Substitute Given Displacements**\nGiven $\\Delta s_R = 0.40\\text{ m}$, $\\Delta s_L = 0.10\\text{ m}$, and $L = 0.20\\text{ m}$:\n$$\\Delta s_R - \\Delta s_L = 0.40 - 0.10 = 0.30\\text{ m}$$\n\n**Step 3: Compute Heading Angle**\n$$\\Delta \\theta = \\frac{0.30\\text{ m}}{0.20\\text{ m}} = 1.50\\text{ radians}$$"
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
        explanation: "**Step 1: Mathematical Definition of Log-Odds**\nFor probability $p \\in (0, 1)$, log-odds is defined as:\n$$l = \\log \\left( \\frac{p}{1 - p} \\right)$$\n- Neutral prior ($p = 0.5$) maps to $l = 0$.\n- High confidence occupied ($p \\to 1$) maps to $l \\to +\\infty$.\n- High confidence free ($p \\to 0$) maps to $l \\to -\\infty$.\n\n**Step 2: Additive Bayes Filter Updates**\nApplying Bayes' rule turns into simple additions and subtractions:\n$$l_t(m_i) = l_{t-1}(m_i) + \\log \\left( \\frac{p(m_i \\mid z_t)}{1 - p(m_i \\mid z_t)} \\right) - l_0$$\n\n**Step 3: Numerical Stability**\nThis additive formulation eliminates floating-point precision underflow caused by multiplying chains of probabilities near zero."
      },
      {
        id: "q-8-4",
        type: "nat",
        source: "Differential Drive Odometry Kinematics",
        title: "Differential Drive Center Linear Displacement",
        prompt: "A two-wheel differential drive robot has wheels of radius $R = 0.05\\text{ m}$ ($5.0\\text{ cm}$). During a motion maneuver, the left wheel rotates by $\\Delta \\phi_L = 4.0\\text{ rad}$ while the right wheel rotates by $\\Delta \\phi_R = 6.0\\text{ rad}$. Calculate the forward displacement of the robot's geometric center $\\Delta s$ in meters ($\\text{m}$, rounded to 2 decimal places).",
        unit: "m",
        correctAnswer: 0.25,
        toleranceRange: [0.24, 0.26],
        explanation: "**Step 1: Individual Wheel Displacements**\nEach wheel rolls a linear distance equal to wheel radius times angular rotation:\n$$\\Delta s_L = R \\cdot \\Delta \\phi_L = 0.05\\text{ m} \\times 4.0\\text{ rad} = 0.20\\text{ m}$$\n$$\\Delta s_R = R \\cdot \\Delta \\phi_R = 0.05\\text{ m} \\times 6.0\\text{ rad} = 0.30\\text{ m}$$\n\n**Step 2: Axle Midpoint Forward Displacement**\nThe net forward displacement of the chassis center is the average of the two wheels:\n$$\\Delta s = \\frac{\\Delta s_R + \\Delta s_L}{2} = \\frac{0.30 + 0.20}{2} = \\frac{0.50}{2} = 0.25\\text{ meters}$$"
      },
      {
        id: "q-8-5",
        type: "nat",
        source: "Bayesian Occupancy Grid Mapping",
        title: "Occupancy Probability from Log-Odds Value",
        prompt: "After multiple ultrasonic scans, a grid cell in an occupancy grid map accumulates a log-odds value of $l = 1.3863$. Calculate the posterior probability $p(m_i) = \\frac{1}{1 + e^{-l}}$ that this cell is occupied by an obstacle, rounded to 2 decimal places.",
        unit: "probability",
        correctAnswer: 0.80,
        toleranceRange: [0.78, 0.82],
        explanation: "**Step 1: Inverse Log-Odds (Sigmoid) Function**\nThe mapping from log-odds $l$ back to probability $p$ is:\n$$p(m_i) = \\frac{1}{1 + e^{-l}}$$\n\n**Step 2: Evaluate Exponential**\nWith $l = 1.3863$:\n$$e^{-1.3863} = \\frac{1}{e^{1.3863}} \\approx \\frac{1}{4.0} = 0.25$$\n\n**Step 3: Compute Probability**\n$$p(m_i) = \\frac{1}{1 + 0.25} = \\frac{1}{1.25} = 0.80$$\nThe cell is $80\\%$ likely to contain an obstacle."
      },
      {
        id: "q-8-6",
        type: "mcq",
        source: "Principles of Robot Motion & C-Space",
        title: "Configuration Space Obstacle Inflation Rule",
        prompt: "When planning a path for a circular mobile robot of radius $R$ through a known 2D map, why are obstacles in the workspace dilated (inflated) by radius $R$ to form Configuration Space (C-space) obstacles $\\mathcal{C}_{obs} = \\mathcal{W}_{obs} \\oplus \\mathcal{B}_R$?",
        options: [
          "It collapses the robot into a single dimensionless point, allowing collision-free paths to be computed using standard point-graph search algorithms like A*.",
          "It accounts for the speed of light delay in sonar measurements.",
          "It converts the motor driver's PWM duty cycle into linear torque.",
          "It prevents the A* heuristic from overestimating Manhattan distances."
        ],
        correctIndex: 0,
        explanation: "**Step 1: The Curse of Robot Geometry**\nChecking whether a complex 2D circular rigid body collides with arbitrary polygons during planning requires expensive continuous geometric intersection tests at every point.\n\n**Step 2: Equivalence of C-Space Inflation**\nBy growing every obstacle outward by the robot's collision radius $R$ (the Minkowski sum $\\mathcal{W}_{obs} \\oplus \\mathcal{B}_R$), a point on the inflated boundary represents a contact configuration of the robot's outer skin. Therefore, planning for a single point inside $\\mathcal{C}_{free}$ rigorously guarantees that the physical robot will never collide with walls!"
      }
    ],
    vault: {
      formulas: [
        { name: "A* Cost Evaluation", tex: "f(n) = g(n) + h(n), \\quad h(n) \\le h^*(n)" },
        { name: "Bayes Log-Odds Mapping", tex: "l_t(m_i) = l_{t-1}(m_i) + \\log \\left( \\frac{p(m_i \\mid z_t)}{1 - p(m_i \\mid z_t)} \\right) - l_0" },
        { name: "Probability from Log-Odds", tex: "p(m_i) = \\frac{1}{1 + e^{-l(m_i)}}" },
        { name: "Differential Drive Midpoint", tex: "\\Delta s = \\frac{\\Delta s_R + \\Delta s_L}{2}" },
        { name: "Differential Drive Rotation", tex: "\\Delta \\theta = \\frac{\\Delta s_R - \\Delta s_L}{L}" },
        { name: "C-Space Minkowski Inflation", tex: "\\mathcal{C}_{obs} = \\mathcal{W}_{obs} \\oplus \\mathcal{B}_R(0)" },
        { name: "2nd-Order Arc Integration", tex: "x_t = x_{t-1} + \\Delta s \\cos\\left(\\theta_{t-1} + \\frac{\\Delta \\theta}{2}\\right)" }
      ],
      pitfalls: [
        {
          title: "The Unexpanded C-Space Trap",
          desc: "Treating a physical 20cm-wide robot as a dimensionless mathematical point causes the robot to clip corners and crash into walls."
        },
        {
          title: "Odometry Orientation Error Compounding",
          desc: "Heading errors ($\\Delta \\theta$) propagate into catastrophic position error: $x = \\int \\cos(\\theta) ds$. A $2^\\circ$ orientation error causes meters of lateral drift over time."
        },
        {
          title: "Inadmissible A* Heuristics",
          desc: "If $h(n)$ overestimates the true remaining distance (e.g. Euclidean distance multiplied by 1.5), A* becomes a greedy search that is no longer guaranteed to find the shortest path."
        },
        {
          title: "Log-Odds Probability Saturation",
          desc: "Repeated sensor hits can push log-odds to $\\pm 100$. If an obstacle later moves, it takes dozens of contradictory readings to un-freeze the cell. Always clamp log-odds to $[-4.6, +4.6]$ ($1\\% - 99\\%$)."
        }
      ]
    }
  }
];

export const LAB_ACTIVITIES = [
  {
    labNumber: 1,
    title: "Basic Circuit Connections & Resistor Networks",
    source: "Labs.pdf - Lab 1 & Outline Week 1",
    objectives: [
      "Breadboard familiarization and multimeter voltage/current measurements",
      "Series and parallel resistor combinations",
      "Theoretical vs practical equivalent resistance verification"
    ],
    equipment: ["Breadboard", "Digital Multimeter", "Carbon Film Resistors", "DC Power Supply / 9V Battery"],
    keyTakeway: "Verify Ohm's law and observe that breadboard rows 1-5 share an internal contact clip."
  },
  {
    labNumber: 2,
    title: "Microcontroller Architecture & Embedded Programming",
    source: "Labs.pdf - Lab 2 & Outline Week 2",
    objectives: [
      "Raspberry Pi Pico RP2040 board setup and toolchain configuration (MicroPython / C++)",
      "Pico pinout orientation: GPIOs vs power rails (VBUS, VSYS, 3V3_OUT, GND)",
      "Blinking onboard GP25 heartbeat LED and controlling external LED circuits"
    ],
    equipment: ["Raspberry Pi Pico (RP2040)", "Micro-USB cable", "External LEDs", "Breadboard", "Jumper wires"],
    keyTakeway: "Microcontrollers execute code in bare-metal silicon; GP25 is wired internally to the board status LED."
  },
  {
    labNumber: 3,
    title: "Analog-to-Digital Conversion & Potentiometer LED Control",
    source: "Labs.pdf - Lab 3 & Outline Week 3",
    objectives: [
      "Using a 10kΩ potentiometer as a 3-terminal variable voltage divider",
      "Sampling analog voltages via Pico 12-bit SAR ADC (ADC0 / GP26)",
      "Generating Pulse Width Modulation (PWM) waveforms to smoothly control LED brightness"
    ],
    equipment: ["10kΩ Potentiometer", "Red/Green/Blue LEDs", "Current-limiting resistors (220Ω)", "Pico", "Oscilloscope"],
    keyTakeway: "Potentiometers output ratiometric voltages; ADCs quantize continuous voltages into discrete digital integer counts."
  },
  {
    labNumber: 4,
    title: "HC-SR04 Ultrasonic Sonar & Voltage Divider Protection",
    source: "Labs.pdf - Lab 4 & Outline Week 4",
    objectives: [
      "Interfacing HC-SR04 trigger and echo pins with Raspberry Pi Pico",
      "Measuring microsecond echo pulse width and computing distance via speed of sound",
      "Constructing a 1kΩ / 2kΩ voltage divider to safely step down the 5V Echo pulse to 3.3V",
      "Observing transducer ring-down blind zones (< 2.5cm) and dual-sensor crosstalk interference"
    ],
    equipment: ["HC-SR04 Ultrasonic Sensor", "Pico", "1kΩ & 2kΩ Resistors", "Target Obstacles", "Acoustic Foam"],
    keyTakeway: "The Pico GPIO is 3.3V maximum; 5V Echo signals must always be stepped down with a voltage divider."
  },
  {
    labNumber: 5,
    title: "Infrared (IR) Proximity Sensing & Optical Material Physics",
    source: "Labs.pdf - Lab 5 & Outline Week 5",
    objectives: [
      "Wiring an LM393 comparator-based active IR proximity sensor module to the Pico",
      "Testing detection distances across colored materials (white paper vs carbon-black sheet)",
      "Observing specular reflection failure when tilting polished mirrors at angles > 10°",
      "Tuning the onboard comparator reference potentiometer for noise immunity"
    ],
    equipment: ["IR Proximity Module", "Color test sheets (white, red, black)", "Glass Mirror", "Pico"],
    keyTakeway: "Active IR sensors rely on diffuse Lambertian scattering; specular mirror reflections angle beams away from the receiver."
  },
  {
    labNumber: 6,
    title: "Pulse Width Modulation (PWM) & RC Servo Position Control",
    source: "Outline Week 6 & Servo Mechatronics",
    objectives: [
      "Configuring Pico hardware PWM slice dividers to generate exact 50 Hz control waveforms",
      "Mapping angular position (0° to 180°) to pulse widths between 1.0 ms and 2.0 ms",
      "Measuring servo current consumption during dynamic motion and stall conditions",
      "Eliminating jitter caused by power supply sag using decoupling capacitors"
    ],
    equipment: ["SG90 / MG996R RC Servo Motor", "External 5V Power Supply", "Pico", "Oscilloscope", "1000µF Capacitor"],
    keyTakeway: "RC servos decode duty cycle pulse width (not average voltage) into closed-loop angular shaft position."
  },
  {
    labNumber: 7,
    title: "DC Motor Control Using an H-Bridge Motor Driver",
    source: "Outline Week 7 & Motor Driver Lab",
    objectives: [
      "Interfacing an H-bridge motor driver (L298N / DRV8833) with microcontroller GPIOs",
      "Controlling bidirectional DC motor rotation (Forward, Reverse, Coast, Active Brake)",
      "Implementing PWM speed modulation and measuring motor back-EMF",
      "Protecting microcontroller circuits against inductive back-EMF spikes using flyback diodes"
    ],
    equipment: ["Geared DC Motors", "L298N / DRV8833 Dual H-Bridge Module", "External Battery Pack", "Pico"],
    keyTakeway: "H-bridges reverse polarity across the motor armature without mechanical switches; flyback diodes absorb inductive kickback."
  },
  {
    labNumber: 8,
    title: "Load Cell Force Measurement & HX711 24-Bit ADC",
    source: "Labs.pdf - Labs 6 & 7 & Outline Week 8",
    objectives: [
      "Interfacing a 4-gauge Wheatstone full-bridge load cell with the HX711 instrumentation amplifier",
      "Two-point digital calibration: recording zero-load tare offset and computing counts/gram scale",
      "Plotting applied weight vs raw reading to verify linear elastic spring deformation",
      "Evaluating measurement repeatability, creep, and thermal drift"
    ],
    equipment: ["Single-Point Bending Beam Load Cell", "HX711 ADC Module", "Pico", "Precision Calibration Weights"],
    keyTakeway: "The 4-arm full bridge outputs microvolt differential signals requiring 24-bit delta-sigma instrumentation."
  },
  {
    labNumber: 9,
    title: "Closed-Loop Motor Speed Control with Quadrature Encoders",
    source: "Outline Week 9 & Closed-Loop Motor Control",
    objectives: [
      "Mounting optical/magnetic quadrature encoders onto DC motor shafts",
      "Writing interrupt service routines (ISRs) to decode 4x quadrature edge transitions",
      "Measuring angular velocity (RPM) in real time under varying mechanical loads",
      "Implementing a closed-loop Proportional-Integral (PI) speed control algorithm"
    ],
    equipment: ["DC Motor with Quadrature Encoder", "Motor Driver", "Pico", "Variable Mechanical Brake Load"],
    keyTakeway: "Quadrature phase offset encodes rotational direction; closed-loop feedback maintains constant speed under varying loads."
  },
  {
    labNumber: 10,
    title: "Robot Vision: Camera Calibration & Image Sensing",
    source: "Outline Week 10 & Stanford CS231A Camera Models",
    objectives: [
      "Capturing images using a USB/CSI robotics camera module and OpenCV",
      "Performing Zhang's checkerboard intrinsic calibration to extract matrix K",
      "Calculating horizontal and vertical focal lengths (fx, fy) and principal offsets (cx, cy)",
      "Correcting optical barrel and pincushion radial lens distortions"
    ],
    equipment: ["Robotics Camera Module", "Precision Printed Checkerboard Target", "Laptop / Raspberry Pi"],
    keyTakeway: "Intrinsic calibration models how 3D continuous rays project onto 2D discrete pixel coordinates."
  },
  {
    labNumber: 11,
    title: "Path Planning: Bug Algorithms, Dijkstra & A*",
    source: "Outline Week 11 & Principles of Robot Motion",
    objectives: [
      "Implementing Bug 1 and Bug 2 reactive boundary-following algorithms",
      "Discretizing obstacle environments into 2D grid graphs with Minkowski obstacle inflation",
      "Implementing uniform-cost Dijkstra's algorithm and goal-directed A* path search",
      "Benchmarking path optimality, node expansions, and execution runtime across admissible heuristics"
    ],
    equipment: ["Python Path Planning Simulator", "2D Grid Maze Environments", "Differential Drive Robot"],
    keyTakeway: "Admissible heuristics guarantee optimal shortest paths while expanding significantly fewer graph nodes."
  },
  {
    labNumber: 12,
    title: "Probabilistic Occupancy Grid Mapping",
    source: "Outline Week 12 & Bayes Mapping Lab",
    objectives: [
      "Simulating sensor beam raycasting across a discrete 2D spatial grid",
      "Implementing the recursive Bayesian log-odds occupancy update rule",
      "Converting noisy range sensor hits and free space scans into probabilistic maps",
      "Testing map convergence and handling dynamic obstacle changes using log-odds clamping"
    ],
    equipment: ["Mobile Robot with Ultrasonic / LiDAR Sensor", "Arena Obstacles", "Mapping Software"],
    keyTakeway: "Log-odds transforms Bayesian probability multiplications into numerically stable additions and subtractions."
  },
  {
    labNumber: 13,
    title: "Robot Localization & Final Autonomous Competition",
    source: "Outline Weeks 13-14 & Final Project",
    objectives: [
      "Integrating wheel odometry dead reckoning with landmark triangulation",
      "Implementing a recursive Bayes / Kalman filter localization update step",
      "Navigating an autonomous mobile robot through an unknown obstacle course",
      "Executing the final two-week course project competition trials"
    ],
    equipment: ["Autonomous Mobile Robot Chassis", "Beacon Landmark Targets", "Arena Arena Course"],
    keyTakeway: "Fusing odometry with landmark observations eliminates cumulative integration drift, keeping the robot localized."
  }
];
