
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { generateRandomTimeSeries, calculateHurstExponent } from '@/lib/fractalAnalysis';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Info } from 'lucide-react';

interface DataPoint {
  time: number;
  price: number;
  trend?: number;
}

const FractalChart = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [hurstExponent, setHurstExponent] = useState(0);
  const [hurstInterpretation, setHurstInterpretation] = useState('');
  const [riskLevel, setRiskLevel] = useState<'low' | 'medium' | 'high'>('low');
  
  useEffect(() => {
    // Generate realistic-looking market data with fractal properties
    const newData = generateRandomTimeSeries(200, 0.7, 100);
    const formattedData = newData.map((value, index) => ({
      time: index,
      price: value,
      trend: index > 20 ? newData.slice(index - 20, index).reduce((sum, val) => sum + val, 0) / 20 : null
    }));
    
    setData(formattedData);
    
    // Calculate Hurst exponent
    const hurst = calculateHurstExponent(newData);
    setHurstExponent(parseFloat(hurst.toFixed(3)));
    
    // Set interpretation based on Hurst value
    if (hurst < 0.4) {
      setHurstInterpretation('Mean-reverting (Anti-persistent)');
      setRiskLevel('low');
    } else if (hurst > 0.6) {
      setHurstInterpretation('Trending (Persistent)');
      setRiskLevel('high');
    } else {
      setHurstInterpretation('Random Walk (Brownian motion)');
      setRiskLevel('medium');
    }
  }, []);
  
  const getRiskColor = () => {
    switch (riskLevel) {
      case 'low': return 'text-fractal-success';
      case 'medium': return 'text-fractal-warning';
      case 'high': return 'text-fractal-danger';
      default: return 'text-fractal-warning';
    }
  };

  return (
    <Card className="border-fractal-blue bg-card">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>S&P 500 Fractal Analysis</CardTitle>
            <CardDescription>Time series with fractal properties</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-fractal-blue">
              <span className="mr-1">H = {hurstExponent}</span>
              <span className={getRiskColor()}>●</span>
            </Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Info className="h-4 w-4" />
              <span>{hurstInterpretation}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="price">
          <TabsList className="mb-4 bg-fractal-blue">
            <TabsTrigger value="price">Price</TabsTrigger>
            <TabsTrigger value="volatility">Volatility</TabsTrigger>
            <TabsTrigger value="hurst">Hurst Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="price" className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2C4870" />
                <XAxis dataKey="time" stroke="#2C4870" />
                <YAxis stroke="#2C4870" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#172A46', 
                    border: '1px solid #2C4870',
                    borderRadius: '6px'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#38BDF8" 
                  dot={false} 
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="trend" 
                  stroke="#8B5CF6" 
                  dot={false} 
                  strokeWidth={1.5}
                  strokeDasharray="5 5"
                />
                <ReferenceLine 
                  y={data.length > 0 ? data[0].price : 0} 
                  stroke="#2C4870" 
                  strokeDasharray="3 3" 
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="volatility" className="h-[350px]">
            <div className="flex h-full items-center justify-center text-muted-foreground">
              Volatility analysis will be implemented in the next update
            </div>
          </TabsContent>
          
          <TabsContent value="hurst" className="h-[350px]">
            <div className="flex h-full items-center justify-center text-muted-foreground">
              Detailed Hurst exponent analysis will be implemented in the next update
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FractalChart;
