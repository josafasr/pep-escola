import { LOAD_DATA, UPDATE_FIELD, RESET } from "./types"

export const updateField = (name, value) => {
  return {
    type: UPDATE_FIELD,
    name,
    value
  }
}

export const loadData = (data) => {
  return {
    type: LOAD_DATA,
    payload: data
  }
}

export const reset = () => {
  return {
    type: RESET
  }
}