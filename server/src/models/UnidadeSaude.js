/**
 * @description Mapeamento da tabela de Unidades de saúde
 * @module src/models/UnidadeSaude
 * @author Marcos Porto
 */

import { v4 as uuid } from 'uuid'

export default (sequelize, DataTypes) => {
    const UnidadeSaude = sequelize.define('UnidadeSaude', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      nome: {
          type: DataTypes.STRING,
          validate: {
            len: {
              args: [3, 100],
              msg: 'O nome da unidade de saúde deve ter no mínimo 3 carateres'
            }
          }
      },
      cnes: {
          type: DataTypes.STRING,
          validate: {
            len: {
              args: [11, 11],
              msg: 'O nome da cnes deve ter 11 carateres'
            }
          }
      }
    }, 
    {
      tableName: 'ceuas_unidade_saude',
      hooks: {
        beforeCreate: async (unidadeSaude) => {
          if (!unidadeSaude.id) {
            const id = await Promise.resolve(uuid())
            unidadeSaude.id = id
          }
        }
      }
    })

    UnidadeSaude.associate = (models) => {
    /**
    * Relacionamento com a tabela de paciente
    * @see {@link Paciente}
    */
      UnidadeSaude.hasMany(models.Paciente, {
          as:'pacientes',
          foreignKey: 'unidadeSaudeId'
      })
    }
    return UnidadeSaude
 }