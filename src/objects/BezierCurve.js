import GraphicalObject from './GraphicalObject';
import BoundaryRectangle from './BoundaryRectangle';

import { isNil } from 'lodash';

class BezierCurve extends GraphicalObject {

  constructor(x1, y1, cx1, cy1, cx2, cy2, x2, y2, color = 'black', lineThickness = 1) {

    super();

    this.x1(x1); this.y1(y1);
    this.cx1(cx1); this.cy1(cy1);
    this.cx2(cx2); this.cy2(cy2);
    this.x2(x2); this.y2(y2);
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

    context.moveTo(x + this.x1(), y + this.y1());
    context.bezierCurveTo(x + this.cx1(), y + this.cy1(), x + this.cx2(), y + this.cy2(), x + this.x2(), y + this.y2());
    context.stroke();

    this.contextEnd(context, shape);
  }

  //@Override
  getBoundingBox() {
    const lineThickness = this.lineThickness();

		let minX = Math.min(this.x1(), this.x2());
		let minY = Math.min(this.y1(), this.y2());
		let maxX = Math.max(this.x1(), this.x2());
		let maxY = Math.max(this.y1(), this.y2());

		minX = Math.min(Math.min(minX, this.cx1()), this.cx2()) - lineThickness;
		minY = Math.min(Math.min(minY, this.cy1()), this.cy2()) - lineThickness;
		maxX = Math.max(Math.max(maxX, this.cx1()), this.cx2()) + lineThickness;
		maxY = Math.max(Math.max(maxY, this.cy1()), this.cy2()) + lineThickness;

		return new BoundaryRectangle(minX, minY, maxX - minX, maxY - minY);
  }

  //@Override
  moveTo(x, y) {

		this.group().damage(this.getBoundingBox());

		const minX = Math.min(this.x1(), this.x2());
		const minY = Math.min(this.y1(), this.y2());
		const dx = x - minX;
		const dy = y - minY;

		this._x1 += dx;
		this._y1 += dy;
		this._cx1 += dx;
		this._cy1 += dy;
		this._cx2 += dx;
		this._cy2 += dy;
		this._x2 += dx;
		this._y2 += dy;

		this.update();

	}

  //@Override
  contains(x, y) {

    const bb = this.group().getBoundingBox();

		const minX = Math.min(this.x1(), this.x2()) + bb.x;
		const maxX = Math.max(this.x1(), this.x2()) + bb.x;
		const minY = Math.min(this.y1(), this.y2()) + bb.y;
		const maxY = Math.max(this.y1(), this.y2()) + bb.y;

		return x >= minX && x < maxX &&
				   y >= minY && y < maxY;
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

  cx1(value) {
    if (isNil(value)) return this._cx1;
    this._cx1 = value;
    this.update();
    return this;
  }

  cy1(value) {
    if (isNil(value)) return this._cy1;
    this._cy1 = value;
    this.update();
    return this;
  }

  cx2(value) {
    if (isNil(value)) return this._cx2;
    this._cx2 = value;
    this.update();
    return this;
  }

  cy2(value) {
    if (isNil(value)) return this._cy2;
    this._cy2 = value;
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

export default BezierCurve;
