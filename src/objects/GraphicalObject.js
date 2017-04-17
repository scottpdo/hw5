import BoundaryRectangle from './BoundaryRectangle';

class GraphicalObject {

  x: number;
  y: number;
  width: number;
  height: number;

  constructor() {
    this.group = null;
  }

  /**
   * Left empty for objects to define.
   */
  draw(context, shape): void {}

  getGroup() { return this.group; }
  setGroup(g) { this.group = g; }
  getWidth() { return this.width; }
  getHeight() { return this.height; }
  getX() { return this.x; }
  getY() { return this.y; }

  getBoundingBox() {
    return new BoundaryRectangle(this.x, this.y, this.width, this.height);
  }

  update() {
    // setUpdated(true);
		if (this.getGroup() != null) {
      this.getGroup().damage(this.getBoundingBox());
    }
		// shouldConstraintsTrigger();
  }
}

export default GraphicalObject;
