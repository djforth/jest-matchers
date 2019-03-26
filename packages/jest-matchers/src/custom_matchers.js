const toBeMatcher = require('./to_be_matchers');
const ElementMatcher = require('./element_matchers');
const { CreateMatcher } = require('@djforth/jest-matchers-core');

const { forIn, isPlainObject, has } = require('lodash');

const deeplyEqual = (actual, expected) => {
  let check = true;
  forIn(actual, (act, key) => {
    if (has(expected, key)) {
      const exp = expected[key];
      if (isPlainObject(exp)) {
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

module.exports = () => {
  expect.extend(toBeMatcher);
  expect.extend(ElementMatcher);
  expect.extend({
    hasKey: CreateMatcher((actual, expected) => actual.hasOwnProperty(expected), {
      fail: 'Expected the object :actual to have the key :expected',
      succ: 'The object :actual has the key :expected',
    }),
    matchObject: CreateMatcher(
      (actual, expected) => {
        if (!isPlainObject(actual)) return false;

        return deeplyEqual(actual, expected);
      },
      {
        fail: "Object :actual isn't deeply equal :expected",
        succ: 'Object :actual is deeply equal :expected',
      }
    ),
  });
};
