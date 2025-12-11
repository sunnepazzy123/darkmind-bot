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

  if (header.endsWith("price")) {
    return formatMoney(+data)
  }

  if (header.startsWith("createdAt")) {
    if (moment(data, moment.ISO_8601, true).isValid()) {
      return moment(data).format("YYYY-MM-DD HH:mm:ss"); // or any format you prefer
    }
    return data
  }

  return data;

}

export async function getUSDTPrices() {
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
      };
    });

  } catch (err) {
    console.error("getUSDTPrices error:", err);
    throw err;
  }
}
