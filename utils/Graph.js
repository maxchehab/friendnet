export default class Graph {
  constructor(DAG) {
    this.nodes = [];
    this.adjacencyList = {};

    for (let i = 0; i < DAG.nodes.length; i++) {
      this.addNode(DAG.nodes[i].index);
    }

    for (let j = 0; j < DAG.edges.length; j++) {
      let edge = DAG.edges[j];
      if (edge.data.friendValue > 0) {
        this.addEdge(edge.from, edge.to, 10 - edge.data.friendValue);
      }
    }
  }

  addNode(node) {
    this.nodes.push(node);
    this.adjacencyList[node] = [];
  }

  addEdge(from, to, weight) {
    this.adjacencyList[from].push({ node: to, weight: weight });
  }

  findPathWithDijkstra(startNode, endNode) {
    let times = {};
    let backtrace = {};
    let pq = new PriorityQueue();

    times[startNode] = 0;

    this.nodes.forEach(node => {
      if (node !== startNode) {
        times[node] = Infinity;
      }
    });

    pq.enqueue([startNode, 0]);

    while (!pq.isEmpty()) {
      let shortestStep = pq.dequeue();
      let currentNode = shortestStep[0];

      this.adjacencyList[currentNode].forEach(neighbor => {
        let time = times[currentNode] + neighbor.weight;
        if (time < times[neighbor.node]) {
          times[neighbor.node] = time;
          backtrace[neighbor.node] = currentNode;
          pq.enqueue([neighbor.node, time]);
        }
      });
    }

    let path = [endNode];
    let lastStep = endNode;

    if (Object.keys(backtrace) == 0) {
      return [startNode];
    }

    while (lastStep !== startNode) {
      path.unshift(backtrace[lastStep]);
      lastStep = backtrace[lastStep];
    }

    return path;
  }
}

class PriorityQueue {
  constructor() {
    this.collection = [];
  }

  enqueue(element) {
    if (this.isEmpty()) {
      this.collection.push(element);
    } else {
      let added = false;
      for (let i = 1; i <= this.collection.length; i++) {
        if (element[1] < this.collection[i - 1][1]) {
          this.collection.splice(i - 1, 0, element);
          added = true;
          break;
        }
      }
      if (!added) {
        this.collection.push(element);
      }
    }
  }

  dequeue() {
    let value = this.collection.shift();
    return value;
  }

  isEmpty() {
    return this.collection.length === 0;
  }
}
