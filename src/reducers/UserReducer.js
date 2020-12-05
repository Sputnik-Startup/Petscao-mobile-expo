export function userReducer(state, action) {
  switch (action.type) {
    case '@user/SET_TOKEN':
      return { token: action.payload.token };
    case '@user/SET_USER':
      return { ...action.payload.user, token: state?.token };
    case '@user/SET_ALL':
      return { ...action.payload.user, token: action.payload.token };
    case '@user/REMOVE_ALL':
      return {};
    default:
      throw new Error();
  }
}
