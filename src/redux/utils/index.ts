import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  Action,
  createAction,
} from '@reduxjs/toolkit';
import { StatusState } from './utils.types';

type CreateLoadingActions = {
  (entityName: string, actionName: string): {
    request: ActionCreatorWithoutPayload;
    success: ActionCreatorWithoutPayload;
    failure: ActionCreatorWithoutPayload;
  };
  <T>(entityName: string, actionName: string): {
    request: ActionCreatorWithoutPayload;
    success: ActionCreatorWithPayload<T>;
    failure: ActionCreatorWithoutPayload;
  };
};

/**
 * Utility for generating set of action creators for part of
 * the state responsible for loading.
 * Can be provided with generic `type` for corresponding
 * payload of succes action.
 */
export const createLoadingActions: CreateLoadingActions = (
  entityName: string,
  actionName: string
) => {
  const isNotString = (type: string) => typeof type !== 'string';

  if (isNotString(entityName) || isNotString(actionName)) {
    throw new Error(
      '[createLoadingActions]: An incorrect parameter was provided.'
    );
  }

  return {
    request: createAction(`${entityName}/${actionName}/request`),
    success: createAction(`${entityName}/${actionName}/success`),
    failure: createAction(`${entityName}/${actionName}/failure`),
  };
};

/**
 * Create set of reducers for handling change of loading state
 */

export const createLoadingReducers = <T extends StatusState>() => {
  const handleRequestStart = (state: T) => {
    if (state.status === 'idle') {
      return { ...state, status: 'pending' };
    }
  };

  const handleRequestEnd = (state: T) => {
    if (state.status === 'pending') {
      return { ...state, status: 'idle' };
    }
  };

  return { handleRequestStart, handleRequestEnd };
};

/**
 * Create matchers for redux-toolkit `builder`
 */

export const createLoadingMatchers = (entityName: string) => {
  const isStartOfRequest = ({ type }: Action<string>) =>
    type.startsWith(entityName) && type.endsWith('/request');
  const isEndOfRequest = ({ type }: Action<string>) =>
    type.startsWith(entityName) &&
    (type.endsWith('/success') || type.endsWith('/failure'));

  return { isStartOfRequest, isEndOfRequest };
};
