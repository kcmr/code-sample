import { LitElement, html, css } from 'lit-element';
import { FlattenedNodesObserver } from '@polymer/polymer/lib/utils/flattened-nodes-observer.js';
import { cacheElementsWithId, cleanIndentation, entitize } from './utils.js';

/**
 * `<code-sample>` uses [highlight.js](https://highlightjs.org/) for syntax highlighting.
 * @extends {LitElement}
 */
export class CodeSample extends LitElement {
  static get properties() {
    return {
      /**
       * Show a copy to clipboard button
       */
      copyToClipboardButton: {
        type: Boolean,
        attribute: 'copy-to-clipboard-button'
      },

      /**
       * Tagged template literal with custom theme
       */
      theme: {
        type: String
      },

      /**
       * Render the code inside the template
       */
      renderCode: {
        type: Boolean,
        attribute: 'render-code'
      },

      /**
       * Language (optional). (Eg.: html, js, css)
       * Options are the same as the available classes for `<code>` tag using highlight.js
       */
      type: {
        type: String
      }
    };
  }

  static get styles() {
    return css`
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

      /* Original highlight.js style (c) Ivan Sagalaev <maniac@softwaremaniacs.org> */

      .hljs {
        display: block;
        overflow-x: auto;
        background: var(--code-sample-background, #F0F0F0);
      }


      /* Base color: saturation 0; */

      .hljs,
      .hljs-subst {
        color: var(--code-sample-color, #444);
      }

      .hljs-comment {
        color: #888888;
      }

      .hljs-keyword,
      .hljs-attribute,
      .hljs-selector-tag,
      .hljs-meta-keyword,
      .hljs-doctag,
      .hljs-name {
        font-weight: bold;
      }


      /* User color: hue: 0 */

      .hljs-type,
      .hljs-string,
      .hljs-number,
      .hljs-selector-id,
      .hljs-selector-class,
      .hljs-quote,
      .hljs-template-tag,
      .hljs-deletion {
        color: #880000;
      }

      .hljs-title,
      .hljs-section {
        color: #880000;
        font-weight: bold;
      }

      .hljs-regexp,
      .hljs-symbol,
      .hljs-variable,
      .hljs-template-variable,
      .hljs-link,
      .hljs-selector-attr,
      .hljs-selector-pseudo {
        color: #BC6060;
      }


      /* Language color: hue: 90; */

      .hljs-literal {
        color: #78A960;
      }

      .hljs-built_in,
      .hljs-bullet,
      .hljs-code,
      .hljs-addition {
        color: #397300;
      }


      /* Meta color: hue: 200 */

      .hljs-meta {
        color: #1f7199;
      }

      .hljs-meta-string {
        color: #4d99bf;
      }


      /* Misc effects */

      .hljs-emphasis {
        font-style: italic;
      }

      .hljs-strong {
        font-weight: bold;
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();

    setTimeout(() => {
      this.$ = cacheElementsWithId(this);
      this._init();
    });
  }

  _init() {
    if (this.querySelector('template')) {
      this._observer = new FlattenedNodesObserver(this.$.content, () => this._updateContent());
    } else if (this.childNodes.length) {
      console.error('<code-sample>:', 'content must be provided inside a <template> tag');
    }
  }

  _updateContent() {
    if (this._code) this._code.parentNode.removeChild(this._code);
    if (this._demo) this.$.demo.innerHTML = '';

    const template = this._getCodeTemplate();

    if (this.renderCode) {
      this._demo = this.$.demo.appendChild(
        document.importNode(template.content, true)
      );
    }

    this._highlight(template.innerHTML);
  }

  _getCodeTemplate() {
    const nodes = FlattenedNodesObserver.getFlattenedNodes(this.$.content);
    return [].filter.call(nodes, (node) => node.nodeType === Node.ELEMENT_NODE)[0];
  }

  _highlight(str) {
    this._code = document.createElement('code');
    if (this.type) this._code.classList.add(this.type);
    this._code.innerHTML = entitize(cleanIndentation(str));
    this.$.code.appendChild(this._code);

    if (window.hljs) {
      hljs.highlightBlock(this._code);
    } else {
      console.error('hljs not available in window');
    }
  }

  _copyToClipboard(event) {
    const copyButton = event.target;

    const textarea = this._textAreaWithClonedContent();
    textarea.select();

    try {
      document.execCommand('copy', false);
      copyButton.textContent = 'Done';
    } catch (err) {
      console.error(err);
      copyButton.textContent = 'Error';
    }

    textarea.remove();

    setTimeout(() => {
      copyButton.textContent = 'Copy';
    }, 1000);
  }

  _textAreaWithClonedContent() {
    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    textarea.value = cleanIndentation(this._getCodeTemplate().innerHTML);

    return textarea;
  }

  render() {
    return html`
      <div id="demo" class="demo"></div>
      <slot id="content"></slot>

      <div id="code-container">
        <button
          type="button"
          ?hidden="${!this.copyClipboardButton}"
          id="copyButton"
          title="Copy to clipboard"
          @click="${this._copyToClipboard}">Copy</button>
        <pre id="code"></pre>
      </div>
    `;
  }
}
