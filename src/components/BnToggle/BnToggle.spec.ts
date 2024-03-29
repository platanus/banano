import flushPromises from 'flush-promises';
import waitForExpect from 'wait-for-expect';
import { defineComponent } from 'vue';
import { Form } from 'vee-validate';
import { mount } from '@vue/test-utils';
import BnToggle, { type ValueTypes } from './BnToggle.vue';

function isRequired(val: ValueTypes | ValueTypes[]) {
  if (!val) {
    return 'This field is required';
  }

  return true;
}

const baseCheckbox = `<BnToggle
  v-model="checked"
  name="checkbox"
  value="checked"
/>`;

const arrayCheckboxes = `
<BnToggle
  v-model="checkedArray"
  name="checkbox"
  :value="1"
/>
<BnToggle
  v-model="checkedArray"
  name="checkbox"
  :value="2"
/>
<BnToggle
  v-model="checkedArray"
  name="checkbox"
  :value="3"
/>
`;

function generateExampleForm(useArray?: boolean) {
  return defineComponent({
    components: {
      Form,
      BnToggle,
    },
    props: {
      validationSchema: {
        type: Object,
        default: () => ({}),
      },
    },
    data(): { checked?: boolean, checkedArray: string[], submittedValues?: Record<string, unknown> } {
      return {
        checked: undefined,
        checkedArray: [],
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
        ${useArray ? arrayCheckboxes : baseCheckbox}
      </Form>
    `,
  });
}

describe('BnToggle', () => {
  it('should mount', () => {
    const wrapper = mount(BnToggle, { props: { name: 'test', value: true } });

    expect(wrapper.findAll('input[type="checkbox"]')).toHaveLength(1);
  });

  it('v-model should work', async () => {
    const wrapper = mount(generateExampleForm());
    const input = wrapper.getComponent(BnToggle);
    await input.find('input').setValue();

    expect(wrapper.vm.checked).toBe('checked');
  });

  it('vee-validate submit should work', async () => {
    const wrapper = mount(generateExampleForm());
    const input = wrapper.getComponent(BnToggle);
    input.find('input').setValue();
    wrapper.find('form').trigger('submit');

    await flushPromises();
    await waitForExpect(() => {
      expect(wrapper.vm.submittedValues).toStrictEqual({
        checkbox: 'checked',
      });
    });
  });

  /* eslint-disable no-magic-numbers */
  it('should work with an array', async () => {
    const expectedResults = [1, 3];
    const wrapper = mount(generateExampleForm(true));
    const inputs = wrapper.findAllComponents(BnToggle);
    if (inputs.length > 0) {
      await inputs[0].find('input').setValue();
      await inputs[2].find('input').setValue();
    }

    expect(wrapper.vm.checkedArray).toStrictEqual(expectedResults);
  });
  /* eslint-enable no-magic-numbers */

  it('should validate using prop rules', async () => {
    const wrapper = mount(BnToggle, { props: { name: 'checkbox', value: false, rules: isRequired } });
    expect(wrapper.find('[class$="--error"]').exists()).toBe(false);
    const input = wrapper.getComponent(BnToggle);
    input.find('input').trigger('change');
    await waitForExpect(() => {
      expect(wrapper.find('[class$="--error"]').exists()).toBe(true);
    });
  });

  it('should validate using form rules', async () => {
    const wrapper = mount(generateExampleForm(), { props: { validationSchema: { checkbox: isRequired } } });
    const input = wrapper.getComponent(BnToggle);
    expect(input.find('[class$="--error"]').exists()).toBe(false);
    wrapper.find('form').trigger('submit');
    await waitForExpect(() => {
      expect(input.find('[class$="--error"]').exists()).toBe(true);
    });
  });
});
