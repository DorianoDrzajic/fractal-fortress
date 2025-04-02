
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

// Mock volatility data with regime shifts
const volatilityData = Array(100).fill(0).map((_, i) => {
  let baseVol = 15;
  
  // Create three distinct volatility regimes
  if (i > 30 && i < 45) {
    baseVol = 25 + Math.random() * 15; // First volatility spike
  } else if (i > 70 && i < 85) {
    baseVol = 40 + Math.random() * 25; // Second larger volatility spike
  } else {
    baseVol = 15 + Math.random() * 10; // Normal volatility
  }
  
  return {
    day: i,
    volatility: baseVol,
    // Highlight regime shifts
    regimeShift: (i === 30 || i === 45 || i === 70 || i === 85) ? baseVol : null
  };
});

// Calculate realized volatility thresholds
const lowVolThreshold = 20;
const highVolThreshold = 35;

const VolatilityAnalysis = () => {
  return (
    <div className="h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={volatilityData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2C4870" />
          <XAxis dataKey="day" stroke="#2C4870" />
          <YAxis stroke="#2C4870" label={{ value: 'Volatility (%)', angle: -90, position: 'insideLeft' }} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#172A46', 
              border: '1px solid #2C4870',
              borderRadius: '6px'
            }}
            formatter={(value: number) => [`${value.toFixed(2)}%`, 'Volatility']}
          />
          
          {/* Volatility Line */}
          <Line 
            type="monotone" 
            dataKey="volatility" 
            stroke="#EC4899" 
            dot={false} 
            strokeWidth={2}
          />
          
          {/* Regime Shift Points */}
          <Line 
            type="monotone" 
            dataKey="regimeShift" 
            stroke="#38BDF8" 
            strokeWidth={0}
            dot={{ r: 6, fill: '#38BDF8', strokeWidth: 2, stroke: '#172A46' }}
          />
          
          {/* Threshold Lines */}
          <ReferenceLine y={lowVolThreshold} stroke="#8B5CF6" strokeDasharray="3 3" label={{ value: 'Normal', position: 'right', fill: '#8B5CF6' }} />
          <ReferenceLine y={highVolThreshold} stroke="#F43F5E" strokeDasharray="3 3" label={{ value: 'Crisis', position: 'right', fill: '#F43F5E' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VolatilityAnalysis;
