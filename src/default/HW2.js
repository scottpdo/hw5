import WindowGroup from '../objects/WindowGroup';
import Group from '../objects/Group';

import FilledRect from '../objects/FilledRect';
import OutlineRect from '../objects/OutlineRect';
import Line from '../objects/Line';
import Text from '../objects/Text';

class HW2 extends WindowGroup {

  componentDidMount() {

    this.addEventListeners();

    this.context = this.refs.canvas.getContext('2d');

    let paintGroup = new Group(20, 20, 300, 400);
    this.addChild(paintGroup);

    let r = new OutlineRect(0, 0, 50, 80, 'blue', 4);
    let r2 = new OutlineRect(10, 20, 50, 80, 'red', 8);
    let r3 = new FilledRect(30, 40, 100, 20, 'yellow');
    let line1 = new Line (70, 130, 120, 180, 'blue', 10);

    paintGroup.addChild(r);

    this.redraw();

    let t = 500;

    setTimeout(() => {
      r.moveTo(30, 30);
      this.redraw();
    }, t);

    setTimeout(() => {
      paintGroup.removeChild(r);
      this.redraw();
    }, t * 2);

    setTimeout(() => {
      paintGroup.addChild(r);
      paintGroup.addChild(r2);
      this.redraw();
    }, t * 3);

    // bring blue to front
    setTimeout(() => {
      paintGroup.bringChildToFront(r);
      this.redraw();
    }, t * 4);

    // move red while behind blue
    setTimeout(() => {
      r2.moveTo(20, 30);
      this.redraw();
    }, t * 5);

    // change color of red to green
    setTimeout(() => {
      r2.color('green');
      this.redraw();
    }, t * 6);

    // add yellow FilledRect
    setTimeout(() => {
      paintGroup.addChild(r3);
      this.redraw();
    }, t * 7);

    // put yellow next to blue
    setTimeout(() => {
      const bounds = r.getBoundingBox();
      r3.moveTo(bounds.x + bounds.width, bounds.y + bounds.height / 2);
      this.redraw();
    }, t * 8);

    // create lines
    setTimeout(() => {
      paintGroup.addChild(line1);
      paintGroup.addChild(new Line(10, 130, 10, 180, 'black', 1));
      paintGroup.addChild(new Line(20, 130, 60, 130, 'red', 3));
      this.redraw();
    }, t * 9);

    // move blue line behind red
    setTimeout(() => {
    	line1.x1(40);
    	line1.y1(110);
      this.redraw();
    }, t * 10);

    // test group clipping
    setTimeout(() => {
      paintGroup.addChild(new Line(299, 0, 299, 400, 'black', 1));
    	paintGroup.addChild(new FilledRect(250, 100, 100, 40, 'yellow'));
      this.redraw();
    }, t * 11);

    setTimeout(() => {
      paintGroup.addChild (new Text ({
        context: this.context,
        text: "reallyLongStringShouldGetCutOff",
        x: 50,
        y: 200,
        fontSize: 20
        })
      );
      this.redraw();
    }, t * 12);
  }
}

export default HW2;
