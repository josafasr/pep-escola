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
    profissoes: (parent, args, { models }) => models.Profissao.findAll(),

    /**
     * restorna um registro de profissão pelo id
     */
    profissao: (parent, { id }, { models }) => models.Profissao.findByPk(id)
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
