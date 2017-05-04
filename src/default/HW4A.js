import WindowGroup from '../objects/WindowGroup';
import Group from '../objects/Group';
import LayoutGroup from '../objects/LayoutGroup';

import OutlineRect from '../objects/OutlineRect';
import Button from '../objects/Button';

import NewNodeBehavior from '../behaviors/hw4a/NewNodeBehavior';
import ConnectNodesBehavior from '../behaviors/hw4a/ConnectNodesBehavior';
import MoveBehavior from '../behaviors/MoveBehavior';
import ChoiceBehavior from '../behaviors/ChoiceBehavior';

class HW4A extends WindowGroup {
  componentDidMount() {

    this.addEventListeners();

    // add objects

    this.context = this.refs.canvas.getContext('2d');

    let menuGroup = new LayoutGroup(20, 20, 180, 600, 'vertical', 20);

    let addNodeBtn = new Button();
    addNodeBtn.text("Add Node");
    let drawConnectorBtn = new Button();
    drawConnectorBtn.text("Connect");
    let moveBtn = new Button();
    moveBtn.text("Move");
    menuGroup.addChildren(addNodeBtn, drawConnectorBtn, moveBtn);
    this.addChild(menuGroup);

    let paintGroup = new Group(200, 20, 600, 600);
    this.addChild(paintGroup);
    paintGroup.addChild(new OutlineRect(0, 0, 600, 600));

    let cb = new ChoiceBehavior(this, 'toggle', false);
		cb.group(menuGroup);
    this.addBehavior(cb);

    let nn = new NewNodeBehavior(this);
    nn.group(paintGroup).active(false);
    this.addBehavior(nn);

    let ctb = new ConnectNodesBehavior(this);
    ctb.group(paintGroup).active(false);
    this.addBehavior(ctb);

    let m = new MoveBehavior(this);
    m.group(paintGroup);
    this.addBehavior(m);

    addNodeBtn.selectedBehavior(nn);
    drawConnectorBtn.selectedBehavior(ctb);
    moveBtn.selectedBehavior(m);

    this.redraw();
  }
}

export default HW4A;
