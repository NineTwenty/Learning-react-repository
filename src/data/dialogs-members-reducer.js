import { dialogsAPI } from '../api/API';

const FETCH_DIALOGS_MEMBERS_PENDING = 'FETCH_DIALOGS_MEMBERS_PENDING';
const FETCH_DIALOGS_MEMBERS_SUCCESS = 'DFETCH_DIALOGS_MEMBERS_SUCCESS';
const FETCH_DIALOGS_MEMBERS_FAILURE = 'FETCH_DIALOGS_MEMBERS_FAILURE';

const fetchDialogsMembersPending = () => ({
  type: FETCH_DIALOGS_MEMBERS_PENDING,
});

export const fetchDialogsMembersSuccess = (members) => ({
  type: FETCH_DIALOGS_MEMBERS_SUCCESS,
  members,
});

const fetchDialogsMembersFailure = (error) => ({
  type: FETCH_DIALOGS_MEMBERS_FAILURE,
  error,
});

const initialState = {
  members: null,
  isFetching: false,
  isLoaded: false,
  error: null,
};

export const reducerName = 'membersList';

// Reducer

function membersListReducer(state = initialState, action) {
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

export const selectUserById = (id) => (state) =>
  state.dialogsPage.membersList.members.find((member) => member.id === id);

export default membersListReducer;
