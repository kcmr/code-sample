# WIP: &lt;code-highlighter&gt;

Custom Element that uses [highlight.js](https://highlightjs.org/) for syntax highlighting.
Forget to worry about spaces, HTML entities, etc.

**Warning**: this is a WIP very basic component that suits my own needs but is not finished yet.

## Usage

The code to highlight must be provided inside a `<template>` tag.
The `type` attribute is **optional** and it corresponds to the `class` applied to `<code>` in [highlight.js](https://highlightjs.org/).

```html
<code-highlighter type="html">
  <template>
    <p>your code here...</p>
  </template>
</code-highlighter>

<code-highlighter type="css">
  <template>
    .my-class {
      background-color: red;
    }
  </template>
</code-highlighter>

<code-highlighter type="javascript">
  <template>
    function foo() {
      alert('bar');
    }
  </template>
</code-highlighter>
```

## Themes

The component includes 6 themes that must be imported explicitly.

Example:

```html
<link rel="import" href="../code-highlighter/themes/one-dark.html">
<link rel="import" href="../code-highlighter/code-highlighter.html">
```

### Available themes

- atom-one-ligth.html
- default.html
- github.html
- one-dark.html
- solarized-dark.html
- solarized-light.html

### More themes

You can use another theme by adding one of the [available themes](https://github.com/isagalaev/highlight.js/tree/master/src/styles) for hightlight.js in a shared style (Polymer Style Module) with the `id` `code-highlighter-theme`.

Example:

```html
<dom-module id="code-highlighter-theme">
  <template>
    <style>
    /* your own styles */
    </style>
  </template>
</dom-module>
```
