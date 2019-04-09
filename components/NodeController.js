import React from "react";
import ReactDOM from "react-dom";
import Node from "./Node";
import Edge from "./Edge";
import ReactAnimationFrame from "react-animation-frame";

class NodeData {
  constructor(index, size, x, y, profile) {
    this.index = index;
    this.size = size;
    this.profile = profile;
    this.isMobile = false;

    this.x = x;
    this.y = y;
    this.px = x;
    this.py = y;
    this.fx = 0;
    this.fy = 0;
  }
}

class NodeController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dragIndex: null,
      lastSelectedIndex: null,
      zIndexOrder: props.dag.nodes.map((_, i) => i),
      prevMouse: null,
      nodeData: props.dag.nodes.map((data, index) => {
        return new NodeData(index, 200, data.x, data.y, data.profile);
      }),
      once: false
    };
    this.onMouseMove = this.onMouseMove.bind(this);
  }

  changePrompt(index, value) {
    console.log(index + " : " + value);
    this.setState(({ nodeData }) => ({
      nodeData: [
        ...nodeData.slice(0, index),
        {
          ...nodeData[index],
          isMobile: value
        },
        ...nodeData.slice(index + 1)
      ]
    }));
  }

  resolveCollisions() {
    let nodeData = [...this.state.nodeData];
    let i = nodeData.length;
    while (i--) {
      let node_1 = { ...nodeData[i] };
      let n = nodeData.length;

      while (n-- && !node_1.isMobile) {
        if (n == i) continue;

        let node_2 = { ...nodeData[n] };
        if (node_2.isMobile) continue;

        let diff_x = node_1.x - node_2.x;
        let diff_y = node_1.y - node_2.y;

        let length = diff_x * diff_x + diff_y * diff_y;
        let dist = Math.sqrt(length) + 1;
        let real_dist = dist - (node_1.size / 2 + node_2.size / 2) - 100;
        if (real_dist < 0) {
          let depth_x = diff_x * (real_dist / dist);
          let depth_y = diff_y * (real_dist / dist);
          node_1.x -= depth_x * 0.5;
          node_1.y -= depth_y * 0.5;

          node_2.x += depth_x * 0.5;
          node_2.y += depth_y * 0.5;
        }

        nodeData[n] = node_2;
      }

      if (node_1.x + node_1.size / 2 >= window.innerWidth / 2) {
        node_1.x = window.innerWidth / 2 - node_1.size / 2;
      }
      if (node_1.x - node_1.size / 2 <= -window.innerWidth / 2) {
        node_1.x = -window.innerWidth / 2 + node_1.size / 2;
      }

      if (node_1.y + node_1.size / 2 >= window.innerHeight / 2) {
        node_1.y = window.innerHeight / 2 - node_1.size / 2;
      }
      if (node_1.y - node_1.size / 2 <= -window.innerHeight / 2) {
        node_1.y = -window.innerHeight / 2 + node_1.size / 2;
      }

      nodeData[i] = node_1;
    }
    this.setState({ nodeData });
  }

  onAnimationFrame() {
    this.resolveCollisions();
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this).addEventListener("mousemove", this.onMouseMove);
    ReactDOM.findDOMNode(this).addEventListener("touchmove", this.onMouseMove);
  }

  componentWillUnmount() {
    ReactDOM.findDOMNode(this).removeEventListener(
      "mousemove",
      this.onMouseMove
    );
    ReactDOM.findDOMNode(this).removeEventListener(
      "touchmove",
      this.onMouseMove
    );
  }

  onMouseMove(event) {
    if (this.state.dragIndex == null) {
      return;
    }

    const mouse =
      event.type == "touchmove"
        ? { x: event.touches[0].clientX, y: event.touches[0].clientY }
        : { x: event.clientX, y: event.clientY };

    if (this.state.prevMouse == null) {
      this.setState({ prevMouse: mouse });
      return;
    }

    const xIncrease = mouse.x - this.state.prevMouse.x;
    const yIncrease = mouse.y - this.state.prevMouse.y;

    this.setState({
      prevMouse: mouse
    });

    this.setState(({ nodeData }) => ({
      nodeData: [
        ...nodeData.slice(0, this.state.dragIndex),
        {
          ...nodeData[this.state.dragIndex],
          x: nodeData[this.state.dragIndex].x + xIncrease,
          y: nodeData[this.state.dragIndex].y + yIncrease
        },
        ...nodeData.slice(this.state.dragIndex + 1)
      ]
    }));
  }

  drag(index, b) {
    let zIndexOrder = [...this.state.zIndexOrder].filter(value => {
      return value != index;
    });

    zIndexOrder.push(index);

    this.setState({
      dragIndex: b ? index : null,
      prevMouse: null,
      lastSelectedIndex: index,
      zIndexOrder: zIndexOrder
    });
  }

  render() {
    return (
      <div>
        {this.state.nodeData.map((node, index) => {
          return (
            <Node
              zIndexOrder={this.state.zIndexOrder.indexOf(index)}
              key={node.profile.username}
              profile={node.profile}
              size={node.size}
              x={node.x}
              y={node.y}
              showPrompt={node.isMobile}
              onDragStart={() => this.drag(node.index, true)}
              onDragEnd={() => this.drag(node.index, false)}
              changePrompt={v => this.changePrompt(node.index, v)}
              dag={this.props.dag}
              nodeIndex={index}
              changeFriendValue={this.props.changeFriendValue}
            />
          );
        })}

        {this.props.dag.edges.map((edge, index) => {
          if (edge.data.friendValue == 0)
            return <div key={`not-edge-${index}`} />;

          const from = this.state.nodeData[edge.from];
          const to = this.state.nodeData[edge.to];

          return (
            <Edge
              key={`edge-${index}`}
              from={from}
              to={to}
              value={edge.data.friendValue}
            />
          );
        })}
      </div>
    );
  }
}

export default ReactAnimationFrame(NodeController);
