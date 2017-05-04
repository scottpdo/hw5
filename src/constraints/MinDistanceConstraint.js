import Constraint from './Constraint';

import distance from '../utils/distance';

import { isNil } from 'lodash';

class MinDistanceConstraint extends Constraint {

  constructor(a, b, minDistance) {
    super(a, b);
    this.minDistance(minDistance);
  }

  minDistance(d) {
    if (isNil(d)) return this._minDistance;
    this._minDistance = d;
    this.trigger();
    return this;
  }

  trigger() {
    const a = this.a();
    const b = this.b();

    const ca = a.center();
		const cb = b.center();

		while (distance(a, b) < this.minDistance()) {

			let dx = cb.x - ca.x;
			let dy = cb.y - ca.y;

			dx = (Math.abs(dx) < this.minDistance() / 4) ? 0 : dx / Math.abs(dx);
			dy = (Math.abs(dy) < this.minDistance() / 4) ? 0 : dy / Math.abs(dy);

			b.x(b.x() + dx);
			b.y(b.y() + dy);
		}
  }
}

export default MinDistanceConstraint;
