import React from "react";

import Friendnet from "../components/Friendnet";
import NodeController from "../components/NodeController";
import Graph from "../utils/Graph";

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DAG: {
        eventStack: [],
        nodes: [
          {
            index: 0,
            path: false,
            edges: [],
            profile: {
              profilePic:
                "https://scontent-sea1-1.cdninstagram.com/vp/41c31d65a5a81381bee0e0592c5f9418/5D346270/t51.2885-19/s320x320/53302412_320767555292478_5835135885376487424_n.jpg?_nc_ht=scontent-sea1-1.cdninstagram.com",
              username: "max",
              posts: [
                {
                  name: "Distracted Boyfriend",
                  url: "https://i.imgflip.com/1ur9b0.jpg",
                  time: 1554681191100,
                  id: "5ecdf7c5-8669-4c19-bb16-469433eca0a1",
                  likes: [3]
                },
                {
                  name: "Expanding Brain",
                  url: "https://i.imgflip.com/1jwhww.jpg",
                  time: 1554681191200,
                  id: "5ecdf7c5-8669-4c19-bb16-469433eca0a2",
                  likes: []
                }
              ]
            },
            x: 0,
            y: 0
          },
          {
            index: 1,
            path: false,
            edges: [],
            profile: {
              profilePic:
                "https://scontent-sea1-1.cdninstagram.com/vp/078f382317cc4bafe9ce1cc5309f57f8/5D76469C/t51.2885-19/s150x150/56537541_2404567199563313_39164629951184896_n.jpg?_nc_ht=scontent-sea1-1.cdninstagram.com",
              username: "sarah",
              posts: []
            },
            x: 0,
            y: 0
          },
          {
            index: 2,
            path: false,
            edges: [8, 9, 10, 11],
            profile: {
              profilePic:
                "https://scontent-sea1-1.cdninstagram.com/vp/9d8825903a0aabefc53e3ffc9e5b0fce/5D513E35/t51.2885-15/e35/57799313_771892549861505_8569597860402664075_n.jpg?_nc_ht=scontent-sea1-1.cdninstagram.com",
              username: "david",
              posts: []
            },
            x: 0,
            y: 0
          },
          {
            index: 3,
            path: false,
            edges: [0, 1, 2, 3],
            profile: {
              profilePic:
                "https://scontent-sea1-1.cdninstagram.com/vp/6011973441e874cf2c36dd58410a37ea/5D587D23/t51.2885-15/e35/54247943_625143107928135_7086504596407239425_n.jpg?_nc_ht=scontent-sea1-1.cdninstagram.com",
              username: "mike",
              posts: []
            },
            x: 0,
            y: 0
          },
          {
            index: 4,
            path: false,
            edges: [12, 13],
            profile: {
              profilePic:
                "https://scontent-sea1-1.cdninstagram.com/vp/5e59f9c32956a0930a603bbe9195f341/5D2E433C/t51.2885-19/s320x320/38672355_724499924550616_3086833600256016384_n.jpg?_nc_ht=scontent-sea1-1.cdninstagram.com",
              username: "kate",
              posts: [
                {
                  name: "Two Buttons",
                  url: "https://i.imgflip.com/1g8my4.jpg",
                  time: 1554681191300,
                  id: "5ecdf7c5-8669-4c19-bb16-469433eca0a3",
                  likes: []
                },
                {
                  name: "Surprised Pikachu",
                  url: "https://i.imgflip.com/2kbn1e.jpg",
                  time: 1554681191400,
                  id: "5ecdf7c5-8669-4c19-bb16-469433eca0a4",
                  likes: []
                }
              ]
            },
            x: 1,
            y: 1
          },
          {
            index: 5,
            path: false,
            edges: [4, 5, 6, 7],
            profile: {
              profilePic:
                "https://scontent-sea1-1.cdninstagram.com/vp/9044eff31d07471196ceaf66e99a42a7/5D3D9D49/t51.2885-19/s320x320/22157939_343965102730159_8731648339306610688_n.jpg?_nc_ht=scontent-sea1-1.cdninstagram.com",
              username: "bowen",
              posts: [
                {
                  name: "Change My Mind",
                  url: "https://i.imgflip.com/24y43o.jpg",
                  time: 1554681191500,
                  id: "5ecdf7c5-8669-4c19-bb16-469433eca0a5",
                  likes: []
                },
                {
                  name: "Mocking Spongebob",
                  url: "https://i.imgflip.com/1otk96.jpg",
                  time: 1554681191600,
                  id: "5ecdf7c5-8669-4c19-bb16-469433eca0a6",
                  likes: []
                }
              ]
            },
            x: -1,
            y: 1
          }
        ],
        edges: [
          { from: 3, to: 0, data: { friendValue: 2, path: false } },
          { from: 3, to: 1, data: { friendValue: 8, path: false } },
          { from: 3, to: 2, data: { friendValue: 6, path: false } },
          { from: 3, to: 4, data: { friendValue: 4, path: false } },
          { from: 5, to: 2, data: { friendValue: 5, path: false } },
          { from: 5, to: 1, data: { friendValue: 5, path: false } },
          { from: 5, to: 0, data: { friendValue: 1, path: false } },
          { from: 5, to: 4, data: { friendValue: 1, path: false } },
          { from: 2, to: 3, data: { friendValue: 7, path: false } },
          { from: 2, to: 1, data: { friendValue: 1, path: false } },
          { from: 2, to: 5, data: { friendValue: 1, path: false } },
          { from: 2, to: 4, data: { friendValue: 6, path: false } },
          { from: 4, to: 1, data: { friendValue: 8, path: false } },
          { from: 4, to: 5, data: { friendValue: 10, path: false } }
        ]
      }
    };
  }

  changeFriendValue(from, to, value) {
    let DAG = { ...this.state.DAG };

    for (let i = 0; i < DAG.edges.length; i++) {
      if (DAG.edges[i].from == from && DAG.edges[i].to == to) {
        DAG.edges[i].data.friendValue = value;
        this.setState({ DAG });
        return;
      }
    }

    DAG.edges.push({
      from: from,
      to: to,
      data: {
        friendValue: value
      }
    });
    DAG.nodes[from].edges.push(DAG.edges.length - 1);
    this.setState({ DAG });
  }

  drawPath(from, to) {
    let graph = new Graph(this.state.DAG);
    const path = graph.findPathWithDijkstra(from, to);
    let DAG = { ...this.state.DAG };
    for (let i = 0; i < path.length - 1; i++) {
      for (let j = 0; j < DAG.edges.length; j++) {
        let edge = DAG.edges[j];
        if (edge.from == path[i] && edge.to == path[i + 1]) {
          DAG.edges[j].data.path = true;
          DAG.nodes[edge.from].path = true;
          DAG.nodes[edge.to].path = true;
        }
      }
    }
    this.setState({ DAG });
  }

  removePath() {
    let DAG = { ...this.state.DAG };

    for (let i = 0; i < DAG.nodes.length; i++) {
      DAG.nodes[i].path = false;
    }

    for (let j = 0; j < DAG.edges.length; j++) {
      DAG.edges[j].data.path = false;
    }
    this.setState({ DAG });
  }

  like(from, to, post) {
    let DAG = { ...this.state.DAG };

    for (let i = 0; i < DAG.nodes[to].profile.posts.length; i++) {
      if (DAG.nodes[to].profile.posts[i].id == post) {
        if (DAG.nodes[to].profile.posts[i].likes.includes(from)) {
          DAG.nodes[to].profile.posts[i].likes = DAG.nodes[to].profile.posts[
            i
          ].likes.filter(e => {
            return e !== from;
          });

          DAG.eventStack = DAG.eventStack.filter(e => {
            return e.from !== from || e.to !== to || e.id !== post;
          });
        } else {
          DAG.nodes[to].profile.posts[i].likes.push(from);
          DAG.eventStack.push({ type: "like", from: from, to: to, id: post });
        }
        break;
      }
    }

    this.setState({ DAG });
  }

  render() {
    return (
      <Friendnet>
        <NodeController
          dag={this.state.DAG}
          changeFriendValue={(f, t, v) => this.changeFriendValue(f, t, v)}
          drawPath={(f, t) => this.drawPath(f, t)}
          like={(f, t, p) => this.like(f, t, p)}
          removePath={() => this.removePath()}
        />
      </Friendnet>
    );
  }
}
