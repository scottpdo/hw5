import BoundaryRectangle from './BoundaryRectangle';
import { isNil } from 'lodash';

class GraphicalObject {

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

  update() {
    // setUpdated(true);
		if (!isNil(this.group())) {
      this.group().damage(this.getBoundingBox());
    }
		// shouldConstraintsTrigger();
  }
}

export default GraphicalObject;
