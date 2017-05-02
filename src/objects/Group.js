import GraphicalObject from './GraphicalObject';
import BoundaryRectangle from './BoundaryRectangle';
import { isNil } from 'lodash';

class Group extends GraphicalObject {

  constructor(x = 0, y = 0, width = 10, height = 10) {
    super();

    this.x(x);
    this.y(y);
    this.width(width);
    this.height(height);

    this._children = [];
  }

  addChild(child) {

    if (!isNil(child.group())) {
      throw new Error("This graphical object already has a group!");
    }

    this.children().push(child);
    child.group(this);

    this.damage(child.getBoundingBox());
  }

  addChildren(children) {
    // if children are individual args,
    // convert to Array
    if (!(children instanceof Array)) {
      children = Array.prototype.slice.call(arguments);
    }
    children.forEach(child => this.addChild(child));
  }

  children() { return this._children; }

  damage(r: BoundaryRectangle) {

		if (isNil(this.group())) return;

		// constrain rectangle to portion inside this group's
		// clipping rectangle
		const bb = this.getBoundingBox();

		// update r to group coordinates
		r.x += bb.x;
		r.y += bb.y;

		if (r.x < bb.x) r.x = bb.x;
		if (r.y < bb.y) r.y = bb.y;

		if (r.x + r.width > bb.x + bb.width) r.width = bb.width + bb.x - r.x;
		if (r.y + r.height > bb.y + bb.height) r.height = bb.height + bb.y - r.y;

    this.group().damage(r);
	}

  draw(context, clipRect) {
    this.children().forEach(gobj => {
      const r = gobj.getBoundingBox();
      if (r.intersects(clipRect)) {
        gobj.draw(context, clipRect);
      }
    });
  }
}

export default Group;
