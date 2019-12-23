# &lt;code-sample&gt;
[![Build Status](https://img.shields.io/travis/kcmr/code-sample/master.svg?style=flat-square)](https://travis-ci.org/kcmr/code-sample) 
[![codecov](https://codecov.io/gh/kcmr/code-sample/branch/master/graph/badge.svg)](https://codecov.io/gh/kcmr/code-sample)
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

**Note**: Since version 4.0.0 **highlight.js is not directly imported by code-sample**. The library should be explicitly imported by the host application or web page, either [using the script for browser usage](https://www.npmjs.com/package/highlight.js/v/9.15.8#getting-the-library) or a [custom build](https://github.com/highlightjs/highlight.js/issues/712#issuecomment-271077569) with the desired / required languages.

1. Install the component using Npm:
  ```bash
  $ npm i -S @kuscamara/code-sample
  ```
2. Import Web Components loader (optional):
  ```html
  <script src="node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>
  ```
3. Import highlight.js:
```html
<script src="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.17.1/build/highlight.min.js"></script>
```
4. Import the component:
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
  import { oneLight } from '../node_modules/@kuscamara/code-sample/themes/one-light.js';
  document.querySelector('code-sample').theme = oneLight;
</script>
```

### Available themes

- one-ligth.js as `oneLight`
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
import { html } from '@polymer/polymer/polymer-element.js';

export const myOwnTheme = html`
<style>
/* your own styles */
</style>`;
```

### Themes in browsers using ShadyCSS
Due to **[ShadyCSS limitations](https://github.com/webcomponents/shadycss#dynamically-created-styles-are-not-supported)**, dynamic change of themes is **not supported in browsers that use ShadyCSS (Firefox)**. To set a different theme for these browsers, you should import your theme as a style module with `code-sample-theme` as its `id`. 

**Example:**

In `your-shared-style-file.js`:
```js
const html = (string) => string;
const $documentContainer = document.createElement('div');
$documentContainer.setAttribute('style', 'display: none;');

$documentContainer.innerHTML = html`
<dom-module id="code-sample-theme">
  <template>
    <style>
    /* your custom styles */
    </style>
  </template>
</dom-module>`;

document.head.appendChild($documentContainer);
```

Import the shared style in the main document:
```html
<head>
  <script type="module" src="your-shared-style-file.js"></script>
</head>
```

The styles will be applied to `<code-sample>` in browsers using ShadyCSS.

### Styling

The following custom CSS properties are available for styling:

| Custom Property | Description | Default |
| :-------------- | :---------- | :------ |
| --code-sample-pre | empty mixin applied to `<pre>` element | {} |
| --code-sample-font-family | font-family applied to `<pre>` and `<code>` elements | Operator Mono, Inconsolata, Roboto Mono, monaco, consolas, monospace |
| --code-sample-font-size | font-size applied to `<pre>` and `<code>` elements | 14px |
| --code-sample-line-height | line-height applied to `.hljs` | 1.3 |
| --code-sample-hljs | empty mixin applied to `.hljs` | {} |
| --code-sample-demo-padding | padding applied to the container of the rendered code | 0 0 20px |
| --code-sample-demo-not-empty | empty mixin applied to the demo container when is not empty | {} |
| --code-sample-demo | empty mixin applied to the container of the rendered code | {} |
| --code-sample-code-container | empty mixin applied to code container | {} |
| --code-sample-code-container-hover | empty mixin applied to code container on :hover | {} |
| --code-sample-code-container-hover-button | empty mixin applied to the copy to clipboard button when the code container on :hover | {} |
| --code-sample-copy-button-bg-color | background-color of the copy to clipboard button | #e0e0e0 |
| --code-sample-copy-clipboard-button | empty mixin applied to the copy to clipboard button | {} |

Included themes contain custom CSS properties to set the background and text color.   
You may need to add these CSS properties to your own themes.

| Custom property                | Description                             | Default     |
|:-------------------------------|:----------------------------------------|:------------|
| --code-sample-background       | code background color                   | Depends on the theme         |
| --code-sample-color            | code text color                         | Depends on the theme         |



