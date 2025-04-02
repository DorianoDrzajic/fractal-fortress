
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Asset {
  id: string;
  name: string;
  trend: 'positive' | 'negative';
  change: number;
}

export const assets: Asset[] = [
  { id: 'SPY', name: 'S&P 500', trend: 'negative', change: -2.3 },
  { id: 'QQQ', name: 'NASDAQ', trend: 'negative', change: -3.1 },
  { id: 'DIA', name: 'Dow Jones', trend: 'negative', change: -1.8 },
  { id: 'IWM', name: 'Russell 2000', trend: 'negative', change: -2.7 },
  { id: 'GLD', name: 'Gold', trend: 'positive', change: 1.5 },
  { id: 'BTC', name: 'Bitcoin', trend: 'negative', change: -4.2 },
  { id: 'VIX', name: 'Volatility Index', trend: 'positive', change: 28.4 },
];

interface AssetContextType {
  selectedAsset: string;
  setSelectedAsset: (asset: string) => void;
  currentAssetData: Asset | undefined;
}

const AssetContext = createContext<AssetContextType | undefined>(undefined);

export const AssetProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedAsset, setSelectedAsset] = useState('SPY');
  
  const currentAssetData = assets.find(asset => asset.id === selectedAsset);
  
  return (
    <AssetContext.Provider value={{ selectedAsset, setSelectedAsset, currentAssetData }}>
      {children}
    </AssetContext.Provider>
  );
};

export const useAsset = (): AssetContextType => {
  const context = useContext(AssetContext);
  if (context === undefined) {
    throw new Error('useAsset must be used within an AssetProvider');
  }
  return context;
};
