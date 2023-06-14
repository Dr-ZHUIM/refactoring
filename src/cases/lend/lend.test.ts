import { statement } from './statement';
import { json } from '../../utils/fetch';
import { describe, expect, test } from '@jest/globals';

function execution() {
  const invoices = json("/cases/lend/invoices.json",true);
  const plays = json("/cases/lend/plays.json",true);
  const res = statement(invoices[0],plays);
  return res;
}

const res = execution();
const expectedList = ['tape1', 'tape2', 'tape3'];
const expectedAmount = ['$650.00', '$580.00', '$500.00'];
const expectedEntrys = [{ tape1: '$650.00' }, { tape2: '$580.00' }, { tape3: '$500.00' }];

describe("lend issue",()=>{
  test("playsList ---- ", () => {
    expect(res.playsList).toEqual(expectedList)
  });
  test("playsAmount ---- ", () => {
    expect(res.playsAmount).toEqual(expectedAmount)
  });
  test("playsEntry ---- ", () => {
    expect(res.playsEntry).toEqual(expectedEntrys)
  });
})