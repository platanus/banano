import waitForExpect from 'wait-for-expect';
import { vi } from 'vitest';
import { mount, DOMWrapper } from '@vue/test-utils';
import { defineComponent, type PropType } from 'vue';
import { Form } from 'vee-validate';
import BnFileInput, { type FileType } from './BnFileInput.vue';
import DataTransferMock from '../../mocks/data-transfer';

vi.stubGlobal('DataTransfer', DataTransferMock);

function isRequired(val: FileType) {
  if (val === undefined || val.length === 0) {
    return 'This field is required';
  }

  return true;
}

function generateFile(name: string) {
  return new File([name], `${name}.txt`, {
    type: 'text/plain',
  });
}

const baseFileInput = `<BnFileInput
  v-model="image"
  name="image"
/>`;

const arrayFileInput = `<BnFileInput
  v-model="imagesArray"
  name="image"
  multiple
/>`;

const customArrayFileInput = `<BnFileInput
v-model="imagesArray"
name="image"
multiple
>
<template #default="{ imagePreviewPath, openFileDialog, value, addFile, removeFile }">
  <div class="w-full">
    <button
      id="add-file"
      v-if="value && value.length > 0"
      class="mb-2 rounded border border-gray-300 py-1 px-2 text-sm shadow"
      @click="addFile()"
    >
      Add File
    </button>
    <button
      v-else
      class="mb-2 rounded border border-gray-300 py-1 px-2 text-sm shadow"
      @click="openFileDialog()"
    >
      Browse
    </button>
    <ul
      v-if="value && isFileList(value)"
      class="w-full"
    >
      <li
        v-for="file in value"
        :key="file.name"
        class="flex w-full items-center border border-t-0 p-1 text-sm first:border-t"
      >
        <img
          :src="imagePreviewPath(file)"
          class="mr-2 h-6 w-6 rounded-full"
        >
        <span class="truncate">{{ file.name }}</span> ({{ file.size / 1000 }} KB)
        <button
          id="remove-file"
          class="ml-auto"
          @click="removeFile(file)"
        >
          🗑
        </button>
      </li>
    </ul>
  </div>
</template>
</BnFileInput>`;

function isFileList(object: File[] | File): object is File[] {
  return !(object instanceof File);
}

const fileInputs = {
  single: baseFileInput,
  multiple: arrayFileInput,
  customMultiple: customArrayFileInput,
};

function fileInputOnChangeTrigger(fileInput: DOMWrapper<HTMLInputElement>, value: File[]) {
  const event = document.createEvent('HTMLEvents');
  event.initEvent('change', false, true);
  Object.defineProperty(event, 'target', { writable: false, value: { files: value } });

  fileInput.element.dispatchEvent(event);
}

function generateExampleForm(fileInputType: 'single' | 'multiple' | 'customMultiple' = 'single') {
  return defineComponent({
    components: {
      Form, BnFileInput,
    },
    props: {
      validationSchema: {
        type: Object,
        default: () => ({}),
      },
      initialImages: {
        type: Array as PropType<File[]>,
        default: () => ([]),
      },
    },
    data(props): { image?: File, imagesArray: File[], submittedValues?: Record<string, unknown> } {
      return {
        image: undefined,
        imagesArray: props.initialImages || [],
        submittedValues: undefined,
      };
    },
    methods: {
      isFileList,
      submit(values: Record<string, unknown>) {
        this.submittedValues = values;
      },
    },
    template: `
      <Form @submit="submit" :validation-schema="validationSchema">
        ${fileInputs[fileInputType]}
      </Form>
    `,
  });
}

const file = generateFile('test');

describe('BnFileInput', () => {
  it('should mount', () => {
    const wrapper = mount(BnFileInput, { props: { name: 'image' } });
    expect(wrapper.findAll('input')).toHaveLength(1);
  });

  it('v-model should work', async () => {
    const wrapper = mount(generateExampleForm());
    const fileInput = wrapper.getComponent(BnFileInput).find('input');
    fileInputOnChangeTrigger(fileInput, [file]);

    await waitForExpect(() => {
      expect(wrapper.vm.image).toBe(file);
    });
  });

  it('vee-validate submit should work', async () => {
    const wrapper = mount(generateExampleForm());
    const fileInput = wrapper.getComponent(BnFileInput).find('input');
    fileInputOnChangeTrigger(fileInput, [file]);

    wrapper.find('form').trigger('submit');
    await waitForExpect(() => {
      expect(wrapper.vm.submittedValues).toStrictEqual({ image: file });
    });
  });

  it('v-model should work with array', async () => {
    const wrapper = mount(generateExampleForm('multiple'));
    const fileInput = wrapper.getComponent(BnFileInput).find('input');
    const fileList = [file, generateFile('test2')];
    fileInputOnChangeTrigger(fileInput, fileList);

    await waitForExpect(() => {
      expect(wrapper.vm.imagesArray).toStrictEqual(fileList);
    });
  });

  it('should validate using prop rules', async () => {
    const wrapper = mount(BnFileInput, { props: { name: 'image', rules: isRequired } });
    expect(wrapper.classes().includes('bn-file-input--error')).toBe(false);
    const input = wrapper.find('button');
    expect(wrapper.find('[class$="--error"]').exists()).toBe(false);
    input.trigger('click');
    await waitForExpect(() => {
      expect(wrapper.find('[class$="--error"]').exists()).toBe(true);
    });
  });

  it('should validate using form rules', async () => {
    const wrapper = mount(generateExampleForm(), { props: { validationSchema: { image: isRequired } } });
    const input = wrapper.find('button');
    const inputWrapper = wrapper.find('div');
    expect(inputWrapper.find('[class$="--error"]').exists()).toBe(false);
    input.trigger('click');
    await waitForExpect(() => {
      expect(inputWrapper.find('[class$="--error"]').exists()).toBe(true);
    });
  });

  it('should add file', async () => {
    const fileList = [file, generateFile('test2')];
    const wrapper = mount(generateExampleForm('customMultiple'), { props: { initialImages: fileList } });
    const newFile = generateFile('test3');

    wrapper.find('#add-file').trigger('click');

    const fileInput = wrapper.getComponent(BnFileInput).find('input');
    fileInputOnChangeTrigger(fileInput, [newFile]);

    await waitForExpect(() => {
      expect(wrapper.vm.imagesArray).toStrictEqual([...fileList, newFile]);
    });
  });

  it('should remove file', async () => {
    const fileList = [generateFile('test2'), file];
    const wrapper = mount(generateExampleForm('customMultiple'), { props: { initialImages: fileList } });

    wrapper.find('#remove-file').trigger('click');

    await waitForExpect(() => {
      expect(wrapper.vm.imagesArray).toStrictEqual([file]);
    });
  });
});
