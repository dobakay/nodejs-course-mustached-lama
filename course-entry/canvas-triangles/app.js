Triangle = require('./classes/triangle');
// saving all drawn triangles
// user with three clicks should make a coloured triangle
// use input='color' for the triangle fillings

var app = (function() {
    'use strict';

    var appModule = {},
        canvasTriangles = [],
        canvas = null,
        ctx = null,
        savedCanvasHistory = null;

    function buildTriangleObjectsFromRaw (trianglesArrayRaw) {
        var currentTriangle = null;
        for (var i = 0; i < trianglesArrayRaw.length; i++) {
            currentTriangle = new Triangle(ctx, trianglesArrayRaw[i].pointA,
                                            trianglesArrayRaw[i].pointB, trianglesArrayRaw[i].pointC,
                                            trianglesArrayRaw[i].color );
            canvasTriangles.push(currentTriangle);
        };
    }

    function loadTrianglesFromLocalStorage () {
        var trianglesRaw = localStorage.getItem('triangles');
        trianglesRaw = JSON.parse(trianglesRaw);

        //building actual Triangle Objects from raw localStorage data
        if(trianglesRaw !== null){
            buildTriangleObjectsFromRaw(trianglesRaw);
        }
    }

    function drawCanvasTriangles () {
        for (var i = 0; i < canvasTriangles.length; i++) {
            canvasTriangles[i].draw();
        };
    }

    function clear(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    function canvasInit () {
        canvas = document.getElementById('triangles-canvas');
        ctx = canvas.getContext('2d');
    }


    appModule.init = function () {
        canvasInit();
        loadTrianglesFromLocalStorage();
        drawCanvasTriangles();
        //attach click handlers
    }

    return appModule;

}());
