import { When, Then } from '@cucumber/cucumber'

When('o cliente cria uma requisição para a mutation createTipoExameFisico', function(callback) {
  callback(null, 'pending')
})

When('informa argumentos vazios', function(callback) {
  callback(null, 'pending')
})

When('envia a requisição', function(callback) {
  callback(null, 'pending')
})

Then('a API deve responder com um código de estado HTTP 400', function(callback) {
  callback(null, 'pending')
})

Then('o formato da resposta deve ser um objeto JSON', function(callback) {
  callback(null, 'pending')
})

Then('contém uma mensagem dizendo "Os argumentos não podem ser vazios"', function(callback) {
  callback(null, 'pending')
})