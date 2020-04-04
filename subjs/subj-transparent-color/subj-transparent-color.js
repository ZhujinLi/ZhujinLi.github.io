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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/subjs/subj-transparent-color/subj-transparent-color.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/subjs/subj-transparent-color/program.js":
/*!*****************************************************!*\
  !*** ./src/subjs/subj-transparent-color/program.js ***!
  \*****************************************************/
/*! exports provided: createProgram */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createProgram", function() { return createProgram; });
const vsSource = `
    attribute vec4 aVertexPosition;

    varying highp vec2 vTextureCoord;

    void main() {
      gl_Position = vec4(aVertexPosition.xy, 0.0, 1.0);
      vTextureCoord = aVertexPosition.xy * 0.5 + 0.5;
    }
  `;

const fsSource = `
    varying highp vec2 vTextureCoord;

    uniform sampler2D uSampler;

    void main() {
      gl_FragColor = texture2D(uSampler, vTextureCoord);
    }
  `;

function loadShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function createProgram(gl) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
    },
  };
}

/***/ }),

/***/ "./src/subjs/subj-transparent-color/render2x2.js":
/*!*******************************************************!*\
  !*** ./src/subjs/subj-transparent-color/render2x2.js ***!
  \*******************************************************/
/*! exports provided: render2x2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render2x2", function() { return render2x2; });
/* harmony import */ var _program_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./program.js */ "./src/subjs/subj-transparent-color/program.js");
/* harmony import */ var _vb_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vb.js */ "./src/subjs/subj-transparent-color/vb.js");
/* harmony import */ var _texture_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./texture.js */ "./src/subjs/subj-transparent-color/texture.js");




function render2x2(view, params) {
    const canvas = document.querySelector(view);

    const gl = canvas.getContext("webgl");
    if (gl === null) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    }

    gl.clearColor(1, 1, 1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Here I disable the alpha channel otherwise the canvas surface would be
    // blended with the page background, which brings more complexity
    // to my demonstration.
    gl.colorMask(true, true, true, false);

    gl.enable(gl.BLEND);
    if (params.pma)
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    else
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const programInfo = Object(_program_js__WEBPACK_IMPORTED_MODULE_0__["createProgram"])(gl);
    gl.useProgram(programInfo.program);

    const buffers = Object(_vb_js__WEBPACK_IMPORTED_MODULE_1__["createVB"])(gl);
    const numComponents = 2;  // pull out 2 values per iteration
    const type = gl.FLOAT;    // the data in the buffer is 32bit floats
    const normalize = false;  // don't normalize
    const stride = 0;         // how many bytes to get from one set of values to the next, 0 = use type and numComponents above
    const offset = 0;         // how many bytes inside the buffer to start from
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexPosition);

    const texture = Object(_texture_js__WEBPACK_IMPORTED_MODULE_2__["loadTexture"])(gl, params);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(programInfo.uniformLocations.uSampler, 0);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

/***/ }),

/***/ "./src/subjs/subj-transparent-color/subj-transparent-color.js":
/*!********************************************************************!*\
  !*** ./src/subjs/subj-transparent-color/subj-transparent-color.js ***!
  \********************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _render2x2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render2x2.js */ "./src/subjs/subj-transparent-color/render2x2.js");


Object(_render2x2_js__WEBPACK_IMPORTED_MODULE_0__["render2x2"])("#view-bad", {});

Object(_render2x2_js__WEBPACK_IMPORTED_MODULE_0__["render2x2"])("#view-bleeding", { bleeding: true });

Object(_render2x2_js__WEBPACK_IMPORTED_MODULE_0__["render2x2"])("#view-green-bad", { green: true });

Object(_render2x2_js__WEBPACK_IMPORTED_MODULE_0__["render2x2"])("#view-green-pma", { green: true, pma: true });

/***/ }),

/***/ "./src/subjs/subj-transparent-color/texture.js":
/*!*****************************************************!*\
  !*** ./src/subjs/subj-transparent-color/texture.js ***!
  \*****************************************************/
/*! exports provided: loadTexture */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadTexture", function() { return loadTexture; });

function loadTexture(gl, params) {
    let pixel;
    if (params.bleeding)
        pixel = new Uint8Array([
            255, 0, 0, 0,
            255, 0, 0, 255,
            255, 0, 0, 255,
            255, 0, 0, 0,
        ]);
    else if (params.green)
        if (params.pma)
            pixel = new Uint8Array([
                0, 25, 0, 25,
                255, 0, 0, 255,
                255, 0, 0, 255,
                0, 25, 0, 25,
            ]);
        else
            pixel = new Uint8Array([
                0, 255, 0, 25,
                255, 0, 0, 255,
                255, 0, 0, 255,
                0, 255, 0, 25,
            ]);
    else
        pixel = new Uint8Array([
            0, 0, 0, 0,
            255, 0, 0, 255,
            255, 0, 0, 255,
            0, 0, 0, 0,
        ]);

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    const level = 0;
    const internalFormat = gl.RGBA;
    const width = 2;
    const height = 2;
    const border = 0;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
        width, height, border, srcFormat, srcType,
        pixel);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    gl.generateMipmap(gl.TEXTURE_2D);

    return texture;
}

/***/ }),

/***/ "./src/subjs/subj-transparent-color/vb.js":
/*!************************************************!*\
  !*** ./src/subjs/subj-transparent-color/vb.js ***!
  \************************************************/
/*! exports provided: createVB */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createVB", function() { return createVB; });

function createVB(gl) {
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [
        -1.0, 1.0,
        1.0, 1.0,
        -1.0, -1.0,
        1.0, -1.0,
    ];

    gl.bufferData(gl.ARRAY_BUFFER,
        new Float32Array(positions),
        gl.STATIC_DRAW);

    return {
        position: positionBuffer,
    };
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N1YmpzL3N1YmotdHJhbnNwYXJlbnQtY29sb3IvcHJvZ3JhbS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3VianMvc3Viai10cmFuc3BhcmVudC1jb2xvci9yZW5kZXIyeDIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N1YmpzL3N1YmotdHJhbnNwYXJlbnQtY29sb3Ivc3Viai10cmFuc3BhcmVudC1jb2xvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3VianMvc3Viai10cmFuc3BhcmVudC1jb2xvci90ZXh0dXJlLmpzIiwid2VicGFjazovLy8uL3NyYy9zdWJqcy9zdWJqLXRyYW5zcGFyZW50LWNvbG9yL3ZiLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDOzs7Ozs7Ozs7Ozs7QUM1REE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUE2QztBQUNWO0FBQ1E7O0FBRXBDO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHdCQUF3QixpRUFBYTtBQUNyQzs7QUFFQSxvQkFBb0IsdURBQVE7QUFDNUIsNEJBQTRCO0FBQzVCLDBCQUEwQjtBQUMxQiw0QkFBNEI7QUFDNUIscUJBQXFCO0FBQ3JCLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0IsK0RBQVc7QUFDL0I7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQzs7Ozs7Ozs7Ozs7O0FDcERBO0FBQUE7QUFBMkM7O0FBRTNDLCtEQUFTLGdCQUFnQjs7QUFFekIsK0RBQVMsb0JBQW9CLGlCQUFpQjs7QUFFOUMsK0RBQVMscUJBQXFCLGNBQWM7O0FBRTVDLCtEQUFTLHFCQUFxQix5QkFBeUIsRTs7Ozs7Ozs7Ozs7Ozs7O0FDUGhEO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxDOzs7Ozs7Ozs7Ozs7Ozs7QUN0RE87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDIiwiZmlsZSI6InN1YmpzL3N1YmotdHJhbnNwYXJlbnQtY29sb3Ivc3Viai10cmFuc3BhcmVudC1jb2xvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3N1YmpzL3N1YmotdHJhbnNwYXJlbnQtY29sb3Ivc3Viai10cmFuc3BhcmVudC1jb2xvci5qc1wiKTtcbiIsImNvbnN0IHZzU291cmNlID0gYFxuICAgIGF0dHJpYnV0ZSB2ZWM0IGFWZXJ0ZXhQb3NpdGlvbjtcblxuICAgIHZhcnlpbmcgaGlnaHAgdmVjMiB2VGV4dHVyZUNvb3JkO1xuXG4gICAgdm9pZCBtYWluKCkge1xuICAgICAgZ2xfUG9zaXRpb24gPSB2ZWM0KGFWZXJ0ZXhQb3NpdGlvbi54eSwgMC4wLCAxLjApO1xuICAgICAgdlRleHR1cmVDb29yZCA9IGFWZXJ0ZXhQb3NpdGlvbi54eSAqIDAuNSArIDAuNTtcbiAgICB9XG4gIGA7XG5cbmNvbnN0IGZzU291cmNlID0gYFxuICAgIHZhcnlpbmcgaGlnaHAgdmVjMiB2VGV4dHVyZUNvb3JkO1xuXG4gICAgdW5pZm9ybSBzYW1wbGVyMkQgdVNhbXBsZXI7XG5cbiAgICB2b2lkIG1haW4oKSB7XG4gICAgICBnbF9GcmFnQ29sb3IgPSB0ZXh0dXJlMkQodVNhbXBsZXIsIHZUZXh0dXJlQ29vcmQpO1xuICAgIH1cbiAgYDtcblxuZnVuY3Rpb24gbG9hZFNoYWRlcihnbCwgdHlwZSwgc291cmNlKSB7XG4gIGNvbnN0IHNoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcih0eXBlKTtcbiAgZ2wuc2hhZGVyU291cmNlKHNoYWRlciwgc291cmNlKTtcbiAgZ2wuY29tcGlsZVNoYWRlcihzaGFkZXIpO1xuXG4gIGlmICghZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHNoYWRlciwgZ2wuQ09NUElMRV9TVEFUVVMpKSB7XG4gICAgYWxlcnQoJ0FuIGVycm9yIG9jY3VycmVkIGNvbXBpbGluZyB0aGUgc2hhZGVyczogJyArIGdsLmdldFNoYWRlckluZm9Mb2coc2hhZGVyKSk7XG4gICAgZ2wuZGVsZXRlU2hhZGVyKHNoYWRlcik7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gc2hhZGVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUHJvZ3JhbShnbCkge1xuICBjb25zdCB2ZXJ0ZXhTaGFkZXIgPSBsb2FkU2hhZGVyKGdsLCBnbC5WRVJURVhfU0hBREVSLCB2c1NvdXJjZSk7XG4gIGNvbnN0IGZyYWdtZW50U2hhZGVyID0gbG9hZFNoYWRlcihnbCwgZ2wuRlJBR01FTlRfU0hBREVSLCBmc1NvdXJjZSk7XG5cbiAgY29uc3Qgc2hhZGVyUHJvZ3JhbSA9IGdsLmNyZWF0ZVByb2dyYW0oKTtcbiAgZ2wuYXR0YWNoU2hhZGVyKHNoYWRlclByb2dyYW0sIHZlcnRleFNoYWRlcik7XG4gIGdsLmF0dGFjaFNoYWRlcihzaGFkZXJQcm9ncmFtLCBmcmFnbWVudFNoYWRlcik7XG4gIGdsLmxpbmtQcm9ncmFtKHNoYWRlclByb2dyYW0pO1xuXG4gIGlmICghZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcihzaGFkZXJQcm9ncmFtLCBnbC5MSU5LX1NUQVRVUykpIHtcbiAgICBhbGVydCgnVW5hYmxlIHRvIGluaXRpYWxpemUgdGhlIHNoYWRlciBwcm9ncmFtOiAnICsgZ2wuZ2V0UHJvZ3JhbUluZm9Mb2coc2hhZGVyUHJvZ3JhbSkpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBwcm9ncmFtOiBzaGFkZXJQcm9ncmFtLFxuICAgIGF0dHJpYkxvY2F0aW9uczoge1xuICAgICAgdmVydGV4UG9zaXRpb246IGdsLmdldEF0dHJpYkxvY2F0aW9uKHNoYWRlclByb2dyYW0sICdhVmVydGV4UG9zaXRpb24nKSxcbiAgICB9LFxuICAgIHVuaWZvcm1Mb2NhdGlvbnM6IHtcbiAgICAgIHByb2plY3Rpb25NYXRyaXg6IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihzaGFkZXJQcm9ncmFtLCAndVByb2plY3Rpb25NYXRyaXgnKSxcbiAgICAgIG1vZGVsVmlld01hdHJpeDogZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHNoYWRlclByb2dyYW0sICd1TW9kZWxWaWV3TWF0cml4JyksXG4gICAgICB1U2FtcGxlcjogZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHNoYWRlclByb2dyYW0sICd1U2FtcGxlcicpLFxuICAgIH0sXG4gIH07XG59IiwiaW1wb3J0IHsgY3JlYXRlUHJvZ3JhbSB9IGZyb20gXCIuL3Byb2dyYW0uanNcIjtcbmltcG9ydCB7IGNyZWF0ZVZCIH0gZnJvbSBcIi4vdmIuanNcIjtcbmltcG9ydCB7IGxvYWRUZXh0dXJlIH0gZnJvbSBcIi4vdGV4dHVyZS5qc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyMngyKHZpZXcsIHBhcmFtcykge1xuICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iodmlldyk7XG5cbiAgICBjb25zdCBnbCA9IGNhbnZhcy5nZXRDb250ZXh0KFwid2ViZ2xcIik7XG4gICAgaWYgKGdsID09PSBudWxsKSB7XG4gICAgICAgIGFsZXJ0KFwiVW5hYmxlIHRvIGluaXRpYWxpemUgV2ViR0wuIFlvdXIgYnJvd3NlciBvciBtYWNoaW5lIG1heSBub3Qgc3VwcG9ydCBpdC5cIik7XG4gICAgfVxuXG4gICAgZ2wuY2xlYXJDb2xvcigxLCAxLCAxLCAxKTtcbiAgICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUKTtcblxuICAgIC8vIEhlcmUgSSBkaXNhYmxlIHRoZSBhbHBoYSBjaGFubmVsIG90aGVyd2lzZSB0aGUgY2FudmFzIHN1cmZhY2Ugd291bGQgYmVcbiAgICAvLyBibGVuZGVkIHdpdGggdGhlIHBhZ2UgYmFja2dyb3VuZCwgd2hpY2ggYnJpbmdzIG1vcmUgY29tcGxleGl0eVxuICAgIC8vIHRvIG15IGRlbW9uc3RyYXRpb24uXG4gICAgZ2wuY29sb3JNYXNrKHRydWUsIHRydWUsIHRydWUsIGZhbHNlKTtcblxuICAgIGdsLmVuYWJsZShnbC5CTEVORCk7XG4gICAgaWYgKHBhcmFtcy5wbWEpXG4gICAgICAgIGdsLmJsZW5kRnVuYyhnbC5PTkUsIGdsLk9ORV9NSU5VU19TUkNfQUxQSEEpO1xuICAgIGVsc2VcbiAgICAgICAgZ2wuYmxlbmRGdW5jKGdsLlNSQ19BTFBIQSwgZ2wuT05FX01JTlVTX1NSQ19BTFBIQSk7XG5cbiAgICBjb25zdCBwcm9ncmFtSW5mbyA9IGNyZWF0ZVByb2dyYW0oZ2wpO1xuICAgIGdsLnVzZVByb2dyYW0ocHJvZ3JhbUluZm8ucHJvZ3JhbSk7XG5cbiAgICBjb25zdCBidWZmZXJzID0gY3JlYXRlVkIoZ2wpO1xuICAgIGNvbnN0IG51bUNvbXBvbmVudHMgPSAyOyAgLy8gcHVsbCBvdXQgMiB2YWx1ZXMgcGVyIGl0ZXJhdGlvblxuICAgIGNvbnN0IHR5cGUgPSBnbC5GTE9BVDsgICAgLy8gdGhlIGRhdGEgaW4gdGhlIGJ1ZmZlciBpcyAzMmJpdCBmbG9hdHNcbiAgICBjb25zdCBub3JtYWxpemUgPSBmYWxzZTsgIC8vIGRvbid0IG5vcm1hbGl6ZVxuICAgIGNvbnN0IHN0cmlkZSA9IDA7ICAgICAgICAgLy8gaG93IG1hbnkgYnl0ZXMgdG8gZ2V0IGZyb20gb25lIHNldCBvZiB2YWx1ZXMgdG8gdGhlIG5leHQsIDAgPSB1c2UgdHlwZSBhbmQgbnVtQ29tcG9uZW50cyBhYm92ZVxuICAgIGNvbnN0IG9mZnNldCA9IDA7ICAgICAgICAgLy8gaG93IG1hbnkgYnl0ZXMgaW5zaWRlIHRoZSBidWZmZXIgdG8gc3RhcnQgZnJvbVxuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBidWZmZXJzLnBvc2l0aW9uKTtcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKFxuICAgICAgICBwcm9ncmFtSW5mby5hdHRyaWJMb2NhdGlvbnMudmVydGV4UG9zaXRpb24sXG4gICAgICAgIG51bUNvbXBvbmVudHMsXG4gICAgICAgIHR5cGUsXG4gICAgICAgIG5vcm1hbGl6ZSxcbiAgICAgICAgc3RyaWRlLFxuICAgICAgICBvZmZzZXQpO1xuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KFxuICAgICAgICBwcm9ncmFtSW5mby5hdHRyaWJMb2NhdGlvbnMudmVydGV4UG9zaXRpb24pO1xuXG4gICAgY29uc3QgdGV4dHVyZSA9IGxvYWRUZXh0dXJlKGdsLCBwYXJhbXMpO1xuICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTApO1xuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRleHR1cmUpO1xuICAgIGdsLnVuaWZvcm0xaShwcm9ncmFtSW5mby51bmlmb3JtTG9jYXRpb25zLnVTYW1wbGVyLCAwKTtcblxuICAgIGdsLmRyYXdBcnJheXMoZ2wuVFJJQU5HTEVfU1RSSVAsIDAsIDQpO1xufSIsImltcG9ydCB7IHJlbmRlcjJ4MiB9IGZyb20gXCIuL3JlbmRlcjJ4Mi5qc1wiO1xuXG5yZW5kZXIyeDIoXCIjdmlldy1iYWRcIiwge30pO1xuXG5yZW5kZXIyeDIoXCIjdmlldy1ibGVlZGluZ1wiLCB7IGJsZWVkaW5nOiB0cnVlIH0pO1xuXG5yZW5kZXIyeDIoXCIjdmlldy1ncmVlbi1iYWRcIiwgeyBncmVlbjogdHJ1ZSB9KTtcblxucmVuZGVyMngyKFwiI3ZpZXctZ3JlZW4tcG1hXCIsIHsgZ3JlZW46IHRydWUsIHBtYTogdHJ1ZSB9KTsiLCJcbmV4cG9ydCBmdW5jdGlvbiBsb2FkVGV4dHVyZShnbCwgcGFyYW1zKSB7XG4gICAgbGV0IHBpeGVsO1xuICAgIGlmIChwYXJhbXMuYmxlZWRpbmcpXG4gICAgICAgIHBpeGVsID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgICAgICAgMjU1LCAwLCAwLCAwLFxuICAgICAgICAgICAgMjU1LCAwLCAwLCAyNTUsXG4gICAgICAgICAgICAyNTUsIDAsIDAsIDI1NSxcbiAgICAgICAgICAgIDI1NSwgMCwgMCwgMCxcbiAgICAgICAgXSk7XG4gICAgZWxzZSBpZiAocGFyYW1zLmdyZWVuKVxuICAgICAgICBpZiAocGFyYW1zLnBtYSlcbiAgICAgICAgICAgIHBpeGVsID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgICAgICAgICAgIDAsIDI1LCAwLCAyNSxcbiAgICAgICAgICAgICAgICAyNTUsIDAsIDAsIDI1NSxcbiAgICAgICAgICAgICAgICAyNTUsIDAsIDAsIDI1NSxcbiAgICAgICAgICAgICAgICAwLCAyNSwgMCwgMjUsXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcGl4ZWwgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAgICAgICAgICAgMCwgMjU1LCAwLCAyNSxcbiAgICAgICAgICAgICAgICAyNTUsIDAsIDAsIDI1NSxcbiAgICAgICAgICAgICAgICAyNTUsIDAsIDAsIDI1NSxcbiAgICAgICAgICAgICAgICAwLCAyNTUsIDAsIDI1LFxuICAgICAgICAgICAgXSk7XG4gICAgZWxzZVxuICAgICAgICBwaXhlbCA9IG5ldyBVaW50OEFycmF5KFtcbiAgICAgICAgICAgIDAsIDAsIDAsIDAsXG4gICAgICAgICAgICAyNTUsIDAsIDAsIDI1NSxcbiAgICAgICAgICAgIDI1NSwgMCwgMCwgMjU1LFxuICAgICAgICAgICAgMCwgMCwgMCwgMCxcbiAgICAgICAgXSk7XG5cbiAgICBjb25zdCB0ZXh0dXJlID0gZ2wuY3JlYXRlVGV4dHVyZSgpO1xuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRleHR1cmUpO1xuXG4gICAgY29uc3QgbGV2ZWwgPSAwO1xuICAgIGNvbnN0IGludGVybmFsRm9ybWF0ID0gZ2wuUkdCQTtcbiAgICBjb25zdCB3aWR0aCA9IDI7XG4gICAgY29uc3QgaGVpZ2h0ID0gMjtcbiAgICBjb25zdCBib3JkZXIgPSAwO1xuICAgIGNvbnN0IHNyY0Zvcm1hdCA9IGdsLlJHQkE7XG4gICAgY29uc3Qgc3JjVHlwZSA9IGdsLlVOU0lHTkVEX0JZVEU7XG4gICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCBsZXZlbCwgaW50ZXJuYWxGb3JtYXQsXG4gICAgICAgIHdpZHRoLCBoZWlnaHQsIGJvcmRlciwgc3JjRm9ybWF0LCBzcmNUeXBlLFxuICAgICAgICBwaXhlbCk7XG5cbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgZ2wuTElORUFSX01JUE1BUF9MSU5FQVIpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5MSU5FQVIpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1MsIGdsLkNMQU1QX1RPX0VER0UpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1QsIGdsLkNMQU1QX1RPX0VER0UpO1xuXG4gICAgZ2wuZ2VuZXJhdGVNaXBtYXAoZ2wuVEVYVFVSRV8yRCk7XG5cbiAgICByZXR1cm4gdGV4dHVyZTtcbn0iLCJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVWQihnbCkge1xuICAgIGNvbnN0IHBvc2l0aW9uQnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHBvc2l0aW9uQnVmZmVyKTtcbiAgICBjb25zdCBwb3NpdGlvbnMgPSBbXG4gICAgICAgIC0xLjAsIDEuMCxcbiAgICAgICAgMS4wLCAxLjAsXG4gICAgICAgIC0xLjAsIC0xLjAsXG4gICAgICAgIDEuMCwgLTEuMCxcbiAgICBdO1xuXG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsXG4gICAgICAgIG5ldyBGbG9hdDMyQXJyYXkocG9zaXRpb25zKSxcbiAgICAgICAgZ2wuU1RBVElDX0RSQVcpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcG9zaXRpb246IHBvc2l0aW9uQnVmZmVyLFxuICAgIH07XG59Il0sInNvdXJjZVJvb3QiOiIifQ==