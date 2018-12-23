import React from "react";
import OrderRow from "./OrderRow";

export default function OrderBook(props) {
  return (
    <div className="columns is-multiline is-mobile">
      <div className="column is-full">
        <div className="level is-mobile">
          <div className="level-left">
            <span className="level-item ">PRICE</span>
          </div>
          <div className="level-right">
            <span className="level-item ">SIZE</span>
          </div>
        </div>
      </div>

      <div className="column is-full has-text-danger">
        {props.asks.map(o => (
          <OrderRow {...o} key={o.price} />
        ))}
      </div>
      <hr className="column is-full" />
      <div className="column is-full has-text-success">
        {props.bids.map(o => (
          <OrderRow {...o} key={o.price} />
        ))}
      </div>
    </div>
  );
}
