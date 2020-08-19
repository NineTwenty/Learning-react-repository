import { authAPI } from '../api/API';
import reducerRegistry from './reducerRegistery';

const SET_AUTH_USER = 'SET_AUTH_USER';
const FINISH_LOG_IN = 'FINISH_LOG_IN';

export function setAuthUser(user) {
  return {
    type: SET_AUTH_USER,
    user,
  };
}

export function finishLogin() {
  return {
    type: FINISH_LOG_IN,
  };
}

const initialState = {
  user: {
    avatar: 'https://loremflickr.com/48/48?r=1',
    dialogs: ['1', '2'],
    id: '4',
    lastOnlineTime: '15min ago',
    name: 'NineTwenty',
    online: true,
  },
  loggedIn: false,
};

const reducerName = 'authentication';

// Reducer

function authenticationReducer(state = initialState, action) {
  const { type, user } = action;

  switch (type) {
    case SET_AUTH_USER:
      return { ...state, user };
    case FINISH_LOG_IN:
      return { ...state, loggedIn: true };
    default:
      return state;
  }
}

// Registration

reducerRegistry.register(reducerName, authenticationReducer);

// Thunks

export const submitLoginForm = (login, password) => (dispatch) => {
  // Login request
  return authAPI
    .authLogin(login, password)
    .then(({ success, user, errors }) => {
      if (success) {
        // Cookie auth imitation workaround
        localStorage.setItem('userId', user.id);

        // On success set active user
        dispatch(setAuthUser(user));

        // Or return submission errors back to form
      } else return errors;
    });
};
