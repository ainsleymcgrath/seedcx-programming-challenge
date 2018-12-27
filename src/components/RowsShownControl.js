import React from "react";

export default function RowsShownControl(props) {
  return (
    <div className="field has-addons">
      <div className="control">
        <input
          type="text"
          className="input is-small"
          value={props.value}
          onChange={props.onChange}
          name="ordersShown"
          id="rows-shown-input"
        />
      </div>
      <div className="control">
        <button htmlFor="ordersShown" className="button is-static is-small">
          rows shown
        </button>
      </div>
    </div>
  );
}
