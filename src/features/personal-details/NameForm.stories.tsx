import React from 'react';
import { NameForm, NameFormProps, NameFormData } from './NameForm';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Container } from '@material-ui/core';
import { top100Films } from './films';

export default {
  title: 'NameForm',
  component: NameForm,
} as Meta;

const Template: Story<NameFormProps> = (args) => (
  <Container maxWidth="xs">
    <NameForm {...args} />
  </Container>
);

// display the form data in an alert
const onSubmit = (data: NameFormData) => alert('data: ' + JSON.stringify(data));

export const Empty = Template.bind({});
Empty.args = { onSubmit };

export const FilledPartial = Template.bind({});
FilledPartial.args = { onSubmit, firstName: 'Mary', lastName: 'McDonald' };

export const Filled = Template.bind({});
Filled.args = {
  onSubmit,
  firstName: 'Kid',
  lastName: 'Junior',
  email: 'kid.junior@school.net',
  dateOfBirth: new Date('2000-06-24'),
  jokePreference: 'random',
  likeStuff: 'yes',
  favouriteFilm: top100Films[1],
};

export const FilledDad = Template.bind({});
FilledDad.args = {
  onSubmit,
  firstName: 'Old',
  lastName: 'McDonald',
  email: 'old.mcdonald@yahoo.com',
  dateOfBirth: new Date('1970-02-28'),
  jokePreference: 'dad',
  likeStuff: 'no',
  favouriteFilm: top100Films[9],
};
