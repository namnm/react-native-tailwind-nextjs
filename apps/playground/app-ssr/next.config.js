require('tsconfig-paths/register')
require('@/nodejs/entrypoint')({
  dir: __dirname,
})

module.exports = require('@/devtools/next-config').config({
  dir: __dirname,
})
