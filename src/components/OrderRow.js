import React from "react";
import { toSixPrecision } from "../helpers";

export default function OrderRow(props) {
  return (
    <div className="level is-mobile">
      <div className="level-left">
        {/* `price` came in preformatted, no need to alter decimals */}
        <span className="level-item">{props.price}</span>
      </div>
      <div className="level-right">
        <span className="level-item">{toSixPrecision(props.size)}</span>
      </div>
    </div>
  );
}
