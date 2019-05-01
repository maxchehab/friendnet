import React from "react";
import Search from "./Search";
import Post from "./Post";

export default class MobileApp extends React.Component {
  render() {
    let feed = this.props.dag.nodes[this.props.nodeIndex].profile.posts.map(
      post => {
        return {
          name: post.name,
          url: post.url,
          time: post.time,
          id: post.id,
          user: this.props.nodeIndex
        };
      }
    );

    this.props.dag.nodes[this.props.nodeIndex].edges.map(edgeIndex => {
      const edge = this.props.dag.edges[edgeIndex];
      const friend = this.props.dag.nodes[edge.to];
      if (edge.data.friendValue == 0) return;
      for (let post of friend.profile.posts) {
        feed.push({
          name: post.name,
          url: post.url,
          time: post.time,
          id: post.id,
          user: edge.to
        });
      }
    });

    feed = feed.sort((a, b) => a.time > b.time);

    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          backgroundColor: "white",
          flexDirection: "column",
          marginBottom: "15px"
        }}
      >
        <Search
          dag={this.props.dag}
          currentNodeIndex={this.props.currentNodeIndex}
          changeFriendValue={this.props.changeFriendValue}
          drawPath={this.props.drawPath}
          removePath={this.props.removePath}
          nodes={this.props.dag.nodes}
          currentNodeIndex={this.props.nodeIndex}
        />
        <div
          style={{
            borderTop: "2px solid #ef4f6c",
            height: "100%",
            overflowY: "scroll",
            display: "flex",
            flexDirection: "column",
            padding: "15px"
          }}
        >
          {feed.map(post => (
            <Post
              drawPath={this.props.drawPath}
              key={`post-${post.id}`}
              data={post}
              node={this.props.dag.nodes[post.user]}
              drawPath={this.props.drawPath}
              removePath={this.props.removePath}
              currentNodeIndex={this.props.nodeIndex}
              changeFriendValue={this.props.changeFriendValue}
              dag={this.props.dag}
            />
          ))}
        </div>
      </div>
    );
  }
}
