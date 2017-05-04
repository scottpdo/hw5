import Line from '../objects/Line';
import Behavior from './Behavior';
import { isNil } from 'lodash';

class NewLineBehavior extends Behavior {

  constructor(windowgroup, color = 'black', lineThickness = 1) {

    super(windowgroup);

    this.startEvent(Behavior.defaultStartEvent);
    this.stopEvent(Behavior.defaultStopEvent);

    this._color = color;
    this._lineThickness = lineThickness;
  }

  make(x1, y1, x2, y2) {
    return new Line(x1, y1, x2, y2, this._color, this._lineThickness);
  }

  resize(obj, x1, y1, x2, y2) {

    obj.x1(x1);
    obj.y1(y1);
    obj.x2(x2);
    obj.y2(y2);

    return obj;
  }

  start(e) {

    const g = this.group();
		if (isNil(g) || !this.active()) return;

		const bb = g.getBoundingBox();
		const pivot = { x: e.x - bb.x, y: e.y - bb.y };
		const l = this.make(pivot.x, pivot.y, pivot.x, pivot.y);

		g.addChild(l);
		this._activeObject = l;
    this._pivot = pivot;
		this.state(true);
  }

  running(e) {
    if (e.keyCode === this.cancelKey()) return this.cancel(e);

    const g = this.group();
    if (isNil(g)) return;

    const bb = g.getBoundingBox();

		const x = e.x - bb.x;
		const y = e.y - bb.y;

		this._activeObject = this.resize(
			this._activeObject,
			this._pivot.x,
			this._pivot.y,
			x,
			y
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

export default NewLineBehavior;
