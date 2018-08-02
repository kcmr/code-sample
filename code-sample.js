import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { Templatizer } from '@polymer/polymer/lib/legacy/templatizer-behavior.js';
import 'highlightjs/highlight.pack.min.js';

/* global hljs */

/**
 * `<code-sample>` uses [highlight.js](https://highlightjs.org/) for syntax highlighting.
 *
 * @customElement
 * @demo https://kcmr.github.io/code-sample/
 */
class CodeSample extends PolymerElement {

  static get template() {
    return html`
      <style inlcude="[[theme]]">
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
          visibility: hidden;
          position: absolute;
          right: 0;
          top: 0;
          text-transform: uppercase;
          @apply --code-sample-copy-clipboard-button;
        }
        :host([copy-clipboard-button]) button {
          visibility: visible;
        }
      </style>
      <div id="theme"></div>
      <div id="demo" class="demo"></div>

      <slot id="content"></slot>

      <div id="code-container">
        <button id="copy-button"
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
        reflectToAttribute: true
      },
      // Tagged template literal with custom styles.
      theme: String,
      // Set to true to render the code inside the template.
      render: Boolean,
      // Code type (optional). (eg.: html, js, css)
      // Options are the same as the available classes for `<code>` tag using highlight.js
      type: String,
      // theme name
      themeName: {
        type: String,
        reflectToAttribute: true,
        observer: '_themeNameChanged',
        value: 'one-dark',
      }
    };
  }

  _toCamelCase(value) {
    return value.replace(/-./g,
      (match) => match.charAt(1).toUpperCase()
    );
  }

  _themeNameChanged(themeName) {
    let imported = null;
    switch (themeName) {
    case 'atom-one-light':
      imported = import('./themes/atom-one-light.js');
      break;
    case 'one-dark':
      imported = import('./themes/one-dark.js');
      break;
    case 'default':
      imported = import('./themes/default.js');
      break;
    case 'github':
      imported = import('./themes/github.js');
      break;
    case 'kustom-dark':
      imported = import('./themes/kustom-dark.js');
      break;
    case 'kustom-light':
      imported = import('./themes/kustom-light.js');
      break;
    case 'solarized-light':
      imported = import('./themes/solarized-light.js');
      break;
    case 'solarized-dark':
      imported = import('./themes/solarized-dark.js');
      break;
    default:
      throw 'theme not supported';
    }
    imported.then(function(res) {
      let map = {
        "atom-one-light": "atomOneLight",
        "one-dark": "oneDark",
        "default": "defaultTheme",
        "github": "github",
        "kustom-dark": "kustomDark",
        "kustom-light": "kustomLight",
        "solarized-light": "solarizedLight",
        "solarized-dark": "solarizedDark",
      };
      this.$.theme.innerHTML = res[map[themeName]].innerHTML;
    }.bind(this));
  }

  connectedCallback() {
    super.connectedCallback();
    setTimeout(() => {
      let tmp = this.querySelector('template');
      this._updateContent(tmp);
    }, 1);
  }

  _updateContent(template) {
    if (this._code) this._code.parentNode.removeChild(this._code);
    if (this._demo) this.$.demo.innerHTML = '';

    if (this.render) {
      this._demo = this.$.demo.appendChild(
        document.importNode(template, true)
      );
    }

    this._highlight(template.innerHTML);
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

  _copyToClipboard(e) {
    let target = e.target;
    const tempNode = document.createElement('textarea');
    document.body.appendChild(tempNode);
    tempNode.value = this.querySelector('template').innerHTML;
    tempNode.select();
    let result = false;
    try {
      result = document.execCommand('copy', false);
      target.innerHTML = 'Done';
    } catch (err) {
      console.error(err);
      target.innerHTML = 'Error';
    }
    tempNode.remove();
    setTimeout(function() {
      target.innerHTML = 'Copy';
    }.bind(this), 1000);

    return result;
  }
}

customElements.define('code-sample', CodeSample);
