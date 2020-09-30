/**
 * @title Steps dos testes E2E com Cucumber
 * @module spec/cocumber/steps/index
 * @author Josafá Santos dos Reis
 */

import superagent from 'superagent'
import { When, Then } from '@cucumber/cucumber'
import assert from 'assert'

When('o cliente cria uma requisição para a mutation createTipoExameFisico', function() {
  this.request = superagent('POST', `${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}/graphql`)
  /*  'POST',
    'localhost:4000/api',
    [
      {query: '{ mutation CreateTipoExameFisico($nome: String) createTipoExameFisico(nome: $nome) { statusCode } }'},
      {variables: '{ "nome": ""}'}
    ]
  ) */
  //request = superagent()
  /* request
  .send({query: '{ mutation CreateTipoExameFisico($nome: String) createTipoExameFisico(nome: $nome) { statusCode } }'})
  .send({variables: '{ "nome": ""}'}) */
})

When('informa argumentos vazios', function() {
  return undefined
})

When('envia a requisição', function(callback) {
  this.request
    .then((response) => {
      this.response = response.res
      callback()
    })
    .catch((errResponse) => {
      this.response = errResponse.response
      callback()
    })
})

Then('a API deve responder com um código de estado HTTP 400', function() {
  assert.strictEqual(this.response.statusCode, 400)
})

Then('o formato da resposta deve ser um objeto JSON', function() {

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
})

Then('contém uma propriedade message dizendo "Os argumentos não podem estar vazios"', function() {
  assert.strictEqual(this.responsePayload.message, 'Os argumentos não podem estar vazios')
})