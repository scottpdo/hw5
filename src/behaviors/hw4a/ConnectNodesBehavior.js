import NewConnectorBehavior from './NewConnectorBehavior';

import Node from '../../objects/hw4a/Node';

import ConnectorConstraint from '../../constraints/ConnectorConstraint';

import { isNil } from 'lodash';

class ConnectNodesBehavior extends NewConnectorBehavior {

  //@Override
  start(e) {

    const g = this.group();
		if (isNil(g) || !this.active()) return;

    const bb = g.getBoundingBox();

		let x = e.x - bb.x;
		let y = e.y - bb.y;

    // are we on the right side of a node?
		for (let i = 0; i < g.children().length; i++) {

			const c = g.children(i);
			if (!(c instanceof Node)) continue;

      const cbb = c.getBoundingBox();

			const conditions = y >= cbb.y && y <= cbb.y + cbb.height;

			const fromLeft = Math.abs(x - cbb.x - cbb.width) < 15;
			const fromRight = Math.abs(x - cbb.x) < 15;

			if (conditions && (fromLeft || fromRight)) {

				y = cbb.y + cbb.height / 2;

				this.pivot(fromLeft ? 'left' : 'right');
				x = cbb.x + (fromLeft ? cbb.width : 0);

				// stick to right side of node
				const r = this.make(x, y, x, y);

				if (fromLeft) {
					r.left(c);
				} else if (fromRight) {
					r.right(c);
				}

				new ConnectorConstraint(c, r);

				g.addChild(r);
				this._activeObject = r;
				this.state(true);

				// found one
				break;
			}
		}

    this.windowgroup.redraw();
  }

  running(e) {
    if (e.keyCode === this.cancelKey()) return this.cancel(e);

    const g = this.group();
    if (isNil(g) || !this.active()) return;

    const bb = g.getBoundingBox();

    const x = e.x - bb.x;
    const y = e.y - bb.y;

    // if no pivot, assume dummyLeft is fixed
    if (isNil(this._whichMoving)) this._whichMoving = this._dummyRight;
    this._whichMoving.moveTo(x, y);

    this._activeObject.maintain();

    this.windowgroup.redraw();
  }

  //@Override
  stop(e) {
    if (e.keyCode === this.cancelKey()) return this.cancel(e);

    const g = this.group();
    if (isNil(g) || !this.active()) return;

    const bb = g.getBoundingBox();

    let x = e.x - bb.x;
    let y = e.y - bb.y;

    // are we on the opposite side of a node?
		// (i.e. only right to left or left to right)
		for (let i = 0; i < g.children().length; i++) {

			const c = g.children(i);
			if (!(c instanceof Node)) continue;

      const cbb = c.getBoundingBox();

			// don't double connect two Nodes
			const fromNode = this.pivot() === 'left' ?
					this._activeObject.left() :
					this._activeObject.right();
			if (this.areNodesConnected(fromNode, c)) continue;

			const conditions = y >= c.y() && y <= c.y() + c.height();

			const toLeft = (
				this.pivot() === 'right' &&
				Math.abs(x - c.x() - c.width()) < 15
			);
			const toRight = (
				this.pivot() === 'left' &&
				Math.abs(x - c.x()) < 15
			);

			if (conditions && (toLeft || toRight)) {

				x = cbb.x + (toLeft ? cbb.width : 0);
				y = cbb.y + cbb.height / 2;

				// stick to that side of node
				if (toRight) {
					this._activeObject.right(c);
				} else {
					this._activeObject.left(c);
				}
				this._activeObject.maintain();

				new ConnectorConstraint(c, this._activeObject);

				this._activeObject = null;
				this.state(false);

        this.windowgroup.redraw();

				// found one
				return;
			}
		}

		// if we didn't find one, kill it
		this.cancel(e);
  }

  /**
	 * Given two Nodes, tell whether they are connected
	 * (by a single Connector).
	 * @param fromNode
	 * @param toNode
	 * @return
	 */
	areNodesConnected(fromNode, toNode) {

		let dir = 'in';

		for (let i = 0; i < fromNode.getConnectors(dir).length; i++) {
			if (fromNode.getConnectors(dir)[i].left() === toNode) return true;
		}

		dir = 'out';

		for (let i = 0; i < fromNode.getConnectors(dir).length; i++) {
			if (fromNode.getConnectors(dir)[i].right() === toNode) return true;
		}

		return false;
	}
}

export default ConnectNodesBehavior;
