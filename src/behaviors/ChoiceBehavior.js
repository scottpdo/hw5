import Behavior from './Behavior';

import { isNil } from 'lodash';

class ChoiceBehavior extends Behavior {

  constructor(windowgroup, type = 'single', firstOnly = false) {
    super();
    this.startEvent(Behavior.defaultStartEvent);
    this.stopEvent(Behavior.defaultStopEvent);
    this.windowgroup = windowgroup;

    this._type = type;
    this._firstOnly = firstOnly;
  }

  getSelection() {

    const g = this.group();
		if (isNil(g)) return [];

		let selected = [];

		for (let i = 0; i < g.children().length; i++) {
			const c = g.children(i);
			if (c.selected()) selected.add(c);
		}

		return selected;
  }

  start(e) {

    console.log('starting choice b')

    let g = this.group();
		if (isNil(g) || !this.active()) return;

		let x = e.x, y = e.y;

		// iterate in reverse (paint order)
    for (let i = g.children().length - 1; i >= 0; i--) {

      const c = g.children(i);

      if (c.contains(x, y)) {

        c.interimSelected(true);
        this._initialSelected = c;
        this.state(true); // running

			} else {
        c.selected(false);
      }
    }

		// outside group bounding box, stop
		// if (!g.contains(x, y)) stop(e);
  }

  running(e) {

    const g = this.group();
		if (isNil(g)) return;

		let x = e.x;
    let y = e.y;

		for (let i = 0; i < g.children().length; i++) {

			const c = g.children(i);

			if (c.selectable() && !this._firstOnly) {
        c.interimSelected(c.contains(x, y));
      }
		}

    this.windowgroup.redraw();

  }

  stop(e) {
    if (e.keyCode === this.cancelKey()) return this.cancel(e);

		const g = this.group();
		let x = e.x;
    let y = e.y;

		if (isNil(g) || !g.contains(x, y)) return;

		for (let i = 0; i < g.children().length; i++) {

			const c = g.children(i);
      if (!c.selectable()) continue;

			c.interimSelected(false);

			// definitely not selected if firstOnly
			// and it's not the one we picked at first
			if (this._firstOnly && c !== this._initialSelected) continue;

			if (this._type === 'single') {

				// selected status = is clicking on
				c.selected(c.contains(x, y));

			} else if (this._type === 'toggle') {

				// if clicking object, toggle it
				c.selected(c.contains(x, y) && !c.selected());

			} else if (this._type === 'multiple') {

				// if clicking object, toggle it,
				// otherwise maintain current selected status
				const selected = c.contains(x, y) ? !c.selected() : c.selected();
				c.selected(selected);
			}
		}

		this._initialSelected = null;
		this.state(false);
  }

  cancel(e) {
    // Unselect everything
		const g = this.group();
		let x = e.x;
    let y = e.y;

		if (isNil(g) || !g.contains(x, y)) return;

		for (let i = 0; i < g.children().length; i++) {

			const c = g.children(i);
      if (!c.selectable()) continue;

			c.interimSelected(false);
			c.selected(false);
		}

		this._initialSelected = null;
		this.state(false);
  }
}

export default ChoiceBehavior;
