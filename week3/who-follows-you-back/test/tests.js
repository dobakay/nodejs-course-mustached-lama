'user strict';

var expect = require('chai').expect;
var DirectedGraph = require('../graph');
var Node = require('../node');

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
            expect(graph instanceof DirectedGraph).to.equal(true);
        });
    });


    describe('addNode()', function () {
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

    describe('getNode()', function () {
        it('should return a node', function () {
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


    describe('addEdge()', function () {
        it('should add an edge between two nodes', function () {
            var graph = new DirectedGraph();

        });
    });


    describe('getNeighborsFor()', function () {

    });


    describe('pathBetween()', function () {

    });


    describe('toString()', function () {

    })
});
