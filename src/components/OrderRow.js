import React from "react";

export default function OrderRow(props) {
  return (
    <div className="level is-mobile">
      <div className="level-left">
        <span className="level-item">{props.price}</span>
      </div>
      <div className="level-right">
        <span className="level-item">{props.size}</span>
      </div>
    </div>
  );
}
