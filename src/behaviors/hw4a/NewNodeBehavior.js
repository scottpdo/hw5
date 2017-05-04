import Behavior from '../Behavior';
import Node from '../../objects/hw4a/Node';

import { isNil } from 'lodash';

class NewNodeBehavior extends Behavior {

  constructor(windowgroup) {
    super(windowgroup);

    this.startEvent(Behavior.defaultStartEvent);
    this.stopEvent(Behavior.defaultStopEvent);
  }

  make(x1, y1, x2, y2) {
    return new Node(x1, y1);
  }

  start(e) {

    const g = this.group();
		if (isNil(g) || !this.active()) return;

    const bb = g.getBoundingBox();

		const x = e.x - bb.x;
		const y = e.y - bb.y;

		const r = this.make(x, y, x, y);

		g.addChild(r);
		this._activeObject = r;
		this.state(true);

    this.windowgroup.redraw();
  }

  stop(e) {
    if (e.keyCode === this.cancelKey()) return this.cancel(e);

    this._activeObject = null;
    this.state(false);

    this.windowgroup.redraw();
  }

  cancel(e) {
    const g = this.group();
    if (isNil(g)) return;
    g.removeChild(this._activeObject);
    this._activeObject = null;
    this.state(false);

    this.windowgroup.redraw();
  }
}

export default NewNodeBehavior;
