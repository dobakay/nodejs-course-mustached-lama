// TODO: add nodeClass eventually
var Node = require('./node');
'use strict';

function DirectedGraphException (message) {
    this.message = message || '';
    this.type = 'DirectedGraphException';
}

function DirectedGraph (nodeList) {
    this._nodes = {};

    if(!!nodeList) {
        for (var i = 0; i < nodeList.length; i++) {
            if(nodeList[i] instanceof Node) {
                this._nodes[nodeList[i].getName()] = nodeList[i];
            }
            else {
                throw new DirectedGraphException('Object in nodeList is not a Node instance.');
            }
        }
    }
}


DirectedGraph.prototype.addNode = function(node) {
    if(!(node instanceof Node)) {
        throw new DirectedGraphException('Parameter is not a Node instance.');
    }
    this._nodes[node.getName()] = node;
};

DirectedGraph.prototype.getNode = function(nodeName) {
    return this._nodes[nodeName];
};

DirectedGraph.prototype.addEdge = function(node1Name, node2Name) {
    var newNode = null;
    if(!this._nodes[node1Name]) {
        newNode = new Node(node1Name,[]);
        this.addNode(newNode);
    }
    if(!this._nodes[node2Name]) {
        newNode = new Node(node2Name,[]);
        this.addNode(newNode);
    }

    if(this._nodes[node1Name].getNeighbours().indexOf(node2Name) === -1) {
        this._nodes[node1Name].addNeighbour(node2Name);
    }

};

DirectedGraph.prototype.getNeighboursFor = function(nodeName) {
    if(!this._nodes[nodeName]) {
        throw new DirectedGraphException('There is no node with name "' + nodeName + '".');
    }

    return this._nodes[nodeName].getNeighbours();
};

module.exports = DirectedGraph;


/*The Graph should be:

Directed
Unweighted
Node names should be strings
Don't bother making it more abstract to handle more cases.

There should be the following public methods for the Graph:

A method, called addEdge(nodeA, nodeB) - which adds an edge between two nodes.
If the nodes does not exist, they should be created.


A method, called getNeighborsFor(node) which returns a list of nodes (strings) for the given node


A method, called pathBetween(nodeA, nodeB), which returns true if there is a path between nodeA and nodeB.
Keep in kind that the graph is directed!


A method, called toString() which returns a string representation of the grap.
This can be the stringified version of the internal structure of the graph. Don't draw circles and -->*/
