class BoundaryRectangle {

  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  intersects(rect) {
    return (this.x < rect.x + rect.width &&
            this.x + this.width > rect.x &&
            this.y < rect.y + rect.height &&
            this.y + this.height > rect.y );
  }

  add(rect) {
    if (rect == null) return;
    const x = Math.min(this.x, rect.x);
    const y = Math.min(this.y, rect.y);
    const width = Math.max(this.x + this.width, rect.x + rect.width) - x;
    const height = Math.max(this.y + this.height, rect.y + rect.height) - y;

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}

export default BoundaryRectangle;
