import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import {
  HANDLING_COST_COMPARISON,
  COMPARISON_CHART_CAPTION,
  CO2_ESTIMATED_TONNES,
} from '../../mock/economics';

export const BaselineComparisonChart: React.FC = () => {
  return (
    <div className="bg-surface rounded-2xl p-5 border border-surface-subtle shadow-card">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-ink-secondary">
          Total Cost of Handling 21 t per Batch (₹, Negative = Cost)
        </h4>
        <span className="text-[11px] font-bold text-status-success">
          ₹40,550 Net Benefit vs Baseline
        </span>
      </div>

      <div className="h-44 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={HANDLING_COST_COMPARISON}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
          >
            <XAxis
              type="number"
              domain={[-100000, 0]}
              tickFormatter={(v) => `₹${Math.round(v / 1000)}k`}
              tick={{ fontSize: 10, fill: '#8C8785' }}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={160}
              tick={{ fontSize: 11, fill: '#1A1818', fontWeight: 600 }}
            />
            <Tooltip
              formatter={(val: number) => [
                `₹${val.toLocaleString()}`,
                'Net Batch Expense (after receiver payment)',
              ]}
              contentStyle={{
                backgroundColor: '#1A1818',
                borderRadius: '8px',
                color: '#FFFFFF',
                fontSize: '12px',
              }}
            />
            <Bar dataKey="costInr" radius={[0, 6, 6, 0]}>
              {HANDLING_COST_COMPARISON.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 pt-2 border-t border-surface-subtle flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-ink-muted gap-1">
        <span className="font-medium text-ink-secondary">{COMPARISON_CHART_CAPTION}</span>
        <span className="font-semibold text-status-success whitespace-nowrap">
          {CO2_ESTIMATED_TONNES} t CO₂e (estimated)
        </span>
      </div>
    </div>
  );
};
