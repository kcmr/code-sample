import { Component } from './src/index.js';

Component.tag = 'code-sample';

if (!window.customElements.get(Component.tag)) {
  customElements.define(Component.tag, Component);
}

