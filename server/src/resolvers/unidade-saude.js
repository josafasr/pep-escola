/**
 * @file Operações sobre a tabela de apresentações de Unidades de saúde
 * @module resolvers/unidade-saude
 * @author Marcos Porto 
 */

const formatErrors = (e, models) => {
  if (e instanceof models.Sequelize.ValidationError) {
    return e.errors.map((x) => _.pick(x, ['path', 'message']))
  }
  return [{ path: 'erro', message: 'Algo deu errado!' }]
}

 export default {

    // retorna todos as Unidades de saúde
    // Query: {
    //         UnidadeSaude: ( parents, args, {models}) => models.UnidadeSaude.findAll({
    //             include: [
    //                 {
    //                     as: 'paciente',
    //                     model: models.Paciente
    //                 }
    //             ]
    //         }),

    //  // busca unidadeSaude pelo código
    //  UnidadeSaude: (parent, { id }, { models }) => models.UnidadeSaude.findByPk(id, {
    //      include: [
    //          {
    //             as: 'paciente',
    //             model: models.Paciente 
    //          }
    //      ]
    //  })
    // },

    Mutation: {
        // cria um novo unidadeSaude
        createUnidadeSaude: async (parent, args, { models }) => {
          const unidadeSaude = await models.UnidadeSaude.create({
            nome: args.nome,
            cnes: args.cnes,
            createdAt: new Date(),
            updatedAt: new Date()
          })
          return unidadeSaude;
        },

        // atualiza dados do UnidadeSaude
        updateUnidadeSaude: (parent, args, { models }) => models.UnidadeSaude.update({
            nome: args.nome,
            cnes: args.cnes,
            updatedAt: new Date(),
          }, {
            where: {
              id: args.id
            },
            returning: true,
            plain: true
          }).then((result) => { result[1] }),
        
            // exclui o UnidadeSaude
            deleteUnidadeSaude: (parent, { id }, { models }) => models.UnidadeSaude.destroy({
            where: {
            id
            }
          })    
        }
    };