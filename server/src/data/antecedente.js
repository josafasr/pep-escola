/**
 * @description Operações sobre a tabela de antecedentes
 * @module src/data/antecedente
 * @author Josafá Santos dos Reis
 */

 import db from '../models'
 import { formatErrors } from '../format-errors'

 export default {
   create: async (args) => {
     try {
       const result = await db.sequelize.transaction(async (tx) => {
         const antecedente = await db.Antecedente.create(args)
         return antecedente
       })
       return {
         ok: true,
         antecedente: result
       }
     } catch (error) {
       return {
         ok: false,
         errors: formatErrors(error, db)
       }
     }
   },

   findAll: async () => {
     try {
       const antecedentes = await db.Antecedente.findAll({
         include: {
           association: 'tipoAntecedente'
         }
       })
       return antecedentes
     } catch (error) {
       throw new Error(error)
     }
   }
 }