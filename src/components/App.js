import React from "react";
import ReactDOM from "react-dom";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = { hello: "world" };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { value, name } = e.target;

    this.setState({ [name]: value });
  }

  render() {
    return (
      <div>
        <p>hello</p>
        <input
          type="text"
          name="hello"
          onChange={this.handleChange}
          value={this.state.hello}
        />
      </div>
    );
  }
}
