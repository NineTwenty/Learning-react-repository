import { dialogsAPI } from '../api/API';

const FETCH_DIALOGS_MEMBERS_PENDING = 'FETCH_DIALOGS_MEMBERS_PENDING';
const FETCH_DIALOGS_MEMBERS_SUCCESS = 'DFETCH_DIALOGS_MEMBERS_SUCCESS';
const FETCH_DIALOGS_MEMBERS_FAILURE = 'FETCH_DIALOGS_MEMBERS_FAILURE';

const fetchDialogsMembersPending = () => ({
  type: FETCH_DIALOGS_MEMBERS_PENDING,
});

const fetchDialogsMembersSuccess = (members) => ({
  type: FETCH_DIALOGS_MEMBERS_SUCCESS,
  members,
});

const fetchDialogsMembersFailure = (error) => ({
  type: FETCH_DIALOGS_MEMBERS_FAILURE,
  error,
});

// Members fetch thunk
export const getMembers = () => (dispatch) => {
  dispatch(fetchDialogsMembersPending());

  dialogsAPI.fetchMembers().then((members) => {
    dispatch(fetchDialogsMembersSuccess(members));
  });
};

const initialState = {
  members: null,
  isFetching: false,
  isLoaded: false,
  error: null,
};

function membersList(state = initialState, action) {
  switch (action.type) {
    case FETCH_DIALOGS_MEMBERS_PENDING:
      return { ...state, isFetching: true };
    case FETCH_DIALOGS_MEMBERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLoaded: true,
        members: action.members,
      };
    case FETCH_DIALOGS_MEMBERS_FAILURE:
      return { ...state, isFetching: false, error: action.error };
    default:
      return state;
  }
}

export default membersList;
