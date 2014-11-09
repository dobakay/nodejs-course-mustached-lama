'use strict';

function NodeException (message) {
    this.message = message;
    this.type = 'NodeException';
}

function Node (name, neighbours) {
    this._name = name || '';
    this._neighbours = neighbours || [];
}

Node.prototype.getName = function () {
    return this._name;
}

Node.prototype.getNeighbours = function () {
    return this._neighbours;
}

Node.prototype.setName = function (newName) {
    if(typeof newName !== 'string') {
        throw new NodeException('NewName parameter is not a string.');
    }
    this._name = newName;
}

Node.prototype.addNeighbour = function (neighbourName) {
    if(typeof neighbourName !== 'string') {
        throw new NodeException('NeighbourName parameter is not a string.');
    }
    this._neighbours.push(neighbourName);
}

Node.prototype.removeNeighbour = function (neighbourName) {
    if(typeof neighbourName !== 'string') {
        throw new NodeException('NeighbourName parameter is not a string.');
    }
    var neighbourIndex = this._neighbours.indexOf(neighbourName);
    if(neighbourIndex === -1) {
        throw new NodeException('Neighbour name does not exists.');
    }
    this._neighbours.splice(neighbourIndex, 1);
}

// Attaching static factory method
Node.createNodes = function (rawNodesArray) {
    var result = [];
    for (var i = 0; i < rawNodesArray.length; i++) {
        if(!!rawNodesArray[i].name && !!rawNodesArray[i].neighbours) {
            result.push(new Node(rawNodesArray[i].name, rawNodesArray[i].neighbours));
        }
    }
    return result;
}

module.exports = Node;
