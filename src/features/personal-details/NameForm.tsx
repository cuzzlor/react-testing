import DateFnsUtils from '@date-io/date-fns';
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
import Autocomplete from '@material-ui/lab/Autocomplete';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { KeyboardDatePicker } from '@material-ui/pickers/DatePicker';
import MuiPickersUtilsProvider from '@material-ui/pickers/MuiPickersUtilsProvider';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import isValid from 'date-fns/isValid';
import subYears from 'date-fns/subYears';
import React from 'react';
import { Controller, useForm, Validate } from 'react-hook-form';
import { Loadable } from 'recoil';
import { NumberFormatCustom } from '../../components/NumberFormatCustom';

export type JokePreference = 'dad' | 'random';
export type YesNo = 'yes' | 'no';
export interface NameFormData {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: Date | null;
  email?: string;
  favouriteFilm?: string;
  jokePreference?: JokePreference | null;
  likeStuff?: YesNo | null;
  amount?: number | null;
}
export interface NameFormHandlers {
  onSubmit?: (data: NameFormData) => void | Promise<void>;
  onJokePreferenceChanged?: (value: JokePreference | null) => void | Promise<void>;
}
export interface NameFormReferenceData {
  sampleJoke?: Loadable<string | null>;
  films?: Loadable<string[]>;
}
export type NameFormProps = NameFormData & NameFormHandlers & NameFormReferenceData;

const dobMin = subYears(new Date(), 100);
const dobMax = subYears(new Date(), 16);
const dobOutOfRangeMsg = 'Please enter a rider age between 16 and 100';
const validateDob: Record<string, Validate> = {
  valid: (value) => isValid(value) || 'Date of birth is invalid',
  min: (value) => isBefore(dobMin, value) || dobOutOfRangeMsg,
  max: (value) => isAfter(dobMax, value) || dobOutOfRangeMsg,
};

const EmailValidationPattern = /^(?!\.)(([-a-z0-9_]|(?<!\.)\.)*)(?<!\.)@[a-z0-9][\w.-]*[a-z0-9]\.[a-z][a-z.]*[a-z]$/;

export const NameForm: React.FC<NameFormProps> = ({
  firstName = '',
  lastName = '',
  dateOfBirth = null,
  email = '',
  favouriteFilm = null,
  jokePreference = null,
  sampleJoke = null,
  likeStuff = null,
  amount = null,
  films = {
    state: 'hasValue',
    contents: [],
  },
  onSubmit = () => void 0,
  onJokePreferenceChanged = () => void 0,
}) => {
  const { register, handleSubmit, errors, control, formState } = useForm<NameFormData>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
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
          <TextField
            name="email"
            label="Email"
            fullWidth
            defaultValue={email}
            inputRef={register({
              required: { value: true, message: 'Email is required' },
              pattern: { value: EmailValidationPattern, message: 'Email is invalid' },
            })}
            error={!!errors.email}
            helperText={errors.email?.message || ''}
            data-testid="email"
          />
        </Grid>
        <Grid item xs={6}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Controller
              control={control}
              name="dateOfBirth"
              defaultValue={dateOfBirth}
              rules={{
                required: {
                  value: true,
                  message: 'Date of birth is required',
                },
                validate: validateDob,
              }}
              render={(args) => (
                <KeyboardDatePicker
                  {...args}
                  fullWidth
                  autoOk
                  minDate={dobMin}
                  maxDate={dobMax}
                  format="dd/MM/yyyy"
                  placeholder="dd/mm/yyyy"
                  label="Date of Birth"
                  error={!!errors.dateOfBirth}
                  helperText={errors.dateOfBirth?.message}
                  data-testid="dateOfBirth"
                />
              )}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={control}
            name="amount"
            defaultValue={amount}
            rules={{ required: { value: true, message: 'Amount is required' } }}
            render={(props) => (
              <TextField
                {...props}
                fullWidth
                error={!!errors.amount}
                helperText={errors.amount?.message || ''}
                label="Amount"
                data-testid="amount"
                InputProps={{
                  inputComponent: NumberFormatCustom as any,
                }}
                onChange={(e) => props.onChange(e.target.value)}
              />
            )}
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
          {sampleJoke && sampleJoke.state === 'hasValue' ? sampleJoke.contents : ''}
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
              <Autocomplete
                {...props}
                aria-label="favouriteFilm"
                data-testid="favouriteFilmAutocomplete"
                options={films.state === 'hasValue' ? films.contents : []}
                disabled={films.state !== 'hasValue'}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={films.state === 'loading' ? 'loading...' : 'Favourite Film'}
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
          <Button type="submit" variant="contained" data-testid="submit" disabled={!formState.isValid}>
            Next
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
