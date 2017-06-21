'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isArray2 = require('lodash/isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

var _isPlainObject2 = require('lodash/isPlainObject');

var _isPlainObject3 = _interopRequireDefault(_isPlainObject2);

var _has2 = require('lodash/has');

var _has3 = _interopRequireDefault(_has2);

var _forIn2 = require('lodash/forIn');

var _forIn3 = _interopRequireDefault(_forIn2);

var _to_be_matchers = require('./to_be_matchers');

var _to_be_matchers2 = _interopRequireDefault(_to_be_matchers);

var _create_matcher = require('./helper/create_matcher');

var _create_matcher2 = _interopRequireDefault(_create_matcher);

var _moment_matchers = require('./moment_matchers');

var _moment_matchers2 = _interopRequireDefault(_moment_matchers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var deeplyEqual = function deeplyEqual(actual, expected) {
  var check = true;
  (0, _forIn3.default)(actual, function (act, key) {
    if ((0, _has3.default)(expected, key)) {
      var exp = expected[key];
      if ((0, _isPlainObject3.default)(exp)) {
        check = deeplyEqual(act, exp);
      } else {
        check = exp === act;
      }
    } else {
      check = false;
    }

    return check;
  });

  return check;
};

exports.default = function () {
  expect.extend(_to_be_matchers2.default);
  expect.extend(_moment_matchers2.default);
  expect.extend({
    // toBeDeeplyEqual: CreateMatcher(
    //   (actual, expected)=>deeplyEqual(actual, expected)
    // , {
    //     fail: 'Object :actual isn\'t deeply equal :expected'
    //     , succ: 'Object :actual is deeply equal :expected'
    //   })

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