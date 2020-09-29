Feature: Criar Tipo de Exame Físico

  Clientes devem poder enviar uma requisição à API para criar 
  um tipo de exame físico. A API também deve validar a estrutura 
  dos e responder com uma mensagem de erro, se esta for inválida.

  Scenario: Sem argumentos

  Se o cliente enviar a mutation createTipoExameFisico com argumentos errados,
  deve receber uma resposta com um código de status 4xx.

  When o cliente cria uma requisição para a mutation createTipoExameFisico
  And informa argumentos vazios
  And envia a requisição
  Then a API deve responder com um código de estado HTTP 400
  And o formato da resposta deve ser um objeto JSON
  And contém uma mensagem dizendo "Os argumentos não podem ser vazios"