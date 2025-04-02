
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, ArrowDown, ArrowUp, Zap } from 'lucide-react';

const indicators = [
  {
    name: 'Market Stress Index',
    value: 78,
    description: 'High stress level detected',
    change: 12,
    changeType: 'increase',
    severity: 'high'
  },
  {
    name: 'Fractal Dimension',
    value: 62,
    description: 'Increasing market complexity',
    change: 8,
    changeType: 'increase',
    severity: 'medium'
  },
  {
    name: 'Self-Similarity Score',
    value: 45,
    description: 'Moderate pattern repetition',
    change: 3,
    changeType: 'decrease',
    severity: 'low'
  },
  {
    name: 'Crash Probability',
    value: 82,
    description: 'High risk of market correction',
    change: 25,
    changeType: 'increase',
    severity: 'high'
  }
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'low': return 'bg-fractal-success';
    case 'medium': return 'bg-fractal-warning';
    case 'high': return 'bg-fractal-danger';
    default: return 'bg-fractal-teal';
  }
};

const getProgressColor = (value: number) => {
  if (value > 70) return 'bg-fractal-danger';
  if (value > 40) return 'bg-fractal-warning';
  return 'bg-fractal-success';
};

const FractalIndicators = () => {
  return (
    <Card className="border-fractal-blue bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-fractal-warning" />
          Early Warning Indicators
        </CardTitle>
        <CardDescription>
          Real-time fractal-based risk metrics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {indicators.map((indicator, index) => (
            <div key={index} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${getSeverityColor(indicator.severity)}`} />
                  <span className="font-medium">{indicator.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{indicator.value}%</span>
                  <div className={`flex items-center text-xs ${indicator.changeType === 'increase' ? 'text-fractal-danger' : 'text-fractal-success'}`}>
                    {indicator.changeType === 'increase' ? (
                      <ArrowUp className="h-3 w-3" />
                    ) : (
                      <ArrowDown className="h-3 w-3" />
                    )}
                    {indicator.change}%
                  </div>
                </div>
              </div>
              <Progress value={indicator.value} className={getProgressColor(indicator.value)} />
              <p className="text-xs text-muted-foreground">{indicator.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FractalIndicators;
