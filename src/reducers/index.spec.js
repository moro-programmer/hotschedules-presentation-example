import { expect } from 'chai';
import combineReducers from './index';

describe('combine reducerstests', () => {
    it('should return empty state with todos', () => {
        expect(combineReducers().todos).to.not.be.undefined;
    });
});
