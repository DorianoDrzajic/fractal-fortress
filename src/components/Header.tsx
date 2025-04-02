
import React from 'react';
import { Activity, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import AssetSelector from './AssetSelector';

const Header = () => {
  return (
    <header className="border-b border-border bg-card px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-fractal-teal animate-pulse" />
          <h1 className="text-xl font-bold">
            <span className="fractal-text-gradient">Fractal Fortress</span>
          </h1>
          <Badge variant="outline" className="ml-2 bg-fractal-blue text-fractal-teal">Beta</Badge>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-fractal-success animate-pulse" />
            <span className="text-sm text-muted-foreground">Data: Live</span>
          </div>
          
          <div className="flex items-center gap-1.5 bg-fractal-blue/50 px-3 py-1.5 rounded-md">
            <AlertTriangle className="h-4 w-4 text-fractal-warning" />
            <span className="text-sm font-medium text-fractal-warning">
              Volatility Alert: High
            </span>
          </div>
          
          <AssetSelector />
        </div>
      </div>
    </header>
  );
};

export default Header;
