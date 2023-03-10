import { mount } from '@vue/test-utils';
import BnFileInput from './BnFileInput.vue';

describe('BnFileInput', () => {
  it('should mount', () => {
    const wrapper = mount(BnFileInput, { props: { name: 'test' } });
    expect(wrapper.findAll('input')).toHaveLength(1);
  });
});
