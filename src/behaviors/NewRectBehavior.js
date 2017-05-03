import FilledRect from '../objects/FilledRect';
import OutlineRect from '../objects/OutlineRect';
import Behavior from './Behavior';
import { isNil } from 'lodash';

class NewRectBehavior extends Behavior {

  constructor(windowgroup, color, lineThickness = 0) {

    super();

    this.startEvent(Behavior.defaultStartEvent);
    this.stopEvent(Behavior.defaultStopEvent);
    this.windowgroup = windowgroup;
    this._color = color;
    this._lineThickness = lineThickness;
  }

  make(x1, y1, x2, y2) {
    if (this._lineThickness === 0) {
			return new FilledRect(x1, y1, x2 - x1, y2 - y1, this._color);
		}

		return new OutlineRect(x1, y1, x2 - x1, y2 - y1, this._color, this._lineThickness);
  }

  resize(obj, x1, y1, x2, y2) {

    obj.x(x1);
    obj.y(y1);
    obj.width(x2 - x1);
    obj.height(y2 - y1);

    return obj;
  }

  start(e) {

    const g = this.group();
		if (isNil(g)) return;

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

export default NewRectBehavior;
