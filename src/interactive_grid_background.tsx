import React, { useEffect, useRef, useState } from 'react';

type GridCellInfo = { el: HTMLDivElement; cx: number; cy: number; maxZ: number };

export default function InteractiveGrid() {
  const [grid, setGrid] = useState({ cols: 0, rows: 0 });
  const cellsRef = useRef<(HTMLDivElement | null)[]>([]);
  const gridInfo = useRef<(GridCellInfo | null)[]>([]); // Stores pre-calculated cell coordinates for performance
  const containerRef = useRef<HTMLDivElement | null>(null); // Reference for the main 3D wall

  // Configuration for the grid and interaction
  const CELL_SIZE = 50; // Size of each grid square in pixels
  const MAX_RADIUS = 250; // How far the hover effect reaches

  useEffect(() => {
    const calculateGrid = () => {
      // Overscan the grid by 1.5x so edges don't show when the entire wall tilts in 3D
      const cols = Math.ceil((window.innerWidth * 1.5) / CELL_SIZE);
      const rows = Math.ceil((window.innerHeight * 1.5) / CELL_SIZE);

      // Reset refs array when grid size changes to prevent memory leaks
      cellsRef.current = new Array(cols * rows).fill(null);
      setGrid({ cols, rows });
    };

    calculateGrid();
    window.addEventListener('resize', calculateGrid);
    return () => window.removeEventListener('resize', calculateGrid);
  }, []);

  // We do this so we don't have to call expensive getBoundingClientRect() on every mouse move.
  useEffect(() => {
    if (grid.cols === 0 || grid.rows === 0) return;

    // Small timeout ensures the DOM has painted before we measure it
    const timeoutId = setTimeout(() => {
      gridInfo.current = cellsRef.current.map((el) => {
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return {
          el,
          // Calculate the absolute center X and Y of this specific cell
          cx: rect.left + rect.width / 2,
          cy: rect.top + rect.height / 2,
          // Assign a random max height for this specific cell (between 50px and 250px)
          maxZ: Math.random() * 200 + 50,
        };
      });
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [grid]);

  useEffect(() => {
    // Disable on touch devices for better mobile performance
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      if (containerRef.current) {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        // Max rotation of 8 degrees on the main wall to keep it feeling like a solid room
        const rotateX = ((clientY - centerY) / centerY) * -8;
        const rotateY = ((clientX - centerX) / centerX) * 8;

        containerRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }

      // Loop through pre-calculated cell positions
      gridInfo.current.forEach((cell) => {
        if (!cell) return;

        // Calculate distance from mouse to the center of this cell using Pythagoras
        const dx = cell.cx - clientX;
        const dy = cell.cy - clientY;
        const dist = Math.hypot(dx, dy);

        // If the mouse is within our defined radius, apply the lift and glow
        if (dist < MAX_RADIUS) {
          // Calculate intensity (0 to 1). Closer to mouse = higher intensity
          const intensity = 1 - dist / MAX_RADIUS;

          // Physics/Visual calculations
          // Lifts to its own completely random max height based on intensity
          const zLift = intensity * cell.maxZ;
          const scale = 1 + (intensity * 0.1); // Slightly lower scale to prioritize the dramatic Z-lift

          // Calculate tilt angles so the cell "points" towards the mouse
          const cellRotateX = (dy / MAX_RADIUS) * -45; // Tilt up/down up to 45deg
          const cellRotateY = (dx / MAX_RADIUS) * 45; // Tilt left/right up to 45deg

          // Apply direct DOM manipulation for max performance (bypassing React state renders)
          cell.el.style.transform = `translateZ(${zLift}px) scale(${scale}) rotateX(${cellRotateX}deg) rotateY(${cellRotateY}deg)`;

          // EDGE LIGHTING CONCENTRATION:
          // Keep background highly transparent so the inner volume feels empty
          cell.el.style.backgroundColor = `rgba(45, 212, 191, ${intensity * 0.02})`;
          // Intense bright borders for the "edge lit" look, scaling width based on proximity
          cell.el.style.borderColor = `rgba(45, 212, 191, ${intensity})`;
          cell.el.style.borderWidth = `${1 + (intensity * 2)}px`;
          // Glowing shadows heavily concentrated on the outer and inner edges of the border
          cell.el.style.boxShadow = `0 0 ${25 * intensity}px rgba(45, 212, 191, ${intensity * 0.8}), inset 0 0 ${20 * intensity}px rgba(45, 212, 191, ${intensity * 0.9})`;
          cell.el.style.zIndex = `${Math.round(intensity * 100)}`;
        } else {
          // Reset styles immediately when mouse leaves radius
          cell.el.style.transform = `translateZ(0px) scale(1) rotateX(0deg) rotateY(0deg)`;
          cell.el.style.backgroundColor = `rgba(255, 255, 255, 0.01)`; // Subtle white fill for structure
          cell.el.style.borderColor = `rgba(255, 255, 255, 0.06)`; // Subtly brighter base grid lines
          cell.el.style.borderWidth = `1px`;
          cell.el.style.boxShadow = `none`;
          cell.el.style.zIndex = '1';
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const totalCells = grid.cols * grid.rows;

  return (
    // The container requires CSS perspective to make translateZ actually pop out towards the user
    <div
      className="fixed inset-0 z-[-1] overflow-hidden bg-[#0a0a0a]"
      style={{ perspective: '800px' }}
    >
      {/* We apply a subtle radial gradient mask to fade the grid out near the edges of the screen */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 30%, #0a0a0a 100%)'
        }}
      />

      <div
        ref={containerRef}
        className="relative flex flex-wrap justify-center items-center transform-gpu transition-transform duration-75 ease-out"
        style={{
          width: `${grid.cols * CELL_SIZE}px`,
          height: `${grid.rows * CELL_SIZE}px`,
          // Absolute positioning to center the oversized grid
          position: 'absolute',
          top: '50%',
          left: '50%',
          marginLeft: `-${(grid.cols * CELL_SIZE) / 2}px`,
          marginTop: `-${(grid.rows * CELL_SIZE) / 2}px`,
          transformStyle: 'preserve-3d',
        }}
      >
        {Array.from({ length: totalCells }).map((_, i) => (
          <div
            key={i}
            ref={(el) => { cellsRef.current[i] = el; }}
            // Added a slight background fill to default cells to make them look like physical panels
            className="border border-white/[0.06] bg-white/[0.01] transition-all duration-200 ease-out will-change-transform"
            style={{
              width: `${CELL_SIZE}px`,
              height: `${CELL_SIZE}px`,
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
            }}
          />
        ))}
      </div>
    </div>
  );
}