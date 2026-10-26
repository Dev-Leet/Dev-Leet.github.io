import React, { useEffect, useRef, useState } from 'react';

// Deterministic pseudo-random height (55px to 245px) for a virtual world cell (col, worldRow)
// Using a pure spatial hash ensures that when the grid wraps by 1 row during scrolling,
// each physical spot on screen retains its exact maxZ height seamlessly.
function getCellMaxZ(col: number, worldRow: number): number {
  const n = Math.sin(col * 12.9898 + worldRow * 78.233) * 43758.5453;
  const frac = n - Math.floor(n);
  return 55 + frac * 190;
}

export default function InteractiveGrid() {
  const [grid, setGrid] = useState({ cols: 0, rows: 0, cellSize: 50 });
  const [isDark, setIsDark] = useState(true);
  const cellsRef = useRef<(HTMLDivElement | null)[]>([]);
  const activeFlagsRef = useRef<boolean[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Observe light/dark theme class on <html> so the 3D grid looks great in both modes
  useEffect(() => {
    const htmlEl = document.documentElement;
    const updateTheme = () => {
      setIsDark(htmlEl.classList.contains('dark'));
    };
    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(htmlEl, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Responsive grid calculation with debounced resize handling
  useEffect(() => {
    let resizeTimer: number | undefined;

    const calculateGrid = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const isMobile = w < 768;
      // Slightly compact cell size on mobile, with 1.5x overscan so edges never show during 3D tilt + scroll
      const cellSize = isMobile ? 48 : 52;
      const overscan = isMobile ? 1.45 : 1.55;

      const cols = Math.ceil((w * overscan) / cellSize) + 2;
      const rows = Math.ceil((h * overscan) / cellSize) + 2;

      setGrid((prev) => {
        if (prev.cols === cols && prev.rows === rows && prev.cellSize === cellSize) {
          return prev;
        }
        cellsRef.current = new Array(cols * rows).fill(null);
        activeFlagsRef.current = new Array(cols * rows).fill(false);
        return { cols, rows, cellSize };
      });
    };

    calculateGrid();

    const handleResize = () => {
      if (resizeTimer) window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(calculateGrid, 80);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });
    return () => {
      if (resizeTimer) window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  // Unified 60-120fps physics loop for mouse, touch, mobile gyroscope, ambient drift, and scroll
  useEffect(() => {
    if (grid.cols === 0 || grid.rows === 0) return;

    const { cols, rows, cellSize } = grid;
    const isMobileScreen = window.innerWidth < 768;
    const maxRadius = isMobileScreen ? 210 : 265;

    // Input & physics state (kept in closure for zero React re-render overhead)
    let vw = window.innerWidth;
    let vh = window.innerHeight;

    let pointerX = vw / 2;
    let pointerY = vh / 2;
    let smoothX = vw / 2;
    let smoothY = vh / 2;

    let isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    let isInteracting = false;
    let lastInputTime = 0;

    let targetScrollY = window.scrollY || 0;
    let smoothScrollY = targetScrollY;
    let smoothScrollVel = 0;

    // Mobile gyroscope tilt (in degrees, normalized to -1..1)
    let gyroX = 0;
    let gyroY = 0;
    let smoothGyroX = 0;
    let smoothGyroY = 0;

    let smoothWallRotX = 0;
    let smoothWallRotY = 0;
    let smoothWallRotZ = 0;
    let smoothWallZ = 0;

    // Reset all cell styles once on grid/theme initialization
    // Dark mode stays untouched; Light mode uses crisp dark-slate base lines for strong 3D structure
    const baseBg = isDark ? 'rgba(255, 255, 255, 0.012)' : 'rgba(15, 23, 42, 0.035)';
    const baseBorder = isDark ? 'rgba(255, 255, 255, 0.065)' : 'rgba(15, 23, 42, 0.14)';

    for (let i = 0; i < cols * rows; i++) {
      const el = cellsRef.current[i];
      if (el) {
        el.style.transform = 'translate3d(0px, 0px, 0px) scale(1) rotateX(0deg) rotateY(0deg)';
        el.style.backgroundColor = baseBg;
        el.style.borderColor = baseBorder;
        el.style.boxShadow = 'none';
        el.style.zIndex = '1';
      }
      activeFlagsRef.current[i] = false;
    }

    const onMouseMove = (e: MouseEvent) => {
      pointerX = e.clientX;
      pointerY = e.clientY;
      isInteracting = true;
      lastInputTime = performance.now();
    };

    const onMouseLeave = () => {
      isInteracting = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      isTouchDevice = true;
      if (e.touches.length > 0) {
        pointerX = e.touches[0].clientX;
        pointerY = e.touches[0].clientY;
        isInteracting = true;
        lastInputTime = performance.now();
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      isTouchDevice = true;
      if (e.touches.length > 0) {
        pointerX = e.touches[0].clientX;
        pointerY = e.touches[0].clientY;
        isInteracting = true;
        lastInputTime = performance.now();
      }
    };

    const onTouchEnd = () => {
      isInteracting = false;
      lastInputTime = performance.now();
    };

    const onScroll = () => {
      targetScrollY = window.scrollY || document.documentElement.scrollTop || 0;
    };

    const onDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        // gamma: left-to-right tilt (-90 to 90), beta: front-to-back tilt (-180 to 180, ~45 neutral holding angle)
        gyroX = Math.max(-1, Math.min(1, e.gamma / 30));
        gyroY = Math.max(-1, Math.min(1, (e.beta - 45) / 30));
      }
    };

    const onViewportResize = () => {
      vw = window.innerWidth;
      vh = window.innerHeight;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('touchcancel', onTouchEnd, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('deviceorientation', onDeviceOrientation, { passive: true });
    window.addEventListener('resize', onViewportResize, { passive: true });

    let rafId = 0;
    let prevTime = performance.now();

    const animate = (now: number) => {
      const dt = Math.min((now - prevTime) / 1000, 0.05);
      prevTime = now;

      // Frame-rate independent damping factors
      const pointerLerp = 1 - Math.exp(-dt * 10);
      const scrollLerp = 1 - Math.exp(-dt * 12);
      const wallLerp = 1 - Math.exp(-dt * 8);

      // 1. Smooth scroll position & velocity
      const prevScroll = smoothScrollY;
      smoothScrollY += (targetScrollY - smoothScrollY) * scrollLerp;
      const instVel = (smoothScrollY - prevScroll) / Math.max(dt, 0.008);
      smoothScrollVel += (instVel - smoothScrollVel) * scrollLerp;
      const clampedVel = Math.max(-1800, Math.min(1800, smoothScrollVel));

      const maxScroll = Math.max(1, document.documentElement.scrollHeight - vh);
      const scrollProgress = Math.max(0, Math.min(1, smoothScrollY / maxScroll));

      // 2. Smooth gyroscope values
      smoothGyroX += (gyroX - smoothGyroX) * wallLerp;
      smoothGyroY += (gyroY - smoothGyroY) * wallLerp;

      // 3. Autonomous focal point on mobile / idle so the 3D background is always alive
      const timeSec = now * 0.001;
      const timeSinceInput = (now - lastInputTime) * 0.001;
      // Blend toward ambient motion when not actively touching on mobile or when pointer hasn't moved recently
      const idleTimeout = isTouchDevice ? 1.2 : 3.5;
      const shouldAmbient = !isInteracting || timeSinceInput > idleTimeout;

      // Lissajous figure-8 ambient path that also shifts with scroll position and gyroscope
      const ambientX =
        vw * 0.5 +
        Math.sin(timeSec * 0.65 + smoothScrollY * 0.002) * (vw * 0.28) +
        smoothGyroX * (vw * 0.22);
      const ambientY =
        vh * 0.5 +
        Math.cos(timeSec * 0.48 - smoothScrollY * 0.0025) * (vh * 0.24) +
        smoothGyroY * (vh * 0.2) -
        (clampedVel / 1800) * (vh * 0.14);

      // On active pointer/touch, shift focal Y slightly with scroll velocity so scrolling under a stationary cursor ripples naturally
      const activeTargetX = pointerX + smoothGyroX * 35;
      const activeTargetY = pointerY - (clampedVel / 1800) * 55 + smoothGyroY * 35;

      const targetFocalX = shouldAmbient ? ambientX : activeTargetX;
      const targetFocalY = shouldAmbient ? ambientY : activeTargetY;

      smoothX += (targetFocalX - smoothX) * pointerLerp;
      smoothY += (targetFocalY - smoothY) * pointerLerp;

      // 4. Calculate 3D wall rotation & seamless scroll translation
      const centerX = vw * 0.5;
      const centerY = vh * 0.5;
      const normX = (smoothX - centerX) / Math.max(1, centerX); // -1 to 1
      const normY = (smoothY - centerY) / Math.max(1, centerY); // -1 to 1

      // Combine pointer tilt + scroll pitch/roll + gyroscope tilt
      const scrollPitch = (scrollProgress - 0.5) * 7 + (clampedVel / 1800) * 6;
      const scrollRoll = Math.sin(smoothScrollY * 0.0015) * 2.2;
      const targetWallRotX = normY * -8.5 + scrollPitch + smoothGyroY * -6;
      const targetWallRotY = normX * 8.5 + Math.cos(smoothScrollY * 0.0012) * 2.5 + smoothGyroX * 6;
      const targetWallRotZ = scrollRoll + normX * normY * 1.5;
      const targetWallZ = -Math.abs(clampedVel) * 0.025 + Math.sin(scrollProgress * Math.PI) * 18;

      smoothWallRotX += (targetWallRotX - smoothWallRotX) * wallLerp;
      smoothWallRotY += (targetWallRotY - smoothWallRotY) * wallLerp;
      smoothWallRotZ += (targetWallRotZ - smoothWallRotZ) * wallLerp;
      smoothWallZ += (targetWallZ - smoothWallZ) * wallLerp;

      // Seamless infinite vertical scroll of the 3D grid wall:
      // Shift by 45% of scroll distance, wrapping cleanly every cellSize pixels while incrementing worldRow
      const parallaxScroll = smoothScrollY * 0.45;
      const gridStep = Math.floor(parallaxScroll / cellSize);
      const subPixelOffsetY = -(((parallaxScroll % cellSize) + cellSize) % cellSize);
      const parallaxOffsetX = Math.sin(smoothScrollY * 0.001) * 14;

      if (containerRef.current) {
        containerRef.current.style.transform = `translate3d(${parallaxOffsetX.toFixed(1)}px, ${subPixelOffsetY.toFixed(1)}px, ${smoothWallZ.toFixed(1)}px) rotateX(${smoothWallRotX.toFixed(2)}deg) rotateY(${smoothWallRotY.toFixed(2)}deg) rotateZ(${smoothWallRotZ.toFixed(2)}deg)`;
      }

      // 5. Update individual 3D grid cells with smooth cubic falloff and scroll-driven wave
      const scrollSpeedNorm = Math.min(1, Math.abs(clampedVel) / 900);
      const halfCols = cols * 0.5;
      const halfRows = rows * 0.5;

      for (let r = 0; r < rows; r++) {
        const relY = (r + 0.5 - halfRows) * cellSize;
        const cellScreenY = centerY + relY + subPixelOffsetY;
        const dy = cellScreenY - smoothY;
        const worldRow = r + gridStep;

        // Scroll-coupled 3D wave across rows
        const rowWave =
          Math.sin(worldRow * 0.42 - smoothScrollY * 0.018 + timeSec * 1.6) *
          (0.12 + scrollSpeedNorm * 0.32);

        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          const el = cellsRef.current[idx];
          if (!el) continue;

          const relX = (c + 0.5 - halfCols) * cellSize;
          const cellScreenX = centerX + relX + parallaxOffsetX;
          const dx = cellScreenX - smoothX;

          // Quick bounding-box check before Math.hypot
          const absDx = Math.abs(dx);
          const absDy = Math.abs(dy);

          let radialIntensity = 0;
          if (absDx < maxRadius && absDy < maxRadius) {
            const dist = Math.hypot(dx, dy);
            if (dist < maxRadius) {
              const t = 1 - dist / maxRadius;
              // Smoothstep (cubic Hermite) curve so cells glide gently in/out with zero edge snapping
              radialIntensity = t * t * (3 - 2 * t);
            }
          }

          // Combine pointer/touch proximity with subtle scroll wave near the active zone
          const colWave = Math.cos(c * 0.38 + smoothScrollY * 0.012) * scrollSpeedNorm * 0.18;
          const waveContribution = Math.max(0, (rowWave + colWave) * (0.35 + radialIntensity * 0.65));
          const intensity = Math.min(1, radialIntensity + waveContribution * (radialIntensity > 0.01 || scrollSpeedNorm > 0.08 ? 1 : 0));

          if (intensity > 0.008) {
            activeFlagsRef.current[idx] = true;
            const maxZ = getCellMaxZ(c, worldRow);
            const zLift = intensity * maxZ;
            const scale = 1 + intensity * 0.09;

            // Smoothly tilt the cell toward the focal point and scroll wave
            const normDx = Math.max(-1, Math.min(1, dx / maxRadius));
            const normDy = Math.max(-1, Math.min(1, dy / maxRadius));
            const cellRotateX = normDy * -36 * radialIntensity + rowWave * 18;
            const cellRotateY = normDx * 36 * radialIntensity;

            el.style.transform = `translate3d(0px, 0px, ${zLift.toFixed(1)}px) scale(${scale.toFixed(3)}) rotateX(${cellRotateX.toFixed(1)}deg) rotateY(${cellRotateY.toFixed(1)}deg)`;

            if (isDark) {
              // Dark mode: unchanged bright teal edge-lit glow
              el.style.backgroundColor = `rgba(45, 212, 191, ${(intensity * 0.045).toFixed(3)})`;
              el.style.borderColor = `rgba(45, 212, 191, ${Math.min(1, 0.12 + intensity * 0.88).toFixed(3)})`;
              el.style.boxShadow = `0 0 ${(24 * intensity).toFixed(1)}px rgba(45, 212, 191, ${(intensity * 0.75).toFixed(3)}), inset 0 0 ${(16 * intensity).toFixed(1)}px rgba(45, 212, 191, ${(intensity * 0.8).toFixed(3)})`;
            } else {
              // Light mode: shine a bold DARK obsidian/charcoal aura and crisp dark borders for high-contrast 3D visibility
              el.style.backgroundColor = `rgba(15, 23, 42, ${(intensity * 0.22).toFixed(3)})`;
              el.style.borderColor = `rgba(9, 13, 22, ${Math.min(1, 0.35 + intensity * 0.65).toFixed(3)})`;
              el.style.boxShadow = `0 ${(10 * intensity).toFixed(1)}px ${(28 * intensity).toFixed(1)}px rgba(9, 13, 22, ${(intensity * 0.68).toFixed(3)}), 0 0 ${(18 * intensity).toFixed(1)}px rgba(15, 23, 42, ${(intensity * 0.55).toFixed(3)}), inset 0 0 ${(18 * intensity).toFixed(1)}px rgba(9, 13, 22, ${(intensity * 0.65).toFixed(3)})`;
            }
            el.style.zIndex = `${Math.round(intensity * 100) + 2}`;
          } else if (activeFlagsRef.current[idx]) {
            // Only write reset styles once when a cell transitions back to rest
            activeFlagsRef.current[idx] = false;
            el.style.transform = 'translate3d(0px, 0px, 0px) scale(1) rotateX(0deg) rotateY(0deg)';
            el.style.backgroundColor = baseBg;
            el.style.borderColor = baseBorder;
            el.style.boxShadow = 'none';
            el.style.zIndex = '1';
          }
        }
      }

      rafId = window.requestAnimationFrame(animate);
    };

    rafId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchEnd);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('deviceorientation', onDeviceOrientation);
      window.removeEventListener('resize', onViewportResize);
    };
  }, [grid, isDark]);

  const totalCells = grid.cols * grid.rows;

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none transition-colors duration-500 bg-slate-50 dark:bg-[#070707]"
      style={{ perspective: '850px' }}
      aria-hidden="true"
    >
      {/* Subtle radial vignette that keeps the 3D grid visible while softening screen corners */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none transition-opacity duration-500"
        style={{
          background: isDark
            ? 'radial-gradient(circle at 50% 50%, transparent 38%, rgba(7, 7, 7, 0.88) 100%)'
            : 'radial-gradient(circle at 50% 50%, transparent 48%, rgba(241, 245, 249, 0.65) 100%)',
        }}
      />

      <div
        ref={containerRef}
        className="relative flex flex-wrap justify-center items-center transform-gpu will-change-transform"
        style={{
          width: `${grid.cols * grid.cellSize}px`,
          height: `${grid.rows * grid.cellSize}px`,
          position: 'absolute',
          top: '50%',
          left: '50%',
          marginLeft: `-${(grid.cols * grid.cellSize) / 2}px`,
          marginTop: `-${(grid.rows * grid.cellSize) / 2}px`,
          transformStyle: 'preserve-3d',
        }}
      >
        {Array.from({ length: totalCells }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              cellsRef.current[i] = el;
            }}
            className="border border-slate-900/[0.14] dark:border-white/[0.065] bg-slate-900/[0.035] dark:bg-white/[0.012] will-change-transform"
            style={{
              width: `${grid.cellSize}px`,
              height: `${grid.cellSize}px`,
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
            }}
          />
        ))}
      </div>
    </div>
  );
}