import React, {Fragment} from 'react';
import {toSixSigFigs, toTwoDecimals} from '../helpers';

export default function MidpointPriceRow(props) {
  return (
    <Fragment>
      <hr />
      <div className="column is-full">
        <div className="level is-mobile">
          <span className="level-item">{toTwoDecimals(props.price)}</span>
          <span className="level-item">
            {toTwoDecimals(
              ((props.price - props.prevPrice) / props.prevPrice) * 100,
            )}
            %
          </span>
        </div>
      </div>
      <hr />
    </Fragment>
  );
}
