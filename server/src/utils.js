
export const generateProntuaryNumber = async (models) => {
  const maxNumber = await models.Paciente.max('prontuario')
  const number = Number(maxNumber) + 1
  const digits = 4 - number.toString().length
  return '0'.repeat(digits).concat(number)
}