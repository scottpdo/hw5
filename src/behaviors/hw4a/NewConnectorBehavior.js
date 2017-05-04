import Behavior from '../Behavior';

import GraphicalObject from '../../objects/GraphicalObject';
import Connector from '../../objects/hw4a/Connector';

import { isNil } from 'lodash';

class NewConnectorBehavior extends Behavior {

  constructor(windowgroup) {
    super(windowgroup);

    this._dummyLeft = new GraphicalObject();
    this._dummyRight = new GraphicalObject();

    this.startEvent(Behavior.defaultStartEvent);
    this.stopEvent(Behavior.defaultStopEvent);
  }

  make(x1, y1, x2, y2) {

    this._dummyLeft.moveTo(x1, y1);
    this._dummyRight.moveTo(x2, y2);

    return new Connector(this._dummyLeft, this._dummyRight);
  }

  resize(c, x1, y1, x2, y2) {

    this._dummyLeft.moveTo(x1, y1);
    this._dummyRight.moveTo(x2, y2);

    c.maintain();

    return c;
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

  running(e) {
    if (e.keyCode === this.cancelKey()) return this.cancel(e);

    const g = this.group();
    if (isNil(g) || !this.active()) return;

    const bb = g.getBoundingBox();

    const x = e.x - bb.x;
    const y = e.y - bb.y;

    // if no pivot, assume dummyLeft is fixed
    if (isNil(this._whichMoving)) this._whichMoving = this._dummyRight;
    this._whichMoving.moveTo(x, y);

    this._activeObject.maintain();

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

  pivot(p) {
    if (isNil(p)) return this._whichMoving === this._dummyLeft ? 'right' : 'left';
    this._whichMoving = (p === 'left') ? this._dummyRight : this._dummyLeft;
    return this;
  }
}

export default NewConnectorBehavior;
