import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

HTMLElement.prototype.showModal = function() {
  // Mock implementation of showModal
};

HTMLElement.prototype.close = function() {
  // Mock implementation of close
};

afterEach(() => {
  cleanup();
});