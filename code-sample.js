import { LitElement, html } from '../../@polymer/lit-element/lit-element.js';
import { FlattenedNodesObserver } from '../../@polymer/polymer/lib/utils/flattened-nodes-observer.js';
import { styles } from './styles.js';
import { oneDark } from './themes/one-dark.js';
import './highlight-import.js';

/* global hljs */

/**
 * `<code-sample>` uses [highlight.js](https://highlightjs.org/) for syntax highlighting.
 *
 * @customElement
 * @polymer
 * @demo https://kcmr.github.io/code-sample/
 */
class CodeSample extends LitElement {
  _render({copyClipboardButton}) {
    return html`
      ${styles}
      ${this.theme || oneDark}
      <div id="demo" class="demo"></div>

      <slot id="content"></slot>

      <div id="code-container">
        <button id="copy-button"
          hidden?="${!copyClipboardButton}"
          title="Copy to clipboard"
          on-click="${() => this._copyToClipboard()}">Copy</button>
        <pre id="code"></pre>
      </div>
    `;
  }

  _firstRendered() {
    this.$_content = this.shadowRoot.querySelector('#content');
    this.$_code = this.shadowRoot.querySelector('#code');
    this.$_copyButton = this.shadowRoot.querySelector('#copy-button');
    this.$_demo = this.shadowRoot.querySelector('#demo');
  }

  static get properties() {
    return {
      // Set to true to show a copy to clipboard button.
      copyClipboardButton: Boolean,
      // Tagged template literal with custom styles.
      theme: String,
      // Set to true to render the code inside the template.
      render: Boolean,
      // Code type (optional). (eg.: html, js, css)
      // Options are the same as the available classes for `<code>` tag using highlight.js
      type: String,
    };
  }

  static get observedAttributes() {
    return [
      'copy-clipboard-button',
      'render',
      'type',
      'theme',
    ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const propName = this._camelCaseAttr(name);
    this[propName] = (this.constructor.properties[propName] === Boolean)
      ? this.hasAttribute(name)
      : newValue;
  }

  _camelCaseAttr(value) {
    return value.replace(/-./g,
      (match) => match.charAt(1).toUpperCase()
    );
  }

  connectedCallback() {
    super.connectedCallback();
    setTimeout(() => {
      if (this.querySelector('template')) {
        this._observer = new FlattenedNodesObserver(this.$_content, () => this._updateContent());
      } else if (this.childNodes.length) {
        console.error('<code-sample>:', 'content must be provided inside a <template> tag');
      }
    }, 1);
  }

  disconnectedCallback() {
    if (this._observer) {
      this._observer.disconnect();
      this._observer = null;
    }
  }

  _updateContent() {
    if (this._code) {
      this._code.parentNode.removeChild(this._code);
    }

    if (this._demo) {
      this.$.demo.innerHTML = '';
    }

    const template = this._getCodeTemplate();

    if (this.render) {
      this._demo = this.$_demo.appendChild(document.importNode(template.content, true));
    }

    this._highlight(template.innerHTML);
  }

  _highlight(str) {
    this._code = document.createElement('code');
    if (this.type) {
      this._code.classList.add(this.type);
    }
    this._code.innerHTML = this._entitize(this._cleanIndentation(str));
    this.$_code.appendChild(this._code);
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
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  _getCodeTemplate() {
    const nodes = FlattenedNodesObserver.getFlattenedNodes(this.$_content);
    return [].filter.call(nodes, (node) => node.nodeType === Node.ELEMENT_NODE)[0];
  }

  _copyToClipboard() {
    const tempNode = document.createElement('textarea');
    document.body.appendChild(tempNode);
    tempNode.value = this._cleanIndentation(this._getCodeTemplate().innerHTML);
    tempNode.select();

    let result = false;

    const copyButton = this.shadowRoot.querySelector('#copy-button');

    try {
      result = document.execCommand('copy', false);
      copyButton.textContent = 'Done';
    } catch (err) {
      // Copy command is not available
      console.error(err);
      copyButton.textContent = 'Error';
    }

    tempNode.remove();

    // Return to the copy button after a second.
    setTimeout(this._resetCopyButtonState.bind(this), 1000);

    return result;
  }

  _resetCopyButtonState() {
    this.$_copyButton.textContent = 'Copy';
  }
}

customElements.define('code-sample', CodeSample);
