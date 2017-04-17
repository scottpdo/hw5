import GraphicalObject from './GraphicalObject';

class OutlineRect extends GraphicalObject {

  constructor(x = 0, y = 0, width = 10, height = 10, color = 'black', lineThickness = 1) {

    super();

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.lineThickness = lineThickness;
  }

  draw(context, shape) {

    let g = this.getGroup();
    if (g == null) return;

    const strokeOffset = this.lineThickness / 2;

		let x = 0;
		let y = 0;

		while ( g.getGroup() !== null ) {
			x += g.getBoundingBox().x;
			y += g.getBoundingBox().y;
			g = g.getGroup();
		}

		context.fillStyle = this.color;
    context.lineWidth = this.lineThickness;

		context.rect(shape.x, shape.y, shape.width, shape.height);
    context.clip();

		context.strokeRect(
			x + this.getX() + strokeOffset,
			y + this.getY() + strokeOffset,
			this.getWidth() - 2 * strokeOffset,
			this.getHeight() - 2 * strokeOffset
		);
  }
}

export default OutlineRect;
