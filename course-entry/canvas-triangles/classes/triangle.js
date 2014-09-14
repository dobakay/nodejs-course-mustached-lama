Vector = require('./vector');
function Triangle (ctxHandle, pointA, pointB, pointC, colorHex) {
    this.ctx = ctxHandle;
    this.a = pointA;
    this.b = pointB;
    this.c = pointC;
    this.color = colorHex;
}

Triangle.prototype.draw = function() {
    ctx.beginPath();
    ctx.moveTo(a.x,a.y);
    ctx.lineTo(b.x,b.y);
    ctx.lineTo(c.x,c.y);
    ctx.fillStyle(this.color);
    ctx.fill();
};

module.exports = Triangle;
