import BezierCurve from '../BezierCurve';
import Node from './Node';

import { isNil } from 'lodash';

/**
 * A particular type of a BezierCurve
 * which connects two GraphicalObjects (left and right).
 * @author scottdonaldson
 *
 */
class Connector extends BezierCurve {

  constructor(left, right, color = 'black', lineThickness = 1) {
    super();
    this.color(color);
    this.lineThickness(1);
    this.left(left);
    this.right(right);
    this.maintain();
  }

  calcCX1(x1, x2, span) {
		span = Math.max(Math.abs(span), 20);
		return Math.max(x1 + span, (x1 + x2) / 2);
	}

	calcCX2(x1, x2, span) {
		span = Math.max(Math.abs(span), 20);
		return Math.min(x2 - span, (x1 + x2) / 2);
	}

  /**
	 * Determine end and control points from
	 * left and right objects.
	 */
	maintain() {

		if (isNil(this.left()) || isNil(this.right())) return;

    console.log('maintaining')

    const left = this.left();
    const right = this.right();
		const x1 = left.x() + left.width();
		const x2 = right.x();
		const y1 = left.y() + left.height() / 2;
		const y2 = right.y() + right.height() / 2;
		const cx1 = this.calcCX1(x1, x2, y2 - y1);
		const cx2 = this.calcCX2(x1, x2, y2 - y1);
		const cy1 = y1;
		const cy2 = y2;

    console.log('RIGHT', right);

		this.x1(x1);   this.x2(x2);
		this.y1(y1);   this.y2(y2);
		this.cx1(cx1); this.cx2(cx2);
		this.cy1(cy1); this.cy2(cy2);
	}

  left(n) {
    if (isNil(n)) return this._left;
    if (n instanceof Node) n.addConnector(this, 'out');
    this._left = n;
    this.update();
    return this;
  }

  right(n) {
    if (isNil(n)) return this._right;
    if (n instanceof Node) n.addConnector(this, 'in');
    this._right = n;
    this.update();
    return this;
  }
}

export default Connector;
