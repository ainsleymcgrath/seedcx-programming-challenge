import React from "react";

import { openSubcriptionToCoinbaseWebSocket } from "../helpers";
import { WEBSOCKET_URL } from "../CONSTANTS";
import OrderBook from "./OrderBook";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      bids: {},
      asks: {},
      ordersShown: 5
    };
  }

  componentDidMount() {
    openSubcriptionToCoinbaseWebSocket(WEBSOCKET_URL, msg => {
      const msgData = JSON.parse(msg.data);
      if (msgData.type === "l2update") {
        const [_type, price, size] = msgData.changes.flat();
        const type = [`${_type === "buy" ? "bids" : "asks"}`];

        const orderBookUpdate = {
          [parseFloat(price).toFixed(2)]: size
        };

        if (parseInt(size) !== 0) {
          this.setState(state => ({
            [type]: { ...state[type], ...orderBookUpdate }
          }));
        }
      }
      if (msgData.type == "snapshot") {
        (() => {})();
        // this.setState({
        //   bids: msgData.bids
        //     .flatMap(([price, size]) => ({
        //       [parseFloat(price).toFixed(2)]: size
        //     }))
        //     .reduce((acc, cur) => ({ ...acc, ...cur }), {}),
        //   asks: msgData.asks
        //     .flatMap(([price, size]) => ({
        //       [parseFloat(price).toFixed(2)]: size
        //     }))
        //     .reduce((acc, cur) => ({ ...acc, ...cur }), {})
        // });
      }
    });
  }

  render() {
    const rearrange = x =>
      Object.keys(x)
        .map(k => ({ price: k, size: x[k] }))
        .slice(-this.state.ordersShown);

    return (
      <div>
        <OrderBook
          bids={rearrange(this.state.bids)}
          asks={rearrange(this.state.asks)}
        />
      </div>
    );
  }
}
