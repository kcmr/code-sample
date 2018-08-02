
const changeTheme = (e) => {
  const theme = e.target.value;
  const demo = document.querySelector(e.target.dataset.target);
  demo.themeName = theme;
};

const selects = document.querySelectorAll('select');
[].forEach.call(selects, (select) => {
  select.addEventListener('change', changeTheme);
});
