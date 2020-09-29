import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';

export interface FavouriteFilmAutocompleteProps {
  films: string[];
  error: boolean;
  helperText: string;
  // these props are used by the react-hook-form Controller render() function
  onChange: (value: string | null) => void;
  onBlur: () => void;
  value: any;
  name: string;
}

export const FavouriteFilmAutocomplete: React.FC<FavouriteFilmAutocompleteProps> = ({
  films,
  error,
  helperText,
  onChange,
  onBlur,
  name,
  value,
}) => {
  return (
    <Autocomplete
      aria-label="favouriteFilm"
      data-testid="favouriteFilmAutocomplete"
      options={films}
      fullWidth
      onBlur={onBlur}
      value={value}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Favourite Film"
          variant="outlined"
          data-testid="favouriteFilmTextbox"
          error={error}
          helperText={helperText}
        />
      )}
      onChange={(_, data) => onChange(data)}
    />
  );
};
