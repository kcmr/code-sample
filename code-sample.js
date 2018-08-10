import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {FlattenedNodesObserver} from '@polymer/polymer/lib/utils/flattened-nodes-observer.js';
import '../../highlightjs/highlight.pack.min.js';

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
    <style include="code-sample-theme">
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
      <button hidden="[[!copyClipboardButton]]" id="copyButton" title="Copy to clipboard" on-click="_copyToClipboard">Copy</button>
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
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  _copyToClipboard() {
    const tempNode = document.createElement('textarea');
    document.body.appendChild(tempNode);
    tempNode.value = this._cleanIndentation(this._getCodeTemplate().innerHTML);
    tempNode.select();

    let result = false;

    try {
      result = document.execCommand('copy', false);
      this.$.copyButton.textContent = 'Done';
    } catch (err) {
      console.error(err);
      this.$.copyButton.textContent = 'Error';
    }

    tempNode.remove();

    // Return to the copy button after a second.
    setTimeout(this._resetCopyButtonState.bind(this), 1000);

    return result;
  }

  _resetCopyButtonState() {
    this.$.copyButton.textContent = 'Copy';
  }
}

customElements.define('code-sample', CodeSample);
