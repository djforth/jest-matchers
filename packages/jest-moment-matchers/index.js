const { CreateMatcher, MakeMsg } = require('@djforth/jest-matchers-core');
const moment = require('moment');

const isString = str => typeof str === 'string';

const convertMoment = expected => {
  let date;
  let fmt;
  if (moment.isMoment(expected)) return expected;
  if (isString(expected)) {
    date = expected;
    fmt = 'DD-MM-YYYY';
  } else {
    date = expected.date;
    fmt = expected.fmt;
  }

  return moment(date, fmt);
};

const converter = {
  check: expected => moment.isMoment(expected),
  convert: expected => expected.toJSON(),
};

module.exports = (() => {
  expect.extend({
    toBeMoment: CreateMatcher(actual => moment.isMoment(actual), MakeMsg('moment object'), converter),
    equalsMoment: CreateMatcher(
      (actual, expected) => {
        if (moment.isMoment(actual)) {
          const date = convertMoment(expected);
          return actual.isSame(date);
        }
        return false;
      },
      {
        fail: "Moment date :actual don't match :expected",
        succ: 'Moment dates match :actual',
      },
      converter
    ),
    toBeAfter: CreateMatcher(
      (actual, expected) => {
        if (moment.isMoment(actual)) {
          const date = convertMoment(expected);
          return actual.isAfter(date);
        }
        return false;
      },
      {
        fail: "Moment date :actual isn't after :expected",
        succ: 'Moment :actual is after :expected',
      },
      converter
    ),

    toBeBefore: CreateMatcher(
      (actual, expected) => {
        if (moment.isMoment(actual)) {
          const date = convertMoment(expected);
          return actual.isBefore(date);
        }
        return false;
      },
      {
        fail: "Moment date :actual isn't before :expected",
        succ: 'Moment :actual is after :expected',
      },
      converter
    ),

    toBeSameOrAfter: CreateMatcher(
      (actual, expected) => {
        if (moment.isMoment(actual)) {
          const date = convertMoment(expected);
          return actual.isSameOrAfter(date);
        }
        return false;
      },
      {
        fail: "Moment date :actual isn't same or after :expected",
        succ: 'Moment :actual is same or after :expected',
      },
      converter
    ),

    toBeSameOrBefore: CreateMatcher(
      (actual, expected) => {
        if (moment.isMoment(actual)) {
          const date = convertMoment(expected);
          return actual.isSameOrBefore(date);
        }
        return false;
      },
      {
        fail: "Moment date :actual isn't same or before :expected",
        succ: 'Moment :actual is same or before :expected',
      },
      converter
    ),

    toBeBetween: CreateMatcher(
      (actual, expected) => {
        if (moment.isMoment(actual)) {
          const { start, finish } = expected;
          return actual.isBetween(start, finish);
        }
        return false;
      },
      {
        fail: "Moment date :actual isn't between expected dates",
        succ: 'Moment :actual is between dates',
      },
      converter
    ),
  });
})();
