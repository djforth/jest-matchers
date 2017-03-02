'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _immutable = require('immutable');

var convertExpected = function convertExpected(expected) {
  var type = typeof expected === 'undefined' ? 'undefined' : _typeof(expected);
  if (type === 'string' || type === 'number') return expected;

  if (expect.mock) {
    return 'spy called';
  }

  if (_immutable.Map.isMap(expected) || _immutable.List.isList(expected)) {
    expected = expected.toJS();
  }

  return JSON.stringify(expected);
};

var CreateMsg = function CreateMsg(msg) {
  return function (actual, expected) {
    return function () {
      if (msg.match(/:expected/)) {
        msg = msg.replace(/:expected/, convertExpected(expected));
      }

      if (msg.match(/:actual/)) {
        msg = msg.replace(/:actual/, convertExpected(actual));
      }

      return msg;
    };
  };
};

exports.default = function (check, _ref) {
  var succ = _ref.succ,
      fail = _ref.fail;

  var failMsg = CreateMsg(fail);
  var succMsg = CreateMsg(succ);
  return function (actual, expected) {
    if (expected === undefined) {
      expected = '';
    }
    var result = {};
    result.pass = check(actual, expected);
    if (result.pass) {
      result.message = succMsg(actual, expected);
    } else {
      result.message = failMsg(actual, expected);
    }
    return result;
  };
};

module.exports = exports['default'];