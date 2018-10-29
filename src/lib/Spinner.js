'use strict';

import * as Polygon from './Polygon'
import * as rebound from './rebound'
console.log('Polygon');
console.log(Polygon);
console.log('rebound');
console.log(rebound);

/**
 * Spinner.
 * Create a canvas element, append it to the body, render polygon with
 * inscribed children, provide init and complete methods to control spinner.
 */
export class Spinner {

  constructor(params) {

    let id = params.id,
        radius = params.radius,
        sides = params.sides,
        depth = params.depth,
        colors = params.colors,
        alwaysForward = params.alwaysForward,
        restAt = params.restAt,
        renderBase = params.renderBase;

    if (sides < 3) {
      console.warn('At least 3 sides required.');
      sides = 3;
    }

    this._canvas = document.createElement('canvas');
    this._canvas.style.backgroundColor = colors.background;

    this._canvasW = null;
    this._canvasH = null;
    this._canvasOpacity = 1;

    this._centerX = null;
    this._centerY = null;

    this._alwaysForward = alwaysForward;
    this._restThreshold = restAt;
    this._renderBase = renderBase;

    this._springRangeLow = 0;
    this._springRangeHigh = this._restThreshold || 1;

    // Instantiate basePolygon.
    this._basePolygon = new Polygon.Polygon(radius, sides, depth, colors);

    this._progress = 0;

    this._isAutoSpin = null;
    this._isCompleting = null;
  }

  /**
   * Init spinner.
   */
  init(spring, autoSpin) {

    this._addCanvas();

    this._spring = spring;
    this._addSpringListener();

    this._isAutoSpin = autoSpin;

    if (autoSpin) {
      // Start auto spin.
      this._spin();
    } else {
      // Render first frame only.
      this._spring.setEndValue(0);
      this.render();
    }
  }

  _addCanvas() {
    document.body.appendChild(this._canvas);
    this._context = this._canvas.getContext('2d');
    this._setCanvasSize();
  }

  _setCanvasSize() {
    this._canvasW = this._canvas.width = window.innerWidth;
    this._canvasH = this._canvas.height = window.innerHeight;

    this._canvas.style.position = 'fixed';
    this._canvas.style.top = 0;
    this._canvas.style.left = 0;

    this._centerX = this._canvasW / 2;
    this._centerY = this._canvasH / 2;
  }

  _addSpringListener() {

    let ctx = this;

    // Add a listener to the spring. Every time the physics
    // solver updates the Spring's value onSpringUpdate will
    // be called.
    this._spring.addListener({
      onSpringUpdate(spring) {

        let val = spring.getCurrentValue();

            // Input range in the `from` parameters.
        let fromLow = 0,
            fromHigh = 1,
            // Property animation range in the `to` parameters.
            toLow = ctx._springRangeLow,
            toHigh = ctx._springRangeHigh;

        val = rebound.default.MathUtil.mapValueInRange(val, fromLow, fromHigh, toLow, toHigh);

        // Note that the render method is
        // called with the spring motion value.
        ctx.render(val);
      }
    });
  }

  /**
   * Start complete animation.
   */
  setComplete() {
    this._isCompleting = true;
  }

  _completeAnimation() {

    // Fade out the canvas.
    this._canvasOpacity -= 0.1;
    this._canvas.style.opacity = this._canvasOpacity;

    // Stop animation and remove canvas.
    if (this._canvasOpacity <= 0) {
      this._isAutoSpin = false;
      this._spring.setAtRest();
      this._canvas.remove();
    }
  }

  /**
   * Spin animation.
   */
  _spin() {

    if (this._alwaysForward) {

      let currentValue = this._spring.getCurrentValue();

      // Switch the animation range used to compute the value
      // in the `onSpringUpdate`, so to change the reverse animation
      // of the spring at a certain threshold.
      if (this._restThreshold && currentValue === 1) {
        this._switchSpringRange();
      }

      // In order to keep the motion going forward
      // when spring reach 1 reset to 0 at rest.
      if (currentValue === 1) {
        this._spring.setCurrentValue(0).setAtRest();
      }
    }

    // Restart the spinner.
    this._spring.setEndValue((this._spring.getCurrentValue() === 1) ? 0 : 1);
  }

  _switchSpringRange() {

    let threshold = this._restThreshold;

    this._springRangeLow = (this._springRangeLow === threshold) ? 0 : threshold;
    this._springRangeHigh = (this._springRangeHigh === threshold) ? 1 : threshold;
  }

  /**
   * Render.
   */
  render(progress) {

    // Update progess if present and round to 4th decimal.
    if (progress) {
      this._progress = Math.round(progress * 10000) / 10000;
    }

    // Restart the spin.
    if (this._isAutoSpin && this._spring.isAtRest()) {
      this._spin();
    }

    // Complete the animation.
    if (this._isCompleting) {
      this._completeAnimation();
    }

    // Clear canvas and save context.
    this._context.clearRect(0, 0, this._canvasW, this._canvasH);
    this._context.save();

    // Move to center.
    this._context.translate(this._centerX, this._centerY);

    this._context.lineWidth = 1.5;

    // Render basePolygon.
    if (this._renderBase) {
      this._basePolygon.render(this._context);
    }

    // Render inscribed polygons.
    this._basePolygon.renderChildren(this._context, this._progress);

    this._context.restore();
  }
}
