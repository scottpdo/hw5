import GraphicalObject from './GraphicalObject';
import BoundaryRectangle from './BoundaryRectangle';

import { isNil } from 'lodash';

class Line extends GraphicalObject {
  constructor(x1, y1, x2, y2, color = 'black', lineThickness = 1) {
    super();
    this._x1 = x1;
    this._y1 = y1;
    this._x2 = x2;
    this._y2 = y2;
    this.color(color);
    this.lineThickness(lineThickness);
  }

  draw(context, shape) {
    this.contextBegin(context, shape);

    let g = this.group();
    if (isNil(g)) return;

		let x = 0;
		let y = 0;

		while ( !isNil(g.group()) ) {
			x += g.getBoundingBox().x;
			y += g.getBoundingBox().y;
			g = g.group();
		}

    context.strokeStyle = this.color();
    context.lineWidth = this.lineThickness();
    context.moveTo(x + this._x1, y + this._y1);
		context.lineTo(x + this._x2, y + this._y2);
    context.stroke();

    this.contextEnd(context, shape);
  }

  //@Override
	getBoundingBox() {

		const lineThickness = this.lineThickness();

		const minX = Math.min(this._x1, this._x2) - lineThickness;
		const maxX = Math.max(this._x1, this._x2) + lineThickness;
		const minY = Math.min(this._y1, this._y2) - lineThickness;
		const maxY = Math.max(this._y1, this._y2) + lineThickness;

		return new BoundaryRectangle(minX, minY, maxX - minX, maxY - minY);
	}

  //@Override
  moveTo(x, y) {

    if (!isNil(this.group())) this.group().damage(this.getBoundingBox());

    const minX = Math.min(this._x1, this._x2);
    const minY = Math.min(this._y1, this._y2);
    const dx = x - minX;
    const dy = y - minY;

    this._x1 += dx;
    this._y1 += dy;
    this._x2 += dx;
    this._y2 += dy;

    this.update();
  }

  //@Override
  contains(x, y) {

    if (isNil(this.group())) return false;

    const minX = Math.min(this._x1, this._x2) + this.group().getBoundingBox().x;
    const maxX = Math.max(this._x1, this._x2) + this.group().getBoundingBox().x;
    const minY = Math.min(this._y1, this._y2) + this.group().getBoundingBox().y;
    const maxY = Math.max(this._y1, this._y2) + this.group().getBoundingBox().y;

    return x >= minX && x < maxX &&
           y >= minY && y < maxY;
  }

  //@Override
  getCenter() {
    return {
      x: (this._x1 + this._x2) / 2,
      y: (this._y1 + this._y2) / 2
    };
  }

  x1(value) {
    if (isNil(value)) return this._x1;
    this._x1 = value;
    this.update();
    return this;
  }

  y1(value) {
    if (isNil(value)) return this._y1;
    this._y1 = value;
    this.update();
    return this;
  }

  x2(value) {
    if (isNil(value)) return this._x2;
    this._x2 = value;
    this.update();
    return this;
  }

  y2(value) {
    if (isNil(value)) return this._y2;
    this._y2 = value;
    this.update();
    return this;
  }
}

export default Line;
