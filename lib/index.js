'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = is;
function is(value) {
  for (var _len = arguments.length, types = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    types[_key - 1] = arguments[_key];
  }

  //Validate value argument
  if (arguments.length === 0) throw new Error('is expects at least one value and optionally a variable number of type arguments');

  //Validate type arguments
  for (var i = 0; i < types.length; i++) {
    var type = types[i];
    if (typeof type !== 'function') throw new Error('types, if supplied, are expected to be of type \'function\'');
  }

  //Type not supplied

  if (types.length === 0) return value !== undefined && value !== null && !Number.isNaN(value);

  //Test types
  var value_type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  for (var _i = 0; _i < types.length; _i++) {
    var _type = types[_i];

    if (value_type === 'string' && _type === String) return true;else if (value_type === 'boolean' && _type === Boolean) return true;else if (value_type === 'number' && _type === Number && !Number.isNaN(value)) return true;else if (value_type === 'symbol' && _type === Symbol) return true;else if (value_type === 'function' && _type === Function) return true;else if (value instanceof _type) return true;
  }

  //All failed
  return false;
}