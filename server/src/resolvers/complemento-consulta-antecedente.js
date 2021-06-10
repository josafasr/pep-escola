/**
 * @description Operações sobre a tabela de complementos de antcedentes
 * @module src/resolvers/complemento-consulta-antecedente
 * @author Josafá Santos dos Reis
 */

import { CreateComplementoAntecedenteRepository } from '../infra/create-complemento-antecedente-repo'
import { CreateComplementoAntecedente } from '../domain/use-cases/create-complemento-antecedente'

export default {

  Query: {

    // Retorna todos os registros de complementos de exames físicos
    //complementosConsultaExameFisico: (_, __) => .findAll(),

    // Busca um registro de complemento de exames físicos pelo código
    //complementoConsultaExameFisico: (_, { id }) => .findByPk(id),

    // Retorna registros de complementos de exames físicos pelo id da consulta
    //complementosExameFisicoByConsulta: (_, { consultaId }) => .findByConsultaPk(consultaId),
  },

  Mutation: {

    // Cria um novo registro de complemento de exames físicos
    createComplementoConsultaAntecedente: (_, args) => {
      const repo = new CreateComplementoAntecedenteRepository()
      const createComplementoConsultaAntecedente = new CreateComplementoAntecedente(repo)
      return createComplementoConsultaAntecedente.create(args)
    }

    // Atualiza um registro de complemento de exames físicos
    /* updateComplementoConsultaExameFisico: (_, args) => .update(args, {
      where: {
        id: args.id
      },
      returning: true,
      plain: true
    })
    .then((result) => {
      result[1]
    }) */
  }
}