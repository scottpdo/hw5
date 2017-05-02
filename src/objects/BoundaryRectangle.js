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
            this.y + this.height > rect.y);
  }

  add(rect: BoundaryRectangle) {

    if (rect == null) return;

    console.log('adding rect', rect);

    const minX = Math.min(this.x, rect.x);
    const minY = Math.min(this.y, rect.y);
    const maxX = Math.max(this.x + this.width, rect.x + rect.width);
    const maxY = Math.max(this.y + this.height, rect.y + rect.height);

    // buffer
    this.x = minX;
    this.y = minY;
    this.width = maxX - minX;
    this.height = maxY - minY;

    console.log('added to this', this);

  }
}

export default BoundaryRectangle;
