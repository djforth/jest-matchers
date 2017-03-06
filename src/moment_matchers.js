import moment from 'moment';
import CreateMatcher from './helper/create_matcher';
import {isString} from 'lodash';

const convertMoment = (expected)=>{
  if (moment.isMoment(expected)) return expected;
  if (isString(expected)){
    var date = expected;
    var fmt = 'DD-MM-YYYY';
  } else {
    var {date, fmt} = expected;
  }

  return moment(date, fmt);
};

export default {
  equalsMoment: CreateMatcher(
      (actual, expected)=>{
        if (moment.isMoment(actual)){
          let date = convertMoment(expected);
          return actual.isSame(date);
        }
        return false;
      }
      , {
        fail: 'Moment date :actual don\'t match :expected'
        , succ: 'Moment dates match :actual'
      }
    )
  , toBeAfter: CreateMatcher(
      (actual, expected)=>{
        if (moment.isMoment(actual)){
          let date = convertMoment(expected);
          return actual.isAfter(date);
        }
        return false;
      }
      , {
        fail: 'Moment date :actual isn\'t after :expected'
        , succ: 'Moment :actual is after :expected'
      }
    )

  , toBeBefore: CreateMatcher(
      (actual, expected)=>{
        if (moment.isMoment(actual)){
          let date = convertMoment(expected)
          return actual.isBefore(date);
        }
        return false;
      }
      , {
        fail: 'Moment date :actual isn\'t before :expected'
        , succ: 'Moment :actual is after :expected'
      }
    )

  , toBeSameOrAfter: CreateMatcher(
      (actual, expected)=>{
        if (moment.isMoment(actual)){
          let date = convertMoment(expected);
          return actual.isSameOrAfter(date);
        }
        return false;
      }
      , {
        fail: 'Moment date :actual isn\'t same or after :expected'
        , succ: 'Moment :actual is same or after :expected'
      }
    )

  , toBeSameOrBefore: CreateMatcher(
      (actual, expected)=>{
        if (moment.isMoment(actual)){
          let date = convertMoment(expected);
          return actual.isSameOrBefore(date);
        }
        return false;
      }
      , {
        fail: 'Moment date :actual isn\'t same or before :expected'
        , succ: 'Moment :actual is same or before :expected'
      }
    )

  , toBeBetween: CreateMatcher(
      (actual, expected)=>{
        if (moment.isMoment(actual)){
          let {start, finish} = expected;
          return actual.isBetween(start, finish);
        }
        return false;
      }
      , {
        fail: 'Moment date :actual isn\'t between expected dates'
        , succ: 'Moment :actual is between dates'
      }
    )
}