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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/subjs/subj-skdlq-cwidth/subj-skdlq-cwidth.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/subjs/subj-skdlq-cwidth/demo-cwidth.js":
/*!****************************************************!*\
  !*** ./src/subjs/subj-skdlq-cwidth/demo-cwidth.js ***!
  \****************************************************/
/*! exports provided: showDemoCWidth */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showDemoCWidth", function() { return showDemoCWidth; });

function showDemoCWidth() {
    const canvas = document.getElementById("view-cwidth");
    const ctx = canvas.getContext("2d");

    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    const x0 = w / 4;
    const x1 = w * 3 / 8;
    const x2 = w * 7 / 16;
    const x3 = w - x2;
    const x4 = w - x1;
    const x5 = w - x0;
    const y0 = h / 6;
    const y1 = h / 3;
    const y2 = h / 2;
    const y3 = h / 3 * 2;

    let dist = 0.0;
    const SPEED = 0.5;
    const TICK_INVERVAL = 10.0;

    const side = (y3 - y2) / 3;
    const circumference = Math.PI * side * 3;

    setInterval(render, 16);

    function render() {
        ctx.clearRect(0, 0, w, h);

        ctx.beginPath();

        ctx.strokeStyle = '#888';

        ctx.moveTo(x2, y0);
        ctx.lineTo(x3, y0);
        ctx.lineTo(x4, y1);
        ctx.lineTo(x5, y1);
        ctx.lineTo(x5, y2);
        ctx.lineTo(x0, y2);
        ctx.lineTo(x0, y1);
        ctx.lineTo(x1, y1);
        ctx.lineTo(x2, y0);

        ctx.moveTo(0, y3);
        ctx.lineTo(w, y3);

        dist += SPEED;
        const tick0 = TICK_INVERVAL - (dist - Math.floor(dist / TICK_INVERVAL) * TICK_INVERVAL);

        for (let x = tick0; x < w; x += TICK_INVERVAL) {
            ctx.moveTo(x, y3);
            ctx.lineTo(x, y3 + 10);
        }

        ctx.stroke();

        drawWheel(x1, y2, true);
        drawWheel(x4, y2, false);

        ctx.strokeStyle = '#f88';
        ctx.beginPath();
        ctx.moveTo(x1, y2);
        ctx.lineTo(x1, y3);
        ctx.moveTo(x4, y2);
        ctx.lineTo(x4, y3);
        ctx.stroke();

        function drawWheel(baseX, baseY, showInner) {
            ctx.beginPath();

            const unitCircum = circumference / 3;
            const unitDist = dist - Math.floor(dist / unitCircum) * unitCircum;

            let A, B, C;
            if (unitDist / unitCircum < 2 / 3) {  // Big
                C = { x: baseX, y: baseY + side };

                const alpha = unitDist / (unitCircum * 2.0 / 3) * (Math.PI / 3);
                const beta = (Math.PI / 3) - alpha;
                A = { x: baseX - side * Math.sin(alpha), y: C.y + side * Math.cos(alpha) };
                B = { x: baseX + side * Math.sin(beta), y: C.y + side * Math.cos(beta) };
            } else {    // Small
                B = { x: baseX, y: baseY + side * 2 };

                const alpha = (unitDist / unitCircum - 2.0 / 3) * 3 * (Math.PI / 3);
                const beta = (Math.PI / 3) - alpha;
                A = { x: baseX - side * Math.sin(beta), y: B.y - side * Math.cos(beta) };
                C = { x: baseX + side * Math.sin(alpha), y: B.y - side * Math.cos(alpha) };
            }

            let D = reflect(A, C);
            let E = reflect(A, B);
            let F = reflect(C, B);
            let G = reflect(C, A);
            let H = reflect(B, A);
            let I = reflect(B, C);

            if (showInner) {
                ctx.moveTo(D.x, D.y);
                ctx.lineTo(G.x, G.y);
                ctx.moveTo(F.x, F.y);
                ctx.lineTo(I.x, I.y);
                ctx.moveTo(E.x, E.y);
                ctx.lineTo(H.x, H.y);

                ctx.stroke();
            }

            drawArc(C, D, side * 2);
            drawArc(B, I, side);
            drawArc(A, H, side * 2);
            drawArc(C, G, side);
            drawArc(B, F, side * 2);
            drawArc(A, E, side);
        }

        function drawArc(O, startP, radius) {
            const startAngle = -Math.atan2(O.y - startP.y, startP.x - O.x);

            ctx.beginPath();
            ctx.arc(O.x, O.y, radius, startAngle - Math.PI / 3, startAngle);
            ctx.stroke();
        }

        function reflect(base, p) {
            return { x: 2 * base.x - p.x, y: 2 * base.y - p.y };
        }
    }
}

/***/ }),

/***/ "./src/subjs/subj-skdlq-cwidth/subj-skdlq-cwidth.js":
/*!**********************************************************!*\
  !*** ./src/subjs/subj-skdlq-cwidth/subj-skdlq-cwidth.js ***!
  \**********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _demo_cwidth_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./demo-cwidth.js */ "./src/subjs/subj-skdlq-cwidth/demo-cwidth.js");


Object(_demo_cwidth_js__WEBPACK_IMPORTED_MODULE_0__["showDemoCWidth"])();

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N1YmpzL3N1Ymotc2tkbHEtY3dpZHRoL2RlbW8tY3dpZHRoLmpzIiwid2VicGFjazovLy8uL3NyYy9zdWJqcy9zdWJqLXNrZGxxLWN3aWR0aC9zdWJqLXNrZGxxLWN3aWR0aC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDakZPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDJCQUEyQixPQUFPO0FBQ2xDO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGdEQUFnRDtBQUNoRCxxQkFBcUI7O0FBRXJCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIscUJBQXFCO0FBQ3JCLGFBQWEsT0FBTztBQUNwQixxQkFBcUI7O0FBRXJCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIscUJBQXFCO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7OztBQ2pJQTtBQUFBO0FBQWtEOztBQUVsRCxzRUFBYyxHIiwiZmlsZSI6InN1YmpzL3N1Ymotc2tkbHEtY3dpZHRoL3N1Ymotc2tkbHEtY3dpZHRoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvc3VianMvc3Viai1za2RscS1jd2lkdGgvc3Viai1za2RscS1jd2lkdGguanNcIik7XG4iLCJcbmV4cG9ydCBmdW5jdGlvbiBzaG93RGVtb0NXaWR0aCgpIHtcbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpZXctY3dpZHRoXCIpO1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICBjb25zdCB3ID0gY2FudmFzLmNsaWVudFdpZHRoO1xuICAgIGNvbnN0IGggPSBjYW52YXMuY2xpZW50SGVpZ2h0O1xuICAgIGNvbnN0IHgwID0gdyAvIDQ7XG4gICAgY29uc3QgeDEgPSB3ICogMyAvIDg7XG4gICAgY29uc3QgeDIgPSB3ICogNyAvIDE2O1xuICAgIGNvbnN0IHgzID0gdyAtIHgyO1xuICAgIGNvbnN0IHg0ID0gdyAtIHgxO1xuICAgIGNvbnN0IHg1ID0gdyAtIHgwO1xuICAgIGNvbnN0IHkwID0gaCAvIDY7XG4gICAgY29uc3QgeTEgPSBoIC8gMztcbiAgICBjb25zdCB5MiA9IGggLyAyO1xuICAgIGNvbnN0IHkzID0gaCAvIDMgKiAyO1xuXG4gICAgbGV0IGRpc3QgPSAwLjA7XG4gICAgY29uc3QgU1BFRUQgPSAwLjU7XG4gICAgY29uc3QgVElDS19JTlZFUlZBTCA9IDEwLjA7XG5cbiAgICBjb25zdCBzaWRlID0gKHkzIC0geTIpIC8gMztcbiAgICBjb25zdCBjaXJjdW1mZXJlbmNlID0gTWF0aC5QSSAqIHNpZGUgKiAzO1xuXG4gICAgc2V0SW50ZXJ2YWwocmVuZGVyLCAxNik7XG5cbiAgICBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgdywgaCk7XG5cbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuXG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICcjODg4JztcblxuICAgICAgICBjdHgubW92ZVRvKHgyLCB5MCk7XG4gICAgICAgIGN0eC5saW5lVG8oeDMsIHkwKTtcbiAgICAgICAgY3R4LmxpbmVUbyh4NCwgeTEpO1xuICAgICAgICBjdHgubGluZVRvKHg1LCB5MSk7XG4gICAgICAgIGN0eC5saW5lVG8oeDUsIHkyKTtcbiAgICAgICAgY3R4LmxpbmVUbyh4MCwgeTIpO1xuICAgICAgICBjdHgubGluZVRvKHgwLCB5MSk7XG4gICAgICAgIGN0eC5saW5lVG8oeDEsIHkxKTtcbiAgICAgICAgY3R4LmxpbmVUbyh4MiwgeTApO1xuXG4gICAgICAgIGN0eC5tb3ZlVG8oMCwgeTMpO1xuICAgICAgICBjdHgubGluZVRvKHcsIHkzKTtcblxuICAgICAgICBkaXN0ICs9IFNQRUVEO1xuICAgICAgICBjb25zdCB0aWNrMCA9IFRJQ0tfSU5WRVJWQUwgLSAoZGlzdCAtIE1hdGguZmxvb3IoZGlzdCAvIFRJQ0tfSU5WRVJWQUwpICogVElDS19JTlZFUlZBTCk7XG5cbiAgICAgICAgZm9yIChsZXQgeCA9IHRpY2swOyB4IDwgdzsgeCArPSBUSUNLX0lOVkVSVkFMKSB7XG4gICAgICAgICAgICBjdHgubW92ZVRvKHgsIHkzKTtcbiAgICAgICAgICAgIGN0eC5saW5lVG8oeCwgeTMgKyAxMCk7XG4gICAgICAgIH1cblxuICAgICAgICBjdHguc3Ryb2tlKCk7XG5cbiAgICAgICAgZHJhd1doZWVsKHgxLCB5MiwgdHJ1ZSk7XG4gICAgICAgIGRyYXdXaGVlbCh4NCwgeTIsIGZhbHNlKTtcblxuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSAnI2Y4OCc7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4Lm1vdmVUbyh4MSwgeTIpO1xuICAgICAgICBjdHgubGluZVRvKHgxLCB5Myk7XG4gICAgICAgIGN0eC5tb3ZlVG8oeDQsIHkyKTtcbiAgICAgICAgY3R4LmxpbmVUbyh4NCwgeTMpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG5cbiAgICAgICAgZnVuY3Rpb24gZHJhd1doZWVsKGJhc2VYLCBiYXNlWSwgc2hvd0lubmVyKSB7XG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IHVuaXRDaXJjdW0gPSBjaXJjdW1mZXJlbmNlIC8gMztcbiAgICAgICAgICAgIGNvbnN0IHVuaXREaXN0ID0gZGlzdCAtIE1hdGguZmxvb3IoZGlzdCAvIHVuaXRDaXJjdW0pICogdW5pdENpcmN1bTtcblxuICAgICAgICAgICAgbGV0IEEsIEIsIEM7XG4gICAgICAgICAgICBpZiAodW5pdERpc3QgLyB1bml0Q2lyY3VtIDwgMiAvIDMpIHsgIC8vIEJpZ1xuICAgICAgICAgICAgICAgIEMgPSB7IHg6IGJhc2VYLCB5OiBiYXNlWSArIHNpZGUgfTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGFscGhhID0gdW5pdERpc3QgLyAodW5pdENpcmN1bSAqIDIuMCAvIDMpICogKE1hdGguUEkgLyAzKTtcbiAgICAgICAgICAgICAgICBjb25zdCBiZXRhID0gKE1hdGguUEkgLyAzKSAtIGFscGhhO1xuICAgICAgICAgICAgICAgIEEgPSB7IHg6IGJhc2VYIC0gc2lkZSAqIE1hdGguc2luKGFscGhhKSwgeTogQy55ICsgc2lkZSAqIE1hdGguY29zKGFscGhhKSB9O1xuICAgICAgICAgICAgICAgIEIgPSB7IHg6IGJhc2VYICsgc2lkZSAqIE1hdGguc2luKGJldGEpLCB5OiBDLnkgKyBzaWRlICogTWF0aC5jb3MoYmV0YSkgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7ICAgIC8vIFNtYWxsXG4gICAgICAgICAgICAgICAgQiA9IHsgeDogYmFzZVgsIHk6IGJhc2VZICsgc2lkZSAqIDIgfTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGFscGhhID0gKHVuaXREaXN0IC8gdW5pdENpcmN1bSAtIDIuMCAvIDMpICogMyAqIChNYXRoLlBJIC8gMyk7XG4gICAgICAgICAgICAgICAgY29uc3QgYmV0YSA9IChNYXRoLlBJIC8gMykgLSBhbHBoYTtcbiAgICAgICAgICAgICAgICBBID0geyB4OiBiYXNlWCAtIHNpZGUgKiBNYXRoLnNpbihiZXRhKSwgeTogQi55IC0gc2lkZSAqIE1hdGguY29zKGJldGEpIH07XG4gICAgICAgICAgICAgICAgQyA9IHsgeDogYmFzZVggKyBzaWRlICogTWF0aC5zaW4oYWxwaGEpLCB5OiBCLnkgLSBzaWRlICogTWF0aC5jb3MoYWxwaGEpIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBEID0gcmVmbGVjdChBLCBDKTtcbiAgICAgICAgICAgIGxldCBFID0gcmVmbGVjdChBLCBCKTtcbiAgICAgICAgICAgIGxldCBGID0gcmVmbGVjdChDLCBCKTtcbiAgICAgICAgICAgIGxldCBHID0gcmVmbGVjdChDLCBBKTtcbiAgICAgICAgICAgIGxldCBIID0gcmVmbGVjdChCLCBBKTtcbiAgICAgICAgICAgIGxldCBJID0gcmVmbGVjdChCLCBDKTtcblxuICAgICAgICAgICAgaWYgKHNob3dJbm5lcikge1xuICAgICAgICAgICAgICAgIGN0eC5tb3ZlVG8oRC54LCBELnkpO1xuICAgICAgICAgICAgICAgIGN0eC5saW5lVG8oRy54LCBHLnkpO1xuICAgICAgICAgICAgICAgIGN0eC5tb3ZlVG8oRi54LCBGLnkpO1xuICAgICAgICAgICAgICAgIGN0eC5saW5lVG8oSS54LCBJLnkpO1xuICAgICAgICAgICAgICAgIGN0eC5tb3ZlVG8oRS54LCBFLnkpO1xuICAgICAgICAgICAgICAgIGN0eC5saW5lVG8oSC54LCBILnkpO1xuXG4gICAgICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkcmF3QXJjKEMsIEQsIHNpZGUgKiAyKTtcbiAgICAgICAgICAgIGRyYXdBcmMoQiwgSSwgc2lkZSk7XG4gICAgICAgICAgICBkcmF3QXJjKEEsIEgsIHNpZGUgKiAyKTtcbiAgICAgICAgICAgIGRyYXdBcmMoQywgRywgc2lkZSk7XG4gICAgICAgICAgICBkcmF3QXJjKEIsIEYsIHNpZGUgKiAyKTtcbiAgICAgICAgICAgIGRyYXdBcmMoQSwgRSwgc2lkZSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBkcmF3QXJjKE8sIHN0YXJ0UCwgcmFkaXVzKSB7XG4gICAgICAgICAgICBjb25zdCBzdGFydEFuZ2xlID0gLU1hdGguYXRhbjIoTy55IC0gc3RhcnRQLnksIHN0YXJ0UC54IC0gTy54KTtcblxuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgY3R4LmFyYyhPLngsIE8ueSwgcmFkaXVzLCBzdGFydEFuZ2xlIC0gTWF0aC5QSSAvIDMsIHN0YXJ0QW5nbGUpO1xuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcmVmbGVjdChiYXNlLCBwKSB7XG4gICAgICAgICAgICByZXR1cm4geyB4OiAyICogYmFzZS54IC0gcC54LCB5OiAyICogYmFzZS55IC0gcC55IH07XG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0IHsgc2hvd0RlbW9DV2lkdGggfSBmcm9tICcuL2RlbW8tY3dpZHRoLmpzJztcblxuc2hvd0RlbW9DV2lkdGgoKTsiXSwic291cmNlUm9vdCI6IiJ9