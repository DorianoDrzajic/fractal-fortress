
import React from 'react';
import Header from '@/components/Header';
import FractalChart from '@/components/FractalChart';
import FractalIndicators from '@/components/FractalIndicators';
import HistoricalPatterns from '@/components/HistoricalPatterns';
import MfDfaAnalysis from '@/components/MfDfaAnalysis';
import PredictionModel from '@/components/PredictionModel';
import { AssetProvider } from '@/contexts/AssetContext';

const Index = () => {
  return (
    <AssetProvider>
      <div className="min-h-screen mesh-gradient">
        <Header />
        <main className="container py-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <FractalChart />
            </div>
            
            <div>
              <FractalIndicators />
            </div>
            
            <div>
              <HistoricalPatterns />
            </div>
            
            <div>
              <MfDfaAnalysis />
            </div>
            
            <div className="lg:col-span-1">
              <PredictionModel />
            </div>
          </div>
        </main>
        <footer className="border-t border-border bg-card px-6 py-4">
          <div className="container flex items-center justify-between text-sm text-muted-foreground">
            <div>Fractal Fortress © {new Date().getFullYear()} - Market Crash Prediction System</div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-fractal-success animate-pulse"></div>
              <span>Data updated: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </footer>
      </div>
    </AssetProvider>
  );
};

export default Index;
