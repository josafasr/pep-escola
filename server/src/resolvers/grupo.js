/**
 * @file Operações sobre a tabela de grupos
 * @module resolvers/grupo
 * @author Josafá Santos
 */
export default {

  Query: {

    /**
     * retorna todos os registros de grupo
     */
    grupos: (parent, args, { models }) => models.Grupo.findAll({
      include: [
        {
          as: 'usuarios',
          model: models.Usuario,
          through: { attributes: [] }
        }
      ]
    }),

    /**
     * restorna um registro de grupo pelo id
     */
    grupo: (parent, { id }, { models }) => models.Grupo.findByPk(id, {
      include: [
        {
          as: 'usuarios',
          model: models.Usuario,
          through: { attributes: [] }
        }
      ]
    })
  },

  Mutation: {

    /**
     * cria um novo registro de grupo
     */
    createGrupo: (parent, args, { models }) => models.Grupo.create({
      nome: args.nome,
      createdAt: new Date(),
      updatedAt: new Date()
    }),

    /**
     * atualiza um registro de grupo, dado o id
     */
    updateGrupo: (parent, args, { models }) => models.Grupo.update({
      nome: args.nome,
      updatedAt: new Date(),
    }, {
      where: { id: args.id },
      returning: true,
      plain: true
    }).then((result) => { result[1] }),

    /**
     * exclui exclui um registro de grupo, dado o id
     */
    deleteGrupo: (parent, { id }, { models }) => models.Grupo.destroy({
      where: {
        id
      }
    })
  }
}
