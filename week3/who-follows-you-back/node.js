'use strict';
// TODO: add node factory

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

module.exports = Node;
