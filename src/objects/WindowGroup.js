import React, { Component } from 'react';

import Group from '../objects/Group';
import BoundaryRectangle from '../objects/BoundaryRectangle';
import FilledRect from '../objects/FilledRect';
import OutlineRect from '../objects/OutlineRect';
import Ellipse from '../objects/Ellipse';
import Circle from '../objects/Circle';
import Text from '../objects/Text';

import MoveBehavior from '../behaviors/MoveBehavior';

import { isNil } from 'lodash';

class WindowGroup extends Component {

  constructor() {

    super();

    this.children = [];
    this.behaviors = [];

    this.savedClipRect = null;

    this.scanBehaviors = this.scanBehaviors.bind(this);
  }

  addChild(child) {

    if (!isNil(child.group())) {
      throw new Error("This graphical object already has a group!");
    }

    this.children.push(child);
    child.group(this);

    this.damage(child.getBoundingBox());
  }

  addBehavior(b) {
    this.behaviors.push(b);
  }

  componentDidMount() {

    this.addEventListeners();

    // add objects

    this.context = this.refs.canvas.getContext('2d');

    let g = new Group(0, 0, 600, 400);
    let a = new FilledRect(20, 20, 60, 30, 'orange');
    let b = new OutlineRect(30, 30, 120, 30, 'black', 5);
    let e = new Ellipse(0, 0, 40, 80, 'blue');
    let c = new Circle(80, 80, 20, 'green');
    let t = new Text({
      text: "Hello, world!",
      x: 10,
      y: 10,
      fontSize: 50,
      fontFamily: 'sans-serif',
      context: this.context
    });

    this.addChild(g);

    g.addChildren(a, b, e, c, t);

    let m = new MoveBehavior(this);
    m.group(g);
    this.addBehavior(m);

    this.redraw();

    // setInterval(() => {
    //   c.moveTo(c.x() + 5, 100);
    //   this.redraw();
    // }, 3000);
  }

  addEventListeners() {
    this.refs.canvas.addEventListener('mousemove', this.scanBehaviors);
    this.refs.canvas.addEventListener('mousedown', this.scanBehaviors);
    this.refs.canvas.addEventListener('mouseup', this.scanBehaviors);

    window.addEventListener('keyup', this.scanBehaviors);
  }

  scanBehaviors(e) {

    this.behaviors.forEach(b => {

      // If a behavior is running...
      if (b.state()) {

        // If it should stop, then stop.
        if (b.cancelKey() === e.keyCode) {
          b.cancel(e);
        } else if (b.stopEvent() === e.type) {
          b.stop(e);
        // Otherwise, keep on running.
        } else {
          b.running(e);
        }

        return; // nothing else should start/be running
      }

      // 3. If a behavior should start, then start.
			if (
				b.startEvent() === e.type &&
				b.group().contains(e.x, e.y)
			) {
				b.start(e);
			}
    });
  }

  clear(rect) {
    this.context.clearRect(
      rect.x, rect.y,
      rect.width, rect.height
    );
  }

  redraw() {

    let savedClipRect = this.savedClipRect;

    if (savedClipRect !== null) {
      this.clear(savedClipRect);
      this.children.forEach(gobj => {
        const r = gobj.getBoundingBox();
        if (r.intersects(savedClipRect)) {
          gobj.draw(this.context, savedClipRect);
        }
      });
      this.savedClipRect = null;
    } else {
      console.warn("No saved clipping rectangle.");
    }
  }

  group() { return null; }

  getBoundingBox() {
    return new BoundaryRectangle(0, 0, this.props.width, this.props.height);
  }

  damage(rect) {
    if (this.savedClipRect !== null) {
      this.savedClipRect.add(rect);
    } else {
      this.savedClipRect = rect;
    }
  }

  render() {
    return <canvas ref="canvas" width={this.props.width} height={this.props.height}></canvas>;
  }
}

export default WindowGroup;
