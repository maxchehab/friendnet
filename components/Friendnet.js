import React from "react";
import ReactFullpage from "@fullpage/react-fullpage";

export default class Friendnet extends React.Component {
  render() {
    return (
      <ReactFullpage
        render={() => {
          return (
            <ReactFullpage.Wrapper>
              <div
                style={{
                  backgroundColor: "#262626",
                  userSelect: "none",
                  userDrag: "none"
                }}
                draggable={false}
                className={"section"}
              >
                {this.props.children}
              </div>
            </ReactFullpage.Wrapper>
          );
        }}
      />
    );
  }
}
