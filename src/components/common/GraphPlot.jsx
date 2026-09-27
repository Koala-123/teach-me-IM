import React, { useMemo } from 'react';
import { MathView } from '../../utils/mathView';

/**
 * Reusable, responsive SVG Graph Plotter for physical & mechatronic curves.
 * Supports:
 * - Mathematical governing equations rendered via KaTeX
 * - Multiple continuous data series with custom colors and stroke styles
 * - Shaded fill areas (e.g. under power curve or blind zones)
 * - Reference horizontal/vertical threshold lines
 * - Interactive/live Operating Point marker with glowing ping animation and coordinate pill
 * - Labeled axes with formatted grid lines and unit indicators
 */
export function GraphPlot({
  title,
  subtitle,
  equations = [], // Array of LaTeX/Markdown math strings or single string
  xLabel,
  yLabel,
  xUnit = '',
  yUnit = '',
  series = [], // Array of { name, color, data: [{x, y}], strokeWidth, strokeDasharray, fillArea }
  operatingPoint = null, // { x, y, label, color, secondaryLabel }
  referenceLines = [], // Array of { type: 'x' | 'y', value, label, color, strokeDasharray }
  shadedRegions = [], // Array of { xMin, xMax, color, label }
  xRange = null, // [min, max] or auto
  yRange = null, // [min, max] or auto
  height = 240,
  className = ''
}) {
  const width = 460;
  const padding = { top: 28, right: 28, bottom: 42, left: 62 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  // Compute domain & range
  const { minX, maxX, minY, maxY } = useMemo(() => {
    let allX = [];
    let allY = [];

    series.forEach(s => {
      s.data.forEach(pt => {
        if (Number.isFinite(pt.x)) allX.push(pt.x);
        if (Number.isFinite(pt.y)) allY.push(pt.y);
      });
    });

    if (operatingPoint) {
      if (Number.isFinite(operatingPoint.x)) allX.push(operatingPoint.x);
      if (Number.isFinite(operatingPoint.y)) allY.push(operatingPoint.y);
    }

    referenceLines.forEach(r => {
      if (r.type === 'x' && Number.isFinite(r.value)) allX.push(r.value);
      if (r.type === 'y' && Number.isFinite(r.value)) allY.push(r.value);
    });

    const calcMinX = xRange ? xRange[0] : (allX.length ? Math.min(...allX) : 0);
    const calcMaxX = xRange ? xRange[1] : (allX.length ? Math.max(...allX) : 10);
    const calcMinY = yRange ? yRange[0] : (allY.length ? Math.min(0, Math.min(...allY)) : 0);
    const calcMaxY = yRange ? yRange[1] : (allY.length ? Math.max(...allY) : 10);

    return {
      minX: calcMinX,
      maxX: calcMaxX === calcMinX ? calcMaxX + 1 : calcMaxX,
      minY: calcMinY,
      maxY: calcMaxY === calcMinY ? calcMaxY + 1 : calcMaxY
    };
  }, [series, operatingPoint, referenceLines, xRange, yRange]);

  // Coordinate scales
  const scaleX = (val) => {
    const clamped = Math.max(minX, Math.min(maxX, val));
    return padding.left + ((clamped - minX) / (maxX - minX)) * plotWidth;
  };

  const scaleY = (val) => {
    const clamped = Math.max(minY, Math.min(maxY, val));
    return padding.top + plotHeight - ((clamped - minY) / (maxY - minY)) * plotHeight;
  };

  // Generate ticks
  const xTicks = useMemo(() => {
    const count = 5;
    const ticks = [];
    for (let i = 0; i <= count; i++) {
      const val = minX + (i / count) * (maxX - minX);
      ticks.push(val);
    }
    return ticks;
  }, [minX, maxX]);

  const yTicks = useMemo(() => {
    const count = 4;
    const ticks = [];
    for (let i = 0; i <= count; i++) {
      const val = minY + (i / count) * (maxY - minY);
      ticks.push(val);
    }
    return ticks;
  }, [minY, maxY]);

  // Path generator for continuous series
  const buildPath = (data) => {
    if (!data || data.length === 0) return '';
    return data.reduce((acc, pt, idx) => {
      const x = scaleX(pt.x);
      const y = scaleY(pt.y);
      return idx === 0 ? `M ${x.toFixed(1)} ${y.toFixed(1)}` : `${acc} L ${x.toFixed(1)} ${y.toFixed(1)}`;
    }, '');
  };

  const buildAreaPath = (data, baseVal = minY) => {
    if (!data || data.length === 0) return '';
    const firstX = scaleX(data[0].x);
    const lastX = scaleX(data[data.length - 1].x);
    const baseY = scaleY(baseVal);
    const linePath = data.map(pt => `L ${scaleX(pt.x).toFixed(1)} ${scaleY(pt.y).toFixed(1)}`).join(' ');
    return `M ${firstX.toFixed(1)} ${baseY.toFixed(1)} ${linePath} L ${lastX.toFixed(1)} ${baseY.toFixed(1)} Z`;
  };

  const formatNumber = (num) => {
    if (Math.abs(num) >= 1000) return (num / 1000).toFixed(1) + 'k';
    if (Math.abs(num) >= 100) return Math.round(num).toString();
    if (Math.abs(num) >= 10) return num.toFixed(1);
    if (Number.isInteger(num)) return num.toString();
    return num.toFixed(2);
  };

  return (
    <div className={`bg-space-950/80 border border-space-800 rounded-xl p-3 sm:p-4 shadow-inner ${className}`}>
      {/* Chart Title and Legend Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <div>
          {title && (
            <h4 className="text-xs sm:text-sm font-bold text-slate-100 flex items-center gap-1.5">
              <span>{title}</span>
            </h4>
          )}
          {subtitle && (
            <p className="text-[10px] sm:text-xs text-slate-400 font-mono">
              {subtitle}
            </p>
          )}
        </div>

        {/* Legend */}
        {series.length > 0 && (
          <div className="flex flex-wrap items-center gap-2.5 text-[10px] sm:text-xs">
            {series.map((s, idx) => (
              <div key={idx} className="flex items-center gap-1.5 font-medium text-slate-300">
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block shadow-sm"
                  style={{ backgroundColor: s.color }}
                />
                <span>{s.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mathematical Governing Equations Banner */}
      {equations && (Array.isArray(equations) ? equations.length > 0 : Boolean(equations)) && (
        <div className="my-2 px-3 py-2 rounded-xl bg-space-900/90 border border-cyan-800/40 shadow-inner">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-cyan-400 uppercase tracking-wider mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>Mathematical Curve Model & Live Evaluation</span>
          </div>
          <div className="space-y-1 text-slate-200">
            {(Array.isArray(equations) ? equations : [equations]).map((eq, eIdx) => (
              <div key={eIdx} className="overflow-x-auto py-0.5 text-xs">
                <MathView text={eq} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SVG Canvas */}
      <div className="w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto select-none overflow-visible"
        >
          <defs>
            {series.map((s, idx) => (
              <linearGradient
                key={idx}
                id={`grad-${idx}-${title?.replace(/\s+/g, '')}`}
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor={s.color} stopOpacity="0.25" />
                <stop offset="100%" stopColor={s.color} stopOpacity="0.0" />
              </linearGradient>
            ))}
          </defs>

          {/* Shaded Background Regions (e.g. Blind Zones) */}
          {shadedRegions.map((region, rIdx) => {
            const rx1 = scaleX(region.xMin);
            const rx2 = scaleX(region.xMax);
            return (
              <g key={rIdx}>
                <rect
                  x={rx1}
                  y={padding.top}
                  width={Math.max(0, rx2 - rx1)}
                  height={plotHeight}
                  fill={region.color || '#ef4444'}
                  fillOpacity="0.15"
                />
                {region.label && (
                  <text
                    x={(rx1 + rx2) / 2}
                    y={padding.top + 16}
                    textAnchor="middle"
                    fill={region.color || '#f87171'}
                    fontSize="9"
                    fontWeight="bold"
                    className="font-mono"
                  >
                    {region.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* Grid lines */}
          {/* Horizontal lines */}
          {yTicks.map((val, idx) => {
            const y = scaleY(val);
            return (
              <g key={`y-grid-${idx}`}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={padding.left + plotWidth}
                  y2={y}
                  stroke="#1e293b"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <text
                  x={padding.left - 8}
                  y={y + 3.5}
                  textAnchor="end"
                  fill="#64748b"
                  fontSize="9.5"
                  className="font-mono font-medium"
                >
                  {formatNumber(val)}
                </text>
              </g>
            );
          })}

          {/* Vertical lines */}
          {xTicks.map((val, idx) => {
            const x = scaleX(val);
            return (
              <g key={`x-grid-${idx}`}>
                <line
                  x1={x}
                  y1={padding.top}
                  x2={x}
                  y2={padding.top + plotHeight}
                  stroke="#1e293b"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <text
                  x={x}
                  y={padding.top + plotHeight + 14}
                  textAnchor="middle"
                  fill="#64748b"
                  fontSize="9.5"
                  className="font-mono font-medium"
                >
                  {formatNumber(val)}
                </text>
              </g>
            );
          })}

          {/* Solid Axes */}
          <line
            x1={padding.left}
            y1={padding.top + plotHeight}
            x2={padding.left + plotWidth}
            y2={padding.top + plotHeight}
            stroke="#475569"
            strokeWidth="1.5"
          />
          <line
            x1={padding.left}
            y1={padding.top}
            x2={padding.left}
            y2={padding.top + plotHeight}
            stroke="#475569"
            strokeWidth="1.5"
          />

          {/* Axis Labels */}
          <text
            x={padding.left + plotWidth / 2}
            y={padding.top + plotHeight + 30}
            textAnchor="middle"
            fill="#94a3b8"
            fontSize="10"
            fontWeight="600"
            className="font-sans"
          >
            {xLabel} {xUnit ? `(${xUnit})` : ''}
          </text>

          <text
            x={-(padding.top + plotHeight / 2)}
            y={16}
            transform="rotate(-90)"
            textAnchor="middle"
            fill="#94a3b8"
            fontSize="10"
            fontWeight="600"
            className="font-sans"
          >
            {yLabel} {yUnit ? `(${yUnit})` : ''}
          </text>

          {/* Reference Lines (e.g. Vth, Pmax, Saturation rails) */}
          {referenceLines.map((ref, idx) => {
            if (ref.type === 'y') {
              const y = scaleY(ref.value);
              return (
                <g key={`ref-${idx}`}>
                  <line
                    x1={padding.left}
                    y1={y}
                    x2={padding.left + plotWidth}
                    y2={y}
                    stroke={ref.color || '#94a3b8'}
                    strokeWidth="1.2"
                    strokeDasharray={ref.strokeDasharray || '4 4'}
                  />
                  {ref.label && (
                    <text
                      x={padding.left + plotWidth - 4}
                      y={y - 4}
                      textAnchor="end"
                      fill={ref.color || '#94a3b8'}
                      fontSize="9"
                      fontWeight="bold"
                      className="font-mono"
                    >
                      {ref.label}
                    </text>
                  )}
                </g>
              );
            }
            if (ref.type === 'x') {
              const x = scaleX(ref.value);
              return (
                <g key={`ref-${idx}`}>
                  <line
                    x1={x}
                    y1={padding.top}
                    x2={x}
                    y2={padding.top + plotHeight}
                    stroke={ref.color || '#94a3b8'}
                    strokeWidth="1.2"
                    strokeDasharray={ref.strokeDasharray || '4 4'}
                  />
                  {ref.label && (
                    <text
                      x={x + 4}
                      y={padding.top + 12}
                      textAnchor="start"
                      fill={ref.color || '#94a3b8'}
                      fontSize="9"
                      fontWeight="bold"
                      className="font-mono"
                    >
                      {ref.label}
                    </text>
                  )}
                </g>
              );
            }
            return null;
          })}

          {/* Series Curves and Area Fills */}
          {series.map((s, idx) => {
            const pathD = buildPath(s.data);
            const areaPathD = s.fillArea ? buildAreaPath(s.data) : null;
            return (
              <g key={idx}>
                {areaPathD && (
                  <path
                    d={areaPathD}
                    fill={`url(#grad-${idx}-${title?.replace(/\s+/g, '')})`}
                  />
                )}
                <path
                  d={pathD}
                  fill="none"
                  stroke={s.color}
                  strokeWidth={s.strokeWidth || 2.2}
                  strokeDasharray={s.strokeDasharray || undefined}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            );
          })}

          {/* Live Operating Point Marker (Pulsating Dot with Pill) */}
          {operatingPoint && Number.isFinite(operatingPoint.x) && Number.isFinite(operatingPoint.y) && (
            <g className="cursor-pointer">
              {/* Outer pulsing ping */}
              <circle
                cx={scaleX(operatingPoint.x)}
                cy={scaleY(operatingPoint.y)}
                r="7"
                fill={operatingPoint.color || '#38bdf8'}
                fillOpacity="0.4"
                className="animate-ping"
              />
              {/* Inner dot */}
              <circle
                cx={scaleX(operatingPoint.x)}
                cy={scaleY(operatingPoint.y)}
                r="4.5"
                fill={operatingPoint.color || '#38bdf8'}
                stroke="#020617"
                strokeWidth="2"
                className="shadow-md"
              />

              {/* Coordinate Callout Tag */}
              {operatingPoint.label && (
                <g>
                  {/* Background pill */}
                  <rect
                    x={Math.min(
                      padding.left + plotWidth - 110,
                      Math.max(padding.left, scaleX(operatingPoint.x) - 55)
                    )}
                    y={Math.max(padding.top + 2, scaleY(operatingPoint.y) - 24)}
                    width="110"
                    height="18"
                    rx="5"
                    fill="#0f172a"
                    fillOpacity="0.9"
                    stroke={operatingPoint.color || '#38bdf8'}
                    strokeWidth="1"
                  />
                  <text
                    x={Math.min(
                      padding.left + plotWidth - 55,
                      Math.max(padding.left + 55, scaleX(operatingPoint.x))
                    )}
                    y={Math.max(padding.top + 14, scaleY(operatingPoint.y) - 12)}
                    textAnchor="middle"
                    fill="#f8fafc"
                    fontSize="9"
                    fontWeight="bold"
                    className="font-mono"
                  >
                    {operatingPoint.label}
                  </text>
                </g>
              )}
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}
