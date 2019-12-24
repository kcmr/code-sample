import { Base, html, css, unsafeCSS } from './base.js';
import { FlattenedNodesObserver } from '@polymer/polymer/lib/utils/flattened-nodes-observer.js';
import { cleanIndentation, entitize } from './utils.js';
import { base as style, themes } from './styles.js';

const DEFAULT_THEME = 'one-dark';
const getTheme = (theme = DEFAULT_THEME) => themes[theme];

/**
 * Custom Element class definition that uses [highlight.js](https://highlightjs.org/) for syntax highlighting.
 * @extends {LitElement}
 */
export class Component extends Base {
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

      /**
       * Path of a custom CSS file
       */
      stylesheet: {
        type: String,
      },

      _renderedCode: {
        type: String
      },

      _copyButtonText: {
        type: String
      }
    };
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
        this._updateContent.bind(this)
      );
    } else if (this.childNodes.length) {
      this.log.error('code must be provided inside a <template> tag');
    }
  }

  _updateContent() {
    this._setRenderedCode();

    if (this.renderCode) {
      this._setDemo();
    }
  }

  _setRenderedCode() {
    this._renderedCode = entitize(this._getTemplateContent());
  }

  _getTemplateContent() {
    this._template = this.querySelector('template');
    return cleanIndentation(this._template.innerHTML);
  }

  _setDemo() {
    this.$.demo.innerHTML = '';
    this.$.demo.appendChild(
      document.importNode(this._template.content, true)
    );
  }

  _highlight() {
    if (window.hljs) {
      hljs.highlightBlock(this.$.code);
    } else {
      this.log.error('hljs() function from highlight.js is not available in window');
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

  static get styles() {
    return css`${style}`;
  }

  get _theme() {
    return css`${unsafeCSS(getTheme(this.theme))}`;
  }

  render() {
    return html`
      <style>${this._theme}</style>

      ${this.stylesheet ? html`
        <link rel="stylesheet" href="${this.stylesheet}">` : ''
      }

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
