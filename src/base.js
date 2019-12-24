import { LitElement } from 'lit-element';
import { cacheElementsWithId, logger } from './utils.js';
export * from 'lit-element';

const TAG = Symbol('tag');

/**
 * Base class for Custom Elements that provides helper methods and shared properties.
 * @extends {LitElement}
 */
export class Base extends LitElement {
  static set tag(value) {
    this[TAG] = value;
  }

  static get tag() {
    return this[TAG];
  }

  connectedCallback() {
    super.connectedCallback();

    setTimeout(() => {
      this.$ = cacheElementsWithId(this);
      this.log = logger(this.constructor.tag);
    });
  }
}
