import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  X,
  FileText,
  FlaskConical,
  Truck,
  Calculator,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useSaasStore } from '../../store/saasStore';

export const GlobalSearchModal: React.FC = () => {
  const {
    isGlobalSearchOpen,
    closeGlobalSearch,
    parameters,
    laboratories,
    costState,
  } = useSaasStore();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();

    const paramMatches = parameters
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.symbol.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
      .slice(0, 4)
      .map((p) => ({
        type: 'parameter',
        title: `${p.symbol} · ${p.name}`,
        subtitle: `Value: ${p.value} ${p.unit} · ${p.category}`,
        link: '/app/analysis',
        icon: FileText,
      }));

    const labMatches = laboratories
      .filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.city.toLowerCase().includes(q) ||
          l.nablRegNo.toLowerCase().includes(q)
      )
      .slice(0, 3)
      .map((l) => ({
        type: 'lab',
        title: l.name,
        subtitle: `${l.nablRegNo} · ${l.city} (${l.distanceKm} km) · ${l.indicativePriceRange}`,
        link: '/app/laboratories',
        icon: FlaskConical,
      }));

    const navMatches = [
      {
        title: 'Cost Analysis Workspace',
        subtitle: `Model: ${costState.commercialModel === 'sale' ? 'Byproduct Sale' : 'Treatment Fee'} · ${costState.quantityTonnes} MT`,
        link: '/app/costs',
        icon: Calculator,
      },
      {
        title: 'Transport Recommendations (Class 8 HazMat)',
        subtitle: 'Rubber-Lined Tankers · Form 9 Manifest Generation',
        link: '/app/transport',
        icon: Truck,
      },
    ].filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.subtitle.toLowerCase().includes(q)
    );

    return [...paramMatches, ...labMatches, ...navMatches];
  }, [query, parameters, laboratories, costState]);

  if (!isGlobalSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-[#0B0F19]/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-surface rounded-2xl border border-[#E2E4DC] shadow-elevated overflow-hidden">
        {/* Search Input Bar */}
        <div className="relative border-b border-[#E2E4DC] px-4 py-3 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#64748B]" />
          <input
            type="text"
            placeholder="Search chemical parameter (Fe, pH), NABL lab, transport, or route..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full text-sm text-[#0B0F19] placeholder-[#64748B] bg-transparent focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#64748B] hover:text-[#0B0F19]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={closeGlobalSearch}
            className="text-xs px-2 py-1 rounded bg-surface-subtle text-[#64748B] border border-[#E2E4DC]"
          >
            ESC
          </button>
        </div>

        {/* Quick Suggestions or Results */}
        <div className="max-h-96 overflow-y-auto p-2">
          {query.trim() === '' ? (
            <div className="p-4 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                Suggested Searches
              </div>
              <div className="flex flex-wrap gap-2">
                {['Iron (Fe)', 'Total Chloride (Cl⁻)', 'Lead (Pb)', 'Targeted Lab Assay', 'Form 9 Manifest', '820 km Corridor'].map(
                  (tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-2.5 py-1 text-xs rounded-full bg-surface-subtle hover:bg-[#FDF2F2] hover:text-[#D1343A] text-[#1E293B] border border-[#E2E4DC] transition-colors"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-sm text-[#64748B]">
              No exact matches found for "{query}". Try searching for chemical formulas like "Fe", "Cl", or "NABL".
            </div>
          ) : (
            <div className="space-y-1">
              {results.map((res, idx) => {
                const Icon = res.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      navigate(res.link);
                      closeGlobalSearch();
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-surface-subtle transition-colors text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-surface-subtle group-hover:bg-[#FDF2F2] text-[#64748B] group-hover:text-[#D1343A] transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#0B0F19] group-hover:text-[#D1343A] transition-colors">
                          {res.title}
                        </div>
                        <div className="text-xs text-[#64748B]">
                          {res.subtitle}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#64748B] group-hover:text-[#D1343A] transition-transform group-hover:translate-x-1" />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="border-t border-[#E2E4DC] px-4 py-2 bg-surface-subtle/50 text-[11px] text-[#64748B] flex items-center justify-between">
          <span>Press ESC to close</span>
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#D1343A]" /> Fast Industrial Navigation
          </span>
        </div>
      </div>
    </div>
  );
};
