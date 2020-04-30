/**
 * @file Operações sobre a tabela de apresentações de tipo de queixas
 * @module resolvers/tipo-queixa
 * @author Marcos Porto 
 */

const formatErrors = (e, models) => {
    if (e instanceof models.Sequelize.ValidationError) {
      return e.errors.map((x) => _.pick(x, ['path', 'message']))
    }
    return [{ path: 'erro', message: 'Algo deu errado!' }]
  }

  export default {
     Query: {

         /**
          * retorna todos os registros de tipo de queixa
          */
         tiposQueixa: (parent, args, { models }) => models.TipoQueixa.findAll(),
    
         /**
          * restorna um registro de tipo de queixa pelo id
          */
         tipoQueixa: (parent, { id }, { models }) => models.TipoQueixa.findByPk(id)
       },

      Mutation: {

        /**
         * cria um novo registro de tipo de queixa
         */
        createTipoQueixa: async(parent, args, {models}) =>{
            const TipoQueixa = await models.TipoQueixa.create({
                nome: args.nome,
                descricao: args.descricao,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            return TipoQueixa;
        },
        /**
         * atualiza um registro de tipo de queixa, dado o id
         */
        updateTipoQueixa: (parent, args, {models}) => models.TipoQueixa.update({
            nome: args.nome,
            descricao: args.descricao,
            updatedAt: new Date()
        }, {
            where: {
                id: args.id
            },
            returning: true,
            plain: true
          }).then((result) => { result[1] }),
    
        /**
         * exclui exclui um registro de tipo de queixa, dado o id
         */
        deleteTipoQueixa: (parent, { id }, { models }) => models.TipoQueixa.destroy({
          where: {
            id
          }
        })
      }  
  };