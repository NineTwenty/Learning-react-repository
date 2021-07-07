import { Reducer } from 'redux';

class ReducerRegistry {
  _emitChange: null | Function;
  _reducers: { [key: string]: Reducer };
  
  constructor() {
    this._emitChange = null;
    this._reducers = {};
  }

  getReducers() {
    return { ...this._reducers };
  }

  register(name: string, reducer: Reducer) {
    this._reducers = { ...this._reducers, [name]: reducer };
    if (this._emitChange) {
      this._emitChange(this.getReducers());
    }
  }

  setChangeListener(listener: Function) {
    this._emitChange = listener;
  }
}

const reducerRegistry = new ReducerRegistry();
export default reducerRegistry;