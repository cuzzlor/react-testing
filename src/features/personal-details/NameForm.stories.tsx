import React from 'react';
import { NameForm, NameFormProps, NameFormData } from './NameForm';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Container } from '@material-ui/core';

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

export const Filled = Template.bind({});
Filled.args = { onSubmit, firstName: 'John', lastName: 'Smith' };