
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Brain } from 'lucide-react';

// Mock data for Multifractal Spectrum
const multifractalData = [
  { q: -5, h: 1.8, Dq: 0.2 },
  { q: -4, h: 1.6, Dq: 0.4 },
  { q: -3, h: 1.4, Dq: 0.6 },
  { q: -2, h: 1.2, Dq: 0.8 },
  { q: -1, h: 1.0, Dq: 0.9 },
  { q: 0, h: 0.7, Dq: 1.0 },
  { q: 1, h: 0.6, Dq: 0.9 },
  { q: 2, h: 0.5, Dq: 0.8 },
  { q: 3, h: 0.4, Dq: 0.6 },
  { q: 4, h: 0.3, Dq: 0.4 },
  { q: 5, h: 0.2, Dq: 0.2 },
];

const MfDfaAnalysis = () => {
  return (
    <Card className="border-fractal-blue bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-fractal-pink" />
          Multifractal Analysis (MF-DFA)
        </CardTitle>
        <CardDescription>
          Multifractal Detrended Fluctuation Analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-sm font-medium">Multifractal Spectrum</h3>
            <p className="text-xs text-muted-foreground">
              Width: 1.6 (indicating high multifractality)
            </p>
          </div>
          
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={multifractalData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#2C4870" />
                <XAxis dataKey="h" stroke="#2C4870" label={{ value: 'h(q)', position: 'insideBottomRight', offset: -5 }} />
                <YAxis stroke="#2C4870" label={{ value: 'D(h)', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#172A46', 
                    border: '1px solid #2C4870',
                    borderRadius: '6px'
                  }}
                  formatter={(value, name) => [value.toFixed(2), name]}
                  labelFormatter={(value) => `h = ${value}`}
                />
                <Area 
                  type="monotone" 
                  dataKey="Dq" 
                  stroke="#EC4899" 
                  fill="url(#colorDq)" 
                  fillOpacity={0.6}
                />
                <defs>
                  <linearGradient id="colorDq" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EC4899" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#EC4899" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="rounded-md bg-fractal-blue/50 p-3 text-sm">
            <h4 className="mb-2 font-medium">Interpretation:</h4>
            <p className="text-muted-foreground">
              The wide multifractal spectrum indicates complex market dynamics with multiple scaling behaviors. 
              This pattern is often observed before market regime shifts and increased volatility.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MfDfaAnalysis;
