/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/subjs/subj-skdlq-eulerline/subj-skdlq-eulerline.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/subjs/subj-skdlq-eulerline/demo-eulerline.js":
/*!**********************************************************!*\
  !*** ./src/subjs/subj-skdlq-eulerline/demo-eulerline.js ***!
  \**********************************************************/
/*! exports provided: showDemoEulerLine */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showDemoEulerLine", function() { return showDemoEulerLine; });
function showDemoEulerLine() {
    const canvas = document.getElementById("view-triangle");
    const ctx = canvas.getContext("2d");
    const A = { x: 250, y: 50 };
    const B = { x: 200, y: 300 };
    const C = { x: 500, y: 300 };
    let selectedVertex = null;

    const VERTEX_RADIUS = 5;
    const CENTER_RADIUS = 3;
    const CIRCUMCENTER_COLOR = "#0072BD";
    const CENTROID_COLOR = "#D95319";
    const ORTHOCENTER_COLOR = "#EDB120";

    canvas.onmousedown = (evt) => {
        const mousePos = getMousePos(canvas, evt);
        if (testVertex(mousePos, A)) {
            selectedVertex = A;
        } else if (testVertex(mousePos, B)) {
            selectedVertex = B;
        } else if (testVertex(mousePos, C)) {
            selectedVertex = C
        } else {
            selectedVertex = null;
        }
    }

    canvas.onmouseup = () => {
        selectedVertex = null;
    }

    canvas.onmousemove = (evt) => {
        const mousePos = getMousePos(canvas, evt);
        if (selectedVertex) {
            selectedVertex.x = mousePos.x;
            selectedVertex.y = mousePos.y;
        }
        render();
    };

    render();

    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.lineWidth = 0.5;

        renderTriangleSide(A, B);
        renderTriangleSide(A, C);
        renderTriangleSide(B, C);

        renderEulerLine();

        renderCircumcenter();
        renderCentroid();
        renderOrthocenter();

        renderTriangleVertex(A);
        renderTriangleVertex(B);
        renderTriangleVertex(C);

        renderLegend();
    }

    function renderTriangleSide(p, q) {
        ctx.strokeStyle = "#666";
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
    }

    function renderEulerLine() {
        ctx.strokeStyle = "#000";
        const orthocenter = calcOrthocenter();
        const circumcenter = calcCircumcenter();
        ctx.moveTo(orthocenter.x, orthocenter.y);
        ctx.lineTo(circumcenter.x, circumcenter.y);
        ctx.stroke();
    }

    function renderTriangleVertex(p) {
        ctx.fillStyle = "#000";
        ctx.beginPath();
        ctx.arc(p.x, p.y, VERTEX_RADIUS, 0, 2 * Math.PI);
        ctx.fill();
    }

    function renderLegend() {
        const startX = canvas.clientWidth - 100;
        const startY = 30;
        const STEP = 30;

        // Dots
        //
        ctx.fillStyle = CIRCUMCENTER_COLOR;
        ctx.beginPath();
        ctx.arc(startX, startY, CENTER_RADIUS, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = CENTROID_COLOR;
        ctx.beginPath();
        ctx.arc(startX, startY + STEP, CENTER_RADIUS, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = ORTHOCENTER_COLOR;
        ctx.beginPath();
        ctx.arc(startX, startY + 2 * STEP, CENTER_RADIUS, 0, 2 * Math.PI);
        ctx.fill();

        // Texts
        //
        ctx.font = "16px Helvetica";
        ctx.textBaseline = 'middle';

        ctx.fillStyle = CIRCUMCENTER_COLOR
        ctx.fillText("外心", startX + 10, startY);

        ctx.fillStyle = CENTROID_COLOR;
        ctx.fillText("重心", startX + 10, startY + STEP);

        ctx.fillStyle = ORTHOCENTER_COLOR;
        ctx.fillText("垂心", startX + 10, startY + STEP * 2);
    }

    function renderCircumcenter() {
        const center = calcCircumcenter();

        // Draw circumcenter
        ctx.fillStyle = CIRCUMCENTER_COLOR;
        ctx.beginPath();
        ctx.arc(center.x, center.y, CENTER_RADIUS, 0, 2 * Math.PI);
        ctx.fill();

        // Draw cicumcircle
        const radius = Math.sqrt(Math.pow((center.x - A.x), 2) + Math.pow(center.y - A.y, 2));
        ctx.strokeStyle = CIRCUMCENTER_COLOR;
        ctx.beginPath();
        ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
        ctx.stroke();

        // Draw the lines
        ctx.moveTo(center.x, center.y);
        ctx.lineTo(A.x, A.y);
        ctx.moveTo(center.x, center.y);
        ctx.lineTo(B.x, B.y);
        ctx.moveTo(center.x, center.y);
        ctx.lineTo(C.x, C.y);
        ctx.stroke();
    }

    function renderCentroid() {
        const centroid = calcCentroid();

        // Draw centroid
        ctx.fillStyle = CENTROID_COLOR;
        ctx.beginPath();
        ctx.arc(centroid.x, centroid.y, CENTER_RADIUS, 0, 2 * Math.PI);
        ctx.fill();

        // Draw lines
        ctx.strokeStyle = CENTROID_COLOR;
        ctx.moveTo(A.x, A.y);
        ctx.lineTo((B.x + C.x) / 2, (B.y + C.y) / 2);
        ctx.moveTo(B.x, B.y);
        ctx.lineTo((A.x + C.x) / 2, (A.y + C.y) / 2);
        ctx.moveTo(C.x, C.y);
        ctx.lineTo((A.x + B.x) / 2, (A.y + B.y) / 2);
        ctx.stroke();
    }

    function renderOrthocenter() {
        const orthocenter = calcOrthocenter();

        // Draw orthocenter
        ctx.fillStyle = ORTHOCENTER_COLOR;
        ctx.beginPath();
        ctx.arc(orthocenter.x, orthocenter.y, CENTER_RADIUS, 0, 2 * Math.PI);
        ctx.fill();

        // Draw rays
        ctx.strokeStyle = ORTHOCENTER_COLOR;
        ray(A, orthocenter);
        ray(B, orthocenter);
        ray(C, orthocenter);
        ctx.stroke();
    }

    function ray(from, to) {
        const toFar = {
            x: from.x + 1000 * (to.x - from.x),
            y: from.y + 1000 * (to.y - from.y),
        };
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(toFar.x, toFar.y);
    }

    function calcCircumcenter() {
        const D = 2 * (A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y));
        const x = 1 / D * ((A.x * A.x + A.y * A.y) * (B.y - C.y) + (B.x * B.x + B.y * B.y) * (C.y - A.y) + (C.x * C.x + C.y * C.y) * (A.y - B.y));
        const y = 1 / D * ((A.x * A.x + A.y * A.y) * (C.x - B.x) + (B.x * B.x + B.y * B.y) * (A.x - C.x) + (C.x * C.x + C.y * C.y) * (B.x - A.x));
        return { x: x, y: y };
    }

    function calcCentroid() {
        const centroid = {
            x: (A.x + B.x + C.x) / 3.0,
            y: (A.y + B.y + C.y) / 3.0
        };
        return centroid;
    }

    function calcOrthocenter() {
        // Here I just make use of the theorem...
        const circumcenter = calcCircumcenter();
        const centroid = calcCentroid();
        const v = { x: centroid.x - circumcenter.x, y: centroid.y - circumcenter.y };
        const orthocenter = {
            x: circumcenter.x + 3 * v.x,
            y: circumcenter.y + 3 * v.y
        };
        return orthocenter;
    }

    function testVertex(p, v) {
        const dist = Math.sqrt(Math.pow(p.x - v.x, 2) + Math.pow(p.y - v.y, 2));
        return dist <= VERTEX_RADIUS * 1.5;
    }
}

/***/ }),

/***/ "./src/subjs/subj-skdlq-eulerline/subj-skdlq-eulerline.js":
/*!****************************************************************!*\
  !*** ./src/subjs/subj-skdlq-eulerline/subj-skdlq-eulerline.js ***!
  \****************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _demo_eulerline_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./demo-eulerline.js */ "./src/subjs/subj-skdlq-eulerline/demo-eulerline.js");


Object(_demo_eulerline_js__WEBPACK_IMPORTED_MODULE_0__["showDemoEulerLine"])();

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N1YmpzL3N1Ymotc2tkbHEtZXVsZXJsaW5lL2RlbW8tZXVsZXJsaW5lLmpzIiwid2VicGFjazovLy8uL3NyYy9zdWJqcy9zdWJqLXNrZGxxLWV1bGVybGluZS9zdWJqLXNrZGxxLWV1bGVybGluZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBTztBQUNQO0FBQ0E7QUFDQSxlQUFlO0FBQ2YsZUFBZTtBQUNmLGVBQWU7QUFDZjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7Ozs7QUMzT0E7QUFBQTtBQUF3RDs7QUFFeEQsNEVBQWlCLEciLCJmaWxlIjoic3VianMvc3Viai1za2RscS1ldWxlcmxpbmUvc3Viai1za2RscS1ldWxlcmxpbmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9zdWJqcy9zdWJqLXNrZGxxLWV1bGVybGluZS9zdWJqLXNrZGxxLWV1bGVybGluZS5qc1wiKTtcbiIsImV4cG9ydCBmdW5jdGlvbiBzaG93RGVtb0V1bGVyTGluZSgpIHtcbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpZXctdHJpYW5nbGVcIik7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICBjb25zdCBBID0geyB4OiAyNTAsIHk6IDUwIH07XG4gICAgY29uc3QgQiA9IHsgeDogMjAwLCB5OiAzMDAgfTtcbiAgICBjb25zdCBDID0geyB4OiA1MDAsIHk6IDMwMCB9O1xuICAgIGxldCBzZWxlY3RlZFZlcnRleCA9IG51bGw7XG5cbiAgICBjb25zdCBWRVJURVhfUkFESVVTID0gNTtcbiAgICBjb25zdCBDRU5URVJfUkFESVVTID0gMztcbiAgICBjb25zdCBDSVJDVU1DRU5URVJfQ09MT1IgPSBcIiMwMDcyQkRcIjtcbiAgICBjb25zdCBDRU5UUk9JRF9DT0xPUiA9IFwiI0Q5NTMxOVwiO1xuICAgIGNvbnN0IE9SVEhPQ0VOVEVSX0NPTE9SID0gXCIjRURCMTIwXCI7XG5cbiAgICBjYW52YXMub25tb3VzZWRvd24gPSAoZXZ0KSA9PiB7XG4gICAgICAgIGNvbnN0IG1vdXNlUG9zID0gZ2V0TW91c2VQb3MoY2FudmFzLCBldnQpO1xuICAgICAgICBpZiAodGVzdFZlcnRleChtb3VzZVBvcywgQSkpIHtcbiAgICAgICAgICAgIHNlbGVjdGVkVmVydGV4ID0gQTtcbiAgICAgICAgfSBlbHNlIGlmICh0ZXN0VmVydGV4KG1vdXNlUG9zLCBCKSkge1xuICAgICAgICAgICAgc2VsZWN0ZWRWZXJ0ZXggPSBCO1xuICAgICAgICB9IGVsc2UgaWYgKHRlc3RWZXJ0ZXgobW91c2VQb3MsIEMpKSB7XG4gICAgICAgICAgICBzZWxlY3RlZFZlcnRleCA9IENcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGVjdGVkVmVydGV4ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNhbnZhcy5vbm1vdXNldXAgPSAoKSA9PiB7XG4gICAgICAgIHNlbGVjdGVkVmVydGV4ID0gbnVsbDtcbiAgICB9XG5cbiAgICBjYW52YXMub25tb3VzZW1vdmUgPSAoZXZ0KSA9PiB7XG4gICAgICAgIGNvbnN0IG1vdXNlUG9zID0gZ2V0TW91c2VQb3MoY2FudmFzLCBldnQpO1xuICAgICAgICBpZiAoc2VsZWN0ZWRWZXJ0ZXgpIHtcbiAgICAgICAgICAgIHNlbGVjdGVkVmVydGV4LnggPSBtb3VzZVBvcy54O1xuICAgICAgICAgICAgc2VsZWN0ZWRWZXJ0ZXgueSA9IG1vdXNlUG9zLnk7XG4gICAgICAgIH1cbiAgICAgICAgcmVuZGVyKCk7XG4gICAgfTtcblxuICAgIHJlbmRlcigpO1xuXG4gICAgZnVuY3Rpb24gZ2V0TW91c2VQb3MoY2FudmFzLCBldnQpIHtcbiAgICAgICAgdmFyIHJlY3QgPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiBldnQuY2xpZW50WCAtIHJlY3QubGVmdCxcbiAgICAgICAgICAgIHk6IGV2dC5jbGllbnRZIC0gcmVjdC50b3BcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcblxuICAgICAgICBjdHgubGluZVdpZHRoID0gMC41O1xuXG4gICAgICAgIHJlbmRlclRyaWFuZ2xlU2lkZShBLCBCKTtcbiAgICAgICAgcmVuZGVyVHJpYW5nbGVTaWRlKEEsIEMpO1xuICAgICAgICByZW5kZXJUcmlhbmdsZVNpZGUoQiwgQyk7XG5cbiAgICAgICAgcmVuZGVyRXVsZXJMaW5lKCk7XG5cbiAgICAgICAgcmVuZGVyQ2lyY3VtY2VudGVyKCk7XG4gICAgICAgIHJlbmRlckNlbnRyb2lkKCk7XG4gICAgICAgIHJlbmRlck9ydGhvY2VudGVyKCk7XG5cbiAgICAgICAgcmVuZGVyVHJpYW5nbGVWZXJ0ZXgoQSk7XG4gICAgICAgIHJlbmRlclRyaWFuZ2xlVmVydGV4KEIpO1xuICAgICAgICByZW5kZXJUcmlhbmdsZVZlcnRleChDKTtcblxuICAgICAgICByZW5kZXJMZWdlbmQoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW5kZXJUcmlhbmdsZVNpZGUocCwgcSkge1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcIiM2NjZcIjtcbiAgICAgICAgY3R4Lm1vdmVUbyhwLngsIHAueSk7XG4gICAgICAgIGN0eC5saW5lVG8ocS54LCBxLnkpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyRXVsZXJMaW5lKCkge1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcIiMwMDBcIjtcbiAgICAgICAgY29uc3Qgb3J0aG9jZW50ZXIgPSBjYWxjT3J0aG9jZW50ZXIoKTtcbiAgICAgICAgY29uc3QgY2lyY3VtY2VudGVyID0gY2FsY0NpcmN1bWNlbnRlcigpO1xuICAgICAgICBjdHgubW92ZVRvKG9ydGhvY2VudGVyLngsIG9ydGhvY2VudGVyLnkpO1xuICAgICAgICBjdHgubGluZVRvKGNpcmN1bWNlbnRlci54LCBjaXJjdW1jZW50ZXIueSk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW5kZXJUcmlhbmdsZVZlcnRleChwKSB7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiMwMDBcIjtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguYXJjKHAueCwgcC55LCBWRVJURVhfUkFESVVTLCAwLCAyICogTWF0aC5QSSk7XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyTGVnZW5kKCkge1xuICAgICAgICBjb25zdCBzdGFydFggPSBjYW52YXMuY2xpZW50V2lkdGggLSAxMDA7XG4gICAgICAgIGNvbnN0IHN0YXJ0WSA9IDMwO1xuICAgICAgICBjb25zdCBTVEVQID0gMzA7XG5cbiAgICAgICAgLy8gRG90c1xuICAgICAgICAvL1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gQ0lSQ1VNQ0VOVEVSX0NPTE9SO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5hcmMoc3RhcnRYLCBzdGFydFksIENFTlRFUl9SQURJVVMsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICAgICAgY3R4LmZpbGwoKTtcblxuICAgICAgICBjdHguZmlsbFN0eWxlID0gQ0VOVFJPSURfQ09MT1I7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LmFyYyhzdGFydFgsIHN0YXJ0WSArIFNURVAsIENFTlRFUl9SQURJVVMsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICAgICAgY3R4LmZpbGwoKTtcblxuICAgICAgICBjdHguZmlsbFN0eWxlID0gT1JUSE9DRU5URVJfQ09MT1I7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LmFyYyhzdGFydFgsIHN0YXJ0WSArIDIgKiBTVEVQLCBDRU5URVJfUkFESVVTLCAwLCAyICogTWF0aC5QSSk7XG4gICAgICAgIGN0eC5maWxsKCk7XG5cbiAgICAgICAgLy8gVGV4dHNcbiAgICAgICAgLy9cbiAgICAgICAgY3R4LmZvbnQgPSBcIjE2cHggSGVsdmV0aWNhXCI7XG4gICAgICAgIGN0eC50ZXh0QmFzZWxpbmUgPSAnbWlkZGxlJztcblxuICAgICAgICBjdHguZmlsbFN0eWxlID0gQ0lSQ1VNQ0VOVEVSX0NPTE9SXG4gICAgICAgIGN0eC5maWxsVGV4dChcIuWkluW/g1wiLCBzdGFydFggKyAxMCwgc3RhcnRZKTtcblxuICAgICAgICBjdHguZmlsbFN0eWxlID0gQ0VOVFJPSURfQ09MT1I7XG4gICAgICAgIGN0eC5maWxsVGV4dChcIumHjeW/g1wiLCBzdGFydFggKyAxMCwgc3RhcnRZICsgU1RFUCk7XG5cbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IE9SVEhPQ0VOVEVSX0NPTE9SO1xuICAgICAgICBjdHguZmlsbFRleHQoXCLlnoLlv4NcIiwgc3RhcnRYICsgMTAsIHN0YXJ0WSArIFNURVAgKiAyKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW5kZXJDaXJjdW1jZW50ZXIoKSB7XG4gICAgICAgIGNvbnN0IGNlbnRlciA9IGNhbGNDaXJjdW1jZW50ZXIoKTtcblxuICAgICAgICAvLyBEcmF3IGNpcmN1bWNlbnRlclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gQ0lSQ1VNQ0VOVEVSX0NPTE9SO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5hcmMoY2VudGVyLngsIGNlbnRlci55LCBDRU5URVJfUkFESVVTLCAwLCAyICogTWF0aC5QSSk7XG4gICAgICAgIGN0eC5maWxsKCk7XG5cbiAgICAgICAgLy8gRHJhdyBjaWN1bWNpcmNsZVxuICAgICAgICBjb25zdCByYWRpdXMgPSBNYXRoLnNxcnQoTWF0aC5wb3coKGNlbnRlci54IC0gQS54KSwgMikgKyBNYXRoLnBvdyhjZW50ZXIueSAtIEEueSwgMikpO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBDSVJDVU1DRU5URVJfQ09MT1I7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LmFyYyhjZW50ZXIueCwgY2VudGVyLnksIHJhZGl1cywgMCwgMiAqIE1hdGguUEkpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG5cbiAgICAgICAgLy8gRHJhdyB0aGUgbGluZXNcbiAgICAgICAgY3R4Lm1vdmVUbyhjZW50ZXIueCwgY2VudGVyLnkpO1xuICAgICAgICBjdHgubGluZVRvKEEueCwgQS55KTtcbiAgICAgICAgY3R4Lm1vdmVUbyhjZW50ZXIueCwgY2VudGVyLnkpO1xuICAgICAgICBjdHgubGluZVRvKEIueCwgQi55KTtcbiAgICAgICAgY3R4Lm1vdmVUbyhjZW50ZXIueCwgY2VudGVyLnkpO1xuICAgICAgICBjdHgubGluZVRvKEMueCwgQy55KTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbmRlckNlbnRyb2lkKCkge1xuICAgICAgICBjb25zdCBjZW50cm9pZCA9IGNhbGNDZW50cm9pZCgpO1xuXG4gICAgICAgIC8vIERyYXcgY2VudHJvaWRcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IENFTlRST0lEX0NPTE9SO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5hcmMoY2VudHJvaWQueCwgY2VudHJvaWQueSwgQ0VOVEVSX1JBRElVUywgMCwgMiAqIE1hdGguUEkpO1xuICAgICAgICBjdHguZmlsbCgpO1xuXG4gICAgICAgIC8vIERyYXcgbGluZXNcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gQ0VOVFJPSURfQ09MT1I7XG4gICAgICAgIGN0eC5tb3ZlVG8oQS54LCBBLnkpO1xuICAgICAgICBjdHgubGluZVRvKChCLnggKyBDLngpIC8gMiwgKEIueSArIEMueSkgLyAyKTtcbiAgICAgICAgY3R4Lm1vdmVUbyhCLngsIEIueSk7XG4gICAgICAgIGN0eC5saW5lVG8oKEEueCArIEMueCkgLyAyLCAoQS55ICsgQy55KSAvIDIpO1xuICAgICAgICBjdHgubW92ZVRvKEMueCwgQy55KTtcbiAgICAgICAgY3R4LmxpbmVUbygoQS54ICsgQi54KSAvIDIsIChBLnkgKyBCLnkpIC8gMik7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW5kZXJPcnRob2NlbnRlcigpIHtcbiAgICAgICAgY29uc3Qgb3J0aG9jZW50ZXIgPSBjYWxjT3J0aG9jZW50ZXIoKTtcblxuICAgICAgICAvLyBEcmF3IG9ydGhvY2VudGVyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBPUlRIT0NFTlRFUl9DT0xPUjtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguYXJjKG9ydGhvY2VudGVyLngsIG9ydGhvY2VudGVyLnksIENFTlRFUl9SQURJVVMsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICAgICAgY3R4LmZpbGwoKTtcblxuICAgICAgICAvLyBEcmF3IHJheXNcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gT1JUSE9DRU5URVJfQ09MT1I7XG4gICAgICAgIHJheShBLCBvcnRob2NlbnRlcik7XG4gICAgICAgIHJheShCLCBvcnRob2NlbnRlcik7XG4gICAgICAgIHJheShDLCBvcnRob2NlbnRlcik7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByYXkoZnJvbSwgdG8pIHtcbiAgICAgICAgY29uc3QgdG9GYXIgPSB7XG4gICAgICAgICAgICB4OiBmcm9tLnggKyAxMDAwICogKHRvLnggLSBmcm9tLngpLFxuICAgICAgICAgICAgeTogZnJvbS55ICsgMTAwMCAqICh0by55IC0gZnJvbS55KSxcbiAgICAgICAgfTtcbiAgICAgICAgY3R4Lm1vdmVUbyhmcm9tLngsIGZyb20ueSk7XG4gICAgICAgIGN0eC5saW5lVG8odG9GYXIueCwgdG9GYXIueSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FsY0NpcmN1bWNlbnRlcigpIHtcbiAgICAgICAgY29uc3QgRCA9IDIgKiAoQS54ICogKEIueSAtIEMueSkgKyBCLnggKiAoQy55IC0gQS55KSArIEMueCAqIChBLnkgLSBCLnkpKTtcbiAgICAgICAgY29uc3QgeCA9IDEgLyBEICogKChBLnggKiBBLnggKyBBLnkgKiBBLnkpICogKEIueSAtIEMueSkgKyAoQi54ICogQi54ICsgQi55ICogQi55KSAqIChDLnkgLSBBLnkpICsgKEMueCAqIEMueCArIEMueSAqIEMueSkgKiAoQS55IC0gQi55KSk7XG4gICAgICAgIGNvbnN0IHkgPSAxIC8gRCAqICgoQS54ICogQS54ICsgQS55ICogQS55KSAqIChDLnggLSBCLngpICsgKEIueCAqIEIueCArIEIueSAqIEIueSkgKiAoQS54IC0gQy54KSArIChDLnggKiBDLnggKyBDLnkgKiBDLnkpICogKEIueCAtIEEueCkpO1xuICAgICAgICByZXR1cm4geyB4OiB4LCB5OiB5IH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FsY0NlbnRyb2lkKCkge1xuICAgICAgICBjb25zdCBjZW50cm9pZCA9IHtcbiAgICAgICAgICAgIHg6IChBLnggKyBCLnggKyBDLngpIC8gMy4wLFxuICAgICAgICAgICAgeTogKEEueSArIEIueSArIEMueSkgLyAzLjBcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGNlbnRyb2lkO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhbGNPcnRob2NlbnRlcigpIHtcbiAgICAgICAgLy8gSGVyZSBJIGp1c3QgbWFrZSB1c2Ugb2YgdGhlIHRoZW9yZW0uLi5cbiAgICAgICAgY29uc3QgY2lyY3VtY2VudGVyID0gY2FsY0NpcmN1bWNlbnRlcigpO1xuICAgICAgICBjb25zdCBjZW50cm9pZCA9IGNhbGNDZW50cm9pZCgpO1xuICAgICAgICBjb25zdCB2ID0geyB4OiBjZW50cm9pZC54IC0gY2lyY3VtY2VudGVyLngsIHk6IGNlbnRyb2lkLnkgLSBjaXJjdW1jZW50ZXIueSB9O1xuICAgICAgICBjb25zdCBvcnRob2NlbnRlciA9IHtcbiAgICAgICAgICAgIHg6IGNpcmN1bWNlbnRlci54ICsgMyAqIHYueCxcbiAgICAgICAgICAgIHk6IGNpcmN1bWNlbnRlci55ICsgMyAqIHYueVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gb3J0aG9jZW50ZXI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdGVzdFZlcnRleChwLCB2KSB7XG4gICAgICAgIGNvbnN0IGRpc3QgPSBNYXRoLnNxcnQoTWF0aC5wb3cocC54IC0gdi54LCAyKSArIE1hdGgucG93KHAueSAtIHYueSwgMikpO1xuICAgICAgICByZXR1cm4gZGlzdCA8PSBWRVJURVhfUkFESVVTICogMS41O1xuICAgIH1cbn0iLCJpbXBvcnQgeyBzaG93RGVtb0V1bGVyTGluZSB9IGZyb20gJy4vZGVtby1ldWxlcmxpbmUuanMnO1xuXG5zaG93RGVtb0V1bGVyTGluZSgpOyJdLCJzb3VyY2VSb290IjoiIn0=