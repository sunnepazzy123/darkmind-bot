export type SymbolType = "BTCUSDT"

// Define the TypeScript interface for the table rows
export interface Prices {
    timestamp: string,
    symbol: SymbolType,
    price: number
  
}
