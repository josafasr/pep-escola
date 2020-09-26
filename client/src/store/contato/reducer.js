const { UPDATE_FIELD, LOAD_DATA, RESET } = require("./types");

const initialState = {
  celular: '',
  telefone: '',
  email: ''
}

const contatoReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FIELD: return {
      ...state,
      [action.name]: action.value
    }
    case LOAD_DATA: return action.payload
    case RESET:
      return state
    default:
      return state
  }
}

export default contatoReducer