export const isEmpty = (object) => {
  let empty = true
  for (const key in object) {
    //console.log(object[key])
    if (object[key] !== '' && object[key] !== null && object[key] !== undefined) {
      empty = false
      break
    }
  }
  return empty
}
