/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { ESLint } from 'eslint'

import { enforceUseClient } from '@/devtools/eslint-plugin-custom/enforce-use-client'
import { errName } from '@/devtools/eslint-plugin-custom/err-name'
import { exportValidation } from '@/devtools/eslint-plugin-custom/export-validation'
import { noAccessProperty } from '@/devtools/eslint-plugin-custom/no-access-property'
import { noImportDefault } from '@/devtools/eslint-plugin-custom/no-import-default'
import { noImportOutside } from '@/devtools/eslint-plugin-custom/no-import-outside'
import { noJsonStringify } from '@/devtools/eslint-plugin-custom/no-json-stringify'
import { noNullishCoalescing } from '@/devtools/eslint-plugin-custom/no-nullish-coalescing'
import { noRelativeExportPaths } from '@/devtools/eslint-plugin-custom/no-relative-export-paths'
import { noUseState } from '@/devtools/eslint-plugin-custom/no-use-state'
import { noVoidUnion } from '@/devtools/eslint-plugin-custom/no-void-union'

export const customPlugin = {
  meta: {
    name: 'custom',
  },
  rules: {
    'enforce-use-client': enforceUseClient,
    'err-name': errName,
    'export-validation': exportValidation,
    'no-access-property': noAccessProperty,
    'no-import-default': noImportDefault,
    'no-import-outside': noImportOutside,
    'no-json-stringify': noJsonStringify,
    'no-nullish-coalescing': noNullishCoalescing,
    'no-relative-export-paths': noRelativeExportPaths,
    'no-use-state': noUseState,
    'no-void-union': noVoidUnion,
  },
} as unknown as ESLint.Plugin
