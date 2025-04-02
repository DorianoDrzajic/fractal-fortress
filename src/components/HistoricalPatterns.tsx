
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { History, TrendingDown } from 'lucide-react';

const historicalCrashes = [
  {
    id: '2008',
    name: '2008 Financial Crisis',
    similarity: 78,
    description: 'Current patterns show 78% similarity to 2008 pre-crash signals.',
    patterns: [
      'Increasing market complexity (rising fractal dimension)',
      'Decreasing Hurst exponent (0.35) indicating potential mean reversion',
      'Volatility clustering similar to pre-2008 patterns'
    ]
  },
  {
    id: '2000',
    name: '2000 Dot-com Bubble',
    similarity: 45,
    description: 'Some similarities to dot-com bubble pattern but lower correlation.',
    patterns: [
      'Similar sector rotation patterns',
      'Different fractal dimension profile',
      'Lower volatility compared to 2000'
    ]
  },
  {
    id: '1987',
    name: '1987 Black Monday',
    similarity: 62,
    description: 'Moderate similarity to conditions before Black Monday crash.',
    patterns: [
      'Increasing correlation across market sectors',
      'Similar Hurst exponent trajectory',
      'Different market microstructure dynamics'
    ]
  },
  {
    id: '1929',
    name: '1929 Great Depression',
    similarity: 31,
    description: 'Low similarity to Great Depression patterns.',
    patterns: [
      'Different volatility profile',
      'Different monetary policy environment',
      'Similar speculative behavior in some sectors'
    ]
  }
];

const HistoricalPatterns = () => {
  return (
    <Card className="border-fractal-blue bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5 text-fractal-purple" />
          Historical Pattern Comparison
        </CardTitle>
        <CardDescription>
          Fractal similarity to previous market crashes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="2008">
          <TabsList className="mb-4 bg-fractal-blue">
            {historicalCrashes.map(crash => (
              <TabsTrigger key={crash.id} value={crash.id}>
                {crash.name.split(' ')[0]}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {historicalCrashes.map(crash => (
            <TabsContent key={crash.id} value={crash.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">{crash.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Similarity:</span>
                  <div className={`font-medium ${crash.similarity > 70 ? 'text-fractal-danger' : crash.similarity > 50 ? 'text-fractal-warning' : 'text-fractal-success'}`}>
                    {crash.similarity}%
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground">{crash.description}</p>
              
              <div className="rounded-md bg-fractal-blue/50 p-3">
                <div className="mb-2 flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-fractal-teal" />
                  <span className="font-medium">Key Fractal Patterns</span>
                </div>
                <ScrollArea className="h-[120px] pr-4">
                  <ul className="space-y-2 text-sm">
                    {crash.patterns.map((pattern, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-fractal-teal" />
                        <span>{pattern}</span>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default HistoricalPatterns;
