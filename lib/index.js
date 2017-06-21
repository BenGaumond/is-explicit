'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isObjectOf = exports.isArrayOf = exports.isPlainObject = undefined;

var _is = require('./is');

var _is2 = _interopRequireDefault(_is);

var _isPlainObject = require('./is-plain-object');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _isArrayOf = require('./is-array-of');

var _isArrayOf2 = _interopRequireDefault(_isArrayOf);

var _isObjectOf = require('./is-object-of');

var _isObjectOf2 = _interopRequireDefault(_isObjectOf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_is2.default.plainObject = _isPlainObject2.default;
_is2.default.arrayOf = _isArrayOf2.default;
_is2.default.objectOf = _isObjectOf2.default;

exports.default = _is2.default;
exports.isPlainObject = _isPlainObject2.default;
exports.isArrayOf = _isArrayOf2.default;
exports.isObjectOf = _isObjectOf2.default;