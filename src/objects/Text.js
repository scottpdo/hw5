import GraphicalObject from './GraphicalObject';
import { isNil } from 'lodash';

class Text extends GraphicalObject {

  constructor(config) {

    super();

    if (!(config.context instanceof CanvasRenderingContext2D)) {
      throw new Error("Cannot instantiate Text without a context.");
    }

    this.x(config.x || 0);
    this.y(config.y || 0);
    this.color(config.color || 'black');

    this._text = config.text || "";
    this._font = config.fontSize ? config.fontSize.toString() + 'px' : '16px';
    this._font += " " + (config.fontFamily || 'sans-serif');

    const context = config.context;
    context.font = this._font;

    const width = context.measureText(this._text).width;

    this.width(width);
    this.height((config.fontSize || 16) * 1.2); // extra room for descenders
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

		context.fillStyle = this.color();
    context.textBaseline = 'top';

    context.font = this._font;
    context.fillText(this._text, x + this.x(), y + this.y());

    this.contextEnd(context, shape);
  }
}

export default Text;
