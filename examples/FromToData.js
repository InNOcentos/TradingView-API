const TradingView = require('../main')

/*
  This example tests fetching chart
  data of a number of candles before
  or after a timestamp
*/

const BETTER_MACD = 'PUB;0F3eh03L0W70KP7Tata2t6I9SpoAjLnJ'
const UT_BOT_ALERTS = 'PUB;fvKf7ZbacOxo47bpXI9rDSN0npXIk48x'

const client = new TradingView.Client()

const chart = new client.Session.Chart()
chart.setMarket('BINANCE:BTCUSDT', {
  timeframe: '5',
  range: 10, // Can be positive to get before or negative to get after
})

// This works with indicators

TradingView.getIndicator(BETTER_MACD).then(async indic => {
  console.log(`Loading '${indic.description}' study...`)
  const SUPERTREND = new chart.Study(indic)

  SUPERTREND.onUpdate(() => {
    console.log('Prices periods:', chart.periods)
    console.log('Study periods:', SUPERTREND.periods)
    client.end()
  })
})
