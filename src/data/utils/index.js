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
