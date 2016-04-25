import {expect} from 'chai';

import Calculator from '../src/Calculator';

describe('Calculator', function() {
  it('adds decimal integers', function() {
    const calculator = new Calculator(10);
    expect(calculator.add("3", "4")).to.equal("7");
  });

  it('adds binary integers', function() {
    const calculator = new Calculator(2);
    expect(calculator.add("101", "1010")).to.equal("1111");
  });

  // Remove .skip to include this test and improve coverage!
  it.skip('throws error for invalid integer', function() {
    const calculator = new Calculator(2);
    expect(() => calculator.add("1", "2")).to.throw(Error);
  });
});
