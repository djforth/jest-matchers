const convertExpected = converter => expected => {
  const type = typeof expected;
  if (type === 'string' || type === 'number') return expected;

  if (expect.mock) {
    return 'spy called';
  }

  if (converter && converter.check(expected)) {
    return converter.convert(expected);
  }

  return JSON.stringify(expected);
};

const CreateMsg = (msgBase, converter) => (actual, expected, attrs) => () => {
  let msg = msgBase;
  if (/:expected/.test(msg)) {
    msg = msg.replace(/:expected/, converter(expected));
  }

  if (/:actual/.test(msg)) {
    msg = msg.replace(/:actual/, converter(actual));
  }

  if (msg.match(/:attrs/)) {
    msg = msg.replace(/:attrs/, converter(attrs.join(' ')));
  }

  return msg;
};

exports.CreateMatcher = (check, { succ, fail }, converter) => {
  const messageConverter = convertExpected(converter);
  const failMsg = CreateMsg(fail, messageConverter);
  const succMsg = CreateMsg(succ, messageConverter);
  return (actual, expected = '', ...attrs) => {
    // if (expected === undefined) {
    //   expected = '';
    // }
    const result = {};
    result.pass = check(actual, expected, attrs);
    if (result.pass) {
      result.message = succMsg(actual, expected, attrs);
    } else {
      result.message = failMsg(actual, expected, attrs);
    }
    return result;
  };
};

exports.MakeMsg = msg => ({
  fail: `Expected :actual to be a ${msg}`,
  succ: `Is a ${msg}`
});
