import React from "react";

import { openSubcriptionToCoinbaseWebSocket } from "../helpers";
import { WEBSOCKET_URL } from "../CONSTANTS";
import OrderBook from "./OrderBook";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      buy: [],
      sell: [],
      ordersShown: 20
      // snapshot: {},
      // snapshotCount: 0,
      // stateChanges: 0
    };
  }

  componentDidMount() {
    openSubcriptionToCoinbaseWebSocket(WEBSOCKET_URL, msg => {
      const msgData = JSON.parse(msg.data);
      if (msgData.type === "l2update") {
        const [type, price, size] = msgData.changes[0];
        this.setState(state => {
          if (size > 0 && state[type].length < state.ordersShown)
            return {
              [type]: [{ price, size }, ...state[type]]
                .map(x => x)
                .slice(0, state.ordersShown),
              stateChanges: (state.stateChanges += 1)
            };
        });
      }
      if (msgData.type == "snapshot") {
        // ???
      }
    });
  }

  render() {
    return (
      <div>
        <OrderBook orders={this.state} />
      </div>
    );
  }
}
