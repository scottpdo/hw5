import GraphicalObject from './GraphicalObject';
import { isNil } from 'lodash';

class OutlineRect extends GraphicalObject {

  constructor(x = 0, y = 0, width = 10, height = 10, color = 'black', lineThickness = 1) {

    super();

    this.x(x);
    this.y(y);
    this.width(width);
    this.height(height);
    this.color(color);
    this.lineThickness(lineThickness);
  }

  draw(context, shape) {

    this.contextBegin(context, shape);

    let g = this.group();
    if (isNil(g)) return;

    const strokeOffset = this.lineThickness() / 2;

		let x = 0;
		let y = 0;

		while ( !isNil(g.group()) ) {
			x += g.getBoundingBox().x;
			y += g.getBoundingBox().y;
			g = g.group();
		}

		context.fillStyle = this.color();
    context.lineWidth = this.lineThickness();

		context.strokeRect(
			x + this.x() + strokeOffset,
			y + this.y() + strokeOffset,
			this.width() - 2 * strokeOffset,
			this.height() - 2 * strokeOffset
		);

    this.contextEnd(context, shape);
  }
}

export default OutlineRect;
