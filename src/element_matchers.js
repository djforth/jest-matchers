import _ from 'lodash';

import CreateMatcher from './helper/create_matcher';

export default {
  toHaveAttribute: CreateMatcher((actual, expected, attrs) => {
    if (!_.isElement(actual)) return false;
    if (!actual.hasAttribute(expected)) return false;
    return actual.getAttribute(expected) === attrs[0]
  }, {
      fail: `Expected element have attribute :expected = :attrs`,
      succ: `element has attribute :expected = :attrs`,
    }),
  toHaveTextContent: CreateMatcher((actual, expected) => {
    if (!_.isElement(actual)) return false;
    
    return (actual.textContent.match(expected)) ? true : false;
  }, {
      fail: `Expected element have content :expected`,
      succ: `element has content :expected`,
    }),
  toHaveCssClass: CreateMatcher((actual, expected) => {
    if (!_.isElement(actual)) return false;

    return actual.classList.contains(expected)
  }, {
      fail: `Expected element have css class :expected`,
      succ: `element has css class :expected`,
    }),
}