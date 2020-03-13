/**
 * @file Operações sobre a tabela de situações profissionais
 * @module resolvers/situacao-profissional
 * @author Josafá Santos
 */
export default {

  Query: {

    /**
     * retorna todos os registros de situação profissionais
     */
    situacoesProfissionais: (parent, args, { models }) => models.SituacaoProfissional.findAll(),

    /**
     * restorna um registro de situação profissional pelo id
     */
    situacaoProfissional: (parent, { id }, { models }) => models.SituacaoProfissional.findByPk(id)
  },

  Mutation: {

    /**
     * cria um novo registro de situação profissional
     */
    createSituacaoProfissional: (parent, args, { models }) => models.SituacaoProfissional.create({
      nome: args.nome,
      createdAt: new Date(),
      updatedAt: new Date()
    }),

    /**
     * atualiza um registro de situação profissional, dado o id
     */
    updateSituacaoProfissional: (parent, args, { models }) => models.SituacaoProfissional.update({
      nome: args.nome,
      updatedAt: new Date(),
    }, {
      where: { id: args.id },
      returning: true,
      plain: true
    }).then((result) => { result[1] }),

    /**
     * exclui exclui um registro de situação profissional, dado o id
     */
    deleteSituacaoProfissional: (parent, { id }, { models }) => models.SituacaoProfissional.destroy({
      where: {
        id
      }
    })
  }
}
