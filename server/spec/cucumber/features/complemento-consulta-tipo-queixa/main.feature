# language: pt

Funcionalidade: Criação de complemento para queixas em consulta

  O cliente deve poder enviar dados para criação de complemento/observação 
  sobre a/s queixa/s listadas no interrogatório sistemático da consulta, 
  para cada tipo de queixa.

  Cenário: Envio de dados corretos

  Quando o cliente criar uma requisição para a mutation "createComplementoConsultaTipoQueixa"
  E informar dados válidos
  E enviar a requisição
  Então o servidor deverá retornar uma propriedade "ok" com valor true
  E um objeto "complementoConsultaTipoQueixa" diferente de null
  E o objeto "complementoConsultaTipoQueixa" deve ter uma propriedade "id" diferente de null