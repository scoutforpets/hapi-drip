'use strict'

const Code = require('code')
const Hapi = require('hapi')
const Lab = require('lab')
const Drip = require('../')

// Test shortcuts

const lab = exports.lab = Lab.script()
const { it } = lab
const { expect } = Code

// Constants
const TOKEN = 'asdiahsdoiahaEEE12384'
const ACCOUNT_ID = '8973423'

it('can be added as a plugin to Hapi', async () => {
  const server = new Hapi.Server()
  const plugin = {
    plugin: Drip,
    options: { accountId: ACCOUNT_ID, token: TOKEN }
  }

  await server.register(plugin)

  expect(server.app.drip).to.exist()
})

it('decorates the request object with a drip prop', async () => {
  const server = new Hapi.Server()
  const plugin = {
    plugin: Drip,
    options: { accountId: ACCOUNT_ID, token: TOKEN }
  }

  await server.register(plugin)

  server.route({
    method: 'GET',
    path: '/',
    config: {
      handler: (request, h) => {
        expect(request.drip).to.exist()
        return 'GREAT SUCCESS!'
      }
    }
  })

  await server.start()

  const payload = {
    method: 'GET',
    url: '/'
  }

  const response = await server.inject(payload)

  expect(response.statusCode).to.equal(200)
  expect(response.result).to.equal('GREAT SUCCESS!')
})

it('throws an error if `token` is not supplied as an option', async () => {
  const server = new Hapi.Server()
  const plugin = {
    plugin: Drip,
    options: { accountId: ACCOUNT_ID }
  }

  const rejects = () => server.register(plugin)

  await expect(rejects()).to.reject(Error, 'Please supply a valid `token` in the plugin options.')
})

it('throws an error if `accountId` is not supplied as an option', async () => {
  const server = new Hapi.Server()
  const plugin = {
    plugin: Drip,
    options: { token: TOKEN }
  }

  const rejects = () => server.register(plugin)

  await expect(rejects()).to.reject(Error, 'Please supply a valid `accountId` in the plugin options.')
})
