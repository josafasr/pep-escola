/**
 * @description Operações sobre a tabela de complemento do recordatorio alimentar
 * @module src/resolvers/complemento-recordatorio-alimentar
 * @author Marcos Porto, Josafá Santos dos Reis
 */

// import { formatErrors } from '../format-errors';

export default {

  Query: {

    /**
     * retorna todos os registros de recordatorio alimentar
     */
     complementosRecordatorioAlimentar: (parent, args, { models }) => models.ComplementoRecordatorioAlimentar.findAll(),

    /**
     * retorna um registro de recordatorio alimentar pelo id
     */
     complementoRecordatorioAlimentar: (parent, { id }, { models }) => models.ComplementoRecordatorioAlimentar.findByPk(id)
  }//,

  // Mutation: {

    /**
     * cria um novo registro de recordatorio alimentar
     */
    /* createComplementoRecordatorioAlimentar: async (parent, args, { models }) => {
      try {
        const recordatorioAlimentar = await models.ComplementoRecordatorioAlimentar.create(args)
        return {
          ok: true,
          recordatorioAlimentar
        }
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
          }
      }
    }, */

    /**
     * atualiza um registro de contato, dado o id
     */
    /* updateComplementoRecordatorioAlimentar: async (parent, args, { models }) => {
      const result = await models.ComplementoRecordatorioAlimentar.update(args, {
        where: { id: args.id },
        returning: true,
        plain: true
      })
      const recordatorioAlimentar = result[1]
      return recordatorioAlimentar
    }, */

    /**
     * exclui um registro de Recordatorio alimentar, dado o id
     */
    /* deleteComplementoRecordatorioAlimentar: (parent, { id }, { models }) => models.ComplementoRecordatorioAlimentar.destroy({
      where: {
        id
      }
    }) */
  // }
}
