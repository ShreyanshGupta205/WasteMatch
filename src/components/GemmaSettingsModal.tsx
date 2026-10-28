import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  CheckCircle2,
  Cpu,
  Key,
  Server,
  Zap,
  ShieldCheck,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { GemmaService, GemmaConfig } from '../services/gemmaService';

interface GemmaSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GemmaSettingsModal: React.FC<GemmaSettingsModalProps> = ({ isOpen, onClose }) => {
  const currentConfig = GemmaService.getConfig();
  const [provider, setProvider] = useState<GemmaConfig['provider']>(currentConfig.provider);
  const [apiKey, setApiKey] = useState<string>(currentConfig.apiKey || '');
  const [ollamaUrl, setOllamaUrl] = useState<string>(currentConfig.ollamaUrl || 'http://localhost:11434');
  const [savedToast, setSavedToast] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    if (isOpen) {
      const cfg = GemmaService.getConfig();
      setProvider(cfg.provider);
      setApiKey(cfg.apiKey || '');
      setOllamaUrl(cfg.ollamaUrl || 'http://localhost:11434');
      setTestResult(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTestKey = async () => {
    if (!apiKey.trim()) {
      setTestResult({ success: false, message: 'Please enter an API key to test' });
      return;
    }
    setIsTesting(true);
    setTestResult(null);
    try {
      const model = currentConfig.modelName || import.meta.env.VITE_GEMMA_MODEL || 'gemini-2.5-flash';
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey.trim()}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: 'Respond with exactly: OK' }] }],
          }),
        }
      );
      if (res.ok) {
        setTestResult({
          success: true,
          message: `Connection Verified! Authenticated with Google AI (${model})`,
        });
      } else {
        const errData = await res.json().catch(() => null);
        const errMsg = errData?.error?.message || `HTTP ${res.status}`;
        setTestResult({ success: false, message: `Authentication failed: ${errMsg}` });
      }
    } catch (err: any) {
      setTestResult({ success: false, message: `Network error: ${err.message || 'Failed to reach API'}` });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    GemmaService.saveConfig({
      provider,
      apiKey: apiKey.trim() || undefined,
      ollamaUrl: ollamaUrl.trim() || undefined,
    });
    setSavedToast(true);
    setTimeout(() => {
      setSavedToast(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-white rounded-2xl border border-[#E2E4DC] shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E2E4DC] bg-gradient-to-r from-purple-50 via-white to-indigo-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-4 h-4 text-purple-200" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Gemma 2 AI Engine Settings</h3>
              <p className="text-[10px] text-slate-500">Google Gemma open-weights inference engine</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-4 sm:p-5 space-y-4 text-xs">
          {savedToast && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Gemma AI configuration updated successfully!</span>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
              Inference Provider
            </label>
            <div className="space-y-2">
              {/* Option 1: Embedded */}
              <label
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${
                  provider === 'embedded'
                    ? 'border-purple-600 bg-purple-50/50 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="provider"
                  checked={provider === 'embedded'}
                  onChange={() => setProvider('embedded')}
                  className="mt-0.5 text-purple-600 focus:ring-purple-500"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900">Embedded Gemma 2 Neural Engine</span>
                    <span className="text-[9px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded">
                      Zero Setup
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Instant offline chemical parsing, parameter extraction, and clinker AFR compatibility reasoning.
                  </p>
                </div>
              </label>

              {/* Option 2: Google AI Studio */}
              <label
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${
                  provider === 'google'
                    ? 'border-purple-600 bg-purple-50/50 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="provider"
                  checked={provider === 'google'}
                  onChange={() => setProvider('google')}
                  className="mt-0.5 text-purple-600 focus:ring-purple-500"
                />
                <div>
                  <span className="font-bold text-slate-900">Google AI Studio / Gemini API</span>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Direct cloud API using Google's hosted Gemma models.
                  </p>
                </div>
              </label>

              {/* Option 3: Local Ollama */}
              <label
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${
                  provider === 'ollama'
                    ? 'border-purple-600 bg-purple-50/50 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="provider"
                  checked={provider === 'ollama'}
                  onChange={() => setProvider('ollama')}
                  className="mt-0.5 text-purple-600 focus:ring-purple-500"
                />
                <div>
                  <span className="font-bold text-slate-900">Local Ollama Instance</span>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Full privacy for confidential industrial formulations running on `localhost:11434`.
                  </p>
                </div>
              </label>

              {/* Option 4: Groq */}
              <label
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${
                  provider === 'groq'
                    ? 'border-purple-600 bg-purple-50/50 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="provider"
                  checked={provider === 'groq'}
                  onChange={() => setProvider('groq')}
                  className="mt-0.5 text-purple-600 focus:ring-purple-500"
                />
                <div>
                  <span className="font-bold text-slate-900">Groq Cloud (gemma2-9b-it)</span>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Ultra-fast inference (300+ tokens/sec).
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Conditional Credential Inputs */}
          {(provider === 'google' || provider === 'groq') && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                  <Key className="w-3.5 h-3.5 text-purple-600" />
                  <span>{provider === 'google' ? 'Google AI Studio API Key' : 'Groq API Key'}</span>
                </label>
                {provider === 'google' && import.meta.env.VITE_GEMMA_API_KEY && (
                  <span className="text-[9px] font-mono bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                    ✓ .env.local active
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => {
                    setApiKey(e.target.value);
                    setTestResult(null);
                  }}
                  placeholder={provider === 'google' ? 'Enter Google AI Studio key...' : 'Enter Groq key (gsk_...)'}
                  className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono"
                />
                {provider === 'google' && (
                  <button
                    type="button"
                    onClick={handleTestKey}
                    disabled={isTesting || !apiKey.trim()}
                    className="px-3 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs rounded-xl border border-purple-200 transition shrink-0 flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                  >
                    {isTesting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Testing...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-3.5 h-3.5 text-purple-600" />
                        <span>Test Key</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {testResult && (
                <div
                  className={`p-2.5 rounded-xl text-xs flex items-center gap-2 ${
                    testResult.success
                      ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                      : 'bg-rose-50 border border-rose-200 text-rose-800'
                  }`}
                >
                  {testResult.success ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  )}
                  <span className="font-medium text-[11px]">{testResult.message}</span>
                </div>
              )}
            </div>
          )}

          {provider === 'ollama' && (
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                <Server className="w-3.5 h-3.5 text-purple-600" />
                <span>Ollama Endpoint URL</span>
              </label>
              <input
                type="text"
                value={ollamaUrl}
                onChange={(e) => setOllamaUrl(e.target.value)}
                placeholder="http://localhost:11434"
                className="w-full px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-sm transition"
            >
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
