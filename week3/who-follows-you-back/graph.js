// TODO: add nodeClass eventually
var Node = require('./node');
'use strict';

function DirectedGraphException (message) {
    this.message = message || '';
    this.type = 'DirectedGraphException';
}

function DirectedGraph () {
    this._nodes = {};
    this._edges = {};
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

DirectedGraph.prototype.addEdge = function(node1, node2) {

};

DirectedGraph.prototype.getEdge = function() {
    // body..
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
