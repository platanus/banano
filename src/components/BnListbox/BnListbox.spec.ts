import waitForExpect from 'wait-for-expect';
import { defineComponent } from 'vue';
import { Form } from 'vee-validate';
import { ListboxOption } from '@headlessui/vue';
import { mount } from '@vue/test-utils';
import BnListbox, { type InputValue } from './BnListbox.vue';

function isRequired(val: InputValue | InputValue[]) {
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

function generateBaseInput(options = 'selectOptions', props = '') {
  return `<BnListbox
    v-model="input"
    name="input"
    :options="${options}"
    ${props}
  />`;
}

function generateExampleForm(component = generateBaseInput(), input?: number) {
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

// eslint-disable-next-line max-statements
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
    const wrapper = mount(BnListbox, {
      props: {
        ...options.props,
        options: objectOptionsWithLabel,
        optionLabel: 'label',
      },
    });
    await wrapper.find('button').trigger('click');
    expect(wrapper.findComponent(ListboxOption).text()).toContain('Label: Label 1');
  });

  it('vee-validate submit should work', async () => {
    const wrapper = mount(generateExampleForm());
    const input = wrapper.getComponent(BnListbox);
    await input.find('button').trigger('click');
    wrapper.findComponent(ListboxOption).trigger('click');
    wrapper.find('form').trigger('submit');

    await waitForExpect(() => {
      expect(wrapper.vm.submittedValues).toStrictEqual({
        input: 'Option 1',
      });
    });
  });

  it('vee-validate submit should work with objects', async () => {
    const wrapper = mount(generateExampleForm(
      generateBaseInput('objectOptions', 'track-by="id" option-label="name"'),
    ));
    const input = wrapper.getComponent(BnListbox);
    await input.find('button').trigger('click');
    wrapper.findComponent(ListboxOption).trigger('click');
    wrapper.find('form').trigger('submit');

    await waitForExpect(() => {
      expect(wrapper.vm.submittedValues).toStrictEqual({
        input: 1,
      });
    });
  });

  it('vee-validate submit should work with keep-object-value', async () => {
    const wrapper = mount(generateExampleForm(
      generateBaseInput('objectOptions', 'track-by="id" option-label="name" :keep-object-value="true"'),
    ));
    const input = wrapper.getComponent(BnListbox);
    await input.find('button').trigger('click');
    wrapper.findComponent(ListboxOption).trigger('click');
    wrapper.find('form').trigger('submit');

    await waitForExpect(() => {
      expect(wrapper.vm.submittedValues).toStrictEqual({
        input: { name: 'Label 1', id: 1 },
      });
    });
  });

  it('should validate using prop rules', async () => {
    const wrapper = mount(BnListbox, { props: { ...options.props, rules: isRequired } });
    const button = wrapper.get('button');
    button.trigger('blur');
    await waitForExpect(() => {
      expect(button.classes().includes('bn-listbox__button--error')).toBe(true);
    });
  });

  it('should validate using form rules', async () => {
    const wrapper = mount(generateExampleForm(), { props: { validationSchema: { input: isRequired } } });
    const button = wrapper.getComponent(BnListbox).get('button');
    button.trigger('blur');
    await waitForExpect(() => {
      expect(button.classes().includes('bn-listbox__button--error')).toBe(true);
    });
  });

  describe('hidden inputs', () => {
    it('should create one hidden input with selected value when prop.multiple is false', async () => {
      const wrapper = mount(BnListbox, options);
      expect(wrapper.find('input[type="hidden"][name="test"]').exists()).toBe(true);
      expect(wrapper.find('input[type="hidden"][name="test"]').attributes('value')).toBe(undefined);
      await wrapper.setProps({
        modelValue: 'Option 1',
      });

      expect(wrapper.find('input[type="hidden"][name="test"]').attributes('value')).toBe('Option 1');
    });

    it('should create multiple hidden inputs with selected values when prop.multiple is true', async () => {
      const wrapper = mount(BnListbox, { ...options, props: { ...options.props, multiple: true } });
      expect(wrapper.find('input[type="hidden"][name="test[]"]').exists()).toBe(false);
      await wrapper.setProps({
        modelValue: ['Option 1', 'Option 2'],
      });
      expect(wrapper.findAll('input[type="hidden"][name="test[]"]')[0].attributes('value')).toBe('Option 1');
      expect(wrapper.findAll('input[type="hidden"][name="test[]"]')[1].attributes('value')).toBe('Option 2');
    });
  });
});
