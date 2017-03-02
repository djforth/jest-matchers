import toBeMatcher from './to_be_matchers';
import CreateMatcher from './helper/create_matcher';

import {isArray} from 'lodash';

export default ()=>{
    expect.extend(toBeMatcher);
    expect.extend({
      equalsImmutable: CreateMatcher(
        (actual, expected)=>expected.equals(actual)
        , {
          fail: 'Immutable object :actual don\'t match :expected'
          , succ: 'Immutable objects match'
        })


      , hasKey: CreateMatcher(
          (actual, expected)=>actual.hasOwnProperty(expected)
          , {
            fail: 'Expected the object :actual to have the key :expected'
            , succ: 'The object :actual has the key :expected'
          })

      , hasImmutableKey: CreateMatcher(
          (actual, expected)=>{
            if (isArray(expected)){
              return actual.hasIn(expected);
            }
            return actual.has(expected);
          }
          , {
            fail: 'The immutable object :actual has the key :expected'
            , succ: 'The immutable object has the key :expected'
          })
    });
};

