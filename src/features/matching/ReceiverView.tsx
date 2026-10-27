import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, X, Building2, AlertTriangle, ShieldCheck, TrendingUp, Layers, ExternalLink } from 'lucide-react';
import { ReceiverOfferItem } from '../../mock/data';
import * as api from '../../mock/api';

export const ReceiverView: React.FC = () => {
  const [offers, setOffers] = useState<ReceiverOfferItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.getReceiverOffers().then((data) => {
      setOffers(data);
      setIsLoading(false);
    });
  }, []);

  const handleUpdateStatus = async (id: string, status: 'Accepted' | 'Declined') => {
    const updated = await api.updateReceiverOfferStatus(id, status);
    setOffers(updated);
  };

  return (
    <div className="space-y-6">
      {/* Receiver Facility Header */}
      <div className="bg-surface rounded-2xl p-6 border border-surface-subtle shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
            <Building2 className="w-4 h-4" />
            <span>Receiver Facility Dashboard</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-ink-primary font-display">
            Aravali Cement Works (Co-processing Kiln #3)
          </h2>
          <p className="text-xs text-ink-secondary mt-0.5">
            Nimbahera / Chittorgarh, Rajasthan • Licensed Alternate Fuel & Raw Material (AFR) Co-processor
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/receivers"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 font-bold text-xs border border-brand-200 transition-colors shadow-subtle"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Receiver Registry</span>
            <ExternalLink className="w-3 h-3 ml-0.5" />
          </Link>

          <div className="text-right">
            <div className="text-xs text-ink-muted">Monthly AFR Quota</div>
            <div className="text-sm font-bold text-ink-primary">318 / 450 Tonnes (71%)</div>
          </div>
          <div className="w-16 bg-surface-muted h-2.5 rounded-full overflow-hidden">
            <div className="bg-emerald-600 h-full rounded-full" style={{ width: '71%' }} />
          </div>
        </div>
      </div>

      {/* Acceptance Limits vs Incoming Hero Waste */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface rounded-2xl p-4 border border-surface-subtle shadow-card">
          <div className="flex items-center justify-between text-xs text-ink-secondary mb-1">
            <span className="font-semibold">Kiln Chloride Tolerance</span>
            <span className="text-status-success font-bold">Compliant</span>
          </div>
          <div className="text-xl font-extrabold text-ink-primary">
            0.08% <span className="text-xs font-normal text-ink-muted">/ Max 0.10% total</span>
          </div>
          <p className="text-[11px] text-ink-secondary mt-1">
            Pickle liquor chloride safely blended with high-alkaline sludge stream
          </p>
        </div>

        <div className="bg-surface rounded-2xl p-4 border border-surface-subtle shadow-card">
          <div className="flex items-center justify-between text-xs text-ink-secondary mb-1">
            <span className="font-semibold">Minimum Calorific Value</span>
            <span className="text-status-warning font-bold">Flux Additive Only</span>
          </div>
          <div className="text-xl font-extrabold text-ink-primary">
            1.8 <span className="text-xs font-normal text-ink-muted">MJ/kg</span>
          </div>
          <p className="text-[11px] text-ink-secondary mt-1">
            Utilized primarily as iron flux replacement for mined bauxite
          </p>
        </div>

        <div className="bg-surface rounded-2xl p-4 border border-surface-subtle shadow-card">
          <div className="flex items-center justify-between text-xs text-ink-secondary mb-1">
            <span className="font-semibold">Heavy Metal Screen (Pb/Cr)</span>
            <span className="text-status-success font-bold">Safe</span>
          </div>
          <div className="text-xl font-extrabold text-status-success">
            &lt; 5 ppm <span className="text-xs font-normal text-ink-muted">/ Max 100 ppm</span>
          </div>
          <p className="text-[11px] text-ink-secondary mt-1">
            Zero threat of clinker chemical contamination
          </p>
        </div>
      </div>

      {/* Incoming Offers Table */}
      <div className="bg-surface rounded-2xl border border-surface-subtle shadow-card overflow-hidden">
        <div className="p-5 border-b border-surface-subtle flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-ink-primary">
              Incoming Supply Proposals (WasteMatch Solver Feed)
            </h3>
            <p className="text-xs text-ink-secondary mt-0.5">
              Review and clear pre-screened multi-party inbound shipments
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-surface-subtle text-ink-secondary font-semibold border-b border-surface-muted">
              <tr>
                <th className="py-3 px-4">Generator Consortium</th>
                <th className="py-3 px-4">Material Manifest</th>
                <th className="py-3 px-3">Tonnes</th>
                <th className="py-3 px-3">Score</th>
                <th className="py-3 px-3">Price Paid</th>
                <th className="py-3 px-3">ETA</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-subtle">
              {offers.map((offer) => (
                <tr key={offer.id} className="hover:bg-surface-subtle/50 transition-colors">
                  <td className="py-3 px-4 font-semibold text-ink-primary">
                    <div className="flex items-center gap-1.5">
                      {offer.id === 'off-101' && (
                        <Layers className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
                      )}
                      <span>{offer.sourceCompany}</span>
                    </div>
                    <div className="text-[11px] text-ink-muted font-normal">
                      {offer.location}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-ink-primary">
                    <div>{offer.material}</div>
                    <div className="text-[10px] text-ink-muted font-mono">{offer.hazardClass}</div>
                  </td>
                  <td className="py-3 px-3 font-bold text-ink-primary">
                    {offer.tonnes}t
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-brand-50 text-brand-700">
                      {offer.compatibility}%
                    </span>
                  </td>
                  <td className="py-3 px-3 font-semibold text-status-success">
                    ₹{offer.pricePerTonneInr.toLocaleString()}/t
                  </td>
                  <td className="py-3 px-3 text-ink-secondary text-xs">
                    {offer.eta}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                        offer.status === 'Accepted'
                          ? 'bg-emerald-100 text-emerald-800'
                          : offer.status === 'Declined'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {offer.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleUpdateStatus(offer.id, 'Accepted')}
                        disabled={offer.status === 'Accepted'}
                        className={`p-1.5 rounded-lg transition-colors ${
                          offer.status === 'Accepted'
                            ? 'opacity-40 cursor-not-allowed bg-emerald-50 text-emerald-700'
                            : 'hover:bg-emerald-50 text-emerald-600 hover:text-emerald-700 border border-emerald-200'
                        }`}
                        title="Accept batch into delivery schedule"
                      >
                        <Check className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleUpdateStatus(offer.id, 'Declined')}
                        disabled={offer.status === 'Declined'}
                        className={`p-1.5 rounded-lg transition-colors ${
                          offer.status === 'Declined'
                            ? 'opacity-40 cursor-not-allowed bg-red-50 text-red-700'
                            : 'hover:bg-red-50 text-red-600 hover:text-red-700 border border-red-200'
                        }`}
                        title="Decline proposal"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

