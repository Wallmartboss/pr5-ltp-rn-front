export const selectColumns = state => state.columns.columns;
export const selectIsModalOpen = state => state.columns.isModalOpen;
export const selectSelectedFilter = state => state.columns.selectedFilter;
export const selectIsFiltersOpen = state => state.columns.isFiltersOpen;
export const selectEditModalOpen = state => state.columns.isEditModalOpen;
export const selectColumnToEdit = state => state.columns.columnToEdit;
export const selectIsDeleteModalOpen = state => state.columns.isDeleteModalOpen;
export const selectColumnToDelete = state => state.columns.columnToDelete;
export const selectIsLoading = state => state.columns.isLoading;
export const selectIsError = state => state.columns.isError;
export const selectCardsByColumnId = (state, columnId) => {
  const column = state.columns.columns.find(column => column._id === columnId);
  return column ? column.cards : [];
};
export const selectColumnsByBoardId = (state, boardId) => {
  return (
    state.columns.columns.filter(column => column.boardId === boardId) || []
  );
};
