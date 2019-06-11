async function getRatesFor(currency) {
  const BASE_URL = "https://api.coinbase.com/v2/exchange-rates?currency=";
  const response = await fetch(BASE_URL + currency);
  if (!response.ok) {
    console.error('Error fetching from API');
  }
  try {
    const data = await response.json();
    const rates = data.data.rates;
    return rates;

  } catch (e) {
    console.error(e);
  }
}

function getRatesFrom(rates, currency, currencyList) {
  const currencies = currencyList
    .filter((e) => e !== currency);

  return currencies.map((currency) => ({
    currency,
    value: rates[currency]
  }));
}

export async function getRates(currency, currencyList = ["BTC", "ETH", "LTC"]) {
  const rates = await getRatesFor(currency);
  return getRatesFrom(rates, currency, currencyList);
}