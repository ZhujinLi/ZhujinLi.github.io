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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/subjs/subj-wangzai/subj-wangzai.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/subjs/subj-wangzai/subj-wangzai.js":
/*!************************************************!*\
  !*** ./src/subjs/subj-wangzai/subj-wangzai.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas-under");

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

// Initialize a position
drawEyeBalls(1, 0.5);

// For desktop, interact with mouse
window.onmousemove = onmousemove;

// For mobile, interact with gyroscope (requiring HTTPS)
if (window.DeviceMotionEvent) {
    window.ondevicemotion = ondevicemotion;

    // Permission prompt needs to be activated by user input on iPhone
    window.onclick = () => DeviceMotionEvent.requestPermission();
}

/**
 * 
 * @param {DeviceMotionEvent} ev 
 */
function ondevicemotion(ev) {
    const x = -ev.accelerationIncludingGravity.x / 9.8 * 0.5 + 0.5;
    const y = ev.accelerationIncludingGravity.y / 9.8 * 0.5 + 0.5;
    drawEyeBalls(x, y);
}

/**
 * 
 * @param {MouseEvent} ev 
 */
function onmousemove(ev) {
    const x = ev.x / window.innerWidth;
    const y = ev.y / window.innerHeight;
    drawEyeBalls(x, y);
}

function drawEyeBalls(x, y) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawEyeBall([[410, 421], [462, 410], [457, 381], [403, 398]], x, y, 15);
    drawEyeBall([[631, 391], [692, 383], [683, 363], [620, 372]], x, y, 15);
    drawEyeBall([[513, 858], [532, 856], [532, 834], [515, 833]], x, y, 7);
    drawEyeBall([[548, 853], [565, 855], [567, 831], [549, 831]], x, y, 7);
}

function drawEyeBall(quad, x, y, radius) {
    const posImg = blerp(quad, x, y);
    const posCanvas = transformCoordImg2Canvas(posImg);

    ctx.fillStyle = "#000";

    ctx.beginPath();
    ctx.arc(posCanvas[0], posCanvas[1], radius, 0, 360);
    ctx.closePath();

    ctx.fill();
}

function transformCoordImg2Canvas(coord) {
    const wImg = document.getElementById("img-pic").naturalWidth;
    const hImg = document.getElementById("img-pic").naturalHeight;
    const wCanvas = canvas.width;
    const hCanvas = canvas.height;

    return [
        coord[0] / wImg * wCanvas,
        coord[1] / hImg * hCanvas,
    ];
}

/**
 * Perform bilinear interpolation over a quad (CCW from bottom-left).
 */
function blerp(quad, x, y) {
    const top = lerp(quad[3], quad[2], x);
    const bottom = lerp(quad[0], quad[1], x);
    return lerp(top, bottom, y);
}

function lerp(a, b, ratio) {
    return [
        a[0] * (1 - ratio) + b[0] * ratio,
        a[1] * (1 - ratio) + b[1] * ratio,
    ];
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N1YmpzL3N1Ymotd2FuZ3phaS9zdWJqLXdhbmd6YWkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLFdBQVcsa0JBQWtCO0FBQzdCOztBQUVBLFdBQVcseUJBQXlCO0FBQ3BDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLGtCQUFrQjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsV0FBVztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQyIsImZpbGUiOiJzdWJqcy9zdWJqLXdhbmd6YWkvc3Viai13YW5nemFpLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvc3VianMvc3Viai13YW5nemFpL3N1Ymotd2FuZ3phaS5qc1wiKTtcbiIsIi8qKiBAdHlwZSB7SFRNTENhbnZhc0VsZW1lbnR9ICovXG5jb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhcy11bmRlclwiKTtcblxuLyoqIEB0eXBlIHtDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR9ICovXG5jb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4vLyBJbml0aWFsaXplIGEgcG9zaXRpb25cbmRyYXdFeWVCYWxscygxLCAwLjUpO1xuXG4vLyBGb3IgZGVza3RvcCwgaW50ZXJhY3Qgd2l0aCBtb3VzZVxud2luZG93Lm9ubW91c2Vtb3ZlID0gb25tb3VzZW1vdmU7XG5cbi8vIEZvciBtb2JpbGUsIGludGVyYWN0IHdpdGggZ3lyb3Njb3BlIChyZXF1aXJpbmcgSFRUUFMpXG5pZiAod2luZG93LkRldmljZU1vdGlvbkV2ZW50KSB7XG4gICAgd2luZG93Lm9uZGV2aWNlbW90aW9uID0gb25kZXZpY2Vtb3Rpb247XG5cbiAgICAvLyBQZXJtaXNzaW9uIHByb21wdCBuZWVkcyB0byBiZSBhY3RpdmF0ZWQgYnkgdXNlciBpbnB1dCBvbiBpUGhvbmVcbiAgICB3aW5kb3cub25jbGljayA9ICgpID0+IERldmljZU1vdGlvbkV2ZW50LnJlcXVlc3RQZXJtaXNzaW9uKCk7XG59XG5cbi8qKlxuICogXG4gKiBAcGFyYW0ge0RldmljZU1vdGlvbkV2ZW50fSBldiBcbiAqL1xuZnVuY3Rpb24gb25kZXZpY2Vtb3Rpb24oZXYpIHtcbiAgICBjb25zdCB4ID0gLWV2LmFjY2VsZXJhdGlvbkluY2x1ZGluZ0dyYXZpdHkueCAvIDkuOCAqIDAuNSArIDAuNTtcbiAgICBjb25zdCB5ID0gZXYuYWNjZWxlcmF0aW9uSW5jbHVkaW5nR3Jhdml0eS55IC8gOS44ICogMC41ICsgMC41O1xuICAgIGRyYXdFeWVCYWxscyh4LCB5KTtcbn1cblxuLyoqXG4gKiBcbiAqIEBwYXJhbSB7TW91c2VFdmVudH0gZXYgXG4gKi9cbmZ1bmN0aW9uIG9ubW91c2Vtb3ZlKGV2KSB7XG4gICAgY29uc3QgeCA9IGV2LnggLyB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICBjb25zdCB5ID0gZXYueSAvIHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICBkcmF3RXllQmFsbHMoeCwgeSk7XG59XG5cbmZ1bmN0aW9uIGRyYXdFeWVCYWxscyh4LCB5KSB7XG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuXG4gICAgZHJhd0V5ZUJhbGwoW1s0MTAsIDQyMV0sIFs0NjIsIDQxMF0sIFs0NTcsIDM4MV0sIFs0MDMsIDM5OF1dLCB4LCB5LCAxNSk7XG4gICAgZHJhd0V5ZUJhbGwoW1s2MzEsIDM5MV0sIFs2OTIsIDM4M10sIFs2ODMsIDM2M10sIFs2MjAsIDM3Ml1dLCB4LCB5LCAxNSk7XG4gICAgZHJhd0V5ZUJhbGwoW1s1MTMsIDg1OF0sIFs1MzIsIDg1Nl0sIFs1MzIsIDgzNF0sIFs1MTUsIDgzM11dLCB4LCB5LCA3KTtcbiAgICBkcmF3RXllQmFsbChbWzU0OCwgODUzXSwgWzU2NSwgODU1XSwgWzU2NywgODMxXSwgWzU0OSwgODMxXV0sIHgsIHksIDcpO1xufVxuXG5mdW5jdGlvbiBkcmF3RXllQmFsbChxdWFkLCB4LCB5LCByYWRpdXMpIHtcbiAgICBjb25zdCBwb3NJbWcgPSBibGVycChxdWFkLCB4LCB5KTtcbiAgICBjb25zdCBwb3NDYW52YXMgPSB0cmFuc2Zvcm1Db29yZEltZzJDYW52YXMocG9zSW1nKTtcblxuICAgIGN0eC5maWxsU3R5bGUgPSBcIiMwMDBcIjtcblxuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHguYXJjKHBvc0NhbnZhc1swXSwgcG9zQ2FudmFzWzFdLCByYWRpdXMsIDAsIDM2MCk7XG4gICAgY3R4LmNsb3NlUGF0aCgpO1xuXG4gICAgY3R4LmZpbGwoKTtcbn1cblxuZnVuY3Rpb24gdHJhbnNmb3JtQ29vcmRJbWcyQ2FudmFzKGNvb3JkKSB7XG4gICAgY29uc3Qgd0ltZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW1nLXBpY1wiKS5uYXR1cmFsV2lkdGg7XG4gICAgY29uc3QgaEltZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW1nLXBpY1wiKS5uYXR1cmFsSGVpZ2h0O1xuICAgIGNvbnN0IHdDYW52YXMgPSBjYW52YXMud2lkdGg7XG4gICAgY29uc3QgaENhbnZhcyA9IGNhbnZhcy5oZWlnaHQ7XG5cbiAgICByZXR1cm4gW1xuICAgICAgICBjb29yZFswXSAvIHdJbWcgKiB3Q2FudmFzLFxuICAgICAgICBjb29yZFsxXSAvIGhJbWcgKiBoQ2FudmFzLFxuICAgIF07XG59XG5cbi8qKlxuICogUGVyZm9ybSBiaWxpbmVhciBpbnRlcnBvbGF0aW9uIG92ZXIgYSBxdWFkIChDQ1cgZnJvbSBib3R0b20tbGVmdCkuXG4gKi9cbmZ1bmN0aW9uIGJsZXJwKHF1YWQsIHgsIHkpIHtcbiAgICBjb25zdCB0b3AgPSBsZXJwKHF1YWRbM10sIHF1YWRbMl0sIHgpO1xuICAgIGNvbnN0IGJvdHRvbSA9IGxlcnAocXVhZFswXSwgcXVhZFsxXSwgeCk7XG4gICAgcmV0dXJuIGxlcnAodG9wLCBib3R0b20sIHkpO1xufVxuXG5mdW5jdGlvbiBsZXJwKGEsIGIsIHJhdGlvKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgYVswXSAqICgxIC0gcmF0aW8pICsgYlswXSAqIHJhdGlvLFxuICAgICAgICBhWzFdICogKDEgLSByYXRpbykgKyBiWzFdICogcmF0aW8sXG4gICAgXTtcbn0iXSwic291cmNlUm9vdCI6IiJ9