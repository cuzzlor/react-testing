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

  test('returns form data supplied via props', async () => {
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

  test('accepts and returns user input', async () => {
    const submitHandler = jest.fn();
    const data = { firstName: 'John', lastName: 'Smith' };

    const { getByTestId } = render(<NameForm onSubmit={submitHandler} />);

    const firstName = getByRole(getByTestId('firstName'), 'textbox');
    const lastName = getByRole(getByTestId('lastName'), 'textbox');
    const submit = getByTestId('submit');

    userEvent.type(firstName, data.firstName);
    userEvent.type(lastName, data.lastName);
    userEvent.click(submit);

    await wait(() => expect(submitHandler).toBeCalledTimes(1));
    expect(submitHandler.mock.calls[0][0]).toEqual(data);
  });

  test('prevents partial submission', async () => {
    const firstNameText = 'William';
    const submitHandler = jest.fn();
    const { getByTestId } = render(<NameForm onSubmit={submitHandler} />);

    const firstName = getByRole(getByTestId('firstName'), 'textbox');
    const lastName = getByRole(getByTestId('lastName'), 'textbox');
    const submit = getByTestId('submit');

    // enter only first name (not last name)
    userEvent.type(firstName, firstNameText);

    // first name should be filled, last name empty, submit button disabled
    await wait(() => expect(firstName).toHaveProperty('value', firstNameText));
    expect(lastName).toBeEmpty();
    expect(submit).toBeDisabled();

    // click of submit button should do nothing
    userEvent.click(submit);
    await wait(() => expect(submitHandler).toBeCalledTimes(0));
  });
});
