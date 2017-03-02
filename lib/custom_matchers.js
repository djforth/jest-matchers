'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isArray2 = require('lodash/isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

var _to_be_matchers = require('./to_be_matchers');

var _to_be_matchers2 = _interopRequireDefault(_to_be_matchers);

var _create_matcher = require('./helper/create_matcher');

var _create_matcher2 = _interopRequireDefault(_create_matcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  expect.extend(_to_be_matchers2.default);
  expect.extend({
    equalsImmutable: (0, _create_matcher2.default)(function (actual, expected) {
      return expected.equals(actual);
    }, {
      fail: 'Immutable object :actual don\'t match :expected',
      succ: 'Immutable objects match'
    }),

    hasKey: (0, _create_matcher2.default)(function (actual, expected) {
      return actual.hasOwnProperty(expected);
    }, {
      fail: 'Expected the object :actual to have the key :expected',
      succ: 'The object :actual has the key :expected'
    }),

    hasImmutableKey: (0, _create_matcher2.default)(function (actual, expected) {
      if ((0, _isArray3.default)(expected)) {
        return actual.hasIn(expected);
      }
      return actual.has(expected);
    }, {
      fail: 'The immutable object :actual has the key :expected',
      succ: 'The immutable object has the key :expected'
    })
  });
};

module.exports = exports['default'];