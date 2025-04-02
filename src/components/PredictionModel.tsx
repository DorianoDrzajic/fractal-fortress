
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { AlertTriangle, AlertCircle, ArrowRight } from 'lucide-react';

// Mock data for predictions
const predictionData = [
  { time: 0, actual: 100, predicted: 100 },
  { time: 1, actual: 102, predicted: 101 },
  { time: 2, actual: 105, predicted: 103 },
  { time: 3, actual: 103, predicted: 104 },
  { time: 4, actual: 106, predicted: 105 },
  { time: 5, actual: 110, predicted: 107 },
  { time: 6, actual: 108, predicted: 108 },
  { time: 7, actual: 105, predicted: 107 },
  { time: 8, actual: 102, predicted: 104 },
  { time: 9, actual: 98, predicted: 101 },
  { time: 10, actual: 96, predicted: 98 },
  // Future predictions (no actual values)
  { time: 11, actual: null, predicted: 95 },
  { time: 12, actual: null, predicted: 91 },
  { time: 13, actual: null, predicted: 87 },
  { time: 14, actual: null, predicted: 83 },
  { time: 15, actual: null, predicted: 80 },
  { time: 16, actual: null, predicted: 75 },
  { time: 17, actual: null, predicted: 72 },
  { time: 18, actual: null, predicted: 69 },
  { time: 19, actual: null, predicted: 65 },
  { time: 20, actual: null, predicted: 68 },
];

const PredictionModel = () => {
  return (
    <Card className="border-fractal-blue bg-card">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-fractal-danger animate-pulse" />
              Crash Prediction Model
            </CardTitle>
            <CardDescription>
              AI-powered fractal pattern forecasting
            </CardDescription>
          </div>
          <Badge variant="destructive" className="animate-pulse">
            High Alert
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-md bg-fractal-blue/40 p-3 text-center">
              <div className="text-xs text-muted-foreground">Crash Probability</div>
              <div className="text-2xl font-bold text-fractal-danger">78%</div>
            </div>
            <div className="rounded-md bg-fractal-blue/40 p-3 text-center">
              <div className="text-xs text-muted-foreground">Time Horizon</div>
              <div className="text-2xl font-bold text-fractal-warning">10 Days</div>
            </div>
            <div className="rounded-md bg-fractal-blue/40 p-3 text-center">
              <div className="text-xs text-muted-foreground">Expected Drop</div>
              <div className="text-2xl font-bold text-fractal-danger">-35%</div>
            </div>
          </div>
          
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={predictionData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2C4870" />
                <XAxis dataKey="time" stroke="#2C4870" />
                <YAxis stroke="#2C4870" domain={['auto', 'auto']} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#172A46', 
                    border: '1px solid #2C4870',
                    borderRadius: '6px'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#38BDF8" 
                  dot={false} 
                  strokeWidth={2}
                  name="Actual"
                />
                <Line 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="#F59E0B" 
                  dot={false} 
                  strokeWidth={2}
                  strokeDasharray={predictionData.findIndex(d => d.actual === null) > -1 ? "0" : "5 5"}
                  name="Predicted"
                />
                <ReferenceLine 
                  x={10} 
                  stroke="#EC4899" 
                  strokeWidth={2}
                  label={{ value: 'Now', position: 'top', fill: '#EC4899' }} 
                />
                <ReferenceLine
                  y={65}
                  stroke="#EF4444"
                  strokeDasharray="3 3"
                  label={{ value: 'Support', position: 'right', fill: '#EF4444' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="rounded-md bg-fractal-danger/20 border border-fractal-danger p-3">
            <div className="mb-2 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-fractal-danger" />
              <h3 className="font-medium text-fractal-danger">Warning: Critical Fractal Pattern Detected</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Current market conditions show self-similar patterns to previous crash scenarios with 78% confidence. 
              Recommend reducing exposure to high-beta assets and increasing hedges.
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Model Confidence</span>
              <span className="font-medium">82%</span>
            </div>
            <Progress value={82} className="bg-fractal-blue h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictionModel;
