import React, { Component } from 'react';
import BoundaryRectangle from '../objects/BoundaryRectangle';

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
    this.redraw();
  }

  addEventListeners() {

    this.refs.canvas.addEventListener('mousemove', this.scanBehaviors);
    this.refs.canvas.addEventListener('mousedown', this.scanBehaviors);
    this.refs.canvas.addEventListener('mouseup', this.scanBehaviors);

    window.addEventListener('keyup', this.scanBehaviors);
  }

  componentWillUnmount() {

    this.refs.canvas.removeEventListener('mousemove', this.scanBehaviors);
    this.refs.canvas.removeEventListener('mousedown', this.scanBehaviors);
    this.refs.canvas.removeEventListener('mouseup', this.scanBehaviors);

    window.removeEventListener('keyup', this.scanBehaviors);
  }

  scanBehaviors(e) {

    this.behaviors.forEach(b => {

      // If a behavior is running...
      if (b.state()) {

        // If it should cancel or stop, then do that.
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
        gobj.draw(this.context, savedClipRect);
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
