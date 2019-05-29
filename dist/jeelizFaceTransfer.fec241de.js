// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../../../../.config/yarn/global/node_modules/base64-js/index.js":[function(require,module,exports) {
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  for (var i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],"../../../../.config/yarn/global/node_modules/ieee754/index.js":[function(require,module,exports) {
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],"../../../../.config/yarn/global/node_modules/isarray/index.js":[function(require,module,exports) {
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],"../../../../.config/yarn/global/node_modules/buffer/index.js":[function(require,module,exports) {

var global = arguments[3];
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var isArray = require('isarray')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

},{"base64-js":"../../../../.config/yarn/global/node_modules/base64-js/index.js","ieee754":"../../../../.config/yarn/global/node_modules/ieee754/index.js","isarray":"../../../../.config/yarn/global/node_modules/isarray/index.js","buffer":"../../../../.config/yarn/global/node_modules/buffer/index.js"}],"jeelizFaceTransfer.js":[function(require,module,exports) {
var Buffer = require("buffer").Buffer;
/**
* Jeeliz Weboji - https://github.com/jeeliz/jeelizWeboji
*
* Copyright 2018 Jeeliz ( https://jeeliz.com )
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var JEEFACETRANSFERAPI = function () {
  function ja(b) {
    var c = new XMLHttpRequest();
    c.open("GET", _a.Sa + _a.save, !0);
    c.withCredentials = !1;

    c.onreadystatechange = function () {
      4 === c.readyState && 200 === c.status && b(c.responseText);
    };

    c.send();
  }

  function wa() {
    var b = _a.wb,
        c = Array(b),
        e;

    for (e = 0; e < b; ++e) {
      c[e] = 0;
    }

    return c;
  }

  function za(b, c, e) {
    b = Math.min(Math.max((e - b) / (c - b), 0), 1);
    return b * b * (3 - 2 * b);
  }

  function Aa(b, c, e) {
    return Math.min(Math.max((e - b) / (c - b), 0), 1);
  }

  function Ca(b, c, e, g) {
    return Math.pow(Math.min(Math.max((g - b) / (c - b), 0), 1), e);
  }

  function Ea(b) {
    switch (b) {
      case "relu":
        return "gl_FragColor=max(vec4(0.,0.,0.,0.),gl_FragColor);";

      case "elu":
        return "gl_FragColor=mix(exp(-abs(gl_FragColor))-vec4(1.,1.,1.,1.),gl_FragColor,step(0.,gl_FragColor));";

      case "elu01":
        return "gl_FragColor=mix(0.1*exp(-abs(gl_FragColor))-vec4(0.1,0.1,0.1,0.1),gl_FragColor,step(0.,gl_FragColor));";

      case "arctan":
        return "gl_FragColor=atan(3.14159265359*texture2D(u0,vUV))/3.14159265359;";

      case "copy":
        return "";

      default:
        return !1;
    }
  }

  function Ha(b, c) {
    var e = c % 8;
    return b[(c - e) / 8] >> 7 - e & 1;
  }

  function Ia(b) {
    var c = JSON.parse(b);
    b = c.ne;
    var e = c.nf,
        g = c.n,
        l = "undefined" === typeof btoa ? Buffer.from(c.data, "base64").toString("latin1") : atob(c.data),
        h = l.length,
        t;
    c = new Uint8Array(h);

    for (t = 0; t < h; ++t) {
      c[t] = l.charCodeAt(t);
    }

    l = new Float32Array(g);
    h = new Float32Array(e);
    t = b + e + 1;
    var n, k;

    for (n = 0; n < g; ++n) {
      var m = t * n;
      var u = 0 === Ha(c, m) ? 1 : -1;
      var w = m + 1;
      var C = 1,
          I = 0;

      for (k = w + b - 1; k >= w; --k) {
        I += C * Ha(c, k), C *= 2;
      }

      k = I;
      w = c;
      C = m + 1 + b;
      I = h;
      var E = 0,
          M = I.length;

      for (m = C; m < C + M; ++m) {
        I[E] = Ha(w, m), ++E;
      }

      for (m = w = 0; m < e; ++m) {
        w += h[m] * Math.pow(2, -m - 1);
      }

      u = 0 === w && 0 === k ? 0 : u * (1 + w) * Math.pow(2, 1 + k - Math.pow(2, b - 1));
      l[n] = u;
    }

    return l;
  }

  var v = function () {
    function b(f, x) {
      f = q.createShader(f);
      q.shaderSource(f, x);
      q.compileShader(f);
      return q.getShaderParameter(f, q.COMPILE_STATUS) ? f : !1;
    }

    function c(f, x) {
      f = b(q.VERTEX_SHADER, f);
      x = b(q.FRAGMENT_SHADER, x);
      var z = q.createProgram();
      q.attachShader(z, f);
      q.attachShader(z, x);
      q.linkProgram(z);
      return z;
    }

    function e(f) {
      void 0 === f.$ && (f.$ = "precision lowp float;attribute vec2 a0;varying vec2 vv0;void main(){gl_Position=vec4(a0,0.,1.),vv0=a0*.5+vec2(.5,.5);}");
      void 0 === f.ca && (f.ca = ["a0"]);
      void 0 === f.U && (f.U = [2]);
      if (void 0 === f.precision || "highp" === f.precision) f.precision = k;
      f.id = t++;
      void 0 !== f.Tc && f.Tc.forEach(function (z, ba) {
        f.c = f.c.replace(z, f.pa[ba]);
      });
      f.Ra = 0;
      f.U.forEach(function (z) {
        f.Ra += 4 * z;
      });
      f.oa = c(f.$, "precision " + f.precision + " float;\n" + f.c);
      f.l = {};
      f.f.forEach(function (z) {
        f.l[z] = q.getUniformLocation(f.oa, z);
      });
      f.attributes = {};
      f.V = [];
      f.ca.forEach(function (z) {
        var ba = q.getAttribLocation(f.oa, z);
        f.attributes[z] = ba;
        f.V.push(ba);
      });

      if (f.h) {
        q.useProgram(f.oa);
        h = f;
        l = f.id;

        for (var x in f.h) {
          q.uniform1i(f.l[x], f.h[x]);
        }
      }

      f.Jd = !0;
    }

    function g(f) {
      Ja.Zc(N);
      l !== f.id && (N.S(), l = f.id, h = f, q.useProgram(f.oa), f.V.forEach(function (x) {
        0 !== x && q.enableVertexAttribArray(x);
      }));
    }

    var l = -1,
        h = !1,
        t = 0,
        n = !1,
        k = "highp",
        m = ["u1"],
        u = ["u0"],
        w = {
      u1: 0
    },
        C = {
      u0: 0
    },
        I = {
      u1: 0,
      u2: 1
    },
        E = {
      u3: 0
    },
        M = {
      s0: {
        c: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
        f: m,
        h: w
      },
      s1: {
        c: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
        f: m,
        h: w,
        precision: "lowp"
      },
      s2: {
        c: "uniform sampler2D u1,u2;varying vec2 vv0;void main(){vec4 a=texture2D(u2,vv0),b=texture2D(u1,vv0);gl_FragColor=a*b;}",
        f: ["u1", "u2"],
        h: I
      },
      s3: {
        c: "uniform sampler2D u1;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=a.r*f;}",
        f: m,
        h: w
      },
      s4: {
        c: "uniform sampler2D u1,u2;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u2,vv0),b=texture2D(u1,vv0);gl_FragColor=a.a*b.r*f;}",
        f: ["u1", "mask"],
        h: I
      },
      s5: {
        c: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vec2(1.-vv0.x,vv0.y));}",
        f: m,
        h: w
      },
      s6: {
        c: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vec2(vv0.x,1.-vv0.y));}",
        f: m,
        h: w
      },
      s7: {
        c: "uniform sampler2D u0;uniform float u4;varying vec2 vv0;void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=a*u4;}",
        f: ["u0", "u4"],
        h: C
      },
      s8: {
        c: "uniform sampler2D u0;uniform float u4;varying vec2 vv0;const vec4 g=vec4(.25,.25,.25,.25),e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0);float b=dot(a*u4,g);gl_FragColor=b*e;}",
        f: ["u0", "u4"],
        h: C
      },
      s9: {
        c: "uniform sampler2D u1;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){float a=.25*dot(e,texture2D(u1,vv0));gl_FragColor=a*e;}",
        f: m,
        h: w
      },
      s10: {
        c: "uniform sampler2D u1,u5;uniform float u6;const vec4 f=vec4(1.,1.,1.,1.);varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0),b=texture2D(u5,vv0);gl_FragColor=mix(b,a,u6*f);}",
        f: ["u1", "u5", "u6"],
        h: {
          u1: 0,
          u5: 1
        }
      },
      s11: {
        c: "uniform sampler2D u1;uniform vec2 u7;varying vec2 vv0;void main(){gl_FragColor=.25*(texture2D(u1,vv0+u7)+texture2D(u1,vv0+u7*vec2(1.,-1.))+texture2D(u1,vv0+u7*vec2(-1.,-1.))+texture2D(u1,vv0+u7*vec2(-1.,1.)));}",
        f: ["u1", "u7"],
        h: w
      },
      s12: {
        c: "uniform sampler2D u1;uniform vec4 u8;varying vec2 vv0;float g(float a,float b){a=floor(a)+.5;return floor(a/exp2(b));}float h(float a,float b){return floor(a*exp2(b)+.5);}float i(float a,float b){return mod(a,h(1.,b));}float e(float c,float a,float b){a=floor(a+.5),b=floor(b+.5);return i(g(c,a),b-a);}vec4 k(float a){if(a==0.)return vec4(0.,0.,0.,0.);float l=128.*step(a,0.);a=abs(a);float c=floor(log2(a)),m=c+127.,b=(a/exp2(c)-1.)*8388608.,d=m/2.,n=fract(d)*2.,o=floor(d),p=e(b,0.,8.),q=e(b,8.,16.),r=n*128.+e(b,16.,23.),j=l+o;return vec4(p,q,r,j)/255.;}void main(){float a=dot(texture2D(u1,vv0),u8);gl_FragColor=k(a);}",
        f: ["u1", "u8"],
        h: w
      },
      s13: {
        c: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),b=e/(e+exp(-a));gl_FragColor=b;}",
        f: u,
        h: C
      },
      s14: {
        c: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(0.,0.,0.,0.);void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=max(e,a);}",
        f: u,
        h: C
      },
      s15: {
        c: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=mix(exp(-abs(a))-e,a,step(0.,a));}",
        f: u,
        h: C
      },
      s16: {
        c: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),b=exp(-abs(a))-e;gl_FragColor=mix(.1*b,a,step(0.,a));}",
        f: u,
        h: C
      },
      s17: {
        c: "uniform sampler2D u0,u6,u9;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),c=texture2D(u6,vv0),d=texture2D(u9,vv0),b=a/d;gl_FragColor=c*mix(exp(-abs(b))-f,b,step(0.,a));}",
        f: ["u0", "u6", "u9"],
        h: {
          u0: 0,
          u6: 1,
          u9: 2
        }
      },
      s18: {
        c: "uniform sampler2D u0;const float e=3.141593;varying vec2 vv0;void main(){gl_FragColor=atan(e*texture2D(u0,vv0))/e;}",
        f: u,
        h: C
      },
      s19: {
        c: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.),g=vec4(.5,.5,.5,.5);void main(){vec4 a=texture2D(u0,vv0),b=log(e+a);gl_FragColor=b;}",
        f: u,
        h: C
      },
      s20: {
        c: "uniform sampler2D u0;uniform float gain;varying vec2 vv0;void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=exp(a);}",
        f: ["u0", "u10"],
        h: C
      },
      s21: {
        c: "uniform sampler2D u0,u11;uniform float u12;const vec2 f=vec2(.5,.5);const float g=1e-5;const vec4 h=vec4(1.,1.,1.,1.),i=vec4(0.,0.,0.,0.);varying vec2 vv0;void main(){vec4 a=texture2D(u11,f);float b=u12*u12;vec4 c=max(b*a,g*h);gl_FragColor=texture2D(u0,vv0)/c;}",
        f: ["u0", "u13", "u12"],
        h: {
          u0: 0,
          u13: 1
        }
      },
      s22: {
        c: "uniform sampler2D u1;uniform vec2 u14;varying vec2 vv0;void main(){float a=u14.x*u14.y;vec2 b=floor(vv0*a)/a,c=fract(vv0*a),d=floor(b*u14.y),g=floor(u14.x*fract(b*u14.y)),f=(g*u14.y+d)/a;gl_FragColor=texture2D(u1,f+c/a);}",
        f: ["u1", "u14"],
        h: w
      },
      s23: {
        c: "uniform sampler2D u15,u16,u17;varying vec2 vv0;void main(){vec4 a=texture2D(u17,vv0);vec2 b=a.rg,c=a.ba;vec4 d=texture2D(u15,b),e=texture2D(u16,c);gl_FragColor=d*e;}",
        f: ["u15", "u16", "u17"],
        h: {
          u16: 0,
          u15: 1,
          u17: 2
        }
      },
      s24: {
        c: "uniform float u18;uniform sampler2D u15,u16;varying vec2 vv0;void main(){vec2 a=fract(vv0*u18);vec4 b=texture2D(u15,vv0),c=texture2D(u16,a);gl_FragColor=b*c;}",
        f: ["u16", "u15", "u18"],
        h: {
          u16: 0,
          u15: 1
        }
      },
      s25: {
        c: "uniform float u18;uniform sampler2D u15,u16,u19,u20,u21,u22;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.),g=vec4(1e-3,1e-3,1e-3,1e-3);void main(){vec2 i=vv0*u18,m=floor(i),c=i-m;vec4 n=texture2D(u15,vv0),d=texture2D(u16,c),a=texture2D(u22,vv0);a=a*255.;vec4 o=texture2D(u19,c),p=texture2D(u20,c),q=texture2D(u21,c),j=step(-g,-a),b=e-j,k=b*step(-e-g,-a);b*=e-k;vec4 h=b*step(-2.*e-g,-a);b*=e-h;vec4 l=b;d=j*d+k*o+h*p+l*q,gl_FragColor=n*d;}",
        f: "u15 u16 u18 u22 u19 u20 u21".split(" "),
        h: {
          u16: 0,
          u15: 1,
          u22: 3,
          u19: 4,
          u20: 5,
          u21: 6
        }
      },
      s26: {
        c: "uniform sampler2D u15,u16,u23;uniform float u18,u24,u25,u26;varying vec2 vv0;const vec2 j=vec2(1.,1.);void main(){vec2 a=floor(u24*vv0),g=u24*vv0-a;float b=u18/u24;vec2 c=floor(g*b),d=g*b-c,h=(a+d)/u24;float l=u24*u26/u18;vec2 m=l*c,i=(m+d*u25)/u26,e=step(i,j);vec4 n=texture2D(u15,h),o=texture2D(u16,i),p=n*o*e.x*e.y,k=texture2D(u23,h);gl_FragColor=p*u25*u25+k;}",
        f: "u15 u16 u18 u24 u25 u26 u23".split(" "),
        h: {
          u16: 0,
          u15: 1,
          u23: 2
        }
      },
      s27: {
        c: "uniform sampler2D u15,u16;varying vec2 vv0;void main(){vec4 a=texture2D(u15,vv0),b=texture2D(u16,vv0);gl_FragColor=a*b;}",
        f: ["u15", "u16"],
        h: {
          u16: 0,
          u15: 1
        }
      },
      s28: {
        c: "uniform sampler2D u1,u23;uniform float u27;varying vec2 vv0;void main(){gl_FragColor=texture2D(u23,vv0)+u27*texture2D(u1,vv0);}",
        f: ["u1", "u23", "u27"],
        h: {
          u1: 0,
          u23: 1
        }
      },
      s29: {
        c: "varying vec2 vv0;uniform sampler2D u1;const vec4 g=vec4(1.,1.,1.,1.),e=vec4(.299,.587,.114,0.);void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=dot(a,e)*g;}",
        f: m,
        h: w,
        precision: "lowp"
      },
      s30: {
        c: "varying vec2 vv0;uniform sampler2D u1,u2;uniform float u28;const vec4 g=vec4(1.,1.,1.,1.);void main(){vec4 a=vec4(0.);a-=texture2D(u1,vec2(vv0.x-u28,vv0.y-u28))*1.,a-=texture2D(u1,vec2(vv0.x-u28,vv0.y))*2.,a-=texture2D(u1,vec2(vv0.x-u28,vv0.y+u28))*1.,a+=texture2D(u1,vec2(vv0.x+u28,vv0.y-u28))*1.,a+=texture2D(u1,vec2(vv0.x+u28,vv0.y))*2.,a+=texture2D(u1,vec2(vv0.x+u28,vv0.y+u28))*1.;vec4 b=vec4(0.);b-=texture2D(u1,vec2(vv0.x-u28,vv0.y-u28))*1.,b-=texture2D(u1,vec2(vv0.x,vv0.y-u28))*2.,b-=texture2D(u1,vec2(vv0.x+u28,vv0.y-u28))*1.,b+=texture2D(u1,vec2(vv0.x-u28,vv0.y+u28))*1.,b+=texture2D(u1,vec2(vv0.x,vv0.y+u28))*2.,b+=texture2D(u1,vec2(vv0.x+u28,vv0.y+u28))*1.;vec3 c=sqrt(a.rgb*a.rgb+b.rgb*b.rgb);vec4 e=vec4(c,texture2D(u1,vv0).a),f=texture2D(u2,vv0);gl_FragColor=f.a*e.r*g;}",
        f: ["u1", "u2", "u28"],
        h: I
      },
      s31: {
        c: "varying vec2 vv0;uniform sampler2D u1,u2;uniform float u28;const vec4 j=vec4(1.,1.,1.,1.);const vec2 k=vec2(1.,1.);void main(){float i=0.;vec2 l=k*u28,b,c;float d,a,g=0.;for(float f=-4.;f<=4.;f+=1.)for(float e=-4.;e<=4.;e+=1.)b=vec2(f,e),d=length(b)/2.,a=exp(-d*d),c=vv0+l*b,a=1.,i+=a*texture2D(u1,c).r,g+=a;vec4 m=texture2D(u2,vv0);gl_FragColor=m.a*(texture2D(u1,c).r-i/g)*j;}",
        f: ["u1", "u2", "u28"],
        h: I
      },
      s32: {
        c: "uniform sampler2D u3;uniform vec2 u7;varying vec2 vv0;vec4 e(vec4 a,vec4 b){vec4 c=step(a,b);return mix(a,b,c);}const vec2 h=vec2(.5,.5),i=vec2(1.,0.),j=vec2(0.,1.);void main(){vec2 a=vv0-u7*h;vec4 b=texture2D(u3,a),c=texture2D(u3,a+u7*i),d=texture2D(u3,a+u7*j),k=texture2D(u3,a+u7),l=e(b,c),g=e(d,k);gl_FragColor=e(l,g);}",
        f: ["u3", "u7"],
        h: E
      },
      s33: {
        c: "uniform sampler2D u3;uniform vec2 u7;varying vec2 vv0;const vec2 j=vec2(1.,0.),k=vec2(0.,1.),l=vec2(2.,0.),m=vec2(0.,2.);vec4 e(vec4 a,vec4 b){vec4 c=step(a,b);return mix(a,b,c);}vec4 f(vec2 a){vec4 b=texture2D(u3,a),c=texture2D(u3,a+u7*j),d=texture2D(u3,a+u7*k),g=texture2D(u3,a+u7),i=e(b,c),h=e(d,g);return e(i,h);}void main(){vec2 a=vv0+u7*vec2(-.55,-1.05);vec4 b=f(a),c=f(a+u7*l),d=f(a+u7*2.),g=f(a+u7*m),i=e(b,c),h=e(d,g);gl_FragColor=e(i,h);}",
        f: ["u3", "u7"],
        h: E
      },
      s34: {
        c: "uniform sampler2D u1;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=a*a;}",
        f: ["u1"],
        h: w,
        precision: "lowp"
      },
      s35: {
        c: "uniform sampler2D u1;uniform vec2 u7;varying vec2 vv0;const vec4 g=vec4(1.,1.,1.,1.);const float d=15444.;void main(){vec4 a=1001./d*texture2D(u1,vv0-3.*u7)+2002./d*texture2D(u1,vv0-2.*u7)+3003./d*texture2D(u1,vv0-u7)+3432./d*texture2D(u1,vv0)+3003./d*texture2D(u1,vv0+u7)+2002./d*texture2D(u1,vv0+2.*u7)+1001./d*texture2D(u1,vv0+3.*u7);gl_FragColor=a;}",
        f: ["u7", "u1"],
        h: w,
        precision: "lowp"
      },
      s36: {
        c: "uniform sampler2D u1,u29,u30;varying vec2 vv0;const vec4 g=vec4(1.,1.,1.,1.);const float h=.1;void main(){vec4 a=texture2D(u29,vv0),b=texture2D(u30,vv0),c=texture2D(u1,vv0),d=max(g*h,b-a*a),f=sqrt(d);gl_FragColor=(c-a)/f;}",
        f: ["u1", "u29", "u30"],
        h: {
          u1: 0,
          u29: 1,
          u30: 2
        }
      }
    },
        O = {
      s37: {
        c: "uniform float u18,u31;uniform sampler2D u15,u16,u23;varying vec2 vv0;const vec2 ZERO2=vec2(0.,0.),ONE2=vec2(1.,1.),HALF2=vec2(.5,.5),EPS2=vec2(.01,.01);void main(){vec4 sum=texture2D(u23,vv0);float toSparsity=1.1111;vec2 uvFrom,uvWeight,xyPatch=ZERO2,eps2=EPS2/u18,xyTo=floor(vv0*u18+eps2);float weightSize=toSparsity*u18;vec2 halfFromSparsity=ONE2*(toSparsity-1.)/2.;for(float patch_x=0.;patch_x<1.1111;patch_x+=1.){xyPatch.x=patch_x;for(float patch_y=0.;patch_y<1.1111;patch_y+=1.)xyPatch.y=patch_y,uvFrom=(xyTo+HALF2+u31*(xyPatch-halfFromSparsity))/u18,uvFrom+=step(uvFrom,-eps2),uvFrom-=step(ONE2-eps2,uvFrom),uvWeight=(xyTo*toSparsity+xyPatch+HALF2)/weightSize,sum+=texture2D(u15,uvWeight)*texture2D(u16,uvFrom);}gl_FragColor=sum,gl_FragColor*=2.2222;}",
        f: ["u18", "u15", "u16", "u23", "u31"],
        pa: ["1.1111", "gl_FragColor\\*=2.2222;"]
      },
      s38: {
        c: "uniform float u18,u31,u26;uniform sampler2D u15,u16,u23;varying vec2 vv0;const vec2 ZERO2=vec2(0.,0.),ONE2=vec2(1.,1.),HALF2=vec2(.5,.5),EPS2=vec2(.01,.01);void main(){vec4 sum=texture2D(u23,vv0);float fromSparsity=1.1111,shrinkFactor=3.3333;vec2 uvFrom,uvWeight,xyFrom,xyPatchTo,xyPatch=ZERO2,xyShrink=ZERO2,eps2=EPS2/u26,xyTo=floor(vv0*u18+eps2);float weightSize=fromSparsity*u26;vec2 halfFromSparsity=ONE2*(fromSparsity-1.)/2.;float toSparsity=weightSize/u18;vec2 xyFrom0=xyTo*shrinkFactor;for(float patch_x=0.;patch_x<1.1111;patch_x+=1.){xyPatch.x=patch_x;for(float patch_y=0.;patch_y<1.1111;patch_y+=1.){xyPatch.y=patch_y;for(float shrink_x=0.;shrink_x<3.3333;shrink_x+=1.){xyShrink.x=shrink_x;for(float shrink_y=0.;shrink_y<3.3333;shrink_y+=1.)xyShrink.y=shrink_y,xyFrom=xyFrom0+xyShrink+shrinkFactor*u31*(xyPatch-halfFromSparsity),uvFrom=(xyFrom+HALF2)/u26,uvFrom+=step(uvFrom,-eps2),uvFrom-=step(ONE2-eps2,uvFrom),xyPatchTo=xyPatch*shrinkFactor+xyShrink,uvWeight=(xyTo*toSparsity+xyPatchTo+HALF2)/weightSize,sum+=texture2D(u15,uvWeight)*texture2D(u16,uvFrom);}}}gl_FragColor=sum,gl_FragColor*=2.2222;}",
        f: "u18 u26 u15 u16 u23 u31".split(" "),
        pa: ["1.1111", "gl_FragColor\\*=2.2222;", "3.3333"]
      }
    },
        N = {
      Ia: function Ia() {
        return n;
      },
      i: function i() {
        if (!n) {
          k = "highp";

          for (var f in M) {
            e(M[f], f);
          }

          v.set("s0");
          q.enableVertexAttribArray(0);
          f = Ka.i();
          n = !0;
          return f;
        }
      },
      Pb: function Pb(f) {
        f.forEach(function (x) {
          N.Va(x);
        });
      },
      Va: function Va(f) {
        M[f.id] = f;
        e(f, f.id);
      },
      lb: function lb(f, x, z) {
        x || (x = f);
        M[x] = Object.create(O[f]);
        O[f].pa && O[f].pa.forEach(function (ba, pa) {
          M[x].c = M[x].c.replace(new RegExp(ba, "g"), z[pa]);
        });
        e(M[x], x);
      },
      set: function set(f) {
        g(M[f]);
      },
      jc: function jc(f) {
        return "undefined" !== typeof M[f];
      },
      wd: function wd() {
        return h.td;
      },
      S: function S() {
        -1 !== l && (l = -1, h.V.forEach(function (f) {
          0 !== f && q.disableVertexAttribArray(f);
        }));
      },
      Oa: function Oa() {
        var f = 0;
        h.V.forEach(function (x, z) {
          z = h.U[z];
          q.vertexAttribPointer(x, z, q.FLOAT, !1, h.Ra, f);
          f += 4 * z;
        });
      },
      sd: function sd() {
        q.enableVertexAttribArray(0);
      },
      Pa: function Pa() {
        q.vertexAttribPointer(h.V[0], 2, q.FLOAT, !1, 8, 0);
      },
      Vd: function Vd(f, x) {
        q.uniform1i(h.l[f], x);
      },
      A: function A(f, x) {
        q.uniform1f(h.l[f], x);
      },
      I: function I(f, x, z) {
        q.uniform2f(h.l[f], x, z);
      },
      Wd: function Wd(f, x) {
        q.uniform2fv(h.l[f], x);
      },
      Xd: function Xd(f, x) {
        q.uniform3fv(h.l[f], x);
      },
      Gb: function Gb(f, x, z, ba) {
        q.uniform3f(h.l[f], x, z, ba);
      },
      Hb: function Hb(f, x) {
        q.uniform4fv(h.l[f], x);
      },
      Yd: function Yd(f, x) {
        q.uniformMatrix2fv(h.l[f], !1, x);
      },
      Zd: function Zd(f, x) {
        q.uniformMatrix3fv(h.l[f], !1, x);
      },
      $d: function $d(f, x) {
        q.uniformMatrix4fv(h.l[f], !1, x);
      },
      C: function C(f, x) {
        N.set(f);
        x.forEach(function (z) {
          switch (z.type) {
            case "4f":
              q.uniform4fv(h.l[z.name], z.value);
              break;

            case "3f":
              q.uniform3fv(h.l[z.name], z.value);
              break;

            case "2f":
              q.uniform2fv(h.l[z.name], z.value);
              break;

            case "1f":
              q.uniform1f(h.l[z.name], z.value);
              break;

            case "1i":
              q.uniform1i(h.l[z.name], z.value);
              break;

            case "mat2":
              q.uniformMatrix2fv(h.l[z.name], !1, z.value);
              break;

            case "mat3":
              q.uniformMatrix3fv(h.l[z.name], !1, z.value);
              break;

            case "mat4":
              q.uniformMatrix4fv(h.l[z.name], !1, z.value);
          }
        });
      }
    };
    return N;
  }(),
      q = !1,
      Ma = function () {
    function b(k) {
      console.log("ERROR in ContextFeedForward : ", k);
      return !1;
    }

    var c = !1,
        e = !1,
        g = !1,
        l = !1,
        h = !0,
        t = !1,
        n = {
      s: function s() {
        return c.width;
      },
      F: function F() {
        return c.height;
      },
      ha: function ha() {
        return c;
      },
      vd: function vd() {
        return q;
      },
      m: function m() {
        return h;
      },
      flush: function flush() {
        q.flush();
      },
      nc: function nc() {
        t || (t = new Uint8Array(c.width * c.height * 4));
        q.readPixels(0, 0, c.width, c.height, q.RGBA, q.UNSIGNED_BYTE, t);
        return t;
      },
      yd: function yd() {
        return c.toDataURL("image/jpeg");
      },
      zd: function zd() {
        D.D();
        e || (e = document.createElement("canvas"), g = e.getContext("2d"));
        e.width = c.width;
        e.height = c.height;
        var k = n.nc(),
            m = g.createImageData(e.width, e.height),
            u,
            w,
            C = e.width,
            I = e.height,
            E = m.data;

        for (w = 0; w < I; ++w) {
          var M = I - w - 1;

          for (u = 0; u < C; ++u) {
            var O = 4 * (w * C + u);
            var N = 4 * (M * C + u);
            E[O] = k[N];
            E[O + 1] = k[N + 1];
            E[O + 2] = k[N + 2];
            E[O + 3] = k[N + 3];
          }
        }

        g.putImageData(m, 0, 0);
        return e.toDataURL("image/png");
      },
      xd: function xd(k) {
        !e && k && (e = document.createElement("canvas"), g = e.getContext("2d"));
        var m = k ? e : document.createElement("canvas");
        m.width = c.width;
        m.height = c.height;
        (k ? g : m.getContext("2d")).drawImage(c, 0, 0);
        return m;
      },
      i: function i(k) {
        k.eb && !k.fa ? c = document.getElementById(k.eb) : k.fa && (c = k.fa);
        c || (c = document.createElement("canvas"));
        c.width = k && void 0 !== k.width ? k.width : 512;
        c.height = k && void 0 !== k.height ? k.height : 512;
        "undefined" === typeof k && (k = {});
        void 0 === k.premultipliedAlpha && (k.premultipliedAlpha = !1);
        void 0 === k.Ha && (k.Ha = !0);
        void 0 === k.antialias && (k.antialias = !1);
        var m = {
          antialias: k.antialias,
          alpha: !0,
          preserveDrawingBuffer: !0,
          premultipliedAlpha: k.premultipliedAlpha,
          stencil: !1,
          depth: k.Ha
        },
            u;
        if (u = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) u = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/), u = 12 === parseInt(u[1], 10);
        u || (q = c.getContext("webgl2", m));
        q ? h = !0 : ((q = c.getContext("webgl", m)) || (q = c.getContext("experimental-webgl", m)), h = !1);
        if (!q) return b("WebGL is not enabled");
        (l = q.getExtension("WEBGL_lose_context")) && c.addEventListener("webglcontextlost", k.Nc, !1);
        if (!La.i()) return b("Not enough capabilities");
        if (!La.Xb() && h) return b("Your configuration cannot process color buffer float");
        q.clearColor(0, 0, 0, 0);
        q.disable(q.DEPTH_TEST);
        q.disable(q.BLEND);
        q.disable(q.DITHER);
        q.disable(q.STENCIL_TEST);
        q.GENERATE_MIPMAP_HINT && q.hint(q.GENERATE_MIPMAP_HINT, q.FASTEST);
        q.disable(q.SAMPLE_ALPHA_TO_COVERAGE);
        q.disable(q.SAMPLE_COVERAGE);
        return !0;
      },
      Id: function Id() {
        if (!v.i()) return !1;
        q.depthFunc(q.LEQUAL);
        q.clearDepth(1);
        return !0;
      }
    };
    return n;
  }(),
      Ja = function () {
    var b = "undefined" === typeof v ? JEShaders : v;
    return {
      Zc: function Zc(c) {
        b !== c && (b.S(), b = c);
      },
      Ia: function Ia() {
        return b.Ia();
      },
      Pa: function Pa() {
        b.Pa();
      },
      Oa: function Oa() {
        b.Oa();
      },
      S: function S() {
        b.S();
      },
      set: function set(c) {
        b.set(c);
      }
    };
  }(),
      G = function () {
    var b,
        c,
        e = 0,
        g = -2,
        l = -2,
        h = !1,
        t = {
      reset: function reset() {
        l = g = -2;
      },
      i: function i() {
        h || (b = q.createBuffer(), q.bindBuffer(q.ARRAY_BUFFER, b), q.bufferData(q.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), q.STATIC_DRAW), c = q.createBuffer(), q.bindBuffer(q.ELEMENT_ARRAY_BUFFER, c), q.bufferData(q.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2]), q.STATIC_DRAW), t.xa(), h = !0);
      },
      a: function a(n) {
        var k = e++,
            m = n.J ? n.J.length : 0,
            u = "undefined" === typeof n.mode ? q.STATIC_DRAW : n.mode,
            w = q.createBuffer();
        q.bindBuffer(q.ARRAY_BUFFER, w);
        q.bufferData(q.ARRAY_BUFFER, n.Lb instanceof Float32Array ? n.Lb : new Float32Array(n.Lb), u);
        g = k;

        if (n.J) {
          var C = q.createBuffer();
          q.bindBuffer(q.ELEMENT_ARRAY_BUFFER, C);

          if (65536 > n.J.length) {
            var I = Uint16Array;
            var E = q.UNSIGNED_SHORT;
            var M = 2;
          } else I = Uint32Array, E = q.UNSIGNED_INT, M = 4;

          q.bufferData(q.ELEMENT_ARRAY_BUFFER, n.J instanceof I ? n.J : new I(n.J), u);
          l = k;
        }

        var O = {
          Wb: function Wb(N) {
            g !== k && (q.bindBuffer(q.ARRAY_BUFFER, w), g = k);
            N && Ja.Oa();
          },
          Ub: function Ub() {
            l !== k && (q.bindBuffer(q.ELEMENT_ARRAY_BUFFER, C), l = k);
          },
          bind: function bind(N) {
            O.Wb(N);
            O.Ub();
          },
          qd: function qd() {
            q.drawElements(q.TRIANGLES, m, E, 0);
          },
          rd: function rd(N, f) {
            q.drawElements(q.TRIANGLES, N, E, f * M);
          },
          remove: function remove() {
            q.deleteBuffer(w);
            n.J && q.deleteBuffer(C);
            O = null;
          }
        };
        return O;
      },
      xa: function xa() {
        -1 !== g && (q.bindBuffer(q.ARRAY_BUFFER, b), g = -1);
        -1 !== l && (q.bindBuffer(q.ELEMENT_ARRAY_BUFFER, c), l = -1);
      },
      g: function g(n, k) {
        n && G.xa();
        k && Ja.Pa();
        q.drawElements(q.TRIANGLES, 3, q.UNSIGNED_SHORT, 0);
      },
      mc: function mc() {
        q.deleteBuffer(b);
        q.deleteBuffer(c);
      }
    };
    return t;
  }(),
      D = function () {
    var b,
        c,
        e,
        g = !1,
        l = {
      o: -2,
      kc: 1
    };
    return {
      i: function i() {
        if (!g) {
          b = q.createFramebuffer();
          var h = La.m();
          c = h && q.DRAW_FRAMEBUFFER ? q.DRAW_FRAMEBUFFER : q.FRAMEBUFFER;
          e = h && q.READ_FRAMEBUFFER ? q.READ_FRAMEBUFFER : q.FRAMEBUFFER;
          g = !0;
        }
      },
      Bd: function Bd() {
        return c;
      },
      Ca: function Ca() {
        return e;
      },
      O: function O() {
        return q.FRAMEBUFFER;
      },
      Dd: function Dd() {
        return l;
      },
      ud: function ud() {
        return b;
      },
      a: function a(h) {
        void 0 === h.mb && (h.mb = !1);
        var t = h.dd ? h.dd : !1,
            n = h.width,
            k = void 0 !== h.height ? h.height : h.width,
            m = b,
            u = !1,
            w = !1,
            C = 0;
        t && (n = n ? n : t.s(), k = k ? k : t.F());
        var I = {
          Eb: function Eb() {
            w || (m = q.createFramebuffer(), w = !0, C = l.kc++);
          },
          Ob: function Ob() {
            I.Eb();
            I.j();
            u = q.createRenderbuffer();
            q.bindRenderbuffer(q.RENDERBUFFER, u);
            q.renderbufferStorage(q.RENDERBUFFER, q.DEPTH_COMPONENT16, n, k);
            q.framebufferRenderbuffer(c, q.DEPTH_ATTACHMENT, q.RENDERBUFFER, u);
            q.clearDepth(1);
          },
          bind: function bind(E, M) {
            C !== l.o && (q.bindFramebuffer(c, m), l.o = C);
            t && t.j();
            M && q.viewport(0, 0, n, k);
            E && q.clear(q.COLOR_BUFFER_BIT | q.DEPTH_BUFFER_BIT);
          },
          kd: function kd() {
            C !== l.o && (q.bindFramebuffer(c, m), l.o = C);
          },
          clear: function clear() {
            q.clear(q.COLOR_BUFFER_BIT | q.DEPTH_BUFFER_BIT);
          },
          nd: function nd() {
            q.clear(q.COLOR_BUFFER_BIT);
          },
          od: function od() {
            q.clear(q.DEPTH_BUFFER_BIT);
          },
          $c: function $c() {
            q.viewport(0, 0, n, k);
          },
          j: function j() {
            C !== l.o && (q.bindFramebuffer(c, m), l.o = C);
          },
          rtt: function rtt(E) {
            t = E;
            l.o !== C && (q.bindFramebuffer(q.FRAMEBUFFER, m), l.o = C);
            E.j();
          },
          D: function D() {
            q.bindFramebuffer(c, null);
            l.o = -1;
          },
          resize: function resize(E, M) {
            n = E;
            k = M;
            u && (q.bindRenderbuffer(q.RENDERBUFFER, u), q.renderbufferStorage(q.RENDERBUFFER, q.DEPTH_COMPONENT16, n, k));
          },
          remove: function remove() {
            q.bindFramebuffer(c, m);
            q.framebufferTexture2D(c, q.COLOR_ATTACHMENT0, q.TEXTURE_2D, null, 0);
            u && q.framebufferRenderbuffer(c, q.DEPTH_ATTACHMENT, q.RENDERBUFFER, null);
            q.bindFramebuffer(c, null);
            q.deleteFramebuffer(m);
            u && q.deleteRenderbuffer(u);
            I = null;
          }
        };
        h.mb && I.Ob();
        return I;
      },
      D: function D() {
        q.bindFramebuffer(c, null);
        l.o = -1;
      },
      fd: function fd() {
        q.bindFramebuffer(c, null);
        q.clear(q.COLOR_BUFFER_BIT | q.DEPTH_BUFFER_BIT);
        q.viewport(0, 0, La.s(), La.F());
        l.o = -1;
      },
      reset: function reset() {
        l.o = -2;
      },
      H: function H() {
        0 !== l.o && (q.bindFramebuffer(c, b), l.o = 0);
      },
      clear: function clear() {
        q.viewport(0, 0, La.s(), La.F());
        q.clear(q.COLOR_BUFFER_BIT);
      }
    };
  }(),
      H = function () {
    function _b(d) {
      q.bindTexture(q.TEXTURE_2D, d);
    }

    function c(d) {
      pa[0] = d;
      d = ua[0];
      var A = d >> 16 & 32768,
          F = d >> 12 & 2047,
          R = d >> 23 & 255;
      return 103 > R ? A : 142 < R ? A | 31744 | ((255 == R ? 0 : 1) && d & 8388607) : 113 > R ? (F |= 2048, A | (F >> 114 - R) + (F >> 113 - R & 1)) : A = (A | R - 112 << 10 | F >> 1) + (F & 1);
    }

    function e(d) {
      var A = new Uint16Array(d.length);
      d.forEach(function (F, R) {
        A[R] = c(F);
      });
      return A;
    }

    function g() {
      if (null !== oa.Da) return oa.Da;
      var d = h(e([1, 1, 1, 1]));
      return null === d ? !0 : oa.Da = d;
    }

    function l() {
      if (null !== oa.Ea) return oa.Ea;
      var d = h(new Uint8Array([255, 255, 255, 255]));
      return null === d ? !0 : oa.Ea = d;
    }

    function h(d) {
      if (!Ja.Ia() || !E) return null;
      d = X.a({
        isFloat: !1,
        B: !0,
        array: d,
        width: 1
      });
      D.D();
      q.viewport(0, 0, 1, 1);
      q.clearColor(0, 0, 0, 0);
      q.clear(q.COLOR_BUFFER_BIT);
      Ja.set("s0");
      d.$a(0);
      G.g(!1, !0);
      var A = new Uint8Array(4);
      q.readPixels(0, 0, 1, 1, q.RGBA, q.UNSIGNED_BYTE, A);
      A = .9 < A[0];
      d.remove();
      D.H();
      return A;
    }

    var t = 0,
        n,
        k = 0,
        m,
        u = !1,
        w,
        C,
        I,
        E = !1,
        M = !1,
        O,
        N,
        f,
        x = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]],
        z = !1,
        ba = !1,
        pa = new Float32Array(1),
        ua = new Int32Array(pa.buffer),
        oa = {
      Da: null,
      Ea: null
    },
        X = {
      i: function i() {
        if (!E) {
          C = [q.RGB, !1, q.RGB, q.RGBA];
          I = [q.RGB, !1, q.RGB, q.RGBA];
          n = [q.TEXTURE0, q.TEXTURE1, q.TEXTURE2, q.TEXTURE3, q.TEXTURE4, q.TEXTURE5, q.TEXTURE6, q.TEXTURE7];
          z = "undefined" !== typeof JEContext;
          ba = "undefined" !== typeof La;
          z && JEContext.Pd() && n.push(q.TEXTURE8, q.TEXTURE9);
          m = [-1, -1, -1, -1, -1, -1, -1, -1];
          w = [q.UNSIGNED_BYTE, q.FLOAT, q.FLOAT];

          if (!u) {
            for (var d = new Float32Array(16384), A = 0; 16384 > A; ++A) {
              d[A] = 2 * Math.random() - 1;
            }

            u = {
              random: X.a({
                isFloat: !0,
                isPot: !0,
                array: d,
                width: 64
              }),
              Kb: X.a({
                isFloat: !1,
                isPot: !0,
                width: 1,
                array: new Uint8Array([0, 0, 0, 0])
              })
            };
          }

          E = !0;
        }
      },
      wc: function wc() {
        X.gd();
      },
      Gd: function Gd() {
        return u.Kb;
      },
      gd: function gd() {
        w[1] = La.ia();
      },
      Vc: function Vc() {
        I = C = [q.RGBA, q.RGBA, q.RGBA, q.RGBA];
      },
      Qc: function Qc(d, A) {
        v.set("s1");
        D.D();
        var F = d.s(),
            R = d.F();
        q.viewport(0, 0, F, R);
        d.b(0);
        G.g(!1, !1);
        q.readPixels(0, 0, F, R, q.RGBA, q.UNSIGNED_BYTE, A);
      },
      lc: function lc(d, A, F) {
        q.activeTexture(q.TEXTURE0);
        t = 0;
        var R = q.createTexture();

        _b(R);

        var Y = La.m() && q.RGBA32F ? q.RGBA32F : q.FLOAT;
        A = A instanceof Float32Array ? A : new Float32Array(A);
        var Z = Math.log(A.length) / Math.log(2);
        Z !== Math.floor(Z) && (q.texParameteri(q.TEXTURE_2D, q.TEXTURE_WRAP_S, q.CLAMP_TO_EDGE), q.texParameteri(q.TEXTURE_2D, q.TEXTURE_WRAP_T, q.CLAMP_TO_EDGE));
        q.texParameteri(q.TEXTURE_2D, q.TEXTURE_MAG_FILTER, q.NEAREST);
        q.texParameteri(q.TEXTURE_2D, q.TEXTURE_MIN_FILTER, q.NEAREST);
        q.pixelStorei(q.UNPACK_FLIP_Y_WEBGL, F);
        q.texImage2D(q.TEXTURE_2D, 0, q.RGBA, d.s(), d.F(), 0, q.RGBA, Y, A);

        _b(null);

        q.pixelStorei(q.UNPACK_FLIP_Y_WEBGL, !1);
        D.H();
        v.set("s0");
        d.u();
        q.clearColor(0, 0, 0, 0);
        q.clear(q.COLOR_BUFFER_BIT);

        _b(R);

        G.g(!0, !1);
        q.deleteTexture(R);
      },
      a: function a(d) {
        function A() {
          _b(ea);

          ra && q.pixelStorei(q.UNPACK_FLIP_Y_WEBGL, ra);
          d.isPot ? (q.texParameteri(q.TEXTURE_2D, q.TEXTURE_WRAP_S, d.ob ? q.MIRRORED_REPEAT : q.REPEAT), q.texParameteri(q.TEXTURE_2D, q.TEXTURE_WRAP_T, d.K ? q.MIRRORED_REPEAT : q.REPEAT)) : (q.texParameteri(q.TEXTURE_2D, q.TEXTURE_WRAP_S, q.CLAMP_TO_EDGE), q.texParameteri(q.TEXTURE_2D, q.TEXTURE_WRAP_T, q.CLAMP_TO_EDGE));
          d.la && "undefined" !== typeof JESETTINGS && q.texParameterf(q.TEXTURE_2D, JEContext.Ad().TEXTURE_MAX_ANISOTROPY_EXT, JESETTINGS.jd);
          q.texParameteri(q.TEXTURE_2D, q.TEXTURE_MAG_FILTER, d.isLinear ? q.LINEAR : q.NEAREST);
          d.isLinear ? q.texParameteri(q.TEXTURE_2D, q.TEXTURE_MIN_FILTER, d.isMipmap && !xa ? q.NEAREST_MIPMAP_LINEAR : q.LINEAR) : q.texParameteri(q.TEXTURE_2D, q.TEXTURE_MIN_FILTER, d.isMipmap && !xa ? q.NEAREST_MIPMAP_NEAREST : q.NEAREST);
          ka = C[d.Z - 1];
          fa = I[d.Z - 1];
          na = w[F];

          if (La.m()) {
            var r = q.RGBA32F;
            ka === q.RGBA && na === q.FLOAT && r && (fa = r);
            ka === q.RGB && na === q.FLOAT && r && (fa = r, ka = q.RGBA);
          }

          if (d.B && !d.isFloat || d.isFloat && d.isMipmap && Ka.zc()) (r = q.RGBA16F) && (fa = r), na = La.ia();
          d.rb && "undefined" !== typeof q.texStorage2D && (L = d.rb);
          d.pb && 4 === d.Z && (ka = JEContext.Ed());
          if (d.v) q.texImage2D(q.TEXTURE_2D, 0, fa, ka, na, d.v);else if (d.url) q.texImage2D(q.TEXTURE_2D, 0, fa, ka, na, qa);else if (aa) {
            try {
              q.texImage2D(q.TEXTURE_2D, 0, fa, J, y, 0, ka, na, aa), q.getError() !== q.NO_ERROR && (q.texImage2D(q.TEXTURE_2D, 0, fa, J, y, 0, ka, na, null), q.getError() !== q.NO_ERROR && q.texImage2D(q.TEXTURE_2D, 0, q.RGBA, J, y, 0, q.RGBA, q.UNSIGNED_BYTE, null));
            } catch (ha) {
              q.texImage2D(q.TEXTURE_2D, 0, fa, J, y, 0, ka, na, null);
            }

            d.isKeepArray || (aa = null);
          } else q.texImage2D(q.TEXTURE_2D, 0, fa, J, y, 0, ka, na, null);
          if (d.isMipmap) if (!xa && B) B.Ba(), la = !0;else if (xa) {
            r = Math.log(Math.min(J, y)) / Math.log(2);
            var S;
            ya = Array(1 + r);
            ya[0] = ea;

            for (S = 1; S <= r; ++S) {
              var Q = Math.pow(2, S);
              var P = J / Q;
              Q = y / Q;
              var K = q.createTexture();

              _b(K);

              q.texParameteri(q.TEXTURE_2D, q.TEXTURE_MIN_FILTER, q.NEAREST);
              q.texParameteri(q.TEXTURE_2D, q.TEXTURE_MAG_FILTER, q.NEAREST);
              q.texImage2D(q.TEXTURE_2D, 0, fa, P, Q, 0, ka, na, null);

              _b(null);

              ya[S] = K;
            }

            la = !0;
          }

          _b(null);

          m[t] = -1;
          ra && q.pixelStorei(q.UNPACK_FLIP_Y_WEBGL, !1);
          U = !0;
          ca && B && (ca(B), ca = !1);
        }

        "undefined" === typeof d.isFloat && (d.isFloat = !1);
        "undefined" === typeof d.B && (d.B = !1);
        "undefined" === typeof d.isPot && (d.isPot = !0);
        "undefined" === typeof d.isLinear && (d.isLinear = !1);
        "undefined" === typeof d.isMipmap && (d.isMipmap = !1);
        "undefined" === typeof d.ya && (d.ya = !1);
        void 0 === d.la && (d.la = !1);
        void 0 === d.K && (d.K = !1);
        void 0 === d.ob && (d.ob = !1);
        void 0 === d.pb && (d.pb = !1);
        void 0 === d.Z && (d.Z = 4);
        void 0 === d.nb && (d.nb = !1);
        "undefined" === typeof d.isFlipY && (d.isFlipY = d.url || d.array ? !0 : !1);
        "undefined" === typeof d.isKeepArray && (d.isKeepArray = !1);
        d.data && (d.array = "string" === typeof d.data ? Ia(d.data) : d.isFloat ? new Float32Array(d.data) : new Uint8Array(d.data), d.isFlipY = !1);
        var F = 0,
            R = d.v ? !0 : !1,
            Y = null,
            Z = null,
            da = !1,
            ta = null;
        d.isFloat && (d.B = !0);
        d.B && (F = 1);
        d.nb || La.m() || !d.isFloat || !ba || La.bb() || (d.isFloat = !1);
        d.isFloat && (F = 2);
        d.la && z && !JEContext.Kd() && (d.la = !1);
        var ea = q.createTexture(),
            ca = d.ya,
            qa = null,
            aa = !1,
            J = 0,
            y = 0,
            U = !1,
            V = k++,
            T = !1,
            ia,
            va,
            Da,
            Ba,
            fa,
            ka,
            na,
            ra = d.isFlipY,
            xa = d.B && d.isMipmap && "undefined" !== typeof Ka && !Ka.Zb() ? !0 : !1,
            ya,
            L = -1,
            la = !1;
        "undefined" !== typeof d.width && d.width && (J = d.width, y = "undefined" !== typeof d.height && d.height ? d.height : J);
        var B = {
          get: function get() {
            return ea;
          },
          s: function s() {
            return J;
          },
          F: function F() {
            return y;
          },
          Hd: function Hd() {
            return d.url;
          },
          Ld: function Ld() {
            return d.isFloat;
          },
          Nd: function Nd() {
            return d.B;
          },
          Od: function Od() {
            return d.isLinear;
          },
          Ba: function Ba() {
            q.generateMipmap(q.TEXTURE_2D);
          },
          ab: function ab(r, S) {
            xa ? (r || (r = B.hb()), B.wa(S), _b(ya[r]), m[S] = -1) : B.b(S);
          },
          hb: function hb() {
            -1 === L && (L = Math.log(J) / Math.log(2));
            return L;
          },
          gb: function gb(r) {
            if (xa) {
              r || (r = B.hb());
              v.set("s11");
              B.wa(0);
              var S,
                  Q = J,
                  P = y;

              for (S = 1; S <= r; ++S) {
                Q /= 2, P /= 2, v.I("u7", .25 / Q, .25 / P), q.viewport(0, 0, Q, P), _b(ya[S - 1]), q.framebufferTexture2D(D.O(), q.COLOR_ATTACHMENT0, q.TEXTURE_2D, ya[S], 0), G.g(!1, 1 === S);
              }

              m[0] = -1;
            } else B.Ba();
          },
          wa: function wa(r) {
            r !== t && (q.activeTexture(n[r]), t = r);
          },
          b: function b(r) {
            if (!U) return !1;
            B.wa(r);
            if (m[r] === V) return !1;

            _b(ea);

            m[r] = V;
            return !0;
          },
          $a: function $a(r) {
            q.activeTexture(n[r]);
            t = r;

            _b(ea);

            m[r] = V;
          },
          j: function j() {
            q.framebufferTexture2D(D.O(), q.COLOR_ATTACHMENT0, q.TEXTURE_2D, ea, 0);
          },
          u: function u() {
            q.viewport(0, 0, J, y);
            q.framebufferTexture2D(D.O(), q.COLOR_ATTACHMENT0, q.TEXTURE_2D, ea, 0);
          },
          ce: function ce() {
            q.framebufferTexture2D(D.O(), q.COLOR_ATTACHMENT0, q.TEXTURE_2D, null, 0);
          },
          resize: function resize(r, S) {
            J = r;
            y = S;
            A();
          },
          clone: function clone(r) {
            r = X.a({
              width: J,
              height: y,
              B: d.B,
              isFloat: d.isFloat,
              isLinear: d.isLinear,
              K: d.K,
              isFlipY: r ? !ra : ra,
              isPot: d.isPot
            });
            Ja.set("s0");
            D.H();
            r.j();
            q.viewport(0, 0, J, y);
            B.b(0);
            G.g(!0, !0);
            return r;
          },
          $c: function $c() {
            q.viewport(0, 0, J, y);
          },
          remove: function remove() {
            q.deleteTexture(ea);
            B = null;
          },
          refresh: function refresh() {
            B.$a(0);
            ra && q.pixelStorei(q.UNPACK_FLIP_Y_WEBGL, !0);
            R ? q.texImage2D(q.TEXTURE_2D, 0, fa, ka, q.UNSIGNED_BYTE, d.v) : q.texImage2D(q.TEXTURE_2D, 0, fa, J, y, 0, ka, na, aa);
            ra && q.pixelStorei(q.UNPACK_FLIP_Y_WEBGL, !1);
          },
          cb: function cb() {
            var r = J * y * 4;
            va = [new Uint8Array(r), new Uint8Array(r), new Uint8Array(r), new Uint8Array(r)];
            ia = [new Float32Array(va[0].buffer), new Float32Array(va[1].buffer), new Float32Array(va[2].buffer), new Float32Array(va[3].buffer)];
            Da = new Uint8Array(4 * r);
            Ba = new Float32Array(Da.buffer);
            T = !0;
          },
          Na: function Na() {
            T || B.cb();
            q.readPixels(0, 0, J, 4 * y, q.RGBA, q.UNSIGNED_BYTE, Da);
            var r,
                S = J * y,
                Q = 2 * S,
                P = 3 * S;

            for (r = 0; r < S; ++r) {
              ia[0][r] = Ba[r], ia[1][r] = Ba[r + S], ia[2][r] = Ba[r + Q], ia[3][r] = Ba[r + P];
            }

            return ia;
          },
          za: function za() {
            D.D();
            v.set("s12");
            B.b(0);

            for (var r = 0; 4 > r; ++r) {
              q.viewport(0, y * r, J, y), v.Hb("u8", x[r]), G.g(!1, 0 === r);
            }
          },
          de: function de(r) {
            var S = na === w[0] && !l();

            _b(ea);

            ra && q.pixelStorei(q.UNPACK_FLIP_Y_WEBGL, ra);
            S ? (da || (Y = document.createElement("canvas"), Y.width = J, Y.height = y, Z = Y.getContext("2d"), ta = Z.createImageData(J, y), da = !0), ta.data.set(r), Z.putImageData(ta, 0, 0), q.texImage2D(q.TEXTURE_2D, 0, fa, ka, na, Y)) : q.texImage2D(q.TEXTURE_2D, 0, fa, J, y, 0, ka, na, r);
            m[t] = V;
            ra && q.pixelStorei(q.UNPACK_FLIP_Y_WEBGL, !1);
          },
          ee: function ee(r, S) {
            _b(ea);

            q.pixelStorei(q.UNPACK_FLIP_Y_WEBGL, S);
            q.texImage2D(q.TEXTURE_2D, 0, fa, ka, na, r);
            m[t] = V;
            S && q.pixelStorei(q.UNPACK_FLIP_Y_WEBGL, !1);
          },
          Td: function Td(r, S) {
            var Q = J * y,
                P = 4 * Q;
            r = d.B ? r ? "RGBE" : "JSON" : "RGBA";
            S && (r = S);
            S = La.m() && !1;

            switch (r) {
              case "RGBE":
                var K = "s39";
                break;

              case "JSON":
                K = S ? "s0" : "s12";
                break;

              case "RGBA":
              case "RGBAARRAY":
                K = "s6";
            }

            T || ("RGBA" === r || "RGBE" === r || "RGBAARRAY" === r ? (va = new Uint8Array(P), T = !0) : "JSON" !== r || S || B.cb());
            D.D();
            v.set(K);
            B.b(0);

            if ("RGBA" === r || "RGBE" === r || "RGBAARRAY" === r) {
              q.viewport(0, 0, J, y);
              G.g(!0, !0);
              q.readPixels(0, 0, J, y, q.RGBA, q.UNSIGNED_BYTE, va);
              if ("RGBAARRAY" === r) return {
                data: va
              };
              M || (O = document.createElement("canvas"), N = O.getContext("2d"), M = !0);
              O.width = J;
              O.height = y;
              f = N.createImageData(J, y);
              f.data.set(va);
              N.putImageData(f, 0, 0);
              var ha = O.toDataURL("image/png");
            } else if ("JSON" === r) if (S) ha = new Float32Array(Q), q.viewport(0, 0, J, y), G.g(!0, !0), q.readPixels(0, 0, J, y, q.RGBA, q.FLOAT, ha);else {
              for (ha = 0; 4 > ha; ++ha) {
                q.viewport(0, y * ha, J, y), v.Hb("u8", x[ha]), G.g(!ha, !ha);
              }

              B.Na();
              ha = Array(Q);

              for (K = 0; K < Q; ++K) {
                ha[4 * K] = ia[0][K], ha[4 * K + 1] = ia[1][K], ha[4 * K + 2] = ia[2][K], ha[4 * K + 3] = ia[3][K];
              }
            }

            return {
              format: r,
              data: ha,
              width: J,
              height: y,
              isMirrorY: d.K,
              isFlipY: "RGBA" === r ? d.isFlipY : !d.isFlipY
            };
          }
        };
        d.isMipmap && !xa && U && !la && (B.Ba(), la = !0);
        if (d.url) _b(ea), q.texImage2D(q.TEXTURE_2D, 0, q.RGBA, 1, 1, 0, q.RGBA, q.UNSIGNED_BYTE, null), qa = new Image(), qa.pd = "Anonymous", qa.crossOrigin = "Anonymous", qa.src = d.url, qa.onload = function () {
          J = qa.width;
          y = qa.height;
          A();
        };else if (d.v) {
          var ma = function ma() {
            J = void 0 !== d.v.videoWidth ? d.v.videoWidth : d.v.width;
            y = void 0 !== d.v.videoHeight ? d.v.videoHeight : d.v.height;
            J ? A() : setTimeout(ma, 1);
          };

          ma();
        } else d.array ? (d.B && !d.isFloat ? d.array instanceof Uint16Array ? (aa = d.array, A()) : g() ? (aa = e(d.array), A()) : (A(), X.lc(B, d.array, ra)) : (aa = d.isFloat ? d.array instanceof Float32Array ? d.array : new Float32Array(d.array) : d.array instanceof Uint8Array ? d.array : new Uint8Array(d.array), A()), d.isKeepArray || (aa && aa !== d.array && (aa = null), delete d.array)) : A();
        B.tc = B.s;
        ca && U && (ca(B), ca = !1);
        return B;
      },
      D: function D(d) {
        d !== t && (q.activeTexture(n[d]), t = d);
        m[d] = -1;

        _b(null);
      },
      ld: function ld(d) {
        u.random.b(d);
      },
      reset: function reset() {
        for (var d = 0; d < n.length; ++d) {
          m[d] = -1;
        }

        t = -1;
      },
      Sd: function Sd() {
        t = -1;
      },
      ae: function ae() {
        for (var d = 0; d < n.length; ++d) {
          X.D(d);
        }
      },
      mc: function mc() {
        u && (u.random.remove(), u.Kb.remove());
      },
      be: function be(d, A) {
        if ("RGBA" === d.format || "RGBE" === d.format) {
          var F = new Image();
          F.src = d.data;

          F.onload = function () {
            X.a({
              K: d.isMirrorY,
              isFlipY: d.isFlipY,
              isFloat: !1,
              v: F,
              ya: function ya(R) {
                if ("RGBA" === d.format) A(R);else {
                  var Y = d.width,
                      Z = d.height,
                      da = X.a({
                    K: d.isMirrorY,
                    isFloat: !0,
                    width: Y,
                    height: Z,
                    isFlipY: d.isFlipY
                  });
                  D.H();
                  q.viewport(0, 0, Y, Z);
                  v.set("s40");
                  da.j();
                  R.b(0);
                  G.g(!0, !0);
                  X.D(0);
                  A(da);
                  q.flush();
                  setTimeout(R.remove, 50);
                }
              }
            });
          };
        } else "JSON" === d.format ? A(X.a({
          isFloat: !0,
          isFlipY: d.isFlipY,
          width: d.width,
          height: d.height,
          array: new Float32Array(d.data)
        })) : A(!1);
      }
    };
    return X;
  }(),
      Na = {
    a: function a(b) {
      var c = [H.a(b), H.a(b)],
          e = [c[1], c[0]],
          g = e,
          l = {
        Fb: function Fb(h) {
          g[1].j();
          g[0].b(h);
          l.Jb();
        },
        Ud: function Ud(h) {
          g[1].u();
          g[0].b(h);
          l.Jb();
        },
        Jb: function Jb() {
          g = g === c ? e : c;
        },
        refresh: function refresh() {
          g[0].refresh();
          g[1].refresh();
        },
        b: function b(h) {
          g[0].b(h);
        },
        oc: function oc() {
          return g[0];
        }
      };
      return l;
    }
  },
      La = function () {
    function b() {
      c = "undefined" === typeof Ma ? JEContext : Ma;
      e = !0;
    }

    var c,
        e = !1,
        g = !1,
        l = !1,
        h = !1,
        t = !1,
        n = !1,
        k = !1,
        m = !1,
        u = !1,
        w = !1,
        C = !1,
        I = !0,
        E = !0,
        M = !0,
        O = !1,
        N = "undefined" === typeof window ? {} : window,
        f = {
      i: function i() {
        if (e) return !0;
        b();
        f.fb();
        f.Aa();
        f.hc();
        f.ic();
        D.i();
        H.i();
        if (!f.cc()) return !1;
        G.i();
        H.wc();
        return !0;
      },
      s: function s() {
        e || b();
        return c.s();
      },
      F: function F() {
        e || b();
        return c.F();
      },
      m: function m() {
        e || b();
        return c.m();
      },
      hc: function hc() {
        C = (w = q.getExtension("EXT_color_buffer_float") || q.getExtension("WEBGL_color_buffer_float") || q.getExtension("OES_color_buffer_float")) ? !0 : !1;
        N.GL_EXT_COLORBUFFERFLOAT = w;
      },
      ic: function ic() {
        q.getExtension("EXT_color_buffer_half_float") || q.getExtension("WEBGL_color_buffer_half_float") || q.getExtension("OES_color_buffer_half_float");
      },
      fb: function fb() {
        if (!g) {
          this.m() || (l = q.getExtension("OES_texture_float") || q.getExtension("MOZ_OES_texture_float") || q.getExtension("WEBKIT_OES_texture_float"), t = (N.GL_EXT_FLOAT = l) ? !0 : !1);
          if (t || this.m()) h = q.getExtension("OES_texture_float_linear") || q.getExtension("MOZ_OES_texture_float_linear") || q.getExtension("WEBKIT_OES_texture_float_linear"), N.GL_EXT_FLOATLINEAR = h;
          g = !0;
        }
      },
      Aa: function Aa() {
        if (!u) {
          if (!this.m()) {
            if (n = q.getExtension("OES_texture_half_float") || q.getExtension("MOZ_OES_texture_half_float") || q.getExtension("WEBKIT_OES_texture_half_float")) O = n.HALF_FLOAT_OES, k = !0;
            !O && q.HALF_FLOAT && (O = q.HALF_FLOAT);
            !O && q.FLOAT && (O = q.FLOAT);
            N.GL_EXT_HALFFLOAT = n;
          }

          if (k || this.m()) m = q.getExtension("OES_texture_half_float_linear") || q.getExtension("MOZ_OES_texture_half_float_linear") || q.getExtension("WEBKIT_OES_texture_half_float_linear"), N.GL_EXT_HALFFLOATLINEAR = m;
          u = !0;
        }
      },
      ia: function ia() {
        if (f.m()) return q.HALF_FLOAT;
        f.Aa();
        return k ? O : q.FLOAT;
      },
      bb: function bb() {
        return I;
      },
      Yb: function Yb() {
        return E;
      },
      md: function md() {
        return M;
      },
      Xb: function Xb() {
        return C;
      },
      ec: function ec() {
        E = I = !0;
        var x = q.createFramebuffer();
        q.bindFramebuffer(q.FRAMEBUFFER, x);
        var z = q.createTexture();
        q.bindTexture(q.TEXTURE_2D, z);
        q.texParameteri(q.TEXTURE_2D, q.TEXTURE_MAG_FILTER, q.NEAREST);
        q.texParameteri(q.TEXTURE_2D, q.TEXTURE_MIN_FILTER, q.NEAREST);
        q.texImage2D(q.TEXTURE_2D, 0, f.m() && q.RGBA32F ? q.RGBA32F : q.RGBA, 1, 1, 0, q.RGBA, q.FLOAT, null);
        q.framebufferTexture2D(D.O(), q.COLOR_ATTACHMENT0, q.TEXTURE_2D, z, 0);
        var ba = q.checkFramebufferStatus(D.Ca());
        ba !== q.FRAMEBUFFER_COMPLETE && (I = !1);
        q.texImage2D(q.TEXTURE_2D, 0, f.m() && q.RGBA16F ? q.RGBA16F : q.RGBA, 1, 1, 0, q.RGBA, f.ia(), null);
        q.framebufferTexture2D(D.O(), q.COLOR_ATTACHMENT0, q.TEXTURE_2D, z, 0);
        ba = q.checkFramebufferStatus(D.Ca());
        ba !== q.FRAMEBUFFER_COMPLETE && (E = !1);
        q.bindTexture(q.TEXTURE_2D, null);
        q.bindFramebuffer(q.FRAMEBUFFER, null);
        q.deleteTexture(z);
        q.deleteFramebuffer(x);
      },
      dc: function dc() {
        var x = D.a({
          width: 1
        });
        x.Eb();
        var z = H.a({
          width: 1,
          isFloat: !0,
          Z: 3
        });
        x.j();
        z.j();
        q.flush();
        q.checkFramebufferStatus(D.Ca()) !== q.FRAMEBUFFER_COMPLETE ? (H.Vc(), M = !1) : M = !0;
        x.remove();
        z.remove();
      },
      cc: function cc() {
        f.ec();
        if (!I && !E) return !1;
        f.dc();
        return !0;
      }
    };
    return f;
  }(),
      Ka = function () {
    var b = !1,
        c = [.8, 1, .8, 1],
        e = 0,
        g,
        l = new Uint8Array(4),
        h = c.concat(c, c, c),
        t = !0,
        n = {
      i: function i() {
        function k(E, M, O, N) {
          q.texParameteri(q.TEXTURE_2D, q.TEXTURE_MIN_FILTER, N ? q.NEAREST_MIPMAP_NEAREST : q.LINEAR);

          try {
            var f = q.getError();
            f !== q.NO_ERROR && console.log("GLERR in test_mipmapping() :", f);
            q.texImage2D(q.TEXTURE_2D, 0, E, 2, 2, 0, q.RGBA, M, O);
            f = q.getError();
            if (f !== q.NO_ERROR) return !1;
          } catch (x) {
            return !1;
          }

          N && q.generateMipmap(q.TEXTURE_2D);
          G.xa();
          G.g(!1, !0);
          q.readPixels(0, 0, 1, 1, q.RGBA, q.UNSIGNED_BYTE, l);
          f = q.getError();
          f === q.INVALID_OPERATION && "undefined" !== typeof q.PIXEL_PACK_BUFFER && (q.bindBuffer(q.PIXEL_PACK_BUFFER, null), q.readPixels(0, 0, 1, 1, q.RGBA, q.UNSIGNED_BYTE, l), f = q.getError());
          return f !== q.NO_ERROR ? !1 : 0 !== l[0];
        }

        function m(E) {
          return La.bb() && k(w, q.FLOAT, new Float32Array(h), E) ? (e = 3, !0) : !1;
        }

        function u(E) {
          return La.Yb() ? k(C, La.ia(), new Uint16Array(h), E) || k(C, q.FLOAT, new Float32Array(h), E) ? (e = 2, !0) : !1 : !1;
        }

        La.fb();
        La.Aa();
        var w = q.RGBA,
            C = q.RGBA;

        if (Ma.m()) {
          var I = q.RGBA32F;
          I && (w = I);
          (I = q.RGBA16F) && (C = I);
        }

        G.i();
        D.reset();
        D.D();
        q.viewport(0, 0, 1, 1);
        v.set("s0");
        b = !0;
        g = q.createTexture();
        q.activeTexture(q.TEXTURE0);
        q.bindTexture(q.TEXTURE_2D, g);
        q.texParameteri(q.TEXTURE_2D, q.TEXTURE_WRAP_S, q.REPEAT);
        q.texParameteri(q.TEXTURE_2D, q.TEXTURE_WRAP_T, q.REPEAT);
        q.texParameteri(q.TEXTURE_2D, q.TEXTURE_MAG_FILTER, q.NEAREST);
        if (u(!0) || m(!0)) return !0;
        t = !1;
        if (u(!1) || m(!1)) return !0;

        if (Ma.m()) {
          C = w = q.RGBA;
          if (u(!0) || m(!0)) return !0;
          t = !1;
          if (u(!1) || m(!1)) return !0;
        }

        return !1;
      },
      Zb: function Zb() {
        return t;
      },
      Cd: function Cd() {
        return e;
      },
      Md: function Md() {
        b || n.i();
        return 3 === e;
      },
      zc: function zc() {
        b || n.i();
        return 2 === e;
      }
    };
    return n;
  }(),
      Oa = {
    a: function a(b) {
      var c = H.a(b.alpha),
          e = H.a(b.beta);
      return {
        gc: function gc() {
          c.b(1);
          e.b(2);
        }
      };
    }
  },
      Ra = {
    a: function a(b) {
      var c = b.bd;
      c.index = b.index;
      c.L = b.L;
      c.parent = b.parent;

      switch (c.type) {
        case "input":
          b = Pa.a(c);
          break;

        default:
          b = Qa.a(c);
      }

      return b;
    }
  },
      Pa = {
    a: function a(b) {
      "undefined" === typeof b.sift && (b.sift = !1);
      "undefined" === typeof b.DWT && (b.DWT = !1);
      "undefined" === typeof b.blur && (b.blur = !1);
      "undefined" === typeof b.siftOutWidth && (b.siftOutWidth = !1);
      "undefined" === typeof b.density && (b.density = 1);
      var c = !1;

      if (b.mask) {
        c = !0;
        _a && void 0 !== _a.Sb && (b.mask = _a.Sb + b.mask);
        var e = H.a({
          isFloat: !1,
          url: b.mask
        });
      }

      var g = !1,
          l = "undefined" !== typeof b.preprocessing ? b.preprocessing : !1,
          h = !1;
      b.sift ? Sift.i({
        vc: q,
        fa: !1,
        width: b.size,
        Rd: b.siftOutWidth
      }) : b.DWT && DWT.i({
        vc: q,
        fa: !1,
        width: b.size
      });
      var t = !1;
      b.customInputShader && (t = "s41", v.Va({
        name: "_",
        id: t,
        c: b.customInputShader,
        f: ["uSource"],
        precision: "lowp"
      }), v.C(t, [{
        type: "1i",
        name: "_",
        value: 0
      }]));

      switch (l) {
        case "sobel":
          var n = "s30";
          h = !0;
          break;

        case "meanNormalization":
          n = "s31";
          h = !0;
          break;

        case "grayScale":
          n = "s29";
          h = !1;
          break;

        case "copy":
          n = "s0";
          break;

        case "inputLightRegulation":
          n = t ? t : "s29";
          Sa.i({
            width: b.size,
            tb: b.nBlurPass,
            yc: !1
          });
          g = !0;
          break;

        case "direct":
        case "none":
          n = !1;
          break;

        default:
          n = "s3";
      }

      c && (n += "Mask");
      if (b.blur) var k = H.a({
        isFloat: !1,
        isPot: !1,
        width: b.size
      });
      var m = H.a({
        isFloat: !1,
        isPot: !1,
        width: b.size
      }),
          u = {
        s: function s() {
          return b.sift ? Sift.Y() : b.size;
        },
        Y: function Y() {
          return u.s();
        },
        rc: function rc() {
          return b.sift ? Sift.ja() : b.DWT ? DWT.ja() : g ? Sa.ja() : m;
        },
        w: function w() {
          D.H();
          b.blur && (k.u(), v.set("s42"), v.I("u7", 1 / b.size, 1 / b.size), G.g(!1, !0), k.b(0));
          n && (v.set(n), h && v.A("u28", 1 / b.size), m.u(), c && e.b(1), G.g(!1, !1), m.b(0), g ? Sa.Ma(m) : b.sift ? (v.S(), Sift.Ma()) : b.DWT && (v.S(), DWT.Ma(4)));
        }
      };
      return u;
    }
  },
      Qa = {
    a: function a(b) {
      "undefined" === typeof b.disableNormalize && (b.disableNormalize = !1);

      var c = [],
          e = [],
          g,
          l,
          h = !1,
          t,
          n = !0,
          k,
          m,
          u = b.isReorganize ? b.isReorganize : !1,
          _w = b.kernelsNumber ? !0 : !1,
          C = b.dynPelu ? Oa.a(b.dynPelu) : !1,
          I = C ? !0 : !1,
          E = {
        isEnabled: !1
      },
          M;

      if ("softmax" === b.type) {
        b.activation = "softmax";
        b.size = Math.pow(2, Math.ceil(Math.log(Math.sqrt(b.num_classes)) / Math.log(2)));
        b.sparsity = "undefined" !== typeof b.sparsity ? b.sparsity : b.L.Y();
        b.gain = "undefined" !== typeof b.gain ? b.gain : 1;
        v.C("s20", [{
          type: "1f",
          name: "u10",
          value: b.gain
        }]);
        var O = H.a({
          isFloat: !0,
          isPot: !1,
          width: b.size
        }),
            N = H.a({
          isFloat: !0,
          isPot: !1,
          width: b.size,
          isMipmap: !0
        });
        n = !1;
        var f = new Uint8Array(Math.pow(4 * b.size, 2)),
            x;

        for (x = 0; x < b.size * b.size; ++x) {
          var z = x < b.num_classes ? 255 : 0;
          f[4 * x] = z;
          f[4 * x + 1] = z;
          f[4 * x + 2] = z;
          f[4 * x + 3] = z;
        }

        var ba = H.a({
          isFloat: !1,
          isPot: !1,
          width: b.size,
          array: f
        });
      } else b.cost ? (b.sparsity = "undefined" !== typeof b.sparsity ? b.sparsity : b.L.Y(), n = !1) : "full" === b.connectivityUp && (b.sparsity = b.L.Y());

      var pa = {
        elu: "s15",
        elu01: "s16",
        relu: "s14",
        arctan: "s18",
        sigmoid: "s13",
        copy: "s0",
        softplus: "s19",
        softmax: "s20",
        dynPelu: "s17"
      }[b.activation],
          ua = b.sparsity * b.sparsity,
          oa = !1,
          X = b.size;

      if (b.maxPooling) {
        switch (b.maxPooling.size) {
          case 2:
            var d = "s32";
            break;

          case 4:
            d = "s33";
        }

        oa = !0;
        X /= b.maxPooling.size;
        var A = H.a({
          isFloat: !0,
          isPot: !1,
          width: X
        });
      }

      var F = void 0 !== b.Mc && b.Mc ? !0 : !1,
          R = null,
          Y = null,
          Z = null;
      F && (R = "s43" + b.index.toString(), v.lb("s43", R, [((b.normalization.n - 1) / 2).toFixed(1)]), v.C(R, [{
        type: "1i",
        name: "u1",
        value: 0
      }, {
        type: "2f",
        name: "u7",
        value: [1 / b.size, 1 / b.size]
      }, {
        type: "1f",
        name: "u6",
        value: b.normalization.alpha
      }, {
        type: "1f",
        name: "u9",
        value: b.normalization.beta
      }, {
        type: "1f",
        name: "u32",
        value: b.normalization.k
      }]), Y = H.a({
        isFloat: !0,
        isPot: !0,
        width: b.size
      }), Z = H.a({
        isFloat: !0,
        isPot: !0,
        width: b.size
      }));
      var da, ta, ea, ca;
      n && (ca = H.a({
        isFloat: !0,
        isPot: !1,
        width: b.size
      }));
      var qa = H.a(b.bias),
          aa,
          J = {
        s: function s() {
          return b.size;
        },
        Y: function Y() {
          return X;
        },
        ib: function ib() {
          return b.num_classes;
        },
        Vb: function Vb(y) {
          M.b(y);
        },
        Pc: function Pc() {
          b.remap && b.remap.isEnabled && (E = {
            isEnabled: !0,
            Bc: H.a({
              isFloat: !1,
              isFlipY: !1,
              array: new Uint8Array(b.remap.maskTexture.data),
              width: b.remap.maskTexture.width,
              isPot: !1
            }),
            layers: b.remap.layers.map(function (y) {
              return b.parent.pc(y);
            }),
            depth: b.remap.depth
          });
        },
        Xc: function Xc() {
          switch (b.connectivityUp) {
            case "gaussian":
              aa = Ta.a(b.connectivity);
              break;

            case "direct":
              aa = Ua.a(b.connectivity);
              break;

            case "square":
              aa = Va.a(b.connectivity);
              break;

            case "squareFast":
              aa = Wa.a(b.connectivity, b.activation);
              break;

            case "full":
              aa = Xa.a(b.connectivity);
              break;

            case "conv":
              m = b.kernelsNumber, aa = Ya.a(b.connectivity), u && (k = H.a({
                width: X,
                isFloat: !0,
                isFlipY: !1,
                isPot: !1
              }));
          }

          if (aa.M) {
            var y = b.size * b.sparsity;
            ta = Math.log(y / b.size) / Math.log(2);
            da = H.a({
              isMipmap: !0,
              isFloat: !0,
              isPot: !0,
              width: y,
              rb: ta
            });
            ea = H.a({
              isFloat: !0,
              isPot: !0,
              width: b.size
            });
          }
        },
        w: function w(y, U) {
          M = y;
          aa.M ? (da.u(), _w && qa.b(2), aa.w(E), da.b(0), da.gb(ta), ea.u(), _w ? v.set("s0") : (v.set("s28"), v.A("u27", ua), qa.b(1)), da.ab(ta, 0), G.g(!1, !1), v.set(pa), F ? Y.j() : ca.j(), ea.b(0), I && C.gc(), G.g(!1, !1)) : (ca.u(), qa.b(1), aa.w());
          F && (v.set(R), Z.j(), Y.b(0), G.g(!1, !1), v.set("s44"), v.A("u6", 1), ca.j(), Z.b(1), G.g(!1, !1));
          if (n) return oa ? (A.u(), ca.b(0), v.set(d), v.I("u7", 1 / b.size, 1 / b.size), G.g(!1, !1), U = A) : U = ca, U.b(0), u && (k.j(), v.set("s22"), v.I("u14", m, X / m), G.g(!1, !1), U = k, k.b(0)), U;

          if ("softmax" === b.type) {
            v.set("s20");
            ca.b(0);
            O.j();
            G.g(!1, !1);
            b.disableNormalize ? y = O : (v.set("s2"), O.b(0), ba.b(1), N.j(), G.g(!1, !1), v.set("s0"), l.u(), N.b(0), N.gb(!1), G.g(!1, !1), v.set("s21"), g.u(), N.ab(!1, 0), v.A("u12", ca.tc()), l.b(1), G.g(!1, !1), y = g);

            if (U) {
              switch (h) {
                case "cpuRGBAAvg":
                  break;

                default:
                  var V = J.yb(y);
              }

              return V;
            }

            return !1;
          }

          if (b.cost) {
            v.set("gpuRawAvg" === h ? "s8" : "s7");
            U = ca;
            b.disableNormalize || (v.A("u4", 1 / b.size), g.u(), ca.b(0), G.g(!1, !1), U = g);

            switch (h) {
              case "cpuRGBA2Float":
                U.za();
                V = J.yb(U);
                t(V);
                break;

              case "gpuRawAvg":
              case "gpuRaw":
                U.b(0), t(U);
            }

            return !1;
          }
        },
        bc: function bc(y) {
          y && "undefined" !== typeof y.xb && (h = y.xb, t = y.Oc);
          ca = H.a({
            isFloat: !0,
            isPot: !0,
            isMipmap: "softmax" === b.type,
            width: b.size
          });
          "softmax" === b.type && (l = H.a({
            isFloat: !0,
            isPot: !0,
            width: 1
          }));
          var U = 0,
              V = 0,
              T = "undefined" !== typeof b.num_classes && b.num_classes ? b.num_classes : b.size * b.size;

          for (y = 0; y < T; ++y) {
            c.push(U + (b.size - 1 - V) * b.size), e.push([-1, -1, -1, -1]), ++U, U === b.size && (U = 0, ++V);
          }

          b.disableNormalize || (g = H.a({
            isFloat: !0,
            isPot: !0,
            width: b.size
          }));
        },
        yb: function yb(y) {
          y.za();
          var U = y.Na();
          c.forEach(function (V, T) {
            e[T][0] = U[0][V];
            e[T][1] = U[1][V];
            e[T][2] = U[2][V];
            e[T][3] = U[3][V];
          });
          return e;
        }
      };
      b.L && J.Xc(b.L);
      return J;
    }
  };

  function Za() {
    var b = {},
        c,
        e;
    b || (b = {});

    this.pc = function (g) {
      return c[g];
    };

    this.Uc = function (g) {
      var l = !1;
      c = g.map(function (h, t) {
        return l = h = Ra.a({
          index: t,
          parent: this,
          bd: h,
          L: l
        });
      });
      e = c[c.length - 1];
      c.forEach(function (h, t) {
        0 !== t && h.Pc();
      });
    };

    this.w = function (g, l) {
      var h = l;
      c.forEach(function (t) {
        h = t.w(h, g);
      });
      return h;
    };

    this.sc = function () {
      return e.s();
    };

    this.ja = function () {
      return e.rc();
    };

    this.Wc = function (g) {
      e.bc(g);
    };

    this.ib = function () {
      return e.ib();
    };
  }

  var Ua = {
    a: function a(b) {
      var c = H.a(b.weights);
      delete b.weights.data;
      return {
        M: !0,
        X: function X() {
          return 1;
        },
        uc: function uc() {
          return c;
        },
        w: function w() {
          v.set("s27");
          c.b(1);
          G.g(!1, !1);
        }
      };
    }
  },
      Xa = {
    a: function a(b) {
      var c = b.fromLayerSize,
          e = H.a(b.weights);
      return {
        M: !0,
        X: function X() {
          return c;
        },
        w: function w(g) {
          if (g.isEnabled) {
            v.set("s25");
            g.Bc.b(3);
            var l,
                h = Math.min(g.layers.length, g.depth);

            for (l = 0; l < h; ++l) {
              g.layers[l].Vb(4 + l);
            }
          } else v.set("s24");

          v.A("u18", b.toLayerSize);
          e.b(1);
          G.g(!1, !1);
        }
      };
    }
  },
      Ta = {
    a: function a(b) {
      var c = b.toSparsity * b.toLayerSize,
          e = c / b.fromLayerSize,
          g = H.a(b.weights);
      H.a({
        width: c,
        isFloat: !0,
        array: new Float32Array(b.fromBindings),
        isPot: !0
      });
      var l = H.a({
        width: c,
        isFloat: !0,
        array: new Float32Array(b.toBindings),
        isPot: !0
      });
      return {
        M: !0,
        X: function X() {
          return e;
        },
        w: function w() {
          v.set("s23");
          g.b(1);
          l.b(2);
          G.g(!1, !0);
        }
      };
    }
  },
      Va = {
    a: function a(b) {
      var c = b.fromLayerSize,
          e = b.toLayerSize,
          g = b.toSparsity,
          l = g * e,
          h = l / c,
          t = c / e,
          n,
          k,
          m,
          u,
          w = 0,
          C = 0,
          I = 0,
          E = Array(g * e * g * e * 4),
          M = Array(g * e * g * e * 4),
          O = Array(c * c);

      for (n = 0; n < O.length; ++n) {
        O[n] = 0;
      }

      var N = Math.floor(g / 2),
          f = .5 / e,
          x = .5 / c,
          z = .5 / l;

      for (n = 0; n < e; ++n) {
        for (k = 0; k < e; ++k) {
          var ba = Math.round(n * t);
          var pa = Math.round(k * t);
          var ua = n / e;
          var oa = k / e;
          ua += f;
          oa += f;

          for (m = 0; m < g; ++m) {
            for (u = 0; u < g; ++u) {
              var X = w / l;
              var d = C / l;
              var A = ba + m - N;
              var F = pa + u - N;
              0 > A && (A += c);
              0 > F && (F += c);
              A >= c && (A -= c);
              F >= c && (F -= c);
              var R = A / c;
              var Y = F / c;
              d = 1 - d - 1 / l;
              R += x;
              Y += x;
              X += z;
              d += z;
              var Z = n * g + m,
                  da = k * g + u;
              da = e * g - da - 1;
              Z = da * e * g + Z;
              E[4 * Z] = X;
              E[4 * Z + 1] = d;
              E[4 * Z + 2] = R;
              E[4 * Z + 3] = Y;
              R = O[F * c + A]++;
              Y = R % h;
              A = A * h + Y;
              F = F * h + (R - Y) / h;
              F = c * h - 1 - F;
              F = F * c * h + A;
              M[4 * F] = X;
              M[4 * F + 1] = d;
              M[4 * F + 2] = ua;
              M[4 * F + 3] = oa;
              ++w >= l && (w = 0, ++C);
              ++I;
            }
          }
        }
      }

      var ta = H.a(b.weights);
      H.a({
        width: l,
        isFloat: !0,
        array: new Float32Array(M),
        isPot: !0
      });
      M = null;
      var ea = H.a({
        width: l,
        isFloat: !0,
        array: new Float32Array(E),
        isPot: !0
      });
      E = null;
      return {
        M: !0,
        X: function X() {
          return h;
        },
        w: function w() {
          v.set("s23");
          ta.b(1);
          ea.b(2);
          G.g(!1, !1);
        }
      };
    }
  },
      Ya = {
    a: function a(b) {
      var c = b.kernelsNumber,
          e = b.toSparsity,
          g = e * b.toLayerSize / b.fromLayerSize,
          l = H.a(b.weights);
      return {
        M: !0,
        X: function X() {
          return g;
        },
        Fd: function Fd() {
          return e;
        },
        uc: function uc() {
          return l;
        },
        w: function w() {
          v.set("s26");
          v.A("u24", c);
          v.A("u25", e);
          v.A("u18", b.toLayerSize);
          v.A("u26", b.fromLayerSize);
          l.b(1);
          G.g(!1, !1);
        }
      };
    }
  },
      Wa = {
    a: function a(b, c) {
      var e = b.fromLayerSize,
          g = b.toLayerSize,
          l = b.toSparsity,
          h = b.stride ? b.stride : 1,
          t = l * g / e,
          n = g < e,
          k = e / g,
          m = H.a(b.weights),
          u = "s45" + [e.toString(), g.toString(), l.toString(), h.toString(), c].join("_");
      v.jc(u) || (b = Ea(c), g = [{
        type: "1f",
        name: "u18",
        value: g
      }, {
        type: "1f",
        name: "u31",
        value: h
      }], n && g.push({
        type: "1f",
        name: "u26",
        value: e
      }), e = [(n ? t : l).toFixed(1), b], n && e.push(k.toFixed(1)), v.lb(n ? "s38" : "s37", u, e), v.C(u, g.concat([{
        type: "1i",
        name: "u16",
        value: 0
      }, {
        type: "1i",
        name: "u23",
        value: 1
      }, {
        type: "1i",
        name: "u15",
        value: 3
      }])));
      return {
        M: !1,
        X: function X() {
          return t;
        },
        w: function w() {
          v.set(u);
          m.b(3);
          G.g(!1, !1);
        }
      };
    }
  },
      Sa = function () {
    var b, c, e, g, l, h, t, n, k;
    return {
      i: function i(m) {
        b = m.tb ? m.tb : 3;
        c = m.width ? m.width : 64;
        g = m.yc ? !0 : !1;
        m = {
          isFloat: !1,
          width: c,
          isPot: !1,
          isFlipY: !1
        };
        l = H.a(m);
        h = H.a(m);
        t = H.a(m);
        n = H.a(m);
        k = H.a({
          isFloat: !0,
          width: c,
          isPot: !1,
          isFlipY: !1
        });
        e = 1 / c;
      },
      Ma: function Ma(m) {
        v.set("s35");

        for (var u = 0; u < b; ++u) {
          l.j(), v.I("u7", e, 0), G.g(g, !1), h.j(), l.b(0), v.I("u7", 0, e), G.g(g, !1), h.b(0);
        }

        v.set("s34");
        n.j();
        m.b(0);
        G.g(g);
        v.set("s35");

        for (u = 0; u < b; ++u) {
          t.j(), n.b(0), v.I("u7", e, 0), G.g(g, !1), n.j(), t.b(0), v.I("u7", 0, e), G.g(g, !1);
        }

        v.set("s36");
        k.j();
        m.b(0);
        h.b(1);
        n.b(2);
        G.g(g, !1);
        k.b(0);
      },
      ja: function ja() {
        return k;
      }
    };
  }();

  function $a(b, c) {
    b[c] = !0;
    b.setAttribute(c, "true");
  }

  function ab() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  }

  function bb() {
    var b = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
    return [parseInt(b[1], 10), parseInt(b[2], 10), parseInt(b[3] || 0, 10)];
  }

  function cb() {
    var b = navigator.userAgent.toLowerCase();
    return -1 !== b.indexOf("safari") && -1 === b.indexOf("chrome") ? !0 : !1;
  }

  function db() {
    return navigator.mediaDevices && navigator.mediaDevices.getUserMedia ? !0 : !1;
  }

  function eb(b) {
    if (!b) return b;
    var c = !1;

    if (b.video) {
      var e = function e(g) {
        var l = {};
        "undefined" !== typeof g.min && (l.min = g.min);
        "undefined" !== typeof g.max && (l.max = g.max);
        "undefined" !== typeof g.ideal && (l.ideal = g.ideal);
        return l;
      };

      c = {};
      "undefined" !== typeof b.video.width && (c.width = e(b.video.width));
      "undefined" !== typeof b.video.height && (c.height = e(b.video.height));
      "undefined" !== typeof b.video.facingMode && (c.facingMode = b.video.facingMode);
    }

    c = {
      audio: b.audio,
      video: c
    };
    "undefined" !== typeof b.deviceId && (c.deviceId = b.deviceId);
    return c;
  }

  function fb(b) {
    var c = b.video.width;
    b.video.width = b.video.height;
    b.video.height = c;
    return b;
  }

  function gb(b) {
    function c(w) {
      return [480, 576, 640, 648, 720, 768, 800, 960, 1080, 1152, 1280, 1366, 1920].sort(function (C, I) {
        return Math.abs(C - w) - Math.abs(I - w);
      });
    }

    function e(w) {
      g.push(w(eb(b)));
    }

    var g = [];
    if (!b || !b.video) return g;

    if (b.video.width && b.video.height) {
      if (b.video.width.ideal && b.video.height.ideal) for (var l = c(b.video.width.ideal).slice(0, 3), h = c(b.video.height.ideal).slice(0, 3), t = 0, n; t < l.length; ++t) {
        n = l[t];

        for (var k = 0, m; k < h.length; ++k) {
          if (m = h[k], n !== b.video.width.ideal || m !== b.video.height.ideal) {
            var u = Math.max(n, m) / Math.min(n, m);
            u < 4 / 3 - .1 || u > 16 / 9 + .1 || e(function (w) {
              w.video.width.ideal = n;
              w.video.height.ideal = m;
              return w;
            });
          }
        }
      }
      e(function (w) {
        return fb(w);
      });
    }

    b.video.width && b.video.height && (b.video.width.ideal && b.video.height.ideal && e(function (w) {
      delete w.video.width.ideal;
      delete w.video.height.ideal;
      return w;
    }), e(function (w) {
      delete w.video.width;
      delete w.video.height;
      return w;
    }));
    b.video.facingMode && (e(function (w) {
      delete w.video.facingMode;
      return w;
    }), b.video.width && b.video.height && e(function (w) {
      fb(w);
      delete w.video.facingMode;
      return w;
    }));
    g.push({
      audio: b.audio,
      video: !0
    });
    return g;
  }

  function hb(b) {
    try {
      var c = window.matchMedia("(orientation: portrait)").matches ? !0 : !1;
    } catch (g) {
      c = window.innerHeight > window.innerWidth;
    }

    if (c && b && b.video) {
      c = b.video.width;
      var e = b.video.height;
      c && e && c.ideal && e.ideal && c.ideal > e.ideal && (b.video.height = c, b.video.width = e);
    }
  }

  function ib(b) {
    b.volume = 0;
    $a(b, "muted");

    if (cb()) {
      if (1 === b.volume) {
        var c = function c() {
          b.volume = 0;
          window.removeEventListener("mousemove", c, !1);
          window.removeEventListener("touchstart", c, !1);
        };

        window.addEventListener("mousemove", c, !1);
        window.addEventListener("touchstart", c, !1);
      }

      setTimeout(function () {
        b.volume = 0;
        $a(b, "muted");
      }, 5);
    }
  }

  function jb(b, c, e, g) {
    function l(t) {
      h || (h = !0, e(t));
    }

    var h = !1;
    navigator.mediaDevices.getUserMedia(g).then(function (t) {
      function n() {
        setTimeout(function () {
          if (b.currentTime) {
            var k = b.videoWidth,
                m = b.videoHeight;
            if (0 === k || 0 === m) l("VIDEO_NULLSIZE");else {
              k && (b.style.width = k.toString() + "px");
              m && (b.style.height = m.toString() + "px");
              k = {
                $b: null,
                ad: null,
                Ec: null
              };

              try {
                var u = t.getVideoTracks()[0];
                u && (k.Ec = u, k.$b = u.getCapabilities(), k.ad = u.getSettings());
              } catch (w) {}

              cb() || ab() ? b.parentNode && null !== b.parentNode ? (h || c(b, t, k), setTimeout(function () {
                b.play();
              }, 100)) : (document.body.appendChild(b), ib(b), h || c(b, t, k), setTimeout(function () {
                b.style.transform = "scale(0.0001,0.0001)";
                b.style.position = "fixed";
                b.style.bottom = "0px";
                b.style.right = "0px";
                ib(b);
                setTimeout(function () {
                  b.play();
                }, 100);
              }, 80)) : h || c(b, t, k);
            }
          } else l("VIDEO_NOTSTARTED");
        }, 700);
      }

      "undefined" !== typeof b.srcObject ? b.srcObject = t : (b.src = window.URL.createObjectURL(t), b.videoStream = t);
      ib(b);
      b.addEventListener("loadeddata", function () {
        var k = b.play();
        ib(b);
        "undefined" === typeof k ? n() : k.then(function () {
          n();
        }).catch(function () {
          l("VIDEO_PLAYPROMISEREJECTED");
        });
      }, !1);
    }).catch(function (t) {
      l(t);
    });
  }

  function kb(b, c, e) {
    var g = db() ? document.createElement("video") : !1;
    if (g) {
      if (db()) {
        if (e && e.video) {
          if (ab()) {
            var l = bb();
            (12 > l[0] || 12 === l[0] && 2 > l[1]) && hb(e);
          }

          e.video.width && e.video.width.ideal && (g.style.width = e.video.width.ideal + "px");
          e.video.height && e.video.height.ideal && (g.style.height = e.video.height.ideal + "px");
        }

        $a(g, "autoplay");
        $a(g, "playsinline");
        e && e.audio ? g.volume = 0 : $a(g, "muted");
        jb(g, b, function () {
          function h(n) {
            if (0 === n.length) c("INVALID_FALLBACKCONSTRAINS");else {
              var k = n.shift();
              jb(g, b, function () {
                h(n);
              }, k);
            }
          }

          var t = gb(e);
          h(t);
        }, e);
      } else c && c("MEDIASTREAMAPI_NOTFOUND");
    } else c && c("VIDEO_NOTPROVIDED");
  }

  var lb = function () {
    var b = 0,
        c,
        e,
        g,
        l;
    return {
      i: function i(h, t) {
        b = h.length;
        c = t;
        e = h;
        g = new Float32Array(b);
        l = new Float32Array(b);
      },
      qc: function qc() {
        return l;
      },
      cd: function cd(h, t, n) {
        h.forEach(function (k, m) {
          var u = Math.min(1, e[m] * n * (t + .33 * (1 - t)));
          k = u * k + (1 - u) * g[m];
          g[m] = k;
          l[m] = c[m](k);
        });
      }
    };
  }(),
      W = {
    T: [],
    ua: !1,
    va: !1,
    ta: !1,
    Ua: !1,
    ba: !0,
    aa: !1,
    ready: !1,
    initialized: !1
  },
      mb = {
    facingMode: "user",
    idealWidth: 320,
    idealHeight: 240,
    minWidth: 240,
    maxWidth: 1280,
    minHeight: 240,
    maxHeight: 1280
  },
      _a = {
    save: "jeelizFaceTransferNNC.json",
    Sa: "../../",
    Rb: 0,
    ka: 64,
    width: 512,
    height: 512,
    Fc: .25,
    Cc: .7,
    Jc: 3,
    borderWidth: .4,
    W: .35,
    Kc: 5,
    Lc: 3,
    Qa: [.06, .08, .15],
    ed: 55,
    Gc: .6,
    Dc: 5.8,
    Nb: .75,
    Mb: 1,
    Wa: [.03, 1],
    hd: 20,
    da: .2,
    N: [30, 55],
    Ta: 3,
    Tb: 1 / 3.5,
    wb: 11,
    sb: 1,
    Hc: 1,
    Xa: [.1, .01],
    Rc: [.4, -.7, -.4],
    Sc: [.3, 0, 0],
    Db: [5, 7],
    fc: !1,
    R: [0, 7],
    Za: .001,
    Ya: [Math.PI / 10, Math.PI / 6],
    zb: [0, 6],
    Ab: [.1, .4],
    Bb: [.009, .02],
    Cb: [.02, .04],
    Ka: 8,
    kb: [3, 7],
    jb: .05,
    Qb: [.2, .2, .15, .15, .15, .15, .2, .2, .15, .15, .2],
    Ic: [za.bind(null, .05, .7), za.bind(null, .05, .7), za.bind(null, 0, .4), za.bind(null, 0, .4), za.bind(null, 0, .6), za.bind(null, 0, .6), Aa.bind(null, .1, .6), za.bind(null, .1, .4), Ca.bind(null, .68, .77, 2), Ca.bind(null, .68, .77, 2), za.bind(null, .15, .5)]
  };

  W.get_nMorphs = function () {
    return _a.wb;
  };

  var nb = !1,
      ob = !1;

  function pb() {
    var b, c, e, g, l, h, t, n, k, m, u;

    function w() {
      1 === ++J && (lb.i(_a.Qb, _a.Ic), C(), W.ready = !0, W.T.forEach(function (L) {
        L();
      }), W.T.splice(0, W.T.length), I(), J = 0);
    }

    function C() {
      Y = wa();
      Z = new Uint8Array(pa * pa * 4);

      W.get_morphTargetInfluences = function () {
        return Y;
      };

      W.get_morphTargetInfluencesStabilized = function () {
        return lb.qc();
      };

      W.set_morphUpdateCallback = function (L) {
        qa = L;
      };

      W.get_rotation = function () {
        return ta;
      };

      W.get_positionScale = function () {
        var L = F.Ib.oc();
        L.za();
        L = L.Na();
        aa[0] = 1 - L[1][0];
        aa[1] = L[2][0];
        aa[2] = L[3][0] * ua[0];
        return aa;
      };

      W.get_rotationStabilized = function () {
        return ca;
      };

      W.switch_sleep = function (L) {
        U !== y.qa || L ? U = L ? y.qa : y.ga_ : I();
      };

      W.on_detect = function (L) {
        L(V.G);
        V.La.push(L);
      };

      W.is_detected = function () {
        return V.G;
      };

      W.set_animateDelay = function (L) {
        f = L;
      };
    }

    function I() {
      U !== y.ga_ && (U = y.ga_, T.timestamp = Date.now(), x && window.clearTimeout(x), z && window.cancelAnimationFrame(z), M());
    }

    function E() {
      U !== y.qa && (x = setTimeout(M, f));
    }

    function M() {
      var L = d.currentTime - xa;
      0 > L && (xa = d.currentTime);
      1E3 * L < _a.hd || (A.refresh(), xa += L, v.set("s47"), D.H(), F.Fa.u(), A.b(0), G.g(!1, !0));
      L = U === y.ga_ ? T.na : 1;

      for (var la = 0; la < L; ++la) {
        var B = F,
            ma = ba;
        v.set("s48");
        D.H();
        B.Ga.u();
        B.Fa.b(0);
        B.ra.b(1);
        G.g(!1, !1);
        B.Ga.b(0);
        ma.w(!1, B.Ga);
      }

      W.ba && (D.fd(), v.set("s5"), F.Fa.b(0), G.g(!1, !1), q.enable(q.BLEND), q.blendFunc(q.SRC_ALPHA, q.ONE), R.b(0), G.g(!1, !1), q.disable(q.BLEND));
      q.flush();
      la = Date.now();
      B = la - T.timestamp;
      T.timestamp = la;
      T.ub = L / B;
      T.Ja = T.ub * _a.da + T.Ja * (1 - _a.da);
      T.vb = 1E3 / B;
      T.P = T.vb * _a.da + T.P * (1 - _a.da);
      T.P > _a.N[1] ? (++T.na, T.P = (_a.N[0] + _a.N[1]) / 2) : T.P < _a.N[0] && (T.na = Math.max(T.na - 1, _a.Ta), T.P = (_a.N[0] + _a.N[1]) / 2);
      T.ea = _a.Tb / Math.max(T.Ja, .001);
      U !== y.qa && (z = window.requestAnimationFrame(E));
    }

    var O,
        N,
        f = _a.Rb,
        x = !1,
        z = !1,
        ba,
        pa,
        ua,
        oa,
        X,
        d,
        A,
        F = {},
        R,
        Y = !1,
        Z,
        da = [0, 0, 0],
        ta = [0, 0, 0],
        ea = [0, 0, 0],
        ca = [0, 0, 0],
        qa = !1,
        aa = [0, 0, 0],
        J = 0,
        y = {
      Ac: -2,
      qa: -1,
      ga_: 0
    },
        U = y.Ac,
        V = {
      ma: 0,
      G: !1,
      La: []
    },
        T = {
      timestamp: 0,
      ub: 0,
      Ja: 0,
      na: _a.Ta,
      vb: 0,
      P: 0,
      ea: 1
    },
        ia = 1,
        va = 1,
        Da = 1,
        Ba = 1,
        fa = [0, 0, 0],
        ka = Date.now(),
        na = new Float32Array(_a.Ka),
        ra = 0,
        xa = 0,
        ya = {
      xc: function xc() {
        O = _a.width;
        N = _a.height;
        oa = _a.Fc;
        X = _a.Cc;
        var L = O / _a.ka;
        oa *= L;
        X *= L;
        l = (1 - 2 * _a.borderWidth) / _a.Kc;
        h = (1 - 2 * _a.W) / _a.Lc;
        t = (X - oa) / _a.Jc;
        n = _a.borderWidth;
        k = _a.W;
        m = 1 - _a.borderWidth;
        u = 1 - _a.W;
        b = 0;
        c = _a.borderWidth;
        e = _a.W;
        g = oa;
        ua = [_a.ka / O, _a.ka / N];
      },
      i: function i(L) {
        function la() {
          V.ma = _a.jb * B(_a.kb[0], _a.kb[1]) + (1 - _a.jb) * V.ma;
          .6 < V.ma && !V.G ? (V.La.forEach(function (Q) {
            Q(!0);
          }), V.G = !0) : .4 > V.ma && V.G && (V.La.forEach(function (Q) {
            Q(!1);
          }), V.G = !1);
        }

        function B(Q, P) {
          Q += pa * P;
          return (Z[4 * Q] + Z[4 * Q + 1] + Z[4 * Q + 2] + Z[4 * Q + 3]) / 1020;
        }

        function ma() {
          Y.forEach(function (Q, P) {
            if (V.G) {
              Q = (_a.sb + P) % pa;
              var K = _a.Hc + Math.floor((_a.sb + P) / pa);
              K = pa - 1 - K;
              Y[P] = B(Q, K);
            } else Y[P] = 0;
          });
        }

        function r(Q) {
          ba = new Za();
          ba.Uc(Q.layers);
          ba.Wc({
            xb: "gpuRaw",
            Oc: function Oc(P) {
              var K = F;
              K.ra.Fb(1);
              q.viewport(0, 0, 1, 1);
              v.set("s49");
              v.A("u46", ia);
              v.Gb("u38", c, e, g);
              v.Gb("u39", 1 * _a.Qa[0], 1 * _a.Qa[1], 1 * _a.Qa[2]);
              G.g(!1, !1);
              1 !== ++b % 2 && (g += t, g > X && (c += l, g = oa, c > m && (c = n, e += h, e > u && (e = k))));
              K.Ib.Fb(1);
              v.set("s51");
              v.A("u46", ia);
              K.ra.b(0);
              G.g(!1, !1);
              H.Qc(P, Z);
              ma();
              if (!_a.fc && V.G) for (K = 0; 3 > K; ++K) {
                P = B(K + _a.Db[0], _a.Db[1]), P = (2 * P - 1) * _a.Rc[K], P += _a.Sc[K], da[K] = P;
              }
              la();
              P = Date.now();
              K = P - ka;
              Da = Aa(_a.Ab[0], _a.Ab[1], B(_a.zb[0], _a.zb[1]));
              var ha = B(_a.R[0], _a.R[1]),
                  Fa = B(_a.R[0] + 1, _a.R[1]),
                  Ga = B(_a.R[0] + 2, _a.R[1]);
              va = 1 - Aa(_a.Cb[0], _a.Cb[1], Math.sqrt(ha * ha + Fa * Fa + Ga * Ga) / K);
              ha = fa[0] - da[0];
              Fa = fa[1] - da[1];
              Ga = fa[2] - da[2];
              K = Math.sqrt(ha * ha + Fa * Fa + Ga * Ga) / K;
              fa[0] = da[0];
              fa[1] = da[1];
              fa[2] = da[2];
              Ba = 1 - Aa(_a.Bb[0], _a.Bb[1], K);
              ia = Da * va * Ba;
              ka = P;
              na[ra] = ia;
              ra = (ra + 1) % _a.Ka;

              for (P = 0; P < _a.Ka; ++P) {
                ia = Math.min(na[P], ia);
              }

              lb.cd(Y, ia, T.ea);
              qa && qa(ia, T.ea);
              if (V.G) for (P = _a.Xa[1] * ia + _a.Xa[0] * (1 - ia), P *= T.ea, K = 0; 3 > K; ++K) {
                ta[K] = P * da[K] + (1 - P) * ta[K], ca[K] = ta[K];
              } else P = Date.now(), ea[0] = _a.Ya[0] * Math.sin(P * _a.Za), ea[1] = _a.Ya[1] * Math.cos(P * _a.Za), ca[0] = ea[0], ca[1] = ea[1], ca[2] = ea[2];
              P = F;
              D.H();
              R.u();
              v.set("s50");
              P.ra.b(0);
              G.g(!1, !1);
            }
          });
          pa = ba.sc();
          w();
        }

        d = L;
        A = H.a({
          v: d,
          isPot: !1,
          isFloat: !1,
          isFlipY: !0
        });
        v.Pb([{
          id: "s47",
          name: "_",
          $: "attribute vec2 a0;uniform vec2 u33,u34;varying vec2 vv0;void main(){gl_Position=vec4(a0,0.,1.),vv0=u34+u33*a0;}",
          ca: ["a0"],
          U: [2],
          c: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
          f: ["u1", "u33", "u34"],
          precision: "lowp"
        }, {
          id: "s48",
          name: "_",
          c: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
          $: "attribute vec2 a0;uniform sampler2D u35;uniform vec2 u36;const vec2 f=vec2(.25,.5),h=vec2(.75,.5),e=vec2(.5,.5);varying vec2 vv0;void main(){vec4 a=texture2D(u35,f);vec2 b=a.gb,c=a.a*u36,d=a0*.5+e;vv0=b+(d-e)*c,gl_Position=vec4(a0,0.,1.);}",
          ca: ["a0"],
          U: [2],
          f: ["u1", "u35", "u36"],
          precision: "lowp"
        }, {
          id: "s49",
          name: "_",
          $: "attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}",
          c: "uniform sampler2D u37,u35;uniform vec3 u38,u39;uniform float u40,u41,u42,u43,u44,u45,u46;varying vec2 vv0;const vec4 e=vec4(.25,.25,.25,.25);void main(){vec4 g=texture2D(u37,vec2(.4375,.9375)),h=texture2D(u37,vec2(.5625,.9375)),a=texture2D(u35,vec2(.5,.5));float c=dot(g,e),i=dot(h,e);bool d=c>u43&&c>i+u44;d?a.r=2.:a.r>u42?a.r=0.:a.r>1.9&&(a.a>u41||a.a<u40)?a.r=0.:a.r>1.9?a.r+=1.:0.;if(a.r<.9)a.gba=u38,a.r=1.;else{float j=dot(e,texture2D(u37,vec2(.0625,.9375))),k=dot(e,texture2D(u37,vec2(.1875,.9375))),l=dot(e,texture2D(u37,vec2(.3125,.9375))),b;if(a.r>1.9)b=1.-u46;else b=1.,a.r=0.;float f=a.a*u45;a.gba+=vec3(j,k,l)*u39*b*f;}gl_FragColor=a;}",
          f: "u37 u35 u38 u40 u41 u42 u43 u44 u39 u45 u46".split(" ")
        }, {
          id: "s50",
          name: "_",
          c: "uniform sampler2D u35;uniform vec3 u50;uniform vec2 u36;varying vec2 vv0;const vec2 i=vec2(1.,1.);void main(){vec4 g=texture2D(u35,vec2(.25,.5));vec2 h=g.gb;float j=g.a;vec2 a=j*u36,c=h+a,d=h;d-=a/2.,c-=a/2.;vec2 k=.5*(d+c),f=step(d,vv0)*step(vv0,c);float l=f.x*f.y;vec2 b=2.*abs(k-vv0)/a;b=pow(b,3.*i),gl_FragColor=vec4(l*u50*max(b.x,b.y),1.);}",
          f: ["u35", "u36", "u50"],
          precision: "lowp"
        }, {
          id: "s51",
          name: "_",
          c: "uniform sampler2D u1,u5;uniform float u51,u52,u46;const vec4 f=vec4(1.,1.,1.,1.);varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0),b=texture2D(u5,vv0);float c=(1.-u46)*(u52-u51)+u51;gl_FragColor=mix(b,a,c*f);}",
          f: ["u1", "u5", "u51", "u52", "u46"],
          precision: "highp"
        }]);
        v.C("s48", [{
          type: "1i",
          name: "u1",
          value: 0
        }, {
          type: "1i",
          name: "u35",
          value: 1
        }, {
          type: "2f",
          name: "u36",
          value: ua
        }]);
        v.C("s50", [{
          type: "1i",
          name: "u35",
          value: 0
        }, {
          type: "2f",
          name: "u36",
          value: ua
        }, {
          type: "3f",
          name: "u50",
          value: [0, .5, 1]
        }]);
        v.C("s49", [{
          type: "1i",
          name: "u37",
          value: 0
        }, {
          type: "1i",
          name: "u35",
          value: 1
        }, {
          type: "1f",
          name: "u40",
          value: _a.Gc
        }, {
          type: "1f",
          name: "u41",
          value: _a.Dc
        }, {
          type: "1f",
          name: "u42",
          value: _a.ed
        }, {
          type: "1f",
          name: "u43",
          value: _a.Nb
        }, {
          type: "1f",
          name: "u44",
          value: _a.Mb
        }, {
          type: "1f",
          name: "u45",
          value: ua[0]
        }]);
        v.C("s51", [{
          type: "1i",
          name: "u1",
          value: 0
        }, {
          type: "1i",
          name: "u5",
          value: 1
        }, {
          type: "1f",
          name: "u51",
          value: _a.Wa[0]
        }, {
          type: "1f",
          name: "u52",
          value: _a.Wa[1]
        }]);
        R = H.a({
          isPot: !1,
          isFloat: !1,
          width: O,
          height: N
        });
        var S = new Float32Array([0, _a.borderWidth, _a.W, 0]);

        (function (Q) {
          Q.Fa = H.a({
            isPot: !1,
            Qd: !0,
            isFloat: !1,
            width: O,
            height: N
          });
          Q.Ga = H.a({
            isPot: !0,
            isFloat: !1,
            width: _a.ka
          });
          var P = {
            width: 1,
            height: 1,
            isFloat: !0,
            isPot: !1,
            array: S
          };
          Q.ra = Na.a(P);
          Q.Ib = Na.a(P);
        })(F);

        ob ? r(ob) : ja(function (Q) {
          Q = JSON.parse(Q);
          r(Q);
        });
      },
      Yc: function Yc(L, la) {
        for (var B in L) {
          "undefined" !== typeof la[B] && (L[B] = la[B]);
        }
      },
      ac: function ac(L) {
        W.ua && W.ua();
        var la = {
          video: {
            facingMode: {
              ideal: mb.facingMode
            },
            width: {
              min: mb.minWidth,
              max: mb.maxWidth,
              ideal: mb.idealWidth
            },
            height: {
              min: mb.minHeight,
              max: mb.maxHeight,
              ideal: mb.idealHeight
            }
          },
          audio: W.Ua
        };
        mb.deviceId && (constraints.deviceId = mb.deviceId);
        kb(function (B, ma) {
          nb = ma;
          W.va && W.va();
          L(B);
        }, function () {
          window.sa && window.sa("WEBCAM_UNAVAILABLE");
        }, la);
      },
      qb: function qb(L, la) {
        var B = L.videoWidth,
            ma = L.videoHeight;
        Ma.ha().width = B;
        Ma.ha().height = ma;
        _a.width = B;
        _a.height = ma;
        ya.xc();
        var r = [.5, .5];
        ma /= B;
        B = Ma.F() / Ma.s();
        ma > B ? 1 >= ma ? r[0] *= ma : r[1] /= ma : (r[0] *= ma, ma = 1 / B, r[0] *= ma, r[1] *= ma);
        r[1] *= B;
        ya.i(L);
        v.C("s47", [{
          type: "1i",
          name: "u1",
          value: 0
        }, {
          type: "2f",
          name: "u33",
          value: r
        }, {
          type: "2f",
          name: "u34",
          value: [.5, .5]
        }]);
        la && la();
      }
    };
    return ya;
  }

  W.onLoad = function (b) {
    W.ready ? b() : W.T.push(b);
  };

  W.set_audio = function (b) {
    W.Ua = b;
  };

  W.switch_displayVideo = function (b) {
    W.ba = b;
    W.aa && (W.aa.style.display = W.ba ? "block" : "none");
  };

  W.onWebcamAsk = function (b) {
    W.ua = b;
  };

  W.onContextLost = function (b) {
    W.ta = b;
  };

  W.onWebcamGet = function (b) {
    W.va = b;
  };

  W.set_size = function (b, c) {
    _a.width = b;
    _a.height = c;
  };

  W.get_size = function () {
    return {
      width: _a.width,
      height: _a.height
    };
  };

  W.get_videoStream = function () {
    return nb;
  };

  W.get_cv = function () {
    return Ma.ha();
  };

  W.set_color = function (b) {
    v.C("s50", [{
      type: "3f",
      name: "u50",
      value: b
    }]);
  };

  W.init = function (b) {
    var c = pb(),
        e = b.callbackReady ? b.callbackReady : function (l) {
      console.log("ERR:", l);
    },
        g = b.callbackReady ? b.callbackReady.bind(!1) : !1;
    if ("undefined" === typeof b.canvasId) e("NO_CANVASID");else if (document.getElementById(b.canvasId)) {
      if (W.initialized) e("ALREADY_INITIALIZED");else {
        W.initialized = !0;
        window.sa = e ? function (l) {
          e(l);
          window.sa = !1;
        } : !1;
        b.NNCpath && (_a.Sa = b.NNCpath);
        "undefined" !== typeof b.NNC && (ob = "string" === typeof b.NNC ? JSON.parse(b.NNC) : b.NNC);
        W.T.push(g);
        if (!Ma.i({
          eb: b.canvasId,
          width: _a.width,
          height: _a.height,
          debug: !1,
          Ha: !1,
          Nc: function Nc() {
            W.ta && W.ta();
          },
          premultipliedAlpha: !1
        })) return e("GL_INCOMPATIBLE"), !1;
        W.aa = Ma.ha();
        W.ba || (W.aa.style.display = "none");
        G.i();
        D.i();
        v.i();
        H.i();
        q.depthFunc(q.LEQUAL);
        q.clearDepth(1);
        b.videoSettings && b.videoSettings.videoElement ? c.qb(b.videoSettings.videoElement, !1) : (b.videoSettings && c.Yc(mb, b.videoSettings), c.ac(function (l) {
          c.qb(l, !1);
        }));
        return !0;
      }
    } else e("INVALID_CANVASID");
  };

  window.JEEFACETRANSFERAPI = W;
  ;
  return JEEFACETRANSFERAPI;
}();
},{"buffer":"../../../../.config/yarn/global/node_modules/buffer/index.js"}],"../../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51153" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","jeelizFaceTransfer.js"], null)
//# sourceMappingURL=/jeelizFaceTransfer.fec241de.js.map