import { LitElement, html, css } from 'lit-element';

const themes = [
  'one-dark',
  'one-light',
  'kustom-dark',
  'kustom-light',
  'solarized-dark',
  'solarized-light',
  'github',
  'original',
];

class ThemeSelector extends LitElement {
  static get properties() {
    return {
      target: { type: String }
    }
  }

  static get styles() {
    return css`
      .select {
        display: flex;
        align-items: center;
        margin-right: 8px;
        font-size: 14px;
      }

      .select span {
         margin-right: 8px;
      }

      .select select {
        font: inherit;
      }
    `;
  }

  render() {
    return html`
      <label class="select">
        <span>Theme</span>
        <select name="theme" @change="${this._onChange}">
          ${themes.map((theme, index) => html`
            <option ?selected="${index === 0}">${theme}</option>
          `)}
        </select>
      </label>
    `
  }

  _onChange(event) {
    document.querySelector(this.target).theme = event.target.value;
  }
}

customElements.define('theme-selector', ThemeSelector);
