import { getByRole, render, wait, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { NameForm, NameFormData, NameFormProps } from './NameForm';

describe('NameForm', () => {
  // render NameForm with props and return elements to test
  const arrange = (props: NameFormProps) => {
    const { getByTestId } = render(<NameForm {...props} />);

    const firstName = getByRole(getByTestId('firstName'), 'textbox');
    const lastName = getByRole(getByTestId('lastName'), 'textbox');
    const jokePreferenceRandom = getByRole(getByTestId('jokePreferenceRandom'), 'radio');
    const jokePreferenceDad = getByRole(getByTestId('jokePreferenceDad'), 'radio');
    const likeStuffYes = getByTestId('likeStuffYes');
    const likeStuffNo = getByTestId('likeStuffNo');
    const submit = getByTestId('submit');

    return {
      getByTestId,
      firstName,
      lastName,
      jokePreferenceRandom,
      jokePreferenceDad,
      likeStuffYes,
      likeStuffNo,
      submit,
    };
  };

  test('displays data', () => {
    const data: NameFormData = { firstName: 'Sam', lastName: 'Curry' };
    const { firstName, lastName } = arrange({ ...data });

    expect(firstName).toHaveProperty('value', data.firstName);
    expect(lastName).toHaveProperty('value', data.lastName);
  });

  test('returns form data supplied through props', async () => {
    const submitHandler = jest.fn();
    const data: NameFormData = { firstName: 'John', lastName: 'Smith', jokePreference: 'dad', likeStuff: 'no' };

    const { submit } = arrange({
      ...data,
      onSubmit: submitHandler,
    });

    act(() => {
      userEvent.click(submit);
    });

    await wait(() => expect(submitHandler).toBeCalledTimes(1));
    expect(submitHandler.mock.calls[0][0]).toEqual(data);
  });

  test('accepts and returns form input', async () => {
    const submitHandler = jest.fn();
    const data = { firstName: 'John', lastName: 'Smith', jokePreference: 'dad', likeStuff: 'no' };

    const { firstName, lastName, jokePreferenceDad, likeStuffNo, submit } = arrange({
      onSubmit: submitHandler,
    });

    act(() => {
      userEvent.type(firstName, data.firstName);
      userEvent.type(lastName, data.lastName);
      userEvent.click(jokePreferenceDad);
      userEvent.click(likeStuffNo);
      userEvent.click(submit);
    });

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

    // first name should be filled, last name empty
    await wait(() => expect(firstName).toHaveProperty('value', firstNameText));
    expect(lastName).toBeEmpty();

    // click of disabled submit button should do nothing
    userEvent.click(submit);
    await wait(() => expect(submitHandler).toBeCalledTimes(0));
  });
});
