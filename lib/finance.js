import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance();

export async function getStockData(ticker) {
  try {
    const quote = await yahooFinance.quote(ticker);

    return {
      symbol: quote.symbol,
      currentPrice: quote.regularMarketPrice,
      marketCap: quote.marketCap,
      peRatio: quote.trailingPE,
      fiftyTwoWeekHigh: quote.fiftyTwoWeekHigh,
      fiftyTwoWeekLow: quote.fiftyTwoWeekLow,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
}