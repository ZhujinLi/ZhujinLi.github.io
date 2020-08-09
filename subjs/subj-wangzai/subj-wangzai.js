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
    // Permission prompt needs to be activated by user input on iPhone
    window.ontouchmove = window.onclick = () => {
        DeviceMotionEvent.requestPermission();
        window.addEventListener('devicemotion', devicemotion);
        window.ontouchmove = null;
    };
}

/**
 * 
 * @param {DeviceMotionEvent} ev 
 */
function devicemotion(ev) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N1YmpzL3N1Ymotd2FuZ3phaS9zdWJqLXdhbmd6YWkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLFdBQVcsa0JBQWtCO0FBQzdCOztBQUVBLFdBQVcseUJBQXlCO0FBQ3BDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsa0JBQWtCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxXQUFXO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDIiwiZmlsZSI6InN1YmpzL3N1Ymotd2FuZ3phaS9zdWJqLXdhbmd6YWkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9zdWJqcy9zdWJqLXdhbmd6YWkvc3Viai13YW5nemFpLmpzXCIpO1xuIiwiLyoqIEB0eXBlIHtIVE1MQ2FudmFzRWxlbWVudH0gKi9cbmNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FudmFzLXVuZGVyXCIpO1xuXG4vKiogQHR5cGUge0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRH0gKi9cbmNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbi8vIEluaXRpYWxpemUgYSBwb3NpdGlvblxuZHJhd0V5ZUJhbGxzKDEsIDAuNSk7XG5cbi8vIEZvciBkZXNrdG9wLCBpbnRlcmFjdCB3aXRoIG1vdXNlXG53aW5kb3cub25tb3VzZW1vdmUgPSBvbm1vdXNlbW92ZTtcblxuLy8gRm9yIG1vYmlsZSwgaW50ZXJhY3Qgd2l0aCBneXJvc2NvcGUgKHJlcXVpcmluZyBIVFRQUylcbmlmICh3aW5kb3cuRGV2aWNlTW90aW9uRXZlbnQpIHtcbiAgICAvLyBQZXJtaXNzaW9uIHByb21wdCBuZWVkcyB0byBiZSBhY3RpdmF0ZWQgYnkgdXNlciBpbnB1dCBvbiBpUGhvbmVcbiAgICB3aW5kb3cub250b3VjaG1vdmUgPSB3aW5kb3cub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgRGV2aWNlTW90aW9uRXZlbnQucmVxdWVzdFBlcm1pc3Npb24oKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2RldmljZW1vdGlvbicsIGRldmljZW1vdGlvbik7XG4gICAgICAgIHdpbmRvdy5vbnRvdWNobW92ZSA9IG51bGw7XG4gICAgfTtcbn1cblxuLyoqXG4gKiBcbiAqIEBwYXJhbSB7RGV2aWNlTW90aW9uRXZlbnR9IGV2IFxuICovXG5mdW5jdGlvbiBkZXZpY2Vtb3Rpb24oZXYpIHtcbiAgICBjb25zdCB4ID0gLWV2LmFjY2VsZXJhdGlvbkluY2x1ZGluZ0dyYXZpdHkueCAvIDkuOCAqIDAuNSArIDAuNTtcbiAgICBjb25zdCB5ID0gZXYuYWNjZWxlcmF0aW9uSW5jbHVkaW5nR3Jhdml0eS55IC8gOS44ICogMC41ICsgMC41O1xuICAgIGRyYXdFeWVCYWxscyh4LCB5KTtcbn1cblxuLyoqXG4gKiBcbiAqIEBwYXJhbSB7TW91c2VFdmVudH0gZXYgXG4gKi9cbmZ1bmN0aW9uIG9ubW91c2Vtb3ZlKGV2KSB7XG4gICAgY29uc3QgeCA9IGV2LnggLyB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICBjb25zdCB5ID0gZXYueSAvIHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICBkcmF3RXllQmFsbHMoeCwgeSk7XG59XG5cbmZ1bmN0aW9uIGRyYXdFeWVCYWxscyh4LCB5KSB7XG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuXG4gICAgZHJhd0V5ZUJhbGwoW1s0MTAsIDQyMV0sIFs0NjIsIDQxMF0sIFs0NTcsIDM4MV0sIFs0MDMsIDM5OF1dLCB4LCB5LCAxNSk7XG4gICAgZHJhd0V5ZUJhbGwoW1s2MzEsIDM5MV0sIFs2OTIsIDM4M10sIFs2ODMsIDM2M10sIFs2MjAsIDM3Ml1dLCB4LCB5LCAxNSk7XG4gICAgZHJhd0V5ZUJhbGwoW1s1MTMsIDg1OF0sIFs1MzIsIDg1Nl0sIFs1MzIsIDgzNF0sIFs1MTUsIDgzM11dLCB4LCB5LCA3KTtcbiAgICBkcmF3RXllQmFsbChbWzU0OCwgODUzXSwgWzU2NSwgODU1XSwgWzU2NywgODMxXSwgWzU0OSwgODMxXV0sIHgsIHksIDcpO1xufVxuXG5mdW5jdGlvbiBkcmF3RXllQmFsbChxdWFkLCB4LCB5LCByYWRpdXMpIHtcbiAgICBjb25zdCBwb3NJbWcgPSBibGVycChxdWFkLCB4LCB5KTtcbiAgICBjb25zdCBwb3NDYW52YXMgPSB0cmFuc2Zvcm1Db29yZEltZzJDYW52YXMocG9zSW1nKTtcblxuICAgIGN0eC5maWxsU3R5bGUgPSBcIiMwMDBcIjtcblxuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHguYXJjKHBvc0NhbnZhc1swXSwgcG9zQ2FudmFzWzFdLCByYWRpdXMsIDAsIDM2MCk7XG4gICAgY3R4LmNsb3NlUGF0aCgpO1xuXG4gICAgY3R4LmZpbGwoKTtcbn1cblxuZnVuY3Rpb24gdHJhbnNmb3JtQ29vcmRJbWcyQ2FudmFzKGNvb3JkKSB7XG4gICAgY29uc3Qgd0ltZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW1nLXBpY1wiKS5uYXR1cmFsV2lkdGg7XG4gICAgY29uc3QgaEltZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW1nLXBpY1wiKS5uYXR1cmFsSGVpZ2h0O1xuICAgIGNvbnN0IHdDYW52YXMgPSBjYW52YXMud2lkdGg7XG4gICAgY29uc3QgaENhbnZhcyA9IGNhbnZhcy5oZWlnaHQ7XG5cbiAgICByZXR1cm4gW1xuICAgICAgICBjb29yZFswXSAvIHdJbWcgKiB3Q2FudmFzLFxuICAgICAgICBjb29yZFsxXSAvIGhJbWcgKiBoQ2FudmFzLFxuICAgIF07XG59XG5cbi8qKlxuICogUGVyZm9ybSBiaWxpbmVhciBpbnRlcnBvbGF0aW9uIG92ZXIgYSBxdWFkIChDQ1cgZnJvbSBib3R0b20tbGVmdCkuXG4gKi9cbmZ1bmN0aW9uIGJsZXJwKHF1YWQsIHgsIHkpIHtcbiAgICBjb25zdCB0b3AgPSBsZXJwKHF1YWRbM10sIHF1YWRbMl0sIHgpO1xuICAgIGNvbnN0IGJvdHRvbSA9IGxlcnAocXVhZFswXSwgcXVhZFsxXSwgeCk7XG4gICAgcmV0dXJuIGxlcnAodG9wLCBib3R0b20sIHkpO1xufVxuXG5mdW5jdGlvbiBsZXJwKGEsIGIsIHJhdGlvKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgYVswXSAqICgxIC0gcmF0aW8pICsgYlswXSAqIHJhdGlvLFxuICAgICAgICBhWzFdICogKDEgLSByYXRpbykgKyBiWzFdICogcmF0aW8sXG4gICAgXTtcbn0iXSwic291cmNlUm9vdCI6IiJ9