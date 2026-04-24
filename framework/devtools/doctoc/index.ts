/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import { binRequireResolve, cmd, exec } from '@/nodejs/exec'
import { glob } from '@/nodejs/glob'

export const doctoc = async () => {
  const md = await glob('**/*.md')

  const promises = md.map(async p =>
    cmd({
      bin: await binRequireResolve('@/devtools/doctoc'),
      args: [
        ['--loglevel', 'warn'],
        ['--github'],
        [p],
        //
      ],
      argsJoinUsingSpace: true,
    }),
  )

  return Promise.all(promises)
}

export const run = () =>
  doctoc().then(cmds => Promise.all(cmds.map(c => exec(c))))
