import React from "react";

export default class User extends React.Component {
  changeValue(event) {
    event.preventDefault();
    this.setState({ value: event.target.value });
    this.props.changeFriendValue(
      this.props.currentNodeIndex,
      this.props.node.index,
      event.target.value,
      this.props.where
    );
  }

  render() {
    let slideValue = 0;
    for (
      let i = 0;
      i < this.props.dag.nodes[this.props.currentNodeIndex].edges.length;
      i++
    ) {
      let edge = this.props.dag.edges[
        this.props.dag.nodes[this.props.currentNodeIndex].edges[i]
      ];
      if (
        edge.from == this.props.currentNodeIndex &&
        edge.to == this.props.node.index
      ) {
        slideValue = edge.data.friendValue;
        break;
      }
    }

    return (
      <div
        style={{
          borderTop: "none",
          height: "50px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingLeft: "10px",
          paddingRight: "10px"
        }}
      >
        <style>{`
        input::-webkit-slider-runnable-track { background: #ef4f6c; height: 5px;  border-radius: 5px; }
        input::-moz-range-track {  background: #ef4f6c; height: 5px; border-radius: 5px; }
        input::-ms-track {  background: #ef4f6c; height: 5px; border-radius: 5px;}

        input::-webkit-slider-runnable-thumb { background: #ef4f6c; height: 25px; border-radius: 50%; width: 25px; border-radius: 50%  }
        input::-moz-range-thumb {  background: #ef4f6c; height: 25px; border-radius: 50%; width: 25px; border-radius: 50% }
        input::-ms-thumb {  background: #ef4f6c; height: 25px; border-radius: 50%; width: 25px; border-radius: 50%}
        `}</style>
        <div
          style={{
            border: "1px solid #ef4f6c",
            backgroundSize: "contain",
            borderRadius: "50%",
            backgroundImage: `url(${this.props.node.profile.profilePic})`,
            width: "40px",
            height: "40px"
          }}
        />
        <div style={{ paddingLeft: "15px" }}>
          {this.props.node.profile.username}
        </div>
        {this.props.currentNodeIndex != this.props.node.index && (
          <div style={{ display: "flex", flex: 1 }}>
            <input
              style={{
                alignSelf: "center",
                flex: 1,
                marginLeft: "15px",
                height: "100%"
              }}
              onChange={e => this.changeValue(e)}
              type={"range"}
              min={0}
              max={10}
              value={slideValue}
              className={"no-drag slider"}
            />
            <p>{slideValue}</p>
          </div>
        )}
      </div>
    );
  }
}
