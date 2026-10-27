import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Camera,
  Radio,
  Mic,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  UploadCloud,
  ChevronRight,
  Info,
  ShieldAlert,
  Sliders,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';
import { ChemicalRadarChart } from './ChemicalRadarChart';
import { AllParametersDrawer } from './AllParametersDrawer';
import { SimulatedBadge } from '../../components/SimulatedBadge';
import { SourceType } from '../../mock/types';

export const GeneratorPortal: React.FC = () => {
  const navigate = useNavigate();
  const {
    uploadedFiles,
    isAnalyzing,
    analysisProgress,
    fingerprint,
    addSampleFiles,
    runAnalysis,
    updateParameter,
    requestPartnerLab,
    simulateLabResult,
  } = useDemoStore();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingParamKey, setEditingParamKey] = useState<string | null>(null);
  const [editParamVal, setEditParamVal] = useState<string>('');
  const [labRequestedToast, setLabRequestedToast] = useState(false);

  const inputTiles: {
    id: string;
    type: SourceType;
    title: string;
    icon: React.ReactNode;
    desc: string;
    fileName: string;
    badge: string;
  }[] = [
    {
      id: 'file-lab',
      type: 'lab_pdf',
      title: 'Lab Assay PDF',
      icon: <FileText className="w-5 h-5 text-blue-600" />,
      desc: 'SGS / NABL certified chemical titration test report',
      fileName: 'SGS_Chemical_Assay_Batch_SG08.pdf',
      badge: 'Certified PDF',
    },
    {
      id: 'file-photo',
      type: 'photo',
      title: 'Vat / IBC Photo',
      icon: <Camera className="w-5 h-5 text-purple-600" />,
      desc: 'Container visual inspection for turbidity, color & sedimentation',
      fileName: 'IBC_Tanks_Vat_Inspection_Aug.jpg',
      badge: 'Computer Vision',
    },
    {
      id: 'file-nir',
      type: 'nir_scan',
      title: 'NIR Spectroscopy',
      icon: <Radio className="w-5 h-5 text-emerald-600" />,
      desc: 'Handheld MicroNIR absorption wavelength spectrum (.csv)',
      fileName: 'MicroNIR_Scan_Point_04.csv',
      badge: 'Spectroscopy',
    },
    {
      id: 'file-voice',
      type: 'voice_note',
      title: 'Foreman Voice Log',
      icon: <Mic className="w-5 h-5 text-amber-600" />,
      desc: 'Spoken dispatch record from plant shift supervisor (Hindi/English)',
      fileName: 'Shift_Foreman_Ramesh_PickleTank4.m4a',
      badge: 'Voice-to-Data',
    },
  ];

  const handleQuickVerify = (key: string, currentVal: string | number) => {
    setEditingParamKey(key);
    setEditParamVal(String(currentVal));
  };

  const handleSaveVerify = () => {
    if (editingParamKey) {
      const num = Number(editParamVal);
      updateParameter(editingParamKey, isNaN(num) || editParamVal.trim() === '' ? editParamVal : num);
      setEditingParamKey(null);
    }
  };

  const getSourceIcon = (source: SourceType) => {
    switch (source) {
      case 'lab_pdf':
        return <span title="Lab PDF"><FileText className="w-3.5 h-3.5 text-blue-600" /></span>;
      case 'photo':
        return <span title="Visual Photo"><Camera className="w-3.5 h-3.5 text-purple-600" /></span>;
      case 'nir_scan':
        return <span title="NIR Scan"><Radio className="w-3.5 h-3.5 text-emerald-600" /></span>;
      case 'voice_note':
        return <span title="Voice Note"><Mic className="w-3.5 h-3.5 text-amber-600" /></span>;
      default:
        return <FileText className="w-3.5 h-3.5" />;
    }
  };

  // Selected 12 key parameters for primary view
  const keyParamKeys = [
    'pH',
    'chloride',
    'calorificValue',
    'moisture',
    'fe',
    'zn',
    'pb',
    'cr',
    'viscosity',
    'flashPoint',
    'density',
    'hazardClass',
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Breadcrumb & Stage Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-600 mb-1">
            <span>Engine 1</span>
            <span>•</span>
            <span>Multimodal Ingestion & Chemical Fingerprinting</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink-primary font-display">
            Waste Stream Ingestion & Fingerprinting
          </h1>
          <p className="text-sm text-ink-secondary mt-1">
            Generator: <strong className="text-ink-primary">Shree Ganesh Galvanizers</strong> (Ghaziabad, UP) • Steel Descaling Byproduct
          </p>
        </div>
      </div>

      {/* 2-Column Split: Upload Inputs on Left, Fingerprint on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Multimodal Input Tiles (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-surface rounded-3xl p-6 border border-surface-subtle shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-ink-primary">
                  1. Multimodal Inputs
                </h2>
                <p className="text-xs text-ink-secondary mt-0.5">
                  Upload PDF assays, photos, NIR files, or voice logs.
                </p>
              </div>

              <button
                onClick={addSampleFiles}
                disabled={isAnalyzing}
                className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200 transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                <span>Load Sample Files</span>
              </button>
            </div>

            {/* 4 Input Tiles */}
            <div className="space-y-3">
              {inputTiles.map((tile) => {
                const isLoaded = uploadedFiles.some((f) => f.id === tile.id);
                return (
                  <div
                    key={tile.id}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      isLoaded
                        ? 'bg-surface border-brand-200/80 shadow-subtle'
                        : 'bg-surface-subtle/60 border-dashed border-surface-muted hover:border-brand-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-surface-subtle border border-surface-muted flex items-center justify-center flex-shrink-0">
                          {tile.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-ink-primary">
                              {tile.title}
                            </h4>
                            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-surface-muted text-ink-secondary">
                              {tile.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-ink-secondary mt-0.5 leading-snug">
                            {isLoaded ? tile.fileName : tile.desc}
                          </p>
                        </div>
                      </div>

                      {isLoaded ? (
                        <span className="flex-shrink-0 flex items-center gap-1 text-[11px] font-semibold text-status-success">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Loaded</span>
                        </span>
                      ) : (
                        <button
                          onClick={addSampleFiles}
                          className="flex-shrink-0 text-[11px] font-medium px-2 py-1 rounded-lg bg-surface border border-surface-muted text-ink-secondary hover:text-brand-600 hover:border-brand-200"
                        >
                          Attach
                        </button>
                      )}
                    </div>

                    {isLoaded && (
                      <div className="mt-2.5 pt-2 border-t border-surface-subtle text-[11px] text-ink-muted flex items-center justify-between">
                        <span className="truncate max-w-[240px]">
                          {uploadedFiles.find((f) => f.id === tile.id)?.extractedSnippet}
                        </span>
                        <span className="font-mono text-[10px]">Verified</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Analyze Trigger Button */}
            <div className="mt-6">
              {isAnalyzing ? (
                <div className="p-4 rounded-2xl bg-brand-50 border border-brand-200">
                  <div className="flex items-center justify-between text-xs font-bold text-brand-700 mb-2">
                    <span className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin text-brand-600" />
                      <span>{analysisProgress.label}</span>
                    </span>
                    <span className="font-mono">{analysisProgress.pct}%</span>
                  </div>
                  <div className="w-full bg-brand-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-brand-600 h-full rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${analysisProgress.pct}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-brand-800 mt-2 font-medium">
                    Synthesizing chemical taxonomy across 50 regulatory parameters...
                  </p>
                </div>
              ) : (
                <button
                  onClick={() => {
                    if (uploadedFiles.length === 0) {
                      addSampleFiles();
                    }
                    runAnalysis();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm transition-all shadow-card hover:shadow-elevated active:scale-98"
                >
                  <Sparkles className="w-4 h-4 text-brand-200" />
                  <span>
                    {fingerprint ? 'Re-Analyze Chemical Fingerprint' : 'Analyze Multimodal Inputs'}
                  </span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              )}
            </div>

            <div className="mt-4 text-center">
              <span className="text-[11px] text-ink-muted">
                Drop real files anytime — simulated processing will extract representative features.
              </span>
            </div>
          </div>

          {/* Quick Context Card */}
          <div className="bg-surface-subtle/70 rounded-2xl p-4 border border-surface-muted text-xs text-ink-secondary">
            <div className="flex items-start gap-2.5">
              <Info className="w-4 h-4 text-brand-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-ink-primary font-semibold">
                  Why 50 parameters?
                </strong>
                <p className="mt-1 leading-relaxed">
                  Industrial kilns, recyclers, and smelters require precise chloride, calorific, and trace heavy-metal envelopes to prevent kiln refractory failure or emissions violations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Chemical Fingerprint Dashboard (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {fingerprint ? (
            <div className="bg-surface rounded-3xl p-6 sm:p-8 border border-surface-subtle shadow-card flex flex-col">
              {/* Fingerprint Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-surface-subtle">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-brand-100 text-brand-700">
                      AI Fingerprint Validated
                    </span>
                    <span className="text-xs font-mono font-semibold text-status-success flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      94% Overall Confidence
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-ink-primary font-display mt-1">
                    {fingerprint.material}
                  </h2>
                  <div className="flex items-center gap-3 text-xs text-ink-secondary mt-1 flex-wrap">
                    <span>Batch: #SG-2026-08</span>
                    <span>•</span>
                    <span><strong>12.0</strong> Tonnes / month</span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1 text-brand-700 font-semibold">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      Class 8 Corrosive
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsDrawerOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-subtle hover:bg-surface-muted text-ink-primary text-xs font-semibold border border-surface-muted transition-colors"
                  >
                    <Sliders className="w-3.5 h-3.5 text-brand-600" />
                    <span>View All 50</span>
                    <ExternalLink className="w-3 h-3 text-ink-muted ml-0.5" />
                  </button>
                </div>
              </div>

              {/* Chemical Radar / Visual Summary */}
              <div className="my-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-surface-subtle/50 p-4 rounded-2xl border border-surface-muted/60">
                <div className="md:col-span-6 flex flex-col justify-center">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600 mb-1">
                    Chemical Profile Topology
                  </span>
                  <h4 className="text-sm font-bold text-ink-primary">
                    High-Iron Acid Stream (HCl Matrix)
                  </h4>
                  <p className="text-xs text-ink-secondary mt-1 leading-relaxed">
                    Extreme acidity (pH 0.85) and high dissolved iron (11.8%) make this stream an ideal raw meal mineralizer for cement co-processing, but requires heavy chloride dilution.
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-50 text-brand-700 border border-brand-200">
                      Co-processing Candidate
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-surface text-ink-secondary border border-surface-muted">
                      AIS-028 Tanker Required
                    </span>
                  </div>
                </div>

                <div className="md:col-span-6 flex items-center justify-center">
                  <ChemicalRadarChart />
                </div>
              </div>

              {/* Data Completeness Strip (Task 6) */}
              <div className="mb-6 p-4 rounded-2xl bg-surface-subtle/70 border border-surface-muted">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 block mb-0.5">
                      Data Completeness & Tier Validation
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-ink-primary">
                      10 of 12 key parameters measured · 2 flagged for verification
                    </h4>
                  </div>

                  <div className="flex items-center gap-2">
                    {fingerprint.status === 'Provisional' ? (
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                          Provisional: Pending Lab Test
                        </span>
                        <button
                          onClick={async () => {
                            await simulateLabResult();
                          }}
                          className="px-2.5 py-1 rounded-xl text-[11px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors"
                        >
                          Simulate Lab Result (Confirm)
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={async () => {
                          await requestPartnerLab();
                          setLabRequestedToast(true);
                          setTimeout(() => setLabRequestedToast(false), 4000);
                        }}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-surface border border-surface-muted hover:border-brand-300 text-ink-primary hover:text-brand-700 transition-colors shadow-subtle"
                      >
                        Request Partner-Lab Test
                      </button>
                    )}
                  </div>
                </div>

                {/* 3-Step Tier Progress Bar */}
                <div className="grid grid-cols-3 gap-2 my-2 text-center text-[11px]">
                  <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                    ✓ Tier 0: Process + photo
                  </div>
                  <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-900 font-bold border border-emerald-300 ring-1 ring-emerald-400">
                    ● Tier 1: Quick on-site checks (Current)
                  </div>
                  <div className={`p-1.5 rounded-lg border transition-colors ${
                    fingerprint.status === 'Confirmed'
                      ? 'bg-emerald-50 text-emerald-800 font-bold border-emerald-200'
                      : 'bg-surface text-ink-muted border-surface-muted'
                  }`}>
                    {fingerprint.status === 'Confirmed' ? '✓ Tier 2: Lab test' : 'Tier 2: Lab test'}
                  </div>
                </div>

                {/* Callout */}
                <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 mt-3 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Tests needed to unlock matches:</span> chloride titration, zinc (XRF). 2 of 50 parameters, not the full panel.
                  </div>
                </div>

                {labRequestedToast && (
                  <div className="mt-2 text-xs font-semibold text-emerald-700 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                    ✓ Lab test requested (simulated). Matches set to provisional status.
                  </div>
                )}

                {/* Footnote */}
                <p className="text-[11px] text-ink-muted mt-2">
                  WasteMatch is decision support. Final acceptance rests on the receiver's pre-acceptance test and authorisation.
                </p>
              </div>

              {/* 12 Key Parameter Grid */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-ink-secondary">
                    Primary Measured Attributes (~12 of 50)
                  </h3>
                  <span className="text-[11px] text-ink-muted">
                    Click 'Verify' on flagged items to test Human-in-the-Loop
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {keyParamKeys.map((key) => {
                    const item = fingerprint.params[key];
                    if (!item) return null;
                    const isLowConfidence = item.isFlagged || item.confidence < 0.85;

                    return (
                      <div
                        key={key}
                        className={`p-3 rounded-xl border transition-all ${
                          isLowConfidence
                            ? 'bg-status-warning-bg/40 border-amber-300 shadow-sm'
                            : 'bg-surface border-surface-muted hover:border-brand-200'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="text-[11px] font-medium text-ink-secondary truncate" title={item.name || key}>
                            {item.name || key}
                          </span>
                          <span title={`Extracted via ${item.source}`}>
                            {getSourceIcon(item.source)}
                          </span>
                        </div>

                        <div className="text-sm font-extrabold text-ink-primary">
                          {typeof item.value === 'number'
                            ? item.value.toLocaleString()
                            : item.value}{' '}
                          <span className="text-[10px] font-normal text-ink-secondary">
                            {item.unit}
                          </span>
                        </div>

                        {/* Confidence bar & Verify button */}
                        <div className="mt-2 flex items-center justify-between gap-2">
                          <div className="flex-1 bg-surface-muted h-1 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                item.confidence >= 0.9
                                ? 'bg-status-success'
                                : item.confidence >= 0.8
                                ? 'bg-status-warning'
                                : 'bg-status-warning'
                              }`}
                              style={{ width: `${Math.round(item.confidence * 100)}%` }}
                            />
                          </div>

                          {isLowConfidence ? (
                            <button
                              onClick={() => handleQuickVerify(key, item.value)}
                              className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-white hover:bg-amber-600 transition-colors flex items-center gap-0.5"
                              title="Human in the loop verify"
                            >
                              <AlertTriangle className="w-2.5 h-2.5" />
                              <span>Verify</span>
                            </button>
                          ) : (
                            <span className="text-[10px] font-mono text-ink-muted">
                              {Math.round(item.confidence * 100)}%
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Nav to Screen 2 */}
              <div className="pt-6 border-t border-surface-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-ink-secondary">
                  Ready for constraint solver • 4 possible receivers within 1,000 km
                </div>

                <button
                  onClick={() => navigate('/matching')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm transition-all shadow-card hover:shadow-elevated active:scale-98"
                >
                  <span>Find Matches & Optimize Freight</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="bg-surface rounded-3xl p-12 border border-surface-subtle shadow-card flex flex-col items-center justify-center text-center min-h-[460px]">
              <div className="w-16 h-16 rounded-3xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 mb-4">
                <UploadCloud className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-ink-primary font-display">
                No Fingerprint Generated Yet
              </h3>
              <p className="text-xs sm:text-sm text-ink-secondary max-w-sm mt-1 mb-6">
                Click <strong>"Load Sample Files"</strong> on the left and run analysis to extract the 50-parameter verified chemical passport.
              </p>
              <button
                onClick={() => {
                  addSampleFiles();
                  runAnalysis();
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 text-white text-xs font-semibold hover:bg-brand-700 transition-colors shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Load Sample Data & Analyze</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Human-in-the-loop Inline Edit Modal */}
      {editingParamKey && (
        <div className="fixed inset-0 z-50 bg-ink-primary/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl p-6 max-w-md w-full shadow-elevated border border-surface-muted">
            <div className="flex items-center gap-2 text-status-warning mb-2">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="text-base font-bold text-ink-primary">
                Human-in-the-Loop Verification
              </h3>
            </div>
            <p className="text-xs text-ink-secondary mb-4">
              NIR Spectroscopy flagged parameter <strong>{editingParamKey}</strong> with 74% confidence. Please verify or update with laboratory records.
            </p>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-ink-primary mb-1">
                Value ({fingerprint?.params[editingParamKey]?.unit || ''})
              </label>
              <input
                type="text"
                value={editParamVal}
                onChange={(e) => setEditParamVal(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-muted text-sm text-ink-primary focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <span className="text-[11px] text-ink-muted mt-1 block">
                Benchmark: {fingerprint?.params[editingParamKey]?.benchmark || 'Standard limit'}
              </span>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setEditingParamKey(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-ink-secondary hover:text-ink-primary hover:bg-surface-subtle"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveVerify}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-brand-600 hover:bg-brand-700 text-white shadow-sm"
              >
                Verify & Confirm (100% Confidence)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* All 50 Parameters Drawer */}
      {fingerprint && (
        <AllParametersDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          fingerprint={fingerprint}
          onEditParam={updateParameter}
        />
      )}
    </div>
  );
};
