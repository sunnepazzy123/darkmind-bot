import { CryptoTickerRaw, IOrder, PnlBySymbol, SymbolPnl } from "@/interfaces/configs.interface";
import axios from "axios";
import moment from "moment";


export const formatMoney = (amount: number, currency = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatCellValue = (data: string, header: string) => {
  if (!data) return "-"

  if (header.startsWith("percentChange")) {
    return Number(Number(data).toFixed(1)) + "%"
  }

  if (header.endsWith("price") || header.endsWith("Price")) {
    return formatMoney(+data)
  }

  if (header.startsWith("createdAt")) {
    if (moment(data, moment.ISO_8601, true).isValid()) {
      return moment(data).format("YYYY-MM-DD HH:mm:ss"); // or any format you prefer
    }
    return data
  }

  if (header === "realizedPnl" || header === "avgOpenPrice" || header === "openQty" || header === "totalBuyQty" || header === "totalSellQty") {
    return roundToDecimal(Number(data), 4);
  }

  if (header.startsWith("hasOversell")) {
    return data ? "Yes" : "No";
  }

  return data;
}

export async function getUSDTPrices(): Promise<CryptoTickerRaw[]>  {
  const majorCoins: Record<string, string> = {
    BTC: "Bitcoin",
    ETH: "Ethereum",
    BNB: "Binance Coin",
    LTC: "Litecoin",
    XRP: "XRP",
    DOGE: "Dogecoin",
    DOT: "Polkadot",
  };

  // Brand image auto-mapping (1 → n)
  const brandMap: Record<string, string> = {};
  Object.keys(majorCoins).forEach((coin, i) => {
    brandMap[coin] = `./images/brand/cryptos/${coin}.svg`;
  });

  try {
    const resp = await axios.get("https://api.binance.com/api/v3/ticker/24hr");

    const map = new Map<string, any>();
    for (const item of resp.data) map.set(item.symbol, item);

    return Object.keys(majorCoins).map(asset => {
      const symbol = `${asset}USDT`;
      const info = map.get(symbol);

      // Format price into "$12,345.67"
      const formattedPrice = info?.lastPrice
        ? `$${Number(info.lastPrice).toLocaleString()}`
        : null;

      const changePercent = info?.priceChangePercent ?? null;

      return {
        symbol,
        companyName: majorCoins[asset],
        price: formattedPrice,
        change: changePercent ? `${changePercent}%` : null,
        changeDirection:
          changePercent >= 0 ? "up" : "down",
        brandImage: brandMap[asset],
      } as unknown as CryptoTickerRaw;
    });

  } catch (err) {
    console.error("getUSDTPrices error:", err);
    throw err;
  }
}


export function calculateSymbolPnl(orders: IOrder[]): SymbolPnl {
  const buys: { qty: number; price: number }[] = [];

  let realizedPnl = 0;
  let totalBuyQty = 0;
  let totalSellQty = 0;

  const sorted = [...orders].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  for (const o of sorted) {
    if (o.side === 'BUY') {
      buys.push({ qty: o.quantity, price: o.price });
      totalBuyQty += o.quantity;
    }

    if (o.side === 'SELL') {
      totalSellQty += o.quantity;
      let remaining = o.quantity;

      while (remaining > 0 && buys.length > 0) {
        const buy = buys[0];
        const matched = Math.min(remaining, buy.qty);

        realizedPnl += (o.price - buy.price) * matched;

        buy.qty -= matched;
        remaining -= matched;

        if (buy.qty === 0) buys.shift();
      }
    }
  }

  const openQty = buys.reduce((s, b) => s + b.qty, 0);
  const avgOpenPrice =
    openQty === 0
      ? 0
      : buys.reduce((s, b) => s + b.qty * b.price, 0) / openQty;

  return {
    realizedPnl,
    openQty,
    avgOpenPrice,
    totalBuyQty,
    totalSellQty,
    hasOversell: totalSellQty > totalBuyQty,
  };
}


export function calculatePnlBySymbol(allOrders: IOrder[]) {
  const bySymbol: Record<string, IOrder[]> = {};

  // group orders by symbol
  for (const order of allOrders) {
    if (!bySymbol[order.symbol]) bySymbol[order.symbol] = [];
    bySymbol[order.symbol].push(order);
  }

  const result: PnlBySymbol = {};
  let totalRealizedPnl = 0;

  for (const symbol of Object.keys(bySymbol)) {
    const pnl = calculateSymbolPnl(bySymbol[symbol]);
    result[symbol] = pnl;
    totalRealizedPnl += pnl.realizedPnl;
  }

  return {
    symbols: result,
    totalRealizedPnl,
  };
}

export function roundToDecimal(amount: number, point = 2): number {
  return Number(amount.toFixed(point));
}


