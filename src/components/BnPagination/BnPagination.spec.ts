import { mount } from '@vue/test-utils';
import BnPagination from './BnPagination.vue';

describe('BnPagination', () => {
  it('should mount', () => {
    const wrapper = mount(BnPagination, { props: { totalPages: 50, currentPage: 1 } });
    expect(wrapper.findAll('li')[0].text()).toBe('1');
  });

  it('should display separators if it has a large amount of pages', () => {
    const wrapper = mount(BnPagination, { props: { totalPages: 50, currentPage: 25 } });
    const separators = wrapper.findAll('li').filter((li) => li.text() === '...');
    // eslint-disable-next-line no-magic-numbers
    expect(separators.length).toBe(2);
  });

  it('should change amount of visible numbers if delta is defined', async () => {
    const wrapper = mount(BnPagination, { props: { totalPages: 50, currentPage: 25, delta: 2 } });
    // eslint-disable-next-line no-magic-numbers
    expect(wrapper.findAll('li').length).toBe(11);
    await wrapper.setProps({ delta: 1 });
    // eslint-disable-next-line no-magic-numbers
    expect(wrapper.findAll('li').length).toBe(9);
  });
});
