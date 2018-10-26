import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as demo from './lib/demo.js'
import styles from './styles.css'

export default class ExampleComponent extends Component {
  static propTypes = {
    text: PropTypes.string
  }
  
  constructor(props) {
    super(props);

    this.init = this.init.bind(this);
  }

  init = () => {
    console.log('init!!');
    console.log(demo);
    demo.demo.init();
  }

  render() {
    const {
      text
    } = this.props

    return (
      <div className={styles.test}>
        {/* Example Component: {text} */}
        <div class="content">
          <button class="button button--trigger" onClick={ this.init}>Show Loader</button>
        </div>
      </div>
    )
  }
}
