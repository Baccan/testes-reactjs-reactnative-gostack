import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import TechList from '~/components/TechList';

describe('TechList component', () => {
  it('should be able to add new tech', () => {
    // getBytestId = <ul data-testid="tech-list"></ul> // por exemplo
    const { getByText, getByTestId, getByLabelText } = render(<TechList />);

    // change = <input onChange={e => e.target.value} />
    // getByLabelText = label com htmlFor="tech" e um input com id="tech"
    fireEvent.change(getByLabelText('Tech'), { target: { value: 'Node.js' } });
    fireEvent.submit(getByTestId('tech-form'));

    // fireEvent.click(getByText('Adicionar'));

    expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
    expect(getByLabelText('Tech')).toHaveValue('');
  });
});