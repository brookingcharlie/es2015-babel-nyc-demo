class Calculator {
  constructor(radix) {
    this.radix = radix;
  }

  add(x, y) {
    const z = this._parse(x) + this._parse(y);
    return z.toString(this.radix);
  }

  _parse(input) {
    const value = Number.parseInt(input, this.radix);
    if (Number.isNaN(value)) {
      throw new Error(`Unable to parse "${input}" with radix ${this.radix}`);
    }
    return value;
  }
}

module.exports = Calculator;
