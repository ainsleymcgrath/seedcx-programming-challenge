import React, { Fragment } from "react";
import { toSixSigFigs, toTwoDecimals } from "../helpers";

export default function MidpointPriceRow(props) {
  return (
    <Fragment>
      <hr />
      <div className="column is-full">
        <div className="level is-mobile">
          <div className="level-left">
            <span className="level-item">{toTwoDecimals(props.price)}</span>
          </div>
          <span className="level-item">
            {props.side === "buy" ? "📈" : "📉"}
          </span>
          <div className="level-right">
            <span className="level-item">{toSixSigFigs(props.size)}</span>
          </div>
        </div>
      </div>
      <hr />
    </Fragment>
  );
}
