import { expect } from 'chai';
import { List, Map } from 'immutable';
import { getVisibleTodos } from './todoSelectors';
import * as filters from '../constants/filters';

describe('todos selectors tests', () => {
    let todos = List();
    todos = todos.push(Map({
        id: String(Date.now()),
        text: 'text1',
        completed: false
    }));

    todos = todos.push(Map({
        id: String(Date.now()),
        text: 'text2',
        completed: true
    }));

    todos = todos.push(Map({
        id: String(Date.now()),
        text: 'text3',
        completed: true
    }));

    const state = {
        todos: {
            items: todos
        }
    };

    it('should return all todos', () => {
        state.todos.visibilityFilter = filters.SHOW_ALL;
        expect(getVisibleTodos(state).size).to.equal(3);
    });

    it('should return all todos (fake filter)', () => {
        state.todos.visibilityFilter = 'FAKE_FILTER';
        expect(getVisibleTodos(state).size).to.equal(3);
    });

    it('should return completed todos', () => {
        state.todos.visibilityFilter = filters.SHOW_COMPLETED;
        expect(getVisibleTodos(state).size).to.equal(2);
    });

    it('should return not completed todos', () => {
        state.todos.visibilityFilter = filters.SHOW_ACTIVE;
        expect(getVisibleTodos(state).size).to.equal(1);
    });
});
