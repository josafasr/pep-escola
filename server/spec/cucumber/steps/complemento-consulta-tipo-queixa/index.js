import superagent from 'superagent'
import { When, Then } from '@cucumber/cucumber'
import assert from 'assert'

When('o cliente criar uma requisição para a mutation "createComplementoConsultaTipoQueixa"', function() {
  this.request = superagent.post(`${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}/graphql?query`)
    .set('Content-Type', 'application/json')
})

When('informar dados válidos', function() {
  this.request
    .send('{"query": "mutation { createComplementoConsultaTipoQueixa(complemento: \\"Complemento sobre as queixas\\", consultaId: 6, tipoQueixaId: 1) { ok complementoConsultaTipoQueixa { id complemento } errors { path message }}}"}')
})

When('enviar a requisição', function(callback) {
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

Then('o servidor deverá retornar uma propriedade "ok" com valor true', function() {
  assert.strictEqual(this.response.data.createComplementoConsultaTipoQueixa.ok, true)
})

Then('um objeto "complementoConsultaTipoQueixa" diferente de null', function() {
  assert.notStrictEqual(this.response.data.createComplementoConsultaTipoQueixa.complementoConsultaTipoQueixa, null)
})

Then('o objeto "complementoConsultaTipoQueixa" deve ter uma propriedade "id" diferente de null', function() {
  assert.notStrictEqual(this.response.data.createComplementoConsultaTipoQueixa.complementoConsultaTipoQueixa.id, null)
})
