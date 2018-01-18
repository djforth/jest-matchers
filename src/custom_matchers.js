import toBeMatcher from './to_be_matchers';
import CreateMatcher from './helper/create_matcher';
import MomentMatcher from './moment_matchers';
import ElementMatcher from './element_matchers';

import { isArray, forIn, isPlainObject, has } from 'lodash';

const deeplyEqual = (actual, expected) => {
  let check = true;
  forIn(actual, (act, key) => {
    if (has(expected, key)) {
      let exp = expected[key];
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

export default () => {
  expect.extend(toBeMatcher);
  expect.extend(MomentMatcher);
  expect.extend(ElementMatcher);
  expect.extend({
    // toBeDeeplyEqual: CreateMatcher(
    //   (actual, expected)=>deeplyEqual(actual, expected)
    // , {
    //     fail: 'Object :actual isn\'t deeply equal :expected'
    //     , succ: 'Object :actual is deeply equal :expected'
    //   })

    equalsImmutable: CreateMatcher((actual, expected) => expected.equals(actual), {
      fail: "Immutable object :actual don't match :expected",
      succ: 'Immutable objects match',
    }),

    hasKey: CreateMatcher((actual, expected) => actual.hasOwnProperty(expected), {
      fail: 'Expected the object :actual to have the key :expected',
      succ: 'The object :actual has the key :expected',
    }),

    hasImmutableKey: CreateMatcher(
      (actual, expected) => {
        if (isArray(expected)) {
          return actual.hasIn(expected);
        }
        return actual.has(expected);
      },
      {
        fail: 'The immutable object :actual has the key :expected',
        succ: 'The immutable object has the key :expected',
      }
    ),
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
