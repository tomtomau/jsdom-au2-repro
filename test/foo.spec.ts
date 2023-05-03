import { Foo } from '../src/foo';
import { render } from './helper';

describe('foo component', () => {
  it.each([
    ['#optionA'],
    ['#optionB'],
    ['#optionC'],
    ['#optionD'],
  ])('%s should render an input with value \'Hello World!\'', async (selector) => {
    const node = (await render('<foo></foo>', Foo)).firstElementChild;
    const input = node.querySelector(selector) as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input.value).toBe('Hello World!');
  });
});
