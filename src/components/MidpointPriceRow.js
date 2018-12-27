import React, { Fragment } from "react";
import { toTwoDecimals } from "../helpers";

export default function MidpointPriceRow(props) {
  // show a dash instead of something ugly like NaN
  const percentChange =
    props.prevPrice && props.price
      ? toTwoDecimals(((props.price - props.prevPrice) / props.prevPrice) * 100)
      : "-";

  return (
    <Fragment>
      <hr />
      <div className="column is-full">
        <div className="level is-mobile">
          <span className="level-item is-italic">Midpoint Price:</span>
          <span className="level-item">
            {props.price ? toTwoDecimals(props.price) : "-"}
          </span>
          <span className="level-item">{percentChange}%</span>
        </div>
      </div>
      <hr />
    </Fragment>
  );
}
