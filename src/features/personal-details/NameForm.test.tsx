import { getByRole, render, wait, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { top100Films } from './films';
import { NameForm, NameFormData, NameFormProps } from './NameForm';

describe('NameForm', () => {
  // render NameForm with props and return elements to test
  const arrange = (props: NameFormProps) => {
    const { getByTestId } = render(<NameForm {...props} films={{ state: 'hasValue', contents: top100Films }} />);

    const firstName = getByRole(getByTestId('firstName'), 'textbox');
    const lastName = getByRole(getByTestId('lastName'), 'textbox');
    const email = getByRole(getByTestId('email'), 'textbox');
    const dateOfBirth = getByRole(getByTestId('dateOfBirth'), 'textbox');
    const jokePreferenceRandom = getByRole(getByTestId('jokePreferenceRandom'), 'radio');
    const jokePreferenceDad = getByRole(getByTestId('jokePreferenceDad'), 'radio');
    const likeStuffYes = getByTestId('likeStuffYes');
    const likeStuffNo = getByTestId('likeStuffNo');
    const favouriteFilmAutocomplete = getByRole(getByTestId('favouriteFilmAutocomplete'), 'textbox');
    const favouriteFilmTextbox = getByRole(getByTestId('favouriteFilmTextbox'), 'textbox');
    const submit = getByTestId('submit');

    return {
      getByTestId,
      firstName,
      lastName,
      email,
      dateOfBirth,
      jokePreferenceRandom,
      jokePreferenceDad,
      likeStuffYes,
      likeStuffNo,
      favouriteFilmAutocomplete,
      favouriteFilmTextbox,
      submit,
    };
  };

  test('displays data', () => {
    const data: NameFormData = {
      firstName: 'Sam',
      lastName: 'Curry',
      email: 'sam.curry@abc.net',
      dateOfBirth: new Date('2000-12-12'),
      jokePreference: 'dad',
      likeStuff: 'yes',
      favouriteFilm: top100Films[1],
    };
    const { firstName, lastName, email, dateOfBirth, jokePreferenceDad, likeStuffYes, favouriteFilmTextbox } = arrange({
      ...data,
    });

    expect(firstName).toHaveProperty('value', data.firstName);
    expect(lastName).toHaveProperty('value', data.lastName);
    expect(email).toHaveProperty('value', data.email);
    expect(dateOfBirth).toHaveProperty('value', '12/12/2000');
    expect(jokePreferenceDad).toHaveProperty('checked', true);
    expect(likeStuffYes).toHaveClass('Mui-selected');
    expect(favouriteFilmTextbox).toHaveProperty('value', data.favouriteFilm);
  });

  test('returns form data supplied through props', async () => {
    const submitHandler = jest.fn();
    const data: NameFormData = {
      firstName: 'John',
      lastName: 'Smith',
      email: 'sam.curry@abc.net',
      dateOfBirth: new Date('2000-12-12'),
      jokePreference: 'dad',
      likeStuff: 'no',
      favouriteFilm: top100Films[1],
    };

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
    const data = {
      firstName: 'John',
      lastName: 'Smith',
      email: 'sam.curry@abc.net',
      dateOfBirth: new Date('2000-12-12'),
      jokePreference: 'dad',
      likeStuff: 'no',
      favouriteFilm: top100Films[1],
    };

    const elements = arrange({
      onSubmit: submitHandler,
    });

    userEvent.type(elements.firstName, data.firstName);
    userEvent.type(elements.lastName, data.lastName);
    userEvent.type(elements.email, data.email);
    userEvent.type(elements.dateOfBirth, '12/12/2000');
    userEvent.click(elements.jokePreferenceDad);
    userEvent.click(elements.likeStuffNo);
    userEvent.type(elements.favouriteFilmTextbox, data.favouriteFilm);
    fireEvent.keyDown(elements.favouriteFilmAutocomplete, { key: 'ArrowDown', code: 'ArrowDown' });
    fireEvent.keyDown(elements.favouriteFilmAutocomplete, { key: 'Enter', code: 'Enter' });
    userEvent.click(elements.submit);

    await wait(() => expect(submitHandler).toBeCalledTimes(1));
    const { dateOfBirth, ...rest } = submitHandler.mock.calls[0][0] as NameFormData;
    expect(data).toMatchObject(rest);
    expect(dateOfBirth?.toDateString()).toEqual(data.dateOfBirth.toDateString());
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
