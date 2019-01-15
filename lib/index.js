'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _isNan = require('babel-runtime/core-js/number/is-nan');

var _isNan2 = _interopRequireDefault(_isNan);

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

_is2.default.arrayOf = _isArrayOf2.default;
_is2.default.objectOf = _isObjectOf2.default;
_is2.default.subclassOf = _isSubclassOf2.default;

_is2.default.string = value => typeof value === 'string';
_is2.default.number = value => typeof value === 'number' && !(0, _isNan2.default)(value);
_is2.default.bool = value => typeof value === 'boolean';
_is2.default.object = value => value !== null && typeof value === 'object';
_is2.default.func = value => typeof value === 'function';
_is2.default.function = _is2.default.func;
_is2.default.symbol = value => typeof value === 'symbol';
_is2.default.array = Array.isArray;
_is2.default.date = value => value instanceof Date;
_is2.default.promise = value => value instanceof _promise2.default;
_is2.default.primitive = _is2.default.bind(PRIMITIVES);
_is2.default.nan = _isNan2.default;
_is2.default.NaN = _isNan2.default;
_is2.default.plainObject = _isPlainObject2.default;
_is2.default.instanceable = _isInstanceable2.default;
_is2.default.defined = _isDefined2.default;
_is2.default.truthy = value => !!value;
_is2.default.falsy = value => !value;

/******************************************************************************/
// Temp
/******************************************************************************/

const isArrayAndPassesTest = (array, test) => _is2.default.array(array) && array.length > 0 && array.every(test);

const isObjectAndPassesTest = (obj, test) => {
  if (!_is2.default.object(obj)) return false;

  let atLeastOneKey = false;
  for (const key in obj) if (!test(obj[key])) return false;else atLeastOneKey = true;

  return atLeastOneKey;
};

const name = (object, name) => Object.defineProperty(object, 'name', { value: name });

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

// Add arrayOf and objectOf to each shotcut test
for (const shortcut of ['string', 'number', 'bool', 'object', 'func', 'function', 'symbol', 'array', 'date', 'promise', 'primitive', 'nan', 'NaN', 'plainObject', 'instanceable', 'defined', 'truthy', 'falsy']) {
  const isShortcut = _is2.default[shortcut];

  // add shortcuts
  _is2.default.arrayOf[shortcut] = value => isArrayAndPassesTest(value, isShortcut);
  _is2.default.objectOf[shortcut] = value => isObjectAndPassesTest(value, isShortcut);

  // add names
  name(_is2.default.arrayOf[shortcut], `isArrayOf${capitalize(shortcut)}`);
  name(_is2.default.objectOf[shortcut], `isObjectOf${capitalize(shortcut)}`);
  if (isShortcut && (!isShortcut.name || isShortcut.name.includes('bound'))) name(isShortcut, `is${capitalize(shortcut)}`);
}

/******************************************************************************/
// Exports
/******************************************************************************/

exports.default = _is2.default;