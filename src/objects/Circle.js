import Ellipse from './Ellipse';

import { isNil } from 'lodash';

class Circle extends Ellipse {

  constructor(x = 0, y = 0, r = 10, color = 'black') {
    super(x, y, r * 2, r * 2, color);
  }

  radius(x) {
    if (isNil(x)) return this.width() / 2;
    if (!isNil(this.group())) this.group().damage(this.getBoundingBox());
    this.width(x * 2);
    this.height(x * 2);
    this.update();
    return this;
  }

}

export default Circle;
