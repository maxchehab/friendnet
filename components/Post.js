import React from "react";
import User from "./User";

export default class Post extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const likeIMG = this.props.data.likes.includes(this.props.currentNodeIndex)
      ? "url('/static/heart-filled.png')"
      : "url('/static/heart-outline.png')";
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
        {this.props.recommendation && (
          <div
            style={{ padding: 10, borderBottom: "2px solid #ef4f6c" }}
          >{`We recomended this because your good friend, ${
            this.props.friend
          }, liked this.`}</div>
        )}
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
            paddingBottom: "5px"
          }}
        >
          <div
            onClick={() =>
              this.props.like(
                this.props.currentNodeIndex,
                this.props.data.user,
                this.props.data.id
              )
            }
            style={{
              width: 45,
              height: 45,
              background: `center / cover ${likeIMG}`
            }}
          />
          <p style={{ alignSelf: "center" }}>{this.props.data.name}</p>
        </div>
      </div>
    );
  }
}
