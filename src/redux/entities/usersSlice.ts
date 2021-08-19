import { createEntityAdapter, createSlice, EntityId } from '@reduxjs/toolkit';
import { api } from 'api/API';
import { isTokenExpireResponse } from 'api/APIUtils';
import { RootState } from 'redux/store';
import { User } from 'common/entities.types';
import {
  createLoadingActions,
  createLoadingMatchers,
  createLoadingReducers,
} from 'redux/utils';
import { StatusState } from 'redux/utils/utils.types';
import { logout } from 'redux/common/actions';

const sliceName = 'users';

// Adapter
const adapter = createEntityAdapter<User>();

// Initial state
const initialState = adapter.getInitialState<StatusState>({ status: 'idle' });

// State type
type UserState = typeof initialState;

// Loading reducers
const { handleRequestStart, handleRequestEnd } =
  createLoadingReducers<UserState>();
// Loading matchers
const { isStartOfRequest, isEndOfRequest } = createLoadingMatchers(sliceName);

// Actions
const getRequest = createLoadingActions<User[]>(sliceName, 'get');
const submitRequest = createLoadingActions<User>(sliceName, 'submit');

// Slice

const usersSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    addOne: adapter.addOne,
    addMany: adapter.addMany,
    setAll: adapter.setAll,
    removeOne: adapter.removeOne,
    removeMany: adapter.removeMany,
    updateOne: adapter.updateOne,
    updateMany: adapter.updateMany,
    upsertOne: adapter.upsertOne,
    upsertMany: adapter.upsertMany,
  },
  extraReducers: (builder) => {
    // setAll payload of 'success' get action
    builder.addCase(getRequest.success, adapter.addMany);
    builder.addCase(submitRequest.success, adapter.addOne);
    builder.addMatcher(isStartOfRequest, handleRequestStart);
    builder.addMatcher(isEndOfRequest, handleRequestEnd);
  },
});

// Registration data
export const usersReducer = usersSlice.reducer;
export const usersSliceName = usersSlice.name;

// Exported actions

export const addUser = usersSlice.actions.addOne;
export const addUsers = usersSlice.actions.addMany;

// Thunks

export const fetchUsers = () => async (dispatch: any) => {
  dispatch(getRequest.request());
  try {
    const { users } = await api.get('users');
    dispatch(getRequest.success(users));
  } catch (error) {
    if (isTokenExpireResponse(error)) {
      dispatch(getRequest.failure());
      dispatch(logout());
    }
  }
};

export const submitUser = (newUser: User) => async (dispatch: any) => {
  dispatch(submitRequest.request());
  try {
    const { user } = await api.post('users', newUser);
    dispatch(submitRequest.success(user));
  } catch (error) {
    if (isTokenExpireResponse(error)) {
      dispatch(submitRequest.failure());
      dispatch(logout());
    }
  }
};

// Selectors

const { selectIds, selectById, selectEntities } = adapter.getSelectors(
  (state: RootState): UserState => state.entities[sliceName]
);

export const selectUsersIds = (state: RootState) => selectIds(state);

export const selectUserById = (id: EntityId | undefined) => (state: RootState) => {
  if (id) {
    return selectById(state, id);
  }
};

export const selectUsersByIds = (ids: EntityId[]) => (state: RootState) => {
  const entities = selectEntities(state);

  return ids.map((id) => entities[id]).filter(Boolean) as User[];
};
