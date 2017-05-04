import { isNil } from 'lodash';

class Constraint {

  constructor(a, b) {

    this.a(a);
    this.b(b);

    a.addConstraint(this);
    b.addConstraint(this);

    this.trigger();
  }

  a(x) {
    if (isNil(x)) return this._a;
    this._a = x;
    return this;
  }

  b(x) {
    if (isNil(x)) return this._b;
    this._b = x;
    return this;
  }

  hasA(a) { return this.a() === a; }
  hasB(b) { return this.b() === b; }

  // to be overridden by subclasses
  trigger() {}
}

export default Constraint;
