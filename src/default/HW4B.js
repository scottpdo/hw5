import WindowGroup from '../objects/WindowGroup';
import Group from '../objects/Group';
import LayoutGroup from '../objects/LayoutGroup';

import OutlineRect from '../objects/OutlineRect';
import Button from '../objects/Button';
import Text from '../objects/Text';
import ControllerCircle from '../objects/hw4b/ControllerCircle';

import NewControlledCircleBehavior from '../behaviors/hw4b/NewControlledCircleBehavior';
import MoveBehavior from '../behaviors/MoveBehavior';
import ChoiceBehavior from '../behaviors/ChoiceBehavior';

class HW4B extends WindowGroup {
  componentDidMount() {

    this.addEventListeners();

    // add objects

    this.context = this.refs.canvas.getContext('2d');

    let menuGroup = new LayoutGroup(20, 60, 180, 600, 'vertical', 20);

    let addCircle = new Button();
    addCircle.text("Add Circle");
    let moveBtn = new Button();
    moveBtn.text("Move");
    menuGroup.addChildren(addCircle, moveBtn);
    this.addChild(menuGroup);

    let paintGroup = new Group(200, 60, 600, 600);
    this.addChild(paintGroup);
    paintGroup.addChild(new OutlineRect(0, 0, 600, 600));

    this.addChild(new Text({
      context: this.context,
      text: "Move red circle and new circles will avoid it.",
      fontSize: 24,
      x: 20,
      y: 10
    }));

    let cb = new ChoiceBehavior(this, 'toggle', false);
		cb.group(menuGroup);
    this.addBehavior(cb);

    let nc = new NewControlledCircleBehavior(this, 'blue');
    nc.group(paintGroup).active(false);
    this.addBehavior(nc);

    let m = new MoveBehavior(this);
    m.group(paintGroup);
    this.addBehavior(m);

    let cc = new ControllerCircle(100, 100, 40, 'red');
		paintGroup.addChild(cc);

    addCircle.selectedBehavior(nc);
    moveBtn.selectedBehavior(m);

    this.redraw();
  }
}

export default HW4B;
