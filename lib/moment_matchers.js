'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isString2 = require('lodash/isString');

var _isString3 = _interopRequireDefault(_isString2);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _create_matcher = require('./helper/create_matcher');

var _create_matcher2 = _interopRequireDefault(_create_matcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var convertMoment = function convertMoment(expected) {
  if (_moment2.default.isMoment(expected)) return expected;
  if ((0, _isString3.default)(expected)) {
    var date = expected;
    var fmt = 'DD-MM-YYYY';
  } else {
    var date = expected.date,
        fmt = expected.fmt;
  }

  return (0, _moment2.default)(date, fmt);
};

exports.default = {
  equalsMoment: (0, _create_matcher2.default)(function (actual, expected) {
    if (_moment2.default.isMoment(actual)) {
      var date = convertMoment(expected);
      return actual.isSame(date);
    }
    return false;
  }, {
    fail: 'Moment date :actual don\'t match :expected',
    succ: 'Moment dates match :actual'
  }),
  toBeAfter: (0, _create_matcher2.default)(function (actual, expected) {
    if (_moment2.default.isMoment(actual)) {
      var date = convertMoment(expected);
      return actual.isAfter(date);
    }
    return false;
  }, {
    fail: 'Moment date :actual isn\'t after :expected',
    succ: 'Moment :actual is after :expected'
  }),

  toBeBefore: (0, _create_matcher2.default)(function (actual, expected) {
    if (_moment2.default.isMoment(actual)) {
      var date = convertMoment(expected);
      return actual.isBefore(date);
    }
    return false;
  }, {
    fail: 'Moment date :actual isn\'t before :expected',
    succ: 'Moment :actual is after :expected'
  }),

  toBeSameOrAfter: (0, _create_matcher2.default)(function (actual, expected) {
    if (_moment2.default.isMoment(actual)) {
      var date = convertMoment(expected);
      return actual.isSameOrAfter(date);
    }
    return false;
  }, {
    fail: 'Moment date :actual isn\'t same or after :expected',
    succ: 'Moment :actual is same or after :expected'
  }),

  toBeSameOrBefore: (0, _create_matcher2.default)(function (actual, expected) {
    if (_moment2.default.isMoment(actual)) {
      var date = convertMoment(expected);
      return actual.isSameOrBefore(date);
    }
    return false;
  }, {
    fail: 'Moment date :actual isn\'t same or before :expected',
    succ: 'Moment :actual is same or before :expected'
  }),

  toBeBetween: (0, _create_matcher2.default)(function (actual, expected) {
    if (_moment2.default.isMoment(actual)) {
      var start = expected.start,
          finish = expected.finish;

      return actual.isBetween(start, finish);
    }
    return false;
  }, {
    fail: 'Moment date :actual isn\'t between expected dates',
    succ: 'Moment :actual is between dates'
  })
};
module.exports = exports['default'];