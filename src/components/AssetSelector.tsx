
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAsset, assets } from '@/contexts/AssetContext';

const AssetSelector: React.FC = () => {
  const { selectedAsset, setSelectedAsset, currentAssetData } = useAsset();
  
  return (
    <div className="flex items-center gap-2 min-w-[220px]">
      <Select value={selectedAsset} onValueChange={setSelectedAsset}>
        <SelectTrigger className="bg-fractal-blue border-fractal-blue">
          <SelectValue placeholder="Select Asset" />
        </SelectTrigger>
        <SelectContent className="bg-card border-fractal-blue">
          {assets.map((asset) => (
            <SelectItem key={asset.id} value={asset.id} className="focus:bg-fractal-blue/50">
              <div className="flex items-center justify-between gap-2">
                {asset.name}
                <Badge 
                  variant="outline" 
                  className={`${asset.trend === 'positive' ? 'text-fractal-success' : 'text-fractal-danger'}`}
                >
                  {asset.trend === 'positive' ? '+' : ''}{asset.change}%
                </Badge>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {currentAssetData && (
        <Badge 
          variant="outline" 
          className={`${currentAssetData.trend === 'positive' ? 'text-fractal-success' : 'text-fractal-danger'} animate-pulse`}
        >
          <Activity className="mr-1 h-3 w-3" />
          {currentAssetData.trend === 'positive' ? '+' : ''}{currentAssetData.change}%
        </Badge>
      )}
    </div>
  );
};

export default AssetSelector;
