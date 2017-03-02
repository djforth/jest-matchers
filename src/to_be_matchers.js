import {Map, List, OrderedMap} from 'immutable';
import _ from 'lodash';
import moment from 'moment';

import CreateMatcher from './helper/create_matcher';

const makeMsg = (msg)=>{
  return {
    fail: `Expected :actual to be a ${msg}`
    , succ: `Is a ${msg}`
  };
};

export default {

  toBeElement: CreateMatcher((actual)=>_.isElement(actual), makeMsg('boolean'))

  , toBeMoment: CreateMatcher((actual)=>moment.isMoment(actual), makeMsg('moment object'))

  , toBeImmutableList: CreateMatcher((actual)=>List.isList(actual), makeMsg('Immutable list'))

  , toBeImmutableMap: CreateMatcher((actual)=>Map.isMap(actual), makeMsg('Immutable map'))

  , toBeImmutableOrderedMap: CreateMatcher((actual)=>OrderedMap.isOrderedMap(actual), makeMsg('Immutable map'))

};
