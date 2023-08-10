import { mount } from '@vue/test-utils';
import BnBtn from './BnBtn.vue';

describe('BnBtn', () => {
  const defaultSlotId = 'default';
  const defaultSlot = `<span id="${defaultSlotId}">My Button</span>`;
  const iconRightSlotId = 'icon-right';
  const iconRightSlot = `<svg id="${iconRightSlotId}"></svg>`;
  const iconLeftSlotId = 'icon-left';
  const iconLeftSlot = `<svg id="${iconLeftSlotId}"></svg>`;

  it('should mount as button with no href', () => {
    const wrapper = mount(BnBtn);
    expect(wrapper.findAll('button')).toHaveLength(1);
  });

  it('should mount as anchor with href', () => {
    const wrapper = mount(BnBtn, { props: { href: 'example.com' } });
    expect(wrapper.findAll('a')).toHaveLength(1);
  });

  it('should show loading when loading prop is true, without replacing content', () => {
    const wrapper = mount(BnBtn, {
      props: { loading: true },
      slots: { default: defaultSlot, 'icon-right': iconRightSlot, 'icon-left': iconLeftSlot },
    });
    expect(wrapper.findAll('svg.bn-btn__loading')).toHaveLength(1);
    expect(wrapper.findAll(`#${defaultSlotId}`)).toHaveLength(1);
    expect(wrapper.findAll(`#${iconRightSlotId}`)).toHaveLength(1);
    expect(wrapper.findAll(`#${iconLeftSlotId}`)).toHaveLength(1);
  });

  it('should show loading when loading prop is true, replacing content when loadingReplacesContent is true', () => {
    const wrapper = mount(BnBtn, {
      props: { loading: true, loadingReplacesContent: true },
      slots: { default: defaultSlot, 'icon-right': iconRightSlot, 'icon-left': iconLeftSlot },
    });
    expect(wrapper.findAll('svg.bn-btn__loading')).toHaveLength(1);
    expect(wrapper.findAll(`#${defaultSlotId}`)).toHaveLength(0);
    expect(wrapper.findAll(`#${iconRightSlotId}`)).toHaveLength(0);
    expect(wrapper.findAll(`#${iconLeftSlotId}`)).toHaveLength(0);
  });
});
