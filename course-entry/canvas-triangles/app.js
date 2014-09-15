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
            currentTriangle = new Triangle(ctx, trianglesArrayRaw[i].a,
                                            trianglesArrayRaw[i].b, trianglesArrayRaw[i].c,
                                            trianglesArrayRaw[i].triangleColor );
            canvasTriangles.push(currentTriangle);
        };
    }

    function exportTriangleObjectsToRaw () {
        var rawExport = [];
        for (var i = 0; i < canvasTriangles.length; i++) {
            rawExport.push(canvasTriangles[i].toRaw());
        };
        return rawExport;
    }

    // TODO: rewrite this to use the history array stored in localStorage
    function loadLastEditedCanvas () {
        var history = loadCanvasHistoryFromLocalStorage(),
            lastEditedCanvas = {};

        if(history !== null) {
            lastEditedCanvas = history[history.length-1];
            buildTriangleObjectsFromRaw(lastEditedCanvas.triangles);
            drawCanvasTriangles();
        }
    }

    function drawCanvasTriangles () {
        for (var i = 0; i < canvasTriangles.length; i++) {
            canvasTriangles[i].draw();
        };
    }

    function clearCanvas(){
        //clearing progress (visual and objects)
        canvasTriangles = [];
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function loadCanvasHistoryFromLocalStorage () {
        var history = localStorage.getItem('history');
        history = JSON.parse(history);
        return history;
    }

    function saveCanvas(canvasName) {
        savedCanvasHistory = loadCanvasHistoryFromLocalStorage();
        if(savedCanvasHistory === null) {
            savedCanvasHistory = [];
        }
        savedCanvasHistory.push({
            triangles: exportTriangleObjectsToRaw(),
            timeStamp: new Date(Date.now()),
            name: canvasName
        });
        localStorage.setItem('history',JSON.stringify(savedCanvasHistory));
    }

    function canvasInit () {
        canvas = document.getElementById('triangles-canvas');
        ctx = canvas.getContext('2d');
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
                                                    colorInput.value.toString());
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

        doc.getElementById('save-canvas')
            .addEventListener('click', function (e) {
                var canvasName = doc.getElementById('canvas-name'),
                    name = canvasName.value;
                if(name === '') {
                    alert('Please enter a name for the canvas you want to save.');
                }
                else {
                    saveCanvas(name);
                    canvasName.value = '';
                }
            });
    }

    appModule.init = function () {
        canvasInit();
        loadLastEditedCanvas();
        //attach click handlers
        attachCanvasClickEventListener();
        attachUIEventListeners();
    }

    return appModule;

}());


app.init();
