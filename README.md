# Seed CX Programming Challenge

Enclosed: my best attempt at building an Orderbook to hopefully prove my worth to the good folks over at [Seed CX](https://seedcx.com/).

View it in the [wild](https://seedcx-programming-challenge.firebaseapp.com/) as a [Firebase](https://firebase.google.com/docs/hosting/) app.

## Ingredients

- [React](https://reactjs.org/) ⚛️ because it was in the prompt.
- [Parcel](https://parceljs.org) 🎁 because why config your bundler...?
- [Bulma](https://bulma.io/) 📗 because style is hard.
- [Sass](https://sass-lang.com/) 💃🏽 because Bulma.

## Running It Locally

(If you use nvm)

```bash
nvm use
```

Install dependencies & go go go!

```bash
npm i
npm run start
```



## Coinbase Integration

This application listens to the `level2` and `match` channels on the [Coinbase WebSocket Feed](https://docs.pro.coinbase.com/#websocket-feed). Only `l2update` message types are processed from the former. (The `snapshot` is skipped because its huge and unweildy-- didn't feel worth slowing everything down with.) The most recently updated bids and asks for BTC (although other currencies are possible) are displayed on the orderbook table. The `match` channel is used only to display the midpoint price and percentage change from the last midpoint.

