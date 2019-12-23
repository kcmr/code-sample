import { fixture, fixtureCleanup, html, assert } from '@open-wc/testing';
import '../code-sample.js';

suite('<code-sample>', () => {
  teardown(() => {
    fixtureCleanup();
  });

  test('"myProperty" can be set via "my-property" attribute', async() => {
    const el = await fixture(html`
      <code-sample my-property="foo"></code-sample>
    `);

    assert.strictEqual(el.myProperty, 'foo');
  });
});
