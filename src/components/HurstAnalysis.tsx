
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend } from 'recharts';

// Mock rolling Hurst exponent data
const hurstData = Array(100).fill(0).map((_, i) => {
  let baseHurst = 0.5;
  
  // Create different Hurst regimes
  if (i < 30) {
    // Random walk (Brownian motion) - Hurst around 0.5
    baseHurst = 0.5 + (Math.random() * 0.1 - 0.05);
  } else if (i >= 30 && i < 55) {
    // Trending market (persistent) - Hurst > 0.5
    baseHurst = 0.65 + (Math.random() * 0.15);
  } else if (i >= 55 && i < 75) {
    // Regime change - transition
    baseHurst = 0.5 + (i - 55) * (-0.015) + (Math.random() * 0.08 - 0.04);
  } else {
    // Mean-reverting market (anti-persistent) - Hurst < 0.5
    baseHurst = 0.35 + (Math.random() * 0.1 - 0.05);
  }
  
  // Calculate log-log plot data points for one example point
  const loglogData = i === 60 ? [
    { logn: 1.0, logs: 0.35 },
    { logn: 1.5, logs: 0.53 },
    { logn: 2.0, logs: 0.78 },
    { logn: 2.5, logs: 0.98 },
    { logn: 3.0, logs: 1.25 },
  ] : null;
  
  return {
    day: i,
    hurst: baseHurst,
    regimeChange: (i === 30 || i === 55 || i === 75) ? baseHurst : null,
    loglogData,
  };
});

const HurstAnalysis = () => {
  return (
    <div className="h-[350px] space-y-2">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={hurstData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2C4870" />
          <XAxis dataKey="day" stroke="#2C4870" />
          <YAxis 
            stroke="#2C4870" 
            domain={[0.2, 0.9]} 
            ticks={[0.3, 0.5, 0.7]} 
            label={{ value: 'Hurst Exponent', angle: -90, position: 'insideLeft' }} 
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#172A46', 
              border: '1px solid #2C4870',
              borderRadius: '6px'
            }}
            formatter={(value: number) => [value.toFixed(3), 'Hurst Exponent']}
          />
          <Legend />
          
          {/* Reference lines for interpretation */}
          <ReferenceLine y={0.5} stroke="#8B5CF6" strokeDasharray="3 3" label={{ value: 'Random Walk', position: 'left', fill: '#8B5CF6' }} />
          <ReferenceLine y={0.7} stroke="#38BDF8" strokeDasharray="3 3" label={{ value: 'Trending', position: 'left', fill: '#38BDF8' }} />
          <ReferenceLine y={0.3} stroke="#F43F5E" strokeDasharray="3 3" label={{ value: 'Mean-Reverting', position: 'left', fill: '#F43F5E' }} />
          
          {/* Hurst Exponent Line */}
          <Line 
            type="monotone" 
            dataKey="hurst" 
            stroke="#38BDF8" 
            dot={false} 
            strokeWidth={2}
            name="Rolling Hurst Exponent"
          />
          
          {/* Regime Change Points */}
          <Line 
            type="monotone" 
            dataKey="regimeChange" 
            stroke="#EC4899" 
            strokeWidth={0}
            dot={{ r: 6, fill: '#EC4899', strokeWidth: 2, stroke: '#172A46' }}
            name="Regime Change"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HurstAnalysis;
