# Seed CX Code Test

Enclosed: my best attempt at building an Orderbook to hopefully prove my worth to the good folks over at Seed CX. View it in the [wild](https://seedcx-programming-challenge.firebaseapp.com/) as a [Firebase](https://firebase.google.com/docs/hosting/) app.

## Ingredients

- [React](https://reactjs.org/) ⚛️ because you told me to.
- [Parcel](https://parceljs.org) 🎁 because why config your bundler...?
- [Bulma](https://bulma.io/) 📗 because style is hard.
- [Sass](https://sass-lang.com/) 💃🏽 because Bulma.

## Usage

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

This application listens to the `level2` and `match` channels on the Coinbase WebSocket API. Only `l2update` message types are processed from the former. (The `snapshot` is skipped because its huge and unweildy-- didn't feel worth slowing everything down with.) The most recently updated bids and asks for the chosen currency are displayed on the orderbook table. The `match` channel is used only to display the midpoint price and percentage change from the last 

