import { Map, List } from 'immutable';
import moment from 'moment';

const convertExpected = expected => {
  let type = typeof expected;
  if (type === 'string' || type === 'number') return expected;

  if (expect.mock) {
    return 'spy called';
  }

  if (Map.isMap(expected) || List.isList(expected)) {
    expected = expected.toJS();
  }

  if (moment.isMoment(expected)) {
    return expected.toJSON();
  }

  return JSON.stringify(expected);
};

const CreateMsg = msg => (actual, expected, attrs) => () => {
  if (msg.match(/:expected/)) {
    msg = msg.replace(/:expected/, convertExpected(expected));
  }

  if (msg.match(/:actual/)) {
    msg = msg.replace(/:actual/, convertExpected(actual));
  }

  if (msg.match(/:attrs/)) {
    msg = msg.replace(/:attrs/, convertExpected(attrs.join(' ')));
  }

  return msg;
};

export default (check, { succ, fail }) => {
  const failMsg = CreateMsg(fail);
  const succMsg = CreateMsg(succ);
  return (actual, expected, ...attrs) => {
    if (expected === undefined) {
      expected = '';
    }
    let result = {};
    result.pass = check(actual, expected, attrs);
    if (result.pass) {
      result.message = succMsg(actual, expected, attrs);
    } else {
      result.message = failMsg(actual, expected, attrs);
    }
    return result;
  };
};
