Vector = require('./vector');
function Triangle (ctxHandle, pointA, pointB, pointC, colorHex) {
    this.ctx = ctxHandle;
    this.a = pointA;
    this.b = pointB;
    this.c = pointC;
    this.color = colorHex;
}

Triangle.prototype.draw = function() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.a.x,this.a.y);
    this.ctx.lineTo(this.b.x,this.b.y);
    this.ctx.lineTo(this.c.x,this.c.y);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
};

module.exports = Triangle;
