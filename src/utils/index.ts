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

    if (header.startsWith("percent")) {
        return Number(Number(data).toFixed(1)) + "%"
    }

    if (header.endsWith("price")) {
        return formatMoney(+data)
    }

    if (header.startsWith("timestamp")) {
        if (moment(data, moment.ISO_8601, true).isValid()) {
            return moment(data).format("YYYY-MM-DD HH:mm:ss"); // or any format you prefer
        }
        return data
    }

    return data;

}

export async function getUSDTPrices() {
  const majorCoins = [
    "BTC","ETH","BNB","SOL","XRP","ADA","DOGE","AVAX","DOT","LINK",
    "MATIC","TRX","ATOM","LTC","UNI","ETC","XLM","XMR","OP","APT",
    "ARB","FIL","AAVE","SAND","NEAR","INJ","ALGO","RUNE","GRT","VET"
  ];

  try {
    // formatted date only
    const formattedTime = moment().format("YYYY-MM-DD HH:mm:ss");

    // Only price data needed
    const pricesResp = await axios.get("https://api.binance.com/api/v3/ticker/price");

    // Fast lookup map
    const priceMap = new Map<string, string>();
    for (const p of pricesResp.data) {
      priceMap.set(p.symbol, p.price);
    }

    // Build final result
    return majorCoins.map(asset => {
      const symbol = `${asset}USDT`;

      return {
        asset,
        price: priceMap.get(symbol) ?? null,
        timestamp: formattedTime
      };
    });

  } catch (err) {
    console.error("getUSDTPrices error:", err);
    throw err;
  }
}