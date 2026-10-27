import React, { useState } from 'react';
import { X, Search, CheckCircle2, AlertCircle, FileText, Camera, Radio, Mic, Edit2 } from 'lucide-react';
import { WasteFingerprint, SourceType } from '../../mock/types';

interface AllParametersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  fingerprint: WasteFingerprint;
  onEditParam: (key: string, value: string | number) => void;
}

export const AllParametersDrawer: React.FC<AllParametersDrawerProps> = ({
  isOpen,
  onClose,
  fingerprint,
  onEditParam,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  if (!isOpen) return null;

  const entries = Object.entries(fingerprint.params);

  const categories = ['All', 'Physicochemical', 'Heavy Metals', 'Combustion / Co-Processing', 'Hazmat & Safety', 'Logistics'];

  const filtered = entries.filter(([key, data]) => {
    const matchesSearch =
      (data.name || key).toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(data.value).toLowerCase().includes(searchTerm.toLowerCase()) ||
      (data.benchmark || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || data.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const getSourceIcon = (source: SourceType) => {
    switch (source) {
      case 'lab_pdf':
        return <span title="Lab Report PDF"><FileText className="w-3.5 h-3.5 text-blue-600" /></span>;
      case 'photo':
        return <span title="Visual Computer Vision"><Camera className="w-3.5 h-3.5 text-purple-600" /></span>;
      case 'nir_scan':
        return <span title="Handheld NIR Spectroscopy"><Radio className="w-3.5 h-3.5 text-emerald-600" /></span>;
      case 'voice_note':
        return <span title="Foreman Voice Log"><Mic className="w-3.5 h-3.5 text-amber-600" /></span>;
      default:
        return <FileText className="w-3.5 h-3.5" />;
    }
  };

  const handleStartEdit = (key: string, currentVal: number | string) => {
    setEditingKey(key);
    setEditValue(String(currentVal));
  };

  const handleSaveEdit = (key: string) => {
    const num = Number(editValue);
    onEditParam(key, isNaN(num) || editValue.trim() === '' ? editValue : num);
    setEditingKey(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-ink-primary/50 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-3xl bg-surface h-full shadow-elevated flex flex-col animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-6 border-b border-surface-subtle flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-brand-100 text-brand-700 text-xs font-bold uppercase">
                Complete Chemical Passport
              </span>
              <span className="text-xs text-ink-muted">50 Synthesized Parameters</span>
            </div>
            <h2 className="text-xl font-bold text-ink-primary mt-1">
              {fingerprint.material}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-ink-secondary hover:text-ink-primary hover:bg-surface-subtle transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter bar */}
        <div className="p-4 border-b border-surface-subtle bg-surface-subtle/50 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-ink-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search parameter, CAS benchmark, or chemical name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-surface border border-surface-muted text-xs sm:text-sm text-ink-primary focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-brand-600 text-white'
                    : 'bg-surface text-ink-secondary hover:text-ink-primary border border-surface-muted'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="rounded-xl border border-surface-muted overflow-hidden">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead className="bg-surface-subtle text-ink-secondary font-semibold border-b border-surface-muted">
                <tr>
                  <th className="py-3 px-4">Parameter Name</th>
                  <th className="py-3 px-3">Measured Value</th>
                  <th className="py-3 px-3">Confidence</th>
                  <th className="py-3 px-3">Source</th>
                  <th className="py-3 px-4">Benchmark / Tolerance</th>
                  <th className="py-3 px-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-subtle">
                {filtered.map(([key, item]) => (
                  <tr key={key} className="hover:bg-surface-subtle/40 transition-colors">
                    <td className="py-3 px-4 font-medium text-ink-primary">
                      {item.name || key}
                      {item.category && (
                        <div className="text-[10px] text-ink-muted font-normal">
                          {item.category}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-3 font-semibold text-ink-primary">
                      {editingKey === key ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="w-20 px-2 py-1 text-xs border border-brand-500 rounded bg-white"
                            autoFocus
                          />
                          <button
                            onClick={() => handleSaveEdit(key)}
                            className="p-1 rounded bg-brand-600 text-white"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <span>
                          {typeof item.value === 'number'
                            ? item.value.toLocaleString()
                            : item.value}{' '}
                          {item.unit && <span className="text-xs text-ink-muted">{item.unit}</span>}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-12 bg-surface-muted h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              item.confidence >= 0.9
                                ? 'bg-status-success'
                                : item.confidence >= 0.75
                                ? 'bg-status-warning'
                                : 'bg-status-error'
                            }`}
                            style={{ width: `${Math.round(item.confidence * 100)}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-mono text-ink-secondary">
                          {Math.round(item.confidence * 100)}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5 text-xs text-ink-secondary">
                        {getSourceIcon(item.source)}
                        <span className="capitalize">{item.source.replace('_', ' ')}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-xs text-ink-muted">
                      {item.benchmark || 'Standard limit'}
                    </td>
                    <td className="py-3 px-2 text-right">
                      <button
                        onClick={() => handleStartEdit(key, item.value)}
                        className="p-1.5 rounded-lg text-ink-muted hover:text-brand-600 hover:bg-brand-50 transition-colors"
                        title="Manual human-in-the-loop override"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-surface-subtle bg-surface-subtle/50 flex items-center justify-between text-xs text-ink-secondary">
          <span>Showing {filtered.length} of 50 chemical variables</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-ink-primary text-white font-medium hover:bg-black transition-colors"
          >
            Close Passport
          </button>
        </div>
      </div>
    </div>
  );
};
