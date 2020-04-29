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

  export default{

    // retorna todos as Queixa
    // Query: {
    //         Queixa: ( parents, args, {models}) => models.Queixa.findAll({
    //             include: [
    //                 {
    //                     as: 'consulta_queixa',
    //                     model: models.ConsultaQueixa
    //                 }
    //             ]
    //         }),

    //  // busca queixa pelo código
    //  Queixa: (parent, { id }, { models }) => models.Queixa.findByPk(id, {
    //      include: [
    //          {
    //             as: 'consulta_queixa',
    //             model: models.ConsultaQueixa 
    //          }
    //      ]
    //  })
    // },

    Mutation: {
        // cria uma nova Queixa
        createQueixa: async(parent, args, {models}) =>{
            const Queixa = await models.Queixa.create({
                nome: args.nome,
                tipoQueixaId: args.tipoQueixaId,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            return Queixa;
        },

        // atualiza dados da Queixa
        updateQueixa: (parent, args, {models}) => models.Queixa.update({
            nome: args.nome,
            tipoQueixaId: args.tipoQueixaId,
            updatedAt: new Date()
        }, {
            where: {
                id: args.id
            },
            returning: true,
            plain: true
          }).then((result) => { result[1] }),

        // exclui a Queixa
        deleteQueixa: (parent, { id }, { models }) => models.Queixa.destroy({
            where: {
            id
            }
          })    
        }

        
  };