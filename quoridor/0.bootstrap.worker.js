self["webpackChunk"]([0],{

/***/ "../pkg/quoridor_wasm.js":
/*!*******************************!*\
  !*** ../pkg/quoridor_wasm.js ***!
  \*******************************/
/*! exports provided: Direction, WallState, Orientation, AiKind, Ai, Game, Location, __wbindgen_json_parse, __wbindgen_json_serialize, __wbindgen_object_drop_ref, __wbindgen_throw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _quoridor_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./quoridor_wasm_bg.wasm */ \"../pkg/quoridor_wasm_bg.wasm\");\n/* harmony import */ var _quoridor_wasm_bg_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./quoridor_wasm_bg.js */ \"../pkg/quoridor_wasm_bg.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Direction\", function() { return _quoridor_wasm_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"Direction\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"WallState\", function() { return _quoridor_wasm_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"WallState\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Orientation\", function() { return _quoridor_wasm_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"Orientation\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"AiKind\", function() { return _quoridor_wasm_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"AiKind\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Ai\", function() { return _quoridor_wasm_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"Ai\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Game\", function() { return _quoridor_wasm_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"Game\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Location\", function() { return _quoridor_wasm_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"Location\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_json_parse\", function() { return _quoridor_wasm_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbindgen_json_parse\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_json_serialize\", function() { return _quoridor_wasm_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbindgen_json_serialize\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_object_drop_ref\", function() { return _quoridor_wasm_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbindgen_object_drop_ref\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_throw\", function() { return _quoridor_wasm_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbindgen_throw\"]; });\n\n\n\n\n//# sourceURL=webpack:///../pkg/quoridor_wasm.js?");

/***/ }),

/***/ "../pkg/quoridor_wasm_bg.js":
/*!**********************************!*\
  !*** ../pkg/quoridor_wasm_bg.js ***!
  \**********************************/
/*! exports provided: Direction, WallState, Orientation, AiKind, Ai, Game, Location, __wbindgen_json_parse, __wbindgen_json_serialize, __wbindgen_object_drop_ref, __wbindgen_throw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Direction\", function() { return Direction; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"WallState\", function() { return WallState; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Orientation\", function() { return Orientation; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AiKind\", function() { return AiKind; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Ai\", function() { return Ai; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Game\", function() { return Game; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Location\", function() { return Location; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_json_parse\", function() { return __wbindgen_json_parse; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_json_serialize\", function() { return __wbindgen_json_serialize; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_object_drop_ref\", function() { return __wbindgen_object_drop_ref; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_throw\", function() { return __wbindgen_throw; });\n/* harmony import */ var _quoridor_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./quoridor_wasm_bg.wasm */ \"../pkg/quoridor_wasm_bg.wasm\");\n\n\nconst lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;\n\nlet cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });\n\ncachedTextDecoder.decode();\n\nlet cachegetUint8Memory0 = null;\nfunction getUint8Memory0() {\n    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== _quoridor_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n        cachegetUint8Memory0 = new Uint8Array(_quoridor_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    }\n    return cachegetUint8Memory0;\n}\n\nfunction getStringFromWasm0(ptr, len) {\n    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));\n}\n\nconst heap = new Array(32).fill(undefined);\n\nheap.push(undefined, null, true, false);\n\nlet heap_next = heap.length;\n\nfunction addHeapObject(obj) {\n    if (heap_next === heap.length) heap.push(heap.length + 1);\n    const idx = heap_next;\n    heap_next = heap[idx];\n\n    heap[idx] = obj;\n    return idx;\n}\n\nfunction getObject(idx) { return heap[idx]; }\n\nlet WASM_VECTOR_LEN = 0;\n\nconst lTextEncoder = typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;\n\nlet cachedTextEncoder = new lTextEncoder('utf-8');\n\nconst encodeString = (typeof cachedTextEncoder.encodeInto === 'function'\n    ? function (arg, view) {\n    return cachedTextEncoder.encodeInto(arg, view);\n}\n    : function (arg, view) {\n    const buf = cachedTextEncoder.encode(arg);\n    view.set(buf);\n    return {\n        read: arg.length,\n        written: buf.length\n    };\n});\n\nfunction passStringToWasm0(arg, malloc, realloc) {\n\n    if (realloc === undefined) {\n        const buf = cachedTextEncoder.encode(arg);\n        const ptr = malloc(buf.length);\n        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);\n        WASM_VECTOR_LEN = buf.length;\n        return ptr;\n    }\n\n    let len = arg.length;\n    let ptr = malloc(len);\n\n    const mem = getUint8Memory0();\n\n    let offset = 0;\n\n    for (; offset < len; offset++) {\n        const code = arg.charCodeAt(offset);\n        if (code > 0x7F) break;\n        mem[ptr + offset] = code;\n    }\n\n    if (offset !== len) {\n        if (offset !== 0) {\n            arg = arg.slice(offset);\n        }\n        ptr = realloc(ptr, len, len = offset + arg.length * 3);\n        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);\n        const ret = encodeString(arg, view);\n\n        offset += ret.written;\n    }\n\n    WASM_VECTOR_LEN = offset;\n    return ptr;\n}\n\nlet cachegetInt32Memory0 = null;\nfunction getInt32Memory0() {\n    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== _quoridor_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n        cachegetInt32Memory0 = new Int32Array(_quoridor_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    }\n    return cachegetInt32Memory0;\n}\n\nfunction dropObject(idx) {\n    if (idx < 36) return;\n    heap[idx] = heap_next;\n    heap_next = idx;\n}\n\nfunction takeObject(idx) {\n    const ret = getObject(idx);\n    dropObject(idx);\n    return ret;\n}\n/**\n*/\nconst Direction = Object.freeze({ Up:0,\"0\":\"Up\",Down:1,\"1\":\"Down\",Left:2,\"2\":\"Left\",Right:3,\"3\":\"Right\", });\n/**\n*/\nconst WallState = Object.freeze({ Empty:0,\"0\":\"Empty\",Horizontal:1,\"1\":\"Horizontal\",Vertical:2,\"2\":\"Vertical\", });\n/**\n*/\nconst Orientation = Object.freeze({ Horizontal:0,\"0\":\"Horizontal\",Vertical:1,\"1\":\"Vertical\", });\n/**\n*/\nconst AiKind = Object.freeze({ Greedy:0,\"0\":\"Greedy\",Rubot:1,\"1\":\"Rubot\", });\n/**\n*/\nclass Ai {\n\n    static __wrap(ptr) {\n        const obj = Object.create(Ai.prototype);\n        obj.ptr = ptr;\n\n        return obj;\n    }\n\n    __destroy_into_raw() {\n        const ptr = this.ptr;\n        this.ptr = 0;\n\n        return ptr;\n    }\n\n    free() {\n        const ptr = this.__destroy_into_raw();\n        _quoridor_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_ai_free\"](ptr);\n    }\n    /**\n    */\n    constructor() {\n        var ret = _quoridor_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"ai_new\"]();\n        return Ai.__wrap(ret);\n    }\n    /**\n    */\n    set_greedy() {\n        _quoridor_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"ai_set_greedy\"](this.ptr);\n    }\n    /**\n    * @param {number} steps\n    */\n    set_rubot(steps) {\n        _quoridor_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"ai_set_rubot\"](this.ptr, steps);\n    }\n    /**\n    * @param {any} mov\n    */\n    send(mov) {\n        _quoridor_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"ai_send\"](this.ptr, addHeapObject(mov));\n    }\n    /**\n    * @returns {any}\n    */\n    receive() {\n        var ret = _quoridor_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"ai_receive\"](this.ptr);\n        return takeObject(ret);\n    }\n}\n/**\n*/\nclass Game {\n\n    static __wrap(ptr) {\n        const obj = Object.create(Game.prototype);\n        obj.ptr = ptr;\n\n        return obj;\n    }\n\n    __destroy_into_raw() {\n        const ptr = this.ptr;\n        this.ptr = 0;\n\n        return ptr;\n    }\n\n    free() {\n        const ptr = this.__destroy_into_raw();\n        _quoridor_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_game_free\"](ptr);\n    }\n    /**\n    */\n    constructor() {\n        var ret = _quoridor_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"game_new\"]();\n        return Game.__wrap(ret);\n    }\n    /**\n    * @returns {Game}\n    */\n    copy() {\n        var ret = _quoridor_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"game_copy\"](this.ptr);\n        return Game.__wrap(ret);\n    }\n    /**\n    * @returns {number}\n    */\n    current_player() {\n        var ret = _quoridor_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"game_current_player\"](this.ptr);\n        return ret;\n    }\n    /**\n    * @param {number} player\n    * @returns {Location}\n    */\n    get_location(player) {\n        var ret = _quoridor_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"game_get_location\"](this.ptr, player);\n        return Location.__wrap(ret);\n    }\n    /**\n    * @param {number} player\n    * @returns {number}\n    */\n    available_walls(player) {\n        var ret = _quoridor_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"game_available_walls\"](this.ptr, player);\n        return ret;\n    }\n    /**\n    * @param {any} mov\n    * @returns {boolean}\n    */\n    apply_move(mov) {\n        var ret = _quoridor_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"game_apply_move\"](this.ptr, addHeapObject(mov));\n        return ret !== 0;\n    }\n    /**\n    * @param {number} player\n    * @returns {number}\n    */\n    distance_to_goal(player) {\n        var ret = _quoridor_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"game_distance_to_goal\"](this.ptr, player);\n        return ret;\n    }\n    /**\n    * @param {number} x\n    * @param {number} y\n    * @returns {number}\n    */\n    get_wall_status(x, y) {\n        var ret = _quoridor_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"game_get_wall_status\"](this.ptr, x, y);\n        return ret >>> 0;\n    }\n}\n/**\n*/\nclass Location {\n\n    static __wrap(ptr) {\n        const obj = Object.create(Location.prototype);\n        obj.ptr = ptr;\n\n        return obj;\n    }\n\n    __destroy_into_raw() {\n        const ptr = this.ptr;\n        this.ptr = 0;\n\n        return ptr;\n    }\n\n    free() {\n        const ptr = this.__destroy_into_raw();\n        _quoridor_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_location_free\"](ptr);\n    }\n    /**\n    * @returns {number}\n    */\n    get x() {\n        var ret = _quoridor_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_get_location_x\"](this.ptr);\n        return ret;\n    }\n    /**\n    * @param {number} arg0\n    */\n    set x(arg0) {\n        _quoridor_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_set_location_x\"](this.ptr, arg0);\n    }\n    /**\n    * @returns {number}\n    */\n    get y() {\n        var ret = _quoridor_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_get_location_y\"](this.ptr);\n        return ret;\n    }\n    /**\n    * @param {number} arg0\n    */\n    set y(arg0) {\n        _quoridor_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_set_location_y\"](this.ptr, arg0);\n    }\n}\n\nconst __wbindgen_json_parse = function(arg0, arg1) {\n    var ret = JSON.parse(getStringFromWasm0(arg0, arg1));\n    return addHeapObject(ret);\n};\n\nconst __wbindgen_json_serialize = function(arg0, arg1) {\n    const obj = getObject(arg1);\n    var ret = JSON.stringify(obj === undefined ? null : obj);\n    var ptr0 = passStringToWasm0(ret, _quoridor_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_malloc\"], _quoridor_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_realloc\"]);\n    var len0 = WASM_VECTOR_LEN;\n    getInt32Memory0()[arg0 / 4 + 1] = len0;\n    getInt32Memory0()[arg0 / 4 + 0] = ptr0;\n};\n\nconst __wbindgen_object_drop_ref = function(arg0) {\n    takeObject(arg0);\n};\n\nconst __wbindgen_throw = function(arg0, arg1) {\n    throw new Error(getStringFromWasm0(arg0, arg1));\n};\n\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../www/node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///../pkg/quoridor_wasm_bg.js?");

/***/ }),

/***/ "../pkg/quoridor_wasm_bg.wasm":
/*!************************************!*\
  !*** ../pkg/quoridor_wasm_bg.wasm ***!
  \************************************/
/*! exports provided: memory, __wbg_game_free, __wbg_location_free, __wbg_get_location_x, __wbg_set_location_x, __wbg_get_location_y, __wbg_set_location_y, __wbg_ai_free, ai_new, ai_set_greedy, ai_set_rubot, ai_send, ai_receive, game_new, game_copy, game_current_player, game_get_location, game_available_walls, game_apply_move, game_distance_to_goal, game_get_wall_status, __wbindgen_malloc, __wbindgen_realloc */
/***/ (function(module, exports, __webpack_require__) {

eval("\"use strict\";\n// Instantiate WebAssembly module\nvar wasmExports = __webpack_require__.w[module.i];\n__webpack_require__.r(exports);\n// export exports from WebAssembly module\nfor(var name in wasmExports) if(name != \"__webpack_init__\") exports[name] = wasmExports[name];\n// exec imports from WebAssembly module (for esm order)\n/* harmony import */ var m0 = __webpack_require__(/*! ./quoridor_wasm_bg.js */ \"../pkg/quoridor_wasm_bg.js\");\n\n\n// exec wasm module\nwasmExports[\"__webpack_init__\"]()\n\n//# sourceURL=webpack:///../pkg/quoridor_wasm_bg.wasm?");

/***/ }),

/***/ "./ai_worker.js":
/*!**********************!*\
  !*** ./ai_worker.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var quoridor_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! quoridor-wasm */ \"../pkg/quoridor_wasm.js\");\n\n\nlet ai = new quoridor_wasm__WEBPACK_IMPORTED_MODULE_0__[\"Ai\"]();\n\nonmessage = function(e) {\n    if (e.data.move) {\n        ai.send(e.data.move);\n        postMessage(ai.receive());\n    } else if (e.data.setMode == \"greedy\") {\n        ai.set_greedy()\n    } else if (e.data.setMode && e.data.setMode.rubot) {\n        ai.set_rubot(e.data.setMode.rubot)\n    }\n}\n  \n\n//# sourceURL=webpack:///./ai_worker.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(originalModule) {\n\tif (!originalModule.webpackPolyfill) {\n\t\tvar module = Object.create(originalModule);\n\t\t// module.parent = undefined by default\n\t\tif (!module.children) module.children = [];\n\t\tObject.defineProperty(module, \"loaded\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.l;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"id\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.i;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"exports\", {\n\t\t\tenumerable: true\n\t\t});\n\t\tmodule.webpackPolyfill = 1;\n\t}\n\treturn module;\n};\n\n\n//# sourceURL=webpack:///(webpack)/buildin/harmony-module.js?");

/***/ })

});