import React from "react";
import OrderRow from "./OrderRow";
import MidpointPricerow from "./MidpointPriceRow";

export default function OrderBook(props) {
  return (
    <div className="columns is-multiline is-mobile">
      <div className="column is-full">
        <div className="level is-mobile">
          <div className="level-left">
            <span className="level-item has-text-weight-bold is-size-5">
              PRICE
            </span>
          </div>
          <div className="level-right">
            <span className="level-item has-text-weight-bold is-size-5">
              SIZE
            </span>
          </div>
        </div>
      </div>
      <div className="box column is-full">
        <div className="column is-full has-text-danger">
          <span className="help has-text-centered">(asks)</span>
          {props.asks.map(o => (
            <OrderRow {...o} key={o.price} />
          ))}
        </div>
        <MidpointPricerow {...props.lastMatch} />
        <div className="column is-full has-text-success">
          {props.bids.map(o => (
            <OrderRow {...o} key={o.price} />
          ))}
          <span className="help has-text-centered">(bids)</span>
        </div>
      </div>
    </div>
  );
}
