import React, { Component } from "react";
import SpringLoader from "react-spring-loaders";

const settings = {
  rebound: {
    tension: 14,
    friction: 10
  },
  spinner: {
    id: "spinner",
    radius: 90,
    sides: 6,
    depth: 8,
    colors: {
      background: "#00272C",
      stroke: null,
      base: null,
      child: "#02C39A"
    },
    alwaysForward: true, // When false the spring will reverse normally.
    restAt: null, // A number from 0.1 to 0.9 || null for full rotation
    renderBase: false
  }
};

export default class App extends Component {
  render() {
    return (
      <div>
        <SpringLoader settings={settings} />
        {/* Default Settings 
        <SpringLoader /> */}
      </div>
    );
  }
}
