import waitForExpect from 'wait-for-expect';
import { defineComponent } from 'vue';
import { Form } from 'vee-validate';
import { mount } from '@vue/test-utils';
import BnTextarea from './BnTextarea.vue';

function isRequired(val: string | number) {
  if (!val) {
    return 'This field is required';
  }

  return true;
}

const baseInput = `<BnTextarea
  v-model="input"
  name="input"
/>`;

function generateExampleForm() {
  return defineComponent({
    components: {
      Form,
      BnTextarea,
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

describe('BnTextarea', () => {
  it('should mount', () => {
    const wrapper = mount(BnTextarea, { props: { name: 'test' } });
    expect(wrapper.findAll('textarea')).toHaveLength(1);
  });

  it('v-model should work', async () => {
    const wrapper = mount(generateExampleForm());
    const input = wrapper.getComponent(BnTextarea);
    await input.find('textarea').setValue('Hello World!');

    expect(wrapper.vm.input).toBe('Hello World!');
  });

  it('vee-validate submit should work', async () => {
    const wrapper = mount(generateExampleForm());
    const input = wrapper.getComponent(BnTextarea);
    input.find('textarea').setValue('Hello World!');
    wrapper.find('form').trigger('submit');

    await waitForExpect(() => {
      expect(wrapper.vm.submittedValues).toStrictEqual({
        input: 'Hello World!',
      });
    });
  });

  it('should validate using prop rules', async () => {
    const wrapper = mount(BnTextarea, { props: { name: 'input', value: false, rules: isRequired } });
    expect(wrapper.find('[class$="--error"]').exists()).toBe(false);
    const input = wrapper.find('textarea');
    input.trigger('blur');
    await waitForExpect(() => {
      expect(wrapper.find('[class$="--error"]').exists()).toBe(true);
    });
  });

  it('should validate using form rules', async () => {
    const wrapper = mount(generateExampleForm(), { props: { validationSchema: { input: isRequired } } });
    const inputWrapper = wrapper.getComponent(BnTextarea);
    const input = inputWrapper.find('textarea');
    expect(inputWrapper.find('[class$="--error"]').exists()).toBe(false);
    input.trigger('blur');
    await waitForExpect(() => {
      expect(inputWrapper.find('[class$="--error"]').exists()).toBe(true);
    });
  });
});
