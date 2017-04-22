import GraphicalObject from './GraphicalObject';
import { isNil } from 'lodash';

class FilledRect extends GraphicalObject {

  constructor(x = 0, y = 0, width = 10, height = 10, color = 'black') {

    super();

    this.x(x);
    this.y(y);
    this.width(width);
    this.height(height);
    this.color(color);
  }

  draw(context, shape) {

    let g = this.group();
    if (isNil(g)) return;

		let x = 0;
		let y = 0;

		while ( !isNil(g) && !isNil(g.group()) ) {
			x += g.getBoundingBox().x;
			y += g.getBoundingBox().y;
			g = g.group();
		}

		context.fillStyle = this.color();

    context.rect(shape.x, shape.y, shape.width, shape.height);
    context.clip();

		context.fillRect(
			x + this.x(),
			y + this.y(),
			this.width(),
			this.height()
		);
  }
}

export default FilledRect;
