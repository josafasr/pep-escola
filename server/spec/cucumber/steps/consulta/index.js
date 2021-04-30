/**
 * @title Steps para testes da gravação de consulta
 * @author Josafá Santos dos Reis
 */

import { When, Then } from '@cucumber/cucumber'
import assert from 'assert'

/* Given('que uma consulta será gravada', () => {
  assert.notStrictEqual(consulta, null)
}) */

class Antecedente {
  constructor (id, nome) {
    this.id = id,
    this.nome = nome
  }
}

class Paciente {
  constructor (id, antecedentes) {
    this.id = id,
    this.antecedentes = antecedentes
  }
}

const antecedente0 = new Antecedente(0, 'Antecedente Zero')
const antecedente1 = new Antecedente(1, 'Antecedente Um')
const antecedente2 = new Antecedente(2, 'Antecedente Dois')

/* const paciente = {
  antecedentes: ['antecedente0']
} */
const antecedentes = new Array(antecedente0, antecedente1) //['antecedente1', 'antecedente2']

const paciente = new Paciente(1, [antecedente2])

// use case
const insertAntecedentesInterface = insert => insert

// data
const insertAntecedentesImpl = {
  insert: (paciente, antecedentes) => {
    paciente.antecedentes = [
      ...paciente.antecedentes,
      ...antecedentes
    ]
  }
}

const insertAntecedentes = (paciente, antecedentes) => ({
  insert: () => insertAntecedentesInterface(
    insertAntecedentesImpl.insert(paciente, antecedentes)
  )
})

When('receber uma lista de antecedentes patológicos', () => {
  assert.notStrictEqual(antecedentes, null)
})

Then('os antecedentes da lista devem ser vinculados ao paciente', () => {
  const inserts = insertAntecedentes(paciente, antecedentes)
  inserts.insert(paciente, antecedentes)
  const actual = paciente.antecedentes.length
  const expected = 3

  assert.strictEqual(actual, expected)
})