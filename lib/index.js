'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _is = require('./is');

var _is2 = _interopRequireDefault(_is);

var _isPlainObject = require('./is-plain-object');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _isArrayOf = require('./is-array-of');

var _isArrayOf2 = _interopRequireDefault(_isArrayOf);

var _isObjectOf = require('./is-object-of');

var _isObjectOf2 = _interopRequireDefault(_isObjectOf);

var _isInstanceable = require('./is-instanceable');

var _isInstanceable2 = _interopRequireDefault(_isInstanceable);

var _isDefined = require('./is-defined');

var _isDefined2 = _interopRequireDefault(_isDefined);

var _isSubclassOf = require('./is-subclass-of');

var _isSubclassOf2 = _interopRequireDefault(_isSubclassOf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/******************************************************************************/
// Data
/******************************************************************************/

const PRIMITIVES = [Boolean, Number, String];

/******************************************************************************/
// Extends
/******************************************************************************/

_is2.default.plainObject = _isPlainObject2.default;
_is2.default.arrayOf = _isArrayOf2.default;
_is2.default.objectOf = _isObjectOf2.default;
_is2.default.instanceable = _isInstanceable2.default;
_is2.default.defined = _isDefined2.default;
_is2.default.subclassOf = _isSubclassOf2.default;

_is2.default.string = _is2.default.bind(String);
_is2.default.number = _is2.default.bind(Number);
_is2.default.bool = _is2.default.bind(Boolean);
_is2.default.func = _is2.default.bind(Function);
_is2.default.symbol = _is2.default.bind(_symbol2.default);
_is2.default.primitive = _is2.default.bind(PRIMITIVES);

_is2.default.arrayOf.string = _isArrayOf2.default.bind(String);
_is2.default.arrayOf.number = _isArrayOf2.default.bind(Number);
_is2.default.arrayOf.bool = _isArrayOf2.default.bind(Boolean);
_is2.default.arrayOf.symbol = _isArrayOf2.default.bind(_symbol2.default);
_is2.default.arrayOf.func = _isArrayOf2.default.bind(Function);
_is2.default.arrayOf.primitive = _isArrayOf2.default.bind(PRIMITIVES);
_is2.default.arrayOf.plainObject = value => Array.isArray(value) && value.length > 0 && value.every(_isPlainObject2.default);

_is2.default.objectOf.string = _isObjectOf2.default.bind(String);
_is2.default.objectOf.number = _isObjectOf2.default.bind(Number);
_is2.default.objectOf.bool = _isObjectOf2.default.bind(Boolean);
_is2.default.objectOf.symbol = _isObjectOf2.default.bind(_symbol2.default);
_is2.default.objectOf.func = _isObjectOf2.default.bind(Function);
_is2.default.objectOf.primitive = _isObjectOf2.default.bind(PRIMITIVES);

/******************************************************************************/
// Exports
/******************************************************************************/

exports.default = _is2.default;