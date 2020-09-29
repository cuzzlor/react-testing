import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

export interface FavouriteFilmAutocompleteProps {
  films: string[];
  defaultValue: string | null;
  control: Control<any>;
  error?: FieldError;
}

export const FavouriteFilmAutocomplete: React.FC<FavouriteFilmAutocompleteProps> = ({
  films,
  defaultValue,
  control,
  error,
}) => {
  return (
    <Controller
      control={control}
      name="favouriteFilm"
      defaultValue={defaultValue}
      rules={{ required: { value: true, message: 'Favourite film is required' } }}
      render={(props) => (
        <Autocomplete
          {...props}
          aria-label="favouriteFilm"
          data-testid="favouriteFilmAutocomplete"
          options={films}
          fullWidth
          renderInput={(params) => (
            <TextField
              {...params}
              label="Favourite Film"
              variant="outlined"
              data-testid="favouriteFilmTextbox"
              error={!!error}
              helperText={error?.message || ''}
            />
          )}
          onChange={(_, data) => props.onChange(data)}
        />
      )}
    />
  );
};
