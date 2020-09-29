import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FavouriteFilmAutocomplete } from './FavouriteFilmAutocomplete';
import { top100Films } from './films';

export type JokePreference = 'dad' | 'random';
export type YesNo = 'yes' | 'no';
export interface NameFormData {
  firstName?: string;
  lastName?: string;
  favouriteFilm?: string;
  jokePreference?: JokePreference | null;
  likeStuff?: YesNo | null;
}
export interface NameFormHandlers {
  onSubmit?: (data: NameFormData) => void | Promise<void>;
  onJokePreferenceChanged?: (value: JokePreference | null) => void | Promise<void>;
}
export interface NameFormReferenceData {
  sampleJoke?: string | null;
}
export type NameFormProps = NameFormData & NameFormHandlers & NameFormReferenceData;

export const NameForm: React.FC<NameFormProps> = ({
  firstName = '',
  lastName = '',
  favouriteFilm = null,
  jokePreference = null,
  sampleJoke = null,
  likeStuff = null,

  onSubmit = () => void 0,
  onJokePreferenceChanged = () => void 0,
}) => {
  const { register, handleSubmit, errors, control } = useForm<NameFormData>({
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
          <FormControl component="fieldset" error={!!errors.jokePreference}>
            <FormLabel component="legend">What kind of jokes do you like?</FormLabel>
            <Controller
              control={control}
              row
              aria-label="jokePreference"
              name="jokePreference"
              defaultValue={jokePreference}
              rules={{ required: { value: true, message: 'Joke preference is required' } }}
              render={(props) => (
                <RadioGroup
                  {...props}
                  onChange={(_event, value) => {
                    props.onChange(value);
                    onJokePreferenceChanged(value as JokePreference | null);
                  }}
                  row
                >
                  <FormControlLabel
                    value="random"
                    control={<Radio />}
                    label="Random"
                    data-testid="jokePreferenceRandom"
                  />
                  <FormControlLabel value="dad" control={<Radio />} label="Dad Jokes" data-testid="jokePreferenceDad" />
                </RadioGroup>
              )}
            />
            <FormHelperText>{errors.jokePreference?.message || ''}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          {sampleJoke || ''}
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset" error={!!errors.likeStuff}>
            <FormLabel component="legend">Do you like stuff?</FormLabel>
            <Controller
              control={control}
              aria-label="likeStuff"
              name="likeStuff"
              defaultValue={likeStuff}
              rules={{ required: { value: true, message: 'Like stuff is required' } }}
              render={(props) => (
                <ToggleButtonGroup {...props} onChange={(_event, value) => props.onChange(value)} exclusive>
                  <ToggleButton value="yes" data-testid="likeStuffYes">
                    Yes
                  </ToggleButton>
                  <ToggleButton value="no" data-testid="likeStuffNo">
                    No
                  </ToggleButton>
                </ToggleButtonGroup>
              )}
            />
            <FormHelperText>{errors.likeStuff?.message || ''}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Controller
            control={control}
            name="favouriteFilm"
            defaultValue={favouriteFilm}
            rules={{ required: { value: true, message: 'Favourite film is required' } }}
            render={(props) => (
              <FavouriteFilmAutocomplete
                {...props}
                aria-label="favouriteFilm"
                data-testid="favouriteFilmAutocomplete"
                films={top100Films}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Favourite Film"
                    variant="outlined"
                    data-testid="favouriteFilmTextbox"
                    error={!!errors.favouriteFilm}
                    helperText={errors.favouriteFilm?.message || ''}
                  />
                )}
                onChange={(_, data) => props.onChange(data)}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} container justify="flex-end">
          <Button type="submit" variant="contained" data-testid="submit">
            Next
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
