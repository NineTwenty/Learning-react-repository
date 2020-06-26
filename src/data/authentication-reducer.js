const SET_AUTH_USER = 'SET_AUTH_USER';

export function setAuthUserAC(user) {
  return {
    type: SET_AUTH_USER,
    user,
  };
}

function setAuthUser(state, { user }) {
  return { ...state, user };
}

const initialState = [];

function authentication(state = initialState, action) {
  switch (action.type) {
    case SET_AUTH_USER:
      return setAuthUser(state, action);
    default:
      return state;
  }
}

export default authentication;
