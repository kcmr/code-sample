import { html } from '../../@polymer/lit-element/lit-element.js';

export const styles = html`
<style>
  :host {
    display: block;
  }

  :host([hidden]),
  [hidden] {
    display: none;
  }

  pre {
    margin: 0;
  }

  pre, code {
    font-family: var(--code-sample-font-family, Operator Mono, Inconsolata, Roboto Mono, monaco, consolas, monospace);
    font-size: var(--code-sample-font-size, 14px);
  }

  .hljs {
    padding: 0 20px;
    line-height: 1.3;
  }

  .demo:not(:empty) {
    padding: var(--code-sample-demo-padding, 0 0 20px);
  }

  .demo {
    @apply --code-sample-demo;
  }

  #code-container {
    position: relative;
    @apply --code-sample-code-container;
  }

  #code-container:hover {
    @apply --code-sample-code-container-hover;
  }

  #code-container:hover > button {
    @apply --code-sample-code-container-hover-button;
  }

  button {
    background: #e0e0e0;
    border: none;
    cursor: pointer;
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    text-transform: uppercase;
    @apply --code-sample-copy-clipboard-button;
  }
</style>
`;
