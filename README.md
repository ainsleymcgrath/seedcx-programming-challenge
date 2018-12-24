# Seed CX Code Test

Enclosed: my best attempt at building an Orderbook to hopefully prove my worth to the good folks over at Seed CX.

## Ingredients

- React ⚛️ because you told me to.
- Parcel 🎁 because why config your bundler...?
- Bulma 📗 because style is hard.
- Sass 💃🏽 because Bulma.

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



## Thinking

### Design Decisions

This application listens to the `l2update` channel on the Coinbase WebSocket API. Only "l2update" message types are processed. The most recently updated bids and asks for the chosen currency are displayed on the orderbook table.

### Head Scratchers

