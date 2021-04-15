# language: pt

Funcionalidade: Requisição de Login

  O cliente web deve poder enviar uma requisição ao servidor para efetuar login do usuário.

  Cenário: Dados corretos

    Quando o cliente cria uma requisição com a query login
    E informa argumentos corretos
    E envia a requisição
    Então a API deve responder com a propriedade "ok" igual a true
#   E o formato da resposta deve ser um objeto JSON
    E conter uma propriedade token não vazia