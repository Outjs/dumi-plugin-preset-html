import { describe, expect, test } from 'vitest';
import { compiler } from '../node';

const { compileSFC } = compiler;

describe('Html compilation test', () => {
  test('script', () => {
    expect(
      compileSFC({
        id: 'xx',
        code: `
        <script>
        console.log('hello');
        </script>
      `,
        filename: 'xx.html',
      }),
    ).toMatchSnapshot();
  });
  test('script + html', () => {
    expect(
      compileSFC({
        id: 'xx',
        code: `
        <script>
          const msg = 'Hello!'
          function log() {
            console.log(msg)
          }
        </script>
        <button @click="log">button</button>
      `,
        filename: 'xx.html',
      }),
    ).toMatchSnapshot();
  });

  test('two script tags', () => {
    expect(
      compileSFC({
        id: 'xx',
        code: `
        <script>
          const msg = 'Hello!'
          function log() {
            console.log(msg)
          }
        </script>
        <script>
        console.log('hello again');
        </script>
        <button @click="log">button</button>
      `,
        filename: 'xx.html',
      }),
    ).toMatchSnapshot();
  });

  test('script + html + style', () => {
    expect(
      compileSFC({
        id: 'xx',
        code: `
        <script>
          const msg = 'Hello!'
          function log() {
            console.log(msg)
          }
        </script>
        <style>
         .example {
            color: red;
          }
        </style>
        <button @click="log" class="example">button</button>
      `,
        filename: 'xx.html',
      }),
    ).toMatchSnapshot();
  });

  test('html only', () => {
    expect(
      compileSFC({
        id: 'xx',
        code: `
        <p>template only</p>
      `,
        filename: 'xx.html',
      }),
    ).toMatchSnapshot();
  });
});
