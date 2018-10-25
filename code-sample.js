import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {FlattenedNodesObserver} from '@polymer/polymer/lib/utils/flattened-nodes-observer.js';
import {oneDark} from './themes/one-dark.js';
import './vendor/highlight/highlight.pack.js';

/**
 * `<code-sample>` uses [highlight.js](https://highlightjs.org/) for syntax highlighting.
 * @polymer
 * @customElement
 * @extends {PolymerElement}
 * @demo https://kcmr.github.io/code-sample/
 */
class CodeSample extends PolymerElement {
  static get template() {
    return html`
    ${this.constructor.theme || oneDark}
    <style include="code-sample-theme" id="baseStyle">
    :host {
      display: block;
    }

    :host([hidden]),
    [hidden] {
      display: none;
    }

    pre {
      margin: 0;
      @apply --code-sample-pre;
    }

    pre, code {
      font-family: var(--code-sample-font-family, Operator Mono, Inconsolata, Roboto Mono, monaco, consolas, monospace);
      font-size: var(--code-sample-font-size, 0.875rem);
    }

    .hljs {
      padding: 0 1.25rem;
      line-height: var(--code-sample-line-height, 1.3);
      @apply --code-sample-hljs;
    }

    .demo:not(:empty) {
      padding: var(--code-sample-demo-padding, 0 0 1.25rem);
      @apply --code-sample-demo-not-empty;
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
      background: var(--code-sample-copy-button-bg-color, #e0e0e0);
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

    <div id="demo" class="demo"></div>
    <slot id="content"></slot>

    <div id="code-container">
      <button
        type="button"
        hidden="[[!copyClipboardButton]]"
        id="copyButton"
        title="Copy to clipboard"
        on-click="_copyToClipboard">Copy</button>
      <pre id="code"></pre>
    </div>
    `;
  }

  static get properties() {
    return {
      // Set to true to show a copy to clipboard button.
      copyClipboardButton: {
        type: Boolean,
        value: false,
      },
      // Tagged template literal with custom styles.
      // Only supported in Shadow DOM.
      theme: {
        type: String,
        observer: '_themeChanged',
      },
      // Set to true to render the code inside the template.
      render: {
        type: Boolean,
        value: false,
      },
      // Code type (optional). (eg.: html, js, css)
      // Options are the same as the available classes for `<code>` tag using highlight.js
      type: {
        type: String,
      },
    };
  }

  _themeChanged(theme) {
    if (theme && this._themeCanBeChanged()) {
      const previousTheme = this.shadowRoot.querySelector('style:not(#baseStyle)');
      this.shadowRoot.replaceChild(
        document.importNode(theme.content, true),
        previousTheme
      );
    }
  }

  _themeCanBeChanged() {
    if (window.ShadyCSS) {
      console.error('<code-sample>:', 'Theme changing is not supported in Shady DOM.');
      return;
    }

    if (this.theme.tagName !== 'TEMPLATE') {
      console.error('<code-sample>:', 'theme must be a template');
      return;
    }

    return true;
  }

  connectedCallback() {
    super.connectedCallback();
    setTimeout(() => {
      if (this.querySelector('template')) {
        this._observer = new FlattenedNodesObserver(this.$.content, () => this._updateContent());
      } else if (this.childNodes.length) {
        console.error('<code-sample>:', 'content must be provided inside a <template> tag');
      }
    });
  }

  disconnectedCallback() {
    if (this._observer) {
      this._observer.disconnect();
      this._observer = null;
    }
  }

  _updateContent() {
    if (this._code) this._code.parentNode.removeChild(this._code);
    if (this._demo) this.$.demo.innerHTML = '';

    const template = this._getCodeTemplate();

    if (this.render) {
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
    this._code.innerHTML = this._entitize(this._cleanIndentation(str));
    this.$.code.appendChild(this._code);
    hljs.highlightBlock(this._code);
  }

  _cleanIndentation(str) {
    const pattern = str.match(/\s*\n[\t\s]*/);
    return str.replace(new RegExp(pattern, 'g'), '\n');
  }

  _entitize(str) {
    return String(str)
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/=""/g, '')
      .replace(/=&gt;/g, '=>')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
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
    textarea.value = this._cleanIndentation(this._getCodeTemplate().innerHTML);

    return textarea;
  }
}

customElements.define('code-sample', CodeSample);
