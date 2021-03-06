import WindowGroup from '../objects/WindowGroup';
import Group from '../objects/Group';
import LayoutGroup from '../objects/LayoutGroup';

import OutlineRect from '../objects/OutlineRect';
import Button from '../objects/Button';

import MoveBehavior from '../behaviors/MoveBehavior';
import NewRectBehavior from '../behaviors/NewRectBehavior';
import NewLineBehavior from '../behaviors/NewLineBehavior';
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
    this.addChild(menuGroup);

    let paintGroup = new Group(200, 20, 600, 600);
    this.addChild(paintGroup);
    paintGroup.addChild(new OutlineRect(0, 0, 600, 600));

    let cb = new ChoiceBehavior(this, 'toggle', false);
		cb.group(menuGroup);
    this.addBehavior(cb);

    let nr = new NewRectBehavior(this, 'red');
    nr.group(paintGroup).active(false);
    this.addBehavior(nr);

    let nb = new NewRectBehavior(this, 'blue');
    nb.group(paintGroup).active(false);
    this.addBehavior(nb);

    let nl = new NewLineBehavior(this, 'black', 2);
    nl.group(paintGroup).active(false);
    this.addBehavior(nl);

    let m = new MoveBehavior(this);
    m.group(paintGroup);
    this.addBehavior(m);

    drawRedBtn.selectedBehavior(nr);
    drawBlueBtn.selectedBehavior(nb);
    drawLineBtn.selectedBehavior(nl);
    moveBtn.selectedBehavior(m);

    this.redraw();
  }
}

export default HW3;
