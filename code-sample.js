import { CodeSample } from './src/code-sample.js';

if (!window.customElements.get('code-sample')) {
  customElements.define('code-sample', CodeSample);
}

