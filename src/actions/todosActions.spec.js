import { expect } from 'chai';
import * as actions from './todosActions';

describe('todos actions tests', () => {
    it('should create an add todo action', () => {
        expect(actions.addTodo('todo text')).to.deep.equal({
            type: 'TODO:ADD',
            text: 'todo text'
        });
    });

    it('should create a clear completed action', () => {
        expect(actions.clearCompleted()).to.deep.equal({
            type: 'TODO:CLEAR_COMPLETED'
        });
    });

    it('should create a set filter action', () => {
        expect(actions.setFilter('filterName')).to.deep.equal({
            type: 'TODO:SET_FILTER',
            filter: 'filterName'
        });
    });

    it('should create a toggle todo action with completed true and without id', () => {
        expect(actions.toggleTodo(true)).to.deep.equal({
            type: 'TODO:TOGGLE_COMPLETED',
            completed: true,
            id: undefined
        });
    });

    it('should create a toggle todo action with completed false and with id', () => {
        expect(actions.toggleTodo(false, '98432')).to.deep.equal({
            type: 'TODO:TOGGLE_COMPLETED',
            completed: false,
            id: '98432'
        });
    });
});
