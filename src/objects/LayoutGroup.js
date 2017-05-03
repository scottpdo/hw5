import Group from './Group';
// import BoundaryRectangle from './BoundaryRectangle';
import { isNil } from 'lodash';

class LayoutGroup extends Group {

  constructor(x = 0, y = 0, width = 10, height = 10, type = "", offset = 0) {

    if (type !== 'horizontal' && type !== 'vertical') {
      throw new Error("LayoutGroup type must be either `horizontal` or `vertical`");
    }

    super(x, y, width, height);

    this._type = type;
    this._offset = offset;
  }

  updateChildren() {
    let x = 0;
		let y = 0;

		for (let i = 0; i < this.children().length; i++) {

      const c = this.children(i);

			c.moveTo(x, y);

			if (this._type === 'horizontal') {
				x += c.getBoundingBox().width + this._offset;
			} else {
				y += c.getBoundingBox().height + this._offset;
			}
		}
  }

  //@Override
  addChild(child) {

    if (!isNil(child.group())) {
      throw new Error("This graphical object already has a group!");
    }

    this.children().push(child);
    child.group(this);

    this.updateChildren();

    this.damage(child.getBoundingBox());
  }

  //@Override
  bringChildToFront(child) {

		this.children().splice(this.children().indexOf(child), 1);
		this.addChild(child);

    this.updateChildren();

		this.damage(child.getBoundingBox());
	}
}

export default LayoutGroup;
