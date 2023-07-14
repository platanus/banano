
import { vi } from 'vitest';

const emptyFileList = {
  length: 0,
  item: () => null,
};

Object.defineProperty(HTMLInputElement.prototype, 'files', {
  writable: true,
  value: emptyFileList,
});

const dataTransferMock = {
  files: emptyFileList,
  items: {
    add: vi.fn(),
  },

  setData: vi.fn(),
  getData: vi.fn(),
};

export default function DataTransferMock() {
  return dataTransferMock;
}
