import React, { Component } from "react";

import { openSubcriptionToCoinbaseWebSocket, toTwoDecimals } from "../helpers";
import { WEBSOCKET_URL } from "../CONSTANTS";
import OrderBook from "./OrderBook";
import RowsShownControl from "./RowsShownControl";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      bids: {},
      asks: {},
      lastMatch: {},
      ordersShown: 4,
      productId: ""
    };
  }

  componentDidMount() {
    openSubcriptionToCoinbaseWebSocket(WEBSOCKET_URL, msg => {
      const msgData = JSON.parse(msg.data);

      if (msgData.type === "l2update") {
        const { time, product_id } = msgData;

        if (this.state.productId !== product_id) {
          this.setState({ productId: product_id });
        }

        const [_type, price, size] = msgData.changes.flat();
        const type = `${_type === "buy" ? "bids" : "asks"}`;
        // ^ line up `type` with the names used for state

        const orderBookUpdate = {
          [toTwoDecimals(price)]: { size, time }
        };

        // coinbase says size 0 should be ignored: https://docs.pro.coinbase.com/#the-level2-channel
        if (parseInt(size) !== 0) {
          this.setState(state => ({
            [type]: { ...state[type], ...orderBookUpdate }
          }));
        }
      }

      // `last_match` is the first message from coinbase; same as regular `match`
      if (msgData.type === "match" || msgData.type === "last_match") {
        const { price } = msgData;

        this.setState(state => ({
          lastMatch: {
            price,
            prevPrice: state.lastMatch.price
          }
        }));
      }
    });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    // makes a subset of the N most recent orders
    // in a more advantageous shape for <OrderRow/>
    const rearrange = x =>
      Object.keys(x)
        .map(k => ({ price: k, size: x[k].size, time: x[k].time }))
        .sort((a, b) => a.time - b.time)
        .slice(-this.state.ordersShown);

    return (
      <div>
        <h1 className="is-title has-text-centered is-size-3">
          {this.state.productId}
        </h1>
        <OrderBook
          bids={rearrange(this.state.bids)}
          asks={rearrange(this.state.asks)}
          lastMatch={this.state.lastMatch}
        />
        <RowsShownControl
          value={this.state.ordersShown}
          onChange={this.handleChange.bind(this)}
        />
      </div>
    );
  }
}
