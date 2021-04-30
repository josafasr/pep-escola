# language: pt

Funcionalidade: Inserir antecedentes patológicos do paciente

  A API deve possibilitar inserção e atualização da lista de 
  antecedentes patológicos do paciente

  Cenário: Inserir lista de antecedentes patológicos

  # Dado que uma consulta será inserida
  Quando receber uma lista de antecedentes patológicos
  Então os antecedentes da lista devem ser vinculados ao paciente