import _ from 'lodash'

export const formatErrors = (e, models) => {
  if (e.errors && e.errors.length > 0 && (e instanceof models.Sequelize.ValidationError)) {
    return e.errors.map((x) => _.pick(x, ['path', 'message']))
  }
  return [{ path: e.name, message: e.message }]
}