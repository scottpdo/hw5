import React, { Component } from 'react';

import Group from '../objects/Group';
import BoundaryRectangle from '../objects/BoundaryRectangle';
import FilledRect from '../objects/FilledRect';
import OutlineRect from '../objects/OutlineRect';
import Ellipse from '../objects/Ellipse';
import { isNil } from 'lodash';

class WindowGroup extends Component {

  constructor() {
    super();
    this.children = [];
    this.savedClipRect = null;
  }

  addChild(child) {
    console.log('adding child', child);
    if (!isNil(child.group())) {
      throw new Error("This graphical object already has a group!");
    }

    this.children.push(child);
    child.group(this);

    this.damage(child.getBoundingBox());
  }

  componentDidMount() {

    this.context = this.refs.canvas.getContext('2d');

    let g = new Group(0, 0, 100, 100);
    let a = new FilledRect(20, 20, 60, 30, 'orange');
    let b = new OutlineRect(30, 30, 120, 30, 'black', 5);
    let e = new Ellipse(0, 0, 40, 40, 'blue');

    this.addChild(g);

    g.addChildren(a, b, e);

    this.redraw();
  }

  clear(rect) {
    this.context.clearRect(
      rect.x, rect.y,
      rect.width, rect.height
    );
  }

  redraw() {

    let savedClipRect = this.savedClipRect;
    console.log("redrawing");

    if (savedClipRect !== null) {
      this.clear(savedClipRect);
      this.children.forEach(gobj => {
        const r = gobj.getBoundingBox();
        if (r.intersects(savedClipRect)) {
          gobj.draw(this.context, savedClipRect);
        }
      });
      savedClipRect = null;
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
