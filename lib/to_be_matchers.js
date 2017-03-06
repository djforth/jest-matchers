'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isElement2 = require('lodash/isElement');

var _isElement3 = _interopRequireDefault(_isElement2);

var _immutable = require('immutable');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _create_matcher = require('./helper/create_matcher');

var _create_matcher2 = _interopRequireDefault(_create_matcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var makeMsg = function makeMsg(msg) {
  return {
    fail: 'Expected :actual to be a ' + msg,
    succ: 'Is a ' + msg
  };
};

exports.default = {

  toBeElement: (0, _create_matcher2.default)(function (actual) {
    return (0, _isElement3.default)(actual);
  }, makeMsg('boolean')),

  toBeMoment: (0, _create_matcher2.default)(function (actual) {
    return _moment2.default.isMoment(actual);
  }, makeMsg('moment object')),

  toBeImmutableList: (0, _create_matcher2.default)(function (actual) {
    return _immutable.List.isList(actual);
  }, makeMsg('Immutable list')),

  toBeImmutableMap: (0, _create_matcher2.default)(function (actual) {
    return _immutable.Map.isMap(actual);
  }, makeMsg('Immutable map')),

  toBeImmutableOrderedMap: (0, _create_matcher2.default)(function (actual) {
    return _immutable.OrderedMap.isOrderedMap(actual);
  }, makeMsg('Immutable map'))

};