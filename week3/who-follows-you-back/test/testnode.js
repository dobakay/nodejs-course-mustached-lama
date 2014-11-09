'use strict';

var expect = require('chai').expect;
var Node = require('../node');

describe('dummy test', function () {
    it('should should return true', function () {
        var fortytwo = 42;
        expect(fortytwo).to.equal(42);
    });
});

describe('Node', function () {

    describe('new Node(name, neighbours)', function () {
        it('should create a new node object', function () {
            var node = new Node();
            expect(node instanceof Node).to.be.true;
        });

        it('should contain emty fields if no parameters are given to constructor', function () {
            var node = new Node();
            expect(node.getName()).to.equal('');
            expect(node.getNeighbours()).to.deep.equal([]);
        });

        it('should set fields when correct parameters are given', function () {
            var sampleName = 'test';
            var sampleNeighbours = ['test1', 'test2']
            var node = new Node(sampleName, sampleNeighbours);
            expect(node.getName()).to.equal(sampleName);
            expect(node.getNeighbours()).to.deep.equal(sampleNeighbours);
        });

    });

    describe('getName()', function () {
        it('should return the node name', function () {
            var sampleName = 'test';
            var node = new Node(sampleName, []);
            expect(node.getName()).to.equal(sampleName);
        });

        it('should return empty string if no paramters were passed to the node', function () {
            var node = new Node();
            expect(node.getName()).to.equal('');
        });

    });

    describe('setName(name)', function () {

        it('should set a new name for the node', function () {
            var node = new Node();
            expect(node.getName()).to.equal('');
            node.setName('test');
            expect(node.getName()).to.equal('test');
        });

        it('should throw exception if parameter is not a string', function () {
            var node = new Node();
            expect(node.setName.bind(node,[])).to.throw('NewName parameter is not a string.');
        });

    });

    describe('addNeighbour(neighbourName)', function () {

        it('should add a new neighbour name to current neighbours', function () {
            var sampleName = 'test';
            var sampleNeighbours = [];
            var newSampleNeighbours = ['test1'];
            var node = new Node(sampleName, sampleNeighbours);
            node.addNeighbour('test1');
            expect(node.getNeighbours()).to.deep.equal(newSampleNeighbours);
        });

        it('should throw exception if parameter is not a string', function () {
            var sampleName = 'test';
            var sampleNeighbours = [];
            var node = new Node(sampleName, sampleNeighbours);
            expect(node.addNeighbour.bind(node,{})).to.throw('NeighbourName parameter is not a string.');
        });

    });

    describe('removeNeighbour(neighbourName)', function () {

        it('should remove a neighbourName from neighbours list', function () {
            var sampleName = 'test';
            var sampleNeighbours = ['test1', 'test2'];
            var newSampleNeighbours = ['test2'];
            var node = new Node(sampleName, sampleNeighbours);
            node.removeNeighbour('test1');
            expect(node.getNeighbours()).to.deep.equal(newSampleNeighbours);
        });

        it('should throw an exception if parameter is not a string', function () {
            var sampleName = 'test';
            var sampleNeighbours = ['test1', 'test2'];
            var node = new Node(sampleName, sampleNeighbours);
            expect(node.removeNeighbour.bind(node,{})).to.throw('NeighbourName parameter is not a string.');
        });

        it('should throw an exception if there is no neighbour with that name', function () {
            var sampleName = 'test';
            var sampleNeighbours = ['test1', 'test2'];
            var node = new Node(sampleName, sampleNeighbours);
            expect(node.removeNeighbour.bind(node,'test3')).to.throw('Neighbour name does not exists.');
        });
    });

    describe('createNodes(rawNodeObjects)', function () {
        it('should create an array of Node objects by given rawNodes', function () {
            var rawNodes = [{
                name: 'test1',
                neighbours: ['test2', 'test3']
            }, {
                name: 'test2',
                neighbours: ['test1']
            }];
            var resultNodes = Node.createNodes(rawNodes);
            for (var i = 0; i < resultNodes.length; i++) {
                expect(resultNodes[i] instanceof Node).to.be.true;
            };
        });
    });
});
