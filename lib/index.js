'use strict'

const Hoek = require('hoek')

exports.plugin = {
  pkg: require('../package.json'),

  register: async function (server, options) {
    const { accountId, token, tokenType } = options

    Hoek.assert(token, 'Please supply a valid `token` in the plugin options.')
    Hoek.assert(accountId, 'Please supply a valid `accountId` in the plugin options.')

    const dripClient = require('drip-nodejs')({
      accountId,
      token,
      tokenType
    })

    const clientName = 'drip'

    server.app[clientName] = dripClient
    server.decorate('request', clientName, dripClient)
  }
}
