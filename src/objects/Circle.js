import Ellipse from './Ellipse';

class Circle extends Ellipse {

  constructor(x = 0, y = 0, r = 10, color = 'black') {
    super(x, y, r * 2, r * 2, color);
  }

}

export default Circle;
