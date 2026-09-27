/**
 * Robotics Computational Engine
 * Covers Part II of course curriculum:
 * - Pinhole camera model & perspective projection (Stanford CS231A)
 * - Path planning algorithms (A* & Dijkstra on grid)
 * - Bayesian occupancy grid mapping (log-odds update)
 * - Differential drive mobile robot odometry
 */

// Pinhole Camera 3D to 2D Projection
export function project3DTo2D({
  x3D,
  y3D,
  z3D,
  fx = 500, // Focal length x in pixels
  fy = 500, // Focal length y in pixels
  cx = 320, // Principal point x (image center)
  cy = 240, // Principal point y
  imageWidth = 640,
  imageHeight = 480
}) {
  if (z3D <= 0) {
    return { isVisible: false, reason: "Behind camera plane (Z <= 0)" };
  }
  // Perspective division
  const u = (fx * x3D) / z3D + cx;
  const v = (fy * y3D) / z3D + cy;

  const isInBounds = u >= 0 && u <= imageWidth && v >= 0 && v <= imageHeight;

  return {
    u: Math.round(u),
    v: Math.round(v),
    isVisible: isInBounds,
    zDepth: z3D,
    normalizedU: u / imageWidth,
    normalizedV: v / imageHeight
  };
}

// A* Grid Path Planning
export function runAStarGridPlanning({
  gridWidth = 10,
  gridHeight = 10,
  start = [0, 0],
  goal = [9, 9],
  obstacles = []
}) {
  // obstacles is array of strings "x,y"
  const obstacleSet = new Set(obstacles.map(([x, y]) => `${x},${y}`));

  const key = (x, y) => `${x},${y}`;
  const heuristic = (x, y) => Math.abs(x - goal[0]) + Math.abs(y - goal[1]); // Manhattan

  const openSet = [{ x: start[0], y: start[1], g: 0, f: heuristic(start[0], start[1]) }];
  const cameFrom = new Map();
  const gScore = new Map();
  gScore.set(key(start[0], start[1]), 0);

  const closedSet = new Set();

  let found = false;

  while (openSet.length > 0) {
    // Pop lowest f
    openSet.sort((a, b) => a.f - b.f);
    const current = openSet.shift();
    const currKey = key(current.x, current.y);

    if (current.x === goal[0] && current.y === goal[1]) {
      found = true;
      break;
    }

    closedSet.add(currKey);

    const neighbors = [
      [current.x + 1, current.y],
      [current.x - 1, current.y],
      [current.x, current.y + 1],
      [current.x, current.y - 1]
    ];

    for (const [nx, ny] of neighbors) {
      if (nx < 0 || nx >= gridWidth || ny < 0 || ny >= gridHeight) continue;
      const nKey = key(nx, ny);
      if (obstacleSet.has(nKey) || closedSet.has(nKey)) continue;

      const tentativeG = (gScore.get(currKey) ?? Infinity) + 1;
      if (tentativeG < (gScore.get(nKey) ?? Infinity)) {
        cameFrom.set(nKey, current);
        gScore.set(nKey, tentativeG);
        const f = tentativeG + heuristic(nx, ny);

        const inOpen = openSet.find(node => node.x === nx && node.y === ny);
        if (!inOpen) {
          openSet.push({ x: nx, y: ny, g: tentativeG, f });
        } else if (tentativeG < inOpen.g) {
          inOpen.g = tentativeG;
          inOpen.f = f;
        }
      }
    }
  }

  // Reconstruct path
  const path = [];
  if (found) {
    let curr = { x: goal[0], y: goal[1] };
    path.push([curr.x, curr.y]);
    while (cameFrom.has(key(curr.x, curr.y))) {
      curr = cameFrom.get(key(curr.x, curr.y));
      path.unshift([curr.x, curr.y]);
    }
  }

  return {
    path,
    nodesExplored: closedSet.size,
    success: found,
    pathLength: path.length > 0 ? path.length - 1 : 0
  };
}

// Bayesian Occupancy Grid Mapping (Log-Odds Formulation)
export function updateLogOddsOccupancy({
  priorLogOdds = 0, // log(0.5 / (1 - 0.5)) = 0 (50% unobserved)
  measurement, // 'occupied' or 'free'
  sensorConfidence = 0.8 // Probability P(z=occ | occ)
}) {
  const pOccupiedGivenHit = sensorConfidence;
  const pFreeGivenHit = 1 - sensorConfidence;

  // Inverse sensor model in log-odds:
  // l_inv = log(p / (1 - p))
  const invLogOdds = measurement === 'occupied'
    ? Math.log(pOccupiedGivenHit / (1 - pOccupiedGivenHit))
    : Math.log(pFreeGivenHit / (1 - pFreeGivenHit));

  const updatedLogOdds = priorLogOdds + invLogOdds;
  // Convert back to probability: P = 1 / (1 + exp(-l))
  const updatedProbability = 1 / (1 + Math.exp(-updatedLogOdds));

  return {
    priorLogOdds,
    invLogOdds,
    updatedLogOdds,
    updatedProbability
  };
}

// Differential Drive Mobile Robot Odometry
export function calculateOdometry({
  leftTicks,
  rightTicks,
  ticksPerRev = 360,
  wheelRadiusM = 0.0325, // 65mm diameter wheel
  trackWidthM = 0.15, // 15cm track width
  initialState = { x: 0, y: 0, thetaRad: 0 }
}) {
  const dLeft = (2 * Math.PI * wheelRadiusM * leftTicks) / ticksPerRev;
  const dRight = (2 * Math.PI * wheelRadiusM * rightTicks) / ticksPerRev;
  const dCenter = (dLeft + dRight) / 2;
  const deltaTheta = (dRight - dLeft) / trackWidthM;

  const newTheta = initialState.thetaRad + deltaTheta;
  const avgTheta = initialState.thetaRad + deltaTheta / 2;
  const newX = initialState.x + dCenter * Math.cos(avgTheta);
  const newY = initialState.y + dCenter * Math.sin(avgTheta);

  return {
    dLeftM: dLeft,
    dRightM: dRight,
    dCenterM: dCenter,
    deltaThetaRad: deltaTheta,
    deltaThetaDeg: (deltaTheta * 180) / Math.PI,
    x: newX,
    y: newY,
    thetaRad: newTheta,
    thetaDeg: (newTheta * 180) / Math.PI
  };
}
