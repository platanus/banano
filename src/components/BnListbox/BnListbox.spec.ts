import flushPromises from 'flush-promises';
import waitForExpect from 'wait-for-expect';
import { defineComponent } from 'vue';
import { Form } from 'vee-validate';
import { ListboxOption } from '@headlessui/vue';
import { mount } from '@vue/test-utils';
import BnListbox from './BnListbox.vue';

function isRequired(val: string) {
  if (!val) {
    return 'This field is required';
  }

  return true;
}

const selectOptions = [
  'Option 1',
  'Option 2',
  'Option 3',
  'Option 4',
  'Option 5',
];

const objectOptions = [
  { name: 'Label 1', id: 1 },
  { name: 'Label 2', id: 2 },
  { name: 'Label 3', id: 3 },
  { name: 'Label 4', id: 4 },
  { name: 'Label 5', id: 5 },
];

const baseInput = `<BnListbox
  v-model="input"
  name="input"
  :options="selectOptions"
/>`;

function generateExampleForm(component = baseInput, input?: number) {
  type Data = {
    input?: number,
    selectOptions: string[],
    objectOptions: Record<string, unknown>[],
    submittedValues?: Record<string, unknown>
  };

  return defineComponent({
    components: {
      Form,
      BnListbox,
    },
    props: {
      validationSchema: {
        type: Object,
        default: () => ({}),
      },
    },
    data(): Data {
      return {
        input,
        selectOptions,
        objectOptions,
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
        ${component}
      </Form>
    `,
  });
}

describe('BnListbox', () => {
  const options = { props: { name: 'test', options: selectOptions, placeholder: 'Select an option' } };
  it('should mount', () => {
    const wrapper = mount(BnListbox, options);
    expect(wrapper.text()).toContain('Select an option');
  });

  it('should show options when clicked', async () => {
    const wrapper = mount(BnListbox, options);
    await wrapper.find('button').trigger('click');
    expect(wrapper.findComponent(ListboxOption).text()).toContain('Option 1');
  });

  it('should display name property by default when working with objects', async () => {
    const wrapper = mount(BnListbox, { props: { ...options.props, options: objectOptions } });
    await wrapper.find('button').trigger('click');
    expect(wrapper.findComponent(ListboxOption).text()).toContain('Label 1');
  });

  it('should use optionLabel property if defined', async () => {
    const objectOptionsWithLabel = objectOptions.map((option) => ({ ...option, label: `Label: ${option.name}` }));
    const wrapper = mount(BnListbox, { props: {
      ...options.props,
      options: objectOptionsWithLabel,
      optionLabel: 'label',
    } });
    await wrapper.find('button').trigger('click');
    expect(wrapper.findComponent(ListboxOption).text()).toContain('Label: Label 1');
  });

  it('vee-validate submit should work', async () => {
    const wrapper = mount(generateExampleForm());
    const input = wrapper.getComponent(BnListbox);
    input.setValue('Option 1');
    wrapper.find('form').trigger('submit');

    await flushPromises();
    await waitForExpect(() => {
      expect(wrapper.vm.submittedValues).toStrictEqual({
        input: 'Option 1',
      });
    });
  });

  it('should validate using prop rules', async () => {
    const wrapper = mount(BnListbox, { props: { ...options.props, rules: isRequired } });
    const button = wrapper.get('button');
    button.trigger('blur');
    await flushPromises();
    await waitForExpect(() => {
      expect(button.classes().includes('bn-listbox__button--error')).toBe(true);
    });
  });

  it('should validate using form rules', async () => {
    const wrapper = mount(generateExampleForm(), { props: { validationSchema: { input: isRequired } } });
    const button = wrapper.getComponent(BnListbox).get('button');
    button.trigger('blur');
    await flushPromises();
    await waitForExpect(() => {
      expect(button.classes().includes('bn-listbox__button--error')).toBe(true);
    });
  });
});
