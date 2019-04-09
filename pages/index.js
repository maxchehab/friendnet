import React from "react";

import Friendnet from "../components/Friendnet";
import NodeController from "../components/NodeController";

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DAG: {
        nodes: [
          {
            index: 0,
            edges: [0, 1],
            profile: {
              profilePic:
                "https://scontent-sea1-1.cdninstagram.com/vp/41c31d65a5a81381bee0e0592c5f9418/5D346270/t51.2885-19/s320x320/53302412_320767555292478_5835135885376487424_n.jpg?_nc_ht=scontent-sea1-1.cdninstagram.com",
              username: "max",
              posts: [
                {
                  name: "Distracted Boyfriend",
                  url: "https://i.imgflip.com/1ur9b0.jpg",
                  time: 1554681191100,
                  id: "5ecdf7c5-8669-4c19-bb16-469433eca0a1"
                },
                {
                  name: "Expanding Brain",
                  url: "https://i.imgflip.com/1jwhww.jpg",
                  time: 1554681191200,
                  id: "5ecdf7c5-8669-4c19-bb16-469433eca0a2"
                }
              ]
            },
            x: 0,
            y: 0
          },
          {
            index: 1,
            edges: [2],
            profile: {
              profilePic:
                "https://scontent-sea1-1.cdninstagram.com/vp/5e59f9c32956a0930a603bbe9195f341/5D2E433C/t51.2885-19/s320x320/38672355_724499924550616_3086833600256016384_n.jpg?_nc_ht=scontent-sea1-1.cdninstagram.com",
              username: "kate",
              posts: [
                {
                  name: "Two Buttons",
                  url: "https://i.imgflip.com/1g8my4.jpg",
                  time: 1554681191300,
                  id: "5ecdf7c5-8669-4c19-bb16-469433eca0a3"
                },
                {
                  name: "Surprised Pikachu",
                  url: "https://i.imgflip.com/2kbn1e.jpg",
                  time: 1554681191400,
                  id: "5ecdf7c5-8669-4c19-bb16-469433eca0a4"
                }
              ]
            },
            x: 1,
            y: 1
          },
          {
            index: 2,
            edges: [],
            profile: {
              profilePic:
                "https://scontent-sea1-1.cdninstagram.com/vp/9044eff31d07471196ceaf66e99a42a7/5D3D9D49/t51.2885-19/s320x320/22157939_343965102730159_8731648339306610688_n.jpg?_nc_ht=scontent-sea1-1.cdninstagram.com",
              username: "bowen",
              posts: [
                {
                  name: "Change My Mind",
                  url: "https://i.imgflip.com/24y43o.jpg",
                  time: 1554681191500,
                  id: "5ecdf7c5-8669-4c19-bb16-469433eca0a5"
                },
                {
                  name: "Mocking Spongebob",
                  url: "https://i.imgflip.com/1otk96.jpg",
                  time: 1554681191600,
                  id: "5ecdf7c5-8669-4c19-bb16-469433eca0a6"
                }
              ]
            },
            x: -1,
            y: 1
          }
        ],
        edges: [
          {
            from: 0,
            to: 1,
            data: {
              friendValue: 10
            }
          },
          {
            from: 0,
            to: 2,
            data: {
              friendValue: 5
            }
          },
          {
            from: 1,
            to: 0,
            data: {
              friendValue: 3
            }
          }
        ]
      }
    };
  }

  // TODO rewrite in WASM GOLANG
  changeFriendValue(from, to, value, where) {
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

  test() {
    console.log("adding");
    let DAG = { ...this.state.DAG };
    DAG.nodes.push({
      index: 0,
      edges: [0, 1],
      profile: {
        profilePic:
          "https://scontent-sea1-1.cdninstagram.com/vp/41c31d65a5a81381bee0e0592c5f9418/5D346270/t51.2885-19/s320x320/53302412_320767555292478_5835135885376487424_n.jpg?_nc_ht=scontent-sea1-1.cdninstagram.com",
        username: "xam",
        posts: [
          {
            name: "Distracted Boyfriend",
            url: "https://i.imgflip.com/1ur9b0.jpg",
            time: 1554681191100,
            id: "5ecdf7c5-8669-4c19-bb16-469433eca0a1"
          },
          {
            name: "Expanding Brain",
            url: "https://i.imgflip.com/1jwhww.jpg",
            time: 1554681191200,
            id: "5ecdf7c5-8669-4c19-bb16-469433eca0a2"
          }
        ]
      },
      x: 0,
      y: 0
    });
    this.setState({ DAG });
  }

  render() {
    return (
      <Friendnet>
        <NodeController
          dag={this.state.DAG}
          changeFriendValue={(f, t, v, w) => this.changeFriendValue(f, t, v, w)}
        />
      </Friendnet>
    );
  }
}
