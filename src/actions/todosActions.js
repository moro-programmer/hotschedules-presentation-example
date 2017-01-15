/* @flow */
export const addTodo = (text: string): Object => ({ type: 'TODO:ADD', text });
export const clearCompleted = (): Object => ({ type: 'TODO:CLEAR_COMPLETED' });
export const setFilter = (filter: string): Object => ({ type: 'TODO:SET_FILTER', filter });
export const toggleTodo = (completed: boolean, id?: string): Object => ({
    type: 'TODO:TOGGLE_COMPLETED', completed, id
});
