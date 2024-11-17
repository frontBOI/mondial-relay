const fs = require('fs')
const path = require('path')

const distDir = './dist'
function createEsmModulePackageJson() {
  fs.readdir(distDir, function (err, dirs) {
    if (err) {
      throw err
    }
    dirs.forEach(function (dir) {
      if (dir === 'esm') {
        var packageJsonFile = path.join(distDir, dir, '/package.json')
        if (!fs.existsSync(packageJsonFile)) {
          fs.writeFile(packageJsonFile, new Uint8Array(Buffer.from('{"type": "module"}')), function (err) {
            if (err) {
              throw err
            }
          })
        }
      }
    })
  })
}

createEsmModulePackageJson()
