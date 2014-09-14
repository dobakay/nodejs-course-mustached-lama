Triangle = require('./classes/triangle');

var app = (function() {
    'use strict';

    var appModule = {},
        canvasTriangles = [],
        canvas = null,
        ctx = null,
        savedCanvasHistory = null,
        lastRecordedCanvasPoints = [];

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

    function clearCanvas(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function canvasInit () {
        canvas = document.getElementById('triangles-canvas');
        ctx = canvas.getContext('2d');
        console.log(ctx);
    }

    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    function attachCanvasClickEventListener () {
        canvas.addEventListener('click', function ( e ) {
            var mouseCoords = getMousePos(canvas, e),
                newClickedPoint = new Vector(mouseCoords.x, mouseCoords.y);
            if(lastRecordedCanvasPoints.length === 3) {
                //clearing the previous click inputs
                lastRecordedCanvasPoints = [];
            }
            lastRecordedCanvasPoints.push(newClickedPoint);
            if(lastRecordedCanvasPoints.length === 3) {
                var colorInput = document.getElementById('color-picker'),
                    newCanvasTriangle = new Triangle(ctx, lastRecordedCanvasPoints[0],
                                                    lastRecordedCanvasPoints[1], lastRecordedCanvasPoints[2],
                                                    colorInput.value);
                canvasTriangles.push(newCanvasTriangle);
                newCanvasTriangle.draw();
            }
        }, false);
    }

    function attachUIEventListeners () {
        var doc = document;
        doc.getElementById('clear-canvas')
            .addEventListener('click', function (e) {
                clearCanvas();
            });
    }

    appModule.init = function () {
        canvasInit();
        loadTrianglesFromLocalStorage();
        drawCanvasTriangles();
        //attach click handlers
        attachCanvasClickEventListener();
        attachUIEventListeners();
    }

    return appModule;

}());


app.init();
