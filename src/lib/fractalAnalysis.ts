
/**
 * Utility functions for fractal market analysis
 */

/**
 * Generates a time series with fractal properties using fractional Brownian motion
 * @param length Number of data points to generate
 * @param hurstExponent Hurst exponent (0.5 = random walk, >0.5 = trending, <0.5 = mean-reverting)
 * @param startValue Initial value for the time series
 * @returns Array of price values
 */
export function generateRandomTimeSeries(length: number, hurstExponent: number, startValue: number): number[] {
  const series: number[] = [startValue];
  
  // Simple approximation of fractional Brownian motion
  for (let i = 1; i < length; i++) {
    // Generate correlated increments based on Hurst exponent
    const randomComponent = Math.random() * 2 - 1; // Random value between -1 and 1
    const trendComponent = series[i-1] > startValue ? 1 : -1;
    
    // Mix random and trend components based on Hurst exponent
    const increment = (randomComponent * (1 - Math.abs(hurstExponent - 0.5) * 2) + 
                       trendComponent * Math.abs(hurstExponent - 0.5) * 2) * 2;
    
    series.push(series[i-1] + increment);
  }
  
  return series;
}

/**
 * Calculates the Hurst exponent using R/S analysis (rescaled range)
 * @param series Time series data
 * @returns Estimated Hurst exponent
 */
export function calculateHurstExponent(series: number[]): number {
  // We'll use a simplified R/S analysis to estimate the Hurst exponent
  const n = series.length;
  if (n < 10) return 0.5; // Not enough data
  
  // We'll use several different time periods and average the results
  const periods = [10, 20, 40, 80].filter(p => p < n/2);
  
  const logRSValues: {logN: number, logRS: number}[] = [];
  
  for (const period of periods) {
    const numSegments = Math.floor(n / period);
    let rsSum = 0;
    
    for (let i = 0; i < numSegments; i++) {
      const segment = series.slice(i * period, (i + 1) * period);
      
      // Calculate mean
      const mean = segment.reduce((sum, val) => sum + val, 0) / segment.length;
      
      // Calculate cumulative deviations from mean
      const cumulativeDeviations = segment.map(x => x - mean);
      let cumSum = 0;
      const cumulativeSums = cumulativeDeviations.map(x => cumSum += x);
      
      // Calculate range (max - min of cumulative sum)
      const range = Math.max(...cumulativeSums) - Math.min(...cumulativeSums);
      
      // Calculate standard deviation
      const stdDev = Math.sqrt(
        cumulativeDeviations.reduce((sum, x) => sum + x * x, 0) / segment.length
      );
      
      // Calculate R/S (rescaled range)
      const rs = stdDev > 0 ? range / stdDev : 1;
      rsSum += rs;
    }
    
    // Average R/S value for this period
    const avgRS = rsSum / numSegments;
    
    logRSValues.push({
      logN: Math.log(period),
      logRS: Math.log(avgRS)
    });
  }
  
  // Calculate Hurst exponent from slope of log-log plot
  // Using simple least squares regression
  if (logRSValues.length < 2) return 0.5;
  
  const n2 = logRSValues.length;
  const sumX = logRSValues.reduce((sum, val) => sum + val.logN, 0);
  const sumY = logRSValues.reduce((sum, val) => sum + val.logRS, 0);
  const sumXY = logRSValues.reduce((sum, val) => sum + val.logN * val.logRS, 0);
  const sumX2 = logRSValues.reduce((sum, val) => sum + val.logN * val.logN, 0);
  
  // Slope of the regression line = Hurst exponent
  const slope = (n2 * sumXY - sumX * sumY) / (n2 * sumX2 - sumX * sumX);
  
  // Clamp value between 0 and 1
  return Math.max(0, Math.min(1, slope));
}

/**
 * Detects potential market regime changes based on fractal analysis
 * @param data Time series data
 * @param windowSize Size of the rolling window for analysis
 * @returns Array of regime change probabilities
 */
export function detectRegimeChanges(data: number[], windowSize: number = 50): number[] {
  if (data.length < windowSize * 2) {
    return new Array(data.length).fill(0);
  }
  
  const result: number[] = new Array(data.length).fill(0);
  
  for (let i = windowSize; i < data.length - windowSize; i++) {
    const window1 = data.slice(i - windowSize, i);
    const window2 = data.slice(i, i + windowSize);
    
    const hurst1 = calculateHurstExponent(window1);
    const hurst2 = calculateHurstExponent(window2);
    
    // Calculate volatility in both windows
    const vol1 = calculateVolatility(window1);
    const vol2 = calculateVolatility(window2);
    
    // Combine hurst difference and volatility change to estimate regime change probability
    const hurstChange = Math.abs(hurst2 - hurst1);
    const volChange = Math.abs(vol2 - vol1) / vol1;
    
    // Simple model: higher probability when both Hurst and volatility change significantly
    const probability = Math.min(1, (hurstChange * 2 + volChange) / 2);
    
    result[i] = probability;
  }
  
  return result;
}

/**
 * Calculates volatility of a time series
 * @param data Time series data
 * @returns Volatility (standard deviation of returns)
 */
function calculateVolatility(data: number[]): number {
  if (data.length < 2) return 0;
  
  // Calculate returns
  const returns = [];
  for (let i = 1; i < data.length; i++) {
    returns.push((data[i] - data[i-1]) / data[i-1]);
  }
  
  // Calculate standard deviation of returns
  const mean = returns.reduce((sum, val) => sum + val, 0) / returns.length;
  const variance = returns.reduce((sum, val) => sum + (val - mean) ** 2, 0) / returns.length;
  
  return Math.sqrt(variance);
}
