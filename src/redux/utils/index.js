import { createAction } from '@reduxjs/toolkit';

// Form object of entities
// With their ids as keys

export function formByIdsList(entities) {
  return entities.reduce((arr, entity) => {
    return { ...arr, [entity.id]: entity };
  }, {});
}

// Map for loading/fetcing part of reducers

export const reducerLoadingMap = (thunk) => ({
  [thunk.pending]: () => true,
  [thunk.fulfilled]: () => false,
  [thunk.rejected]: () => false,
});

/**
 *
 * @param {string} entityName
 * @param {string} actionName
 * @returns {{ request: function, success: function, failure: function}} Actions created with createAction
 */

export const createLoadingActions = (entityName, actionName) => {
  const isNotString = (type) => typeof type !== 'string';

  if (isNotString(entityName) || isNotString(actionName)) {
    throw new Error(
      '[createLoadingActions]: An incorrect parameter was provided.'
    );
  }

  // Create object with actions
  return ['request', 'success', 'failure'].reduce((obj, status) => {
    // Assign new action to corresponding object key
    obj[status] = createAction(`${entityName}/${actionName}/${status}`);
    return obj;
  }, {});
};

export const createLoadingReducers = () => {
  const handleRequestStart = (state, action) => {
    if (state.status === 'idle') {
      return { ...state, status: 'pending' };
    }
  };

  const handleRequestEnd = (state, action) => {
    if (state.status === 'pending') {
      return { ...state, status: 'idle' };
    }
  };

  return { handleRequestStart, handleRequestEnd };
};

export const createLoadingMatchers = (entityName) => {
  const isStartOfRequest = ({ type }) =>
    type.startsWith(entityName) && type.endsWith('/request');
  const isEndOfRequest = ({ type }) =>
    type.startsWith(entityName) &&
    (type.endsWith('/success') || type.endsWith('/failure'));

  return { isStartOfRequest, isEndOfRequest };
};
