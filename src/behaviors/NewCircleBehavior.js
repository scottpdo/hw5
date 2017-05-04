import Circle from '../objects/Circle';
import Behavior from './Behavior';
import { isNil } from 'lodash';

class NewCircleBehavior extends Behavior {

  constructor(windowgroup, color) {

    super(windowgroup);

    this.startEvent(Behavior.defaultStartEvent);
    this.stopEvent(Behavior.defaultStopEvent);

    this._color = color;
  }

  make(x1, y1, x2, y2) {

    const r = Math.round(Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)));
		return new Circle(x1, y1, r, this._color);
  }

  resize(obj, x1, y1, x2, y2) {

    const r = Math.round(Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)));
		obj.radius(r);

    return obj;
  }

  start(e) {

    const g = this.group();
		if (isNil(g) || !this.active()) return;

		const bb = g.getBoundingBox();
		const pivot = { x: e.x - bb.x, y: e.y - bb.y };
		const r = this.make(pivot.x, pivot.y, pivot.x, pivot.y);

		g.addChild(r);
		this._activeObject = r;
    this._pivot = pivot;
		this.state(true);
  }

  running(e) {
    if (e.keyCode === this.cancelKey()) return this.cancel(e);

    const g = this.group();
    if (isNil(g)) return;

    const bb = g.getBoundingBox();

    // ensure that x1, y1 <= x2, y2
		const x = e.x - bb.x;
		const y = e.y - bb.y;

		this._activeObject = this.resize(
			this._activeObject,
			Math.min(this._pivot.x, x),
			Math.min(this._pivot.y, y),
			Math.max(this._pivot.x, x),
			Math.max(this._pivot.y, y)
		);

    this.windowgroup.redraw();
  }

  stop(e) {

		if (e.keyCode === this.cancelKey()) return this.cancel(e);

		this._activeObject = null;
		this._pivot = null;
		this.state(false);
	}

  cancel(e) {

    const g = this.group();
    if (isNil(g)) return;

    g.removeChild(this._activeObject);

    this._activeObject = null;
    this._pivot = null;
    this.state(false);

    this.windowgroup.redraw();
  }
}

export default NewCircleBehavior;
