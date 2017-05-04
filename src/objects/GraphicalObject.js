import BoundaryRectangle from './BoundaryRectangle';
import { isNil } from 'lodash';

class GraphicalObject {

  // required attributes
  _x: number;
  _y: number;
  _width: number;
  _height: number;

  constructor() {
    this._group = null;
    this._constraints = [];
  }

  /**
   * Left empty for objects to define.
   */
  draw(context, shape): void {}

  contextBegin(context, shape) {

    context.save();

    context.rect(shape.x, shape.y, shape.width, shape.height);
    context.clip();

    context.beginPath();
  }

  contextEnd(context, shape) {
    context.closePath();
    context.restore();
  }

  damage() {
    const g = this.group();
    if (!isNil(g)) g.damage(this.getBoundingBox());
    return this;
  }

  group(g) {
    if (isNil(g)) return this._group;
    if (g === false) g = null; // hack
    this._group = g;
    return this;
  }

  width(value) {
    if (isNil(value)) return this._width || 0;
    this.damage();
    this._width = value;
    this.update();
    return this;
  }

  height(value) {
    if (isNil(value)) return this._height || 0;
    this.damage();
    this._height = value;
    this.update();
    return this;
  }

  x(value) {
    if (isNil(value)) return this._x;
    this.damage();
    this._x = value;
    this.update();
    return this;
  }

  y(value) {
    if (isNil(value)) return this._y;
    this.damage();
    this._y = value;
    this.update();
    return this;
  }

  color(value) {
    if (isNil(value)) return this._color;
    this.damage();
    this._color = value;
    this.update();
    return this;
  }

  lineThickness(value) {
    if (isNil(value)) return this._lineThickness;
    this.damage();
    this._lineThickness = value;
    this.update();
    return this;
  }

  getBoundingBox() {
    return new BoundaryRectangle(this._x, this._y, this._width, this._height);
  }

  center() {
    return {
      x: (this.x() + this.width()) / 2,
      y: (this.y() + this.height()) / 2
    };
  }

  contains(x, y) {
    const bb = this.group().getBoundingBox();
    return (
      x >= bb.x + this.x() &&
      x <= bb.x + this.x() + this.width() &&
      y >= bb.y + this.y() &&
      y <= bb.y + this.y() + this.height()
    );
  }

  update() {
    this.updated(true);
		this.damage();
		this.shouldConstraintsTrigger();
  }

  updated(is) {
    if (is === true || is === false) {
      this._updated = is;
      return this;
    }
    return this._updated;
  }

  moveTo(x, y) {

    if (!isNil(this.group())) {
      this.group().damage(this.getBoundingBox());
    }

    // console.log('moving', this);
    // console.log('was at', this.x(), ', ', this.y());
    // console.log('now to', x, ', ', y);

		this.x(x);
		this.y(y);
  }

  selectedBehavior(value) {
    if (isNil(value)) return this._selectedBehavior;
    this._selectedBehavior = value;
  }

  selectable(value) {
    if (isNil(value)) return this._selectable;
    this._selectable = value;
  }

  selected(selected) {

    if (isNil(selected)) return this._selected;
		this._selected = selected;

		// activate or deactivate behavior
		if (!isNil(this.selectedBehavior())) {
			this.selectedBehavior().active(selected);
		}
    this.update();
	}

  interimSelected(value) {
    if (isNil(value)) return this._interimSelected;
    this._interimSelected = value;
    this.update();
  }

  constraints(i) {
    if (!isNil(i)) return this._constraints[i];
    return this._constraints;
  }

  addConstraint(c) {
    this.constraints().push(c);
  }

  removeConstraint(c) {
    this.constraints().splice(this.constraints().indexOf(c), 1);
  }

  removeConstraints() {
		while (this.constraints().length > 0) {
			const c = this.constraints(0);
			// remove from the other object (B if A, A if B)
			if (c.hasA(this)) c.b().removeConstraint(c);
			if (c.hasB(this)) c.a().removeConstraint(c);
			this.removeConstraint(c);
		}
	}

  shouldConstraintsTrigger() {

		for (let i = 0; i < this.constraints().length; i++) {

			const c = this.constraints(i);

			const conditions = c.hasA(this) && c.b().updated() === false;

			if (conditions) this.constraints(i).trigger();
		}

		this.updated(false);
	}
}

export default GraphicalObject;
