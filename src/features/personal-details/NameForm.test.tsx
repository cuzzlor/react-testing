import { getByRole, render, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { NameForm, NameFormData } from './NameForm';

describe('NameForm', () => {
  test('displays data', () => {
    const data: NameFormData = { firstName: 'Sam', lastName: 'Curry' };

    const { getByTestId } = render(<NameForm {...data} />);

    const firstName = getByRole(getByTestId('firstName'), 'textbox');
    const lastName = getByRole(getByTestId('lastName'), 'textbox');

    expect(firstName).toHaveProperty('value', data.firstName);
    expect(lastName).toHaveProperty('value', data.lastName);
  });

  test('returns form data', async () => {
    const submitHandler = jest.fn();
    const data: NameFormData = { firstName: 'John', lastName: 'Smith' };

    const { getByTestId } = render(
      <NameForm {...data} onSubmit={submitHandler} />
    );

    const submit = getByTestId('submit');
    userEvent.click(submit);

    await wait(() => expect(submitHandler).toBeCalledTimes(1));
    expect(submitHandler.mock.calls[0][0]).toEqual(data);
  });
});
