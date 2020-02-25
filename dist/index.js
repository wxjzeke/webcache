/*!
 * 
 * ********************************************************************
 * @ezekiel.wang/webcache v0.1.1
 * https://github.com/wxjzeke/webcache
 * Copyright (c) 2020 Ezekiel
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ********************************************************************
 */
var WebCache =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _addToCache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

var WebCache = (function () {
    function WebCache(name) {
        if (!WebCache.isSupport()) {
            throw new Error('Sorry! your browser does not support web cache.');
        }
        this.name = name;
    }
    WebCache.prototype.preload = function (url, options) {
        var _this = this;
        return caches
            .open(this.name)
            .then(function (cache) { return Object(_addToCache__WEBPACK_IMPORTED_MODULE_0__["addToCache"])(cache, url, options); })
            .then(function (blobUrl) {
            blobUrl && console.log("\"" + url + "\" added to [cache@" + _this.name + "]");
            return blobUrl;
        });
    };
    WebCache.prototype.match = function (url, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return caches
            .open(this.name)
            .then(function (cache) { return cache.match(url); })
            .then(function (res) { return (res ? res.blob() : Promise.resolve(undefined)); })
            .then(function (blob) { return blob && URL.createObjectURL(blob); })
            .then(function (blobUrl) {
            blobUrl && console.log("\"" + url + "\" found in [cache@" + _this.name + "]");
            return blobUrl;
        });
    };
    WebCache.prototype.matchOrPreload = function (url, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return this.match(url).then(function (blobUrl) {
            if (blobUrl) {
                var onProgress = options.onProgress, onDone = options.onDone;
                onProgress && onProgress(100);
                onDone && onDone();
                return blobUrl;
            }
            else {
                return _this.preload(url, options);
            }
        });
    };
    WebCache.isSupport = function () {
        return 'fetch' in window &&
            'caches' in window &&
            'ReadableStream' in window &&
            'Response' in window;
    };
    return WebCache;
}());
/* harmony default export */ __webpack_exports__["default"] = (WebCache);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addToCache", function() { return addToCache; });
var addToCache = function (cache, url, options) {
    if (options === void 0) { options = {}; }
    var onProgress = options.onProgress, onDone = options.onDone, onError = options.onError;
    return fetch(url)
        .then(function (res) {
        var contentLength = res.headers.get('content-length');
        if (!contentLength) {
            return;
        }
        if (!res.body) {
            return;
        }
        var loaded = 0;
        var total = parseInt(contentLength, 10);
        var reader = res.body.getReader();
        var stream = new ReadableStream({
            start: function (controller) {
                var read = function () {
                    reader
                        .read()
                        .then(function (_a) {
                        var done = _a.done, value = _a.value;
                        if (done) {
                            console.log('reader done');
                            controller.close();
                            onDone && onDone();
                            return;
                        }
                        controller.enqueue(value);
                        loaded += value.byteLength;
                        onProgress && onProgress(Math.round((loaded / total) * 100));
                        read();
                    })
                        .catch(function (error) {
                        console.error(error);
                        controller.error(error);
                        onError && onError(error);
                    });
                };
                read();
            }
        });
        var response = new Response(stream, { headers: res.headers });
        return cache
            .put(url, response.clone())
            .then(function () { return response.blob(); })
            .then(function (blob) { return URL.createObjectURL(blob); })
            .catch(console.error);
    })
        .catch(function (error) {
        onError && onError(error);
    });
};


/***/ })
/******/ ])["default"];