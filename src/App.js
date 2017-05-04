import React, { Component } from 'react';
import './App.css';

import HW2 from './default/HW2';
import HW3 from './default/HW3';
import HW4A from './default/HW4A';
import HW4B from './default/HW4B';

class App extends Component {

  constructor() {

    super();

    this.state = {
      view: "HW4B"
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle(e) {
    this.setState({
      view: e.target.value
    });
  }

  render() {

    const menuStyle = {
      position: 'absolute',
      right: 0,
      padding: '20px 20px 0'
    };

    const buttonStyle = {
      border: 0,
      borderRadius: 4,
      display: 'block',
      marginBottom: '0.5em',
      padding: '0.25em 1em',
      outline: 0,
      fontSize: 16
    };

    const views = {
      HW2: <HW2 width="1000" height="700" />,
      HW3: <HW3 width="1000" height="700" />,
      HW4A: <HW4A width="1000" height="700" />,
      HW4B: <HW4B width="1000" height="700" />,
    };

    let button = (value) => {
      let style = Object.assign({}, buttonStyle, {
        background: this.state.view === value ? 'rgb(0, 200, 255)' : 'rgb(200, 200, 200)'
      });
      return <button value={value} onClick={this.toggle} style={style}>{value}</button>;
    };

    return (
      <div>
        <div style={menuStyle}>
          {button("HW2")}
          {button("HW3")}
          {button("HW4A")}
          {button("HW4B")}
        </div>
        {views[this.state.view]}
      </div>
    );
  }
}

export default App;
