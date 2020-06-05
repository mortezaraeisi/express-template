const fs = require('fs')
const path = require('path')
const express = require('express')
const joiHandler = require('../middlewares/joi-handler')
const routeHandler = require('../middlewares/route-handler')

module.exports = function registerAPI (server) {
  $logger.debug('registering api -- start')

  // Register all api modules
  const apiFiles = getFiles(__dirname)
  for (const file of apiFiles) {
    const installer = require(file)
    const { route, method, validate, handler } = installer()
    if (Array.isArray(method)) {
      method.forEach(type => registerRoute({ route, method: type, validate, handler }))
    } else {
      registerRoute({ route, method, validate, handler })
    }
  }

  // Tune settings option
  function registerRoute ({ route, method, validate, handler }) {
    server[method.toLowerCase()](route, [
      joiHandler(validate),
      routeHandler(handler)
    ])
    $logger.debug('registered: ' + method + ':' + route)
  }

  // Read all api files recursively
  function getFiles (dir) {
    const directories = fs.readdirSync(dir, { withFileTypes: true })
    const files = directories
      .filter(x => !x.isDirectory())
      .filter(x => /\.js$/.test(x.name))
      .filter(x => x.name !== 'index.js')
      .map(x => path.resolve(dir, x.name))

    return [
      ...files,
      ...directories
        .filter(x => x.isDirectory())
        .map(x => getFiles(path.resolve(dir, x.name)))]
      .flat()
  }

  $logger.debug('registering api -- end')
}
