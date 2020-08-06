/**
 * Fetch the daily close prices from CoinDesk API when given two date ranges
 * @param {String} start: yyyy-mm-dd
 * @param {String} end: yyyy-mm-dd
 * @returns {Promise->Object}
 */
export const fetchClosePricesForDateRange = (start:string, end:string) => {
  return fetch(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`)
    .then(res => res.json());
}
