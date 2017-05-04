import Circle from '../Circle';
import ControlledCircle from './ControlledCircle';

import MinDistanceConstraint from '../../constraints/MinDistanceConstraint';

import { isNil } from 'lodash';

class ControllerCircle extends Circle {

  //@Override
	group(g) {

    if (isNil(g)) return this._group;

    super.group(g);

		// if unsetting group, we're done
		if (isNil(this.group())) return;

    // look for ControlledCircles that are not already
		// being controlled by this
		for (let i = 0; i < this.group().children().length; i++) {

			const c = this.group().children(i);
			if (!(c instanceof ControlledCircle)) continue;

			if (!(c.hasController(this))) c.addController(this);

			new MinDistanceConstraint(
				c,
				this,
				this.radius() + c.radius() + 10
			);
		}

    return this;
	}
}

export default ControllerCircle;
