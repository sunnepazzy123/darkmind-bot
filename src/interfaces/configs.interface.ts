export interface StrategyConfig {
  symbol: string;             // Trading pair (e.g. "BTCUSDT")
  base: string;               // Base currency (e.g. "USDT")
  buyThreshold: number;      // Price drop below EMA to trigger a buy (e.g. 0.98 = 2% below)
  buyQuantity: number;       // Amount to buy per trade (e.g. 0.1 BTC)
  window: number;             // EMA period (number of candles)
  cooldownSeconds: number;   // Cooldown between trades in seconds
  stopLoss: number;          // Stop-loss as a fraction (e.g. 0.01 = -1%)
  takeProfit: number;        // Take-profit as a fraction (e.g. 0.02 = +2%)
  maxVolatility: number;     // Max allowed volatility (e.g. 0.02 = 2%)
}

export enum OrderSide {
  BUY = "BUY",
  SELL = "SELL"
};

export interface IOrder {
  symbol: string;
  side: OrderSide;
  price: number;
  quantity: number;
  createdAt: string;
}

export interface SymbolPnl {
  realizedPnl: number;
  openQty: number;
  avgOpenPrice: number;
  totalBuyQty: number;
  totalSellQty: number;
  hasOversell: boolean;
}

export type PnlBySymbol = Record<string, SymbolPnl>;