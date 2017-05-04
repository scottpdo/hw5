import Circle from '../Circle';
import ControllerCircle from './ControllerCircle';

import MinDistanceConstraint from '../../constraints/MinDistanceConstraint';

import { isNil } from 'lodash';

class ControlledCircle extends Circle {

  constructor(x, y, r, color) {
    super(x, y, r, color);
    this._controllers = [];
  }

  //@Override
	group(g) {

    if (isNil(g)) return this._group;

		super.group(g);

		// if unsetting group, we're done
		if (this.group() === null) return;

		// look for ControllerCircle
		for (let i = 0; i < this.group().children().length; i++) {

			const c = this.group().children(i);
			if (!(c instanceof ControllerCircle)) continue;

			this.addController(c);

			new MinDistanceConstraint(
				c,
				this,
				this.radius() + c.radius() + 10
			);
		}

    return this;
	}

  //@Override
	radius(r) {

    if (isNil(r)) return this.width() / 2;

		super.radius(r);

		// update constraint based on radius
		for (let i = 0; i < this.constraints().length; i++) {
			if (this.constraints(i) instanceof MinDistanceConstraint) {
        const c = this.constraints(i);
				c.minDistance(this.radius() + c.a().radius() + 10);
			}
		}

    return this;
	}

  addController(controller) {
		this.controllers().push(controller);
	}

	controllers() {
		return this._controllers;
	}
}

export default ControlledCircle;
