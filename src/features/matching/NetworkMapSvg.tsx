import React from 'react';
import { Truck } from 'lucide-react';
import { MatchOption, ReceiverProfile } from '../../mock/types';

interface NetworkMapSvgProps {
  selectedMatch: MatchOption | null;
  isSolving: boolean;
  hasSolved: boolean;
  receiverProfiles?: ReceiverProfile[];
}

export const NetworkMapSvg: React.FC<NetworkMapSvgProps> = ({
  selectedMatch,
  isSolving,
  hasSolved,
  receiverProfiles = [],
}) => {
  // SVG Canvas: 640 x 420
  // Pickup sequence:
  // 1. Muzaffarnagar (Bharat Paper Mills, 9t): (285, 80)
  // 2. Ghaziabad (Shree Ganesh Galvanizers, 12t): (260, 150)
  // 3. Shared route onward to Aravali Cement Kiln (Nimbahera, RJ): (175, 345)
  // Tanker position on route: (215, 250)

  const isHeroBundle = selectedMatch?.id === 'match-opt-1';

  // Secondary unlabelled grey dots (hover shows name)
  const secondaryDots = [
    { name: 'Krishna Textile Processing (Panipat, HR)', x: 210, y: 110, type: 'generator' },
    { name: 'Rana Plastics Ltd. (Faridabad, HR)', x: 250, y: 190, type: 'generator' },
    { name: 'Singh Foundry Works (Ludhiana, PB)', x: 130, y: 55, type: 'generator' },
    { name: 'GreenBrick Eco-Industries (Meerut, UP)', x: 305, y: 130, type: 'receiver', verified: true },
    { name: 'EcoPoly Advanced Recyclers (Rewari, HR)', x: 190, y: 220, type: 'receiver', verified: true },
    { name: 'NeutraChem Solutions (Dahej, GJ)', x: 90, y: 380, type: 'receiver', verified: false },
    { name: 'Marwar Calcining (Beawar, RJ)', x: 155, y: 285, type: 'receiver', verified: false },
    { name: 'IndoSolv Recovery (Greater Noida, UP)', x: 275, y: 175, type: 'receiver', verified: true },
    { name: 'Apex TSDF (Pithampur, MP)', x: 220, y: 395, type: 'receiver', verified: true },
    { name: 'Pragati Pre-Processors (Alwar, RJ)', x: 205, y: 200, type: 'receiver', verified: false },
  ];

  return (
    <div className="relative w-full h-full min-h-[380px] bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-inner flex flex-col">
      {/* SVG Canvas */}
      <svg
        viewBox="0 0 640 420"
        className="w-full h-full flex-1 select-none"
        style={{ background: 'radial-gradient(circle at 40% 40%, #1e293b 0%, #0f172a 100%)' }}
      >
        <defs>
          <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#334155" strokeWidth="0.5" strokeOpacity="0.3" />
          </pattern>

          <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="bundleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D1343A" />
            <stop offset="60%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>

        {/* Background Grid */}
        <rect width="640" height="420" fill="url(#grid)" />

        {/* State outlines subtle guides */}
        <g stroke="#334155" strokeWidth="1" strokeDasharray="4 4" fill="none" opacity="0.4">
          <path d="M 80 40 Q 150 90 200 130" />
          <path d="M 200 130 Q 250 170 330 180" />
          <path d="M 120 180 Q 210 240 175 345" />
        </g>

        {/* Candidate edge flash when solving */}
        {isSolving && (
          <g stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" className="animate-pulse">
            <line x1="260" y1="150" x2="305" y2="130" />
            <line x1="260" y1="150" x2="90" y2="380" />
            <line x1="285" y1="80" x2="175" y2="345" />
          </g>
        )}

        {/* WINNING BUNDLE SEQUENCE: Muzaffarnagar (Pickup 1) -> Ghaziabad (Pickup 2) -> Kiln */}
        {hasSolved && isHeroBundle && (
          <g>
            {/* Leg 1: Muzaffarnagar -> Ghaziabad (Sequence pickup, no backtracking) */}
            <path
              d="M 285 80 L 260 150"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="4"
              strokeDasharray="6 3"
              className="animate-pulse"
            />

            {/* Leg 2: Ghaziabad -> Aravali Cement Works */}
            <path
              d="M 260 150 Q 220 230 175 345"
              fill="none"
              stroke="url(#bundleGradient)"
              strokeWidth="5"
              strokeLinecap="round"
              filter="url(#routeGlow)"
            />

            {/* Route Distance Tag (Min 14px text) */}
            <g transform="translate(230, 260)">
              <rect x="-6" y="-14" width="135" height="24" rx="6" fill="#0f172a" fillOpacity="0.85" stroke="#475569" strokeWidth="1" />
              <text x="4" y="2" fill="#F8FAFC" fontSize="14" fontWeight="bold" fontFamily="sans-serif">
                820 km by road
              </text>
            </g>

            {/* Tanker Icon along the route */}
            <g transform="translate(210, 225)">
              <circle cx="12" cy="12" r="18" fill="#D1343A" stroke="#FFFFFF" strokeWidth="2.5" />
              <Truck x="4" y="4" width="16" height="16" color="#FFFFFF" />
            </g>
          </g>
        )}

        {/* Other unlabelled grey dots (hover reveals name) */}
        {secondaryDots.map((dot, idx) => (
          <g key={idx} transform={`translate(${dot.x}, ${dot.y})`} className="cursor-pointer group">
            <title>
              {dot.name} {!dot.verified && dot.type === 'receiver' ? '(Unverified: invite to onboard)' : ''}
            </title>
            <circle
              r="4.5"
              fill="#64748b"
              opacity={dot.verified === false ? 0.35 : 0.65}
              stroke="#1e293b"
              strokeWidth="1"
            />
          </g>
        ))}

        {/* THE 4 FOCUS NODES (Labels >= 14px) */}

        {/* 1. Muzaffarnagar (Pickup 1) */}
        <g transform="translate(285, 80)">
          <circle r="11" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2.5" />
          <text
            x="18"
            y="5"
            fill="#FFFFFF"
            fontSize="14"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            Muzaffarnagar (Pickup 1: 9 t)
          </text>
        </g>

        {/* 2. Ghaziabad (Pickup 2) */}
        <g transform="translate(260, 150)">
          <circle r="12" fill="#D1343A" stroke="#FFFFFF" strokeWidth="2.5" />
          <circle r="18" fill="#D1343A" opacity="0.25" className="animate-ping" />
          <text
            x="18"
            y="5"
            fill="#FFFFFF"
            fontSize="14"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            Ghaziabad (Pickup 2: 12 t)
          </text>
        </g>

        {/* 3. Aravali Kiln (Delivery Destination) */}
        <g transform="translate(175, 345)">
          <circle r="14" fill="#10B981" stroke="#FFFFFF" strokeWidth="2.5" />
          <circle r="22" fill="#10B981" opacity="0.2" className="animate-pulse" />
          <text
            x="-215"
            y="5"
            fill="#FFFFFF"
            fontSize="14"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            Aravali Cement Kiln (Delivery)
          </text>
        </g>
      </svg>
    </div>
  );
};
