import React from "react";
import MobileApp from "./MobileApp";

export default class Node extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mouseDownTime: 0,
      lastExitTime: Infinity
    };
  }

  componentDidUpdate() {
    // console.log(this.state);
  }

  onMouseUp(event) {
    const currentTime = new Date().getTime();

    if (
      currentTime - this.state.mouseDownTime < 350 &&
      currentTime - this.state.lastExitTime > 100
    ) {
      if (event.target.classList.contains("exit")) {
        this.setState({ lastExitTime: currentTime });
        this.props.changePrompt(false);
      } else {
        this.props.changePrompt(true);
      }
    }

    this.setState({ mouseDownTime: currentTime, lastExitTime: currentTime });

    this.props.onDragEnd();
  }

  onMouseDown(event) {
    if (event.target.classList.contains("no-drag")) {
      return;
    }
    this.setState({ mouseDownTime: new Date().getTime() });
    this.props.onDragStart();
  }

  render() {
    return (
      <div
        style={{
          position: "absolute ",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `translateX(50vw) translateX(${
            this.props.x
          }px) translateX(-${this.props.size / 2}px) translateY(${
            this.props.y
          }px) translateY(-${this.props.size / 2}px)`,
          zIndex: this.props.showPrompt ? this.props.zIndexOrder + 2 : 1
        }}
      >
        <div
          style={{
            cursor: "pointer",
            backgroundColor: "262626",
            borderStyle: "solid",
            borderWidth: "3px",
            borderColor: this.props.path ? "#99ccff" : "#ef4f6c",
            overflow: "hidden",
            backgroundSize: "contain",
            transition: "width 100ms, height 100ms, border-radius 100ms",
            borderRadius: this.props.showPrompt ? "0" : "50%",
            backgroundImage: `url(${this.props.profile.profilePic})`,
            width: this.props.showPrompt ? "350px" : `${this.props.size}px`,
            height: this.props.showPrompt ? "600px" : `${this.props.size}px`
          }}
          onTouchStart={e => {
            this.onMouseDown(e);
          }}
          onTouchEnd={e => {
            this.onMouseUp(e);
          }}
          onMouseDown={e => {
            this.onMouseDown(e);
          }}
          onMouseUp={e => {
            this.onMouseUp(e);
          }}
          onMouseLeave={e => {
            this.onMouseUp(e);
          }}
        >
          <div
            style={{
              display: this.props.showPrompt ? "block" : "none",
              width: "100%",
              height: "100%",
              backgroundColor: "#ef4f6c"
            }}
            pose={this.props.showPrompt ? "show" : "init"}
          >
            <div
              className={"exit"}
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#ef4f6c",
                position: "absolute",
                borderRadius: "50%",
                right: "-20px",
                top: "-20px",
                backgroundSize: "contain",
                backgroundImage:
                  "url(https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/VisualEditor_-_Icon_-_Close_-_white.svg/1024px-VisualEditor_-_Icon_-_Close_-_white.svg.png)"
              }}
            />
            <MobileApp
              nodeIndex={this.props.nodeIndex}
              dag={this.props.dag}
              changeFriendValue={this.props.changeFriendValue}
              drawPath={this.props.drawPath}
              removePath={this.props.removePath}
            />
          </div>
        </div>
      </div>
    );
  }
}
