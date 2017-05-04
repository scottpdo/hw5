import Behavior from './Behavior';

import { isNil } from 'lodash';

class MoveBehavior extends Behavior {

  constructor(windowgroup) {
    super(windowgroup);
    this.startEvent(Behavior.defaultStartEvent);
    this.stopEvent(Behavior.defaultStopEvent);
  }

  start(e) {

    let g = this.group();
		if (isNil(g) || !this.active()) return;

		let x = e.x, y = e.y;

		// iterate in reverse (paint order)
    for (let i = g.children().length - 1; i >= 0; i--) {
      const c = g.children()[i];
      if (c.contains(x, y)) {

        this.state(true); // running

				this._activeObject = c;
				this._startX = x - c.getBoundingBox().x; // offset from left
				this._startY = y - c.getBoundingBox().y; // offset from right

        return;
			}
    }

		// outside group bounding box, stop
		if (!g.contains(x, y)) stop(e);
  }

  running(e) {

    if (isNil(this.group())) return;

    const x = e.x;
    const y = e.y;

    this._activeObject.moveTo(x - this._startX, y - this._startY);

    if (!this.group().contains(x, y)) this.stop(e);

    this.windowgroup.redraw();

  }

  stop(e) {
    this.state(false);
  }

  cancel(e) {
    this.state(false);
    this._activeObject.moveTo(this._startX, this._startY);
    this.windowgroup.redraw();
  }
}

export default MoveBehavior;
