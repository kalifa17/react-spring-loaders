import React, { Component } from "react";
import * as demo from "./lib/demo.js";

export default class SpringLoader extends Component {
  constructor(props) {
    super(props);

    this.init = this.init.bind(this);
  }

  componentDidMount() {
    demo.demo.init(this.props.settings);
  }

  init = () => {
    demo.demo.init();
  };

  render() {
    return null;
    // return (
    //   <div className={styles.test}>
    //       <button onClick={this.init}>
    //         Show Loader
    //       </button>
    //   </div>
    // );
  }
}

SpringLoader.defaultProps = {
  settings: {
    rebound: {
      tension: 2,
      friction: 5
    },
    spinner: {
      radius: 80,
      sides: 3,
      depth: 4,
      colors: {
        background: '#000000',
        stroke: '#000000',
        base: '#222222',
        child: '#FFFFFF'
      },
      alwaysForward: true, // When false the spring will reverse normally.
      restAt: 0.5, // A number from 0.1 to 0.9 || null for full rotation
      renderBase: true // Optionally render basePolygon
    }
  }
};
