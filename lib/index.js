"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _is = _interopRequireDefault(require("./is"));

var _isPlainObject = _interopRequireDefault(require("./is-plain-object"));

var _isArrayOf = _interopRequireDefault(require("./is-array-of"));

var _isObjectOf = _interopRequireDefault(require("./is-object-of"));

var _isInstanceable = _interopRequireDefault(require("./is-instanceable"));

var _isDefined = _interopRequireDefault(require("./is-defined"));

var _isSubclassOf = _interopRequireDefault(require("./is-subclass-of"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/******************************************************************************/
// Data

/******************************************************************************/
const PRIMITIVES = [Boolean, Number, String];
/******************************************************************************/
// Extends

/******************************************************************************/

_is.default.arrayOf = _isArrayOf.default;
_is.default.objectOf = _isObjectOf.default;
_is.default.subclassOf = _isSubclassOf.default;

_is.default.string = value => typeof value === 'string';

_is.default.number = value => typeof value === 'number' && !Number.isNaN(value);

_is.default.bool = value => typeof value === 'boolean';

_is.default.object = value => value !== null && typeof value === 'object';

_is.default.func = value => typeof value === 'function';

_is.default.function = _is.default.func;

_is.default.symbol = value => typeof value === 'symbol';

_is.default.array = Array.isArray;

_is.default.date = value => value instanceof Date;

_is.default.promise = value => value instanceof Promise;

_is.default.primitive = _is.default.bind(PRIMITIVES);
_is.default.nan = Number.isNaN;
_is.default.NaN = Number.isNaN;
_is.default.plainObject = _isPlainObject.default;
_is.default.instanceable = _isInstanceable.default;
_is.default.defined = _isDefined.default;

_is.default.truthy = value => !!value;

_is.default.falsy = value => !value;
/******************************************************************************/
// Temp

/******************************************************************************/


const isArrayAndPassesTest = (array, test) => _is.default.array(array) && array.length > 0 && array.every(test);

const isObjectAndPassesTest = (obj, test) => {
  if (!_is.default.object(obj)) return false;
  let atLeastOneKey = false;

  for (const key in obj) if (!test(obj[key])) return false;else atLeastOneKey = true;

  return atLeastOneKey;
};

const name = (object, name) => Object.defineProperty(object, 'name', {
  value: name
});

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1); // Add arrayOf and objectOf to each shotcut test


for (const shortcut of ['string', 'number', 'bool', 'object', 'func', 'function', 'symbol', 'array', 'date', 'promise', 'primitive', 'nan', 'NaN', 'plainObject', 'instanceable', 'defined', 'truthy', 'falsy']) {
  const isShortcut = _is.default[shortcut]; // add shortcuts

  _is.default.arrayOf[shortcut] = value => isArrayAndPassesTest(value, isShortcut);

  _is.default.objectOf[shortcut] = value => isObjectAndPassesTest(value, isShortcut); // add names


  name(_is.default.arrayOf[shortcut], `isArrayOf${capitalize(shortcut)}`);
  name(_is.default.objectOf[shortcut], `isObjectOf${capitalize(shortcut)}`);
  if (isShortcut && (!isShortcut.name || isShortcut.name.includes('bound'))) name(isShortcut, `is${capitalize(shortcut)}`);
}
/******************************************************************************/
// Exports

/******************************************************************************/


var _default = _is.default;
exports.default = _default;