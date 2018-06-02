import { oneDark } from '../themes/one-dark.js';
import { oneLight } from '../themes/atom-one-light.js';
import { defaultTheme } from '../themes/default.js';
import { github } from '../themes/github.js';
import { solarizedLight } from '../themes/solarized-light.js';
import { solarizedDark } from '../themes/solarized-dark.js';
import { kustomLight } from '../themes/kustom-light.js';
import { kustomDark } from '../themes/kustom-dark.js';

const themes = {
  oneDark,
  oneLight,
  defaultTheme,
  github,
  solarizedLight,
  solarizedDark,
  kustomLight,
  kustomDark,
};

const changeTheme = (e) => {
  const theme = e.target.value;
  const demo = document.querySelector(e.target.dataset.target);
  demo.theme = themes[theme];
};

const selects = document.querySelectorAll('select');
[].forEach.call(selects, (select) => {
  select.addEventListener('change', changeTheme);
});
