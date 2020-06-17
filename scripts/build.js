const fs = require('fs-extra')
const chalk = require('chalk')
const execa = require('execa')
const { gzipSync } = require('zlib')
const { compress } = require('brotli')

const files = [
  'dist/vuex-orm-apollo.esm-browser.js',
  'dist/vuex-orm-apollo.esm-browser.prod.js',
  'dist/vuex-orm-apollo.esm-bundler.js',
  'dist/vuex-orm-apollo.global.js',
  'dist/vuex-orm-apollo.global.prod.js',
  'dist/vuex-orm-apollo.cjs.js'
]

async function run() {
  await build()
  checkAllSizes()
  generateApiDocs()
}

async function build() {
  await fs.remove('dist')

  await execa('rollup', ['-c', 'rollup.config.js'], { stdio: 'inherit' })
}

function checkAllSizes() {
  console.log()
  files.map((f) => checkSize(f))
  console.log()
}

function checkSize(file) {
  const f = fs.readFileSync(file)
  const minSize = (f.length / 1024).toFixed(2) + 'kb'
  const gzipped = gzipSync(f)
  const gzippedSize = (gzipped.length / 1024).toFixed(2) + 'kb'
  const compressed = compress(f)
  const compressedSize = (compressed.length / 1024).toFixed(2) + 'kb'
  console.log(
    `${chalk.gray(
      chalk.bold(file)
    )} size:${minSize} / gzip:${gzippedSize} / brotli:${compressedSize}`
  )
}

async function generateApiDocs() {
  await execa('yarn', ['build:dts'], { stdio: 'inherit' })
}

run()
