import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import ToggleLink from './index';

describe('component <ToggleLink />', () => {
    it('should have link with text', () => {
        const wrapper = shallow(<ToggleLink text='Simple link' />);
        expect(wrapper.find('a').text()).to.equal('Simple link');
    });
});
