"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import DottedMap from "dotted-map";
import { useTheme } from "next-themes";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
}

export function WorldMap({
  dots = [],
  lineColor = "#10b981",
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const map = new DottedMap({ height: 100, grid: "diagonal" });

  const { theme } = useTheme();

  const svgMap = map.getSVG({
    radius: 0.22,
    color: theme === "dark" ? "#4B5563" : "#9CA3AF", // Better contrast for dark mode
    shape: "circle",
    backgroundColor: "transparent", // Transparent background to blend with page
  });

  const projectPoint = (lat: number, lng: number) => {
    // Improved projection to better align with the map
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    // Calculate distance for better curve control
    const distance = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
    const curveHeight = Math.min(distance * 0.3, 80); // Proportional curve height
    
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - curveHeight;
    
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  // Dynamic colors based on theme
  const getLineColor = () => {
    return theme === "dark" ? "#22c55e" : lineColor; // Brighter green for dark mode
  };

  const getDotColor = () => {
    return theme === "dark" ? "#22c55e" : lineColor; // Brighter green for dark mode
  };

  const getGlowColor = () => {
    return theme === "dark" ? "#22c55e" : lineColor; // Glow effect for dark mode
  };

  return (
    <div className="w-full aspect-[2/1] relative font-sans">
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none opacity-70 dark:opacity-50"
        alt="world map"
        height="495"
        width="1056"
        draggable={false}
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        {/* Background glow effect for dark mode */}
        {theme === "dark" && (
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
        )}

        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <g key={`path-group-${i}`}>
              {/* Glow effect for dark mode */}
              {theme === "dark" && (
                <motion.path
                  d={createCurvedPath(startPoint, endPoint)}
                  fill="none"
                  stroke={getGlowColor()}
                  strokeWidth="3"
                  opacity="0.3"
                  filter="url(#glow)"
                  initial={{
                    pathLength: 0,
                  }}
                  animate={{
                    pathLength: 1,
                  }}
                  transition={{
                    duration: 1.2,
                    delay: 0.3 * i,
                    ease: "easeOut",
                  }}
                />
              )}
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth={theme === "dark" ? "2" : "1"}
                initial={{
                  pathLength: 0,
                }}
                animate={{
                  pathLength: 1,
                }}
                transition={{
                  duration: 1,
                  delay: 0.5 * i,
                  ease: "easeOut",
                }}
                key={`start-upper-${i}`}
              ></motion.path>
            </g>
          );
        })}

        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={theme === "dark" ? "#22c55e" : "white"} stopOpacity="0" />
            <stop offset="5%" stopColor={getLineColor()} stopOpacity="1" />
            <stop offset="95%" stopColor={getLineColor()} stopOpacity="1" />
            <stop offset="100%" stopColor={theme === "dark" ? "#22c55e" : "white"} stopOpacity="0" />
          </linearGradient>
        </defs>

        {dots.map((dot, i) => (
          <g key={`points-group-${i}`}>
            <g key={`start-${i}`}>
              {/* Glow effect for dots in dark mode */}
              {theme === "dark" && (
                <circle
                  cx={projectPoint(dot.start.lat, dot.start.lng).x}
                  cy={projectPoint(dot.start.lat, dot.start.lng).y}
                  r="6"
                  fill={getGlowColor()}
                  opacity="0.3"
                  filter="url(#glow)"
                />
              )}
              {/* Main connection dot */}
              <circle
                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                r={theme === "dark" ? "3" : "2"}
                fill={getDotColor()}
              />
              <circle
                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                r={theme === "dark" ? "3" : "2"}
                fill={getDotColor()}
                opacity="0.5"
              >
                <animate
                  attributeName="r"
                  from={theme === "dark" ? "3" : "2"}
                  to={theme === "dark" ? "12" : "8"}
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.5"
                  to="0"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
            <g key={`end-${i}`}>
              {/* Glow effect for dots in dark mode */}
              {theme === "dark" && (
                <circle
                  cx={projectPoint(dot.end.lat, dot.end.lng).x}
                  cy={projectPoint(dot.end.lat, dot.end.lng).y}
                  r="6"
                  fill={getGlowColor()}
                  opacity="0.3"
                  filter="url(#glow)"
                />
              )}
              <circle
                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                r={theme === "dark" ? "3" : "2"}
                fill={getDotColor()}
              />
              <circle
                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                r={theme === "dark" ? "3" : "2"}
                fill={getDotColor()}
                opacity="0.5"
              >
                <animate
                  attributeName="r"
                  from={theme === "dark" ? "3" : "2"}
                  to={theme === "dark" ? "12" : "8"}
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.5"
                  to="0"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
} 