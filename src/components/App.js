import React, { Component } from "react";

import {
  openSubcriptionToCoinbaseWebSocket,
  toTwoDecimals,
  toSixPrecision
} from "../helpers";
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
      if (msgData.type == "snapshot") {
        const { bids, asks } = msgData;

        // prettier-ignore
        const rearrange = x =>
          x.sort((a, b) => toSixPrecision(b[0]) - toSixPrecision(a[0]))
            .map(([price, size]) => ({ [toTwoDecimals(price)]: { size } }))
            .slice(1, this.state.ordersShown)
            .reduce((acc, cur) => ({ ...acc, ...cur }));

        this.setState({ bids: rearrange(bids), asks: rearrange(asks) });
      }

      // don't start updating until the snapshot has come in
      if (msgData.type === "l2update") {
        const { time, product_id } = msgData;

        if (this.state.productId !== product_id) {
          this.setState({ productId: product_id });
        }

        const [_type, price, size] = msgData.changes.flat();
        const type = `${_type === "buy" ? "bids" : "asks"}`;
        // ^ line up `type` with the names used for state

        const orderBookUpdate = {
          [toTwoDecimals(price)]: { size: toSixPrecision(size), time }
        };

        // coinbase says size 0 should be removed from the boook: https://docs.pro.coinbase.com/#the-level2-channel
        if (parseInt(size) === 0 && this.state[type] !== {}) {
          this.setState(state => {
            delete state[type][toTwoDecimals(price)];
            return { [type]: state[type] };
          });
        } else {
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
        .map(k => ({
          price: k,
          size: x[k].size,
          time: x[k].time
        }))
        .filter(row => row.price < 9000)
        .sort((a, b) => b.price - a.price)
        .slice(0, this.state.ordersShown);

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
