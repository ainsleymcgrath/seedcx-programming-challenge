import React, {Component} from 'react';

import {openSubcriptionToCoinbaseWebSocket, toTwoDecimals} from '../helpers';
import {WEBSOCKET_URL} from '../CONSTANTS';
import OrderBook from './OrderBook';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      bids: {},
      asks: {},
      lastMatch: {},
      ordersShown: 5,
    };
  }

  componentDidMount() {
    openSubcriptionToCoinbaseWebSocket(WEBSOCKET_URL, msg => {
      const msgData = JSON.parse(msg.data);
      if (msgData.type === 'l2update') {
        const {time} = msgData;

        const [_type, price, size] = msgData.changes.flat();
        const type = [`${_type === 'buy' ? 'bids' : 'asks'}`];

        const orderBookUpdate = {
          [toTwoDecimals(price)]: {size, time},
        };

        if (parseInt(size) !== 0) {
          this.setState(state => ({
            [type]: {...state[type], ...orderBookUpdate},
          }));
        }
      }

      if (msgData.type === 'match' || msgData.type === 'last_match') {
        const {time, price, size, side} = msgData;

        this.setState(state => ({
          lastMatch: {price, size, time, side, prevPrice: state.lastMatch.price}
        }));
      }
    });
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    const rearrange = x =>
      Object.keys(x)
        .map(k => ({price: k, size: x[k].size, time: x[k].time}))
        .sort((a, b) => a.time - b.time)
        .slice(-this.state.ordersShown);

    return (
      <div>
        {false && (
          <div className="field">
            <label htmlFor="ordersShown" className="label">
              # Rows Shown
            </label>
            <input
              type="text"
              className="input"
              value={this.state.ordersShown}
              onChange={this.handleChange.bind(this)}
              name="ordersShown"
            />
          </div>
        )}
        <OrderBook
          bids={rearrange(this.state.bids)}
          asks={rearrange(this.state.asks)}
          lastMatch={this.state.lastMatch}
        />
      </div>
    );
  }
}
