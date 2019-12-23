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
       * @default undefined
       */
      copyClipboardButton: {
        type: Boolean,
        attribute: 'copy-clipboard-button'
      },

      /**
       * Text of the copy to clipboard button
       * @default 'Copy'
       */
      copyButtonText: {
        type: String,
        attribute: 'copy-button-text'
      },

      /**
       * Text of the copy to clipboard button after success copy
       * @default 'Copied!'
       */
      copyButtonTextSuccess: {
        type: String,
        attribute: 'copy-button-text-success'
      },

      /**
       * Text of the copy to clipboard button after error copying
       * @default 'Error'
       */
      copyButtonTextError: {
        type: String,
        attribute: 'copy-button-text-error'
      },

      /**
       * Title of the copy to clipboard button
       * @default 'Copy to clipboard'
       */
      copyButtonTitle: {
        type: String,
        attribute: 'copy-button-title'
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
      language: {
        type: String
      },

      _renderedCode: {
        type: String
      },

      _copyButtonText: {
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

  constructor() {
    super();
    this.language = '';
    this.copyButtonText = 'Copy';
    this.copyButtonTextSuccess = 'Copied!';
    this.copyButtonTextError = 'Error';
    this.copyButtonTitle = 'Copy to clipboard';
    this._copyButtonText = this.copyButtonText;
  }

  connectedCallback() {
    super.connectedCallback();

    setTimeout(() => {
      this.$ = cacheElementsWithId(this);
      this._getCodeInsideTemplate();
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    if (this._observer) {
      this._observer.disconnect();
      this._observer = null;
    }
  }

  updated(changedProperties) {
    if (changedProperties.has('_renderedCode')) {
      this._highlight();
    }
  }

  _getCodeInsideTemplate() {
    const template = this.querySelector('template');

    if (template) {
      this._observer = new FlattenedNodesObserver(
        this.$.content,
        this._setRenderedCode.bind(this)
      );
    } else if (this.childNodes.length) {
      console.error('<code-sample>:', 'content must be provided inside a <template> tag');
    }
  }

  _setRenderedCode() {
    this._renderedCode = entitize(this._getTemplateContent());
  }

  _getTemplateContent() {
    const template = this.querySelector('template');
    return cleanIndentation(template.innerHTML);
  }

  _highlight() {
    if (window.hljs) {
      hljs.highlightBlock(this.$.code);
    } else {
      console.error('hljs not available in window');
    }
  }

  _copyToClipboard() {
    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    textarea.value = this._getTemplateContent();
    textarea.select();

    try {
      document.execCommand('copy', false);
      this._copyButtonText = this.copyButtonTextSuccess;
    } catch (err) {
      console.error(err);
      this._copyButtonText = this.copyButtonTextError;
    } finally {
      textarea.remove();
      setTimeout(() => {
        this._copyButtonText = this.copyButtonText;
      }, 1000);
    }
  }

  render() {
    return html`
      <div id="demo" class="demo"></div>
      <slot id="content"></slot>

      <div id="code-container">
        <button
          type="button"
          ?hidden="${!this.copyClipboardButton}"
          title="${this.copyButtonTitle}"
          @click="${this._copyToClipboard}">${this._copyButtonText}</button>

        <pre><code
          id="code"
          class="${this.language}"
          .innerHTML="${this._renderedCode}"
        ></code></pre>
      </div>
    `;
  }
}
