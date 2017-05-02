import { isNil } from 'lodash';

class Behavior {

  constructor() {

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
  }

  state(value) {
    if (isNil(value)) return this._state;
    this._state = value;
  }

  startEvent(e) {
    if (isNil(e)) return this._start;
    this._start = e;
  }

  stopEvent(e) {
    if (isNil(e)) return this._stop;
    this._stop = e;
  }

  cancelKey(key) {
    if (isNil(key)) return this._cancelKey;
    this._cancelKey = key;
  }

  active(value) {
    if (isNil(value)) return this._active;
    this._active = value;
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
