import React from "react";

export default class Edge extends React.Component {
  render() {
    const width = typeof window !== "undefined" ? window.innerWidth : 0;
    const height = typeof window !== "undefined" ? window.innerHeight : 0;

    const from = this.props.from;
    const to = this.props.to;

    const radius1 = to.size / 2 + 50;
    const slope1 = (from.y - to.y) / (from.x - to.x);
    const theta1 = Math.atan(slope1);
    const alterY1 = from.x < to.x ? 1 : -1;
    const alterX1 = from.x < to.x ? 1 : -1;
    const x1 = to.x - alterX1 * Math.cos(theta1) * radius1;
    const y1 = to.y - alterY1 * Math.sin(theta1) * radius1;

    const radius2 = to.size / 2 + 43;

    const slope2 = (to.y - from.y) / (to.x - from.x);
    const theta2 = Math.atan(slope2);
    const alterY2 = to.x < from.x ? 1 : -1;
    const alterX2 = to.x < from.x ? 1 : -1;
    const x2 = from.x - alterX2 * Math.cos(theta2) * radius2;
    const y2 = from.y - alterY2 * Math.sin(theta2) * radius2;

    return (
      <svg
        style={{
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        }}
        width="100%"
        height="100%"
      >
        <defs>
          <marker
            id="arrow"
            markerWidth={20}
            markerHeight={20}
            refX="0"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L0,6 L6,3 z" fill="#ef4f6c" />
          </marker>

          <marker
            refX="5"
            refY="5"
            id="circle"
            markerWidth="20"
            markerHeight="20"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <circle cx="5" cy="5" r="2" fill="#ef4f6c" />
          </marker>
        </defs>
        <line
          x1={x2 + width / 2}
          y1={y2 + height / 2}
          x2={x1 + width / 2}
          y2={y1 + height / 2}
          stroke="#ef4f6c"
          strokeWidth={(this.props.value / 10) * 8}
          markerEnd="url(#arrow)"
          // markerStart="url(#circle)"
        />
      </svg>
    );
  }
}
