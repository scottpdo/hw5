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

  group(g) {
    if (isNil(g)) return this._group;
    this._group = g;
  }

  width(value) {
    if (isNil(value)) return this._width;
    this._width = value;
  }

  height(value) {
    if (isNil(value)) return this._height;
    this._height = value;
  }

  x(value) {
    if (isNil(value)) return this._x;
    this._x = value;
  }

  y(value) {
    if (isNil(value)) return this._y;
    this._y = value;
  }

  color(value) {
    if (isNil(value)) return this._color;
    this._color = value;
  }

  lineThickness(value) {
    if (isNil(value)) return this._lineThickness;
    this._lineThickness = value;
  }

  getBoundingBox() {
    return new BoundaryRectangle(this._x, this._y, this._width, this._height);
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
    this._updated = true;
		if (!isNil(this.group())) {
      this.group().damage(this.getBoundingBox());
    }
		this.shouldConstraintsTrigger();
  }

  moveTo(x, y) {

    if (!isNil(this.group())) {
      this.group().damage(this.getBoundingBox());
    }

		this.x(x);
		this.y(y);

		this.update();
  }

  // TODO
  shouldConstraintsTrigger() {
    // this._constraints.forEach(constraint => {
    //   const conditions = (
    //
    //   );
    // });
  }
}

export default GraphicalObject;
