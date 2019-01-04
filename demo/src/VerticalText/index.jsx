import React, { Component } from "react";

export default class VerticalText extends Component {
  render() {
    return this.props.text.split(/\s+/g).map((item) => (
      <h1
        style={{
          display: "block",
          textAlign: "left",
          width: "80vw"
        }}
      >
        {item.replace(/_{2}/g, " ")}
      </h1>
    ));
  }
}
