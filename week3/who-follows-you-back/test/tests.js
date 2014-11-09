'user strict';

var expect = require('chai').expect;
var DirectedGraph = require('../graph');
var Node = require('../node');

///////////////////////////
// DirectedGraph Mockup  //
///////////////////////////

function generateDirectedGraphWithNodes () {
    var rawNodes = [{
            name: 'test1',
            neighbours: ['test2', 'test3']
        }, {
            name: 'test2',
            neighbours: ['test1']
        }, {
            name: 'test3',
            neighbours: []
        }];

    var nodeList = Node.createNodes(rawNodes);
    return new DirectedGraph(nodeList);
}

///////////
// Tests //
///////////

describe('dummy test', function () {
    it('should should return true', function () {
        var fortytwo = 42;
        expect(fortytwo).to.equal(42);
    });
});

describe('DirectedGraph', function () {

    describe('new DirectedGraph()', function () {
        it('should create a new graph object', function () {
            var graph = new DirectedGraph();
            expect(graph instanceof DirectedGraph).to.be.true;
        });

        it('should create a new graph object with nodes when given a list of nodes', function () {
            var graph = generateDirectedGraphWithNodes();
        });
    });


    describe('addNode(node)', function () {
        it('should add a node to graph', function () {
            var graph = new DirectedGraph();

            var nodeName = 'test';
            var nodeEmptyNeighbours = [];
            var newNode = new Node(nodeName, nodeEmptyNeighbours);

            graph.addNode(newNode);
            var node = graph.getNode(nodeName);

            // expect(node).to.have.property('getName');
            // expect(node).to.have.property('neighbours');
            expect(node.getName()).to.equal(nodeName);
            expect(node.getNeighbours()).to.deep.equal(nodeEmptyNeighbours);
        });
    });

    describe('getNode(nodeName)', function () {
        it('should return a node (node is already present when the graph is created)', function () {
            var graph = generateDirectedGraphWithNodes();

            var node1 = graph.getNode('test1');

            expect(node1 instanceof Node).to.be.true;
            expect(node1.getName()).to.equal('test1');
            expect(node1.getNeighbours()).to.deep.equal(['test2', 'test3']);
        });

        it('should return a node (after adding the node to the graph with addNode function)', function () {
            var graph = new DirectedGraph();

            var nodeName = 'test';
            var nodeEmptyNeighbours = [];
            var newNode = new Node(nodeName, nodeEmptyNeighbours);

            graph.addNode(newNode);
            var node = graph.getNode(nodeName);

            // expect(node).to.have.property('getName');
            // expect(node).to.have.property('neighbours');
            expect(node.getName()).to.equal(nodeName);
            expect(node.getNeighbours()).to.deep.equal(nodeEmptyNeighbours);
        });
    });


    describe('addEdge(node1Nmae, node2Name)', function () {
        it('should add an edge between two nodes that are contained in the graph', function () {
            var graph = generateDirectedGraphWithNodes();

            graph.addEdge('test3', 'test1');

            var node3 = graph.getNode('test3');

            expect(node3.getNeighbours()).to.deep.equal(['test1']);
        });

        it('should create nodes if nodes are not present in the graph', function () {
            var graph = generateDirectedGraphWithNodes();

            graph.addEdge('test4', 'test1');

            var node4 = graph.getNode('test4');

            expect(node4.getNeighbours()).to.deep.equal(['test1']);
        });

        it('should not add another edge if there is an edge already', function () {
            var graph = generateDirectedGraphWithNodes();
            var node1 = graph.getNode('test1');
            expect(node1.getNeighbours()).to.deep.equal(['test2', 'test3']);

            graph.addEdge('test1','test3');

            expect(node1.getNeighbours()).to.deep.equal(['test2', 'test3']);
        });
    });


    describe('getNeighboursFor(nodeName)', function () {
        it('should return a list of the neighbourNames of a node', function () {
            var graph = generateDirectedGraphWithNodes();

            var neighbourList = graph.getNeighboursFor('test1');

            expect(neighbourList).to.deep.equal(['test2', 'test3']);
        });

        it('should throw an error if the nodeName is not present in the graph', function () {
            var graph = generateDirectedGraphWithNodes();
            var nodeName = "test10"
            expect(graph.getNeighboursFor.bind(graph, nodeName)).to.throw('There is no node with name "' + nodeName + '".');
        });
    });


    describe('pathBetween(nodeA, nodeB)', function () {
        it('should return true if there is a path between the two nodes');

        it('should return false if there is not a path between the two nodes');

        it('should return false if one of the nodes does not exist in the graph');
    });


    describe('toString()', function () {
        it('should print out nodes names and a list of their neighbouring Nodes names');
    })
});
