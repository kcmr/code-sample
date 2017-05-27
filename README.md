# &lt;code-sample&gt;
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg?style=flat-square)](https://www.webcomponents.org/element/kcmr/code-sample)

> A wrapper element for [highlight.js](https://highlightjs.org/)

Custom Element that uses [highlight.js](https://highlightjs.org/) for syntax highlighting.   
Forget to worry about spaces, indentation, HTML entities, etc.

<!---
```html
<custom-element-demo>
  <template>
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <link rel="import" href="themes/one-dark.html">
    <link rel="import" href="code-sample.html">
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<code-sample>
  <template>
    <div class="some-class">
      <p>Lorem ipsum dolor…</p>
    </div>
  </template>
</code-sample>
```

## Usage

The code to highlight must be provided inside a `<template>` tag.
The `type` attribute is **optional** and it corresponds to the `class` applied to `<code>` in [highlight.js](https://highlightjs.org/).

```html
<code-sample type="html">
  <template>
    <p>your code here...</p>
  </template>
</code-sample>

<code-sample type="css">
  <template>
    .my-class {
      background-color: red;
    }
  </template>
</code-sample>

<code-sample type="javascript">
  <template>
    function foo() {
      alert('bar');
    }
  </template>
</code-sample>
```

## Themes

The component includes 6 themes that must be imported explicitly.

Example:

```html
<link rel="import" href="../code-sample/themes/one-dark.html">
<link rel="import" href="../code-sample/code-sample.html">
```

### Available themes

- atom-one-ligth.html
- default.html
- github.html
- one-dark.html
- solarized-dark.html
- solarized-light.html

### More themes

You can use another theme by adding one of the [available themes](https://github.com/isagalaev/highlight.js/tree/master/src/styles) for hightlight.js in a shared style ([Polymer Style Module](https://www.polymer-project.org/1.0/docs/devguide/styling#style-modules)) with the id `code-sample-theme`.

Example:

```html
<dom-module id="code-sample-theme">
  <template>
    <style>
    /* your own styles */
    </style>
  </template>
</dom-module>
```

### Styling

The following custom CSS properties are available for styling:

| Custom property                | Description                                                  | Default      |
|:-------------------------------|:-------------------------------------------------------------|:-------------|
| --code-sample-font-family      | font-family applied to `<pre>` and `<code>` elements         | Operator Mono, Inconsolata, Roboto Mono, monaco, consolas, monospace         |
| --code-sample-font-size        | font-size applied to `<pre>` and `<code>` elements           | 14px        |


Included themes contain custom CSS properties to set the background and text color.   
You may need to add these CSS properties to your own themes.

| Custom property                | Description                             | Default     |
|:-------------------------------|:----------------------------------------|:------------|
| --code-sample-background       | code background color                   | Depends on the theme         |
| --code-sample-color            | code text color                         | Depends on the theme         |



