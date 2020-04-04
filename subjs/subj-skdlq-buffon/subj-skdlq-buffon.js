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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/subjs/subj-skdlq-buffon/subj-skdlq-buffon.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/subjs/subj-skdlq-buffon/demo-buffon.js":
/*!****************************************************!*\
  !*** ./src/subjs/subj-skdlq-buffon/demo-buffon.js ***!
  \****************************************************/
/*! exports provided: showDemoBuffon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showDemoBuffon", function() { return showDemoBuffon; });

function showDemoBuffon() {
    let totalCount = 0;
    let intersectCount = 0;
    let isRunning = false;

    const btn = document.getElementById('button-buffon');
    updateBtnText();
    updateResult();

    btn.onclick = () => {
        isRunning = !isRunning;
        updateBtnText();
    }

    setInterval(tossIfNeeded, 100);

    function tossIfNeeded() {
        if (isRunning) {
            let step = calcStep();
            for (let i = 0; i < step; i++) {
                totalCount++;
                const x = Math.random() / 2;
                const angle = Math.random() * Math.PI / 2;
                if (Math.cos(angle) > 2 * x) {
                    intersectCount++;
                }
            }

            updateResult();
        }
    }

    function calcStep() {
        if (totalCount < 10) {
            return 1;
        } else if (totalCount < 100) {
            return 10;
        } else if (totalCount < 1000) {
            return 100;
        } else if (totalCount < 10000) {
            return 1000;
        } else if (totalCount < 100000) {
            return 10000;
        } else if (totalCount < 1000000) {
            return 100000;
        } else {
            return 1000000;
        }
    }

    function updateResult() {
        document.getElementById('li-buffon-total-count').textContent = '投针次数：' + totalCount;
        document.getElementById('li-buffon-intersect-count').textContent = '相交次数：' + intersectCount;
        document.getElementById('li-buffon-pi').textContent = '2/相交次数*投针次数：' + 2 / intersectCount * totalCount;
    }

    function updateBtnText() {
        btn.textContent = isRunning ? "暂停" : "给我投";
    }

}

/***/ }),

/***/ "./src/subjs/subj-skdlq-buffon/subj-skdlq-buffon.js":
/*!**********************************************************!*\
  !*** ./src/subjs/subj-skdlq-buffon/subj-skdlq-buffon.js ***!
  \**********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _demo_buffon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./demo-buffon.js */ "./src/subjs/subj-skdlq-buffon/demo-buffon.js");


Object(_demo_buffon_js__WEBPACK_IMPORTED_MODULE_0__["showDemoBuffon"])();

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N1YmpzL3N1Ymotc2tkbHEtYnVmZm9uL2RlbW8tYnVmZm9uLmpzIiwid2VicGFjazovLy8uL3NyYy9zdWJqcy9zdWJqLXNrZGxxLWJ1ZmZvbi9zdWJqLXNrZGxxLWJ1ZmZvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDakZPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsVUFBVTtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxDOzs7Ozs7Ozs7Ozs7QUM3REE7QUFBQTtBQUFrRDs7QUFFbEQsc0VBQWMsRyIsImZpbGUiOiJzdWJqcy9zdWJqLXNrZGxxLWJ1ZmZvbi9zdWJqLXNrZGxxLWJ1ZmZvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3N1YmpzL3N1Ymotc2tkbHEtYnVmZm9uL3N1Ymotc2tkbHEtYnVmZm9uLmpzXCIpO1xuIiwiXG5leHBvcnQgZnVuY3Rpb24gc2hvd0RlbW9CdWZmb24oKSB7XG4gICAgbGV0IHRvdGFsQ291bnQgPSAwO1xuICAgIGxldCBpbnRlcnNlY3RDb3VudCA9IDA7XG4gICAgbGV0IGlzUnVubmluZyA9IGZhbHNlO1xuXG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J1dHRvbi1idWZmb24nKTtcbiAgICB1cGRhdGVCdG5UZXh0KCk7XG4gICAgdXBkYXRlUmVzdWx0KCk7XG5cbiAgICBidG4ub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgaXNSdW5uaW5nID0gIWlzUnVubmluZztcbiAgICAgICAgdXBkYXRlQnRuVGV4dCgpO1xuICAgIH1cblxuICAgIHNldEludGVydmFsKHRvc3NJZk5lZWRlZCwgMTAwKTtcblxuICAgIGZ1bmN0aW9uIHRvc3NJZk5lZWRlZCgpIHtcbiAgICAgICAgaWYgKGlzUnVubmluZykge1xuICAgICAgICAgICAgbGV0IHN0ZXAgPSBjYWxjU3RlcCgpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGVwOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0b3RhbENvdW50Kys7XG4gICAgICAgICAgICAgICAgY29uc3QgeCA9IE1hdGgucmFuZG9tKCkgLyAyO1xuICAgICAgICAgICAgICAgIGNvbnN0IGFuZ2xlID0gTWF0aC5yYW5kb20oKSAqIE1hdGguUEkgLyAyO1xuICAgICAgICAgICAgICAgIGlmIChNYXRoLmNvcyhhbmdsZSkgPiAyICogeCkge1xuICAgICAgICAgICAgICAgICAgICBpbnRlcnNlY3RDb3VudCsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdXBkYXRlUmVzdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYWxjU3RlcCgpIHtcbiAgICAgICAgaWYgKHRvdGFsQ291bnQgPCAxMCkge1xuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH0gZWxzZSBpZiAodG90YWxDb3VudCA8IDEwMCkge1xuICAgICAgICAgICAgcmV0dXJuIDEwO1xuICAgICAgICB9IGVsc2UgaWYgKHRvdGFsQ291bnQgPCAxMDAwKSB7XG4gICAgICAgICAgICByZXR1cm4gMTAwO1xuICAgICAgICB9IGVsc2UgaWYgKHRvdGFsQ291bnQgPCAxMDAwMCkge1xuICAgICAgICAgICAgcmV0dXJuIDEwMDA7XG4gICAgICAgIH0gZWxzZSBpZiAodG90YWxDb3VudCA8IDEwMDAwMCkge1xuICAgICAgICAgICAgcmV0dXJuIDEwMDAwO1xuICAgICAgICB9IGVsc2UgaWYgKHRvdGFsQ291bnQgPCAxMDAwMDAwKSB7XG4gICAgICAgICAgICByZXR1cm4gMTAwMDAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIDEwMDAwMDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVSZXN1bHQoKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaS1idWZmb24tdG90YWwtY291bnQnKS50ZXh0Q29udGVudCA9ICfmipXpkojmrKHmlbDvvJonICsgdG90YWxDb3VudDtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpLWJ1ZmZvbi1pbnRlcnNlY3QtY291bnQnKS50ZXh0Q29udGVudCA9ICfnm7jkuqTmrKHmlbDvvJonICsgaW50ZXJzZWN0Q291bnQ7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaS1idWZmb24tcGknKS50ZXh0Q29udGVudCA9ICcyL+ebuOS6pOasoeaVsCrmipXpkojmrKHmlbDvvJonICsgMiAvIGludGVyc2VjdENvdW50ICogdG90YWxDb3VudDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVCdG5UZXh0KCkge1xuICAgICAgICBidG4udGV4dENvbnRlbnQgPSBpc1J1bm5pbmcgPyBcIuaaguWBnFwiIDogXCLnu5nmiJHmipVcIjtcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBzaG93RGVtb0J1ZmZvbiB9IGZyb20gJy4vZGVtby1idWZmb24uanMnO1xuXG5zaG93RGVtb0J1ZmZvbigpOyJdLCJzb3VyY2VSb290IjoiIn0=