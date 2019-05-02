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
          likes: post.likes,
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
          likes: post.likes,
          user: edge.to
        });
      }
    });

    feed = feed.sort((a, b) => a.time > b.time);
    let suggestion = <div />;
    let edges = this.props.dag.nodes[this.props.nodeIndex].edges.map(
      edgeIndex => this.props.dag.edges[edgeIndex]
    );

    eventStackLoop: for (
      let i = this.props.dag.eventStack.length - 1;
      i >= 0;
      i--
    ) {
      let event = this.props.dag.eventStack[i];
      if (event.type != "like") continue;
      for (let edge of edges) {
        if (edge.to == event.from && edge.data.friendValue > 7) {
          let post = null;
          for (let p of this.props.dag.nodes[event.to].profile.posts) {
            if (p.id == event.id) {
              post = p;
              break;
            }
          }

          if (post == null) break;

          post = {
            name: post.name,
            url: post.url,
            time: post.time,
            id: post.id,
            likes: post.likes,
            user: event.to
          };

          console.log(`found post: ${post.name}`);

          suggestion = (
            <Post
              recommendation={true}
              friend={this.props.dag.nodes[event.from].profile.username}
              like={this.props.like}
              drawPath={this.props.drawPath}
              data={post}
              node={this.props.dag.nodes[post.user]}
              drawPath={this.props.drawPath}
              removePath={this.props.removePath}
              currentNodeIndex={this.props.nodeIndex}
              changeFriendValue={this.props.changeFriendValue}
              dag={this.props.dag}
            />
          );
          break eventStackLoop;
        }
      }
    }

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
          {suggestion}
          {feed.map(post => (
            <Post
              like={this.props.like}
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
