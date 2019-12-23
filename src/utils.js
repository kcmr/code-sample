export function cacheElementsWithId(node) {
  const getElement = (selector) => node.shadowRoot.querySelector(selector);
  const elementsWithId = [...node.shadowRoot.querySelectorAll('[id]')];
  const elements = elementsWithId.map((element) => ({
    [element.id]: getElement(`#${element.id}`)
  }));

  return elements.reduce((acc, current) => Object.assign(acc, current), {});
}

export function entitize(str) {
  return String(str)
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/=""/g, '')
    .replace(/=&gt;/g, '=>')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function cleanIndentation(str) {
  const pattern = str.match(/\s*\n[\t\s]*/);
  return str.replace(new RegExp(pattern, 'g'), '\n');
}
