import React from "react";
import OrderRow from "./OrderRow";

export default function OrderBook(props) {
  return (
    <div>
      <h1>Buy</h1>
      <ul>
        {props.orders.buy.map(o => (
          <OrderRow {...o} />
        ))}
      </ul>
      <h1>Sell</h1>
      <ul>
        {props.orders.sell.map(o => (
          <OrderRow {...o} />
        ))}
      </ul>
    </div>
  );
}
