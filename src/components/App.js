import React from "react";
import ReactDOM from "react-dom";

import { openSubcriptionToCoinbaseWebSocket } from "../helpers";
import { WEBSOCKET_URL } from "../CONSTANTS";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = { lol: [] };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    openSubcriptionToCoinbaseWebSocket(WEBSOCKET_URL, msg =>
      this.setState(state => ({
        lol: [...state.lol, JSON.parse(msg.data).changes]
      }))
    );
  }

  handleChange(e) {
    const { value, name } = e.target;

    this.setState({ [name]: value });
  }

  render() {
    return this.state.lol.map(lol => <div>{lol}</div>);
  }
}
