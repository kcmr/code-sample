import { LitElement } from 'lit-element';
import { cacheElementsWithId, logger } from './utils.js';
export * from 'lit-element';

export class Base extends LitElement {
  static set tag(value) {
    this._tag = value;
  }

  static get tag() {
    return this._tag;
  }

  connectedCallback() {
    super.connectedCallback();

    setTimeout(() => {
      this.$ = cacheElementsWithId(this);
      this.log = logger(this.constructor.tag);
    });
  }
}
