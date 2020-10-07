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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n\n\nvar R = typeof Reflect === 'object' ? Reflect : null\nvar ReflectApply = R && typeof R.apply === 'function'\n  ? R.apply\n  : function ReflectApply(target, receiver, args) {\n    return Function.prototype.apply.call(target, receiver, args);\n  }\n\nvar ReflectOwnKeys\nif (R && typeof R.ownKeys === 'function') {\n  ReflectOwnKeys = R.ownKeys\n} else if (Object.getOwnPropertySymbols) {\n  ReflectOwnKeys = function ReflectOwnKeys(target) {\n    return Object.getOwnPropertyNames(target)\n      .concat(Object.getOwnPropertySymbols(target));\n  };\n} else {\n  ReflectOwnKeys = function ReflectOwnKeys(target) {\n    return Object.getOwnPropertyNames(target);\n  };\n}\n\nfunction ProcessEmitWarning(warning) {\n  if (console && console.warn) console.warn(warning);\n}\n\nvar NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {\n  return value !== value;\n}\n\nfunction EventEmitter() {\n  EventEmitter.init.call(this);\n}\nmodule.exports = EventEmitter;\nmodule.exports.once = once;\n\n// Backwards-compat with node 0.10.x\nEventEmitter.EventEmitter = EventEmitter;\n\nEventEmitter.prototype._events = undefined;\nEventEmitter.prototype._eventsCount = 0;\nEventEmitter.prototype._maxListeners = undefined;\n\n// By default EventEmitters will print a warning if more than 10 listeners are\n// added to it. This is a useful default which helps finding memory leaks.\nvar defaultMaxListeners = 10;\n\nfunction checkListener(listener) {\n  if (typeof listener !== 'function') {\n    throw new TypeError('The \"listener\" argument must be of type Function. Received type ' + typeof listener);\n  }\n}\n\nObject.defineProperty(EventEmitter, 'defaultMaxListeners', {\n  enumerable: true,\n  get: function() {\n    return defaultMaxListeners;\n  },\n  set: function(arg) {\n    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {\n      throw new RangeError('The value of \"defaultMaxListeners\" is out of range. It must be a non-negative number. Received ' + arg + '.');\n    }\n    defaultMaxListeners = arg;\n  }\n});\n\nEventEmitter.init = function() {\n\n  if (this._events === undefined ||\n      this._events === Object.getPrototypeOf(this)._events) {\n    this._events = Object.create(null);\n    this._eventsCount = 0;\n  }\n\n  this._maxListeners = this._maxListeners || undefined;\n};\n\n// Obviously not all Emitters should be limited to 10. This function allows\n// that to be increased. Set to zero for unlimited.\nEventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {\n  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {\n    throw new RangeError('The value of \"n\" is out of range. It must be a non-negative number. Received ' + n + '.');\n  }\n  this._maxListeners = n;\n  return this;\n};\n\nfunction _getMaxListeners(that) {\n  if (that._maxListeners === undefined)\n    return EventEmitter.defaultMaxListeners;\n  return that._maxListeners;\n}\n\nEventEmitter.prototype.getMaxListeners = function getMaxListeners() {\n  return _getMaxListeners(this);\n};\n\nEventEmitter.prototype.emit = function emit(type) {\n  var args = [];\n  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);\n  var doError = (type === 'error');\n\n  var events = this._events;\n  if (events !== undefined)\n    doError = (doError && events.error === undefined);\n  else if (!doError)\n    return false;\n\n  // If there is no 'error' event listener then throw.\n  if (doError) {\n    var er;\n    if (args.length > 0)\n      er = args[0];\n    if (er instanceof Error) {\n      // Note: The comments on the `throw` lines are intentional, they show\n      // up in Node's output if this results in an unhandled exception.\n      throw er; // Unhandled 'error' event\n    }\n    // At least give some kind of context to the user\n    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));\n    err.context = er;\n    throw err; // Unhandled 'error' event\n  }\n\n  var handler = events[type];\n\n  if (handler === undefined)\n    return false;\n\n  if (typeof handler === 'function') {\n    ReflectApply(handler, this, args);\n  } else {\n    var len = handler.length;\n    var listeners = arrayClone(handler, len);\n    for (var i = 0; i < len; ++i)\n      ReflectApply(listeners[i], this, args);\n  }\n\n  return true;\n};\n\nfunction _addListener(target, type, listener, prepend) {\n  var m;\n  var events;\n  var existing;\n\n  checkListener(listener);\n\n  events = target._events;\n  if (events === undefined) {\n    events = target._events = Object.create(null);\n    target._eventsCount = 0;\n  } else {\n    // To avoid recursion in the case that type === \"newListener\"! Before\n    // adding it to the listeners, first emit \"newListener\".\n    if (events.newListener !== undefined) {\n      target.emit('newListener', type,\n                  listener.listener ? listener.listener : listener);\n\n      // Re-assign `events` because a newListener handler could have caused the\n      // this._events to be assigned to a new object\n      events = target._events;\n    }\n    existing = events[type];\n  }\n\n  if (existing === undefined) {\n    // Optimize the case of one listener. Don't need the extra array object.\n    existing = events[type] = listener;\n    ++target._eventsCount;\n  } else {\n    if (typeof existing === 'function') {\n      // Adding the second element, need to change to array.\n      existing = events[type] =\n        prepend ? [listener, existing] : [existing, listener];\n      // If we've already got an array, just append.\n    } else if (prepend) {\n      existing.unshift(listener);\n    } else {\n      existing.push(listener);\n    }\n\n    // Check for listener leak\n    m = _getMaxListeners(target);\n    if (m > 0 && existing.length > m && !existing.warned) {\n      existing.warned = true;\n      // No error code for this since it is a Warning\n      // eslint-disable-next-line no-restricted-syntax\n      var w = new Error('Possible EventEmitter memory leak detected. ' +\n                          existing.length + ' ' + String(type) + ' listeners ' +\n                          'added. Use emitter.setMaxListeners() to ' +\n                          'increase limit');\n      w.name = 'MaxListenersExceededWarning';\n      w.emitter = target;\n      w.type = type;\n      w.count = existing.length;\n      ProcessEmitWarning(w);\n    }\n  }\n\n  return target;\n}\n\nEventEmitter.prototype.addListener = function addListener(type, listener) {\n  return _addListener(this, type, listener, false);\n};\n\nEventEmitter.prototype.on = EventEmitter.prototype.addListener;\n\nEventEmitter.prototype.prependListener =\n    function prependListener(type, listener) {\n      return _addListener(this, type, listener, true);\n    };\n\nfunction onceWrapper() {\n  if (!this.fired) {\n    this.target.removeListener(this.type, this.wrapFn);\n    this.fired = true;\n    if (arguments.length === 0)\n      return this.listener.call(this.target);\n    return this.listener.apply(this.target, arguments);\n  }\n}\n\nfunction _onceWrap(target, type, listener) {\n  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };\n  var wrapped = onceWrapper.bind(state);\n  wrapped.listener = listener;\n  state.wrapFn = wrapped;\n  return wrapped;\n}\n\nEventEmitter.prototype.once = function once(type, listener) {\n  checkListener(listener);\n  this.on(type, _onceWrap(this, type, listener));\n  return this;\n};\n\nEventEmitter.prototype.prependOnceListener =\n    function prependOnceListener(type, listener) {\n      checkListener(listener);\n      this.prependListener(type, _onceWrap(this, type, listener));\n      return this;\n    };\n\n// Emits a 'removeListener' event if and only if the listener was removed.\nEventEmitter.prototype.removeListener =\n    function removeListener(type, listener) {\n      var list, events, position, i, originalListener;\n\n      checkListener(listener);\n\n      events = this._events;\n      if (events === undefined)\n        return this;\n\n      list = events[type];\n      if (list === undefined)\n        return this;\n\n      if (list === listener || list.listener === listener) {\n        if (--this._eventsCount === 0)\n          this._events = Object.create(null);\n        else {\n          delete events[type];\n          if (events.removeListener)\n            this.emit('removeListener', type, list.listener || listener);\n        }\n      } else if (typeof list !== 'function') {\n        position = -1;\n\n        for (i = list.length - 1; i >= 0; i--) {\n          if (list[i] === listener || list[i].listener === listener) {\n            originalListener = list[i].listener;\n            position = i;\n            break;\n          }\n        }\n\n        if (position < 0)\n          return this;\n\n        if (position === 0)\n          list.shift();\n        else {\n          spliceOne(list, position);\n        }\n\n        if (list.length === 1)\n          events[type] = list[0];\n\n        if (events.removeListener !== undefined)\n          this.emit('removeListener', type, originalListener || listener);\n      }\n\n      return this;\n    };\n\nEventEmitter.prototype.off = EventEmitter.prototype.removeListener;\n\nEventEmitter.prototype.removeAllListeners =\n    function removeAllListeners(type) {\n      var listeners, events, i;\n\n      events = this._events;\n      if (events === undefined)\n        return this;\n\n      // not listening for removeListener, no need to emit\n      if (events.removeListener === undefined) {\n        if (arguments.length === 0) {\n          this._events = Object.create(null);\n          this._eventsCount = 0;\n        } else if (events[type] !== undefined) {\n          if (--this._eventsCount === 0)\n            this._events = Object.create(null);\n          else\n            delete events[type];\n        }\n        return this;\n      }\n\n      // emit removeListener for all listeners on all events\n      if (arguments.length === 0) {\n        var keys = Object.keys(events);\n        var key;\n        for (i = 0; i < keys.length; ++i) {\n          key = keys[i];\n          if (key === 'removeListener') continue;\n          this.removeAllListeners(key);\n        }\n        this.removeAllListeners('removeListener');\n        this._events = Object.create(null);\n        this._eventsCount = 0;\n        return this;\n      }\n\n      listeners = events[type];\n\n      if (typeof listeners === 'function') {\n        this.removeListener(type, listeners);\n      } else if (listeners !== undefined) {\n        // LIFO order\n        for (i = listeners.length - 1; i >= 0; i--) {\n          this.removeListener(type, listeners[i]);\n        }\n      }\n\n      return this;\n    };\n\nfunction _listeners(target, type, unwrap) {\n  var events = target._events;\n\n  if (events === undefined)\n    return [];\n\n  var evlistener = events[type];\n  if (evlistener === undefined)\n    return [];\n\n  if (typeof evlistener === 'function')\n    return unwrap ? [evlistener.listener || evlistener] : [evlistener];\n\n  return unwrap ?\n    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);\n}\n\nEventEmitter.prototype.listeners = function listeners(type) {\n  return _listeners(this, type, true);\n};\n\nEventEmitter.prototype.rawListeners = function rawListeners(type) {\n  return _listeners(this, type, false);\n};\n\nEventEmitter.listenerCount = function(emitter, type) {\n  if (typeof emitter.listenerCount === 'function') {\n    return emitter.listenerCount(type);\n  } else {\n    return listenerCount.call(emitter, type);\n  }\n};\n\nEventEmitter.prototype.listenerCount = listenerCount;\nfunction listenerCount(type) {\n  var events = this._events;\n\n  if (events !== undefined) {\n    var evlistener = events[type];\n\n    if (typeof evlistener === 'function') {\n      return 1;\n    } else if (evlistener !== undefined) {\n      return evlistener.length;\n    }\n  }\n\n  return 0;\n}\n\nEventEmitter.prototype.eventNames = function eventNames() {\n  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];\n};\n\nfunction arrayClone(arr, n) {\n  var copy = new Array(n);\n  for (var i = 0; i < n; ++i)\n    copy[i] = arr[i];\n  return copy;\n}\n\nfunction spliceOne(list, index) {\n  for (; index + 1 < list.length; index++)\n    list[index] = list[index + 1];\n  list.pop();\n}\n\nfunction unwrapListeners(arr) {\n  var ret = new Array(arr.length);\n  for (var i = 0; i < ret.length; ++i) {\n    ret[i] = arr[i].listener || arr[i];\n  }\n  return ret;\n}\n\nfunction once(emitter, name) {\n  return new Promise(function (resolve, reject) {\n    function eventListener() {\n      if (errorListener !== undefined) {\n        emitter.removeListener('error', errorListener);\n      }\n      resolve([].slice.call(arguments));\n    };\n    var errorListener;\n\n    // Adding an error listener is not optional because\n    // if an error is thrown on an event emitter we cannot\n    // guarantee that the actual event we are waiting will\n    // be fired. The result could be a silent way to create\n    // memory or file descriptor leaks, which is something\n    // we should avoid.\n    if (name !== 'error') {\n      errorListener = function errorListener(err) {\n        emitter.removeListener(name, eventListener);\n        reject(err);\n      };\n\n      emitter.once('error', errorListener);\n    }\n\n    emitter.once(name, eventListener);\n  });\n}\n\n\n//# sourceURL=webpack:///./node_modules/events/events.js?");

/***/ }),

/***/ "./src/DOM/ModalForms/modalProject.js":
/*!********************************************!*\
  !*** ./src/DOM/ModalForms/modalProject.js ***!
  \********************************************/
/*! exports provided: renderModalProject, emitterProj */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"renderModalProject\", function() { return renderModalProject; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"emitterProj\", function() { return emitterProj; });\n\r\nconst EventEmitter = __webpack_require__(/*! events */ \"./node_modules/events/events.js\")\r\nconst emitterProj = new EventEmitter\r\n\r\nconst renderModalProject = (() => {\r\n    // Get modal element\r\n    const modalProj = document.querySelector(\"#modalProj\")\r\n    // Get modal form \r\n    const modalFormProj = document.querySelector(\".modalFormProj\")\r\n    // Get open button \r\n    const openBtnProj = document.querySelector(\"#modalBtnProj\")\r\n    // Get close button\r\n    const closeBtnProj = document.querySelector(\"#closeBtnProj\")\r\n    // Get modal submit button\r\n    const submitBtnProj = document.querySelector(\"#submitBtnProj\")\r\n\r\n    // Listen for open click \r\n    openBtnProj.addEventListener(\"click\", openModalProj)\r\n    // Listen for close click \r\n    closeBtnProj.addEventListener(\"click\", closeModalProj)\r\n    // Listen for outside click\r\n    window.addEventListener(\"click\", outsideClickProj)\r\n    // Listen for submit click\r\n    submitBtnProj.addEventListener(\"click\", submitModalProj)\r\n\r\n    // Function to open modal\r\n    function openModalProj() {\r\n        modalProj.style.display = \"block\"\r\n    } \r\n\r\n    // Function to close modal\r\n    function closeModalProj(){\r\n        modalProj.style.display = \"none\"\r\n        modalFormProj.reset()\r\n    }\r\n\r\n    // Function to close modal if outside click \r\n    function outsideClickProj(e) {\r\n        if(e.target == modalProj) closeModalProj()\r\n    }\r\n\r\n    // Function to submit modal form and create new book\r\n    function submitModalProj(){\r\n        let title = document.querySelector(\"#titleInputProj\").value\r\n        emitterProj.emit(\"submitproj\", title)\r\n        closeModalProj()\r\n    }\r\n\r\n    return {openModalProj}\r\n})()\r\n\r\n\n\n//# sourceURL=webpack:///./src/DOM/ModalForms/modalProject.js?");

/***/ }),

/***/ "./src/DOM/ModalForms/modalTask.js":
/*!*****************************************!*\
  !*** ./src/DOM/ModalForms/modalTask.js ***!
  \*****************************************/
/*! exports provided: renderModalTask */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"renderModalTask\", function() { return renderModalTask; });\nconst renderModalTask = () => {\r\n    // Get modal element\r\n    const modalTask = document.querySelector(\"#modalTask\")\r\n    // Get modal form \r\n    const modalFormTask = document.querySelector(\".modalFormTask\")\r\n    // Get open button \r\n    const openBtnTask = document.querySelector(\"#modalBtnTask\")\r\n    // Get close button\r\n    const closeBtnTask = document.querySelector(\"#closeBtnTask\")\r\n    // Get modal submit button\r\n    const submitBtnTask = document.querySelector(\"#submitBtnTask\")\r\n\r\n    // Listen for open click \r\n    openBtnTask.addEventListener(\"click\", openModalTask)\r\n    // Listen for close click \r\n    closeBtnTask.addEventListener(\"click\", closeModalTask)\r\n    // Listen for outside click\r\n    window.addEventListener(\"click\", outsideClickTask)\r\n    // Listen for submit click\r\n    submitBtnTask.addEventListener(\"click\", submitModalTask)\r\n\r\n    // Function to open modal\r\n    function openModalTask() {\r\n        modalTask.style.display = \"block\"\r\n    } \r\n\r\n    // Function to close modal\r\n    function closeModalTask(){\r\n        modalTask.style.display = \"none\"\r\n        modalFormTask.reset()\r\n    }\r\n\r\n    // Function to close modal if outside click \r\n    function outsideClickTask(e) {\r\n        if(e.target == modalTask) closeModalTask()\r\n    }\r\n\r\n    // Function to submit modal form and create new book\r\n    function submitModalTask(){\r\n        let title = document.querySelector(\"#title-input-task\").value\r\n        let desc = document.querySelector(\"#desc-input\").value\r\n        let date = document.querySelector(\"#date-input\").value\r\n        let priority = document.querySelector(\"input[name='priority']:checked\").value\r\n        let notes = document.querySelector(\"#notes-input\").value\r\n        console.log(title)\r\n        console.log(desc)\r\n        console.log(date)\r\n        console.log(priority)\r\n        console.log(notes)\r\n        if (!title || !desc || !date || !priority) return\r\n        // let book = new Book(title, author, pages, read)\r\n        // addBookToLibrary(book)\r\n        // render()\r\n        closeModalTask()\r\n    }\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/DOM/ModalForms/modalTask.js?");

/***/ }),

/***/ "./src/DOM/domController.js":
/*!**********************************!*\
  !*** ./src/DOM/domController.js ***!
  \**********************************/
/*! exports provided: domController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"domController\", function() { return domController; });\n/* harmony import */ var _ModalForms_modalProject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ModalForms/modalProject */ \"./src/DOM/ModalForms/modalProject.js\");\n/* harmony import */ var _ModalForms_modalTask__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ModalForms/modalTask */ \"./src/DOM/ModalForms/modalTask.js\");\n/* harmony import */ var _Logic_logicController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Logic/logicController */ \"./src/Logic/logicController.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nconst domController = (() => {\r\n    const contentProj = document.querySelector(\"#contentProj\")\r\n\r\n    const addProjBtn = document.querySelector(\"#modalBtnProj\")\r\n    const addTaskBtn = document.querySelector(\"#modalBtnTask\")\r\n\r\n    const render = () => {\r\n        renderProjects()\r\n        addProjBtn.addEventListener(\"click\", addProject)\r\n    }\r\n\r\n    const addProject = () => {\r\n        _ModalForms_modalProject__WEBPACK_IMPORTED_MODULE_0__[\"renderModalProject\"].openModalProj()\r\n    }\r\n\r\n    const removeAllProjects = () => {\r\n        const divProj = document.querySelectorAll(\".project\")\r\n        divProj.forEach(p =>  p.remove())\r\n    }\r\n\r\n    const deleteProject = (index) => {\r\n        _Logic_logicController__WEBPACK_IMPORTED_MODULE_2__[\"logicController\"].removeProject(index)\r\n        renderProjects()\r\n    }\r\n\r\n    const editProject = (title, index) => {\r\n        // open modal proj edit\r\n        renderProjects()\r\n    }\r\n\r\n    _ModalForms_modalProject__WEBPACK_IMPORTED_MODULE_0__[\"emitterProj\"].on(\"submitproj\", (title) => {\r\n        console.log(title)\r\n        _Logic_logicController__WEBPACK_IMPORTED_MODULE_2__[\"logicController\"].addProject(\"A\")\r\n        _Logic_logicController__WEBPACK_IMPORTED_MODULE_2__[\"logicController\"].addProject(\"B\")\r\n        _Logic_logicController__WEBPACK_IMPORTED_MODULE_2__[\"logicController\"].addProject(\"C\")\r\n        renderProjects()\r\n    })\r\n\r\n    const renderProjects = () => {\r\n        if (_Logic_logicController__WEBPACK_IMPORTED_MODULE_2__[\"logicController\"].getProjects().length == 0) return \r\n        removeAllProjects()\r\n\r\n        _Logic_logicController__WEBPACK_IMPORTED_MODULE_2__[\"logicController\"].getProjects().forEach((proj, index) => {\r\n            const containerProj = document.createElement(\"div\") \r\n            containerProj.classList.add(\"project\")\r\n\r\n            const titleProj = document.createElement(\"div\")\r\n            titleProj.classList.add(\"titleProject\")\r\n            titleProj.innerText = proj.title\r\n            containerProj.appendChild(titleProj)\r\n\r\n            const editProj = document.createElement(\"div\")\r\n            editProj.classList.add(\"editProject\")\r\n            editProj.innerText = \"edit\"\r\n            editProj.addEventListener(\"click\", editProject)\r\n            containerProj.appendChild(editProj)\r\n\r\n            const deleteProj = document.createElement(\"div\")\r\n            deleteProj.classList.add(\"deleteProject\")\r\n            deleteProj.innerText = \"delete\"\r\n            deleteProj.addEventListener(\"click\", () => deleteProject(index))\r\n            containerProj.appendChild(deleteProj)\r\n\r\n            contentProj.appendChild(containerProj)\r\n\r\n        })\r\n    } \r\n\r\n    return {render}\r\n})()\r\n\r\n\n\n//# sourceURL=webpack:///./src/DOM/domController.js?");

/***/ }),

/***/ "./src/Logic/factory.js":
/*!******************************!*\
  !*** ./src/Logic/factory.js ***!
  \******************************/
/*! exports provided: projectFactory, taskFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"projectFactory\", function() { return projectFactory; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"taskFactory\", function() { return taskFactory; });\nconst projectFactory = (title) => {\r\n    let tasks = []\r\n    return {title}\r\n}\r\n\r\nconst taskFactory = (title, desc, date, priority, notes) => {\r\n    return {title, desc, date, priority, notes}\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./src/Logic/factory.js?");

/***/ }),

/***/ "./src/Logic/logicController.js":
/*!**************************************!*\
  !*** ./src/Logic/logicController.js ***!
  \**************************************/
/*! exports provided: logicController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"logicController\", function() { return logicController; });\n/* harmony import */ var _factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./factory */ \"./src/Logic/factory.js\");\n\r\n\r\n\r\nconst logicController = (() => {\r\n    let projects = []\r\n    let currentProj\r\n    let currentTask\r\n\r\n    const addProject = (title) => {\r\n        projects.push(Object(_factory__WEBPACK_IMPORTED_MODULE_0__[\"projectFactory\"])(title))\r\n    }\r\n\r\n    const removeProject = (index) => {\r\n        projects.splice(index, 1)\r\n    }\r\n\r\n    const getProjects = () => projects\r\n\r\n    const editProjects = (title, index) => {\r\n        projects[index].title = title //Need to use setter?\r\n\r\n    }\r\n    \r\n    const addTask = (pindex, title, desc, date, priority, notes) => {\r\n        projects[pindex].tasks.push(Object(_factory__WEBPACK_IMPORTED_MODULE_0__[\"taskFactory\"])(title, desc, date, priority, notes))\r\n    }\r\n\r\n    const removeTask = (pindex, tindex) => {\r\n        projects[pindex].tasks.splice(tindex, 1)\r\n    }\r\n\r\n    // Get tasks\r\n\r\n    const editTask = (pindex, tindex, title, desc, date, priority, notes) => {\r\n        projects[pindex].tasks[tindex].title = title\r\n        projects[pindex].tasks[tindex].desc = desc\r\n        projects[pindex].tasks[tindex].notes = notes\r\n        projects[pindex].tasks[tindex].date = date\r\n        projects[pindex].tasks[tindex].priority = priority\r\n    }\r\n\r\n    return {\r\n        addProject,\r\n        removeProject,\r\n        getProjects,\r\n        editProjects,\r\n        addTask,\r\n        removeTask,\r\n        editTask\r\n    }\r\n})()\r\n\r\n\n\n//# sourceURL=webpack:///./src/Logic/logicController.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _DOM_domController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOM/domController */ \"./src/DOM/domController.js\");\n\r\n\r\n_DOM_domController__WEBPACK_IMPORTED_MODULE_0__[\"domController\"].render()\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });