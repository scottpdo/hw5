import GraphicalObject from './GraphicalObject';
import BoundaryRectangle from './BoundaryRectangle';
import { isNil } from 'lodash';

class Ellipse extends GraphicalObject {

  constructor(x = 0, y = 0, width = 10, height = 10, color = 'black') {

    super();

    this.x(x);
    this.y(y);
    this.width(width);
    this.height(height);
    this.color(color);
  }

  draw(context, shape) {
    
    this.contextBegin(context, shape);

    let g = this.group();
    if (g == null) return;

		let x = 0;
		let y = 0;

		while ( !isNil(g.group()) ) {
			x += g.getBoundingBox().x;
			y += g.getBoundingBox().y;
			g = g.group();
		}

		context.fillStyle = this.color();

    context.beginPath();
		context.ellipse(
			x + this.x(),
			y + this.y(),
			this.width() / 2,
			this.height() / 2,
      2 * Math.PI,
      0,
      2 * Math.PI
		);
    context.fill();

    this.contextEnd(context, shape);
  }

  //@Override
  contains(x, y): Boolean {
    if (isNil(this.group())) return false;
    x += this.width() / 2;
    y += this.height() / 2;
    return x >= this.group().getBoundingBox().x + this.x() &&
				   x < this.group().getBoundingBox().x + this.x() + this.width() &&
				   y >= this.group().getBoundingBox().y + this.y() &&
				   y < this.group().getBoundingBox().y + this.y() + this.height();
  }

  //@Override
  getBoundingBox() {
    return new BoundaryRectangle(
      this.x() - this.width() / 2,
      this.y() - this.height() / 2,
      this.width(),
      this.height()
    );
  }

  //@Override
  moveTo(x, y) {

    if (!isNil(this.group())) {
      this.group().damage(this.getBoundingBox());
    }

    this.x(x + this.width() / 2);
    this.y(y + this.height() / 2);

    this.update();
  }
}

export default Ellipse;
