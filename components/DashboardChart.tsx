import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Simulated historical data for the visualization
const data = [
  { name: 'Day 1', risk: 20 },
  { name: 'Day 2', risk: 35 },
  { name: 'Day 3', risk: 45 },
  { name: 'Day 4', risk: 60 },
  { name: 'Day 5', risk: 55 },
  { name: 'Day 6', risk: 75 },
  { name: 'Day 7', risk: 85 },
];

const DashboardChart: React.FC = () => {
  return (
    <div className="h-64 w-full bg-white rounded-lg p-4 border border-slate-200">
      <h3 className="text-sm font-semibold text-slate-500 mb-4 uppercase tracking-wider">7-Day Regional Risk Trend</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="name" tick={{fontSize: 12}} stroke="#94a3b8" />
          <YAxis tick={{fontSize: 12}} stroke="#94a3b8" />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Area type="monotone" dataKey="risk" stroke="#ef4444" fill="#fee2e2" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardChart;
