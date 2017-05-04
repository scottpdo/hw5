import FilledRect from '../FilledRect';

class Node extends FilledRect {

  constructor(x, y) {
    super(x, y, 40, 20, 'red');
    this._connectorsIn = [];
    this._connectorsOut = [];
  }

  addConnector(c, dir) {
    if (dir === 'in') {
      this._connectorsIn.push(c);
    } else if (dir === 'out') {
      this._connectorsOut.push(c);
    }
  }

  getConnectors(dir) {
    return dir === 'in' ? this._connectorsIn : this._connectorsOut;
  }

  deleteConnectors(dir) {
    this.getConnectors(dir).forEach((c) => {
      c.group().removeChild(c);
    });
  }
}

export default Node;
