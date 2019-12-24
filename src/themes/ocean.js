import { css } from 'lit-element';

export const ocean = css`
.hljs-comment,
.hljs-quote {
  color: #65737e;
}

/* Ocean Red */
.hljs-variable,
.hljs-template-variable,
.hljs-tag,
.hljs-name,
.hljs-selector-id,
.hljs-selector-class,
.hljs-regexp,
.hljs-deletion {
  color: #bf616a;
}

/* Ocean Orange */
.hljs-number,
.hljs-built_in,
.hljs-builtin-name,
.hljs-literal,
.hljs-type,
.hljs-params,
.hljs-meta,
.hljs-link {
  color: #d08770;
}

/* Ocean Yellow */
.hljs-attribute {
  color: #ebcb8b;
}

/* Ocean Green */
.hljs-string,
.hljs-symbol,
.hljs-bullet,
.hljs-addition {
  color: #a3be8c;
}

/* Ocean Blue */
.hljs-title,
.hljs-section {
  color: #8fa1b3;
}

/* Ocean Purple */
.hljs-keyword,
.hljs-selector-tag {
  color: #b48ead;
}

.hljs {
  display: block;
  overflow-x: auto;
  color: var(--code-sample-background, #c0c5ce);
  background: var(--code-sample-color, #2b303b);
  padding: 0.5em;
}

.hljs-emphasis {
  font-style: italic;
}

.hljs-strong {
  font-weight: bold;
}
`;
