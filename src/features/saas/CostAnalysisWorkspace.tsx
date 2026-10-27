import React, { useMemo } from 'react';
import {
  Calculator,
  TrendingUp,
  DollarSign,
  FileText,
  AlertCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Sliders,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from 'recharts';
import { useSaasStore } from '../../store/saasStore';

export const CostAnalysisWorkspace: React.FC = () => {
  const { costState, updateCostState, applyPresetScenario } = useSaasStore();

  const {
    commercialModel,
    quantityTonnes,
    ratePerTonne,
    distanceKm,
    freightPerKm,
    testingFeeInr,
    packagingHandlingInr,
    hasDocumentedBaseline,
    baselineDisposalRatePerTonne,
  } = costState;

  // Financial Calculations
  const calculations = useMemo(() => {
    // 1. Gross Material Amount:
    // If 'sale', generator receives rate * quantity
    // If 'fee', generator pays treatment fee rate * quantity
    const grossMaterialAmount = quantityTonnes * ratePerTonne;
    const isSale = commercialModel === 'sale';

    // 2. Freight Total:
    const totalFreightCost = distanceKm * freightPerKm;
    // For milk-run or buyer-seller split: in our model, seller absorbs half or full depending on deal
    // Let's assume standard seller freight share for single trip or proportional for bundle (default 50% or 100%)
    const sellerFreightShare = Math.round(totalFreightCost * 0.5); // 50% seller freight share in shared milk run, or 100% direct
    const buyerFreightShare = totalFreightCost - sellerFreightShare;

    // 3. Seller Transaction Costs:
    const sellerTotalCosts = sellerFreightShare + testingFeeInr + packagingHandlingInr;

    // 4. Seller Net Cash:
    // If sale: Gross Material Revenue - Seller Costs
    // If fee: -(Treatment Fee) - Seller Costs
    const sellerNetCash = isSale
      ? grossMaterialAmount - sellerTotalCosts
      : -grossMaterialAmount - sellerTotalCosts;

    // 5. Avoided Baseline Disposal:
    // STRICT RULE: If hasDocumentedBaseline is false, strictly ₹0 avoided disposal!
    const avoidedBaselineDisposal = hasDocumentedBaseline
      ? quantityTonnes * baselineDisposalRatePerTonne
      : 0;

    // 6. Net Economic Gain vs Status Quo:
    // Net Gain = sellerNetCash - (-avoidedBaselineDisposal) = sellerNetCash + avoidedBaselineDisposal
    // If hasDocumentedBaseline is false, Net Gain is simply sellerNetCash (or swing from 0)
    const netEconomicGain = sellerNetCash + avoidedBaselineDisposal;

    // 7. Status Quo Cost (negative cash outflow):
    const statusQuoCost = -avoidedBaselineDisposal;

    // 8. GST Breakdown (18% on Material Sale HSN 2806, and 5% / 18% RCM on Freight):
    const gstOnMaterial = Math.round(grossMaterialAmount * 0.18);
    const gstOnFreightRcm = Math.round(totalFreightCost * 0.05); // Standard 5% GTA Goods Transport Agency RCM
    const totalGstLiability = isSale ? gstOnMaterial : 0;

    // 9. Buyer Landed Cost:
    const buyerLandedCost = isSale
      ? grossMaterialAmount + buyerFreightShare + gstOnMaterial
      : -grossMaterialAmount + buyerFreightShare; // buyer pays less if receiving treatment fee

    return {
      grossMaterialAmount,
      totalFreightCost,
      sellerFreightShare,
      buyerFreightShare,
      sellerTotalCosts,
      sellerNetCash,
      avoidedBaselineDisposal,
      netEconomicGain,
      statusQuoCost,
      gstOnMaterial,
      gstOnFreightRcm,
      totalGstLiability,
      buyerLandedCost,
      isSale,
    };
  }, [
    commercialModel,
    quantityTonnes,
    ratePerTonne,
    distanceKm,
    freightPerKm,
    testingFeeInr,
    packagingHandlingInr,
    hasDocumentedBaseline,
    baselineDisposalRatePerTonne,
  ]);

  // Chart Data: Status Quo (-₹48,000) vs Deal Net Cash vs Net Economic Gain (+₹40,550)
  const chartData = [
    {
      name: 'Status Quo TSDF',
      amount: calculations.statusQuoCost,
      fill: '#DC2626',
      label: `TSDF Disposal: -₹${Math.abs(calculations.statusQuoCost).toLocaleString()}`,
    },
    {
      name: 'Deal Net Cash',
      amount: calculations.sellerNetCash,
      fill: calculations.sellerNetCash >= 0 ? '#16A34A' : '#D97706',
      label: `Net Cash: ${calculations.sellerNetCash >= 0 ? '+' : ''}₹${calculations.sellerNetCash.toLocaleString()}`,
    },
    {
      name: 'Net Economic Gain',
      amount: calculations.netEconomicGain,
      fill: calculations.netEconomicGain >= 0 ? '#15803D' : '#DC2626',
      label: `Economic Gain: +₹${calculations.netEconomicGain.toLocaleString()}`,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Title & Preset Quick Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E2E4DC]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-[#0B0F19]">
              Commercial Cost Analysis & Financial Ledger
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#DCFCE7] text-[#16A34A] border border-[#16A34A]/20">
              Interactive Modeler
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-0.5">
            Evaluate Byproduct Sale vs Co-Processing Treatment Gate Fee · Double-Entry Non-Double-Counted Ledger
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#64748B]">Load Preset:</span>
          <button
            onClick={() => applyPresetScenario('hero_bundle')}
            className="px-3 py-1.5 rounded-xl text-xs font-bold text-[#16A34A] bg-[#DCFCE7] hover:bg-[#bbf7d0] transition-colors border border-[#16A34A]/20 shadow-subtle cursor-pointer"
          >
            Hero Bundle (21 MT · Kiln)
          </button>
          <button
            onClick={() => applyPresetScenario('local_neutralization')}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-[#1E293B] bg-surface hover:bg-surface-subtle transition-colors border border-[#E2E4DC] shadow-subtle cursor-pointer"
          >
            Local Meerut (12 MT)
          </button>
        </div>
      </div>

      {/* 1. KPI STRIP */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* KPI 1: Gross Material Value */}
        <div className="p-5 rounded-2xl bg-surface border border-[#E2E4DC] shadow-subtle space-y-1">
          <div className="text-xs font-semibold text-[#64748B] flex items-center justify-between">
            <span>Gross Revenue / Material Value</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-surface-subtle text-[#64748B]">
              {calculations.isSale ? 'Generator Receives' : 'Gate Fee Payable'}
            </span>
          </div>
          <div className="text-2xl font-mono font-bold text-[#0B0F19]">
            {calculations.isSale ? '+' : '-'}₹{calculations.grossMaterialAmount.toLocaleString()}
          </div>
          <div className="text-[11px] text-[#64748B]">
            {quantityTonnes} MT @ ₹{ratePerTonne.toLocaleString()}/MT
          </div>
        </div>

        {/* KPI 2: Seller Net Cash */}
        <div className="p-5 rounded-2xl bg-surface border border-[#E2E4DC] shadow-subtle space-y-1">
          <div className="text-xs font-semibold text-[#64748B] flex items-center justify-between">
            <span>Seller Net Cash Flow</span>
            <span
              className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                calculations.sellerNetCash >= 0
                  ? 'bg-[#DCFCE7] text-[#16A34A]'
                  : 'bg-[#FEE2E2] text-[#DC2626]'
              }`}
            >
              After Freight & Testing
            </span>
          </div>
          <div
            className={`text-2xl font-mono font-bold ${
              calculations.sellerNetCash >= 0 ? 'text-[#16A34A]' : 'text-[#DC2626]'
            }`}
          >
            {calculations.sellerNetCash >= 0 ? '+' : ''}₹{calculations.sellerNetCash.toLocaleString()}
          </div>
          <div className="text-[11px] text-[#64748B]">
            Total Seller Costs: -₹{calculations.sellerTotalCosts.toLocaleString()}
          </div>
        </div>

        {/* KPI 3: Net vs Status Quo Disposal (Economic Swing) */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7]/40 border-2 border-[#16A34A]/40 shadow-card space-y-1">
          <div className="text-xs font-bold text-[#16A34A] flex items-center justify-between">
            <span>Net vs Status Quo Disposal</span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#16A34A] text-white">
              Economic Swing
            </span>
          </div>
          <div className="text-2xl font-mono font-bold text-[#15803D]">
            {calculations.netEconomicGain >= 0 ? '+' : ''}₹{calculations.netEconomicGain.toLocaleString()}
          </div>
          <div className="text-[11px] text-[#1E293B]">
            {hasDocumentedBaseline
              ? `Avoids ₹${calculations.avoidedBaselineDisposal.toLocaleString()} TSDF baseline landfill cost`
              : 'Strict ₹0 Baseline enforced (No documented TSDF contract)'}
          </div>
        </div>
      </div>

      {/* 2. Interactive Input Controls & Commercial Model Toggle */}
      <div className="p-5 rounded-2xl bg-surface border border-[#E2E4DC] shadow-subtle space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2E4DC]">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#D1343A]" />
            <h3 className="text-sm font-bold text-[#0B0F19]">
              Simulation Parameters & Baseline Enforcement
            </h3>
          </div>

          {/* Commercial Model Toggle: Byproduct Sale vs Treatment Fee */}
          <div className="flex items-center gap-1 p-1 bg-surface-subtle rounded-xl border border-[#E2E4DC]">
            <button
              onClick={() => updateCostState({ commercialModel: 'sale' })}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                commercialModel === 'sale'
                  ? 'bg-[#16A34A] text-white shadow-sm'
                  : 'text-[#64748B] hover:text-[#0B0F19]'
              }`}
            >
              Byproduct Sale (Positive Value)
            </button>
            <button
              onClick={() => updateCostState({ commercialModel: 'fee' })}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                commercialModel === 'fee'
                  ? 'bg-[#D97706] text-white shadow-sm'
                  : 'text-[#64748B] hover:text-[#0B0F19]'
              }`}
            >
              Co-Processing Treatment Fee (Gate Payment)
            </button>
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Slider 1: Quantity (MT) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#1E293B]">Batch Quantity (Tonnes)</span>
              <span className="font-mono font-bold text-[#0B0F19] bg-surface-subtle px-2 py-0.5 rounded">
                {quantityTonnes} MT
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={30}
              step={1}
              value={quantityTonnes}
              onChange={(e) => updateCostState({ quantityTonnes: Number(e.target.value) })}
              className="w-full accent-[#D1343A] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#64748B]">
              <span>1 MT</span>
              <span>12 MT (Hero)</span>
              <span>21 MT (Full Tanker)</span>
              <span>30 MT</span>
            </div>
          </div>

          {/* Slider 2: Rate (₹/MT) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#1E293B]">
                {commercialModel === 'sale' ? 'Sale Price (₹/MT)' : 'Gate Treatment Fee (₹/MT)'}
              </span>
              <span className="font-mono font-bold text-[#0B0F19] bg-surface-subtle px-2 py-0.5 rounded">
                ₹{ratePerTonne.toLocaleString()}/MT
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={5000}
              step={50}
              value={ratePerTonne}
              onChange={(e) => updateCostState({ ratePerTonne: Number(e.target.value) })}
              className="w-full accent-[#D1343A] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#64748B]">
              <span>₹0</span>
              <span>₹1,250 (Kiln Clinker)</span>
              <span>₹3,000 (Meerut Brick)</span>
              <span>₹5,000</span>
            </div>
          </div>

          {/* Slider 3: Transport Distance (km) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#1E293B]">Transport Distance (km)</span>
              <span className="font-mono font-bold text-[#0B0F19] bg-surface-subtle px-2 py-0.5 rounded">
                {distanceKm} km
              </span>
            </div>
            <input
              type="range"
              min={20}
              max={1200}
              step={10}
              value={distanceKm}
              onChange={(e) => updateCostState({ distanceKm: Number(e.target.value) })}
              className="w-full accent-[#D1343A] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#64748B]">
              <span>20 km</span>
              <span>65 km (Meerut)</span>
              <span>820 km (Rajasthan)</span>
              <span>1,200 km</span>
            </div>
          </div>

          {/* Slider 4: Freight Rate (₹/km) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#1E293B]">Freight Rate (₹/km)</span>
              <span className="font-mono font-bold text-[#0B0F19] bg-surface-subtle px-2 py-0.5 rounded">
                ₹{freightPerKm}/km
              </span>
            </div>
            <input
              type="range"
              min={50}
              max={130}
              step={5}
              value={freightPerKm}
              onChange={(e) => updateCostState({ freightPerKm: Number(e.target.value) })}
              className="w-full accent-[#D1343A] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#64748B]">
              <span>₹50/km</span>
              <span>₹85/km (Rubber Lined)</span>
              <span>₹130/km</span>
            </div>
          </div>

          {/* Input 5: Testing Fee */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#1E293B]">Testing & Analysis Fee</span>
              <span className="font-mono font-bold text-[#0B0F19] bg-surface-subtle px-2 py-0.5 rounded">
                ₹{testingFeeInr.toLocaleString()}
              </span>
            </div>
            <input
              type="number"
              value={testingFeeInr}
              onChange={(e) => updateCostState({ testingFeeInr: Number(e.target.value) })}
              className="w-full px-3 py-1.5 text-xs font-mono text-[#0B0F19] bg-surface border border-[#E2E4DC] rounded-xl focus:outline-none focus:border-[#D1343A]"
            />
            <span className="text-[10px] text-[#64748B]">Shriram / SGS NABL trace assay fee</span>
          </div>

          {/* Input 6: Handling & Packaging */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#1E293B]">Loading & Pumping Fee</span>
              <span className="font-mono font-bold text-[#0B0F19] bg-surface-subtle px-2 py-0.5 rounded">
                ₹{packagingHandlingInr.toLocaleString()}
              </span>
            </div>
            <input
              type="number"
              value={packagingHandlingInr}
              onChange={(e) => updateCostState({ packagingHandlingInr: Number(e.target.value) })}
              className="w-full px-3 py-1.5 text-xs font-mono text-[#0B0F19] bg-surface border border-[#E2E4DC] rounded-xl focus:outline-none focus:border-[#D1343A]"
            />
            <span className="text-[10px] text-[#64748B]">Diaphragm pump vat loading & labor</span>
          </div>
        </div>

        {/* 3. STRICT DOCUMENTED TSDF DISPOSAL BASELINE TOGGLE */}
        <div className="p-4 rounded-xl bg-[#F8F6F5] border border-[#E2E4DC] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#0B0F19]">
                Documented TSDF Disposal Baseline Exists
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                  hasDocumentedBaseline
                    ? 'bg-[#DCFCE7] text-[#16A34A]'
                    : 'bg-[#FEE2E2] text-[#DC2626]'
                }`}
              >
                {hasDocumentedBaseline ? '₹4,000/MT Baseline Active' : 'Strictly Enforced ₹0 Baseline'}
              </span>
            </div>
            <p className="text-[11px] text-[#64748B] max-w-2xl">
              Strict industrial compliance rule: If the generator does not hold an active contract and manifest receipts with a licensed TSDF operator, avoided disposal savings are strictly enforced to <strong className="text-[#0B0F19]">₹0</strong>.
            </p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={hasDocumentedBaseline}
              onChange={(e) => updateCostState({ hasDocumentedBaseline: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-[#E2E4DC] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16A34A]"></div>
          </label>
        </div>
      </div>

      {/* 4. BAR CHART: Status Quo (-₹48,000) vs Deal Net Cash vs Net Economic Gain (+₹40,550) */}
      <div className="p-5 rounded-2xl bg-surface border border-[#E2E4DC] shadow-subtle space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E2E4DC]">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#16A34A]" />
            <h3 className="text-sm font-bold text-[#0B0F19]">
              Economic Comparison: Status Quo vs Deal Net Cash vs Net Gain
            </h3>
          </div>
          <span className="text-xs font-mono font-semibold text-[#64748B]">
            Values in Indian Rupees (₹)
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E4DC" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: '#1E293B', fontWeight: 600 }}
                axisLine={{ stroke: '#E2E4DC' }}
              />
              <YAxis
                tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
                tick={{ fontSize: 11, fill: '#64748B' }}
                axisLine={{ stroke: '#E2E4DC' }}
              />
              <Tooltip
                formatter={(val: number) => [`₹${val.toLocaleString()}`, 'Amount']}
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid #E2E4DC',
                  fontSize: '12px',
                }}
              />
              <ReferenceLine y={0} stroke="#64748B" strokeWidth={1.5} />
              <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="p-3 rounded-xl bg-surface-subtle text-xs text-[#1E293B] text-center font-medium border border-[#E2E4DC]">
          {hasDocumentedBaseline
            ? `Bundled co-processing unlocks a +₹${calculations.netEconomicGain.toLocaleString()} swing compared to paying ₹${Math.abs(calculations.statusQuoCost).toLocaleString()} in TSDF landfill disposal fees.`
            : `Without documented TSDF baseline, the net economic outcome is strictly based on cash flow (+₹${calculations.sellerNetCash.toLocaleString()}).`}
        </div>
      </div>

      {/* 5. ITEMIZED FINANCIAL LEDGER (Non-Double-Counted) */}
      <div className="p-5 rounded-2xl bg-surface border border-[#E2E4DC] shadow-subtle space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E2E4DC]">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#D1343A]" />
            <h3 className="text-sm font-bold text-[#0B0F19]">
              Itemized Financial & Tax Ledger (GST Non-Double-Counted)
            </h3>
          </div>
          <span className="text-xs text-[#64748B]">
            HSN 2806 (Hydrochloric Acid) & SAC 9965 (Goods Transport Agency)
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Table A: Seller Transaction Costs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D1343A]">
              1. SELLER (GENERATOR) TRANSACTION ACCOUNT
            </h4>
            <div className="rounded-xl border border-[#E2E4DC] overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-subtle text-[#64748B] text-[11px] font-semibold border-b border-[#E2E4DC]">
                  <tr>
                    <th className="p-2.5">Ledger Item</th>
                    <th className="p-2.5">Basis</th>
                    <th className="p-2.5 text-right">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E4DC]">
                  <tr>
                    <td className="p-2.5 font-semibold text-[#0B0F19]">Gross Byproduct Value</td>
                    <td className="p-2.5 text-[#64748B]">{quantityTonnes} MT @ ₹{ratePerTonne}</td>
                    <td className="p-2.5 text-right font-mono font-bold text-[#16A34A]">
                      {calculations.isSale ? '+' : '-'}₹{calculations.grossMaterialAmount.toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-[#1E293B]">Seller Freight Contribution (50%)</td>
                    <td className="p-2.5 text-[#64748B]">{distanceKm} km @ ₹{freightPerKm}/km</td>
                    <td className="p-2.5 text-right font-mono text-[#DC2626]">
                      -₹{calculations.sellerFreightShare.toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-[#1E293B]">NABL Lab Assay Fee</td>
                    <td className="p-2.5 text-[#64748B]">Targeted Trace Assay</td>
                    <td className="p-2.5 text-right font-mono text-[#DC2626]">
                      -₹{testingFeeInr.toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-[#1E293B]">Loading & Diaphragm Pumping</td>
                    <td className="p-2.5 text-[#64748B]">On-site handling</td>
                    <td className="p-2.5 text-right font-mono text-[#DC2626]">
                      -₹{packagingHandlingInr.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-surface-subtle font-bold border-t border-[#E2E4DC]">
                    <td className="p-2.5 text-[#0B0F19]">Seller Net Cash Realization</td>
                    <td className="p-2.5 text-[10px] text-[#64748B]">Bank settlement</td>
                    <td
                      className={`p-2.5 text-right font-mono ${
                        calculations.sellerNetCash >= 0 ? 'text-[#16A34A]' : 'text-[#DC2626]'
                      }`}
                    >
                      {calculations.sellerNetCash >= 0 ? '+' : ''}₹{calculations.sellerNetCash.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Table B: Buyer Landed Acquisition & GST Breakdown */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#16A34A]">
              2. BUYER (CO-PROCESSOR) LANDED COST & GST AUDIT
            </h4>
            <div className="rounded-xl border border-[#E2E4DC] overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-subtle text-[#64748B] text-[11px] font-semibold border-b border-[#E2E4DC]">
                  <tr>
                    <th className="p-2.5">Ledger Item</th>
                    <th className="p-2.5">GST Rate / Rule</th>
                    <th className="p-2.5 text-right">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E4DC]">
                  <tr>
                    <td className="p-2.5 font-semibold text-[#0B0F19]">Material Purchase Price</td>
                    <td className="p-2.5 text-[#64748B]">{quantityTonnes} MT @ ₹{ratePerTonne}</td>
                    <td className="p-2.5 text-right font-mono font-bold text-[#0B0F19]">
                      ₹{calculations.grossMaterialAmount.toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-[#1E293B]">Buyer Freight Share (50%)</td>
                    <td className="p-2.5 text-[#64748B]">Shared Tanker Route</td>
                    <td className="p-2.5 text-right font-mono text-[#0B0F19]">
                      ₹{calculations.buyerFreightShare.toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-[#1E293B]">18% GST on Chemical Byproduct</td>
                    <td className="p-2.5 text-[#64748B]">HSN 2806 (Input Tax Credit)</td>
                    <td className="p-2.5 text-right font-mono text-[#64748B]">
                      +₹{calculations.gstOnMaterial.toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-[#1E293B]">5% GTA Transport Freight RCM</td>
                    <td className="p-2.5 text-[#64748B]">Reverse Charge Mechanism</td>
                    <td className="p-2.5 text-right font-mono text-[#64748B]">
                      +₹{calculations.gstOnFreightRcm.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-surface-subtle font-bold border-t border-[#E2E4DC]">
                    <td className="p-2.5 text-[#0B0F19]">Total Buyer Landed Cost</td>
                    <td className="p-2.5 text-[10px] text-[#64748B]">Incl. freight & taxes</td>
                    <td className="p-2.5 text-right font-mono text-[#0B0F19]">
                      ₹{calculations.buyerLandedCost.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
