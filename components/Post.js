import React from "react";
import User from "./User";

export default class Post extends React.Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          border: "2px solid #ef4f6c",
          marginBottom: "15px",
          flexShrink: 0
        }}
      >
        <div style={{ borderBottom: "2px solid #ef4f6c" }}>
          <User
            dag={this.props.dag}
            currentNodeIndex={this.props.currentNodeIndex}
            node={this.props.node}
            changeFriendValue={this.props.changeFriendValue}
            drawPath={this.props.drawPath}
            removePath={this.props.removePath}
            where={"post"}
          />
        </div>
        <img
          draggable={false}
          style={{
            pointerEvents: "none",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            borderBottom: "2px solid #ef4f6c"
          }}
          src={this.props.data.url}
        />
        <p style={{ paddingLeft: "15px" }}>{this.props.data.name}</p>
      </div>
    );
  }
}
