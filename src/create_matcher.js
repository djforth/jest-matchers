import {Map, List} from 'immutable';

const convertExpected = (expected)=>{
  let type = typeof expected;
  if (type === 'string'|| type === 'number') return expected;

  if (expect.and){
    return `spy called`;
  }

  if (Map.isMap(expected) || List.isList(expected)){
    expected = expected.toJS();
  }

  return JSON.stringify(expected);
};

const CreateMsg = (msg)=>(actual, expected)=>()=>{
  if (msg.match(/:expected/)){
    msg = msg.replace(/:expected/, convertExpected(expected));
  }

  if (msg.match(/:actual/)){
    msg = msg.replace(/:actual/, convertExpected(actual));
  }

  return msg;
};

export default (check, {succ, fail})=>{
  const failMsg = CreateMsg(fail);
  const succMsg = CreateMsg(succ);
  return (actual, expected)=>{
    if (expected === undefined){
      expected = '';
    };
    let result = {};
    result.pass = check(actual, expected);
    if (result.pass){
      result.message = succMsg(actual, expected);
    } else {
      result.message = failMsg(actual, expected);
    }
    return result;
  };
};
