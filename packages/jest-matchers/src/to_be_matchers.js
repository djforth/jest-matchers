const isElement = require('lodash/isElement');

const { CreateMatcher, MakeMsg } = require('@djforth/jest-matchers-core');

module.exports = {
  toBeElement: CreateMatcher(actual => isElement(actual), MakeMsg('Element')),
};
