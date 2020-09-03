import { Button, Grid, TextField } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';

export interface NameFormData {
  firstName?: string;
  lastName?: string;
}
export interface NameFormHandlers {
  onSubmit?: (data: NameFormData) => void | Promise<void>;
}
export type NameFormProps = NameFormData & NameFormHandlers;

export function NameForm({
  firstName,
  lastName,
  onSubmit = () => void 0,
}: NameFormProps) {
  const { register, handleSubmit, errors, formState } = useForm<NameFormData>({
    mode: 'all',
  });

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            name="firstName"
            label="First Name"
            fullWidth
            defaultValue={firstName}
            inputRef={register({
              required: { value: true, message: 'First Name is required' },
            })}
            error={!!errors.firstName}
            helperText={errors.firstName?.message || ''}
            data-testid="firstName"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="lastName"
            label="Last Name"
            fullWidth
            defaultValue={lastName}
            inputRef={register({
              required: { value: true, message: 'Last Name is required' },
            })}
            error={!!errors.lastName}
            helperText={errors.lastName?.message || ''}
            data-testid="lastName"
          />
        </Grid>
        <Grid item xs={12} container justify="flex-end">
          <Button
            type="submit"
            variant="contained"
            disabled={!formState.isValid}
            data-testid="submit"
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
