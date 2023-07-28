import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';
import useAttrsWithoutClass from './useAttrsWithoutClass';

describe('useAttrsWithoutClass', () => {
  it('should return attrs without class', () => {
    const component = defineComponent({
      inheritAttrs: false,
      setup() {
        const { attrClass, attrsWithoutClass } = useAttrsWithoutClass();

        return { attrClass, attrsWithoutClass };
      },
      template:
      `<div :class="attrClass">
        <input v-bind="attrsWithoutClass" />
      </div>`,
    });
    const wrapper = mount(component, { props: { class: 'test', disabled: true } });
    expect(wrapper.classes()).toContain('test');
    const input = wrapper.find('input');
    expect(input.element.disabled).toEqual(true);
  });
});
