import { css } from 'lit-element';
import { github } from './themes/github.js';
import { kustomLight } from './themes/kustom-light.js';
import { nightOwl } from './themes/night-owl.js';
import { ocean } from './themes/ocean.js';
import { oneDark } from './themes/one-dark.js';
import { solarizedLight } from './themes/solarized-light.js';
import { vs2015 } from './themes/vs-2015.js';

const dashCaseThemeNames = {
  'kustom-light': kustomLight,
  'one-dark': oneDark,
  'solarized-light': solarizedLight,
  'night-owl': nightOwl,
  'vs-2015': vs2015
};

export const themes = {
  github,
  ocean,
  ...dashCaseThemeNames
};

// basic component styles
export const base = css`
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
    line-height: var(--code-sample-line-height, 1.3);
  }

  .demo:not(:empty) {
    padding: var(--code-sample-demo-padding, 0 0 20px);
  }

  #code-container {
    position: relative;
  }

  button {
    background: var(--code-sample-copy-button-bg-color, #e0e0e0);
    border: none;
    cursor: pointer;
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    text-transform: uppercase;
  }
`;
