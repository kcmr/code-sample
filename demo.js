import { oneDark } from './node_modules/@kuscamara/code-sample/themes/one-dark.js';
import { oneLight } from './node_modules/@kuscamara/code-sample/themes/atom-one-light.js';
import { defaultTheme } from './node_modules/@kuscamara/code-sample/themes/default.js';
import { github } from './node_modules/@kuscamara/code-sample/themes/github.js';
import { solarizedLight } from './node_modules/@kuscamara/code-sample/themes/solarized-light.js';
import { solarizedDark } from './node_modules/@kuscamara/code-sample/themes/solarized-dark.js';
import { kustomLight } from './node_modules/@kuscamara/code-sample/themes/kustom-light.js';
import { kustomDark } from './node_modules/@kuscamara/code-sample/themes/kustom-dark.js';
const themes = {
  oneDark,
  oneLight,
  defaultTheme,
  github,
  solarizedLight,
  solarizedDark,
  kustomLight,
  kustomDark
};

const changeTheme = e => {
  const theme = e.target.value;
  const demo = document.querySelector(e.target.dataset.target);
  demo.theme = themes[theme];
};

const selects = document.querySelectorAll('select');
[].forEach.call(selects, select => {
  select.addEventListener('change', changeTheme);
});