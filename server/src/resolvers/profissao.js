/**
 * @file Operações sobre a tabela de profissões
 * @module resolvers/profissao
 * @author Josafá Santos
 */
export default {

  Query: {

    /**
     * retorna todos os registros de profissão
     */
    profissoes: async (parent, args, { models }) => {
      const profissoes = await models.Profissao.findAll()
      return profissoes 
    },

    /**
     * restorna um registro de profissão pelo id
     */
    profissao: async (parent, { id }, { models }) => {
      const profissao = await models.Profissao.findByPk(id)
      return profissao
    }
  },

  Mutation: {

    /**
     * cria um novo registro de profissão
     */
    createProfissao: (parent, args, { models }) => models.Profissao.create({
      nome: args.nome,
      createdAt: new Date(),
      updatedAt: new Date()
    }),

    /**
     * atualiza um registro de profissão, dado o id
     */
    updateProfissao: (parent, args, { models }) => models.Profissao.update({
      nome: args.nome,
      updatedAt: new Date(),
    }, {
      where: { id: args.id },
      returning: true,
      plain: true
    }).then((result) => { result[1] }),

    /**
     * exclui exclui um registro de profissão, dado o id
     */
    deleteProfissao: (parent, { id }, { models }) => models.Profissao.destroy({
      where: {
        id
      }
    })
  }
}
