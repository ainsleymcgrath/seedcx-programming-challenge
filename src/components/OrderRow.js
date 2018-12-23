import React from "react";

export default function OrderRow(props) {
  return (
    <div>
      <li>
        {props.price} --- {props.size}
      </li>
    </div>
  );
}
