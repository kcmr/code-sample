# &lt;code-sample&gt;

> A wrapper element for [highlight.js](https://highlightjs.org/)

Custom Element that uses [highlight.js](https://highlightjs.org/) for syntax highlighting.   
Forget to worry about spaces, HTML entities, etc.

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

You can use another theme by adding one of the [available themes](https://github.com/isagalaev/highlight.js/tree/master/src/styles) for hightlight.js in a shared style (Polymer Style Module) with the `id` `code-sample-theme`.

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

* `--code-sample-font-family`: font-family applied to `<pre>` and `<code>` elements.   
Default: Operator Mono, Inconsolata, Roboto Mono, monaco, consolas, monospace.
* `--code-sample-font-size`: font-size applied to `<pre>` and `<code>` elements.   
Default: 14px.

Included themes contain custom CSS properties to set the background and text color.

* `--code-sample-background`: code background color.
* `--code-sample-color`: code text color.

You may need to add these CSS properties to your own themes.
