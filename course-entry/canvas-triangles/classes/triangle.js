Vector = require('./vector');
function Triangle (ctxHandle, pointA, pointB, pointC, colorHex) {
    this.ctx = ctxHandle;
    this.a = pointA;
    this.b = pointB;
    this.c = pointC;
    this.triangleColor = colorHex;
}

Triangle.prototype.draw = function() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.a.x,this.a.y);
    this.ctx.lineTo(this.b.x,this.b.y);
    this.ctx.lineTo(this.c.x,this.c.y);
    this.ctx.fillStyle = this.triangleColor;
    this.ctx.fill();
};

Triangle.prototype.toRaw = function() {
    return {
        a: this.a,
        b: this.b,
        c: this.c,
        triangleColor: this.triangleColor
    }
};

module.exports = Triangle;
