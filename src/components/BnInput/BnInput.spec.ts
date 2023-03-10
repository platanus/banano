import flushPromises from 'flush-promises';
import waitForExpect from 'wait-for-expect';
import { defineComponent } from 'vue';
import { Form } from 'vee-validate';
import { mount } from '@vue/test-utils';
import BnInput from './BnInput.vue';

function isRequired(val: string) {
  if (!val) {
    return 'This field is required';
  }

  return true;
}

const baseInput = `<BnInput
  v-model="input"
  name="input"
/>`;

function generateExampleForm() {
  return defineComponent({
    components: {
      Form,
      BnInput,
    },
    props: {
      validationSchema: {
        type: Object,
        default: () => ({}),
      },
    },
    data(): { input?: string, submittedValues?: Record<string, unknown> } {
      return {
        input: undefined,
        submittedValues: undefined,
      };
    },
    methods: {
      isRequired,
      submit(values: Record<string, unknown>) {
        this.submittedValues = values;
      },
    },
    template: `
      <Form @submit="submit" :validation-schema="validationSchema">
        ${baseInput}
      </Form>
    `,
  });
}

describe('BnInput', () => {
  it('should mount', () => {
    const wrapper = mount(BnInput, { props: { name: 'test' } });
    expect(wrapper.findAll('input')).toHaveLength(1);
  });

  it('v-model should work', async () => {
    const wrapper = mount(generateExampleForm());
    const input = wrapper.getComponent(BnInput);
    input.find('input').setValue('Hello World!');

    expect(wrapper.vm.input).toBe('Hello World!');
  });

  it('vee-validate submit should work', async () => {
    const wrapper = mount(generateExampleForm());
    const input = wrapper.getComponent(BnInput);
    input.find('input').setValue('Hello World!');
    wrapper.find('form').trigger('submit');

    await flushPromises();
    await waitForExpect(() => {
      expect(wrapper.vm.submittedValues).toStrictEqual({
        input: 'Hello World!',
      });
    });
  });

  it('should validate using prop rules', async () => {
    const wrapper = mount(BnInput, { props: { name: 'input', value: false, rules: isRequired } });
    expect(wrapper.classes().includes('bn-input__input--error')).toBe(false);
    const input = wrapper.find('input');
    input.trigger('blur');
    await flushPromises();
    await waitForExpect(() => {
      expect(input.classes().includes('bn-input__input--error')).toBe(true);
    });
  });

  it('should validate using form rules', async () => {
    const wrapper = mount(generateExampleForm(), { props: { validationSchema: { input: isRequired } } });
    const input = wrapper.getComponent(BnInput).find('input');
    input.trigger('blur');
    await flushPromises();
    await waitForExpect(() => {
      expect(input.classes().includes('bn-input__input--error')).toBe(true);
    });
  });
});
