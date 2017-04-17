import GraphicalObject from './GraphicalObject';

class Group extends GraphicalObject {

  constructor(x = 0, y = 0, width = 10, height = 10) {
    super();

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.children = [];
  }

  addChild(child) {

    if (child.getGroup() !== null) {
      throw new Error("This graphical object already has a group!");
    }

    this.children.push(child);
    child.setGroup(this);

    this.damage(child.getBoundingBox());
  }

  damage(r) {

		if (this.getGroup() === null) return;

		// constrain rectangle to portion inside this group's
		// clipping rectangle
		const bb = this.getBoundingBox();

		// update r to group coordinates
		r.x += bb.x;
		r.y += bb.y;

		if (r.x < bb.x) r.x = bb.x;
		if (r.y < bb.y) r.y = bb.y;

		// TODO: check for off by 1?
		if (r.x + r.width > bb.x + bb.width) r.width = bb.width + bb.x - r.x;
		if (r.y + r.height > bb.y + bb.height) r.height = bb.height + bb.y - r.y;

    this.getGroup().damage(r);
	}

  draw(context, clipRect) {
    this.children.forEach(gobj => {
      gobj.draw(context, clipRect);
    });
  }
}

export default Group;
