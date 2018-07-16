# &lt;code-sample&gt;
[![Build Status](https://img.shields.io/travis/kcmr/code-sample/master.svg?style=flat-square)](https://travis-ci.org/kcmr/code-sample) 
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg?style=flat-square)](https://www.webcomponents.org/element/@kuscamara/code-sample)
[![npm version](https://badge.fury.io/js/%40kuscamara%2Fcode-sample.svg)](https://badge.fury.io/js/%40kuscamara%2Fcode-sample)
![Polymer 3](https://img.shields.io/badge/Polymer-3-green.svg)

> A wrapper element for [highlight.js](https://highlightjs.org/)

A themeable sample code snippet that uses [highlight.js](https://highlightjs.org/) for syntax highlighting.   
Forget to worry about spaces, indentation, HTML entities, etc.

```html
<code-sample>
  <template>
    <div class="some-class">
      <p>Lorem ipsum dolor…</p>
    </div>
  </template>
</code-sample>
```

## Installation

1. Install the component using Npm:
  ```bash
  $ npm i -S @kuscamara/code-sample
  ```
2. Import Web Components loader (optional):
  ```html
  <script src="node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>
  ```
3. Import the component:
  ```html
  <script type="module" src="node_modules/@kuscamara/code-sample/code-sample.js"></script>
  ```

## Usage

The code to highlight must be provided inside a `<template>` tag.

```html
<code-sample>
  <template>
    <p>your code here...</p>
  </template>
</code-sample>
```

### Used inside a custom element

When **used inside a custom element** you'll need to add the attribute `preserve-content` to the inner template to prevent Polymer to process the template's content.

```html
<code-sample>
  <template preserve-content>
    <p>your code here...</p>
  </template>
</code-sample>
```

### Used inside a tagged template literal

When **used inside a tagged template literal** (Polymer or LitElement html function), you should escape any template string (`${expression}`) to prevent it from being evaluated getting an error.

```js
class SomeElement extends PolymerElement {
  static get template() {
    return html`
      <code-sample type="js">
        <template preserve-content>
          export class Example extends ExampleBase {
            static get template() {
              return html\`
                <p>\${super.template}</p>
              \`;
            }
          }
        </template>
      </code-sample>
    `;
  }
}
```

### Render the code inside the template

To render the code inside the template, use the boolean attribute `render`.

```html
<code-sample render>
  <template>
    <my-custom-element></my-custom-element>
  </template>
</code-sample>
```

### Copy to clipboard

To display a **copy to clipboard** button, use the boolean attribute `copy-clipboard-button`:

```html
<code-sample copy-clipboard-button>
  <template>
    <p>your code here...</p>
  </template>
</code-sample>
```

### Language types

The `type` attribute specifies the language of the sample code (eg.: html, css, js) and is not needed most of the time because it's automatically set. You can use it when your code sample language is not properly detected.

```html
<code-sample type="css">
  <template>
    .some-class {
      @apply --my-mixin;
    }
  </template>
</code-sample>
```

**Exception**: for the case of **tagged template literals**, you may need to set the `type` attribute to **js**, **jsx** or **javascript** to prevent the code being formatted as HTML.

```html
<code-sample type="js">
  <template>
    class MyElement extends PolymerElement {
      static get template() {
        return html`
          <style>
            :host {
              display: block;
            }
          </style>
          <p>Hello world!</p>
        `;
      }
    }
  </template>
</code-sample>
```

## Themes

The component includes 8 themes. One Dark is imported as the default theme.
To use another theme, import it and set as the `theme` property.

Example:

```html
<script type="module">
  import { oneLight } from '../node_modules/@kuscamara/code-sample/theme/atom-one-light.js';
  document.querySelector('code-sample').theme = oneLight;
</script>
```

### Available themes

- atom-one-ligth.js as `oneLight`
- default.js as `defaultTheme`
- github.js as `github`
- one-dark.js as `oneDark`
- solarized-dark.js as `solarizedDark`
- solarized-light.js as `solarizedLight`
- kustom-light.js as `kustomLight`
- kustom-dark.js as `kustomDark`

### More themes

You can use your own theme by adding one of the [available themes](https://github.com/isagalaev/highlight.js/tree/master/src/styles) for hightlight.js in a shared style.
The shared style should be exported as a tagged template literal.

Example:

```js
import { html } from '../../../@polymer/lit-element/lit-element.js';

export const myOwnTheme = html`
<style>
/* your own styles */
</style>`;
```

### Languages included in the highlightjs pack included with the component:

- CSS
- HTTP
- JavaScript
- Bash
- CoffeScript
- JSON
- Markdown
- HTML, XML

highlightjs version: v9.12.0

### Styling

The following custom CSS properties are available for styling:

|              Custom property              |                                      Description                                      |                               Default                                |
| :---------------------------------------- | :------------------------------------------------------------------------------------ | :------------------------------------------------------------------- |
| --code-sample-font-family                 | font-family applied to `<pre>` and `<code>` elements                                  | Operator Mono, Inconsolata, Roboto Mono, monaco, consolas, monospace |
| --code-sample-font-size                   | font-size applied to `<pre>` and `<code>` elements                                    | 14px                                                                 |
| --code-sample-demo-padding                | padding applied to the container of the rendered code                                 | 0 0 20px                                                             |
| --code-sample-demo                        | empty mixin applied to the container of the rendered code                             | {}                                                                   |
| --code-sample-code-container              | empty mixin applied to code container                                                 | {}                                                                   |
| --code-sample-code-container-hover        | empty mixin applied to code container on :hover                                       | {}                                                                   |
| --code-sample-code-container-hover-button | empty mixin applied to the copy to clipboard button when the code container on :hover | {}                                                                   |
| --code-sample-copy-clipboard-button       | empty mixin applied to the copy to clipboard button                                   | {}                                                                   |

Included themes contain custom CSS properties to set the background and text color.   
You may need to add these CSS properties to your own themes.

| Custom property                | Description                             | Default     |
|:-------------------------------|:----------------------------------------|:------------|
| --code-sample-background       | code background color                   | Depends on the theme         |
| --code-sample-color            | code text color                         | Depends on the theme         |



