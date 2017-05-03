import GraphicalObject from './GraphicalObject';
import { isNil } from 'lodash';

class Button extends GraphicalObject {

  constructor(
    x = 0,
    y = 0,
    color = 'rgb(255, 0, 0)',
    hoverColor = 'rgb(255, 100, 100)',
    activeColor = 'rgb(0, 255, 100)'
  ) {

    super();

    this.x(x);
    this.y(y);
    this.color(color);
    this._hoverColor = hoverColor;
    this._activeColor = activeColor;

    this.selectable(true);

    this.width(120);
    this.height(24);
  }

  draw(context, shape) {

    this.contextBegin(context, shape);

    let g = this.group();
    if (isNil(g)) return;

		let x = 0;
		let y = 0;
    const r = 6;
    const width = this.width();
    const height = this.height()

		while ( g.group() != null ) {
			x += g.getBoundingBox().x;
			y += g.getBoundingBox().y;
			g = g.group();
		}

    x += this.x();
    y += this.y();

    context.fillStyle = this.color();
		if (this.selected()) context.fillStyle = this._activeColor;
		if (this.interimSelected()) context.fillStyle = this._hoverColor;

    context.beginPath();

    context.moveTo(x, y + r);
    context.lineTo(x, y + height - r);
    context.arcTo(x, y + height, x + r, y + height, r);
    context.lineTo(x + width - r, y + height);
    context.arcTo(x + width, y + height, x + width, y + height-r, r);
    context.lineTo(x + width, y + r);
    context.arcTo(x + width, y, x + width - r, y, r);
    context.lineTo(x + r, y);
    context.arcTo(x, y, x, y + r, r);
    context.closePath();

    context.fill();

    context.lineWidth = 1;

    context.beginPath();
    context.moveTo(x + 1, y + height - r);
    context.arcTo(x + 1, y + height, x + r, y + height, r);
    context.lineTo(x + width - r - 2, y + height);
    context.arcTo(x + width - 2, y + height, x + width, y + height-r, r);

    context.stroke();

    context.font = '16px sans-serif';
    context.fillStyle = 'black';
    context.fillText(this._text || "", x + 6, y + 18);

    this.contextEnd(context, shape);
  }

  text(value) {
    if (isNil(value)) return this._text;
    this._text = value;
  }
}

export default Button;
