import { expect } from 'chai';
import { List, Map } from 'immutable';
import todosReducer from './todosReducer';
import { SHOW_ALL, SHOW_COMPLETED } from '../constants/filters';

describe('todos reducer tests', () => {
    let todos = List();
    todos = todos.push(Map({
        id: '1',
        text: 'text1',
        completed: false
    }));

    todos = todos.push(Map({
        id: '2',
        text: 'text2',
        completed: true
    }));

    todos = todos.push(Map({
        id: '3',
        text: 'text3',
        completed: true
    }));

    const state = {
        items: todos
    };

    it('should return default state', () => {
        const result = todosReducer();
        expect(result.items.size).to.equal(0);
        expect(result.visibilityFilter).to.equal(SHOW_ALL);
    });

    it('should return store with a new todo', () => {
        const result = todosReducer(undefined, { type: 'TODO:ADD', text: 'todo text' });
        expect(result.items.size).to.equal(1);
        expect(result.items.toJS()[0].text).to.equal('todo text');
    });

    it('should return store without completed todos', () => {
        const result = todosReducer(state, { type: 'TODO:CLEAR_COMPLETED' });
        expect(result.items.size).to.equal(1);
        expect(result.items.toJS()[0].text).to.equal('text1');
    });

    it('should return store without completed todos', () => {
        const result = todosReducer(state, { type: 'TODO:CLEAR_COMPLETED' });
        expect(result.items.size).to.equal(1);
        expect(result.items.toJS()[0].text).to.equal('text1');
    });


    it('should mark completed/not completed all todos', () => {
        let result = todosReducer(state, { type: 'TODO:TOGGLE_COMPLETED', completed: true });
        expect(result.items.filter(item => item.get('completed')).size).to.equal(3);

        result = todosReducer(state, { type: 'TODO:TOGGLE_COMPLETED', completed: false });
        expect(result.items.filter(item => !item.get('completed')).size).to.equal(3);
    });

    it('should mark completed/not completed one todo', () => {
        let result = todosReducer(state, {
            type: 'TODO:TOGGLE_COMPLETED',
            completed: true,
            id: '1'
        });
        expect(result.items.find(item => item.get('id') === '1').get('completed')).to.equal(true);

        result = todosReducer(state, {
            type: 'TODO:TOGGLE_COMPLETED',
            completed: false,
            id: '1'
        });
        expect(result.items.find(item => item.get('id') === '1').get('completed')).to.equal(false);
    });

    it('should change visibility filter', () => {
        const result = todosReducer(state, { type: 'TODO:SET_FILTER', filter: SHOW_COMPLETED });
        expect(result.visibilityFilter).to.equal(SHOW_COMPLETED);
    });
});
