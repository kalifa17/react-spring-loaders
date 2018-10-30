# Spring Loaders React Component

> Spring Loaders with Rebound and Canvas

[![NPM](https://img.shields.io/npm/v/react-spring-loaders.svg)](https://www.npmjs.com/package/react-spring-loaders) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Demo

![Demo](https://lh3.googleusercontent.com/aH293rc91KU5LtiLgOqUvqTS2fmF4Q7tfPI6umAgRZmHaNB59M9KTpNeWRzG1rghl-2xwPsIXNZgwnx2_9F3AbRDqLxWWGpHPl9U0BBa4egiqm_K1z-5UXsBVPQdpH-v_XRpGq9fbQ=w552-h440-no)

[**Live Demo**](https://kalifa17.github.io/react-spring-loaders)


## Install

```bash
npm install --save react-spring-loaders
```

## Usage

```jsx
import React, { Component } from 'react'

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
```

## License

MIT © [kalifa17](https://github.com/kalifa17)
