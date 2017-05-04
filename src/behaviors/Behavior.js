import { isNil } from 'lodash';

class Behavior {

  constructor(windowgroup) {

    if (isNil(windowgroup)) throw new Error("Behavior requires a windowgroup for drawing!");

    this.windowgroup = windowgroup;

    // state refers to if this behavior is running or not
    this._state = false;

    // an active behavior may be running or in waiting... an inactive
    // behavior will always be in waiting and will never turn on (even if
    // a start event is fired)
    this._active = true;

    this._cancelKey = 27;
  }

  group(g) {
    if (isNil(g)) return this._group;
    this._group = g;
    return this;
  }

  state(value) {
    if (isNil(value)) return this._state;
    this._state = value;
    return this;
  }

  startEvent(e) {
    if (isNil(e)) return this._start;
    this._start = e;
    return this;
  }

  stopEvent(e) {
    if (isNil(e)) return this._stop;
    this._stop = e;
    return this;
  }

  cancelKey(key) {
    if (isNil(key)) return this._cancelKey;
    this._cancelKey = key;
    return this;
  }

  active(value) {
    if (isNil(value)) return this._active;
    this._active = value;
    return this;
  }

  // to be filled in by subclasses
  start() {}
  running() {}
  stop() {}
  cancel() {}
}

Behavior.defaultStartEvent = 'mousedown';
Behavior.defaultStopEvent = 'mouseup';

export default Behavior;
