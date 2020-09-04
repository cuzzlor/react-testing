import { getByRole, render, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { NameForm, NameFormData, NameFormProps } from './NameForm';

describe('NameForm', () => {
  // render NameForm with props and return elements to test
  const arrange = (props: NameFormProps) => {
    const { getByTestId } = render(<NameForm {...props} />);

    const firstName = getByRole(getByTestId('firstName'), 'textbox');
    const lastName = getByRole(getByTestId('lastName'), 'textbox');
    const submit = getByTestId('submit');

    return { getByTestId, firstName, lastName, submit };
  };

  test('displays data', () => {
    const data: NameFormData = { firstName: 'Sam', lastName: 'Curry' };
    const { firstName, lastName } = arrange({ ...data });

    expect(firstName).toHaveProperty('value', data.firstName);
    expect(lastName).toHaveProperty('value', data.lastName);
  });

  test('returns form data supplied through props', async () => {
    const submitHandler = jest.fn();
    const data: NameFormData = { firstName: 'John', lastName: 'Smith' };

    const { submit } = arrange({
      firstName: data.firstName,
      lastName: data.lastName,
      onSubmit: submitHandler,
    });

    userEvent.click(submit);

    await wait(() => expect(submitHandler).toBeCalledTimes(1));
    expect(submitHandler.mock.calls[0][0]).toEqual(data);
  });

  test('accepts and returns form input', async () => {
    const submitHandler = jest.fn();
    const data = { firstName: 'John', lastName: 'Smith' };

    const { firstName, lastName, submit } = arrange({
      firstName: data.firstName,
      lastName: data.lastName,
      onSubmit: submitHandler,
    });

    userEvent.type(firstName, data.firstName);
    userEvent.type(lastName, data.lastName);
    userEvent.click(submit);

    await wait(() => expect(submitHandler).toBeCalledTimes(1));
    expect(submitHandler.mock.calls[0][0]).toEqual(data);
  });

  test('prevents partial submission', async () => {
    const firstNameText = 'William';
    const submitHandler = jest.fn();

    const { firstName, lastName, submit } = arrange({
      firstName: firstNameText,
      onSubmit: submitHandler,
    });

    // enter only first name, not last name
    userEvent.type(firstName, firstNameText);

    // first name should be filled, last name empty, submit button disabled
    await wait(() => expect(firstName).toHaveProperty('value', firstNameText));
    expect(lastName).toBeEmpty();
    expect(submit).toBeDisabled();

    // click of disabled submit button should do nothing
    userEvent.click(submit);
    await wait(() => expect(submitHandler).toBeCalledTimes(0));
  });
});
