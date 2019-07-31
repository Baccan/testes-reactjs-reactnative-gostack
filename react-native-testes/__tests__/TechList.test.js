import React from 'react';

import TechList from '~/components/TechList';

import { render, fireEvent } from '@testing-library/react-native';
import { escapeComponent } from 'uri-js';

describe('TechList', () => {
  it('should be able to add new tech', () => {
    const { getByText, getByTestId } = render(<TechList />);

    fireEvent.changeText(getAllByTestId('tech-input'), 'Node.js');
    fireEvent.press(getByText('Adicionar'));

    expect(getByText('Node.js')).toBeTruthy();
  })
})