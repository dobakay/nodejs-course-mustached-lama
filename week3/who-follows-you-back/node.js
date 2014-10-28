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
    this._name = newName;
}

Node.prototype.addNeighbour = function (neighbourName) {
    this._neighbours.push(neighbourName);
}

Node.prototype.removeNeighbour = function (neighbourName) {
    var neighbourIndex = this._neighbours.indexOf(neighbourName);
    if(neighbourIndex === -1) {
        // Throw exception
    }
    this._neighbours.splice(neighbourIndex, 0);
}

module.exports = Node;
