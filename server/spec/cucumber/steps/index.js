/**
 * @title Steps dos testes E2E para login
 * @module spec/cucumber/steps/index
 * @author Josafá Santos dos Reis
 */

import superagent from 'superagent'
import { When, Then } from '@cucumber/cucumber'
import assert from 'assert'

When('o cliente cria uma requisição com a query login', function() {
  this.request = superagent.post(`${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}/graphql?query`)
    .set('Content-Type', 'application/json')
})

When('informa argumentos corretos', function() {
  this.request
    .send('{ "query": "query { login(nome: \\"user.dez\\", senha: \\"user.10\\") { ok token errors { path message } } }" }')
})

When('envia a requisição', function(callback) {
  this.request
    .then((response) => {
      this.response = JSON.parse(response.text)
      callback()
    })
    .catch((errResponse) => {
      this.response = errResponse.response
      callback()
    })
})

Then('a API deve responder com a propriedade "ok" igual a true', function() {
  assert.strictEqual(this.response.data.login.ok, true)
})

/* Then('o formato da resposta deve ser um objeto JSON', function() {

  // checa o Content-Type header
  const contentType = this.response.headers['Content-Type'] || this.response.headers['content-type']
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error('A resposta não é do tipo Content-Type application/json')
  }

  // checa se é um JSON válido
  try {
    this.responsePayload = JSON.parse(this.response.text)
  } catch (e) {
    throw new Error('A resposta não é um objeto JSON válido')
  }
}) */

Then('conter uma propriedade token não vazia', function() {
  assert.notStrictEqual(this.response.data.login.token.length, 0)
})