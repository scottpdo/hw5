import WindowGroup from '../objects/WindowGroup';
import Group from '../objects/Group';
import LayoutGroup from '../objects/LayoutGroup';

import FilledRect from '../objects/FilledRect';
import OutlineRect from '../objects/OutlineRect';
// import Ellipse from '../objects/Ellipse';
import Circle from '../objects/Circle';
import Text from '../objects/Text';
import Button from '../objects/Button';

// import MoveBehavior from '../behaviors/MoveBehavior';
import NewRectBehavior from '../behaviors/NewRectBehavior';
import ChoiceBehavior from '../behaviors/ChoiceBehavior';

class HW3 extends WindowGroup {
  componentDidMount() {

    this.addEventListeners();

    // add objects

    this.context = this.refs.canvas.getContext('2d');

    let menuGroup = new LayoutGroup(20, 20, 180, 600, 'vertical', 20);

    let drawRedBtn = new Button();
    drawRedBtn.text("Draw Red");
    let drawBlueBtn = new Button();
    drawBlueBtn.text("Draw Blue");
    let drawLineBtn = new Button();
    drawLineBtn.text("Draw Line");
    let moveBtn = new Button();
    moveBtn.text("Move");
    menuGroup.addChildren(drawRedBtn, drawBlueBtn, drawLineBtn, moveBtn);

    let paintGroup = new Group(200, 0, 600, 600);

    let a = new FilledRect(220, 120, 60, 30, 'orange');
    let b = new OutlineRect(30, 30, 120, 30, 'black', 5);
    // let e = new Ellipse(0, 0, 40, 80, 'blue');
    let c = new Circle(80, 80, 20, 'green');
    let t = new Text({
      text: "Hello, world!",
      x: 10,
      y: 10,
      fontSize: 50,
      fontFamily: 'sans-serif',
      context: this.context
    });

    this.addChild(menuGroup);
    this.addChild(paintGroup);

    paintGroup.addChildren(a, b, c, t);

    // let m = new MoveBehavior(this);
    // m.group(paintGroup);
    // this.addBehavior(m);
    //
    let cb = new ChoiceBehavior(this, 'toggle', false);
		cb.group(menuGroup);
    this.addBehavior(cb);

    let nr = new NewRectBehavior(this, 'red');
    nr.group(paintGroup);
    this.addBehavior(nr);

    this.redraw();
  }
}

export default HW3;
