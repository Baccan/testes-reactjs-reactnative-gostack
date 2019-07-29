import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { render, fireEvent, cleanup } from '@testing-library/react';

import { addTech } from '~/store/modules/techs/actions';
import TechList from '~/components/TechList';

jest.mock('react-redux');

describe('TechList component', () => {
  it('should render tech list', () => {
    // const techs = useSelector(state => state.techs); =>> recebe um callback, executa-o e verifica o array
    useSelector.mockImplementation(cb => cb({
      techs: ['Node.js', 'ReactJS']
    }));

    const { getByTestId, getByText, debug } = render(<TechList />);

    // debug();

    expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
    expect(getByTestId('tech-list')).toContainElement(getByText('ReactJS'));
  });

  it('shpuld be able to add new tech', () => {
    const { getByTestId, getByLabelText } = render(<TechList />);

    // substituir o retorno do dispatch comum pelo retorno do mock
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    fireEvent.change(getByLabelText('Tech'), { target: { value: 'Node.js' } });
    fireEvent.submit(getByTestId('tech-form'));

    console.log(dispatch.mock.cals);

    // expect(dispatch).toHaveBeenCalledWith({
    //   type: 'ADD_TECH',
    //   payload: { tech: 'Node.js' }
    // });
    expect(dispatch).toHaveBeenCalledWith(addTech('Node.js'));
  });

  // TESTE EM FORMULÁRIO
  // beforeEach(() => {
  //   localStorage.clear();
  // });

  // it('should be able to add new tech', () => {
  //   // getBytestId = <ul data-testid="tech-list"></ul> // por exemplo
  //   const { getByText, getByTestId, getByLabelText } = render(<TechList />);

  //   // change = <input onChange={e => e.target.value} />
  //   // getByLabelText = label com htmlFor="tech" e um input com id="tech"
  //   fireEvent.change(getByLabelText('Tech'), { target: { value: 'Node.js' } });
  //   fireEvent.submit(getByTestId('tech-form'));

  //   // fireEvent.click(getByText('Adicionar'));

  //   expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
  //   expect(getByLabelText('Tech')).toHaveValue('');
  // });

  // it('should store techs in storage', () => {
  //   let { getByTestId, getByLabelText, getByText } = render(<TechList />);

  //   fireEvent.change(getByLabelText('Tech'), { target: { value: 'Node.js' } });
  //   fireEvent.submit(getByTestId('tech-form'));
    
  //   // Limpa DOM para
  //   cleanup();

  //   // (desestrutuação) = parenteses por volta permite reutilizar a desestruturação após a declaração da variável
  //   ({ getByTestId, getByLabelText, getByText } = render(<TechList />));

  //   expect(localStorage.setItem).toHaveBeenCalledWith('techs', JSON.stringify(['Node.js']));
  //   expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
  // });
});