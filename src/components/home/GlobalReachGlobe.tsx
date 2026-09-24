import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import landTopology from 'world-atlas/land-110m.json';
import { 
  Compass, 
  MapPin, 
  Play, 
  Pause, 
  RotateCw, 
  ArrowUpRight, 
  ShieldCheck, 
  Building2, 
  Sparkles,
  Globe2
} from 'lucide-react';
import { useAppNavigation } from '@/src/context/RouteContext';

export interface GlobalHub {
  id: string;
  city: string;
  country: string;
  coordinates: [number, number]; // [longitude, latitude]
  role: string;
  focus: string;
  region: 'Africa' | 'Americas' | 'Europe' | 'Middle East & Asia';
  localTimezone: string;
  isHQ?: boolean;
  activeBriefs: number;
}

export const GLOBAL_HUBS: GlobalHub[] = [
  {
    id: 'accra',
    city: 'Accra',
    country: 'Ghana',
    coordinates: [-0.187, 5.6037],
    role: 'Global Headquarters & Creative Foundry',
    focus: 'Ecosystem Governance, Technical Writing & Full-Stack Development',
    region: 'Africa',
    localTimezone: 'Africa/Accra',
    isHQ: true,
    activeBriefs: 28,
  },
  {
    id: 'london',
    city: 'London',
    country: 'United Kingdom',
    coordinates: [-0.1276, 51.5074],
    role: 'European Commercial & Enterprise Desk',
    focus: 'Corporate Restructuring, Investor Decks & Transnational Strategy',
    region: 'Europe',
    localTimezone: 'Europe/London',
    activeBriefs: 19,
  },
  {
    id: 'new-york',
    city: 'New York',
    country: 'United States',
    coordinates: [-74.006, 40.7128],
    role: 'Capital Advisory & Market Intelligence',
    focus: 'Institutional Business Planning & Cross-Border Feasibility',
    region: 'Americas',
    localTimezone: 'America/New_York',
    activeBriefs: 22,
  },
  {
    id: 'toronto',
    city: 'Toronto',
    country: 'Canada',
    coordinates: [-79.3832, 43.6532],
    role: 'Academic & Admissions Liaison',
    focus: 'Graduate SOPs, Academic Fellowships & Visa Statements',
    region: 'Americas',
    localTimezone: 'America/Toronto',
    activeBriefs: 16,
  },
  {
    id: 'dubai',
    city: 'Dubai',
    country: 'United Arab Emirates',
    coordinates: [55.2708, 25.2048],
    role: 'MENA Strategic Corridor',
    focus: 'Trade Licensing Blueprints & Venture Pitch Architecture',
    region: 'Middle East & Asia',
    localTimezone: 'Asia/Dubai',
    activeBriefs: 14,
  },
  {
    id: 'nairobi',
    city: 'Nairobi',
    country: 'Kenya',
    coordinates: [36.8219, -1.2921],
    role: 'East Africa Tech Corridor',
    focus: 'Fintech Documentation & Software Architecture Advisory',
    region: 'Africa',
    localTimezone: 'Africa/Nairobi',
    activeBriefs: 12,
  },
  {
    id: 'berlin',
    city: 'Berlin',
    country: 'Germany',
    coordinates: [13.405, 52.52],
    role: 'Digital Atelier & Brand Strategy',
    focus: 'Design Systems & High-Craft Visual Identities',
    region: 'Europe',
    localTimezone: 'Europe/Berlin',
    activeBriefs: 11,
  },
  {
    id: 'singapore',
    city: 'Singapore',
    country: 'Singapore',
    coordinates: [103.8198, 1.3521],
    role: 'Asia-Pacific Strategic Partner Desk',
    focus: 'Market Intelligence & Global Expansion Roadmaps',
    region: 'Middle East & Asia',
    localTimezone: 'Asia/Singapore',
    activeBriefs: 9,
  },
  {
    id: 'johannesburg',
    city: 'Johannesburg',
    country: 'South Africa',
    coordinates: [28.0473, -26.2041],
    role: 'Southern Africa Industrial Desk',
    focus: 'Industrial Feasibility, Energy & Mining Strategic Reports',
    region: 'Africa',
    localTimezone: 'Africa/Johannesburg',
    activeBriefs: 10,
  },
];

export const GlobalReachGlobe: React.FC = () => {
  const { navigate, openServiceModal } = useAppNavigation();
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Globe dimensions & interactive state
  const [selectedHub, setSelectedHub] = useState<GlobalHub>(GLOBAL_HUBS[0]);
  const [activeRegion, setActiveRegion] = useState<string>('All');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [hoveredHub, setHoveredHub] = useState<GlobalHub | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number } | null>(null);

  // Rotation parameters: [yaw, pitch, roll]
  const rotationRef = useRef<[number, number, number]>([-10, -12, 0]);
  const isDraggingRef = useRef<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number; r: [number, number, number] }>({
    x: 0,
    y: 0,
    r: [-10, -12, 0],
  });
  const animFrameRef = useRef<number | null>(null);
  const transitionRef = useRef<{
    startR: [number, number, number];
    targetR: [number, number, number];
    startTime: number;
    duration: number;
  } | null>(null);

  // Format current local time in each hub's timezone
  const getCityLocalTime = (tz: string) => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }).format(new Date());
    } catch {
      return '12:00 PM';
    }
  };

  // Convert land topology once
  const landGeoJSON = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return topojson.feature(landTopology as any, (landTopology as any).objects.land);
  }, []);

  const graticule = useMemo(() => d3.geoGraticule10(), []);

  // Filtered hubs by region
  const displayedHubs = useMemo(() => {
    if (activeRegion === 'All') return GLOBAL_HUBS;
    return GLOBAL_HUBS.filter((h) => h.region === activeRegion);
  }, [activeRegion]);

  // Center smoothly on a hub
  const centerOnHub = useCallback((hub: GlobalHub) => {
    setSelectedHub(hub);
    const targetYaw = -hub.coordinates[0];
    const targetPitch = -hub.coordinates[1];

    transitionRef.current = {
      startR: [...rotationRef.current],
      targetR: [targetYaw, targetPitch, 0],
      startTime: performance.now(),
      duration: 1100,
    };
  }, []);

  useEffect(() => {
    const svgElement = svgRef.current;
    if (!svgElement) return;

    const width = 520;
    const height = 520;
    const radius = 230;

    const svg = d3.select(svgElement);
    svg.selectAll('*').remove();

    // Defs for luxury gradients & shadow filters
    const defs = svg.append('defs');

    // Deep Navy Atmospheric Vignette
    const oceanGrad = defs
      .append('radialGradient')
      .attr('id', 'globe-ocean')
      .attr('cx', '48%')
      .attr('cy', '45%')
      .attr('r', '60%');
    oceanGrad.append('stop').attr('offset', '0%').attr('stop-color', '#0e1c38');
    oceanGrad.append('stop').attr('offset', '65%').attr('stop-color', '#060d1e');
    oceanGrad.append('stop').attr('offset', '100%').attr('stop-color', '#02050c');

    // Outer Celestial Gold Halo
    const haloGrad = defs
      .append('radialGradient')
      .attr('id', 'globe-halo')
      .attr('cx', '50%')
      .attr('cy', '50%')
      .attr('r', '50%');
    haloGrad.append('stop').attr('offset', '70%').attr('stop-color', 'transparent');
    haloGrad.append('stop').attr('offset', '92%').attr('stop-color', 'rgba(212, 175, 55, 0.16)');
    haloGrad.append('stop').attr('offset', '100%').attr('stop-color', 'transparent');

    // Glow Filter
    const filter = defs.append('filter').attr('id', 'gold-glow');
    filter
      .append('feGaussianBlur')
      .attr('stdDeviation', '3.5')
      .attr('result', 'coloredBlur');
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    // Orthographic projection
    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([width / 2, height / 2])
      .clipAngle(90)
      .rotate(rotationRef.current);

    // Path generator
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const path = d3.geoPath().projection(projection) as any;

    // Atmospheric halo background
    svg
      .append('circle')
      .attr('cx', width / 2)
      .attr('cy', height / 2)
      .attr('r', radius * 1.15)
      .attr('fill', 'url(#globe-halo)')
      .attr('pointer-events', 'none');

    // Outer architectural ring
    svg
      .append('circle')
      .attr('cx', width / 2)
      .attr('cy', height / 2)
      .attr('r', radius + 1)
      .attr('fill', 'none')
      .attr('stroke', 'rgba(212, 175, 55, 0.35)')
      .attr('stroke-width', 1.2)
      .attr('stroke-dasharray', '3 4');

    // Ocean Globe Sphere Body
    svg
      .append('circle')
      .attr('cx', width / 2)
      .attr('cy', height / 2)
      .attr('r', radius)
      .attr('fill', 'url(#globe-ocean)')
      .attr('stroke', 'rgba(212, 175, 55, 0.25)')
      .attr('stroke-width', 1);

    // Groups for layers
    const graticuleGroup = svg.append('g').attr('class', 'graticules');
    const landGroup = svg.append('g').attr('class', 'land');
    const arcsGroup = svg.append('g').attr('class', 'arcs');
    const hubsGroup = svg.append('g').attr('class', 'hubs');

    // Initial render of graticule & land
    graticuleGroup
      .append('path')
      .datum(graticule)
      .attr('d', path)
      .attr('fill', 'none')
      .attr('stroke', 'rgba(255, 255, 255, 0.05)')
      .attr('stroke-width', 0.65);

    landGroup
      .append('path')
      .datum(landGeoJSON)
      .attr('d', path)
      .attr('fill', '#111d35')
      .attr('stroke', 'rgba(212, 175, 55, 0.28)')
      .attr('stroke-width', 0.75);

    const accraHQ = GLOBAL_HUBS[0];

    // Drag behavior
    const drag = d3
      .drag<SVGSVGElement, unknown>()
      .on('start', (event) => {
        isDraggingRef.current = true;
        transitionRef.current = null;
        dragStartRef.current = {
          x: event.x,
          y: event.y,
          r: [...rotationRef.current],
        };
      })
      .on('drag', (event) => {
        const dx = event.x - dragStartRef.current.x;
        const dy = event.y - dragStartRef.current.y;
        const sensitivity = 0.35;

        const newYaw = dragStartRef.current.r[0] + dx * sensitivity;
        const rawPitch = dragStartRef.current.r[1] - dy * sensitivity;
        const newPitch = Math.max(-65, Math.min(65, rawPitch));

        rotationRef.current = [newYaw, newPitch, 0];
      })
      .on('end', () => {
        isDraggingRef.current = false;
      });

    svg.call(drag);

    // Render loop
    const render = () => {
      // Handle smooth transition to target hub
      if (transitionRef.current) {
        const now = performance.now();
        const { startR, targetR, startTime, duration } = transitionRef.current;
        const elapsed = now - startTime;
        const t = Math.min(1, elapsed / duration);
        const easeT = d3.easeCubicOut(t);

        // Normalize yaw rotation for shortest path
        let dYaw = targetR[0] - startR[0];
        while (dYaw > 180) dYaw -= 360;
        while (dYaw < -180) dYaw += 360;

        const curYaw = startR[0] + dYaw * easeT;
        const curPitch = startR[1] + (targetR[1] - startR[1]) * easeT;
        rotationRef.current = [curYaw, curPitch, 0];

        if (t >= 1) {
          transitionRef.current = null;
        }
      } else if (isPlaying && !isDraggingRef.current) {
        // Continuous auto-rotation
        rotationRef.current[0] += 0.16;
      }

      // Apply rotation to projection
      projection.rotate(rotationRef.current);

      // Re-draw map paths
      graticuleGroup.select('path').attr('d', path);
      landGroup.select('path').attr('d', path);

      // Draw Great Circle Arcs from Accra to all active hubs
      const arcsData = displayedHubs
        .filter((h) => !h.isHQ)
        .map((h) => ({
          hub: h,
          geojson: {
            type: 'LineString',
            coordinates: [accraHQ.coordinates, h.coordinates],
          },
        }));

      const arcsSelection = arcsGroup
        .selectAll<SVGPathElement, (typeof arcsData)[0]>('path')
        .data(arcsData, (d) => d.hub.id);

      arcsSelection
        .enter()
        .append('path')
        .merge(arcsSelection)
        .attr('d', (d) => path(d.geojson))
        .attr('fill', 'none')
        .attr('stroke', (d) =>
          d.hub.id === selectedHub.id ? '#FDF0CD' : 'rgba(212, 175, 55, 0.45)'
        )
        .attr('stroke-width', (d) => (d.hub.id === selectedHub.id ? 2 : 1.2))
        .attr('stroke-dasharray', (d) => (d.hub.id === selectedHub.id ? 'none' : '4 3'))
        .attr('opacity', (d) => (d.hub.id === selectedHub.id ? 1 : 0.65));

      arcsSelection.exit().remove();

      // Render Hub Beacon Points
      const currentYaw = rotationRef.current[0];
      const currentPitch = rotationRef.current[1];

      // Visible hubs test: angle < 90 degrees from projection center
      const hubPoints = displayedHubs.map((hub) => {
        const coords = hub.coordinates;
        const dist = d3.geoDistance(coords, [-currentYaw, -currentPitch]);
        const isVisible = dist < Math.PI / 2;
        const projected = projection(coords);

        return {
          hub,
          isVisible,
          x: projected ? projected[0] : 0,
          y: projected ? projected[1] : 0,
        };
      });

      const hubsSelection = hubsGroup
        .selectAll<SVGGElement, (typeof hubPoints)[0]>('g.hub-node')
        .data(
          hubPoints.filter((d) => d.isVisible),
          (d) => d.hub.id
        );

      const hubEnter = hubsSelection.enter().append('g').attr('class', 'hub-node cursor-pointer');

      // Outer ripple
      hubEnter
        .append('circle')
        .attr('class', 'hub-ripple')
        .attr('r', 8)
        .attr('fill', 'none')
        .attr('stroke', '#D4AF37')
        .attr('stroke-width', 1)
        .attr('opacity', 0.5);

      // Inner solid beacon
      hubEnter
        .append('circle')
        .attr('class', 'hub-core')
        .attr('r', (d) => (d.hub.isHQ ? 5 : 3.5))
        .attr('fill', (d) => (d.hub.isHQ ? '#FDF0CD' : '#D4AF37'))
        .attr('stroke', '#050a17')
        .attr('stroke-width', 1.5)
        .attr('filter', 'url(#gold-glow)');

      // Label text
      hubEnter
        .append('text')
        .attr('class', 'hub-label')
        .attr('dx', 8)
        .attr('dy', 4)
        .attr('font-size', '10px')
        .attr('font-family', 'var(--font-mono, monospace)')
        .attr('fill', (d) => (d.hub.id === selectedHub.id ? '#FDF0CD' : '#94a3b8'))
        .attr('font-weight', (d) => (d.hub.id === selectedHub.id ? '700' : '500'))
        .text((d) => d.hub.city);

      // Merge and update positions
      const hubUpdate = hubEnter.merge(hubsSelection);

      hubUpdate.attr('transform', (d) => `translate(${d.x}, ${d.y})`);

      hubUpdate
        .select('.hub-ripple')
        .attr('stroke', (d) =>
          d.hub.id === selectedHub.id ? '#FDF0CD' : 'rgba(212, 175, 55, 0.4)'
        )
        .attr('r', (d) => (d.hub.id === selectedHub.id ? 10 : 7));

      hubUpdate
        .select('.hub-label')
        .attr('fill', (d) => (d.hub.id === selectedHub.id ? '#FDF0CD' : '#94a3b8'))
        .attr('font-weight', (d) => (d.hub.id === selectedHub.id ? '700' : '500'));

      // Event listeners for interactive nodes
      hubUpdate
        .on('click', (_, d) => {
          centerOnHub(d.hub);
        })
        .on('mouseenter', (event, d) => {
          setHoveredHub(d.hub);
          const rect = svgElement.getBoundingClientRect();
          setHoverPosition({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
          });
        })
        .on('mouseleave', () => {
          setHoveredHub(null);
          setHoverPosition(null);
        });

      hubsSelection.exit().remove();

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [displayedHubs, graticule, isPlaying, landGeoJSON, selectedHub, centerOnHub]);

  return (
    <div className="relative rounded-2xl border border-white/[0.08] bg-slate-900/30 p-6 sm:p-10 shadow-2xl backdrop-blur-xl overflow-hidden">
      {/* Decorative Gold Ambient Radial Background */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[300px] bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.06] pb-8 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-semibold text-[#D4AF37] font-mono mb-2">
            <Globe2 className="h-3.5 w-3.5" />
            <span>TRANSNATIONAL ATELIER FOOTPRINT</span>
          </div>
          <h2 className="font-serif-brand text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-snug">
            Global Reach. Institutional Rigor.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-light mt-2 max-w-2xl leading-relaxed">
            Headquartered in Accra with specialized commercial and advisory desks across London, New York, Toronto, Dubai, and Singapore—orchestrating global capital, diaspora ambition, and high-craft digital execution.
          </p>
        </div>

        {/* Region Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
          {(['All', 'Africa', 'Europe', 'Americas', 'Middle East & Asia'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setActiveRegion(r)}
              className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                activeRegion === r
                  ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#FDF0CD] font-medium'
                  : 'border-white/[0.06] bg-white/[0.02] text-slate-400 hover:text-white hover:border-white/20'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Main Body: Globe Canvas (Left/Center) + Active Hub Intelligence Ledger (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-8 relative z-10">
        {/* Globe Visualization Stage */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
          <div className="relative w-full max-w-[520px] aspect-square flex items-center justify-center">
            <svg
              ref={svgRef}
              viewBox="0 0 520 520"
              className="w-full h-full select-none cursor-grab active:cursor-grabbing touch-none drop-shadow-[0_20px_45px_rgba(4,8,22,0.85)]"
            />

            {/* Hover Tooltip Overlay */}
            {hoveredHub && hoverPosition && (
              <div
                style={{
                  left: Math.min(hoverPosition.x + 15, 380),
                  top: Math.max(hoverPosition.y - 45, 10),
                }}
                className="absolute z-30 pointer-events-none rounded-lg border border-[#D4AF37]/50 bg-[#070D1F]/95 p-3 shadow-xl backdrop-blur-md text-left min-w-[200px]"
              >
                <div className="flex items-center justify-between gap-3 text-[10px] font-mono text-[#D4AF37] uppercase">
                  <span>{hoveredHub.country}</span>
                  {hoveredHub.isHQ && (
                    <span className="px-1.5 py-0.2 bg-[#D4AF37]/20 border border-[#D4AF37]/40 rounded text-[9px] text-[#FDF0CD]">
                      HEADQUARTERS
                    </span>
                  )}
                </div>
                <div className="font-serif-brand text-sm font-bold text-white mt-0.5">
                  {hoveredHub.city}
                </div>
                <div className="text-[11px] text-slate-300 font-light mt-1">
                  {hoveredHub.role}
                </div>
                <div className="mt-2 pt-2 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>Local: {getCityLocalTime(hoveredHub.localTimezone)}</span>
                  <span className="text-[#FDF0CD]">{hoveredHub.activeBriefs} Active Briefs</span>
                </div>
              </div>
            )}
          </div>

          {/* Globe Interaction Control Ribbon */}
          <div className="flex items-center gap-3 mt-4 pt-3 border-t border-white/[0.06] w-full max-w-md justify-between text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying((p) => !p)}
                className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                title={isPlaying ? 'Pause Auto-Rotation' : 'Resume Auto-Rotation'}
              >
                {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 text-[#D4AF37]" />}
                <span className="text-[10px] uppercase tracking-wider">{isPlaying ? 'Pause' : 'Rotate'}</span>
              </button>

              <button
                onClick={() => centerOnHub(GLOBAL_HUBS[0])}
                className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                title="Reset to Accra HQ"
              >
                <RotateCw className="h-3.5 w-3.5" />
                <span className="text-[10px] uppercase tracking-wider">Reset HQ</span>
              </button>
            </div>

            <div className="text-[11px] text-slate-400 text-right">
              <span className="hidden sm:inline">Drag sphere to explore &middot; Click nodes to focus</span>
            </div>
          </div>
        </div>

        {/* Right Column: Strategic Hub Intelligence Dossier */}
        <div className="lg:col-span-5 space-y-6">
          {/* Active Hub Dossier Card */}
          <div className="rounded-xl border border-white/[0.08] bg-slate-900/50 p-6 sm:p-7 space-y-5 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-15 pointer-events-none">
              <Building2 className="h-24 w-24 text-[#D4AF37]" />
            </div>

            <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37]">
                  {selectedHub.region} Strategic Gateway
                </span>
                <h3 className="font-serif-brand text-2xl font-bold text-white flex items-center gap-2">
                  <span>{selectedHub.city}</span>
                  <span className="text-xs text-slate-400 font-sans font-light">
                    ({selectedHub.country})
                  </span>
                </h3>
              </div>

              {selectedHub.isHQ ? (
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold font-mono uppercase tracking-wider bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#FDF0CD]">
                  Global HQ
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-white/[0.04] border border-white/[0.08] text-slate-300">
                  Liaison Desk
                </span>
              )}
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="text-slate-400 font-mono text-[10px] uppercase tracking-wider block mb-1">
                  Primary Mandate
                </span>
                <p className="text-slate-200 font-medium leading-relaxed">
                  {selectedHub.role}
                </p>
              </div>

              <div>
                <span className="text-slate-400 font-mono text-[10px] uppercase tracking-wider block mb-1">
                  Practice Specialization
                </span>
                <p className="text-slate-300 font-light leading-relaxed">
                  {selectedHub.focus}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/[0.06] font-mono">
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                  <div className="text-[9px] uppercase text-slate-400">Local Desk Time</div>
                  <div className="text-sm font-bold text-white mt-0.5">
                    {getCityLocalTime(selectedHub.localTimezone)}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                  <div className="text-[9px] uppercase text-slate-400">Active Retainers</div>
                  <div className="text-sm font-bold text-[#FDF0CD] mt-0.5">
                    {selectedHub.activeBriefs} Commissions
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Button for Selected Hub */}
            <div className="pt-2">
              <button
                onClick={() => openServiceModal(undefined, 'enterprise-institutional')}
                className="w-full py-3 px-4 text-xs font-bold uppercase tracking-[0.14em] text-slate-950 bg-gradient-to-r from-[#F4D068] via-[#D4AF37] to-[#B8860B] rounded-lg hover:brightness-110 active:scale-[0.98] transition-all text-center cursor-pointer shadow-md shadow-[#D4AF37]/15 flex items-center justify-center gap-2"
              >
                <span>Engage {selectedHub.city} Liaison</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Hub Navigation Carousel Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-wider font-mono text-slate-400 px-1">
              <span>Transnational Hub Directory</span>
              <span>{GLOBAL_HUBS.length} Verified Desks</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {GLOBAL_HUBS.slice(0, 6).map((hub) => (
                <button
                  key={hub.id}
                  onClick={() => centerOnHub(hub)}
                  className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                    selectedHub.id === hub.id
                      ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-white shadow-sm'
                      : 'border-white/[0.06] bg-white/[0.02] text-slate-400 hover:border-white/20 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-medium font-serif-brand">
                    <span>{hub.city}</span>
                    {hub.isHQ && <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />}
                  </div>
                  <div className="text-[9px] font-mono text-slate-400 truncate mt-0.5">
                    {hub.country}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Transnational Network Telemetry Footer Bar */}
      <div className="mt-12 pt-6 border-t border-white/[0.06] grid grid-cols-2 md:grid-cols-4 gap-4 text-center font-mono">
        <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
          <div className="text-sm font-bold font-serif-brand text-white">Global Desks</div>
          <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Accra &middot; London &middot; Remote</div>
        </div>
        <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
          <div className="text-sm font-bold font-serif-brand text-[#FDF0CD]">Milestone Escrow</div>
          <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">50% Retainer Guarantee</div>
        </div>
        <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
          <div className="text-sm font-bold font-serif-brand text-white">Direct Handoff</div>
          <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Vector &amp; PDF Master Assets</div>
        </div>
        <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
          <div className="text-sm font-bold font-serif-brand text-emerald-400">Concierge Active</div>
          <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">WhatsApp &amp; Live Portal</div>
        </div>
      </div>
    </div>
  );
};
