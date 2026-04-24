/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import { binRequireResolve, cmd, exec } from '@/nodejs/exec'
import { resolvePath } from '@/nodejs/path'
import { repoRoot } from '@/root'

export const prettier = async (target: string) =>
  cmd({
    bin: await binRequireResolve('@/devtools/prettier'),
    args: [
      ['--log-level', 'error'],
      ['--config', await resolvePath(repoRoot, 'prettier.config.js')],
      ['--write'],
      //
    ],
    target,
  })

export const run = (target = repoRoot) => prettier(target).then(exec)
