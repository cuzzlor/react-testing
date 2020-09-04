import {
  Button,
  Grid,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';

export type JokePreference = 'dad' | 'random';
export interface NameFormData {
  firstName?: string;
  lastName?: string;
  jokePreference?: JokePreference;
}
export interface NameFormHandlers {
  onSubmit?: (data: NameFormData) => void | Promise<void>;
  onJokePreferenceChanged?: (value: JokePreference) => void | Promise<void>;
}
export interface NameFormReferenceData {
  sampleJoke?: string;
}
export type NameFormProps = NameFormData & NameFormHandlers & NameFormReferenceData;

export function NameForm({
  firstName,
  lastName,
  jokePreference,
  sampleJoke,
  onSubmit = () => void 0,
  onJokePreferenceChanged = () => void 0,
}: NameFormProps) {
  const { register, handleSubmit, errors, formState, control } = useForm<NameFormData>({
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
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">What kind of jokes do you like?</FormLabel>
            <Controller
              as={RadioGroup}
              control={control}
              row
              aria-label="jokePreference"
              name="jokePreference"
              defaultValue={jokePreference}
            >
              <FormControlLabel value="random" control={<Radio />} label="Random" />
              <FormControlLabel value="dad" control={<Radio />} label="Dad Jokes" />
            </Controller>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          {sampleJoke || ''}
        </Grid>
        <Grid item xs={12} container justify="flex-end">
          <Button type="submit" variant="contained" disabled={!formState.isValid} data-testid="submit">
            Next
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
