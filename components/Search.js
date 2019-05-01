import React from "react";
import User from "./User";

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      searching: false,
      results: []
    };
  }
  search(event) {
    this.setState({
      query: event.target.value,
      searching: event.target.value.length > 0,
      results: this.props.nodes.filter(node => {
        return node.profile.username.match(event.target.value);
      })
    });
  }
  render() {
    return (
      <div style={{ display: "flex", flexShrink: 0 }}>
        <div
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            padding: "15px",
            flex: "0 1 auto"
          }}
        >
          <div style={{ display: "flex", flexShrink: 0 }}>
            <input
              onChange={e => this.search(e)}
              placeholder={"search .*"}
              style={{
                width: "100%",
                height: "36px",
                backgroundColor: "white",
                fontSize: "18px",
                paddingLeft: "10px",
                border: "2px solid #ef4f6c"
              }}
            />
          </div>
          <div
            style={{
              display: this.state.searching ? "block" : "none"
            }}
          >
            {this.state.results.length > 0 &&
              this.state.results.map((node, index) => {
                return (
                  <div
                    key={`search-node-${index}`}
                    style={{
                      border: "2px solid #ef4f6c",
                      borderTop: "none"
                    }}
                  >
                    <User
                      where={"search"}
                      node={node}
                      dag={this.props.dag}
                      currentNodeIndex={this.props.currentNodeIndex}
                      changeFriendValue={this.props.changeFriendValue}
                      drawPath={this.props.drawPath}
                      removePath={this.props.removePath}
                    />
                  </div>
                );
              })}
            {this.state.results.length == 0 && (
              <div
                style={{
                  border: "2px solid #ef4f6c",
                  borderTop: "none",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "vertical",
                  alignItems: "center"
                }}
              >
                <p>{"No results."}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
