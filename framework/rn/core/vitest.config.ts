/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, '../..'),
    },
  },
  test: {
    environment: 'node',
  },
})
